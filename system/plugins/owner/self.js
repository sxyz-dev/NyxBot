module.exports = {
  command: "self",
  alias: [],
  category: ["owner"],
  settings: {
    owner: true,
  },
  description: "Ubah bot menjadi mode senyap",
  async run(m, { sock, text }) {
    if (!text)
      return m.reply({
        text: "A-Anu Silahkan Klik Self Atau Public Owner.. S-Saya Persilahkan.",
        footer: "NyxAi | By NyxDevelopment",
        buttons: [{
          buttonId: ".self 1",
          buttonText: {
             displayText: "Self"
          }
        }, {
          buttonId: ".self 0",
          buttonText: {
             displayText: "Public"
          }
        }],
        viewOnce: true,
        headerType: 6,
      })
    let settings = db.list().settings;
    settings.self = parseInt(text) > 0 ? true : false;
    m.reply(`> Berhasil ${text < 1 ? "mematikan" : "menghidupkan"} fitur self`);
  },
};
