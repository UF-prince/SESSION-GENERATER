const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const { upload } = require('./mega');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function GIFTED_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            var items = ["Safari"];
            function selectRandomItem(array) {
                var randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }
            var randomItem = selectRandomItem(items);

            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomItem)
            });

            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');

                // 🧩 Custom pairing code section
                const custom = "BILALMDX"; // must be 8 letters/numbers
                const code = await sock.requestPairingCode(num, custom);
                const formatted = code?.match(/.{1,4}/g)?.join('-') || code;
                console.log(`📱 Pairing Code: ${formatted}`);
                // ------------------------------

                if (!res.headersSent) {
                    await res.send({ code: formatted });
                }
            }

            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let rf = __dirname + `/temp/${id}/creds.json`;

                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }

                    const randomText = generateRandomText();
                    try {
                        const { upload } = require('./mega');
                        const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
                        const string_session = mega_url.replace('https://mega.nz/file/', '');
                        let md = "BILAL-MD~" + string_session;
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        let desc = `┏━━━━━━━━━━━━━━😘
┃👑┃ *BILAL-MD CONNECTED* 
┃👑┃ *SESSION-ID RECEIVED*
┗━━━━━━━━━━━━━━━😘
*________________________________*
*👑 BILAL-MD REPO 👑*
*github.com/BilalTech05/BILAL-MD*
*________________________________*
▬▬▬▬▬▬▬▬▬▬▬▬
*👑 BILAL-MD HELP 👑*
▬▬▬▬▬▬▬▬▬▬▬▬
*________________________________*
*👑 WHATSAPP CHANNEL 👑*
*https://whatsapp.com/channel/0029Vaj3Xnu17EmtDxTNnQ0G*
*________________________________*
*👑 WHATSAPP GROUP 👑*
*https://chat.whatsapp.com/BwWffeDwiqe6cjDDklYJ5m?mode=ems_copy_t*

*________________________________*
*👑 DEVELPER 👑*
*https://akaserein.github.io/Bilal/*
*________________________________*
*_PLEASE BILAL-MD REPO KO STAR LAZMI KARNA 🥰❤️_*
*________________________________*`; 
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "👑 BILAL-MD BOT 👑",
                                    thumbnailUrl: "https://files.catbox.moe/kunzpz.png",
                                    sourceUrl: "https://whatsapp.com/channel/0029Vaj3Xnu17EmtDxTNnQ0G",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }  
                            }
                        },
                        {quoted:code })
                    } catch (e) {
                        let ddd = sock.sendMessage(sock.user.id, { text: e });
                        let desc = `*Don't Share with anyone this code use for deploy NOVA-XMD*\n\n ◦ *Github:* https://github.com/kenyanpopkid/POPKID-XTR`;
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "POPKID-XTR",
                                    thumbnailUrl: "https://i.ibb.co/6cBHT8tC/popkid.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VbB6d0KKAwEdvcgqrH26",
                                    mediaType: 2,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }  
                            }
                        },
                        {quoted:ddd })
                    }
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
   return await GIFTED_MD_PAIR_CODE();
});
module.exports = router;
