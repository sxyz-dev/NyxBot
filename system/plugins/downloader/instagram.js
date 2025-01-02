module.exports = {
  command: "Instagram",
  alias: ["igdl", "ig", "igvideo", "igreel"],
  category: ["downloader"],
  settings: {
    limit: true,
  },
  description: "mengunduh Reels/postingan Instagram",
  loading: true,
  async run(m, { sock, Func, text, Scraper }) {
    if (!text) throw "> Reply atau masukan link dari Instagram";
    if (!/instagram.com/.test(text)) throw "> Masukan link Instagram nya";
    let data = await Scraper.Instagram(text);
    if (!data) return;
    for (let i of data.url) {
      let res = await fetch(i);
      sock.sendFile(
        m.cht,
        Buffer.from(await res.arrayBuffer()),
        null,
        `*– 乂 Instagram downloader*
${Object.entries(data.metadata)
  .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
  .join("\n")}`,
        m,
      );
    }
  },
};
