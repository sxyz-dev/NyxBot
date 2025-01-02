module.exports = {
  command: "resetlink",
  alias: ["revoke"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "Untuk mereset ulang link group",
  async run(m, { sock }) {
    await sock
      .groupRevokeInvite(m.cht)
      .then((a) =>
        m.reply("> *- Link group baru :* https://chat.whatsapp.com/" + a),
      );
  },
};
