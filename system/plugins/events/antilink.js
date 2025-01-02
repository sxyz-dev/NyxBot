const { getUrlInfo } = require("baileys");

async function events(m, { sock, Func }) {
  if (!m.isGroup) return
  let group = db.list().group[m.cht]
  if (Func.isUrl(m.body) && /chat.whatsapp.com/.test(m.body)) {
  if (!m.isBotAdmin) return
   let link = await getUrlInfo(Func.isUrl(m.body).find((a) => a.includes("chat.whatsapp.com")));
   let msg = `*– 乂 Link Group Terdeteksi !*\n`
       msg += `> *- Tag :* @${m.sender.split("@")[0]}\n`
       msg += `> *- Status :* ${m.isAdmin ? "admin group" : "member group"}`
       msg += `\n\n${m.isAdmin ? `> Kamu aman karena kamu admin dari group ${m.metadata.subject}` :   `> Maaf Kami tidak memperbolehkan anda mengirim *${link.title}* cari group lain saja 😹`}`
   if (!m.isAdmin) return m.reply(msg)
    .then(() => {
     m.reply({ delete: m.key });
   })
  }
}

module.exports = { events }