const { assign } = require('xstate');
const dialog = require('./util/dialog.js');
const { personService } = require('./service/service-loader');
const { messages } = require('./messages/taskforce');
// const config = require('../env-variables');

const taskforceFlow = {
  registerForIsolationFlow: {
    id: 'registerForIsolationFlow',
    initial: 'patientNumber',
    onEntry: assign((context, event) => {
      context.taskforce = {
        person: {},
      };
    }),
    states: {
      patientNumber: {
        id: 'patientNumber',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientNumber.prompt, context.user.locale));
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              let input = dialog.get_input(event, false);
              if (input.length === 10) {
                context.taskforce.person.mobile = input;
              }
            }),
            always: [
              {
                cond: (context) => context.taskforce.person.mobile,
                target: '#patientLocation',
              },
              {
                target: 'error',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientNumber.error, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      patientList: {
        id: 'patientList',
        initial: 'fetchUser',
        states: {
          fetchUser: {
            id: 'fetchUser',
            invoke: {
              src: (context, event) => {
                if (event.data) {
                  return personService.getPeople(event.data.mobile);
                }
                return personService.getPeople(event.message.input);
              },
              onDone: [
                {
                  cond: (context, event) => {
                    return event.data && event.data.length > 0;
                  },
                  actions: assign((context, event) => {
                    const patients = event.data;
                    context.taskforce.patients = patients;
                  }),
                  target: 'prompt',
                },
                {
                  target: '#patientName',
                },
              ],
              onError: {
                target: 'error',
                actions: (context, event) => console.log(event.data),
              },
            },
          },
          prompt: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientList.prompt, context.user.locale));
              let message = context.taskforce.patients.reduce((message, person, i) => `${message}\n${i + 1}. ${person.first_name}`, '');
              message += `\n${messages.patientList.postScript[context.user.locale]}`;
              dialog.sendMessage(context, message);
            }),

            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              context.option = dialog.get_input(event, false);
            }),
            always: [
              {
                cond: (context, event) => context.option === '0',
                target: '#patientName',
              },
              {
                cond: (context, event) => context.option !== '0',
                actions: assign((context, event) => {
                  context.user.mobileNumber = context.taskforce.patients[+context.option - 1];
                }),
                target: '#vitalsSpo2',
              },
              {
                target: 'error',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientName.error, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      patientName: {
        id: 'patientName',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientName.prompt, context.user.locale));
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              if (event.message.type == 'text') {
                const first_name = dialog.get_input(event, false);
                if (event.message.type == 'text' && first_name.length < 100 && /^[ A-Za-z]+$/.test(first_name.trim())) {
                  context.taskforce.person.first_name = first_name;
                }
              }
            }),
            always: [
              {
                cond: (context) => context.taskforce.person.first_name,
                target: '#addPerson',
              },
              {
                target: 'error',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientName.error, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      patientLocation: {
        id: 'patientLocation',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientLocation.prompt, context.user.locale));
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              context.taskforce.person.location = event.message.input;
            }),
            always: {
              target: '#patientList',
            },
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientLocation.error, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      addPerson: {
        id: 'addPerson',
        invoke: {
          src: (context, event) => personService.createPerson(context.taskforce.person),
          onDone: [
            {
              actions: assign((context, event) => {
                context.taskforce.person = event.data;
              }),
              target: '#fetchUser',
            },
          ],
          onError: {
            actions: (context, event) => console.log(event.data),
          },
          // TODO: handle duplicate person??
        },
      },
    },
  },
};

module.exports = taskforceFlow;
