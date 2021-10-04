const GetInstanceClass = require("../component/GetInstanceClass");


/**
 * @description 自己定義的 console 檔案
 *
 * @class ConsoleItem
 */
class ConsoleItem extends GetInstanceClass{
  constructor() {
    super();
    this.message = [];
    this.time = null;
    this.color = {
      black: "\x1b[30m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      white: "\x1b[37m",
      none: "",
    };
    this.bgColor = {
      black: "\x1b[40m",
      red: "\x1b[41m",
      green: "\x1b[42m",
      yellow: "\x1b[43m",
      blue: "\x1b[44m",
      magenta: "\x1b[45m",
      cyan: "\x1b[46m",
      white: "\x1b[47m",
      none: "",
    };
  }

  /**
   * @description 增加要印出來的的文字到畫面上，用來取代 log 使用
   *
   * @param {string} message 印出來的文字 %s 可以指定文字中那些部分要顏色 000%s111%s000
   * @param {string} [color="none"] black | red | green | yellow | blue | magenta | cyan | white | none 文字色
   * @param {string} [bgColor="none"] black | red | green | yellow | blue | magenta | cyan | white | none 背景色
   * @memberof ConsoleItem
   */
  addText(message, color = "none", bgColor = "none") {
    let vm = this;
    if (message.indexOf("%s") === -1) {
      vm.message.push({
        text: message.split(""),
        color,
        bgColor,
        breakPoint: true,
      });
    } else {
      let messageInput = message.split("%s");
      let inData;
      for (let i = 0; i < messageInput.length; i++) {
        inData = {
          text: messageInput[i].split(""),
          color: i % 2 ? color : "none",
          bgColor: i % 2 ? bgColor : "none",
        };
        if (i === messageInput.length - 1) inData.breakPoint = true;
        vm.message.push(inData);
      }
    }
    process.stdout.write(
      vm.color[vm.message[0]?.color] + vm.bgColor[vm.message[0]?.bgColor]
    );
    clearTimeout(this.time);
    vm.printText();
  }

  /**
   * @description 去印字，慢慢印才有科技感
   *
   * @memberof ConsoleItem
   */
  printText() {
    this.time = setTimeout(() => {
      let vm = this;
      if (vm.message.length !== 0) {
        if (vm.message[0].text.length !== 0) {
          process.stdout.write(vm.message[0].text[0]);
          vm.message[0].text.splice(0, 1);
        } else {
          // 重置
          process.stdout.write("\x1b[0m");
          if (vm.message[0].breakPoint) process.stdout.write("\n");
          vm.message.splice(0, 1);
          if (vm.message[0]) {
            process.stdout.write(
              vm.color[vm.message[0]?.color] +
                vm.bgColor[vm.message[0]?.bgColor]
            );
          }
        }
        vm.printText();
      }
    }, 30);
  }
}

const consoleItem = ConsoleItem.getInstance();

module.exports = consoleItem;
