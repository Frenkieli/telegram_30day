const consoleItem = require("../interface/consoleItem");

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

}

let viewPrinter = ViewPrinter.getInstance();

module.exports = viewPrinter;