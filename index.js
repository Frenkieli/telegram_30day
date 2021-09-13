const http = require("http");
const { receiveTelegram } = require("./botHook/main");

var server = http.createServer(async function (req, res) {
  let url = req.url.split("?")[0];
  let paramrter = req.url.split("?")[1];
  if (paramrter) paramrter = getUrlParameter(paramrter);
  let data = null;
  let buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  data = Buffer.concat(buffers).toString();
  data = data ? JSON.parse(data) : null;
  // 上方獲取資料區

  // 這邊開始實作 url
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    // 實作判斷請求
    if (req.method === "POST") {
      if (data) {
        receiveTelegram(data, res);
      }
      res.end();
    } else {
      res.write("404 page");
      res.end();
    }
  } else {
    res.write("404 page");
    res.end();
  }
});

server.listen(3000);

console.log("noder server is start");

/**
 * @description 用來確認是否有帶參數
 *
 * @param {string} reqUrl url ? 後面的部分
 * @return {*}
 */
function getUrlParameter(reqUrl) {
  var url = reqUrl; //獲取url中"?"符後的字串
  var theRequest = new Object();
  var strs = null;
  strs = url.split("&");
  for (var i = 0; i < strs.length; i++) {
    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
  }
  return theRequest;
}
