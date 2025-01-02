module.exports = {
  command: "tqto",
  alias: ["credit"],
  category: ["info"],
  description: "Ucapan terima kasih dari pengembang",
  async run(m) {
    let cap = `
Terima kasih yang sebesar-besarnya kepada kalian yang telah menggunakan NyxAI.

Script ini dibuat dengan semangat dan rasa kesepian. Semoga apa yang saya buat bisa bermanfaat untuk kalian semua.

Tanpa kalian, NyxAI tidak akan ada. Kalian adalah bagian dari perjalanan ini. Terima kasih atas dukungannya.

Dukung terus project kami di:  
https://github.com/sxyz-dev

Forum Update:  
https://whatsapp.com/channel/0029VaxKuXD6WaKh3VQYgm0C

https://chat.whatsapp.com/KfKHGQ4EKmV4sqRAhEmQKg
    `;
    m.reply(cap);
  },
};