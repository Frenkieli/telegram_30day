const GetInstanceClass = require("./component/GetInstanceClass");
/**
 * @description 資料都存在這邊
 *
 * @class DataCenter
 */
class DataCenter extends GetInstanceClass {
  constructor() {
    super();

    this.state = {
      user: {
        id: "X",
        username: "X",
        name: "遊客"
      }
    };
  }

  /**
   * @description 獲取對應資料
   *
   * @param {string} key
   * @return {any} state data
   * @memberof DataCenter
   */
  getData(key) {
    switch (key) {
      case "user":
        return this.state["user"];
      default:
        break;
    }
  }

  /**
   * @description 設定 state 資料
   *
   * @param {string} key
   * @param {any} data state data
   * @memberof DataCenter
   */
  setData(key, data) {
    switch (key) {
      case "setUser":
        this.state["user"] = data;
        break;
      default:
        break;
    }
  }

  /**
   * @description 訂閱資料變更後要執行的程式,先預留到時候再寫
   *
   * @param {string} key state data
   * @param {function} callBack
   * @memberof DataCenter
   */
  subscription(key, callBack) {

  }
}

let dataCenter = DataCenter.getInstance();

module.exports = dataCenter;
