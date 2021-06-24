# HSP Service

Contract / Example service for a customer backend application.

## Setup local environment

### Initial setup

Install the dependencies of this project when setting it up initially using -

`npm i`

### Environment variables

`env.dev` file is needed in the root directory of this service to set the environment variables.
The variables that the service is expecting can be found in [this file](src/utils/secrets.ts).

## Run the service

Run the service using the following command -

`npm run start-dev`

## Run tests

`npm run test`

## Linting checks

The following command will check for linting errors in your code and try to fix the issues automatically.
The errors that are not fixed automatically will be displayed.

`npm run lint`
