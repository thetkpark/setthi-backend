<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Setthi Backend
A NodeJS backend for Setthi app.

## Installation & Usage

Install all the dependencies
> yarn

Run in development mode
> yarn dev

Build the production version
> yarn build

Build and Run docker
> docker build --tag setthi && docker run -d -p 8080:8080 setthi

Stop running docker container

> docker stop $(docker ps | grep setthi | cut -d' ' -f1)



## API Routes

# Authentication 

### Registration

- Path: `/api/regis`

- Method: `POST`

- Request Body

  ```json
  {
    "email": "example@example.com",
    "password": "passwordExample"
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body

  ```json
  {
    "token": "JWT TOKEN"
  }
  ```

#### Error Response

- Status Code: `400`

- Response Body

  ```json
  {
    "success": false,
    "message": "username is required" | "password is required"
  }
  ```
---
### Sign In

- Path: `/api/signin`

- Method: `POST`

- Request Body

  ```json
  {
    "email": "example@example.com",
    "password": "passwordExample"
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body

  ```json
  {
    "token": "JWT TOKEN"
  }
  ```

#### Error Response

- Status Code: `400`

- Response Body

  ```json
  {
    "success": false,
    "message": "username is required" | "password is required" | "email or/and password doesn't matched"
  }
  ```

---

### Sign Out

- Path: `/api/signout`
- Method: `GET`

#### Success Response

- Status Code: `200`

- Response Body

  ```json
  {
    "success": true
  }
  ```

---

# Timeline Screen

### Get Timeline

- Path: `/api/timeline`
- Method: `GET`
- Request Header
  - Authorization: Bearer <token>

#### Success Response

- Status Code: `200`

- Response Body

  ```json
  {
    "balance": 10000.92,
    "transaction": [
      // Sorted by createdAt from lastest to oldest
      // Only latest 10 transaction
      "id": <Integer>,
      "title": <String>,
      "amount": <Double>,
      "transaction_type": "INCOME" | "EXPENSE" | "SAVING",
      "createdAt": <Datetime>,
      
    ]
  }
  ```
#### Error Response

- Status Code: `401`
- Response Body: NONE
---

# Wallet Screen

### Get wallet screen

- Path: `/api/wallets`
- Method: `GET`
- Request Header
  - Authorization: Bearer <token>

#### Success Response

- Status Code: `200`

- Response Body

  ```json
  {
    "history": [
      // Sort from latest to oldest
      {
        "date": <Date>,
        "amount": <Double>
      }
    ]
    "wallets": [
      {
        "id": <Integer>,
        "name": <String>,
        "amount": <Double>,
      }
  	]
  }
  ```

#### Error Response

- Status Code: `401`
- Response Body: NONE

---

### Create new wallet

- Path: `/api/wallet`
- Method: `POST`
- Request Header
  - Authorization: Bearer <token>

#### Success Response

- Status Code: `200`

- Response Body

  ```json
  {
    "history": [
      // Sort from latest to oldest
      {
        "date": <Date>,
        "amount": <Double>
      },
    ],
    "wallets": [
      {
        "id": <Integer>,
        "name": <String>,
        "amount": <Double>,
      },
  	]
  }
  ```

#### Error Response

- Status Code: `400`

- Response Body 

  ```json
  {
    "success": false,
    "message": "title is required" | "start_date is required" | "target_amount is required" | "end_date is required"
  }
  ```
- Status Code: `401`

- Response Body: NONE
---

# Saving Screen

### Get all Savings

- Path: `/api/savings`
- Method: `GET`
- Request Header
  - Authorization: Bearer <token>

#### Success Response

- Status Code: `200`

- Response Body

  ```json
  [
    {
      "id": <Integer>,
      "title": <String>,
      "start_date": <Date>,
      "end_date": <Date>,
      "current_amount": <Double>,
      "target_amount": <Double>,
    },
  ]
  ```
#### Error Response

- Status Code: `401`
- Response Body: NONE
---

### Create new saving

- Path: `/api/saving`

- Method: `POST`

- Request Header

  - Authorization: Bearer <token>

- Request Body

  ```json
  {
    "title": <String>,
    "target_amount": <Double>,
    "start_date": <Date>,
    "end_date": <Date>,
  }
  ```
#### Success Response

- Status Code: `201`

- Response Body

  ```json
  [
    {
      "id": <Integer>,
      "title": <String>,
      "start_date": <Date>,
      "end_date": <Date>,
      "current_amount": <Double>,
      "target_amount": <Double>,
    },
  ]
  ```

#### Error Response

- Status Code: `400`

- Response Body 

  ```json
  {
    "success": false,
    "message": "title is required" | "start_date is required" | "target_amount is required" | "end_date is required"
  }
  ```

- Status Code: `401`
- Response Body: NONE


---

# Setting Screen

### Get setting screen

- Path: `/api/settings`

- Method: `GET`

- Request Header

  - Authorization: Bearer <token>

#### Success Response

- Status Code: `200`

- Response Body

  ```json
  {
    "labels": [
      {
        "id": <Integer>,
        "label": <String>,
        "type": "INCOME" | "EXPENSE"
  		},
    ],
    "categories": [
      {
        "id": <Integer>,
        "name": <String>,
        "color": <String>,
        "type": "INCOME" | "EXPENSE"
  		}
    ]
  }
  ```

#### Error Response

- Status Code: `401`
- Response Body: NONE

---

### Get all labels

- Path: `/api/labels`

- Method: `GET`

- Request Header

  - Authorization: Bearer <token>

#### Success Response

- Status Code: `200`

- Response Body

  ```json
  [
    {
      "id": <Integer>,
      "label": <String>,
      "type": "INCOME" | "EXPENSE"
  	}
  ]
  ```

#### Error Response

- Status Code: `401`
- Response Body: NONE

---

### Create new label

- Path: `/api/label`

- Method: `POST`

- Request Header

  - Authorization: Bearer <token>

- Request Body

  ```json
  {
    "label": <String>,
    "type": "INCOME" | "EXPENSE"
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body

  ```json
  [
    {
      "id": <Integer>,
      "label": <String>,
      "type": "INCOME" | "EXPENSE"
  	}, 
  ]
  ```

#### Error Response

- Status Code: `400`

- Response Body

  ```json
  {
    "success": false,
    "message": "label is required" | "type is required" | "type can only be INCOME or EXPENSE"
  }
  ```

- Status Code: `401`

- Response Body: NONE

---

### Edit label

- Path: `/api/label/{id}`

- Method: `PATCH`

- Request Header

  - Authorization: Bearer <token>

- Request Body

  ```json
  {
    "label": <String>?,
    "type": "INCOME" | "EXPENSE"?
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body

  ```json
  [
    {
      "id": <Integer>,
      "label": <String>,
      "type": "INCOME" | "EXPENSE"
  	}, 
  ]
  ```

#### Error Response

- Status Code: `401`
- Response Body: NONE

---

### Delete a label

- Path: `/api/label/{id}`

- Method: `DELETE`

- Request Header

  - Authorization: Bearer <token>


#### Success Response

- Status Code: `201`

- Response Body

  ```json
  [
    {
      "id": <Integer>,
      "label": <String>,
      "type": "INCOME" | "EXPENSE"
  	}, 
  ]
  ```

#### Error Response

- Status Code: `404`

- Response Body

  ```json
  {
    "success": false,
    "message": "Label not found"
  }
  ```

- Status Code: `401`
- Response Body: NONE

---

### Get all Categories

- Path: `/api/categories`

- Method: `GET`

- Request Header

  - Authorization: Bearer <token>

#### Success Response

- Status Code: `200`

- Response Body

  ```json
  [
    // Only return if is_delete is false
    {
      "id": <Integer>,
      "name": <String>,
      "color": <String>,
      "type": "INCOME" | "EXPENSE"
  	}
  ]
  ```

#### Error Response

- Status Code: `401`
- Response Body: NONE

---

### Create new category

- Path: `/api/category`

- Method: `POST`

- Request Header

  - Authorization: Bearer <token>

- Request Body

  ```json
  {
    "name": <String>,
    "color": <String>,
    "type": "INCOME" | "EXPENSE"
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body

  ```json
  [
    // Only return if is_delete is false
    {
      "id": <Integer>,
      "name": <String>,
      "color": <String>,
      "type": "INCOME" | "EXPENSE"
  	}
  ]
  ```

#### Error Response

- Status Code: `400`

- Response Body

  ```json
  {
    "success": false,
    "message": "name is required" | "type is required" | "type can only be INCOME or EXPENSE" | "color is required"
  }
  ```

- Status Code: `401`

- Response Body: NONE

---

### Edit Category

- Path: `/api/category/{id}`

- Method: `PATCH`

- Request Header

  - Authorization: Bearer <token>

- Request Body

  ```json
  {
    "label": <String>?,
    "color": <String>?,
    "type": "INCOME" | "EXPENSE"?
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body

  ```json
  [
    // Only return if is_delete is false
    {
      "id": <Integer>,
      "name": <String>,
      "color": <String>,
      "type": "INCOME" | "EXPENSE"
  	}
  ]
  ```

#### Error Response

- Status Code: `401`
- Response Body: NONE

---

### Delete a category

- Path: `/api/category/{id}`

- Method: `DELETE`

- Request Header

  - Authorization: Bearer <token>

#### Success Response

- Status Code: `201`

- Response Body

  ```json
  [
    // Only return if is_delete is false
    {
      "id": <Integer>,
      "name": <String>,
      "color": <String>,
      "type": "INCOME" | "EXPENSE"
  	}
  ]
  ```

#### Error Response

- Status Code: `404`

- Response Body

  ```json
  {
    "success": false,
    "message": "Category not found"
  }
  ```

- Status Code: `401`
- Response Body: NONE

---

