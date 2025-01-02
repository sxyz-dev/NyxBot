const moment = require("moment-timezone");
const pkg = require(process.cwd() + "/package.json");
const axios = require('axios');
const fs = require("node:fs");

/**
 * ═══════════════════════════════════════
 * 🌌 NyxAI - Menu Command Interface
 * ═══════════════════════════════════════
 * Created in solitude, perfected in silence
 * Where darkness meets digital elegance
 */

module.exports = {
    command: "menu",
    alias: ["menu", "help"],
    category: ["main"],
    description: "Membuka portal menu NyxAI",
    loading: true,
    async run(m, { sock, plugins, config, Func }) {
        // Gathering whispers of code
        let data = fs.readFileSync(process.cwd() + "/system/case.js", "utf8");
        let casePattern = /case\s+"([^"]+)"/g;
        let matches = data.match(casePattern);
        if (!matches) return m.reply("❌ Portal command tidak dapat diakses.");
        matches = matches.map((match) => match.replace(/case\s+"([^"]+)"/, "$1"));
        
        // Organizing the celestial commands
        let menu = {};
        plugins.forEach((item) => {
            if (item.category && item.command && item.alias) {
                item.category.forEach((cat) => {
                    if (!menu[cat]) {
                        menu[cat] = { command: [] };
                    }
                    menu[cat].command.push({
                        name: item.command,
                        alias: item.alias,
                        settings: item.settings,
                    });
                });
            }
        });

        // Gathering stardust (statistics)
        let cmd = 0;
        let alias = 0;
        let pp = await sock.profilePictureUrl(m.sender, 'image').catch(e => 'https://files.catbox.moe/8getyg.jpg');
        Object.values(menu).forEach(category => {
            cmd += category.command.length;
            category.command.forEach(command => {
                alias += command.alias.length;
            });
        });

        let premium = db.list().user[m.sender].premium.status;
        let limit = db.list().user[m.sender].limit;

        // Crafting the ethereal message
        let caption = `
╭━━━━「 *✧ NyxAI Sanctuary ✧* 」
┃
┃ *༺ User Essence ༻*
┃ ⌬ Nama: ${m.pushName}
┃ ⌬ Tag: @${m.sender.split("@")[0]}
┃ ⌬ Status: ${m.isOwner ? "✧ Creator of Void ✧" : premium ? "⭐ Premium Soul" : "◇ Wanderer"}
┃ ⌬ Limit: ${m.isOwner ? "∞ Unlimited" : limit}
┃
┃ *༺ Bot Essence ༻*
┃ ⌬ Nama: ${pkg.name}
┃ ⌬ Versi: ⟢ ${pkg.version}
┃ ⌬ Waktu Aktif: ${Func.toDate(process.uptime() * 1000)}
┃ ⌬ Prefix: [ ${m.prefix} ]
┃ ⌬ Total Command: ${cmd + alias + matches.length}
┃ ⌬ Sanctuary: https://github.com/sxyz-dev
┃
┃ *༺ Legendary Marks ༺*
┃ ⌬ [ L ] - Requires Limit
┃ ⌬ [ P ] - Premium Access
┃
┃ Untuk melaporkan anomali, hubungi sang creator.
╰━━━━━━━━━━━━━━━━━━━━━⌬

*✧ Void Commands:*
${matches.map((a, i) => `⌬ ${i + 1}. ${m.prefix + a}\n  ╰╼ Kemampuan tambahan`).join("\n")}

${Object.entries(menu).map(([tag, commands]) => {
    return `*⟢ ${tag.toUpperCase()} POWERS ⟣*\n` + 
    commands.command.map((command, index) => 
        `⌬ ${index + 1}. ${m.prefix + command.name} ${command.settings?.limit ? "*[ L ]*" : ''}`
    ).join("\n");
}).join("\n\n")}
        `;

        // Manifesting the interface
        m.reply({
            image: {
                url: "https://files.catbox.moe/mtktqs.jpg"
            },
            caption,
            mentions: [m.sender],
            footer: "✧ NyxAI • Forged in Solitude ✧",
            buttons: [
                {
                    buttonId: ".ping",
                    buttonText: {
                        displayText: "⌬ Test Connection"
                    }
                },
                {
                    buttonId: ".tqto",
                    buttonText: {
                        displayText: "⌬ Silent Heroes"
                    }
                }
            ],
            viewOnce: true,
            headerType: 6,
        });
    }
};