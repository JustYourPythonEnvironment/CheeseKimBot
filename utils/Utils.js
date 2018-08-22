module.exports = {
  logAndMsg: (channel, msg) => {
    console.log(msg);
    channel.send(msg);
  },
  errAndMsg: (channel, err) => {
    console.error(err);
    channel.send(`Neomuhae! ${err}`);
  },
  getRandomIndex: (arr) => Math.floor(Math.random() * arr.length),
};