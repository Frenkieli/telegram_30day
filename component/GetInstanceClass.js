class GetInstanceClass {
  /**
   * @description 確保都拿到同一個實例
   *
   * @static
   * @return {*} 統一回傳class實例
   * @memberof GetInstanceClass
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}

module.exports = GetInstanceClass;