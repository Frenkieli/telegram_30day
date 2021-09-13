function receiveTelegram(data, res) {
  console.log(data);
  res.write(JSON.stringify({
    message: "gogo"
  }))
}

module.exports = {
  receiveTelegram
}