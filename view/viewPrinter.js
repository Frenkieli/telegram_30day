const consoleItem = require("../interface/consoleItem");
const input = require("input");
const GetInstanceClass = require("../component/GetInstanceClass");

class ViewPrinter extends GetInstanceClass{
  constructor() {
    super();
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
      ];
      console.log("\x1b[36m");
      for (let i = 0; i < str.length; i++) {
        setTimeout(() => {
          console.log(str[i]);
          if (i === str.length - 1) {
            console.log("\x1b[0m");
            resolve();
          }
        }, i * 100);
      }
    });
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

  /**
   * @description 按下去任何按鍵來繼續程式
   *
   * @return {*}
   * @memberof InterfaceClass
   */
  async pressToContinue() {
    return new Promise((resolve) => {
      const handler = () => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write("\n");
        resolve();
      };

      process.stdin.resume();
      process.stdin.setRawMode(true);
      process.stdin.once("data", handler);
    });
  }

  /**
   * @description 清空畫面
   *
   * @memberof ViewPrinter
   */
  async clearView() {
    process.stdout.write(
      process.platform === "win32" ? "\x1Bc" : "\x1B[2J\x1B[3J\x1B[H"
    );
  }
}

let viewPrinter = ViewPrinter.getInstance();

module.exports = viewPrinter;
