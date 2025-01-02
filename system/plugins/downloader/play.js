const yts = require("yt-search");

module.exports = {
  command: "play",
  alias: [],
  category: ["downloader"],
  description: "Cari video/musik dari YouTube",
  settings: {
    limit: true,
  },
  loading: true,
  async run(m, { sock, Func, config, text, Scraper }) {
    if (!text) throw "> Masukan Pencarian nya";
    let info = await yts(text).then((a) => a.videos.getRandom());
    if (info.seconds > 36000)
      throw "> Maaf durasi di diatas satu jam !\n> Silahkan cari lain";
    let data = await Scraper.YouTube.mp3(info.url);
    let cap = `*– 乂 YouTube - Play*\n`;
    cap += Object.entries(data.metadata)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
    let size = await Func.formatSize(data.download.length);
    let limit = Func.sizeLimit(size, db.list().settings.max_upload);
    if (limit.oversize)
      throw `> Gagal mengunduh audio karena telah ukuran file untuk pengguna gratis *( ${size} )*, upgrade status mu ke premium agar dapat mengunduh audio hingga *1GB* !`;
    m.reply({
      image: {
        url: data.metadata.thumbnail,
      },
      caption: cap,
    }).then((a) => {
      m.reply({
        audio: data.download,
        mimetype: "audio/mpeg",
      });
    });
  },
};
