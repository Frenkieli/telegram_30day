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
        console.log(selectOption);
        break;
      default:
        break;
    }
    this.start();
  }
}

let flowController = FlowController.getInstance();

module.exports = flowController;
