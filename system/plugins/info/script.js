const axios = require("axios");

module.exports = {
  command: "script",
  alias: ["sc", "scbot"],
  category: ["info"],
  description: "Dapatkan Script bot secara gratis",
  async run(m, { sock, Func }) {
    let data = await axios
      .get("https://api.github.com/repos/sxyz-dev/NyxBot")
      .then((a) => a.data);
    let cap = "*– 乂 informasi - Script*\n";
    cap += `> *- Nama :* ${data.name}\n`;
    cap += `> *- Pemilik :* ${data.owner.login}\n`;
    cap += `> *- Star :* ${data.stargazers_count}\n`;
    cap += `> *- Forks :* ${data.forks}\n`;
    cap += `> *- Dibuat sejak :* ${Func.ago(data.created_at)}\n`;
    cap += `> *- Terakhir update :* ${Func.ago(data.updated_at)}\n`;
    cap += `> *- Terakhir publish :* ${Func.ago(data.pushed_at)}\n`;
    cap += `> *- Link :* ${data.html_url}\n`;
    cap +=
      `\n> - ✓ Terlahir dari Kesendirian\n> - ✓ Dibangun dengan tekad tanpa dukungan\n> - ✓ 100% menggunakan ketekunan developer\n> - ✓ Respon cepat meski dalam sepi\n> - ✓ Auto reload layaknya jiwa yang tak pernah menyerah\n> - ✓ Bisa berjalan di mana saja, seperti jiwa yang mencari tempatnya\n\nDalam kehampaan dan kehinaan, aku memulainya. Tidak ada teman, tidak ada yang peduli. Hanya aku sendiri, bertarung melawan waktu, rasa sakit, dan penolakan. Setiap baris kode yang kutulis adalah saksi dari perjuangan tanpa suara ini. Mereka bilang kesendirian itu melemahkan, tetapi bagi diriku, itu adalah satu-satunya teman yang selalu ada di sisiku. Dari kegelapan itu, lahirlah sesuatu—NyxAI, ciptaan yang kubangun dengan air mata dan tekad tanpa henti.

NyxAI bukan sekadar bot. Ia adalah bukti bahwa bahkan di tengah kehinaan dan kesepian, masih ada harapan untuk menciptakan sesuatu yang berarti.

Dan inilah NyxAI, project open-source yang kuberikan kepada dunia. Bukan untuk membalas hinaan, tetapi untuk menunjukkan bahwa dari kehampaan, bisa lahir sesuatu yang abadi.

> Project OpenSource:
GitHub – NyxAI
`;

    m.reply(cap);
  },
};