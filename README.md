# Decision Hub

Painel de gestão para empresas de serviços e consultoria. Reúne comercial, finanças, projetos e planos de ação em uma leitura executiva por período.

## O que já funciona

- visão geral com receita, meta, margem, pipeline, utilização e funil;
- cadastro e consulta de vários períodos;
- projetos com status escolhido pelo gestor: **Saudável**, **Monitorar** ou **Atenção**;
- criação, edição, aprovação, conclusão e exclusão de planos de ação;
- relatórios executivo, comercial e de projetos, com CSV e impressão em PDF;
- persistência por período no Supabase Postgres;
- acesso de demonstração como administrador ou usuário;
- login real com Supabase Auth e papéis `admin`, `editor` e `viewer` por empresa.

O produto não gera recomendações automáticas sem uma regra de negócio aprovada. A nota do relatório, os planos e o status dos projetos são decisões explícitas do gestor.

## Demonstração

Na tela inicial, escolha:

- **Administrador demo** para editar indicadores, períodos, projetos, planos e configurações;
- **Usuário demo** para editar a operação e executar planos, sem acesso às configurações administrativas.

O ambiente de demonstração é isolado. Em uma implantação real, cada usuário entra por e-mail e senha e só acessa as empresas às quais pertence.

## Configuração local

1. Copie `.env.example` para `.env`.
2. Informe `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.
3. Execute `npm install` e `npm run dev`.

## Segurança e dados

O banco usa Row Level Security. Dados reais dependem de vínculo na tabela `memberships`; administradores e editores podem gravar, enquanto leitores apenas consultam. A área demo aceita acesso anônimo de propósito para facilitar a avaliação do projeto.

## Stack

- React, TypeScript e CSS responsivo
- Supabase Auth e Postgres
- Vinext e Cloudflare Workers

## Autor

[Luan Moroni](https://github.com/luanmoroni) · [Portfólio](https://luanmoroni.github.io)
