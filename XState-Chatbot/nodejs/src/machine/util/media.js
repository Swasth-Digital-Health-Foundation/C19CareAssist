function createMediaMessage(imgName, imgType, category, locale) {
    if (locale != 'en_IN') {
      imgName+= '_' + locale + `.${imgType}`;
    } else {
      imgName+= `.${imgType}`;
    }
    const mediaMessage =  {
      "type": "media",
      "output": imgName,
      "category": category
    }
    return mediaMessage;
}

module.exports = { createMediaMessage };
