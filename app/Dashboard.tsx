"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type View = "overview" | "commercial" | "projects" | "reports" | "settings";
type DashboardData = {
  company: string; period: string; revenue: number; previousRevenue: number; target: number;
  margin: number; pipeline: number; utilization: number; activeProjects: number;
  proposals: number; negotiations: number; closings: number;
};

const defaults: DashboardData = {
  company: "Lumina Consultoria", period: "Julho 2026", revenue: 284000, previousRevenue: 252600,
  target: 310000, margin: 31.8, pipeline: 620000, utilization: 78, activeProjects: 12,
  proposals: 18, negotiations: 9, closings: 4,
};

const projects = [
  { name: "Projeto Atlas", client: "Northstar Health", progress: 64, margin: "24%", team: "8 pessoas", status: "Atenção", tone: "warn" },
  { name: "Operação Prisma", client: "Vértice Capital", progress: 82, margin: "38%", team: "5 pessoas", status: "Saudável", tone: "good" },
  { name: "Programa Horizon", client: "Lumina Retail", progress: 46, margin: "34%", team: "6 pessoas", status: "Saudável", tone: "good" },
  { name: "Transformação Core", client: "Arco Logística", progress: 29, margin: "27%", team: "4 pessoas", status: "Monitorar", tone: "neutral" },
];

const months = [62, 68, 65, 78, 84, 92];
const money = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
const compactMoney = (value: number) => value >= 1_000_000 ? `R$ ${(value / 1_000_000).toFixed(2).replace(".", ",")} mi` : `R$ ${Math.round(value / 1000)} mil`;

export function Dashboard() {
  const [view, setView] = useState<View>("overview");
  const [data, setData] = useState<DashboardData>(defaults);
  const [draft, setDraft] = useState<DashboardData>(defaults);
  const [notice, setNotice] = useState("Carregando dados…");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard").then(r => r.ok ? r.json() : Promise.reject()).then(result => {
      if (result.data) { setData(result.data); setDraft(result.data); setNotice("Dados sincronizados"); }
      else setNotice("Dados demonstrativos · personalize em Configurações");
    }).catch(() => setNotice("Modo demonstrativo · personalize em Configurações"));
  }, []);

  const growth = useMemo(() => ((data.revenue - data.previousRevenue) / data.previousRevenue) * 100, [data]);
  const goal = Math.min((data.revenue / data.target) * 100, 100);
  const conversion = data.proposals ? (data.closings / data.proposals) * 100 : 0;

  async function save(event: FormEvent) {
    event.preventDefault(); setSaving(true); setNotice("Salvando alterações…");
    try {
      const response = await fetch("/api/dashboard", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      if (!response.ok) throw new Error();
      setData(draft); setNotice("Alterações salvas"); setView("overview");
    } catch { setNotice("Não foi possível salvar agora. Tente novamente."); }
    finally { setSaving(false); }
  }

  const nav = (target: View, label: string, index: string) => <button className={view === target ? "active" : ""} onClick={() => setView(target)}><span>{index}</span>{label}</button>;

  return <main className="app-shell">
    <aside className="sidebar">
      <button className="logo" onClick={() => setView("overview")}><span>D</span> Decision Hub</button>
      <nav aria-label="Navegação principal"><p>Workspace</p>{nav("commercial","Comercial","01")}{nav("overview","Visão geral","02")}{nav("projects","Projetos","03")}<p>Gestão</p>{nav("reports","Relatórios","04")}{nav("settings","Configurações","05")}</nav>
      <div className="sidebar-foot"><div className="avatar">LM</div><div><b>Luan Moroni</b><small>Administrador</small></div></div>
    </aside>

    <section className="workspace">
      <header className="topbar"><div><p>DECISION HUB / {view.toUpperCase()}</p><h1>{view === "settings" ? "Configurações" : view === "reports" ? "Relatórios" : view === "projects" ? "Projetos" : view === "commercial" ? "Comercial" : "Bom dia, Luan."}</h1></div><div className="top-actions"><span className="sync-status">● {notice}</span><button className="period">{data.period}</button>{view !== "settings" && <button className="export" onClick={() => setView("reports")}>Gerar relatório ↗</button>}</div></header>

      {view === "settings" ? <Settings draft={draft} setDraft={setDraft} save={save} saving={saving} reset={() => setDraft(defaults)} /> :
       view === "reports" ? <Reports data={data} growth={growth} goal={goal} conversion={conversion} /> :
       view === "projects" ? <Projects /> :
       view === "commercial" ? <Commercial data={data} conversion={conversion} /> :
       <Overview data={data} growth={growth} goal={goal} conversion={conversion} />}
      <footer><span>Decision Hub · {data.company}</span><span>{notice}</span></footer>
    </section>
  </main>;
}

function Commercial({ data, conversion }: { data: DashboardData; conversion: number }) {
  return <div className="view-stack"><section className="commercial-hero"><div><p>PIPELINE TOTAL</p><strong>{compactMoney(data.pipeline)}</strong><span>oportunidades qualificadas</span></div><div><p>CONVERSÃO GERAL</p><strong>{conversion.toFixed(1).replace(".",",")}%</strong><span>fechamento sobre propostas</span></div><div><p>RECEITA POTENCIAL</p><strong>{compactMoney(data.pipeline * .63)}</strong><span>pipeline ponderado</span></div></section><Funnel data={data} /><section className="panel opportunity-list"><header><div><p>OPORTUNIDADES PRIORITÁRIAS</p><h2>Próximos fechamentos</h2></div></header>{[["Expansão Atlas","R$ 180 mil","80%"],["Estratégia Orion","R$ 140 mil","65%"],["Diagnóstico Vega","R$ 96 mil","55%"]].map(x=><article key={x[0]}><div><b>{x[0]}</b><small>Proposta em negociação</small></div><strong>{x[1]}</strong><em>{x[2]} prob.</em><button>Ver detalhes →</button></article>)}</section></div>;
}

function Overview({ data, growth, goal, conversion }: { data: DashboardData; growth: number; goal: number; conversion: number }) {
  const metrics = [["Margem operacional",`${data.margin.toFixed(1).replace(".",",")}%`,`Meta 30%`],["Pipeline ponderado",compactMoney(data.pipeline),"Próximos 90 dias"],["Utilização da equipe",`${data.utilization}%`,`Meta 82%`],["Projetos ativos",String(data.activeProjects),"3 em atenção"]];
  return <>
    <section className="commercial-strip"><div><p>COMERCIAL PRIMEIRO</p><h2>{data.proposals} propostas · {data.negotiations} negociações · {data.closings} fechamentos</h2></div><div><strong>{conversion.toFixed(1).replace(".",",")}%</strong><span>conversão</span></div><div><strong>{compactMoney(data.pipeline)}</strong><span>pipeline</span></div></section>
    <section className="hero-metric"><div className="revenue"><p>Receita reconhecida no mês</p><div><strong>{compactMoney(data.revenue)}</strong><span>↗ {growth.toFixed(1).replace(".",",")}%</span></div><small>{money(data.revenue-data.previousRevenue)} acima do mês anterior</small></div><div className="goal"><div><p>Meta mensal</p><b>{compactMoney(data.target)}</b></div><div className="goal-track"><span style={{width:`${goal}%`}}/></div><small>{goal.toFixed(1).replace(".",",")}% alcançado · faltam {compactMoney(Math.max(data.target-data.revenue,0))}</small></div></section>
    <section className="metric-row">{metrics.map(m=><article key={m[0]}><p>{m[0]}</p><strong>{m[1]}</strong><small>{m[2]}</small></article>)}</section>
    <section className="recommendation"><div className="rec-index">01</div><div><p>RECOMENDAÇÃO PRIORITÁRIA</p><h2>Realocar 2 consultores para o Projeto Atlas.</h2><span>A entrega crítica acontece em 12 dias e a capacidade cobre apenas 74% do esforço previsto.</span></div><div className="rec-impact"><p>IMPACTO ESTIMADO</p><strong>+R$ 18 mil</strong><span>em margem protegida</span></div><button>Aplicar plano <span>→</span></button></section>
    <div className="dashboard-grid"><RevenueChart /><Funnel data={data}/></div><Projects compact />
  </>;
}

function Funnel({ data }: { data: DashboardData }) { return <section className="panel funnel"><header><div><p>PIPELINE COMERCIAL</p><h2>Conversão do funil</h2></div></header><div className="funnel-total"><strong>{compactMoney(data.pipeline)}</strong><span>pipeline ponderado</span></div>{[["Propostas",data.proposals,"100%"],["Negociação",data.negotiations,"64%"],["Fechamento",data.closings,"36%"]].map(x=><div className="funnel-row" key={String(x[0])}><span>{x[0]}</span><b>{x[1]}</b><i style={{width:String(x[2])}}/><small>{Math.round(Number(x[1])/data.proposals*100)}%</small></div>)}</section> }
function RevenueChart(){return <section className="panel revenue-chart"><header><div><p>DESEMPENHO FINANCEIRO</p><h2>Receita × meta</h2></div></header><div className="chart-area"><div className="axis"><span>R$ 300k</span><span>R$ 200k</span><span>R$ 100k</span><span>R$ 0</span></div><div className="bars">{months.map((h,i)=><div className="month" key={i}><div className="bar-pair"><i style={{height:`${h-5}%`}}/><b style={{height:`${h}%`}}/></div><span>{["Fev","Mar","Abr","Mai","Jun","Jul"][i]}</span></div>)}</div></div></section>}

function Projects({compact=false}:{compact?:boolean}) { return <section className="panel project-panel"><header><div><p>PORTFÓLIO DE ENTREGAS</p><h2>{compact ? "Projetos no fim da visão geral" : "Todos os projetos"}</h2></div></header><div className="project-head"><span>Projeto / Cliente</span><span>Progresso</span><span>Margem</span><span>Equipe</span><span>Status</span></div>{projects.map(p=><article className="project-row" key={p.name}><div><b>{p.name}</b><small>{p.client}</small></div><div className="progress"><span><i style={{width:`${p.progress}%`}}/></span><b>{p.progress}%</b></div><strong>{p.margin}</strong><span>{p.team}</span><em className={p.tone}>{p.status}</em></article>)}</section> }

function Reports({data,growth,goal,conversion}:{data:DashboardData;growth:number;goal:number;conversion:number}) {return <div className="view-stack report-view"><section className="report-cover"><p>RELATÓRIO EXECUTIVO</p><h2>{data.company}</h2><span>{data.period} · gerado pelo Decision Hub</span><button onClick={()=>window.print()}>Imprimir / salvar PDF</button></section><section className="report-summary">{[["Receita",compactMoney(data.revenue)],["Crescimento",`${growth.toFixed(1)}%`],["Meta atingida",`${goal.toFixed(1)}%`],["Conversão",`${conversion.toFixed(1)}%`]].map(x=><article key={x[0]}><p>{x[0]}</p><strong>{x[1]}</strong></article>)}</section><section className="panel report-text"><h2>Leitura executiva</h2><p>A receita do período alcançou {compactMoney(data.revenue)}, equivalente a {goal.toFixed(1)}% da meta. O pipeline ponderado é de {compactMoney(data.pipeline)}, com conversão geral de {conversion.toFixed(1)}%.</p><h3>Recomendação</h3><p>Priorizar a alocação de capacidade no Projeto Atlas e acompanhar semanalmente margem e utilização até a entrega crítica.</p></section></div>}

function Settings({draft,setDraft,save,saving,reset}:{draft:DashboardData;setDraft:(d:DashboardData)=>void;save:(e:FormEvent)=>void;saving:boolean;reset:()=>void}) { const field=(key:keyof DashboardData,label:string,type="number")=><label><span>{label}</span><input type={type} value={draft[key]} onChange={e=>setDraft({...draft,[key]:type==="number"?Number(e.target.value):e.target.value})}/></label>; return <form className="settings-view" onSubmit={save}><section className="settings-intro"><div><p>INDICADORES DO NEGÓCIO</p><h2>Edite os dados exibidos no dashboard.</h2><span>As alterações são salvas no banco do projeto e atualizam todas as telas.</span></div><button type="button" onClick={reset}>Restaurar demonstração</button></section><section className="settings-grid"><fieldset><legend>Identificação</legend>{field("company","Empresa","text")}{field("period","Período","text")}</fieldset><fieldset><legend>Financeiro</legend>{field("revenue","Receita do mês (R$)")}{field("previousRevenue","Receita anterior (R$)")}{field("target","Meta mensal (R$)")}{field("margin","Margem operacional (%)")}</fieldset><fieldset><legend>Operação</legend>{field("pipeline","Pipeline ponderado (R$)")}{field("utilization","Utilização da equipe (%)")}{field("activeProjects","Projetos ativos")}</fieldset><fieldset><legend>Comercial</legend>{field("proposals","Propostas")}{field("negotiations","Negociações")}{field("closings","Fechamentos")}</fieldset></section><div className="settings-actions"><button type="button" onClick={()=>setDraft(defaults)}>Cancelar alterações</button><button className="save" disabled={saving}>{saving?"Salvando…":"Salvar e atualizar dashboard"}</button></div></form> }
