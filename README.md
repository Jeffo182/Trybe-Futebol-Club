# Projeto Fullstack: Trybe Futebol Clube

Projeto realizado durante módulo de Back-end do curso de desenvolvimento web da Trybe.

Sistema de gestão do Campeonato Brasileiro (Série A1).

<details>
  <summary><strong>O que foi feito</strong></summary></br>

  Neste projeto desenvolvi um back-end dockerizado utilizando modelagem de dados através do Sequelize. Seu desenvolvimento respeitou as regras de negócio providas no projeto e API deve ser capaz de ser consumida por um front-end já provido nesse projeto, que foi desenvolvida pela Trybe em `React`.
  
  O aplicativo TFC é um site informativo sobre partidas e classificações de futebol semelhante ao campeonato brasileiro (A1)! ⚽️
  
  Nesta aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: `CRUD`.
  
  A aplicação foi desenvolvida com:

- `Node.js`
- `TypeScript`
- `JWT`
- `Sequelize`
- `POO`
- `S.O.L.I.D`
- `Arquitetura MSC`
- `docker`
- `docker-compose`
- `MySql`
- `Express`;

</details>
<details>
  <summary><strong>Como rodar o projeto</strong></summary></br>
  
  ## Comandos para Clone

1. Clone o projeto

- Usando SSH:
```bash
  git clone git@github.com:Jeffo182/Trybe-Futebol-Club.git
```
Após isso, acesse a pasta do projeto:
```bash
  cd Trybe-Futebol-Club
```

2. Instale as dependências
```bash
  npm install
```

O projeto está preparado para rodar na portão 3000 (padrão) http://localhost:3000

 Configurações mínimas para execução do projeto:

- Sistema Operacional Distribuição Unix
- Node versão 16.14.0 LTS
- Docker
- Docker-compose versão >=1.29.2

  **Com Docker:**

  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

- `npm run compose:up` na raiz do projeto;
- `npm run install:apps` na raiz do projeto para instalar dependências do front e back-end;
- `docker exec -it app_backend bash` em ./app/backend;
- `npm run build` no container do backend;
- `npm run db:reset` no container do backend;

**Localmente:**

**Necessita ter um banco de dados(MySql) instalado localmente**

- `npm run install:apps` na raiz do projeto para instalar dependências do front e back-end;
- `npm run compose:up` na raiz do projeto;
- `npm run build`;
- `npm run db:reset`;

</details>

<details>
  <summary><strong>:memo: Tecnologias utilizadas</strong></summary><br />
  
- `Node.js`
- `TypeScript`
- `JWT`
- `Sequelize`
- `POO`
- `S.O.L.I.D`
- `Arquitetura MSC`
- `docker`
- `docker-compose`
- `MySql`
- `Express`;

</details>
<details>
  <summary><strong>:memo: Habilidades</strong></summary><br />

- A realização da `dockerização` dos apps, network, volume e compose;
- A modelagem de dados com `MySQL` através do `Sequelize`;
- A criação e associação de tabelas usando models do `sequelize`;
- A construção de uma `API REST` com endpoints para consumir os models criados;
- A construção de um CRUD com `TypeScript`, utilizando `ORM`;

</details>

## Documentação da API

#### ✅ Retorna todos os times

```http
  GET /teams
```

#### ✅ Retorna um único time (pelo id)

```http
  GET /teams/${id}
```

#### ✅ Devolve um token após login

```http
  POST /login
```

Necessário informar um objeto no body com os parâmetros abaixo definidos:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. O email inicial é admin@admin.com |
| `password` | `string` | **Obrigatório**. A senha inicial é secret_admin |

#### ✅ Retorna o role do usuário logado

```http
  GET /login/role
```
🛑 Para esta rota, você precisará informar o token no Headers da requisição.


#### ✅ Busca todas as partidas

```http
  GET /matches
```

#### ✅ Busca todas as partidas em andamento

```http
  GET /matches?inProgress=${boolean}
```

Informe _true_ para partidas em andamento ou _false_ para partidas finalizadas.


#### ✅ Inserindo uma nova partida

```http
  POST /matches
```

Essa rota recebe os parâmetros abaixo em seu body, com validações do token e dos ids (que existam e que não sejam iguais).

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `homeTeamId`      | `number` | **Obrigatório**. O ID do time mandante |
| `awayTeamId`      | `number` | **Obrigatório**. O ID do time visitante |
| `homeTeamGoals`      | `number` | **Obrigatório**. O número de gols marcado pelo mandante |
| `awayTeamGoals`      | `number` | **Obrigatório**. O número de gols marcado pelo visitante |

#### ✅ Editar partida

```http
  PATCH /matches/${id}
```

| `homeTeamGoals`      | `number` | **Obrigatório**. O número de gols marcado pelo mandante |
| `awayTeamGoals`      | `number` | **Obrigatório**. O número de gols marcado pelo visitante |

#### ✅ Finalizar partida em andamento

```http
  PATCH /matches/${id}/finish
```
Esta rota finaliza a partida em andamento de número _${id}_.


(Atualizado até a 2a rodada, em 07/março/2023)
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jefferson-felix/)



