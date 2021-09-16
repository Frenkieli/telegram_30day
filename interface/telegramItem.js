const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Logger } = require("telegram/extensions");

Logger.setLevel("none"); // 這邊可以隱藏很多關於 telegram 的運作細節

class TelegramItem {
  constructor() {}

  /**
   * @description 確保都拿到同一個實例
   *
   * @static
   * @return {*}
   * @memberof ConsoleItem
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
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
}

const telegramItem = TelegramItem.getInstance();

telegramItem.init();

module.exports = telegramItem;