
# News Aggregator

App que agrega notícias de diferentes websites. Utiliza web scrapping e foi pensado para rodar na estrutura serverless da AWS. Você pode ver acessar o app em funcionamento no link: https://main.d2skzx6ijbdpfa.amplifyapp.com/

## Stack utilizada

- **Front-end:** React, TailwindCSS

- **Back-end:** Node.js, Puppeteer, AWS DynamoDB 

- **Testes:** Jest 

## Infraestrutura e funcionamento

- A aplicação é baseada em microserviços de backend que rodam em funções Lambda. 

- Uma função é responsável por coletar as notícias dos websites definidos e salvar numa tabela do DynamoDB. Esta função é chamada diariamente pelo CloudWatch EventBridge.

- Outra função é responsável por buscar as notícias armazenadas no banco e é chamada através do API Gateway no Front End para mostrar as notícias aos usuários. 

- Ambas as funções do back-end são configuradas com CI/CD através do CodeBuild e o front-end através do Amplify. 

- Notícias antigas são apagadas do banco automaticamente com o recurso TTL (Time To Live) do DynamoDB.

## Arquitetura da aplicação

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

<!--
## Rodando localmente

Requisitos: Node.js 16.x e uma tabela do Dynamo DB. 

Clone o projeto

```bash
  git clone https://github.com/gsilverio7/news-aggregator.git
```

Entre no diretório frontend do projeto

```bash
  cd frontend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

Abra uma nova aba do terminal. Entre no diretório backend do projeto

```bash
  cd backend
```
-->

## Roadmap

- Adicionar instruções para rodar o projeto localmente

- Adicionar instruções para rodar o projeto na AWS pelo Console

- Terminar testes automatizados

- Adicionar suporte ao CloudFormation

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

