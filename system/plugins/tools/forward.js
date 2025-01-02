const path = require("node:path");
const serialize = require(path.resolve("./lib/serialize.js"));

module.exports = {
  command: "quoted",
  alias: ["q"],
  category: ["tools"],
  settings: {
    limit: true,
  },
  description: "Untuk meneruskan pesan seseorang ",
  async run(m, { sock, store }) {
    if (!m.quoted) throw "> Balas pesan yang ingin di teruskan";
    let loadMsg = await store.loadMessage(m.cht, m.quoted.id);
    if (!loadMsg.message) throw "> Gada pesan yang diteruskan !";
    let data = await serialize(loadMsg, sock, store);
    if (!data.quoted) throw "> Gada pesan yang diteruskan !";
    sock.copyNForward(m.cht, data.quoted, true);
  },
};
