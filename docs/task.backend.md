📄 Documento de Projeto – Task Manager Backend

1. 🎯 Objetivo
   Criar uma API backend para gerenciamento de tarefas, permitindo que usuários possam organizar suas atividades com autenticação, filtros e relatórios simples.

2. ⚙️ Tecnologias Sugeridas
   Node.js com Express (framework web).

Prisma ORM para interação com banco de dados.

PostgreSQL como banco relacional.

JWT para autenticação.

Jest ou Vitest para testes.

Swagger/OpenAPI para documentação da API.

Deploy em Railway/Render/Heroku.

3. 📐 Estrutura de Entidades
   Usuário
   id (UUID)

nome

email

senha (hash)

criadoEm

Tarefa
id (UUID)

titulo

descricao

status (pendente, em andamento, concluída)

prioridade (baixa, média, alta)

dataLimite

usuarioId (FK → Usuário)

4. 🔑 Funcionalidades Principais
   Autenticação:

Registro de usuário.

Login com JWT.

CRUD de tarefas:

Criar, listar, atualizar e excluir.

Filtros e busca:

Por status, prioridade e data.

Relatórios:

Quantidade de tarefas concluídas por usuário.

Paginação:

Listagem de tarefas com limite e offset.

5. 🧪 Testes
   Testes unitários para serviços e controllers.

Testes de integração para endpoints.

Cobertura mínima de 80%.

6. 🚀 Deploy
   Configuração de variáveis de ambiente (DB_URL, JWT_SECRET).

Deploy em Railway/Render.

Documentação acessível via /docs.

7. 📅 Roadmap de Implementação
   Configurar projeto Node.js + Express.

Integrar Prisma + PostgreSQL.

Criar modelos de Usuário e Tarefa.

Implementar autenticação JWT.

Desenvolver CRUD de tarefas.

Adicionar filtros e relatórios.

Escrever testes unitários e integração.

Documentar API com Swagger.

Deploy em ambiente cloud.
