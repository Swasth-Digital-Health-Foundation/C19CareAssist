let messages = {
  patientNumber: {
    prompt: {
      en_IN: 'Enter the mobile number of the patient you want to add as home isolation',
      // TODO: translations
    },
    error: {
      en_IN: "I am sorry, I didn't understand. Please enter a valid number (10 characters)",
      // TODO: translations
    },
  },
  patientList: {
    prompt: {
      en_IN: 'Associated members to this mobile number. \n',
      // TODO: translations
    },
    postScript: {
      en_IN: 'Or Press 0 to Add new Member',
    },
    error: {
      en_IN: "I am sorry, I didn't understand. Please enter a valid number (10 characters)",
      // TODO: translations
    },
  },
  patientName: {
    prompt: {
      en_IN: 'Enter the name of the patient you want to add',
      // TODO: translations
    },
    error: {
      en_IN: "I am sorry, I didn't understand. Please enter a valid name which is less than 100 characters.",
      // TODO: translations
    },
  },
  patientLocation: {
    prompt: {
      en_IN: 'Enter the location of the patient.',
      // TODO: translations
    },
    error: {
      en_IN: "I am sorry, I didn't understand. Please enter a valid location which is less than 100 characters.",
      // TODO: translations
    },
  },
  isolatePatient: {
    prompt: {
      en_IN: 'Do you want to home isolate the patient?\n1. Yes\n2. No',
      // TODO: translations
    },
    error: {
      en_IN: "I am sorry, I didn't understand. Please enter a valid location which is less than 100 characters.",
      // TODO: translations
    },
  },
};

module.exports.messages = messages;
