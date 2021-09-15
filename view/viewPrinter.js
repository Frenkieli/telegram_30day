const consoleItem = require("../interface/consoleItem");
const input = require("input");

class ViewPrinter {
  
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
   * @description 歡迎你
   *
   * @memberof ViewPrinter
   */
  async welcome() {
    return new Promise((resolve) => {
      let str = [
        "=======================================================",
        "=======================================================",
        "============                               ============",
        "============     Welcome Node Telegram     ============",
        "============                               ============",
        "=======================================================",
        "=======================================================",
      ]
      console.log("\x1b[36m");
      for( let i = 0 ; i < str.length ; i++ ) {
        setTimeout(() => {
          console.log(str[i]);
          if(i === str.length -1) {
            console.log("\x1b[0m");
            resolve();
          };
        }, i * 100);
      } 
    })  
  }


  /**
   * @description 主要畫面選單
   *
   * @memberof ViewPrinter
   */
  async mainMenu() {
    let option = ["登入", "離開"];

    let selectOption = await input.select("你好：", option);

    return selectOption;
  }

}

let viewPrinter = ViewPrinter.getInstance();

module.exports = viewPrinter;