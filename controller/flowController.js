const viewPrinter = require("../view/viewPrinter");

class FlowController {
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
        break;
      case "離開":
        this.leaveApp();
        break;
      default:
        break;
    }
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
