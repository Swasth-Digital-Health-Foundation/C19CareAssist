let messages = {
  selectLanguage: {
    prompt: {
      preamble: {
        en_IN: 'Welcome to the COVID-19 Chatbot for Mon District_Nagaland. I am set up to assist you with your COVID-19 questions and concerns. Please select your preferred language.',
        // TODO: Get translations for this text
      },
      options: {
        list: ['en_IN', 'hi_IN', 'nbe_IN'],
        messageBundle: {
          en_IN: {
            en_IN: 'English',
          },
          hi_IN: {
            en_IN: 'हिंदी',
          },
          nbe_IN: {
            //TODO: Update in Konyak text
            en_IN: 'Konyak',
          },
        },
      },
    },
  },
  menu: {
    prompt: {
      preamble: {
        en_IN: 'You can get information about Covid 19 and Register in the Self care program in Home Isolation. You can also record your vitals here and get alarms and notifications. Our team from health shall reach out to you in case you need to be home isolated. \nWhat would you like to do?',
        // TODO: Get translations for this text
      },
      postscript: {
        en_IN: '\n\nYou can always get back to the main menu by sending "Reset".\n\nBy continuing to use our chat facility, you agree to our Terms & Conditions of use https://www.swasth.app/swasth_terms_wb.pdf',
        hi_IN: '\n\n "Reset " टाइप करके भेजने पर आप मेन मेनू पर वापस आ सकते हैं \n\nहमारे चैट सुविधा का उपयोग करके आप हमारे नियमों और उपयोग के शर्तों का पालन करने के लिए सहमति दे रहे हैं https://www.swasth.app/swasth_terms_wb.pdf',
        ta_IN: '\n\n"Reset" செய்து எந்த நேரத்திலும் நீங்கள் மெயின் மெனுவுக்குப் போகலாம் \n\nஎங்கள் சாட் பாக்ஸ் வசதியைத் தொடர்ந்து பயன்படுத்துவதன் மூலம், எங்கள் பயன்பாட்டு விதிமுறைகள் மற்றும் நிபந்தனைகளை நீங்கள் ஒப்புக்கொள்கிறீர்கள் https://www.swasth.app/swasth_terms_wb.pdf',
        ma_IN: "\n\nतुम्ही  'रीसेट/Reset' वापरून  मुख्य मेन्युला जाऊ शकता.\n\n आमची च्याटिंग सुविधा वापरल्यास तुमची सहमती गृहित आहे https://www.swasth.app/swasth_terms_wb.pdf",
        kn_IN: '\n\n"Reset" ಎಂದು ಕಳಿಸುವ ಮೂಲಕ ಯಾವಾಗ ಬೇಕಾದರೂ ನೀವು ಮುಖ್ಯ ಮೆನುಗೆ ಹಿಂತಿರುಗಬಹುದು. \n\nನಮ್ಮ ಚಾಟ್ ಸೌಲಭ್ಯವನ್ನು ಮುಂದುವರೆಸುವುದಾದರೆ, ನಮ್ಮ ಷರತ್ತು ಹಾಗೂ ನಿಯಮಗಳನ್ನು ಒಪ್ಪಬೇಕು https://www.swasth.app/swasth_terms_wb.pdf',
        te_IN: '\n\nప్రధాన మెనూకు చేరేందుకు రీసెట్(Reset) అని పంపండి \n\nమా చాట్ ఫెసిలిటీ ద్వారా కొనసాగేందుకు అన్ని నియమనిబంధనలకు మీరు అంగీకారం తెలుపుతున్నారా https://www.swasth.app/swasth_terms_wb.pdf',
      },
      options: {
        newUser: ['info', 'infoTesting', 'infoVaccination', 'worried'],
        subscribedUser: ['info', 'infoTesting', 'infoVaccination', 'worried', 'selfCare'],
        taskforceUser: ['info', 'infoTesting', 'infoVaccination', 'worried', 'registerForIsolation'],
        // adminUser: ['info', 'infoTesting', 'infoVaccination', 'registerForIsolation', 'recordPatientVitals'],
        messageBundle: {
          worried: {
            en_IN: 'I am not feeling well.',
            hi_IN: 'मैं COVID-19 को लेकर बहुत चिंतित हूँ',
            ta_IN: 'நான் கவலைப்படுகிறேன், கொரோனா தொடர்பான சந்தேகங்கள்உள்ளன',
            ma_IN: 'मी चिंताग्रस्त आहे आणि मला कोविडशी संबंधित चिंता आहे',
            kn_IN: 'ನನಗೆ ಚಿಂತೆ ಕಾಡುತ್ತಿದೆ, ಹಾಗೆಯೇ ಕೋವಿಡ್ 19 ಕುರಿತು ಆತಂಕಕ್ಕೆ ಒಳಗಾಗಿದ್ದೇನೆ',
            te_IN: 'కోవిడ్-19 సంబంధిత సమాచారంతో నాలో ఆందోళన నెలకొంది',
          },
          selfCare: {
            en_IN: 'I want to manage my self-monitoring program',
            hi_IN: 'मैं अपने आप ही COVID-19 संक्रमण पर ध्यान रखना चाहता/चाहती हूं',
            ta_IN: 'எனது சுய கண்காணிப்பை நிர்வகிக்க விரும்புகிறேன்',
            ma_IN: 'मला माझा स्व-देखरेख कार्यक्रम व्यवस्थापित करायचा आहे',
            kn_IN: 'ನಾನು ಸ್ವಯಂ ನಿರ್ವಹಣೆ ಮಾಡಿಕೊಳ್ಳಲು ಬಯಸುತ್ತೇನೆ',
            te_IN: 'స్వీయ పర్యవేక్షణలో నన్ను నేను ఉంచుకోవాలని భావిస్తున్నాను',
          },
          info: {
            en_IN: 'I need information on C19',
            // TODO: Update the language text below
            hi_IN: 'मुझे COVID-19 सुविधाओं के बारे में जानकारी चाहिए',
            ta_IN: 'கொரோனா பாதுகாப்பு மையங்கள் பற்றிய தகவல்களை நான் விரும்புகிறேன்',
            ma_IN: 'मला कोविड सुविधांविषयी माहिती हवी आहे',
            kn_IN: 'ನನಗೆ ಕೋವಿಡ್ 19 ಆರೈಕೆ ಸೌಲಭ್ಯದ ಕುರಿತು ಮಾಹಿತಿ ಬೇಕು',
            te_IN: 'కోవిడ్-19 కేర్ ఫెసిలిటీస్ గురించి సమాచారం కావాలి మా చాట్ ఫెసిలిటీ ద్వారా కొనసాగేందుకు అన్ని నియమనిబంధనలకు మీరు అంగీకారం తెలుపుతున్నారా',
          },
          infoTesting: {
            en_IN: 'I need information on Testing',
            // TODO: Add the language text below
          },
          infoVaccination: {
            en_IN: 'I need information on vaccination',
            // TODO: Add the language text below
          },
          registerForIsolation: {
            en_IN: 'For Task force members Only',
            // TODO: Add the language text below
          },
          recordPatientVitals: {
            en_IN: 'For AdminOnly',
            // TODO: Add the language text below
          },
        },
      },
    },
  },
  triageMenu: {
    prompt: {
      preamble: {
        en_IN: 'Let me try and address them! Tell me more about your concerns...',
        hi_IN: 'आप हमें अपनी समस्याओं के बारे में बताएं, हम आपकी चिंता दूर करने की कोशिश करेंगे',
        ta_IN: 'நான் முயற்சி செய்து அவை குறித்து சொல்கிறேன்! உங்கள் கவலைகளைப் பற்றி மேலும் சொல்லுங்கள்...',
        ma_IN: 'मी प्रयत्न करू आणि त्यांना संबोधित करू! मला तुमच्या चिंतांबद्दल अधिक सांगा ...',
        kn_IN: 'ನಿಮಗಿರುವ ಆತಂಕದ ಬಗ್ಗೆ ಹೇಳಿ, ಪರಿಹಾರಕ್ಕೆ ನಾವು ಪ್ರಯತ್ನಿಸುತ್ತೇವೆ',
        te_IN: 'మీ సందేహాలకు సమాధానం ఇస్తాను. ఇంకా ఏమైనా సమస్యలతో  ఆందోళన చెందుతున్నారా..?',
      },
      options: {
        list: ['symptoms', 'contactCovid', 'doctorAdvise'],
        messageBundle: {
          symptoms: {
            en_IN: 'I may have COVID-19 symptoms',
            hi_IN: 'मुझमें शायद COVID-19 के लक्षण हैं',
            ta_IN: 'எனக்கு COVID-19 அறிகுறிகள் இருக்கலாம்',
            ma_IN: 'मला कोविड-19 ची लक्षणे असू शकतात',
            kn_IN: 'ನಾನು ಕೋವಿಡ್ 19 ಲಕ್ಷಣಗಳನ್ನು ಹೊಂದಿರಬಹುದು',
            te_IN: 'నాకు కరోనా లక్షణాలు ఉండే అవకాశం ఉందా',
          },
          contactCovid: {
            en_IN: 'I have come in contact with a COVID-19 patient',
            hi_IN: 'मैं COVID-19 से संक्रमित व्यक्ति के संपर्क में आई/आया था',
            ta_IN: 'நான் ஒரு கோவிட் -19 நோயாளியுடன் தொடர்பு கொண்டுள்ளேன்',
            ma_IN: 'मी कोविड-19 रूग्णाच्या संपर्कात आला आहे',
            kn_IN: 'ನಾನು ಕೋವಿಡ್ 19 ರೋಗಿಯೊಂದಿಗೆ ನಿಕಟ ಸಂಪರ್ಕದಲ್ಲಿದ್ದೇನೆ( ಅಂದರೆ ಕೊರೊನಾ ಸೋಂಕಿಗೆ ತುತ್ತಾದ ರೋಗಿಯೊಂದಿಗೆ 10 ನಿಮಿಷಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಮಯ ಕಳೆದಿದ್ದೇನೆ, ಮಾಸ್ಕ್ ಇಲ್ಲದೆ 6 ಅಡಿಗಳಿಗಿಂತ ಹೆಚ್ಚು ಹತ್ತಿರದ್ದಲ್ಲಿದ್ದೆ.)',
            te_IN: 'కోవిడ్ -19 పేషెంట్‌తో కాంటాక్ట్‌లోకి వచ్చాను( దాదాపు 10 నిమిషాల పాటు కోవిడ్ పేషెంట్‌తో మాట్లాడాను. ఆ సమయంలో ఆరు అడుగుల దూరంను పాటించలేదు)',
          },
          doctorAdvise: {
            en_IN: 'My doctor has advised homecare for COVID management',
            hi_IN: 'डॉक्टर ने मुझे घर पर ही COVID-19 के देखभाल की सलाह दी है',
            ta_IN: 'வீட்டில் இருந்தே கோவிட் பராமரிப்பு மேற்கொள்ளும் ஆலோசனைகளை எனது மருத்துவர் வழங்கியுள்ளார்',
            ma_IN: 'माझ्या डॉक्टरांनी कोविड व्यवस्थापनासाठी होमकेअरचा सल्ला दिला आहे',
            kn_IN: 'ನನಗೆ ಕೊರೊನಾ ಸೋಂಕು ತಗುಲಿದ್ದು, ವೈದ್ಯರು ಮನೆಯಲ್ಲೇ ಆರೈಕೆ ಮಾಡಿಕೊಳ್ಳುವಂತೆ ಸಲಹೆ ನೀಡಿದ್ದಾರೆ.',
            te_IN: 'పరీక్ష చేయించుకోగా కోవిడ్ పాజిటివ్‌గా నిర్థారణ అయ్యింది. డాక్టర్ ఇంట్లోనే ఉండి జాగ్రత్తచర్యలు తీసుకోమని సలహా ఇచ్చారు.',
          },
        },
      },
    },
  },
  selfCareMenu: {
    prompt: {
      preamble: {
        en_IN: 'How would you like to proceed?',
        hi_IN: 'आप किस प्रकार शुरू करना चाहेंगे?',
        ta_IN: 'நீங்கள் எவ்வாறு தொடர விரும்புகிறீர்கள்?',
        ma_IN: 'आपण पुढे कसे जाऊ इच्छिता?',
        ka_IN: 'ನೀವು ಹೇಗೆ ಮುಂದುವರೆಯಲು ಬಯಸುತ್ತೀರಿ?',
        te_IN: 'మీరెలా ముందుకెళ్లాలనుకుంటున్నారు',
      },
      options: {
        taskforceUser: {
          list: ['recordVitals', 'downloadReport', 'exitProgram'],
          messageBundle: {
            recordVitals: {
              en_IN: 'Enter vitals',
              hi_IN: 'वाइटल्स दर्ज करें',
              ta_IN: 'உயிரணுக்களை உள்ளிடவும்',
              ma_IN: 'आपल्या तब्यतीची ची माहिती फीड करा',
              kn_IN: 'ಮಹತ್ವದ ಮಾಹಿತಿ ದಾಖಲಿಸಿ',
              te_IN: 'వైటల్స్‌ను ఎంటర్ చేయండి',
            },
            downloadReport: {
              en_IN: 'Download vitals report',
              hi_IN: 'वाइटल्स रिपोर्ट डाउनलोड करें',
              ta_IN: 'உயிரணுக்களின் அறிக்கையைப் பதிவிறக்குங்கள்',
              ma_IN: 'आपल्या तब्यतीची चा  अहवाल डाउनलोड करा',
              kn_IN: 'ಮಾಹಿತಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
              te_IN: 'వైటల్స్‌ రిపోర్టును డౌన్‌లోడ్  చేసుకోండి',
            },
            exitProgram: {
              en_IN: 'Exit self care program',
              hi_IN: 'आत्म देखभाल प्रोग्राम से बाहर निकलें',
              ta_IN: 'சுய பாதுகாப்பு திட்டத்திலிருந்து வெளியேறு',
              ma_IN: 'सेल्फ केअर प्रोग्राममधून बाहेर पडा',
              kn_IN: 'ಸ್ವಯಂ ಆರೈಕೆ ಕಾರ್ಯಕ್ರಮದಿಂದ ನಿರ್ಗಮಿಸಿ',
              te_IN: 'ఎగ్జిట్ సెల్ఫ్ కేర్ ప్రోగ్రామ్',
            },
          },
        },
        hasLivePatients: {
          list: ['triage', 'addPatient', 'recordVitals', 'downloadReport', 'exitProgram'],
          messageBundle: {
            triage: {
              en_IN: 'Triage your issue.',
            },
            addPatient: {
              en_IN: 'Enroll a new patient into the program',
              hi_IN: 'कार्यक्रम में एक नए रोगी को भर्ती करें',
              ta_IN: 'ஒரு புதிய நோயாளியை நிரலில் சேர்க்கவும்',
              ma_IN: 'प्रोग्राममध्ये नवीन रुग्णाची नावनोंदणी करा',
              kn_IN: 'ಹೊಸ ರೋಗಿಯನ್ನು ದಾಖಲಿಸಿ',
              te_IN: 'కొత్త పేషెంటును ఎన్‌రోల్ చేయండి',
            },
            recordVitals: {
              en_IN: 'Enter vitals',
              hi_IN: 'वाइटल्स दर्ज करें',
              ta_IN: 'உயிரணுக்களை உள்ளிடவும்',
              ma_IN: 'आपल्या तब्यतीची ची माहिती फीड करा',
              kn_IN: 'ಮಹತ್ವದ ಮಾಹಿತಿ ದಾಖಲಿಸಿ',
              te_IN: 'వైటల్స్‌ను ఎంటర్ చేయండి',
            },
            downloadReport: {
              en_IN: 'Download vitals report',
              hi_IN: 'वाइटल्स रिपोर्ट डाउनलोड करें',
              ta_IN: 'உயிரணுக்களின் அறிக்கையைப் பதிவிறக்குங்கள்',
              ma_IN: 'आपल्या तब्यतीची चा  अहवाल डाउनलोड करा',
              kn_IN: 'ಮಾಹಿತಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
              te_IN: 'వైటల్స్‌ రిపోర్టును డౌన్‌లోడ్  చేసుకోండి',
            },
            exitProgram: {
              en_IN: 'Exit self care program',
              hi_IN: 'आत्म देखभाल प्रोग्राम से बाहर निकलें',
              ta_IN: 'சுய பாதுகாப்பு திட்டத்திலிருந்து வெளியேறு',
              ma_IN: 'सेल्फ केअर प्रोग्राममधून बाहेर पडा',
              kn_IN: 'ಸ್ವಯಂ ಆರೈಕೆ ಕಾರ್ಯಕ್ರಮದಿಂದ ನಿರ್ಗಮಿಸಿ',
              te_IN: 'ఎగ్జిట్ సెల్ఫ్ కేర్ ప్రోగ్రామ్',
            },
          },
        },
        noLivePatients: {
          list: ['addPatient', 'downloadReport'],
          messageBundle: {
            addPatient: {
              en_IN: 'Enroll a new patient into the program',
              hi_IN: 'कार्यक्रम में एक नए रोगी को भर्ती करें',
              ta_IN: 'ஒரு புதிய நோயாளியை நிரலில் சேர்க்கவும்',
              ma_IN: 'प्रोग्राममध्ये नवीन रुग्णाची नावनोंदणी करा',
              kn_IN: 'ಹೊಸ ರೋಗಿಯನ್ನು ದಾಖಲಿಸಿ',
              te_IN: 'కొత్త పేషెంటును ఎన్‌రోల్ చేయండి',
            },
            downloadReport: {
              en_IN: 'Download vitals report',
              hi_IN: 'वाइटल्स रिपोर्ट डाउनलोड करें',
              ta_IN: 'உயிரணுக்களின் அறிக்கையைப் பதிவிறக்குங்கள்',
              ma_IN: 'आपल्या तब्यतीची चा  अहवाल डाउनलोड करा',
              kn_IN: 'ಮಾಹಿತಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
              te_IN: 'వైటల్స్‌ రిపోర్టును డౌన్‌లోడ్  చేసుకోండి',
            },
          },
        },
      },
    },
  },
  informationFlow: {
    en_IN: 'You can find detailed information regarding Self Care in COVID-19 here https://xxxxx \nPlease follow these simple tips to stay healthy and safe.',
    // TODO: Translations
  },
  informationTestingFlow: {
    en_IN: 'You can find detailed information regarding Self Care in COVID-19 here https://xxxxx \nPlease follow these simple tips to stay healthy and safe.',
    // TODO: Translations
  },
  informationVaccinationFlow: {
    en_IN: 'You can find detailed information regarding Self Care in COVID-19 here https://xxxxx \nPlease follow these simple tips to stay healthy and safe.',
    // TODO: Translations
  },
  endstate: {
    en_IN: 'Goodbye. Say hi to start another conversation',
    hi_IN: 'अलविदा!  बातचीत फिर शुरू करने के लिए "hi" टाइप करके भेजें',
    ta_IN: 'குட்பை.. மற்றொரு உரையாடலை தொடங்க ஹாய் சொல்லவும்',
    ma_IN: "धन्यवाद . नविन संभाषणाला सुरूवात  करताना 'नमस्कार' म्हणून सुरूवात  करा.",
    kn_IN: 'ಶುಭ ವಿದಾಯ, ಸಂಭಾಷಣೆಯನ್ನು ಆರಂಭಿಸಲು ಮತ್ತೊಮ್ಮೆ ಹಾಯ್ ಎಂದು ಹೇಳಿ',
    te_IN: 'గుడ్ బై. మళ్లీ చాట్ ద్వారా మాట్లాడాలంటే హాయ్ అని టైప్ చేయండి',
  },
};

module.exports.messages = messages;
