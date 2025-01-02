module.exports = {
  command: "doodstream",
  alias: ["dood", "doods"],
  category: ["downloader"],
  description: "Download dan upload video dari doodstream",
  loading: true,
  async run(m, { sock, Func, Uploader, text, Scraper }) {
    if (!text)
      throw "*– 乂 Cara Penggunaan*\n> *`--upload`* Untuk upload video ke doodstream\n> *`https://dood.li/xxx`* untuk download video dari doodstream";
    if (m.text.includes("--upload")) {
      let q = m.quoted ? m.quoted : m;
      if (!/video/.test(q.msg.mimetype) || !q.isMedia)
        throw `> Reply/kirim video Dengan caption ${m.prefix + m.command} ${text}`;
      let buffer = await q.download();
      let hasil = await Uploader.doods(buffer);
      let cap = "*– 乂 Doodstream - Uploader*\n";
      cap += `> *- Ukuran :* ${Func.formatSize(buffer.length)}\n`;
      cap += `> *- Link :* ${hasil.result[0].protected_embed}`;

      m.reply(cap);
    } else {
      if (!Func.isUrl(text) || !/dood.(li|la|com|ws)/.test(text))
        throw "> Masukan link Doodstream nya";
      let data = await Scraper.doodstream(text);
      if (!data.download) return m.reply(Func.jsonFormat(data));
      let size = await Func.getSize(data.download());
      let limit = Func.sizeLimit(size, db.list().settings.max_upload);
      if (limit.oversize)
        throw `Ukuran File terlalu besar *( ${size} )*, Uprgade ke premium agar dapat download ukuran video hingga *1GB !*`;
      let cap = "*– 乂 Doodstream - Downloader*\n";
      cap += Object.entries(data)
        .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
        .join("\n");
      m.reply({
        video: {
          url: hasil,
        },
        caption: cap,
      });
    }
  },
};
