module.exports = {
  command: "tiktoksearch",
  alias: ["ttsearch"],
  category: ["downloader"],
  settings: {
    limit: true,
  },
  description: "> untuk mencari video dari tiktok",
  loading: true,
  async run(m, { sock, Func, text, Scraper, config }) {
    if (!text) throw "> Masukan pencarian nya";
    let data = await Scraper.tiktok.search(text);
    let json = data.getRandom();
    let cap = "*– 乂 Tiktok - search*\n";
    cap += Object.entries(json.metadata)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
    cap += "\n";
    cap += Object.entries(json.stats)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
    m.reply({
      video: {
        url: json.media.no_watermark,
      },
      caption: cap,
    });
  },
};
