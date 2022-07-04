<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 

## Description

A RESTful API code repository to log the air temperature from different weather stations implemented by technologies:  [Nest](https://github.com/nestjs/nest) framework , TypeScript, Express and PostgresSQL.


## Installation

```bash
$ yarn install
```

## Running the app

Simply run the project by
```bash
$ yarn start:dev
```

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Features

 -  **Authentication**:  Register and Login.
 - **Authorization**: JWT access token retrieved after successful login is required for calling endpoints and is used to know who makes the request and restrict what they can see or change.
 - **User**:  CRUD Controller and Service for managing users
 - **Station**:  CRUD Controller and Service for managing stations
 - **Temp Log**:  CRUD Controller and Service for managing temperature logs
 - **Stats**:  Allows getting statistical data like highest, lowest, median and average of temperature logs for any given user. Also available within a specific date range if provided as a query parameter on corresponding endpoint.
 - **Admin Privilege**:  The right for viewing and altering all data. Created once the project runs with following credentials:
		 ``
		 "username: "admin",
		 "password: "admin"
		 ``
- **API Documentation**:  Try Swagger API Documentation [here](http://localhost:3000/api/v1/docs/) after running the project.

## Stay in touch

- LinkedIn - [Ashkan Madine](https://www.linkedin.com/in/ashckon/)

## License
[MIT licensed](LICENSE).

