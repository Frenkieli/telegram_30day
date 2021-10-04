const viewPrinter = require("../view/viewPrinter");
const telegramItem = require("../interface/telegramItem");
const GetInstanceClass = require("../component/GetInstanceClass");

class FlowController extends GetInstanceClass {
  constructor() {
    super();
  }

  /**
   * @description 起始畫面
   *
   * @memberof FlowController
   */
  async start() {
    await viewPrinter.welcome();
    this.mainMenu();
  }

  /**
   * @description 主要選單
   *
   * @memberof FlowController
   */
  async mainMenu() {
    let selectOption = await viewPrinter.mainMenu();
    switch (selectOption) {
      case "登入":
        this.loginTelegram();
        break;
      case "離開":
        this.leaveApp();
        break;
      default:
        break;
    }
  }

  /**
   * @description 登入 telegram
   *
   * @memberof FlowController
   */
  async loginTelegram() {
    await telegramItem.login();

    this.mainMenu();
  }

  /**
   * @description 離開應用程式
   *
   * @memberof FlowController
   */
  async leaveApp() {
    viewPrinter.clearView();
    console.log("按 任意鍵 離開程式");
    await viewPrinter.pressToContinue();
    process.exit();
  }
}

let flowController = FlowController.getInstance();

module.exports = flowController;
