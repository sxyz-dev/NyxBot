const axios = require("axios");

const cmd = {
  command: "waifu",
  category: ["anime"],
  alias: ["waifu"],
  description: "Gambar random Waifu",
  loading: true,
  async run(m, { sock, config }) {
    let json = await axios.get("https://api.waifu.pics/sfw/waifu");
    m.reply({
      image: json.data,
      caption: `> *- Random :* [ ${m.command} ]`,
      footer: config.name,
      buttons: [{
          buttonId: ".waifu",
          buttonText: {
            displayText: "🖼️ Gambar selanjutnya"
         }
       }],
       viewOnce: true,
       headerType: 6,
    });
  },
};

module.exports = cmd;