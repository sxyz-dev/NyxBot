const { writeExif } = require(process.cwd()+"/lib/sticker.js");

module.exports = {
     command: 'furbrat',
     alias: ['hikagen'],
     category: ['tools'],
     settings:  {
        limit: true
   },
   description: "Brat versi furry :v",
   loading: true,
   async run(m, { sock, text, Func, config }) {
       if (!text) throw "> Masukan Text nya"
      let random = Math.floor(Math.random() * 7);
      let API = `https://fastrestapis.fasturl.link/tool/furbrat?text=${text}&style=${random}&mode=center`
   let buffer = await Func.fetchBuffer(API);
   let sticker = await writeExif({
       mimetype: 'image',
       data: buffer 
   }, {
      packName: config.sticker.packname,
      packPublish: config.sticker.author
   })
    m.reply({ sticker });
  }
}