const { sendBotMessage } = require("./telegramItem");

function receiveTelegram(data) {
  console.log(data);
  sendBotMessage({
    chat_id : data.message.chat.id,
    method: "sendMessage",
    text: data.message.text
  })
}

module.exports = {
  receiveTelegram
}