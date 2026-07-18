const metrics = [
  { label: "Margem operacional", value: "31,8%", delta: "+2,6 p.p.", note: "Meta 30%" },
  { label: "Pipeline ponderado", value: "R$ 620 mil", delta: "+18,2%", note: "Próximos 90 dias" },
  { label: "Utilização da equipe", value: "78%", delta: "+4,1 p.p.", note: "Meta 82%" },
  { label: "Projetos ativos", value: "12", delta: "3 em atenção", note: "4 encerram este mês", alert: true },
];

const projects = [
  { name: "Projeto Atlas", client: "Northstar Health", progress: 64, margin: "24%", team: "8 pessoas", status: "Atenção", tone: "warn" },
  { name: "Operação Prisma", client: "Vértice Capital", progress: 82, margin: "38%", team: "5 pessoas", status: "Saudável", tone: "good" },
  { name: "Programa Horizon", client: "Lumina Retail", progress: 46, margin: "34%", team: "6 pessoas", status: "Saudável", tone: "good" },
  { name: "Transformação Core", client: "Arco Logística", progress: 29, margin: "27%", team: "4 pessoas", status: "Monitorar", tone: "neutral" },
];

const months = [
  { month: "Fev", actual: 62, target: 58 }, { month: "Mar", actual: 68, target: 64 },
  { month: "Abr", actual: 65, target: 69 }, { month: "Mai", actual: 78, target: 73 },
  { month: "Jun", actual: 84, target: 79 }, { month: "Jul", actual: 92, target: 86 },
];

export default function Home() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="logo" href="#overview" aria-label="Decision Hub — visão geral"><span>D</span> Decision Hub</a>
        <nav aria-label="Navegação principal">
          <p>Workspace</p>
          <a className="active" href="#overview"><span>01</span> Visão geral</a>
          <a href="#projects"><span>02</span> Projetos</a>
          <a href="#commercial"><span>03</span> Comercial</a>
          <a href="#team"><span>04</span> Equipe</a>
          <p>Gestão</p>
          <a href="#reports"><span>05</span> Relatórios</a>
          <a href="#settings"><span>06</span> Configurações</a>
        </nav>
        <div className="sidebar-foot">
          <div className="avatar">LM</div><div><b>Luan Moroni</b><small>Administrador</small></div><button aria-label="Abrir menu do usuário">•••</button>
        </div>
      </aside>

      <section className="workspace" id="overview">
        <header className="topbar">
          <div><p>DECISION HUB / VISÃO GERAL</p><h1>Bom dia, Luan.</h1></div>
          <div className="top-actions"><button className="period">Julho 2026 <span>⌄</span></button><button className="export">Exportar relatório ↗</button></div>
        </header>

        <section className="hero-metric" aria-labelledby="revenue-title">
          <div className="revenue">
            <p id="revenue-title">Receita reconhecida no mês</p>
            <div><strong>R$ 284 mil</strong><span>↗ 12,4%</span></div>
            <small>R$ 31,4 mil acima do mês anterior</small>
          </div>
          <div className="goal">
            <div><p>Meta mensal</p><b>R$ 310 mil</b></div>
            <div className="goal-track"><span /></div>
            <small>91,6% alcançado · faltam R$ 26 mil</small>
          </div>
        </section>

        <section className="metric-row" aria-label="Indicadores principais">
          {metrics.map((metric) => <article key={metric.label}>
            <p>{metric.label}</p><strong>{metric.value}</strong><span className={metric.alert ? "alert" : "positive"}>{metric.delta}</span><small>{metric.note}</small>
          </article>)}
        </section>

        <section className="recommendation" aria-label="Recomendação operacional prioritária">
          <div className="rec-index">01</div>
          <div><p>RECOMENDAÇÃO PRIORITÁRIA</p><h2>Realocar 2 consultores para o Projeto Atlas.</h2><span>A entrega crítica acontece em 12 dias e a capacidade atual cobre apenas 74% do esforço previsto.</span></div>
          <div className="rec-impact"><p>IMPACTO ESTIMADO</p><strong>+R$ 18 mil</strong><span>em margem protegida</span></div>
          <button>Ver análise <span>→</span></button>
        </section>

        <div className="dashboard-grid">
          <section className="panel revenue-chart" aria-labelledby="chart-title">
            <header><div><p>DESEMPENHO FINANCEIRO</p><h2 id="chart-title">Receita × meta</h2></div><div className="legend"><span><i className="actual"/>Realizado</span><span><i className="target"/>Meta</span></div></header>
            <div className="chart-area">
              <div className="axis"><span>R$ 300k</span><span>R$ 200k</span><span>R$ 100k</span><span>R$ 0</span></div>
              <div className="bars">{months.map((m) => <div className="month" key={m.month}><div className="bar-pair"><i style={{height:`${m.target}%`}}/><b style={{height:`${m.actual}%`}}/></div><span>{m.month}</span></div>)}</div>
            </div>
          </section>

          <section className="panel funnel" id="commercial" aria-labelledby="funnel-title">
            <header><div><p>PIPELINE COMERCIAL</p><h2 id="funnel-title">Conversão do funil</h2></div><button aria-label="Mais opções">•••</button></header>
            <div className="funnel-total"><strong>R$ 1,48 mi</strong><span>valor bruto</span></div>
            <div className="funnel-row"><span>Propostas</span><b>18</b><i style={{width:"100%"}}/><small>R$ 820k</small></div>
            <div className="funnel-row"><span>Negociação</span><b>9</b><i style={{width:"64%"}}/><small>R$ 440k</small></div>
            <div className="funnel-row"><span>Fechamento</span><b>4</b><i style={{width:"36%"}}/><small>R$ 220k</small></div>
            <div className="conversion"><span>Conversão geral</span><strong>22,2%</strong><small>+3,1 p.p. no mês</small></div>
          </section>
        </div>

        <section className="panel project-panel" id="projects" aria-labelledby="projects-title">
          <header><div><p>PORTFÓLIO DE ENTREGAS</p><h2 id="projects-title">Projetos prioritários</h2></div><a href="#all-projects">Ver todos os 12 projetos →</a></header>
          <div className="project-head"><span>Projeto / Cliente</span><span>Progresso</span><span>Margem</span><span>Equipe</span><span>Status</span></div>
          {projects.map((project) => <article className="project-row" key={project.name}>
            <div><b>{project.name}</b><small>{project.client}</small></div>
            <div className="progress"><span><i style={{width:`${project.progress}%`}}/></span><b>{project.progress}%</b></div>
            <strong>{project.margin}</strong><span>{project.team}</span><em className={project.tone}>{project.status}</em>
          </article>)}
        </section>

        <footer><span>Decision Hub · Dados demonstrativos</span><span>Atualizado há 4 minutos</span></footer>
      </section>
    </main>
  );
}
