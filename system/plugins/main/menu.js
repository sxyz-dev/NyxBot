const moment = require("moment-timezone");
const pkg = require(process.cwd() + "/package.json");
const axios = require('axios');
const fs = require("node:fs");
const path = require('path');
const jimp = require('jimp');

/**
 * ═══════════════════════════════════════
 * 🌌 NyxAI - Menu Command Interface
 * ═══════════════════════════════════════
 * Created in solitude, perfected in silence
 * Where darkness meets digital elegance
 */

const resizeImage = async (buffer, width, height) => {
    try {
        const image = await jimp.read(buffer);
        return await image.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
    } catch (error) {
        console.error('Error resizing image:', error);
        throw error;
    }
};

const extractCommands = () => {
    try {
        const casePath = path.join(process.cwd(), "system", "case.js");
        const data = fs.readFileSync(casePath, "utf8");
        const casePattern = /case\s+"([^"]+)"/g;
        const matches = data.match(casePattern);
        
        if (!matches) return null;
        return matches.map(match => match.replace(/case\s+"([^"]+)"/, "$1"));
    } catch (error) {
        console.error('Error extracting commands:', error);
        return null;
    }
};

const organizeMenu = (plugins) => {
    const menu = {};
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
    return menu;
};

const generateStats = (menu) => {
    let cmdCount = 0;
    let aliasCount = 0;
    
    Object.values(menu).forEach(category => {
        cmdCount += category.command.length;
        category.command.forEach(command => {
            aliasCount += command.alias.length;
        });
    });
    
    return { cmdCount, aliasCount };
};

const generateMenuText = (menu, matches, m, pkg, Func, userInfo) => {
    const { premium, limit } = userInfo;
    const stats = generateStats(menu);
    
    return `
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
┃ ⌬ Total Command: ${stats.cmdCount + stats.aliasCount + matches.length}
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
}).join("\n\n")}`;
};

module.exports = {
    command: "menu",
    alias: ["menu", "help"],
    category: ["main"],
    description: "Membuka portal menu NyxAI",
    loading: true,
    
    async run(m, { sock, plugins, config, Func }) {
        try {
            // Extract commands
            const matches = extractCommands();
            if (!matches) return m.reply("❌ Portal command tidak dapat diakses.");
            
            // Organize menu structure
            const menu = organizeMenu(plugins);
            
            // Get user profile picture
            const pp = await sock.profilePictureUrl(m.sender, 'image')
                .catch(() => 'https://files.catbox.moe/8getyg.jpg');
                
            // Get user info from database
            const userInfo = {
                premium: db.list().user[m.sender].premium.status,
                limit: db.list().user[m.sender].limit
            };
            
            // Generate menu text
            const caption = generateMenuText(menu, matches, m, pkg, Func, userInfo);
            
            // Process thumbnail
            const thumbPath = path.join(process.cwd(), "image", "thumb.jpg");
            const thumbBuffer = fs.readFileSync(thumbPath);
            const resizedThumb = await resizeImage(thumbBuffer, 100, 100);
            
            // Prepare document path
            const docsPath = path.join(process.cwd(), "README.md");
            
            // Send menu message
            await m.reply({
                document: fs.readFileSync(docsPath),
                filename: "Nyx - AI | Development",
                mimetype: "image/null",
                fileLength: 9999999999999,
                pageCount: 999999999999,
                jpegThumbnail: resizedThumb,
                caption,
                mentions: [m.sender],
                footer: "✧ NyxAI • Forged in Solitude ✧",
                type: "list",
                buttons: [
                    {
                        buttonId: ".ping",
                        buttonText: { displayText: "⌬ Test Connection" }
                    },
                    {
                        buttonId: ".tqto",
                        buttonText: { displayText: "⌬ Silent Heroes" }
                    }
                ],
                viewOnce: true,
                headerType: 6,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 99999,
                    externalAdReply: {
                        showAdAttribution: true,
                        title: `⌬ Nyx Ai | Created With Lonely`,
                        mediaType: 1,
                        previewType: 1,
                        body: `Hello ${m.pushName} Welcome To Menu`,
                        thumbnailUrl: "https://files.catbox.moe/mtktqs.jpg",
                        renderLargerThumbnail: true,
                        mediaUrl: "https://chat.whatsapp.com/KfKHGQ4EKmV4sqRAhEmQKg",
                        sourceUrl: "https://chat.whatsapp.com/KfKHGQ4EKmV4sqRAhEmQKg",
                    },
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363368995781332@newsletter",
                        serverMessageId: -1,
                        newsletterName: `Nyx AI | Created With Lonely`,
                    }
                }
            });
        } catch (error) {
            console.error('Error in menu command:', error);
            return m.reply("❌ Terjadi kesalahan saat memproses menu.");
        }
    }
};