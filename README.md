# f1rst-api-cypress

Projeto de automação de testes de API utilizando Cypress.

---

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/en/download)
- [Cypress 11](https://docs.cypress.io)
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) — geração de relatório HTML

---

## APIs testadas

- **ServeRest** (`https://serverest.dev`) — API REST pública para prática de testes
- **Trello** (`https://api.trello.com`) — API do Trello

---

## Pré-requisitos

- Node.js instalado (versão 16 ou superior)
- Conta no Trello para gerar as credenciais da API

---

## Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repositório>

# 2. Acesse a pasta do projeto
cd f1rst-api-cypress

# 3. Instale as dependências
npm install
```

---

## Configurando credenciais do Trello

Os testes do Trello exigem uma **API Key** e um **Token** pessoais. Siga os passos abaixo para obtê-los:

### Passo 1 — Obter a API Key

1. Acesse https://trello.com/app-key enquanto estiver logado na sua conta Trello
2. A **API Key** será exibida diretamente na página

### Passo 2 — Gerar o Token

1. Na mesma página da API Key, clique no link **"Token"**
2. Uma página de autorização será exibida — clique em **"Allow"**
3. O **Token** gerado será exibido na tela seguinte — copie-o

> O token gerado tem validade de **30 dias**. Após esse prazo, repita o Passo 2 para gerar um novo.

### Passo 3 — Configurar no projeto

Abra o arquivo `cypress.config.js` e cole suas credenciais nos campos indicados:

```js
env: {
  TRELLO_KEY: 'cole-sua-api-key-aqui',
  TRELLO_TOKEN: 'cole-seu-token-aqui',
}
```

---

## Executando os testes

### Via interface gráfica do Cypress

```bash
npx cypress open
```

1. Selecione **E2E Testing**
2. Escolha o navegador desejado
3. Selecione o arquivo `.cy.js` desejado e aguarde a execução

### Via linha de comandos (headless)

```bash
npx cypress run
```

Para rodar uma spec específica:

```bash
npx cypress run --spec "cypress/integration/api/trello.cy.js"
```

---

## Relatório de execução

O projeto gera automaticamente um relatório HTML ao final de cada execução via linha de comandos, utilizando o **Mochawesome Reporter**.

### Rodar testes e abrir o relatório automaticamente

```bash
npm run test:report
```

### Somente rodar os testes (relatório salvo sem abrir)

```bash
npm test
```

O relatório é gerado em:

```
cypress/reports/relatorio.html
```

### O que o relatório apresenta

- Resumo geral: total de testes, aprovados e reprovados
- Tempo de execução por cenário
- Detalhamento de cada requisição e validação executada
- Screenshots automáticos dos testes que falharam

> O relatório é gerado apenas na execução via linha de comandos (`npm test` ou `npm run test:report`). A interface gráfica (`cypress open`) não gera o arquivo HTML.

---

## Arquitetura do projeto

```
cypress/
├── integration/
│   └── api/
│       ├── trello.cy.js      # GET Trello Action — status code e campo list.name
│       ├── usuarios.cy.js    # CRUD completo de usuários (ServeRest)
│       └── login.cy.js       # Testes de autenticação (ServeRest)
├── reports/
│   └── relatorio.html        # Relatório HTML gerado após execução
└── support/
    ├── commands.js
    └── e2e.js
```

---

## Cenários cobertos

| Spec           | Método | Endpoint                        | Cenário                                      |
|----------------|--------|---------------------------------|----------------------------------------------|
| trello.cy.js   | GET    | /actions/{id}                   | Validar status 200 e exibir list.name        |
| usuarios.cy.js | GET    | /usuarios                       | Listar todos os usuários                     |
| usuarios.cy.js | POST   | /usuarios                       | Criar novo usuário                           |
| usuarios.cy.js | GET    | /usuarios/{id}                  | Buscar usuário pelo ID                       |
| usuarios.cy.js | PUT    | /usuarios/{id}                  | Atualizar usuário                            |
| usuarios.cy.js | DELETE | /usuarios/{id}                  | Excluir usuário                              |
| usuarios.cy.js | GET    | /usuarios/{id}                  | Validar que usuário excluído não existe mais |
| login.cy.js    | POST   | /login                          | Login com credenciais válidas                |
| login.cy.js    | POST   | /login                          | Login com senha inválida                     |
| login.cy.js    | POST   | /login                          | Login com e-mail inexistente                 |
