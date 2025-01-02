const axios = require("axios");

module.exports = {
  command: "facebook",
  alias: ["fb", "fbdl"],
  category: ["downloader"],
  settings: {
    limit: true,
  },
  description: "Unduh video dari Facebook",
  loading: true,
  async run(m, { sock, Scraper, Text, Func, text }) {
    if (!/facebook.com|fb.watch/.test(text) || !text)
      throw "> Masukan link Facebook nya";
    let data = await Scraper.facebook(text);
    let random = data.media[0];
    let buffer = await fetch(random).then(async (a) =>
      Buffer.from(await a.arrayBuffer()),
    );
    let size = Func.formatSize(buffer.length);
    let limit = await Func.sizeLimit(size, db.list().settings.max_upload);
    if (limit.oversize)
      throw `Maaf saya tidak dapat mengunduh video Facebook tersebut karena ukuran video melebihi batas ukuran yang di tentukan *( ${size} )*, Upgrade status mu ke premium agar dapat batas maksimal hingga *1GB* !`;
    let cap = "*– 乂 Facebook Downloader*\n";
    cap += Object.entries(data.metadata)
      .map(([a, b]) => `> *- *${a.capitalize()} :* ${b}`)
      .join("\n");
    sock.sendFile(m.cht, buffer, null, cap, m);
  },
};
