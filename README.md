# tst-node-sqlite
Playing around default built-in SQLite Node.js module.

## Getting started
Follow the next steps to get the API running locally:

### Installing all dependencies

```sh
npm ci
```

### Running the API locally

```sh
npm run start:dev
```

## API Docs

### Creating a new account
You can create a new account using `/api/auth/sign-up` endpoint sending a valid email and password like following:

```sh
http post http://localhost:8080/api/auth/sign-up email=VALID_EMAIL password=VALID_PASSWORD
```

### Getting a valid token
You can retrive an API token using `/api/auth/sign-in` endpoint sending an existing email and password like following:

```sh
http post http://localhost:8080/api/auth/sign-in email=VALID_EMAIL password=VALID_PASSWORD
```

### Testing the token
You can test your token using `/api/greting` endpoint sending it as an authorization bearer header like following:

```sh
http get http://localhost:8080/api/greeting 'Authorization: Bearer VALID_JWT_TOKEN'
```
