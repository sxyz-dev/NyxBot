module.exports = {
  command: "promote",
  alias: ["jadiadmin", "newking"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "Untuk mengubah member menjadi admin",
  async run(m, { sock, text }) {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentions.length > 0
        ? m.mentions[0]
        : false;
    if (!who) throw "> Tag/Balas pesan member yang mau di promote";
    let user = await sock.onWhatsApp(who);
    if (!user[0].exists) throw "> Member tidak terdaftar di WhatsApp";
    await sock
      .groupParticipantsUpdate(m.cht, [who], "promote")
      .then((a) => m.reply("> Awas ada admin baru !"));
  },
};
