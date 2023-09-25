# Despesas - Back-end - Api
[![Coverage Status](https://coveralls.io/repos/github/JPedro109/despesas-back-end/badge.svg?branch=staging)](https://coveralls.io/github/JPedro109/despesas-back-end?branch=staging)

<p>🚀  Aplicação voltada para administração de despesas</p>

# Status da Aplicação
<p>🔥 Aplicação Finalizada</p>

# Features
- Cadastro de Usuário
- Atualização de Email
- Atualização de Senha
- Recuperação de Senha
- Exclusão de Usuário
- Criação de Despesas
- Atualização de Despesas
- Leitura de Despesas
- Exclusão de Despesas

# Tecnologias
- Node
- NestJS
- Typescript
- RabbitMQ
- MySQL
- MongoDB
- Jest

# Padrões Utilizados
- Conceitos de Clean Architecture
- SOLID
- Adapter
- Decorator

# Execução

Para executar a aplicação, instale as dependências com o comando abaixo:
```sh
  yarn install
```

Depois crie um arquivo .env com suas variáveis de ambiente e execute a orquestração de contêineres, com o comando abaixo:

```sh
  docker-compose up -d
```

Por último crie a fila com o nome definido nas variáveis de ambiente na url http://localhost:15672 e depois rode os testes para validar o funcionamento da aplicação com o comando abaixo:

```sh
  docker exec -it api-despesas yarn test
```

OBS: O envio de email é feito pelo microsserviço que está nesse repositório https://github.com/JPedro109/email-sending-microservice