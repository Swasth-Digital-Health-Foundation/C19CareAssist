function createMediaMessage(imgPath, imgType, locale, caption = '') {
    if (locale != 'en_IN') {
      imgPath+= '_' + locale + `.${imgType}`;
    } else {
      imgPath+= `.${imgType}`;
    }
    const mediaMessage =  {
      "type": "media",
      "output": imgPath,
      "caption": caption
    }
    return mediaMessage;
}

module.exports = { createMediaMessage };
