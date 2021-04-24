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

# Setthi Backend
A NodeJS backend for Setthi app.

## Installation & Usage

List of environment variable that must be set

- DATABASE_URL
- JWT_SECRET
- MAILGUN_API_KEY
- MAILGUN_DOMAIN

Install all the dependencies

> yarn

Generate prisma schema
> npx prisma generate

Run in development mode
> yarn start:dev

Build the production version
> yarn build

Build and Run docker
> docker build --tag setthi && docker run -d -p 8080:8080 setthi

Stop running docker container

> docker stop $(docker ps | grep setthi | cut -d' ' -f1)



## API Routes

# Authentication 

### Registration

- Path: `/api/auth/regis`

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
      "statusCode": 400,
      "message": "This email is used" || "Email is required" || "Password is required",
      "error": "Bad Request"
  }
  ```
---
### Sign In

- Path: `/api/auth/signin`

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

- Status Code: `401`

- Response Body

  ```json
  {
      "statusCode": 401,
      "message": "Unauthorized"
  }
  ```
---
### Request Password Reset

- Path: `/api/auth/reset`

- Method: `POST`

- Request Body

  ```json
  {
    "email": "example@example.com"
  }
  ```
#### Success Response

- Status Code: `201`


#### Error Response

- Status Code: `404`

- Response Body

  ```json
  {
      "statusCode": 404,
      "message": "Account is not found",
      "error": "Not Found"
  }
  ```

---

### Check reset password token

- Path: `/api/auth/check-token`

- Method: `POST`

- Request Body

  ```json
  {
    "token": "123456"
  }
  ```
#### Success Response

- Status Code: `200`

#### Error Response

- Status Code: `400`

- Response Body

  ```json
  {
      "statusCode": 400,
      "message": "Token is expried or invalid",
      "error": "Bad Request"
  }
  ```

---

### Reset password with token

- Path: `/api/auth/reset`

- Method: `PATCH`

- Request Body

  ```json
  {
    "token": "123456",
    "password": "newPassword"
  }
  ```
#### Success Response

- Status Code: `200`

- Response Body

  ```json
  {
      "id": 4,
      "createdAt": "",
      "email": "",
      "password": "",
      "updatedAt": ""
  }
  ```

#### Error Response

- Status Code: `400`

- Response Body

  ```json
  {
      "statusCode": 400,
      "message": "Token is expried or invalid",
      "error": "Bad Request"
  }
  ```

---

# Timeline Screen

> TODO: Decide the response body

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
    "balance": <Double>,
    "transaction": [
      {
          "id": 30,
          "title": "Test Transaction Saving",
          "amount": "100",
          "date": "2021-04-06T00:00:00.000Z",
          "transaction_type": "SAVING",
          "createdAt": "2021-04-06T07:44:13.800Z",
          "updatedAt": "2021-04-06T07:44:13.801Z",
          "category_id": 12,
          "wallet_id": 1,
          "saving_id": 3,
          "owner_id": 2,
          "category": {
            "id": 12,
            "name": "Test Expense",
            "type": "EXPENSE",
            "color": "255:255:2:32",
            "is_deleted": false,
            "createdAt": "2021-04-06T06:58:22.959Z",
            "updatedAt": "2021-04-06T06:58:22.960Z",
            "owner_id": 2
        	},
          "saving": {
            "id": 3,
            "title": "Saving 4",
            "start_date": "2021-04-03T00:00:00.000Z",
            "end_date": "2022-04-03T00:00:00.000Z",
            "current_amount": "0",
            "target_amount": "1200",
            "is_finish": true,
            "createdAt": "2021-04-05T09:59:28.383Z",
            "updatedAt": "2021-04-06T08:00:26.898Z",
            "owner_id": 2
          },
          "wallet": {
            "id": 1,
            "name": "Wallet Test",
            "amount": "38800",
            "createdAt": "2021-04-03T10:10:50.596Z",
            "updatedAt": "2021-04-06T07:44:13.831Z",
            "owner_id": 2
          }
       }
    ]
  }
  ```
#### Error Response

- Status Code: `401`
- Response Body: NONE
---

### Create new income transaction

- Path: `/api/transaction/income`

- Method: `POST`

- Request Header

  - Authorization: Bearer <token>

- Request Body

  ```json
  {
      "title": "Test Transaction Income",
      "amount": 50000,
      "date": "2021-04-03",
      "category_id": 1,
      "wallet_id": 2
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body: `SAME as GET /api/timeline`


#### Error Response

- Status Code: `400`
- Response Body: NONE
- Status Code: `401`
- Response Body: NONE
- Status Code: `403`
- Response Body: NONE

---

### Create new expense transaction

- Path: `/api/transaction/expense`

- Method: `POST`

- Request Header

  - Authorization: Bearer <token>

- Request Body

  ```json
  {
      "title": "Test Transaction Expe4nse",
      "amount": 1200,
      "date": "2021-04-06",
      "category_id": 12,
      "wallet_id": 1
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body: `SAME as GET /api/timeline`

#### Error Response

- Status Code: `400`
- Response Body: NONE
- Status Code: `401`
- Response Body: NONE
- Status Code: `403`
- Response Body: NONE

---

### Create new expense transaction

- Path: `/api/transaction/saving`

- Method: `POST`

- Request Header

  - Authorization: Bearer <token>

- Request Body

  ```json
  {
      "title": "Test Transaction Saving",
      "amount": 100,
      "date": "2021-04-06",
      "category_id": 12,
      "wallet_id": 1,
      "saving_id": 3
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body: `SAME as GET /api/timeline`

#### Error Response

- Status Code: `400`
- Response Body: NONE
- Status Code: `401`
- Response Body: NONE
- Status Code: `403`
- Response Body: NONE

---

### Create new expense transaction

- Path: `/api/transaction/expense-saving`

- Method: `POST`

- Request Header

  - Authorization: Bearer <token>

- Request Body

  ```json
  {
      "title": "Test Transaction Saving",
      "amount": 1200,
      "date": "2021-04-06",
      "category_id": 12,
      "wallet_id": 1,
      "saving_id": 3
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body: `SAME as GET /api/timeline`

#### Error Response

- Status Code: `400`
- Response Body: NONE
- Status Code: `401`
- Response Body: NONE
- Status Code: `403`
- Response Body: NONE

---

# Wallet Screen

### Get all wallets

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
    "message": "title is required" | "start_date is required" | "target_amount is required" | "end_date is required" | "Limited number of wallets"
  }
  ```
- Status Code: `401`

- Response Body: NONE
---
### Get a wallet

- Path: `/api/wallet/{id}`
- Method: `GET`
- Request Header
  - Authorization: Bearer <token>
#### Success Response

- Status Code: `200`

- Response Body

  ```json
  {
        "id": <Integer>,
        "name": <String>,
        "amount": <Double>
  }
  
  // OR
  
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

- Status Code: `404`

---

### Edit a wallet

- Path: `/api/wallet/{id}`
- Method: `PATCH`
- Request Header
  
- Authorization: Bearer <token>
  
- Request Body

  ```json
  {
        "name": <String>?,
  }
  ```

#### Success Response

- Status Code: `201`

- Response Body

  ```json
  {
        "id": <Integer>,
        "name": <String>,
        "amount": <Double>
  }
  ```

#### Error Response

- Status Code: `404`

---

### Delete a wallet

- Path: `/api/wallet/{id}`
- Method: `DELETE`
- Request Header
  - Authorization: Bearer <token>

#### Success Response

- Status Code: `201`

- Response Body

  ```json
  {
        "id": <Integer>,
        "name": <String>,
        "amount": <Double>
  }
  ```

#### Error Response

- Status Code: `404`

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
    "message": "title is required" | "start_date is required" | "target_amount is required" | "end_date is required" | "Limited number of wallets"
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

