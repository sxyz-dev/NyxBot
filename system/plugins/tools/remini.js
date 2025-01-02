module.exports = {
  command: "remini",
  alias: ["hdr", "hd"],
  category: ["tools"],
  settings: {
    limit: true,
  },
  description: "Tingkatkan kualitas Photo mu !",
  loading: true,
  async run(m, { sock, Scraper, Func }) {
    let q = m.quoted ? m.quoted : m;
    if (!/image/.test(q.msg.mimetype) || !q.isMedia)
      throw `> Reply/Kirim photo yang mau di jernihkan`;
    let buffer = await q.download();
    let data = await Scraper.remini(buffer);
    let size = Func.formatSize(data.length);
    m.reply({
      image: data,
      caption: `*– 乂 Remini - Image*\n> *- Ukuran photo :* ${size}`,
    });
  },
};
