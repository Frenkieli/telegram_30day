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
    console.log("nextTick");
  }

}

let flowController = FlowController.getInstance();

module.exports = flowController;