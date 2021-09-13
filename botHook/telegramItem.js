const axios = require("axios");
/**
 * @description 發送訊息，請換成自己的機器人 token
 *
 * @param {object} data telegram bot api format
 */
function sendBotMessage(data) {
  const url =
    "https://api.telegram.org/bot" +
    "1978609847:AAHg8e-V_bNx78PCZok8uYzN8BYwlRScfgA" +
    "/";
  // 如果他是 text 訊息的話就這樣回聲
  if (data.text) {
    axios({
      url,
      method: "post",
      data,
    })
      .then((data) => {
        console.log("Send Telegram:");
        console.log(data.data);
      })
      .catch((e) => {
        console.log("Send Telegram: Error:");
        console.log(e);
      });
  }
}

module.exports = {
  sendBotMessage,
};
