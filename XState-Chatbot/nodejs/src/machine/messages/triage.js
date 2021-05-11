let messages = {
  personName: {
    prompt: {
      en_IN: 'Got it, please tell me your name',
      hi_IN: 'धन्यवाद | आपका शुभ नाम क्या है ?',
      ta_IN: 'கிடைத்தது, தயவுசெய்து உங்கள் பெயரைச் சொல்லுங்கள்',
      ma_IN: 'समजले, कृपया आपले नाव मला सांगा',
    },
    error: {
      en_IN: "I am sorry, I didn't understand. Please enter a valid name which is less than 100 characters.",
      hi_IN: 'माफ करें, मुझे समझ में नहीं आया।   नीचे दिए गए विकल्पों में से चुनें।',
      ta_IN: 'மன்னிக்கவும், எனக்குப் புரியவில்லை. தயவு செய்து 100 கேரக்டர்களுக்குள் பயரை பதிவிடவும்.',
      ma_IN: 'मला माफ करा, मला समजले नाही. कृपया एखादे वैध नाव प्रविष्ट करा 100 संख्या टाकू नये',
    },
  },
  personAge: {
    prompt: {
      en_IN: 'Thanks {{name}}. How old are you?',
      hi_IN: '{{name}} | आपकी उम्र क्या है ?',
      ta_IN: 'நன்றி {{name}}. உங்கள் வயது என்ன?',
      ma_IN: 'धन्यवाद {{name}}. तुझे वय किती?',
    },
    error: {
      en_IN: "I am sorry, I didn't understand. Please enter a valid age (between 0 and 120)",
      hi_IN: 'माफ करें, मुझे समझ में नहीं आया। कृपया 0 से 120 के बीच में अपनी आयु डालें',
      ta_IN: 'என்னை மன்னித்து விடுங்கள். எனக்கு புரியவில்லை. உங்களது சரியான வயதை கொடுங்கள் (0 முதல் 120 வரை)',
      ma_IN: 'मला माफ करा, मला समजले नाही. कृपया वैध वय प्रविष्ट करा (0 ते १२०  दरम्यान)',
    },
  },
  personGender: {
    prompt: {
      en_IN: 'Please select your gender.',
      hi_IN: 'कृपया अपना लिंग चुनें',
      ta_IN: 'உங்கள் பாலினத்தைத் தேர்ந்தெடுக்கவும்.',
      ma_IN: 'कृपया आपले लिंग निवडा.',
    },
    options: {
      list: ['male', 'female', 'other'],
      messageBundle: {
        male: {
          en_IN: 'Male',
          hi_IN: 'पुरुष ',
          ta_IN: 'ஆண்',
          ma_IN: 'नर',
        },
        female: {
          en_IN: 'Female',
          hi_IN: 'महिला',
          ta_IN: 'பெண்',
          ma_IN: 'महिला',
        },
        other: {
          en_IN: 'Other',
          hi_IN: 'अन्य',
          ta_IN: 'மற்றவை',
          ma_IN: 'इतर',
        },
      },
    },
  },
  specialSymptoms: {
    prompt: {
      en_IN: 'Thanks for this information {{name}}! Do you have one or more of these symptoms?: \n- Pain or pressure in the chest\n- Difficulty breathing\n- Bluish discolorations of lips/face\n- Inability to eat / drink / walk \n- Mental confusion or drowsiness\n',
      hi_IN: 'जानकारी के लिए शुक्रिया {{name}}  | क्या आपको इनमें से कोई लक्षण हैं ?: \n- छाती में दर्द या दबाव \n- साँस लेने में दिक्कत \n- होठों अथवा चेहरे का रंग नीला होना \n- कुछ खाने / पीने / चल फिरने में मुश्किल \n- मानसिक उलझन या ऊंघ / झपकियाँ आना',
      ta_IN: 'இந்த தகவலுக்கு நன்றி {{name}}! இந்த அறிகுறிகளில் ஒன்று அல்லது அதற்கு மேற்பட்டவை உங்களிடம் உள்ளதா? \n- மார்பில் தொடர்ந்து வலி அல்லது அழுத்தம்\n- சுவாசிப்பதில் சிரமம்\n- உதடுகள் / முகத்தில் நீல நிறமாற்றம்\n- சாப்பிட / குடிக்க / நடக்க இயலாமை\n- மன குழப்பம் அல்லது மயக்கம்',
      ma_IN: 'या माहितीसाठी धन्यवाद <राहुल>! आपल्याकडे यापैकी एक किंवा अधिक लक्षणे आहेत?\n- छातीत सतत वेदना किंवा दबाव\n- श्वास घेण्यात अडचण\n- ओठ / चेहरा निळसर रंगाचा विकृती\n- खाण्यास / पिण्यास / चालण्यास असमर्थता\n- मानसिक गोंधळ किंवा तंद्री',
    },
  },
  symptoms: {
    prompt: {
      en_IN: 'That is good to know {{name}}! Do you have one or more of these complaints?: \n- Fever (>37.8 C or 100F)\n- Cough with or without spit/Sore throat\n- Loss of smell/taste\n- Runny nose\n- Muscle pain\n- Nausea & loose motions\n',
      hi_IN: 'क्या आपके पास इनमें से एक या अधिक शिकायतें हैं? \n- बुखार\n- सुखी या गीली खाँसी, गले में दर्द\n- गंध / स्वाद की हानि \n- बहती नाक\n- साँस लेने में कठिनाई / सीने में लगातार दर्द / दबाव \n- मांसपेशियों में दर्द \n- मतली या दस्त',
      ta_IN: 'இதை தெரிந்து கொள்வது நல்லது {{name}}! இந்த பிரச்சனைகளில் ஒன்று அல்லது அதற்கு மேற்பட்டவை உங்களிடம் உள்ளதா?\n- காய்ச்சல் (> 37.8 சி அல்லது 100 எஃப்)\n- சளியுடன் கூடிய இருமல் அல்லது வெறும் இருமல் / தொண்டை வலி\n- வாசனை / சுவை இழப்பு\n- மூக்கு ஒழுகுதல்\n- தசை வலி\n- குமட்டல் மற்றும் வயிற்றுப் போக்கு',
      ma_IN: '<राहुल> हे जाणून घेणे चांगले आहे! आपल्याकडे यापैकी एक किंवा अधिक तक्रारी आहेत?\n- ताप ( ३७। ८ C   किंवा १00 F  पेक्षा जास्त  )\n- खोकला कफ किंवा कोरडा खोकला  घसा खवखवणे \n- वास / चव कमी होणे\n- नाक वाहणे\n- स्नायू वेदना\n- मळमळ अथवा जुलाब',
    },
  },
  rtpcr: {
    prompt: {
      en_IN: 'What was the result of your RT-PCR test: \n1. Positive\n2. Negative\n3. Result Awaited or Not done',
      hi_IN: 'आपके RT-PCR टेस्ट का परिणाम क्या था?\n1. पॉज़िटिव \n2. नेगेटिव \n3. रिपोर्ट मिला नहीं है या टेस्ट किया नहीं है',
      ta_IN: 'உங்கள் ஆர்டி-பி.சி.ஆர் சோதனையின் முடிவு என்ன? \n1. நேர்மறை\n2. எதிர்மறை \n3. முடிவுக்காக காத்திருப்பு அல்லது சோதனை செய்யப்படவில்லை',
      ma_IN: 'तुमच्या आरटी-पीसीआर चाचणीचा निकाल काय लागला?\n१ . सकारात्म\n२ . नकारात्म\n३ . परिणाम अपेक्षित किंवा झाले नाही',
    },
  },
  comorbidity: {
    prompt: {
      male: {
        en_IN: 'Do you have one or more of these conditions? \n- Diabetes\n- Hypertension (High BP)\n- Chronic lung disease\n- Immunocompromised state\n- Heart disease\n- Obesity\n',
        hi_IN: 'क्या आपको निम्नलिखित में से एक या एक से अधिक लक्षण हैं ? \n- मधुमेह(डायबिटीज) \n- उच्च रक्तचाप \n- फेफड़े सम्बंधी रोग \n- हृदय(दिल) रोग \n- मोटापा \n- गर्भवती',
        ta_IN: 'இந்த நிலைகளில் ஒன்று அல்லது அதற்கு மேற்பட்டவை உங்களிடம் உள்ளதா? \n- நீரிழிவு நோய்\n- உயர் இரத்த அழுத்தம் (உயர் பிபி)\n- நாள்பட்ட நுரையீரல் நோய்\n- நோயெதிர்ப்பு குறைபாடுள்ள நிலை\n- இருதய நோய்\n- உடல் பருமன்',
        ma_IN: 'आपल्याकडे यापैकी एक किंवा अधिक व्याधी / अटी आहेत?\n- मधुमेह  \n- उच्च रक्तदाब (उच्च बीपी)\n- दीर्घ काळ  फुफ्फुसाचा आजार\n- इम्युनोकोमप्रोम्ड आरोग्य \n- हृदय रोग\n- लठ्ठपणा /स्थूल पण ',
      },
      female: {
        en_IN: 'Do you have one or more of these conditions? \n- Diabetes\n- Hypertension (High BP)\n- Chronic lung disease\n- Immunocompromised state\n- Heart disease\n- Obesity\n- Pregnancy\n',
        hi_IN: 'क्या आपको निम्नलिखित में से एक या एक से अधिक लक्षण हैं ? \n- मधुमेह(डायबिटीज) \n- उच्च रक्तचाप \n- फेफड़े सम्बंधी रोग \n- हृदय(दिल) रोग \n- मोटापा',
        ta_IN: 'இந்த நிலைகளில் ஒன்று அல்லது அதற்கு மேற்பட்டவை உங்களிடம் உள்ளதா? \n- நீரிழிவு நோய்\n- உயர் இரத்த அழுத்தம் (உயர் பிபி)\n- நாள்பட்ட நுரையீரல் நோய்\n- நோயெதிர்ப்பு குறைபாடுள்ள நிலை\n- இருதய நோய்\n- உடல் பருமன்\n- கர்ப்பம் (பாலினம் பெண் என்று தேர்ந்தெடுக்கப்பட்டால் மட்டுமே)',
        ma_IN: 'आपल्याकडे यापैकी एक किंवा अधिक व्याधी / अटी आहेत?\n- मधुमेह  \n- उच्च रक्तदाब (उच्च बीपी)\n- दीर्घ काळ  फुफ्फुसाचा आजार\n- इम्युनोकोमप्रोम्ड आरोग्य \n- हृदय रोग\n- लठ्ठपणा /स्थूल पण \n- गर्भधारणा (केवळ  लिंग महिला असल्यास)',
      },
    },
  },
  endFlow: {
    ageConsultDoctorEnd: {
      en_IN: '{{name}}, your age poses an additional risk factor! It would be best, if you consulted a doctor right away so that you can undergo tests if required and start the right medication. \nMore information regarding COVID-19 and nearby care facilities is available here www.liferesources.in',
      hi_IN: '{{name}}, आपके उम्र के कारण आपको ज़्यादा ध्यान रखना होगा! अच्छा होगा अगर आप तुरंत डॉक्टर से मिलें ताकि वह ज़रूरी टेस्ट कराकर आपका सही इलाज शुरू कर सकें। \n COVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहाँ उपलब्ध है www.liferesources.in',
      ta_IN: '{{name}}, உங்கள் வயது ஒரு கூடுதல் ஆபத்து காரணியாகும்! நீங்கள் உடனடியாக ஒரு மருத்துவரை அணுகினால், தேவையான சோதனைகளுக்கு உட்பட்டு சரியான சிகிச்சைகளைத் தொடங்கலாம். COVID-19 மற்றும் அருகிலுள்ள பராமரிப்பு வசதிகள் பற்றிய கூடுதல் தகவல்கள் இங்கே கிடைக்கின்றன www.liferesources.in',
      ma_IN: '{{name}}, तुझे वय एक जोखीम घटक आहे. आपण त्वरित एखाद्या डॉक्टरांचा सल्ला घेतल्यास हे चांगले होईल की आपण आवश्यक चाचण्या करून योग्य औषधे सुरू करू शकता. कोविड -१९  आणि   काळजी जवळील सुविधांविषयी अधिक माहिती येथे उपलब्ध आहे. www.liferesources.in',
    },
    symptomComorbidConsultDoctorEnd: {
      en_IN: '*{{name}} your current symptoms along with your other medical condition(s) may need professional medical attention.* It would be best, if you consulted a doctor right away so that you can undergo the necessary tests and start the right medication.\n\nMore information regarding COVID-19 and nearby care facilities is available here www.liferesources.in',
      hi_IN: '*{{name}} आपके लक्षण और सेहत की स्थिति देखकर लगता है की आपको चिकित्सा की ज़रुरत है.* कृपया तुरंत डॉक्टर की सलाह लें ताकि टेस्ट कराकर आपका सही इलाज शुरू किया जा सके. \n COVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहां उपलब्ध है www.liferesources.in',
      ta_IN: 'ராகுல், உங்கள் தற்போதைய மருத்துவ அறிகுறிகளுடன் உங்கள் மற்ற மருத்துவ நிலைகளுக்கு முறையான  மருத்துவ கவனிப்பு தேவைப்படலாம்.\n நீங்கள் இப்போதே ஒரு மருத்துவரை அணுகினால் நல்லது, இதனால் நீங்கள் தேவையான சோதனைகளுக்கு உட்பட்டு சரியான சிகிச்சைகளைத் தொடங்கலாம்.\n COVID-19 மற்றும் அருகிலுள்ள பராமரிப்பு வசதிகள் பற்றிய கூடுதல் தகவல்கள் இங்கே கிடைக்கின்றன www.liferesources.in',
      ma_IN: 'राहुल, तुमची इतर लक्षणे आणि इतर वैद्यकीय स्थिती (त) यांनाही व्यावसायिक वैद्यकीय सहाय्याची आवश्यकता असू शकते.* आपण त्वरित एखाद्या डॉक्टरांचा सल्ला घेतल्यास हे चांगले होईल जेणेकरून आपण आवश्यक चाचण्या करून योग्य औषधे सुरू करू शकाल.\n\nकोविड -१९  आणि जवळील सुविधांविषयी अधिक माहिती येथे उपलब्ध आहे. www.liferesources.in/',
    },
    testComorbidConsultDoctorEnd: {
      en_IN: '*{{name}} your test result along with your other medical condition(s) may need professional medical attention.* \nIt would be best if you  consulted a doctor so that you can undergo the necessary tests if required and start the right medications.\n\nMore information regarding COVID-19 and nearby care facilities is available here www.liferesources.in',
      hi_IN: '*{{name}} आपके पॉजिटिव रिपोर्ट और अन्य स्वास्थ्य समस्याओं के कारण आपके सेहत को ज़्यादा खतरा है।* कृपया तुरंत डॉक्टर की सलाह लें! \n COVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहां उपलब्ध है www.liferesources.in',
      ta_IN: '*{{name}} உங்கள் பிற மருத்துவ நிலைகள் உடனான உங்கள் சோதனை முடிவுக்கு முறையான மருத்துவ கவனிப்பு தேவைப்படலாம்.* \nநீங்கள் ஒரு மருத்துவரை அணுகினால் நல்லது. தேவைப்பட்டால் அவசியமான சோதனைகளுக்கு உட்பட்டு சரியான சிகிச்சைகளைத் தொடங்கலாம். \nCOVID-19 மற்றும் அருகிலுள்ள பராமரிப்பு வசதிகள் பற்றிய கூடுதல் தகவல்கள் இங்கே கிடைக்கின்றன www.liferesources.in',
      ma_IN: '*{{name}} आपल्या चाचणी निकालासह आपल्या इतर वैद्यकीय स्थिती ला व्यावसायिक वैद्यकीय लक्ष देण्याची आवश्यकता असू शकते.* \nआपण एखाद्या डॉक्टरांचा सल्ला घेतल्यास हे चांगले होईल जेणेकरून आवश्यक असल्यास आपण आवश्यक चाचण्या करून योग्य औषधे सुरू करू शकता.\nकोविड -१९  आणि जवळील सुविधांविषयी अधिक माहिती येथे उपलब्ध आहे. www.liferesources.in/',
    },
    precautionEnd: {
      en_IN: '*{{name}}, given your age/comorbidities you should exercise caution.* I suggest following these simple tips to stay healthy!!\n- Wear N95 mask covering both mouth and nose\n- Sleep for 7-8 hours a day\n- Drink fluids to stay hydrated\n- Avoid alcohol and smoking\n- Practise yoga and meditate\n\nMore information regarding COVID-19 and nearby care facilities is available here www.liferesources.in',
      hi_IN: '*{{name}}, आपके जवाबों से लगता नहीं है की आपको COVID-19 है स्वस्थ रहने के लिए इन सुझावों का पालन करें!* \n- N95 मास्क पहनें जो मुंह और नाक दोनों को कवर करे \n- दिन में 7-8 घंटे की नींद लें \n- तरल पदार्थों का सेवन करें \n- शराब और धूम्रपान छोड़ दें \n- योग और ध्यान करें \n \n  COVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहां उपलब्ध है www.liferesources.in',
      ta_IN: '*{{name}}, உங்கள் வயது / கொமொர்பிடிட்டிகளைப் பொறுத்தவரை நீங்கள்  மிகவும் எச்சரிக்கையாக இருக்க வேண்டும்.* \nஆரோக்கியமாக இருக்க இந்த எளிய உதவிக்குறிப்புகளைப் நீங்கள் பின்பற்ற பரிந்துரைக்கிறேன்! \n*வாய் மற்றும் மூக்கு இரண்டையும் உள்ளடக்கிய N95 மாஸ்க்கை அணியுங்கள்\n- ஒரு நாளைக்கு 7-8 மணி நேரம் தூங்குங்கள் \n- உடலில் நீர்ச்சத்து இருக்க திரவங்களை குடியுங்கள்\n- மது மற்றும் புகைப்பழக்கத்தை தவிருங்ககள்\n- யோகா பயிற்சி மற்றும் தியானம் செய்யுங்கள்\n ( இது தொடர்பாக மேலும் அறிய https://www.youtube.com/watch?v=TRxmzpg8Xfg \n https://www.youtube.com/watch?v=fXpnPYuswtI என்ற இந்த லிங்கை கிளிக் செய்யவும்) \nகொரோனா தொடர்பான தகவல்கள் மற்றும் அருகிலுள்ள பராமரிப்பு வசதிகள் பற்றிய கூடுதல் விவரங்கள் தெரிந்து கொள்ள www.liferesources.in இதனை கிளிக் செய்யவும்',
      ma_IN: '{{name}}, तुमचे वय /अल्पवयीनतेने तुम्ही सावधगिरी बाळगली पाहिजे.\n- तुम्ही  निरोगी राहण्यासाठी या सोप्या सूचनांचे अनुसरण करण्यास सुचवितो!\n- तोंड आणि नाक दोन्ही झाकून एन 95 चा मुखवटा घाला\n- ७  दिवसा ७ - ८  तास झोप\n- हायड्रेटेड राहण्यासाठी द्रव प्या\n- दारू आणि धूम्रपान टाळा\nयोगाचा सराव करा आणि ध्यान करा (अधिक जाणून घेण्यासाठी येथे क्लिक करा: https://www.youtube.com/watch?v=TRxmzpg8Xfg\nhttps://www.youtube.com/watch?v=fXpnPYuswtI ',
    },
    noCovidEnd: {
      en_IN: '*{{name}}, based on your responses, it is less likely that you are suffering from COVID-19.* I suggest following these simple tips to stay healthy!\n- Wear an N95 mask covering both mouth and nose\n- Sleep for 7-8 hrs a day\n- Drink fluids to stay hydrated.\n- Avoid alcohol and smoking.\n5. Practise yoga and meditate.\n\nMore information regarding COVID-19 and nearby care facilities is available here  www.liferesources.in',
      hi_IN: '*{{name}}, आपके जवाबों से लगता नहीं है की आपको COVID-19 है स्वस्थ रहने के लिए इन सुझावों का पालन करें!* \n- N95 मास्क पहनें जो मुंह और नाक दोनों को कवर करे \n- दिन में 7-8 घंटे की नींद लें \n- तरल पदार्थों का सेवन करें \n- शराब और धूम्रपान छोड़ दें \n- योग और ध्यान करें \n\n COVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहां उपलब्ध है www.liferesources.in',
      ta_IN: '*{{name}}, உங்கள் பதில்களின் அடிப்படையில், நீங்கள் கோவிட் -19 நோயால் பாதிக்கப்படுவது குறைவு.* ஆரோக்கியமாக இருக்க இந்த எளிய உதவிக்குறிப்புகளைப் பின்பற்ற பரிந்துரைக்கிறேன்! \n வாய் மற்றும் மூக்கு இரண்டையும் உள்ளடக்கிய N95 முகக் கவசத்தை அணியுங்கள் ஒரு நாளைக்கு 7-8 மணி நேரம் தூங்குங்கள் வறட்சியை தடுக்க திரவங்களாக குடிக்கவும் மது மற்றும் புகைப்பதைத் தவிர்க்கவும் யோகா பயிற்சி மற்றும் தியானம் மேற்கொள்ளவும் \n\nCOVID-19 மற்றும் அருகிலுள்ள பராமரிப்பு வசதிகள் பற்றிய கூடுதல் தகவல்கள் இங்கே கிடைக்கின்றன www.liferesources.in',
      ma_IN: '{{name}}, तुमच्या प्रतिसादावर आधारित, तुम्ही कोविड -१९   पासून पीडित असण्याची शक्यता कमी आहे.\n- मी निरोगी राहण्यासाठी या सोप्या सूचनांचे अनुसरण करण्यास सुचवितो!\n- तोंड आणि नाक दोन्ही झाकून एन 95 चा मुखवटा घाला\n- ७  दिवसा ७ - ८  तास झोप\n- हायड्रेटेड राहण्यासाठी द्रव प्या\n- दारू आणि धूम्रपान टाळा\n- योगाचा सराव करा आणि ध्यान करा\nयोगाचा सराव करा आणि ध्यान करा (अधिक जाणून घेण्यासाठी येथे क्लिक करा: https://www.youtube.com/watch?v=TRxmzpg8Xfg\nhttps://www.youtube.com/watch?v=fXpnPYuswtI ',
    },
    lowSpo2End: {
      en_IN: '*{{name}}, your current oxygen level is below the normal value. Please consult a doctor right away!* \nMore information regarding COVID-19 is available here www.liferesources.in',
      hi_IN: '*{{name}}, आपका वर्तमान ऑक्सीजन स्तर सामान्य मूल्य से नीचे है। कृपया तुरंत डॉक्टर से सलाह लें!* \n COVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहाँ उपलब्ध है www.liferesources.in',
      ta_IN: '*{{name}}, உங்கள் தற்போதைய ஆக்ஸிஜன் அளவு சாதாரண மதிப்பை விட குறைவாக உள்ளது. தயவுசெய்து உடனே ஒரு மருத்துவரை அணுகவும்!* \nCOVID-19 மற்றும் அருகிலுள்ள பராமரிப்பு வசதிகள் பற்றிய கூடுதல் தகவல்கள் இங்கே கிடைக்கின்றன www.liferesources.in',
      ma_IN: '{{name}}, तुमची सध्याची ऑक्सिजन पातळी सामान्य मूल्यापेक्षा खाली आहे. कृपया त्वरित डॉक्टरांचा सल्ला घ्या!\nकोविड -१९  आणि जवळील सुविधांविषयी अधिक माहिती येथे उपलब्ध आहे. www.liferesources.in',
    },
    noOximeterEnd: {
      en_IN: '{{name}}, your oxygen level is one of the most important parameters to gauge the severity of your condition. *Please order a pulse oximeter right away.* \nSend me a message when you have it so we can begin monitoring your vitals.',
      hi_IN: '{{name}}, आपका ऑक्सीजन स्तर आपकी स्थिति की गंभीरता का पता लगाने के लिए सबसे महत्वपूर्ण मापदंडों में से एक है। *कृपया तुरंत एक पल्स ऑक्सीमीटर की व्यवस्था करें* \n जब आपके पास यह हो तो मुझे संदेश भेजें ताकि हम आपके विटल्स की निगरानी शुरू कर सकें',
      ta_IN: '{{name}}, உங்கள் ஆக்ஸிஜன் அளவு உங்கள் உடல் நிலையின் தீவிரத்தை அறிய மிக முக்கியமான அளவுகோலில் ஒன்றாகும். *தயவுசெய்து ஒரு நாடித் துடிப்பு ஆக்சிமீட்டரை உடனடியாக ஆர்டர் செய்யவும்* \nஆக்சிமீட்டர் வாங்கிய பிறகு எனக்கு ஒரு மெசேஜ் அனுப்புங்கள், இதன்மூலம் உங்கள் உடல்நிலையை கண்காணிக்க ஆரம்பிக்கலாம்.',
      ma_IN: '{{name}}, आपल्या स्थितीची तीव्रता मोजण्यासाठी आपले ऑक्सिजन पातळी सर्वात महत्वाचे मापदंड आहे. कृपया आत्ताच पल्स ऑक्सिमीटरची व्यवस्था/मागणी करा\nआपल्याकडे हा संदेश असल्यास मला पाठवा जेणेकरुन आम्ही आपल्या निरीक्षण करण्यास सुरवात करू.',
    },
    walkTestEnd: {
      en_IN: '*{{name}}, this is an unexpected reaction to the walk test.* Please consult a doctor right away. \n\nMore information regarding COVID-19 and nearby care facilities is available here www.liferesources.in',
      hi_IN: '*{{name}}, यह वॉक टेस्ट की अप्रत्याशित प्रतिक्रिया है। कृपया तुरंत डॉक्टर से सलाह लें।* \n COVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहाँ उपलब्ध है www.liferesources.in',
      ma_IN: '*{{name}}, ही  चाचणीची एक अनपेक्षित प्रतिक्रिया आहे.* कृपया त्वरित डॉक्टरांचा सल्ला घ्या.\nकोविड -१९  आणि जवळील सुविधांविषयी अधिक माहिती येथे उपलब्ध आहे. www.liferesources.in',
    },
    specialSymptomsEnd: {
      en_IN: '{{name}}, current symptoms require urgent medical attention. Please get in touch with your healthcare provider or visit a hospital emergency room immediately so that you can undergo appropriate testing and start the right medication. \n\n Information regarding nearby COVID-19 care facilities is also available here: www.liferesources.in',
      hi_IN: '{{name}}, आपके लक्षणों के चलते आप को तुरंत इलाज की ज़रुरत है | कृपया तुरंत अपने डॉक्टर से संपर्क करें या नज़दीकी हस्पताल के इमरजेंसी विभाग में जाएं | \n {{name}} आपके लक्षण काफी गंभीर हैं, तुरंत डॉक्टर से मिलें या नज़दीकी अस्पताल में जाए ताकि टेस्ट कराकर आपका सही इलाज शुरू किया जा सके| \n COVID-19 से सम्बंधित जानकारी और नज़दीकी देखभाल की सुविधाओं के लिए कृपया www.liferesources.in वेबसाइट पर जाएं |',
      ta_IN: '{{name}}, உங்களது இந்த தற்போதைய அறிகுறிகளுக்கு அவசர மருத்துவ சிகிச்சை தேவை. தயவுசெய்து உங்கள் சுகாதார அதிகாரிகளை தொடர்பு கொள்ளுங்கள் அல்லது உடனடியாக ஒரு மருத்துவமனையில் அவசர பிரிவுக்குச் செல்லுங்கள். இதன் மூலம் நீங்கள் தகுந்த பரிசோதனைக்கு உட்படுத்தப்பட்டு சரியான மருந்துகளைத் தொடங்கலாம். அருகிலுள்ள COVID-19 பராமரிப்பு வசதிகள் பற்றிய தகவல்களும் இங்கே கிடைக்கின்றன: www.liferesources.in',
      ma_IN: '{{name}}, तुमच्या सध्याच्या लक्षणांवर तातडीने वैद्यकीय मदत घेण्याची गरज आहे. कृपया आपल्या आरोग्य सेवा प्रदात्याशी संपर्क साधा किंवा तत्काळ हॉस्पिटलच्या आपत्कालीन कक्षास भेट द्या जेणेकरून आपण योग्य चाचणी घेऊ शकता आणि योग्य औषधे सुरू करू शकता.\n\nजवळपास असलेल्या कोविड -१९  care केअर सुविधांविषयी माहिती देखील येथे उपलब्ध आहे: www.liferesources.in',
    },
  },
  triageSpo2: {
    prompt: {
      preamble: {
        en_IN: 'I hope you have a pulse oximeter at home, {{name}}. Please check your SpO2 and select an option from below',
        hi_IN: 'मुझे उम्मीद है कि आपके पास घर पर एक पल्स ऑक्सीमीटर है, {{name}}। कृपया अपना SpO2 जांचें और नीचे से एक विकल्प चुनें',
        ta_IN: 'நீங்கள் வீட்டில் நாடித்துடிப்பு அறியும் ஆக்சிமீட்டர் வைத்திருப்பீர்கள் என்று நம்புகிறேன் {{name}}. உங்கள் SpO2 ஐ சரிபார்த்து, கீழே இருந்து ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்',
        ma_IN: 'मला आशा आहे की {{name}},  तुझ्या घरी  ऑक्सिमीटर असेल. कृपया आपला एसपीओ २  तपासा आणि खालील मधून एक पर्याय निवडा',
      },
      options: {
        list: ['above95', 'below94', 'noOximeter'],
        messageBundle: {
          above95: {
            en_IN: 'SpO2 is 95% or above',
            hi_IN: 'SpO2 95% या अधिक है',
            ta_IN: 'SpO2 95% அல்லது அதற்கு மேல்',
            ma_IN: 'एसपीओ2 ९५ % किंवा त्याहून अधिक आहे',
          },
          below94: {
            en_IN: 'SpO2 is 94% or below',
            hi_IN: 'SpO2 94% या कम है',
            ta_IN: 'SpO2 94% மற்றும் அதற்கு கீழே உள்ளது',
            ma_IN: 'एसपीओ2 ९४ % किंवा त्यापेक्षा कमी आहे',
          },
          noOximeter: {
            en_IN: 'Don’t have an oximeter',
            hi_IN: 'ऑक्सीमीटर नहीं है',
            ta_IN: 'ஆக்சிமீட்டர் இல்லை',
            ma_IN: 'माझ्या कडे ऑक्सिमीटर  नाहीं',
          },
        },
      },
    },
    normalSpo2: {
      en_IN: '*Your SpO2 is well within the normal range! This is a good sign! :)*',
      hi_IN: '*आपका SpO2 सामान्य सीमा के भीतर है! यह एक अच्छा संकेत है! :)*',
      ta_IN: 'உங்கள் SpO2 நன்றாக சாதாரண அளவிற்குள் உள்ளது! இது ஒரு நல்ல அறிகுறி!',
      ma_IN: 'आपला एसपीओ 2 सामान्य श्रेणीत आहे! हे एक चांगले चिन्ह आहे! :)',
    },
  },
  triageSpo2Walk: {
    prompt: {
      preamble: {
        en_IN: '{{name}}, your SpO2 should ideally be between 95 and 99.  I want to make sure that your lungs are not getting weak. I would suggest doing a simple test right now. All you need to do is walk around alone without a mask for 6 minutes with the pulse oximeter on your finger. Keep an eye out for the SpO2 all through the 6 minutes.\nLet me know how it goes.',
        hi_IN: '{{name}}, आपका SpO2 आदर्श रूप से 95 और 99 के बीच होना चाहिए। मैं यह सुनिश्चित करना चाहता हूं कि आपके फेफड़े कमजोर नहीं हो रहे हैं। मैं अभी एक साधारण परीक्षण करने का सुझाव दूंगा। आपको बस अपनी उंगली पर पल्स ऑक्सीमीटर के साथ 6 मिनट के लिए मास्क के बिना अकेले घूमने की ज़रूरत है। इन 6 मिनट के दौरान SpO2 परनज़र रखें। मुझे बताएं कि यह कैसे जाता है।',
        ma_IN: '{{name}}, तुमचा एसपीओ२ साधारणपणे  ९५ आणि ९९ च्या मध्ये   असावा. मला खात्री करायची आहे की तुमची फुफ्फुसे अशक्त होत नाहीत. मी आत्ताच एक सोपी चाचणी करण्याचा सल्ला देतो. आपल्याला फक्त आपल्या बोटावर  ऑक्सिमीटरने 6 मिनिटांसाठी मुखवटाशिवाय एकटे फिरणे आवश्यक आहे. 6 मिनिटांत सर्व  एसपीओ२ कडे लक्ष ठेवा. ते कसे होते ते मला कळवा.',
      },
      options: {
        list: ['below93', 'lightHeaded', 'breathingDifficulty', 'none'],
        messageBundle: {
          below93: {
            en_IN: 'SpO2 fell below 93 or reduced by 3 points or more (at any point during the test)',
            hi_IN: 'SpO2 93 से नीचे गिर गया या 3 अंक या उससे कम हो गया (परीक्षण के दौरान कभी भी)',
            ma_IN: 'एसपीओ२  ९३  च्या खाली आला किंवा ३ पेक्ष्या ज्यास्त   गुणां  हून  कमी झाला (चाचणीच्या वेळी)',
          },
          lightHeaded: {
            en_IN: 'Felt light headed (at any point during the test)',
            hi_IN: 'चक्कर आने जैसा लगा (परीक्षण के दौरान कभी भी)',
            ma_IN: 'हलकी डोके दुखी असलेले (चाचणीच्या वेळी) वाटले',
          },
          breathingDifficulty: {
            en_IN: 'Difficulty breathing (at any point during the test)',
            hi_IN: 'सांस लेने मे तकलीफ (परीक्षण के दौरान कभी भी)',
            ma_IN: 'श्वास घेण्यात अडचण (चाचणीच्या वेळी)',
          },
          none: {
            en_IN: 'None of the above',
            hi_IN: 'इनमे से कोई भी नहीं',
            ma_IN: 'वरीलपैकी काहीही नाही',
          },
        },
      },
    },
    normalSpo2: {
      en_IN: 'Your current oxygen levels are good.',
    },
  },
  subscribe: {
    prompt: {
      preamble: {
        en_IN: 'Thank you for sharing this information, {{name}}. Please contact a doctor so you can be prescribed medicines as needed. I will also be following up with you regularly to ensure you get better right at home by: \n- Making you check your vitals three times a day\n- Maintaining your SpO2 and temperature chart  \n- Sharing scientifically accurate health information\n- Helping you cope up with isolation \n- Supporting your family members if COVID assistance is needed\n',
        hi_IN: 'इस जानकारी को भेजने के लिए धन्यवाद, {{name}}। कृपया किसी डॉक्टर से संपर्क करें ताकि आपको आवश्यकतानुसार दवाएं दी जा सकें। {{name}}, मैं आपकी स्थिति पर निगरानी रखेंगे ताकि आप घर पर ही ठीक हो सकें \n- दिन में 3 बार अपने vitals की जाँच करें \n- अपने SpO2 और तापमान चार्ट को बनाए रखिये \n- आपको वैज्ञानिक रूप से सही स्वास्थ्य जानकारी मिले \n- आपको अकेलेपन में मदद करें \n- COVID सहायता की आवश्यकता होने पर अपने परिवार के सदस्यों का समर्थन करना',
        ta_IN: '{{name}}.. நீங்கள் வீட்டிலேயே நலமுடன் இருப்பதை உறுதி செய்வதற்காக நான் உங்கக்ளை தொடர்ந்து கண்காணித்து வருவேன்\n- உங்கள் உயிரணுக்களை ஒரு நாளைக்கு மூன்று முறை சரிபார்க்கச் செய்கிறது\n- உங்கள் ஆக்சிஜன் அளவு (SpO2) மற்றும் உடல் வெப்பநிலையை பராமரித்தல்\n- அறிவியல் பூர்வமாக சுகாதார தகவல்களைப் பகிர்தல்\n- இது தனிமைபடுத்துதலை சமாளிக்க உதவுகிறது\n- கொரோனா விவரம் தொடர்பான தேவைப்பட்டால் உங்கள் குடும்ப உறுப்பினர்களை ஆதரித்தல்',
        ma_IN: '{{name}}, आपण घरी बरे व्हावे  यासाठी मी नियमितपणे आपल्याकडे पाठपुरावा करीत आहेः\n- आपल्याला दिवसातून तीन वेळा आपल्या प्रकृती ची तपासणी करणे\n- आपला एसपीओ2 आणि तापमान चार्ट राखत आहे\n- वैज्ञानिकदृष्ट्या अचूक आरोग्य माहिती सामायिक करणे\n- आपल्याला सामना करण्यास मदत करणे\n- कोविड मदतीची आवश्यकता असल्यास आपल्या कुटुंबातील सदस्यांना मदत करणे',
      },
      options: {
        list: [true, false],
        messageBundle: {
          true: {
            en_IN: "Let's do this",
            hi_IN: 'चलो इसे करते हैं',
            ta_IN: 'இதைச் செய்வோம்',
            ma_IN: 'हे करू',
          },
          false: {
            en_IN: 'Not now',
            hi_IN: 'अभी नहीं',
            ta_IN: 'இப்போது இல்லை',
            ma_IN: 'आता नाही',
          },
        },
      },
    },
    doSubscribe: {
      en_IN: "That's awesome, {{name}}! Thank you for choosing me as your aid to recovery. :) If you want any more details about my guided recovery program or want to make any modifications, please use the *Manage program* option in the main menu. I will be in touch with you again in a few hours to check on you.\n To view home isolation guide click here https://www.youtube.com/watch?v=xTvd7oAEyhs (English) https://www.youtube.com/watch?v=VfVwoNzIC1c&t=2s (Hindi) \n Additional health tips are available here https://www.youtube.com/watch?v=ejukjKIClkg and https://youtube.com/playlist?list=PLM6YFXQ-ei4bMKT_R4GSLVnrsHodCdhmX \nFor more information regarding COVID-19 and nearby care facilities click here www.liferesources.in",
      hi_IN: 'बहुत अच्छा, {{name}}! हमें अपना सहयोगी बनाने के लिए धन्यवाद।. :) यदि आप मेरे निर्देशित पुनर्प्राप्ति कार्यक्रम के बारे में कोई और विवरण चाहते हैं या कोई संशोधन करना चाहते हैं, तो कृपया मुख्य मेनू में *प्रबंधित कार्यक्रम* विकल्प का उपयोग करें। मैं कुछ घंटों में फिर से आपके संपर्क में आऊंगा। कुछ घंटों बाद हम आपसे फिर संपर्क करेंगे। \n घर अलगाव गाइड यहाँ उपलब्ध है: https://www.youtube.com/watch?v=VfVwoNzIC1c&t=2s (Hindi) \n स्वस्थ रहने के लिए, इन बातों का ध्यान रखें: \n COVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहाँ उपलब्ध है www.liferesources.in',
      ta_IN: 'இது அருமை {{name}}! உங்கள் வீட்டு தனிமை வழிகாட்டியாக(உதவியாளராக) என்னைத் தேர்ந்தெடுத்ததற்கு நன்றி. \nஎனது வழிகாட்டப்பட்ட மீட்புத் திட்டத்தைப் பற்றி மேலும் விவரங்களை நீங்கள் அறிந்து கொள்ள விரும்பினால் அல்லது ஏதேனும் மாற்றங்களைச் செய்ய விரும்பினால், முதன்மை மெனுவில் * நிரலை நிர்வகி * என்ற விருப்பத்தைப் பயன்படுத்தவும். \nஉங்களைச் பரிசோதிக்க சில மணிநேரங்களில் நான் உங்களை மீண்டும் தொடர்புகொள்வேன்.வீட்டு தனிமை வழிகாட்டியைக் காண  https://www.youtube.com/watch?v=xTvd7oAEyhs (ஆங்கிலம்) என்ற இந்த லிங்கை கிளிக் செய்யுங்கள் \nஇத்தனையும் கிளிக் செய்யலாம் - https://www.youtube.com/watch?v=VfVwoNzIC1c&t=2s (இந்தி) \nகூடுதல் சுகாதார உதவிக்குறிப்புகள்  தொடர்பான விவரங்கள் இதில் நிறைய கிடக்கின்றன - https://www.youtube.com/watch?v=ejukjKIClkg மற்றும் https://youtube.com/playlist?list=PLM6YFXQ-ei4bMKT_R4GSLVnrsHodCdhmX \nகொரோனா தொடர்பான விவரங்கள் மற்றும்  மற்றும் அருகிலுள்ள பராமரிப்பு வசதிகள் பற்றிய கூடுதல் தகவலுக்கு <www.liferesources.in/> என்ற இந்த லிங்கை அழுத்தவும்.',
      ma_IN: 'ते छान आहे {{name}}!  तुमचा सहाय्यक म्हणून मला निवडल्याबद्दल धन्यवाद. :)\nमाझ्या मार्गदर्शित पुनर्प्राप्ती प्रोग्रामबद्दल आपल्याला आणखी काही माहिती हवी असल्यास किंवा काही बदल करू इच्छित असल्यास, कृपया मुख्य मेनूमध्ये * प्रोग्राम व्यवस्थापित करा * पर्याय वापरा.\nमी आपणास तपासण्यासाठी काही तासांत पुन्हा संपर्क साधू.\nहोम मार्गदर्शक पाहण्यासाठी येथे क्लिक करा https://www.youtube.com/watch?v=xTvd7oAEhhs (इंग्रजी)\nhttps://www.youtube.com/watch?v=VfVwoNzIC1c&t=2s (Hindi)\nअतिरिक्त आरोग्यासाठी येथे सल्ले उपलब्ध आहेत.\nhttps://www.youtube.com/watch?v=ejukjKIClkg \nआणि https://youtube.com/playlist?list=PLM6YFXQ-ei4bMKT_R4GSLVnrsHodCdhmX\nकोविड -१९  आणि जवळील सुविधांविषयी अधिक माहिती येथे उपलब्ध आहे. www.liferesources.in',
    },
    dontSubscribe: {
      en_IN: 'Ok. You can always come back when you need help. \nMore information regarding COVID-19 and nearby care facilities is available here www.liferesources.in',
      hi_IN: 'ठीक है। आपको हमेशा मदद की आवश्यकता होने पर वापस आ सकते हैं। \n COVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहाँ उपलब्ध है www.liferesources.in',
      ta_IN: 'சரி.. உங்களுக்கு உதவி தேவைப்படும்போது நீங்கள் எப்போது வேண்டுமானாலும் கேட்கலாம் \nகொரோனா தொடர்பான விவரங்கள் மற்றும் அருகிலுள்ள பராமரிப்பு வசதிகள் பற்றிய கூடுதல் தகவல்கள் இங்கே கிடைக்கின்றன - www.liferesources.in',
      ma_IN: 'ठीक आहे. जेव्हा आपल्याला मदतीची आवश्यकता असते तेव्हा आपण नेहमी परत येऊ शकता.\nकोविड -१९  आणि जवळील सुविधांविषयी अधिक माहिती येथे उपलब्ध आहे. www.liferesources.in',
    },
  },
};

let grammers = {
  binaryChoice: {
    prompt: {
      en_IN: '\n1. Yes\n2. No',
      hi_IN: '\n1. हाँ \n2. नहीं',
      ta_IN: '\n1. ஆம் \n2. இல்லை',
      ma_IN: '\n1 . होय\n2 . नाही',
    },
    grammer: [
      { intention: true, recognize: ['1'] },
      { intention: false, recognize: ['2'] },
    ],
  },
  rtpcrTest: [
    { intention: 'positive', recognize: ['1'] },
    { intention: 'negative', recognize: ['2'] },
    { intention: 'na', recognize: ['3'] },
  ],
};

module.exports.messages = messages;
module.exports.grammers = grammers;
