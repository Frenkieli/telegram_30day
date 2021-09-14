const { sendBotMessage } = require("./telegramItem");

function receiveTelegram(data) {
  // 確保只有 message 訊息可以被處理
  if (data.message){
    if ("media_group_id" in data.message) {
      multitudeForwardHandler(data);
    } else {
      data = parseDataToTelegram(data);
      sendBotMessage(data);
    }
  }
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

// 用來存放多個 media 用的
let multitudeSendData = {};

/**
 * @description 多個 media 訊息會以這種形式傳送
 *
 * @param {*} estringa
 */
function multitudeForwardHandler(estringa) {
  let object = {
    type: checkTelegramMessageType(estringa.message),
    media:
      estringa.message.video?.file_id || estringa.message?.photo[1].file_id,
    caption: estringa.message.caption ? estringa.message.caption : "",
  };
  // 當不同 group id 傳來就 reset
  if (!multitudeSendData[estringa.message.media_group_id]) {
    multitudeSendData[estringa.message.media_group_id] = {
      timeout: null,
      data: [],
    };
  }
  multitudeSendData[estringa.message.media_group_id].data.push(object);

  clearTimeout(multitudeSendData[estringa.message.media_group_id].timeout);
  multitudeSendData[estringa.message.media_group_id].timeout = setTimeout(
    () => {
      sendBotMessage({
        chat_id: estringa.message.chat.id,
        method: "sendMediaGroup",
        media: JSON.stringify(
          multitudeSendData[estringa.message.media_group_id].data
        ),
      });
    },
    1000
  );
}

/**
 * @description 用來分影片和照片
 *
 * @param {*} message
 * @return {*}
 */
function checkTelegramMessageType(message) {
  let type;
  if (message.photo) {
    type = "photo";
  } else if (message.video) {
    type = "video";
  }
  return type;
}

module.exports = {
  receiveTelegram,
};
