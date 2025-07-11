# tuit

Backend de rede social inspirado no Twitter, com arquitetura hexagonal (Ports & Adapters), princípios SOLID e Clean Code.
Inclui cache com Redis para timeline e banco de dados MongoDB para persistência de dados.

## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

## Arquitetura

Abaixo, um diagrama simplificado mostrando o uso do Redis como cache para timeline:

## Features

- [x] Criar usuário
- [x] Listar usuários 
- [x] Seguir usuário
- [x] Postar
- [x] Listar postagens

## Próximos passos

- [] Adicionar testes unitarios e de integração
- [] Adicionar autenticação
- [] Adicionar serviço de E-mail/SMS
- [] Adicionar recuperar senha
- [] Adicionar CRUD para highlights
- [] Buscar perfil de usuário

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [MongoDB](https://www.mongodb.com/) rodando localment (`mongodb://localhost:27017/tuit`)
- [Redis](https://redis.io/) rodando local (pode usar Docker)
- [Git](https://git-scm.com/) instalado na maquina

## Instalação

> OBS: E NECESSARIO CONFIGURAR O ARQUIVO .ENV

1. Clonar o repositório:

   ```bash
   git clone https://github.com/7feeh7/checkout-service.git
   ```

2. Instalando as dependências:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. Configurar banco de dados:

- Renomeie o arquivo .env.example para .env e atualize os detalhes da conexão do banco de dados

4. Subindo o Redis com Docker:

    ```bash
    docker run --name redis-cache -p 6379:6379 -d redis
    ```

5. Inicie o servidor:

   ```bash
   npm run start:dev
   ```

   ou

   ```bash
   yarn start:dev
   ```

6. O servidor agora deve estar em execução em http://localhost:3000.

## Documentação

A documentação da API esta disponível [aqui](https://documenter.getpostman.com/view/15611768/2sA3s3GW7B).

## Contribuindo

Contribuições para o projeto são bem vindas! Pra contribuir com o projeto, siga estas etapas:

1. De um fork no repositorio.
2. Crie uma nova branch para sua feature ou bug fix.
3. Faça suas alterações, confirmando e pressionando conforme necessário.
4. Envie uma solicitação pull com uma descrição detalhada de suas alterações.

## Contato

Para qualquer dúvida ou consulta, entre em contato com [F-softtech](mailto:felipe.pires.soaresti@gmail.com).

Sinta-se à vontade para entrar em contato conosco se tiver algum comentário, sugestão ou se encontrar algum problema ao usar o save-income-backend. Sua opinião é valiosa para nós e nos ajuda a melhorar a aplicação.
