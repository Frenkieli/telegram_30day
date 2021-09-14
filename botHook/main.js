const { sendBotMessage } = require("./telegramItem");

function receiveTelegram(data) {
  data = parseDataToTelegram(data);
  sendBotMessage(data);
}

/**
 * @description 用來分析與轉換對應的訊息類型
 *
 * @param {*} estringa
 * @return {*}
 */
function parseDataToTelegram(estringa) {
  var payload = {};
  if (estringa.message.text) {
    payload = {
      method: "sendMessage",
      text: estringa.message.text,
    };
  } else if (estringa.message.sticker) {
    payload = {
      method: "sendSticker",
      sticker: estringa.message.sticker.file_id,
    };
  } else if (estringa.message.photo) {
    array = estringa.message.photo;
    text = array[1];
    payload = {
      method: "sendPhoto",
      photo: text.file_id,
      caption: estringa.message.caption ? estringa.message.caption : "",
    };
  } else if (estringa.message.video) {
    vidoe = estringa.message.video;
    payload = {
      method: "sendVideo",
      video: vidoe.file_id,
      caption: estringa.message.caption ? estringa.message.caption : "",
    };
  } else if (estringa.message.animation) {
    animation = estringa.message.animation;
    payload = {
      method: "sendAnimation",
      animation: animation.file_id,
      caption: estringa.message.caption ? estringa.message.caption : "",
    };
  }
  payload.chat_id = estringa.message.chat.id;
  return payload;
}

module.exports = {
  receiveTelegram,
};
