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
        person: {}
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
              USER_MESSAGE: 'process'
            }
          },
          process: {
            invoke: {
              src: async (context, event) => await personService.getPeople(event.message.input),
              onDone: [
                {
                  cond: (context, event) => event.data && event.data.length,
                  actions: assign((context, event) => {
                    const patients = event.data;
                    context.taskforce.patients = patients;
                  }),
                  target: '#patientList'
                },
                {
                  cond: (context, event) => {
                    if (!event.data || !event.data.length) {
                      if (event.message.type == 'text') {
                        const mobileNumber = parseInt(dialog.get_input(event, false)).toString();
                        if (mobileNumber.length == 10) {
                          return true;
                        }
                        return false;
                      }
                      return false;
                    }
                  },
                  actions: assign((context, event) => {
                    context.taskforce.person.mobile = mobileNumber;
                  }),
                  target: '#patientName'
                }
              ]
            },
            always: [
              {
                target: 'error'
              }
            ]
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientNumber.error, context.user.locale), false);
            }),
            always: 'prompt'
          }
        }
      }, // patientName
      patientList: {
        id: 'patientList',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              let message = dialog.sendMessage(context, dialog.get_message(messages.patientList.prompt, context.user.locale));
              context.persons.forEach((person, i ) => {
                message = `${message}\n${i}. ${person.first_name}`;
              });
              message = `${message}\n${messages.patientList.postScript}`;
              dialog.sendMessage(context, dialog.get_message(message, context.user.locale), false);
            }),
            on: {
              USER_MESSAGE: 'process'
            }
          },
          process: {
            onEntry: assign((context, event) => {
              if (event.message.type == 'text') {
                const input = parseInt(dialog.get_input(event, false));
                if (input == 0) {
                  //Add new member
                } else if(input > 0) {
                  //Select the user
                }
              }
              context.validMessage = false;
            }),
            always: [
              {
                cond: (context) => context.validMessage,
                target: '#patientLocation'
              },
              {
                target: 'error'
              }
            ]
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientName.error, context.user.locale), false);
            }),
            always: 'prompt'
          }
        }
      }, // patientList
      patientName: {
        id: 'patientName',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientName.prompt, context.user.locale));
            }),
            on: {
              USER_MESSAGE: 'process'
            }
          },
          process: {
            onEntry: assign((context, event) => {
              if (event.message.type == 'text') {
                const name = dialog.get_input(event, false);
                if (event.message.type == 'text' && name.length < 100 && /^[ A-Za-z]+$/.test(name.trim())) {
                  context.taskforce.person.name = name;
                    context.validMessage = true;
                    return;
                }
              }
              context.validMessage = false;
            }),
            always: [
              {
                cond: (context) => context.validMessage,
                target: '#patientLocation'
              },
              {
                target: 'error'
              }
            ]
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientName.error, context.user.locale), false);
            }),
            always: 'prompt'
          }
        }
      }, // patientName
      patientLocation: {
        id: 'patientLocation',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientLocation.prompt, context.user.locale));
            }),
            on: {
              USER_MESSAGE: 'process'
            }
          },
          process: {
            onEntry: assign((context, event) => {
              if (event.message.type == 'text') {
                const location = dialog.get_input(event, false);
                context.taskforce.person.location = location;
                context.validMessage = true;
                return;
              }
              context.validMessage = false;
            }),
            always: [
              {
                cond: (context) => context.validMessage,
                target: '#patientLocation'
              },
              {
                target: 'error'
              }
            ]
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.patientLocation.error, context.user.locale), false);
            }),
            always: 'prompt'
          }
        }
      }, // patientName
      // persistPerson: {
      //   id: 'persistPerson',
      //   invoke: {
      //     src: (context) => personService.createPerson(context.slots.triage.person, context.user.mobileNumber),
      //     onDone: {
      //       actions: assign((context, event) => {
      //         context.slots.triage.person = event.data;
      //       }),
      //       target: '#specialSymptoms'
      //     }
      //     // TODO: handle duplicate person??
      //   }
      // },
      // upsertTriageDetails: {
      //   id: 'upsertTriageDetails',
      //   invoke: {
      //     src: (context) => triageService.upsertTriageDetails(context.slots.triage.person, context.slots.triage),
      //     onDone: {
      //       target: '#endstate'
      //     }
      //   }
      // }
    }
  }
}

module.exports = taskforceFlow;
