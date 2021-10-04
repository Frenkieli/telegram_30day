const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Logger } = require("telegram/extensions");

const input = require("input");

const GetInstanceClass = require("../component/GetInstanceClass");
const dataCeneter = require("../dataCenter");

Logger.setLevel("none"); // 這邊可以隱藏很多關於 telegram 的運作細節

class TelegramItem extends GetInstanceClass {
  constructor() {
    super();
    this.client = null;
  }

  /**
   * @description 初始化 telegram 實體
   *
   * @memberof TelegramItem
   */
  init() {
    this.client = new TelegramClient(
      new StringSession(""),
      Number(process.env.telegramId), // 這邊輸入你的 id
      process.env.telegramHash, // 輸入你的 hash
      { connectionRetries: 5 }
    );
  }

  /**
   * @description 登入 telegram
   *
   * @return {*}
   * @memberof TelegramClass
   */
  async login() {
    await this.client.start({
      phoneNumber: async () => await input.text("請輸入電話?"),
      password: async () => await input.text("請輸入密碼?"),
      phoneCode: async () => await input.text("請輸入驗證碼?"),
      onError: (err) => console.log("錯誤訊息 : " + err.errorMessage),
    });

    // console.log(); // Save this string to avoid logging in again

    console.log("");
    console.log("\x1b[36m", "成功登入");
    console.log();
    let user = await this.client.getMe();
    dataCeneter.setData("setUser", {
      id: user.id,
      username: user.username,
      name: user.lastName + user.firstName
    })
    this.client.session.save();
    // 登入成功寄給你的 telegram 一個訊息
    await this.client.sendMessage("me", {
      message: "node sevret is online! " + new Date().toLocaleString(),
    });

    return true;
  }
}

const telegramItem = TelegramItem.getInstance();

telegramItem.init();

module.exports = telegramItem;
