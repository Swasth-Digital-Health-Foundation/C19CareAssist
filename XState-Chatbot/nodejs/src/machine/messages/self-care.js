let messages = {
  noUserFound: {
    en_IN: 'No patients found against your mobile number.',
    hi_IN: 'इस मोबाइल नंबर से जुड़ा कोई मरीज नहीं मिला।',
    ta_IN: 'உங்களது மொபைல் எண்ணுக்கு நோயாளிகள் இல்லை',
    ma_IN: 'तुमच्या मोबाइल नंबरवर रुग्ण नाहित.'
  },
  selectPerson: {
    prompt: {
      en_IN: 'Please select the patient whose vitals you want to add:\n\n',
      hi_IN: 'कृपया उस रोगी का चयन करें, जिसके वाइटल्स आप जोड़ना चाहते हैं: \n\n',
      ta_IN: 'தயவுசெய்து நீங்கள் சேர்க்க விரும்பும் நோயாளியைத் தேர்ந்தெடுக்கவும் \n\n',
      ma_IN: 'कृपया ज्या रुग्णाला आपण जोडण्यास इच्छुक आहात तो रुग्ण निवडा \n\n',
    },
  },
  reportSelectPerson: {
    prompt: {
      en_IN: 'Please select the patient whose reports you want to download:\n\n',
      hi_IN: 'कृपया जिस व्यक्ति की रिपोर्ट डाउनलोड करना चाहते हैं उसका नाम चुनें: \n\n',
      ta_IN: 'எந்த நோயாளியின் மருத்துவ பரிசோதனை முடிவுகளை பதிவிறக்கம் செய்ய விரும்புகிறீர்களோ அவரது பெயரை தயவு செய்து தேர்வு செய்யுங்கள்.\n\n',
      ma_IN: 'कृपया ज्या रुग्णाचा अहवाल आपण डाउनलोड करू इच्छित आहात तो रुग्ण निवडा: \n\n',
    },
  },
  vitalsSpo2: {
    prompt: {
      en_IN: '{{name}}! Please look for the oximeter, put it on your finger and let the number stabilize. Now tell me what your pulse oximeter says? \n\n1. SpO2 is 95 and above \n2. SpO2 is 94% or below',
      hi_IN: 'मुझे उम्मीद है कि आपके पास घर पर एक पल्स ऑक्सीमीटर है, {{name}}। कृपया अपना SpO2 जांचें और नीचे से एक विकल्प चुनें \n\n1. SpO2 95% या अधिक है \n2. SpO2 94%या कम है',
      ta_IN: 'ராகுல்! தயவுசெய்து ஆக்ஸிமீட்டரைத் தேடுங்கள். அதில் உங்கள் விரலை வைத்து எண்ணை உறுதிப்படுத்துங்கள்.  உங்கள் துடிப்பு ஆக்சிமீட்டர் என்ன சொல்கிறது? என்று இப்போது சொல்லுங்கள்? \n1. ஆக்சிஜன் அளவு(SpO2) 95% அல்லது அதற்கு மேல் \n2. ஆக்சிஜன் அளவு(SpO2 94%) மற்றும் அதற்குக் கீழே உள்ளது',
      ma_IN: '{{name}}! कृपया ऑक्सिमीटर घ्या , त्यात  आपले  बोट ठेवा आणि संख्या स्थिर होऊ द्या. आता ऑक्सिमीटर वर आलेली संख्या सांगा\n\n1. एसपीओ२  ९५ % किंवा त्याहून अधिक आहे\n2. एसपीओ२  ९४ % किंवा त्याहून खाली आहे',
    },
  },
  vitalsPulse: {
    prompt: {
      en_IN: 'What is your pulse? (Also seen on the pulse oximeter)',
      hi_IN: 'आपकी पल्स संख्या क्या है? (पल्स ऑक्सीमीटर पर देखें)',
      ta_IN: 'உங்கள் துடிப்பு என்ன? (துடிப்பு ஆக்சிமீட்டரிலும் காணப்படுகிறது)',
      ma_IN: 'आपली नाडी काय आहे? (जशे ऑक्सिमीटरवर दाखवीत आहे )',
    },
  },
  vitalsBreathing: {
    prompt: {
      en_IN: 'What is your breathing rate?',
      hi_IN: 'आपकी सांस लेने की दर क्या है?',
      ta_IN: 'உங்கள் சுவாச வீதம் என்ன?',
      ma_IN: 'आपल्या श्वासोच्छवासाचे दर काय आहेत?',
    },
  },
  vitalsSpo2Bad: {
    en_IN: '*{{name}}, your current oxygen level  is  well  below the normal value. I suggest you consult a doctor right away!* Besides medications, you may need some additional oxygen support. \n\nTo consult a doctor click here. \nMore information regarding COVID-19 is available here www.liferesources.in',
    hi_IN: '*{{name}}, आपका वर्तमान ऑक्सीजन स्तर सामान्य मूल्य से नीचे है। कृपया तुरंत डॉक्टर से सलाह लें!* \nCOVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहां उपलब्ध है www.liferesources.in',
    ta_IN: '*{{name}}.. உங்கள் தற்போதைய ஆக்ஸிஜன் அளவு சாதாரண மதிப்பை விட குறைவாக உள்ளது. தயவுசெய்து உடனே மருத்துவரை அணுகவும்.*\n கொரோனா தொடர்பான தகவல் மற்றும் அருகிலுள்ள பராமரிப்பு வசதிகள் பற்றிய கூடுதல் தகவல்கள் www.liferesources.in என்ற இந்த லிங்கில் காணலாம்',
    ma_IN: '&{{name}}, तुमची सध्याची ऑक्सिजन पातळी सामान्य मूल्यापेक्षा खाली आहे. कृपया त्वरित डॉक्टरांचा सल्ला घ्या!*\nकोविड -१९  आणि जवळील काळजी-सुविधांविषयी अधिक माहिती येथे उपलब्ध आहे. www.liferesources.in',
  },
  vitalsSpo2Walk: {
    prompt: {
      en_IN: '{{name}}, your SpO2 should ideally be between 95 and 99.  I just want to make sure that your lungs are not getting weak. I would suggest doing a simple test right now. All you need to do is walk around inside your room for 6 minutes with the pulse oximeter on your finger. Keep an eye out for the SpO2 all through the 6 minutes. \nLet me know how it goes. \n\n1. SpO2 fell below 93 or reduced by 3 points or more (at any point during the test)\n2.  Felt light headed (at any point during the test)\n3. Difficulty breathing (at any point during the test)\n4. None of the above',
      ma_IN: '{{name}}, तुमचा एसपीओ२ साधारणपणे  ९५ आणि ९९ च्या मध्ये   असावा. मला खात्री करायची आहे की तुमची फुफ्फुसे अशक्त होत नाहीत. मी आत्ताच एक सोपी चाचणी करण्याचा सल्ला देतो. आपल्याला फक्त आपल्या बोटावर  ऑक्सिमीटरने 6 मिनिटांसाठी मुखवटाशिवाय एकटे फिरणे आवश्यक आहे. 6 मिनिटांत सर्व  एसपीओ२ कडे लक्ष ठेवा. ते कसे होते ते मला कळवा.',
    },
  },
  vitalsSpo2WalkBad: {
    prompt: {
      en_IN: '*{{name}}, this is an unexpected reaction to the walk test.* Please consult a doctor right away.',
      ma_IN: '*{{name}}, ही  चाचणीची एक अनपेक्षित प्रतिक्रिया आहे.* कृपया त्वरित डॉक्टरांचा सल्ला घ्या.',
    },
  },
  vitalsTemperature: {
    prompt: {
      en_IN: "*Now let's check your temperature with your thermometer.* \n\n1. 99 and above \n2. 98 and below",
      hi_IN: 'अब अपने थर्मामीटर से अपने तापमान की जांच करते हैं। \n1. 99 और ऊपर \n2. 98 और नीचे',
      ta_IN: 'இப்போது உங்கள் வெப்பநிலையை வெப்பமானி மூலம் சரிபார்க்கலாம். \n1. 99 மற்றும் அதற்கு மேற்பட்டவை \n2. 98 மற்றும் அதற்குக் கீழே',
      ma_IN: ' आता आपण थर्मामीटरने आपले तापमान तपासूया.\n1. ९९ आणि वरील.\n2. ९८ आणि खाली',
    },
  },
  temperatureGood: {
    en_IN: 'Your vitals have been recorded. *No fever! Your SpO2 and your temperature are both normal!* Let’s keep it that way. I will check up on you again in a few hours to see how you are feeling!',
    hi_IN: 'आपके वाइटल्स रिकॉर्ड किए गए हैं। आपको बुखार नहीं है! आपका SpO2 और आपका तापमान दोनों सामान्य हैं! अपना ख्याल रखें। आप कैसा महसूस कर रहे हैं, यह जानने के लिए कुछ घंटों बाद हम आपसे फिर संपर्क करेंगे!',
    ta_IN: 'உங்கள் உயிரணுக்கள் பதிவு செய்யப்பட்டுள்ளன. காய்ச்சல் இல்லை! உங்கள் ஆக்சிஜன் அளவு (SpO2) மற்றும் உங்கள் வெப்பநிலை இரண்டும் இயல்பானவை! அதை அப்படியே வைத்திருப்போம். நீங்கள் எப்படி இருக்கிறீர்கள்? என்பதை அறிய சில மணிநேரங்களில் உங்களை மீண்டும் பரிசோதிக்கிறேன்.',
    ma_IN: 'आपल्या तब्यतीची  नोंद केली गेली आहे. ताप नाही! आपले एसपीओ२  आणि आपले तापमान दोन्ही सामान्य आहेत! चला तसाच ठेवा. आपण कसे अनुभवत आहात हे पहाण्यासाठी मी काही तासांत पुन्हा पुन्हा आपल्याकडे भेट घेईन!',
  },
  temperatureBad: {
    en_IN: 'Your vitals have been recorded. *Looks like you have a fever.* You will need to take medication to bring the temperature back down. Please contact your doctor and I will check up on you again in a few hours to see how you are feeling.\n\n More information regarding COVID-19 and nearby care facilities is available here www.liferesources.in',
    hi_IN: 'आपके वाइटल्स रिकॉर्ड किए गए हैं। लगता है, आपको बुखार है। तापमान को वापस लाने के लिए आपको दवा लेने की आवश्यकता होगी। कृपया अपने डॉक्टर से संपर्क करें और हम आपको कुछ घंटों में फिर से देखेंगे कि आप कैसा महसूस कर रहे हैं। \n COVID-19 और नज़दीकी देखभाल सुविधाओं के बारे में अधिक जानकारी यहाँ उपलब्ध है www.liferesources.in',
    ta_IN: 'உங்கள் உயிரணுக்கள் பதிவு செய்யப்பட்டுள்ளன. உங்களுக்கு காய்ச்சல் இருப்பது போல் தெரிகிறது. வெப்பநிலையை மீண்டும் குறைக்க நீங்கள் மருந்து எடுக்க வேண்டும். உங்கள் மருத்துவரை தொடர்பு கொள்ளவும் \nநீங்கள் எப்படி உணருகிறீர்கள்? என்பதை அறிய சில மணிநேரங்கள் கழித்து உங்களை மீண்டும் சரிபார்க்கிறேன். \nகொரோனா தொடர்பான மற்றும் அருகிலுள்ள பராமரிப்பு வசதிகள் பற்றிய கூடுதல் தகவல்கள் இதில் கிடைக்கின்றன www.liferesources.in',
    ma_IN: 'आपल्या तब्यतीची नोंद केली गेली आहे. आपल्याला ताप आहे असे दिसते. तापमान खाली आणण्यासाठी आपल्याला औषधे घेणे आवश्यक आहे. कृपया आपल्या डॉक्टरांशी संपर्क साधा आणि\nआपण कसे अनुभवत आहात हे पहाण्यासाठी मी काही तासांत पुन्हा पुन्हा आपल्याकडे भेट घेईन.',
  },
  exitProgram: {
    exitPersonSelection: {
      prompt: {
        en_IN: 'Please select the patient whose program you want to end:\n\n',
        hi_IN: 'कृपया जिस व्यक्ति की सदस्यता का अंत करना है उसका नाम चुनें: \n\n',
        ta_IN: 'யாருடைய விவரங்கள் வேண்டுமோ அந்த நோயாளியின் பெயரை தயவு செய்து தேர்வு செய்யுங்கள்: \n\n',
        ma_IN: 'कृपया ज्या रुग्णाचा  आपला प्रोग्राम समाप्त करायचा आहे तो रुग्ण निवडा: \n\n',
      },
    },
    exitReason: {
      prompt: {
        en_IN: 'Please tell me why you want to exit the self management program? \n1. I have recovered now\n2. My doctor’s recommendation\n3. I didn’t find the program useful',
        hi_IN: ' कृपया हमें बताएं कि आप self management कार्यक्रम का अंत क्यों करना चाहते हैं? \n1. मैं अब ठीक हो गया हूँ \n2. मेरे डॉक्टर की सलाह पर \n3. मुझे इस कार्यक्रम से सहायता नहीं मिली',
        ta_IN: 'சுய மேலாண்மை நிகழ்விலிருந்து ஏன் வெளியேறுகிறீர்கள் என்பதை தயவு செய்து கூறுங்கள்? \n1. நான் தற்போது குணமாகிவிட்டேன் \n2. எனது மருத்துவரின் பரிந்துரை \n3. இந்த நிகழ்வு பயனுள்ளதாக நான் நினைக்கவில்லை',
        ma_IN: 'कृपया मला सांगा की आपण सेल्फ मॅनेजमेंट प्रोग्राममधून बाहेर पडायचे का?\n१. मी आता बरा /बरी   झालो / झाली आहे\n२. माझ्या डॉक्टरांची शिफारस\n३.  मला कार्यक्रम उपयुक्त वाटला नाही',
      },
    },
    exitFeedback: {
      prompt: {
        en_IN: 'Please share if you have any other feedback that can help me serve you better.',
        hi_IN: 'यदि इस सुविधा को सुधारने में आपके कोई सुझाव हो, तो हमें ज़रूर बताएँ',
        ta_IN: 'எங்களது சேவைகளை மேம்படுத்த உதவ ஏதேனும் கருத்துகள்',
        ma_IN: 'कृपया आमच्या सेवा सुधारित करण्यात मदत करण्यासाठी आपल्याकडे काही अभिप्राय असल्यास सामायिक करा',
      },
    },
    unsubscribedSuccessfully: {
      en_IN: 'I have removed you from the program now. You can always come and join the program again and please do remember to contact me for any concerns.\n\nMore information regarding COVID-19 and nearby care facilities is available here www.liferesources.in/',
      hi_IN: 'मैंने आपकी सदस्यता अब समाप्त कर दी है। आप कभी भी दोबारा आकर फिर से इस कार्यक्रम से जुड़ सकते हैं और किसी भी जानकारी के लिए मुझसे संपर्क अवश्य करें । COVID-19 और नजदीकी देखभाल केंद्रों से संबंधित जानकारी यहाँ प्राप्त कर सकते हैं  www.liferesources.in',
      ta_IN: ' உங்களை நான் இந்த நிகழ்விலிருந்து தற்போது நீக்கவிட்டேன். நீங்கள் எப்போது வேண்டுமானாலும் வந்து இந்த நிகழ்வில் மீண்டும் இணையலாம். மேலும் விவரங்களுக்கு என்னை தொடர்பு கொள்ள தயவு செய்து மறந்துவிடாதீர்கள். கொரோனா குறித்த மேலும் விவரங்களை அறிய அருகில் உள்ள கொரோனா சிகிச்சை மையங்களின் பட்டியல் இங்கே கொடுக்கப்பட்டுள்ளன. www.liferesources.in',
      ma_IN: 'मी तुम्हाला आता कार्यक्रमातून काढून टाकले आहे. आपण नेहमीच परत येऊ शकता आणि प्रोग्राममध्ये पुन्हा सामील होऊ शकता आणि कृपया काळजीपूर्वक माझ्याशी संपर्क साधावा.\nकोविड -१९  आणि जवळील सुविधांविषयी अधिक माहिती येथे उपलब्ध आहे. www.liferesources.in',
    },
  },
};

let grammer = {
  vitalsSpo2: [
    { intention: 'good', recognize: ['1'] },
    { intention: 'bad', recognize: ['2'] },
  ],
  vitalsTemperature: [
    { intention: 'bad', recognize: ['1'] },
    { intention: 'good', recognize: ['2'] },
  ],
  vitalsSpo2Walk: [
    { intention: 'bad', recognize: ['1', '2', '3'] },
    { intention: 'good', recognize: ['4'] },
  ],
  exitReason: [
    { intention: 'recovered', recognize: ['1'] },
    { intention: 'doctorRecommendation', recognize: ['2'] },
    { intention: 'notUseful', recognize: ['3'] },
  ],
};

module.exports.messages = messages;
module.exports.grammer = grammer;
