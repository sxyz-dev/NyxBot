module.exports = {
  command: "demote",
  alias: ["jadimember"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "Untuk mengubah admin menjadi member",
  async run(m, { sock, text }) {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentions.length > 0
        ? m.mentions[0]
        : false;
    if (!who) throw "> Tag/Balas pesan member yang mau di demote";
    let user = await sock.onWhatsApp(who);
    if (!user[0].exists) throw "> Member tidak terdaftar di WhatsApp";
    await sock
      .groupParticipantsUpdate(m.cht, [who], "demote")
      .then((a) => m.reply("> Jabatan mu turun king !"));
  },
};
