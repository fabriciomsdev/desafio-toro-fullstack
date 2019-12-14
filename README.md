# Toro Full Stack Challenge

> **Solução Desenvolvida<br>**
> Uma carteira simples e poderosa que possibilita comprar as mais diversas ações do mercado, aportar valores para investir e retirar seus lucros através da venda das ações. Foi feita em Angular + Django + D.R.F. + Djoser + JWT + Docker!

<p align="center">
  <img src="https://i.imgur.com/E3ZMMBZ.png" width=900>
</p>

## O que ela faz?

Você pode depositar valores da sua conta ou sacar de forma rápida e ainda ter acesso a compra e venda das melhores ações em poucos cliques.

## Conceitos do Back End

Trasactions: São qualquer tipo de movimentação financeira feitas dentro da aplicação, possuem 2 tipos: <br>
    <ul>
        <li>
            -> Orders: São compras de ações feitas dentro da plataforma, cada ordem executada gera automáticamente uma Operation com seu valor correspondente. Possuem os subtipos: Sell (Venda) e Bought (Compra).
        </li>
        <li>
            -> Operations: São as operações bancárias feitas dentro da aplicação. Elas possuem os subtipos: Deposit (Aporte) e Draw (Retirada)<br>
        </li>
    </ul>

## Conceitos do Front End

Account Model: Estrutura de dados com todos os dados pertencentes ao usuário, seu saldo e regra de negócio que trata se um usuário pode sacar ou comprar ações

Account Component: Eles tratam da alimentação e distribuição dos dados da conta bancária do usuário, é uma estrutura angular que compõem a página inicial após login. ela possue 2 componentes principais:<br>

<ul>
    <li>
        -> Bank Component: Este componente manipula o saldo da conta bancária e interpreta alterações de saldo distribuindo entre a aplicação atraves do atributo account que acopla o decorator @Input(), toda mundança feita nele é distribuida nos outros componentes da aplicação;
    </li>
    <li>
        -> Trade Component: Este componente registra e executa as compras e vendas de ações. A cada ordem executada ele dispara um evento para ser registrada uma operação bancária pelo Bank Component decontando assim do saldo da conta, a verificação se ele pode ou não comprar ações é feita através da verificação usando o Account Model.
    </li>
</ul>

### Uma parceria bem desenhada: Quotes Model, Quotes Factory, Quotes Observer, Quotes Service, Provider Pattern.

Visto que a distribuição dos dados das ações é feita via Websocket em um pequeno microserviço e seus dados não estão bem estruturados eu formulei um padrão de distribuição e formatação de dados baseados no Observer pattern e Factory pattern. Sua Relação funciona da seguinte forma:

Quotes Service escuta o websocket através de Quotes Observer e a cada disparo do de evento socket ele chama Factory Pattern que recebe os dados do socket e os formata e constroi um Quotes Model que é para um padrão entendível para a aplicação Angular. Assim o service devolve este objeto para Quotes Service. A partir deste ponto a lista de cotações podem ser capturada através do metódo QuotesService.whenQuotesChange();


## Decisions

Por mais que pareça ser um app pequeno, eu tomei várias decisões:

### Usar o Docker Compose de primeira?

Não era um requisito do desafio, mas quando me lembrei de seus benefícios e que eles facilitariam os testes a minha futura equipe na aplicação e assim economizariam muito tempo resolvi cair de cabeça e ser a primeira coisa que eu planejei e escrevi.

Toda a aplicação roda apenas com um comando:

🐳 

```
> docker-compose up --build -d
```

### Factory Pattern, Observer Pattern?

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
- Payload:

```json
    {
        "order_type": "bought",
        "sigla": "PETR4",
        "quantity": 5
    }
```

### `PUT /orders/{order_ID}`

Edite uma ordem assim.

PUT:

- Payload:

```json
    {
        "id": 3,
        "order_type": "sell",
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
            "value": 522
        },
        {
            "operation_type": "deposit",
            "value": 233
        },
        {
            "operation_type": "deposit",
            "value": 5233
        }        
    ],
    "draws": [
        {
            "operation_type": "draw",
            "value": 5444
        },
        {
            "operation_type": "draw",
            "value": 233
        },
        {
            "operation_type": "draw",
            "value": 52
        }        
    ]
}
```

Some o valor total de 'deposits.value' e subtraia do valor total de 'draws.value' para chegar o balanço da conta.

### `POST /operations`

Publique uma operação assim:

```json
    {
        "operation_type": "deposit",
        "value": 500
    }
```


### `PUT /operations/{operation_ID}`

Edite uma operação assim.

PUT:

```json
    {
        "id": 3,
        "operation_type": "draw",
        "value": 500
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

Payload:
```json
    {
        "email": "contato@fabricioms.dev",
        "password": "88114527"
    }
```

Response:
```json
    {
        "access": "sjdghasiudg#552uaiwyedhas1223dioaue1832132730udsaohd23dyrte5523sdasdasd",
        "refresh": "sjdghasiudguaiwyedhasdioaue182730udsaohdasdasdasd@sjdghasiudguaiwyedhas"
    }
```

Obtenha suas informações usando:

### `GET /auth/users/me/`

Response:
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