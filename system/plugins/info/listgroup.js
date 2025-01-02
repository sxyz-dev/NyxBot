module.exports = {
  command: "listgroup",
  alias: ["gcl", "listgroup"],
  category: ["info"],
  settings: {
    limit: true,
    owner: true,
  },
  description: "> List Group chat bot",
  async run(m, { sock, Func, store }) {
    let data = Object.values(store.groupMetadata);
    let cap = "*– 乂 Group - List*\n";
    cap += `> *- Total :* ${data.length}\n\n`;
    cap += data
      .sort((a, b) => b.creation - a.creation)
      .map(
        (a, i) =>
          `> *${i + 1}.* ${a.subject}\n> *- Dibuat :* ${Func.ago(a.creation * 1000)}\n> *- Total member :* ${a.size}\n> *- Pemilik group :* ${a.owner ? "@" + a.owner.split("@")[0] : "Gada pemilik nya"}`,
      )
      .join("\n\n");

    m.reply(cap);
  },
};
