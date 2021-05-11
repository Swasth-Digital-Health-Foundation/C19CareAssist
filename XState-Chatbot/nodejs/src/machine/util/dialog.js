const INTENTION_UNKOWN = 'INTENTION_UKNOWN';
const INTENTION_MORE = 'more';
const INTENTION_GOBACK = 'goback';

function get_input(event, scrub = true) {
  return scrub? event.message.input.trim().toLowerCase() : event.message.input;
}
function get_message(bundle, locale = 'en_IN') {
  return (bundle[locale] === undefined)? bundle['en_IN'] : bundle[locale];
}
function get_intention(g, event, strict = false) {
  let utterance = get_input(event);
  function exact(e) {
    return e.recognize.includes(utterance)
  }
  function contains(e) {
    return e.recognize.find(r=>utterance.includes(r))
  }
  let index = strict? g.findIndex(exact) : g.findIndex(e=>contains(e));
  return (index == -1) ? INTENTION_UNKOWN : g[index].intention;
}
function constructListPromptAndGrammer(keys, message_bundle, locale, more = false, goback = false) {
  var prompt = '';
  var grammer = [];
  if (more) {
    keys = keys.concat([INTENTION_MORE])
    message_bundle = Object.assign({}, message_bundle, {[INTENTION_MORE]: global_messages.more})
  }
  if (goback) {
    keys = keys.concat([INTENTION_GOBACK])
    message_bundle = Object.assign({}, message_bundle, {[INTENTION_GOBACK]: global_messages.goback})
  }
  
  keys.forEach((element, index) => {
    let value = undefined;
    if(message_bundle[element] !== undefined) {
      value = get_message(message_bundle[element], locale);
    }
    if (value === undefined) {
      value = element;
    }
    prompt+= `\n${index+1}. ` + value;
    grammer.push({intention: element, recognize: [(index+1).toString()]});
  });
  return {prompt, grammer};
}
function constructLiteralGrammer(keys, message_bundle, locale) {
  var grammer = [];
  keys.forEach((element) => {
    let value = undefined;
    if (message_bundle[element] !== undefined) {
      value = get_message(message_bundle[element], locale);
    } 
    if(value === undefined) {
      value = element;
    }
    grammer.push({intention: element, recognize: [value.toLowerCase()]});
  });
  return grammer;
}
function validateInputType(event, type) {
  let inputType = event.message.type;
  return inputType === type;
}
function sendMessage(context, message, immediate = true) {
  if(!context.output) {
    context.output = [];
  }
  context.output.push(message);
  if(immediate) {
    context.chatInterface.toUser(context.user, context.output, context.extraInfo);
    context.output = [];
  }
}

//TODO: All the below regional langauges are translated by google, replace with original
let global_messages = {
  error: {
    optionsRetry: {
      en_IN: 'I am sorry, I didn\'t understand. Please select from the options given again.',
      hi_IN: 'मुझे क्षमा करें, मुझे समझ नहीं आया। कृपया फिर से दिए गए विकल्पों में से चयन करें।',
      ta_IN: 'மன்னிக்கவும், எனக்கு புரியவில்லை. மீண்டும் கொடுக்கப்பட்ட விருப்பங்களிலிருந்து தேர்ந்தெடுக்கவும்.',
      ma_IN: 'माफ करा, मला कळले नाही. कृपया पुन्हा दिलेल्या पर्यायांमधून निवडा.',
      kn_IN: 'ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ನೀಡಿರುವ ಆಯ್ಕೆಗಳಿಂದ ಆಯ್ಕೆಮಾಡಿ.',
      te_IN: 'నన్ను క్షమించండి, నాకు అర్థం కాలేదు. దయచేసి మళ్ళీ ఇచ్చిన ఎంపికల నుండి ఎంచుకోండి.',
    },
    retry: {
      en_IN: 'I am sorry, I didn\'t understand. Let\'s try again.',
      hi_IN: 'मुझे क्षमा करें, मुझे समझ नहीं आया। फिर से कोशिश करें।',
      ta_IN: 'மன்னிக்கவும், எனக்கு புரியவில்லை. மீண்டும் முயற்சிப்போம்.',
      ma_IN: 'माफ करा, मला कळले नाही. चला पुन्हा प्रयत्न करूया.',
      kn_IN: 'ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸೋಣ.',
      te_IN: 'నన్ను క్షమించండి, నాకు అర్థం కాలేదు. మళ్ళీ ప్రయత్నిద్దాం.',
    },
    proceeding: {
      en_IN: 'I am sorry, I didn\'t understand. But proceeding nonetheless',
      hi_IN: 'मुझे क्षमा करें, मुझे समझ नहीं आया। फिर भी आगे बढ़ें।',
      ta_IN: 'மன்னிக்கவும், எனக்கு புரியவில்லை. ஆனாலும் தொடர்கிறது',
      ma_IN: 'माफ करा, मला कळले नाही. पण तरीही पुढे',
      kn_IN: 'ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ಆದರೆ ಮುಂದುವರಿಯುವುದು',
      te_IN: 'నన్ను క్షమించండి, నాకు అర్థం కాలేదు. అయితే కొనసాగడం',
    }
  },
  system_error: {
    en_IN: 'I am sorry, our system has a problem and I cannot fulfill your request right now. Could you try again in a few minutes please?',
    hi_IN: 'हमारे सिस्टम में एक समस्या है। मैं अभी तुम्हारी मदद नहीं कर सकता, क्या आप कुछ मिनटों में फिर से कोशिश कर सकते हैं?',
    ta_IN: 'மன்னிக்கவும், எங்கள் கணினிக்கு ஒரு சிக்கல் உள்ளது, இப்போது உங்கள் கோரிக்கையை என்னால் நிறைவேற்ற முடியாது. தயவுசெய்து சில நிமிடங்களில் மீண்டும் முயற்சிக்க முடியுமா?',
    ma_IN: 'मला माफ करा, आमच्या सिस्टममध्ये समस्या आहे आणि मी आत्ताच आपली विनंती पूर्ण करू शकत नाही. कृपया काही मिनिटात पुन्हा प्रयत्न कराल का?',
    kn_IN: 'ಕ್ಷಮಿಸಿ, ನಮ್ಮ ಸಿಸ್ಟಮ್‌ಗೆ ಸಮಸ್ಯೆ ಇದೆ ಮತ್ತು ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಇದೀಗ ಪೂರೈಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಲವು ನಿಮಿಷಗಳಲ್ಲಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಬಹುದೇ?',
    te_IN: 'క్షమించండి, మా సిస్టమ్‌కు సమస్య ఉంది మరియు నేను మీ అభ్యర్థనను ప్రస్తుతం నెరవేర్చలేను. దయచేసి మీరు కొన్ని నిమిషాల్లో మళ్లీ ప్రయత్నించగలరా?',
  },
  [INTENTION_MORE]: {
    en_IN : "See more ...",
    hi_IN : "और देखें ...",
    ta_IN: 'மேலும் பார்க்க...',
    ma_IN: 'अजून पहा ...',
    kn_IN: 'ಇನ್ನೂ ಹೆಚ್ಚು ನೋಡು ...',
    te_IN: 'ఇంకా చూడుము ...',
  },
  [INTENTION_GOBACK]: {
    en_IN : 'To go back ...',
    hi_IN : 'पीछे जाना ...',
    ma_IN: 'परत जाण्यासाठी ...',
    ta_IN: 'திரும்பிச்செல்ல ...',
    kn_IN: 'ಹಿಂತಿರುಗಲು ...',
    te_IN: 'తిరిగి వెళ్ళుటకు ...',
  },
}

module.exports = { get_input, get_message, get_intention, INTENTION_UNKOWN, INTENTION_MORE, INTENTION_GOBACK, global_messages, constructListPromptAndGrammer, constructLiteralGrammer, validateInputType, sendMessage };
