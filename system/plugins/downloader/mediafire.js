module.exports = {
  command: "mediafire",
  alias: ["mf", "mfdl"],
  category: ["downloader"],
  setings: {
    limit: true,
  },
  description: "Unduh link MediaFire",
  loading: true,
  async run(m, { sock, Scraper, Func, text }) {
    if (!Func.isUrl(text) || !/mediafire.com/.test(text) || !text)
      throw "> Masukan link MediaFire nya";
    let data = await Scraper.mediafire(text);
    let cap = "*– 乂 MediaFire - Downloader*\n";
    cap += Object.entries(data)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
    let buffer = await fetch(data.download).then(async (a) =>
      Buffer.from(await a.arrayBuffer()),
    );
    let limit = Func.sizeLimit(data.size, db.list().settings.max_upload);
    if (limit.oversize)
      throw `Maaf file yang kamu download telah melebihi batas ukuran file yang ditentukan *( ${size} )*, upgrade status mu ke premium agar dapat mendownload file hingga *1GB!*`;
    m.reply({
      document: buffer,
      mimetype: data.mimetype,
      fileName: data.filename,
      caption: cap,
    });
  },
};
