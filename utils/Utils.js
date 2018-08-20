module.exports = {
  logAndMsg: function(channel, msg) {
    console.log(msg);
    channel.send(msg);
  },
  errAndMsg: function(channel, err) {
    console.error(err);
    channel.send(`Neomuhae! ${err}`);
  }
};