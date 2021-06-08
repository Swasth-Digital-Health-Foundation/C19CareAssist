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
        en_IN: 'Select the Patient No. \n',
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
          en_IN: 'Enter the name of the patient you want to add as home isolation',
          // TODO: translations
        },
        error: {
          en_IN: "I am sorry, I didn't understand. Please enter a valid name which is less than 100 characters.",
          // TODO: translations
        },
    },
    patientLocation: {
        prompt: {
          en_IN: 'Enter the location of the patient you want to add as home isolation',
          // TODO: translations
        },
        error: {
          en_IN: "I am sorry, I didn't understand. Please enter a valid location which is less than 100 characters.",
          // TODO: translations
        },
      },
  };
  
  module.exports.messages = messages;
  