# Toro Full Stack Challenge

> **Solução Desenvolvida<br>**
> Uma carteira simples e poderosa que possibilita comprar as mais diversas ações do mercado feita em Angular + Django + D.R.F. + Djoser + JWT + Docker!

<p align="center">
  <img src="https://i.imgur.com/E3ZMMBZ.png" width=780>
</p>

## O que ela faz?

Você pode depositar valores da sua conta ou saca de forma rápida e ainda ter acesso a compra e venda das melhores ações do mercado.

## Conceitos

Trasactions: São qualquer tipo de movimentação financeira feitas dentro da aplicação, possuem 2 tipos:
    -> Orders: São compras de ações feitas dentro da plataforma, cada ordem executada gera automáticamente uma Operation com seu valor correspondente. Possuem os subtipos: sell e bought.
    -> Operations: São as operações bancárias feitas dentro da aplicação. Possuem os subtipos: deposit e draw


## Decisions

Por mais que parece um app pequeno eu tomei várias decisões:

### Usar o Docker Compose de primeira!

Não era um requisito do desafio, mas quando me lembrei de seus benefícios e que eles facilitariam os testes a minha futura equipe na aplicação e assim economizariam muito tempo resolvi cair de cabeça e ser a primeira coisa que eu planejei e escrevi.

Toda a aplicação roda apenas com um comando:

🐳 

```
> docker-compose up --build -d
```

### Factory Pattern, Observer Pattern

Devido a fonte de informações e cotações das ações entregar um dado que tem que ser manipulado para ser mostrado em uma conexão de tempo real eu decidi usar um padrão Observer para 'escutar' as cotações e um factory que trabalha o dado a cada emissão de evento e o distribui
em todo o app em um formato legível.

### Testes

Existem testes em python para o backend e em javascript para o front end em toda a aplicação, você pode executar testes no front end usando a interface de comandos do angular:

```

> cd app && npm install
> ng test

```

Para o backend recomendo fortemente que rode os testes usando um container no Docker

```

> docker-compose up --build
> docker exec -it transactions-service python /code/app/manage.py test

```

Sem o Docker, recomendo que use o Virtual Env para isolar as depêndencias:

```

> cd backend/transactions
> pip install virtualenv
> virtualenv venv
> source venv/bin/activate
> python manage.py test

```

## Rotas

A aplicação foi desenvolvida usando o padrão Restful para facilitar o entendimento da mesma, seu ponto de conexão encontra-se em http://0.0.0.0:8088/api. 
As rotas mais importantes são, /orders, /operations, /auth. 

### `GET /orders`

```json
{
    "sells": [
        {
            "order_type": "sell",
            "sigla": "PETR4",
            "quantity": 5
        },
        {
            "order_type": "sell",
            "sigla": "AMBEV",
            "quantity": 2
        },
        {
            "order_type": "sell",
            "sigla": "XS43",
            "quantity": 52
        }        
    ],
    "boughts": [
        {
            "order_type": "bought",
            "sigla": "PETR4",
            "quantity": 5
        },
        {
            "order_type": "bought",
            "sigla": "AMBEV",
            "quantity": 2
        },
        {
            "order_type": "bought",
            "sigla": "XS43",
            "quantity": 52
        }        
    ]
}
```


### `POST /orders`

Publique uma ordem assim:

```json
    {
        "order_type": "sell",
        "sigla": "PETR4",
        "quantity": 5
    }
```

### `PUT /orders/{order_ID}`

Edite uma ordem assim.

PUT:

```json
    {
        "id": 3,
        "order_type": "bought",
        "sigla": "PETR4",
        "quantity": 5
    }
```


### `GET /operations`

```json
{
    "deposits": [
        {
            "operation_type": "deposit",
            "value": 5
        },
        {
            "operation_type": "deposit",
            "value": 2
        },
        {
            "operation_type": "deposit",
            "value": 52
        }        
    ],
    "draws": [
        {
            "operation_type": "draw",
            "value": 5
        },
        {
            "operation_type": "draw",
            "value": 2
        },
        {
            "operation_type": "draw",
            "value": 52
        }        
    ]
}
```


### `POST /operations`

Publique uma ordem assim:

```json
    {
        "operation_type": "deposit",
        "value": 5
    }
```


### `PUT /operations/{operation_ID}`

Edite uma ordem assim.

PUT:

```json
    {
        "id": 3,
        "operation_type": "draw",
        "value": 5
    }
```



Registre um usuário utilizando o endpoint:

### `POST /auth/users/create/`

```json
    {
        "name": "Fabricio Magalhães",
        "email": "contato@fabricioms.dev",
        "password": "88114527"
    }
```

Faça login usando:

### `POST /auth/jwt/create/`

```json
    {
        "email": "contato@fabricioms.dev",
        "password": "88114527"
    }
```

Obtenha suas informações usando:

### `GET /auth/users/me/`

```json
    {
        "name": "Fabricio Magalhães",
        "email": "contato@fabricioms.dev",
        "password": "88114527"
    }
```

## Como rodar?

🐳 Usando Docker

```
> docker-compose up 
```

O front end vai estar disponível em no endereço: http://0.0.0.0:4200
O back end vai estar disponível em no endereço: http://0.0.0.0:8082


## Muito Obrigado pela oportunidade de poder estar participando desse desafio! 