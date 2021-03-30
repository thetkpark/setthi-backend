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

### Get Savings

- Path: `/api/saving`
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
    "labels": <Integer>,
    "categories": <Integer>
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

- Path: `/api/labels`

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

- Path: `/api/labels/{id}`

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

