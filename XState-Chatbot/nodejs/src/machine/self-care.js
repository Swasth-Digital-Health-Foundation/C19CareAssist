const { assign } = require('xstate');
const dialog = require('./util/dialog.js');
const mediaUtil = require('./util/media');
const { personService, vitalsService, triageService } = require('./service/service-loader');
const { messages, grammer } = require('./messages/self-care');
const config = require('../../src/env-variables');
const { person } = require('./service/dummy-person-service.js');
const { context } = require('./chat-machine.js');

const selfCareFlow = {
  recordVitals: {
    id: 'recordVitals',
    initial: 'fetchPersons',
    onEntry: assign((context, event) => {
      context.slots.vitals = {};
      //if (context.role === 'taskforce') {
      context.slots.vitals.person = context.taskforce.selectedPatient;
      //}
    }),
    states: {
      fetchPersons: {
        invoke: {
          src: (context) => personService.getSubscribedPeople(context.user.mobileNumber),
          onDone: [
            {
              cond: (context, event) => event.data.length == 0,
              actions: assign((context, event) => {
                context.persons = event.data;
              }),
              target: '#noUserFound',
            },
            {
              cond: (context, event) => event.data.length == 1,
              actions: assign((context, event) => {
                context.slots.vitals.person = event.data[0];
              }),
              target: '#vitalsSpo2',
            },
            {
              cond: (context, event) => event.data.length > 1,
              actions: assign((context, event) => {
                context.persons = event.data;
              }),
              target: '#selectPerson',
            },
          ],
        },
      },
      noUserFound: {
        id: 'noUserFound',
        onEntry: assign((context, event) => {
          dialog.sendMessage(context, dialog.get_message(messages.noUserFound, context.user.locale), false);
        }),
        always: '#selfCareMenu',
      },
      selectPerson: {
        id: 'selectPerson',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              let message = dialog.get_message(messages.selectPerson.prompt, context.user.locale);
              let persons = context.persons;
              let grammer = [];
              for (let i = 0; i < persons.length; i++) {
                let person = persons[i];
                let grammerItem = { intention: person.uuid, recognize: [(i + 1).toString()] };
                grammer.push(grammerItem);
                message += '\n' + (i + 1) + '. ' + person.first_name;
              }
              context.grammer = grammer;
              dialog.sendMessage(context, message);
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              context.intention = dialog.get_intention(context.grammer, event, true);
            }),
            always: [
              {
                cond: (context) => context.intention == dialog.INTENTION_UNKOWN,
                target: 'error',
              },
              {
                actions: assign((context, event) => {
                  let personUuid = context.intention;
                  let personIndex = context.persons.findIndex((person) => person.uuid.includes(personUuid));
                  let person = context.persons[personIndex];
                  context.slots.vitals.person = person;
                }),
                target: '#vitalsSpo2',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(dialog.global_messages.error.optionsRetry, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      vitalsSpo2: {
        id: 'vitalsSpo2',
        initial: 'checkUser',
        states: {
          checkUser: {
            always: [
              {
                cond: (context, event) => !context.slots.vitals.person,
                target: '#noUserFound',
              },
              {
                target: 'prompt',
              },
            ],
          },
          prompt: {
            onEntry: assign((context, event) => {
              context.grammer = grammer.vitalsSpo2;
              let message = dialog.get_message(messages.vitalsSpo2.taskforce.prompt, context.user.locale, context.role);
              message = message.replace('{{name}}', context.slots.vitals.person.first_name);
              dialog.sendMessage(context, message);
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              context.intention = dialog.get_intention(context.grammer, event, true);
              context.slots.vitals.spo2 = context.intention;
            }),
            always: [
              {
                cond: (context) => context.intention == dialog.INTENTION_UNKOWN,
                target: 'error',
              },
              {
                cond: (context) => context.intention == 'bad',
                actions: assign((context, event) => {
                  let message = dialog.get_message(messages.vitalsSpo2Bad, context.user.locale, context.role);
                  message = message.replace('{{name}}', context.slots.vitals.person.first_name);
                  dialog.sendMessage(context, message);
                }),
                target: '#addVitals',
              },
              {
                target: '#vitalsPulse',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(dialog.global_messages.error.optionsRetry, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      vitalsPulse: {
        id: 'vitalsPulse',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              context.grammer = grammer.vitalsPulse;
              dialog.sendMessage(context, dialog.get_message(messages.vitalsPulse.prompt, context.user.locale));
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              if (event.message.type == 'text') {
                let pulse = parseInt(dialog.get_input(event, false));
                context.slots.vitals.pulse = pulse;
                context.validMessage = true;
                return;
              }
              context.validMessage = false;
            }),
            always: [
              {
                cond: (context) => context.slots.vitals.pulse,
                target: '#vitalsBreathing',
              },
              {
                target: 'error',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(dialog.global_messages.error.optionsRetry, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      vitalsBreathing: {
        id: 'vitalsBreathing',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              context.grammer = grammer.vitalsBreathing;
              dialog.sendMessage(context, dialog.get_message(messages.vitalsBreathing.prompt, context.user.locale));
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              if (event.message.type == 'text') {
                let breathing_rate = parseInt(dialog.get_input(event, false));
                context.slots.vitals.breathing_rate = breathing_rate;
                context.validMessage = true;
                return;
              }
              context.validMessage = false;
            }),
            always: [
              {
                cond: (context) => context.slots.vitals.breathing_rate,
                target: '#vitalsTemperature',
              },
              {
                target: 'error',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(dialog.global_messages.error.optionsRetry, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      vitalsSpo2Walk: {
        id: 'vitalsSpo2Walk',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              context.grammer = grammer.vitalsSpo2Walk;
              let message = dialog.get_message(messages.vitalsSpo2Walk.prompt, context.user.locale);
              message = message.replace('{{name}}', context.slots.vitals.person.first_name);
              dialog.sendMessage(context, message);
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              context.intention = dialog.get_intention(context.grammer, event, true);
              context.slots.vitals.spo2 = context.intention;
            }),
            always: [
              {
                cond: (context) => context.intention == dialog.INTENTION_UNKOWN,
                target: 'error',
              },
              {
                cond: (context) => context.slots.vitals.spo2 == 'good',
                target: '#vitalsTemperature',
              },
              {
                cond: (context) => context.slots.vitals.spo2 == 'bad',
                actions: assign((context, event) => {
                  let message = dialog.get_message(messages.vitalsSpo2WalkBad.prompt, context.user.locale);
                  message = message.replace('{{name}}', context.slots.vitals.person.first_name);
                  dialog.sendMessage(context, message);
                }),
                target: '#unsubscribePerson',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(dialog.global_messages.error.optionsRetry, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      vitalsTemperature: {
        id: 'vitalsTemperature',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              context.grammer = grammer.vitalsTemperature;
              dialog.sendMessage(context, dialog.get_message(messages.vitalsTemperature.prompt, context.user.locale));
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              context.intention = dialog.get_intention(context.grammer, event, true);
              context.slots.vitals.temperature = context.intention;
            }),
            always: [
              {
                cond: (context) => context.intention == dialog.INTENTION_UNKOWN,
                target: 'error',
              },
              {
                cond: (context) => context.slots.vitals.temperature == 'good',
                actions: assign((context, event) => {
                  dialog.sendMessage(context, dialog.get_message(messages.temperatureGood, context.user.locale, context.role));
                }),
                target: '#addVitals',
              },
              {
                cond: (context) => context.slots.vitals.temperature == 'bad',
                actions: assign((context, event) => {
                  dialog.sendMessage(context, dialog.get_message(messages.temperatureBad, context.user.locale, context.role));
                }),
                target: '#addVitals',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(dialog.global_messages.error.optionsRetry, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      addVitals: {
        id: 'addVitals',
        invoke: {
          src: (context) => {
            return vitalsService.addVitals(context.slots.vitals);
          },
          onDone: [
            {
              cond: (context) => {
                return context.role === 'taskforce';
              },
              target: '#addHomeIsolation',
            },
            {
              target: '#endstate',
            },
          ],
        },
      },
      addHomeIsolation: {
        id: 'addHomeIsolation',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.addHomeIsolation.prompt, context.user.locale, context.role));
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            invoke: {
              src: (context, event) => {
                return personService.updatePerson(context.slots.vitals.person, dialog.get_input(event) == 1, true);
              },
              onDone: [
                {
                  actions: assign((context, event) => {
                    if (event.data && event.data.is_home_isolated) {
                      dialog.sendMessage(context, dialog.get_message(messages.addHomeIsolation.sucessfullyIsolated, context.user.locale, context.role));
                    } else {
                      dialog.sendMessage(context, 'Person is not being home isolated.');
                    }
                  }),
                  target: '#endstate',
                },
              ],
            },
          },
        },
      },
    },
  },
  downloadReport: {
    id: 'downloadReport',
    initial: 'showReport',
    onEntry: assign((context, event) => {
      context.slots.report = {};
      context.slots.report.person = context.taskforce.selectedPatient;
    }),
    states: {
      reportFetchPersons: {
        always: [
          {
            cond: (context, event) => !context.taskforce.selectedPatient,
            target: '#reportNoUserFound',
          },
          {
            cond: (context, event) => context.taskforce.selectedPatient,
            actions: assign((context, event) => {
              context.slots.report.person = event.data[0];
            }),
            target: '#showReport',
          },
          //{
          //  cond: (context, event) => event.data.length > 1,
          //  actions: assign((context, event) => {
          //    context.persons = event.data;
          //  }),
          //  target: '#reportSelectPerson',
          //},
        ],
      },
      reportNoUserFound: {
        id: 'reportNoUserFound',
        onEntry: assign((context, event) => {
          dialog.sendMessage(context, dialog.get_message(messages.noUserFound, context.user.locale), false);
        }),
        always: '#selfCareMenu',
      },
      reportSelectPerson: {
        id: 'reportSelectPerson',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              let message = dialog.get_message(messages.reportSelectPerson.prompt, context.user.locale);
              let persons = context.persons;
              let grammer = [];
              for (let i = 0; i < persons.length; i++) {
                let person = persons[i];
                let grammerItem = { intention: person.uuid, recognize: [(i + 1).toString()] };
                grammer.push(grammerItem);
                message += '\n' + (i + 1) + '. ' + person.first_name;
              }
              context.grammer = grammer;
              dialog.sendMessage(context, message);
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              context.intention = dialog.get_intention(context.grammer, event, true);
            }),
            always: [
              {
                cond: (context) => context.intention == dialog.INTENTION_UNKOWN,
                target: 'error',
              },
              {
                actions: assign((context, event) => {
                  let personUuid = context.intention;
                  let personIndex = context.persons.findIndex((person) => person.uuid.includes(personUuid));
                  let person = context.persons[personIndex];
                  context.slots.report.person = person;
                }),
                target: '#showReport',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(dialog.global_messages.error.optionsRetry, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      showReport: {
        id: 'showReport',
        initial: 'checkUser',
        states: {
          checkUser: {
            always: [
              {
                cond: (context, event) => !context.taskforce.selectedPatient,
                target: '#reportNoUserFound',
              },
              {
                target: 'fetchReport',
              },
            ],
          },
          fetchReport: {
            invoke: {
              src: (context) => triageService.downloadReportForPerson(context.slots.report.person),
              onDone: {
                actions: assign((context, event) => {
                  const media = event.data;
                  const split = media.split('/');
                  const fileName = split[split.length - 1];
                  const message = {
                    type: 'media',
                    output: media,
                    caption: fileName,
                  };
                  dialog.sendMessage(context, message);
                }),
                target: '#endstate',
              },
            },
          },
        },
      },
    },
  },
  exitProgram: {
    id: 'exitProgram',
    initial: 'checkUser',
    onEntry: assign((context, event) => {
      context.slots.exitProgram = {};
      context.slots.exitProgram.person = context.taskforce.selectedPatient;
    }),
    states: {
      checkUser: {
        always: [
          {
            cond: (context) => !context.slots.exitProgram.person,
            target: '#exitProgramNoUserFound',
          },
          {
            cond: (context) => !context.slots.exitProgram.person.is_home_isolated || context.role == 'taskforce',
            target: '#exitReason',
          },
          {
            actions: assign((context, event) => {
              dialog.sendMessage(context, 'This member is marked for Home isolation by the task force. Please reach out to task force member at 99999 for more details');
            }),
            target: '#endstate',
          },
        ],
      },
      exitProgramFetchPersons: {
        invoke: {
          src: (context) => personService.getSubscribedPeople(context.user.mobileNumber),
          onDone: [
            {
              cond: (context, event) => event.data.length == 0,
              target: '#exitProgramNoUserFound',
            },
            {
              cond: (context, event) => event.data.length == 1,
              actions: assign((context, event) => {
                context.slots.exitProgram.person = event.data[0];
              }),
              target: '#exitReason',
            },
            {
              cond: (context, event) => event.data.length > 1,
              actions: assign((context, event) => {
                context.persons = event.data;
              }),
              target: '#exitProgramSelectPerson',
            },
          ],
        },
      },
      exitProgramNoUserFound: {
        id: 'exitProgramNoUserFound',
        onEntry: assign((context, event) => {
          dialog.sendMessage(context, dialog.get_message(messages.noUserFound, context.user.locale), false);
        }),
        always: '#selfCareMenu',
      },
      exitProgramSelectPerson: {
        id: 'exitProgramSelectPerson',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              let message = dialog.get_message(messages.exitProgram.exitPersonSelection.prompt, context.user.locale);
              let persons = context.persons;
              let grammer = [];
              for (let i = 0; i < persons.length; i++) {
                let person = persons[i];
                let grammerItem = { intention: person.uuid, recognize: [(i + 1).toString()] };
                grammer.push(grammerItem);
                message += '\n' + (i + 1) + '. ' + person.first_name;
              }
              context.grammer = grammer;
              dialog.sendMessage(context, message);
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              context.intention = dialog.get_intention(context.grammer, event, true);
            }),
            always: [
              {
                cond: (context) => context.intention == dialog.INTENTION_UNKOWN,
                target: 'error',
              },
              {
                actions: assign((context, event) => {
                  let personUuid = context.intention;
                  let personIndex = context.persons.findIndex((person) => person.uuid.includes(personUuid));
                  let person = context.persons[personIndex];
                  context.slots.exitProgram.person = person;
                }),
                target: '#exitReason',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(dialog.global_messages.error.optionsRetry, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      exitReason: {
        id: 'exitReason',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              context.grammer = grammer.exitReason;
              dialog.sendMessage(context, dialog.get_message(messages.exitProgram.exitReason.prompt, context.user.locale, context.role));
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              context.intention = dialog.get_intention(context.grammer, event, true);
            }),
            always: [
              {
                cond: (context) => context.intention == dialog.INTENTION_UNKOWN,
                target: 'error',
              },
              {
                actions: assign((context, event) => {
                  context.slots.exitProgram.exitReason = context.intention;
                }),
                target: '#exitFeedback',
              },
            ],
          },
          error: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(dialog.global_messages.error.optionsRetry, context.user.locale), false);
            }),
            always: 'prompt',
          },
        },
      },
      exitFeedback: {
        id: 'exitFeedback',
        initial: 'prompt',
        states: {
          prompt: {
            onEntry: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.exitProgram.exitFeedback.prompt, context.user.locale));
            }),
            on: {
              USER_MESSAGE: 'process',
            },
          },
          process: {
            onEntry: assign((context, event) => {
              context.slots.exitProgram.exitFeedback = dialog.get_input(event, false);
            }),
            always: '#unsubscribePerson',
          },
        },
      },
      unsubscribePerson: {
        id: 'unsubscribePerson',
        invoke: {
          src: (context) => {
            let person = context.slots.exitProgram.person;
            return personService.updatePerson(person, null, false);
          },
          onDone: {
            actions: assign((context, event) => {
              dialog.sendMessage(context, dialog.get_message(messages.exitProgram.unsubscribedSuccessfully, context.user.locale));
            }),
            target: '#endstate',
          },
        },
      },
    },
  },
};

module.exports = selfCareFlow;
