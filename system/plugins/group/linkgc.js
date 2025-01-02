module.exports = {
  command: "link",
  alias: ["linkgc"],
  category: ["group"],
  settings: {
    group: true,
    botAdmin: true,
  },
  description: "Untuk mengambil link group",
  async run(m, { sock }) {
    let link =
      "https://chat.whatsapp.com/" + (await sock.groupInviteCode(m.cht));
    m.reply(`*– 乂 ${m.metadata.subject}*\n> *- Link :* ${link}`);
  },
};
