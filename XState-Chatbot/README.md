# XState-Chatbot [![npm build, lint, test and publish](https://github.com/Swasth-Digital-Health-Foundation/C19CareAssist/actions/workflows/node-ci.yml/badge.svg)](https://github.com/Swasth-Digital-Health-Foundation/C19CareAssist/actions/workflows/node-ci.yml)

XState-Chatbot is a chatbot developed on the technology [XState](https://xstate.js.org/docs/). XState is a JavaScript implementation of the concept of [State-Charts](https://statecharts.github.io).

Please refer to [LOCALSETUP.md](./LOCALSETUP.md) to guide you through local setup.

Each sub-project ```nodejs``` and ```react-app``` has it's separate README.
 
Chatbot is developed as a backend service that will receive messages incoming from the user, and send messages to the user using a separate api call.
 
In this project, the `nodejs` directory contains the primary project. It contains all the files of the project that will get deployed on the server. `react-app` is provided only to ease the process of dialog development. It should be used only on a developer's local machine when developing any new chat flow. `nodejs` should be run as a backend service and tested once on the local machine using postman before deploying the build to the server.

## Modifying the Dialog

The Xstate Machine that contains the dialog is present in ```nodejs/src/machine/```. To modify the dialog, please make changes to those file.

Modifying messages without any change to dislog flow could be handled by just modifying the files in [messages](./nodejs/src/machine/messages) directory.

Any external api calls are written as part of files present in ```nodejs/src/machine/service``` which would get called from the state machine.

## Environment Variables
Environment Variables can configured as present in the [env-variables.js](./nodejs/src/env-variables.js).

Some of the environment variables and their usage is listed below:

1. WHATSAPP_PROVIDER: To configure the WhatsApp Provider. You can take [kaleyra.js](./nodejs/src/channel/kaleyra.js) as a reference implementation. ```console``` is a provider which could be used to test the project on a developer's locale machine to test the changes.
2. REPO_PROVIDER: It can be used to configure the datastore for state management between consecutive messages from a user. ```InMemory``` datastore can be used to kick-off chatbot development. ```PsotgreSQL``` should be used in production environment.
3. SERVICE_PROVIDER: To ease the dialog development without relying on any backend services, this value could be set to ```Dummy```. In production environment it should NOT be set to Dummy. The services are defined in [service](./nodejs/src/machine/service) directory. Which service gets loaded at runtime is defined in [service-loader.js](./nodejs/src/machine/service/service-loader.js)

## Remote Debugging

To support remote debugging, we recommend using [VSCode](https://code.visualstudio.com). The VSCode [launch](./.vscode/launch.json) script file is written which will be used to start the remote debugging session. 

Steps to start a remote debugging session:

1. Port forward to the the remote server (9229:9229)
2. In VSCode Run options, select "Attach to remote" 
3. Start Debugging