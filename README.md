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

---



