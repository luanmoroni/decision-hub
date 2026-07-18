# Decision Hub

Dashboard executivo para empresas de serviços e consultoria. O produto reúne indicadores comerciais, financeiros e operacionais para transformar dados dispersos em decisões priorizadas.

## Problema

Consultorias costumam acompanhar vendas, projetos, margem e capacidade da equipe em ferramentas separadas. Isso reduz a visibilidade sobre riscos e faz com que decisões importantes aconteçam tarde demais.

O Decision Hub organiza esses sinais em uma única leitura executiva e destaca a próxima ação com maior impacto.

## O que o dashboard apresenta

- receita reconhecida e meta mensal;
- margem operacional;
- pipeline comercial ponderado;
- utilização da equipe;
- saúde e progresso dos projetos;
- conversão do funil de vendas;
- recomendação operacional priorizada.

## Como usar

1. Abra **Entrada de dados** no menu lateral.
2. Preencha período, receita, meta, margem, pipeline, utilização, funil e os dados de cada projeto.
3. Selecione **Salvar dados do período**. O sistema valida o funil e alimenta todas as análises.
4. Use **Configurações** para definir empresa, responsável e metas que determinam alertas e recomendações.
5. Acesse **Relatórios** para escolher o recorte executivo, comercial ou de projetos, exportar CSV e salvar em PDF.

As recomendações são calculadas a partir dos indicadores e podem ser transformadas em planos de ação acompanháveis. O status dos projetos também é recalculado com base em margem, progresso, equipe e metas configuradas.

Cada período salvo entra no seletor do cabeçalho. Projetos podem ser adicionados ou removidos na entrada de dados.

## Persistência

Os dados são armazenados no Cloudflare D1. Para uma instalação independente com login público e papéis de Administrador, Usuário e Leitor, a evolução recomendada é Supabase Auth + Postgres com políticas de acesso por empresa.

O menu **Comercial** concentra funil, oportunidades e metas. **Projetos** aparece ao final da jornada, depois da leitura comercial e financeira.

## Stack

- Next.js e React
- TypeScript
- CSS responsivo
- Vinext, Cloudflare Workers e D1

## Status

Versão funcional com navegação, edição de indicadores, persistência de dados e relatório executivo para impressão. Próximos ciclos podem adicionar autenticação, importação de planilhas e integrações externas.

## Autor

[Luan Moroni](https://github.com/luanmoroni) · [Portfólio](https://luanmoroni.github.io)
