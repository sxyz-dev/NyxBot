const axios = require("axios");

module.exports = {
  command: "bstation",
  alias: ["blibili"],
  category: ["downloader"],
  settings: {
    limit: true,
  },
  description: "Mencari/download video dari bstation",
  loading: true,
  async run(m, { sock, Func, Scraper, text }) {
    if (!text)
      throw `> *乂 Cara Penggunaan :*
> *-* Masukan Query untuk mencari video
> *-* Masukan Url untuk mendownload video

> *乂 Contoh Penggunaan :*
> *- ${m.prefix + m.command} Video lucu*
> *- ${m.prefix + m.command} https://www.bilibili.tv/id/video/4793262300860416*`;

    if (Func.isUrl(text)) {
      let data = await Scraper.bstation.download(text);
      let buffer = await Func.fetchBuffer(data.download.url);

      let size = Func.formatSize(buffer.length);
      let limit = Func.sizeLimit(size, db.list().settings.max_upload);
      if (limit.oversize)
        throw `Maaf saya tidak dapat mengunduh video bstation karena ukuran video tersebut memiliki batas ukuran yang ditentukan *( ${size} )*, Upgrade status ke premium agar dapat download video hingga *1GB* !`;

      console.log("Compression completed, sending video...");
      let cap = `*– 乂 Bstation - Downloader*
`;
      cap += Object.entries(data.metadata)
        .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
        .join("\n");

      m.reply({
        video: buffer,
        caption: cap,
      });
    } else {
      let data = await Scraper.bstation.search(text);
      let cap = `*– 乂 Bstation - search*
`;
      cap += `> Ketik *${m.prefix + m.command} ${data[0].url}* untuk mendownload video dari bstation\n\n`;
      cap += data
        .map(
          (res, index) =>
            `*${index + 1}.* ${res.title}\n> *- Penonton :* ${res.views}\n> *- Durasi :* ${res.duration}\n> *- Author :* ${res.author.name}\n> *- Url :* ${res.url}`,
        )
        .join("\n\n");
      m.reply(cap);
    }
  },
};
