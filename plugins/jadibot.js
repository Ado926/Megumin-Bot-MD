import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, rmSync } from 'fs';
import path, { join } from 'path';
import ws from 'ws';

const jadi = 'MeguminJadiBot';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner }) => {
    const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
    const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command);
    const isCommand3 = /^(bots|listjadibots|subbots)$/i.test(command);

    async function reportError(e) {
        await m.reply(`❌️ Ocurrió un error.`);
        console.log(e);
    }

    switch (true) {
        case isCommand1:
            let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
            let uniqid = `${mentionedJid.split`@`[0]}`;
            const deletePath = `./${jadi}/${uniqid}`;

            if (!existsSync(deletePath)) {
                await _envio.sendMessage(m.chat, { text: `💥 Usted no tiene una sesión, puede crear una usando:\n${usedPrefix + command}\n\nSi tiene una *(ID)* puede usar para saltarse el paso anterior usando:\n*${usedPrefix + command}* \`\`\`(ID)\`\`\`` }, { quoted: m });
                return;
            }
            if (global.conn.user.jid !== _envio.user.jid) {
                return _envio.sendMessage(m.chat, { text: `💥 Use este comando al *Bot* principal.\n\n*https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0*` }, { quoted: m });
            } else {
                await _envio.sendMessage(m.chat, { text: `💫 Tu sesión como *Sub-Bot* se ha eliminado` }, { quoted: m });
            }
            try {
                rmSync(`./${jadi}/` + uniqid, { recursive: true, force: true });
                await _envio.sendMessage(m.chat, { text: `Ha cerrado sesión y borrado todo rastro.` }, { quoted: m });
            } catch (e) {
                reportError(e);
            }
            break;

        case isCommand2:
            if (global.conn.user.jid == _envio.user.jid) {
                _envio.reply(m.chat, `💥 Si no es *SubBot* comuníquese al numero principal del *Bot* para ser *SubBot*`, m);
            } else {
                await _envio.reply(m.chat, `💥 Megumin desactivada.`, m);
                _envio.ws.close();
            }
            break;

        case isCommand3:
            let totalSessions = 0;
            if (existsSync(jadi)) {
                const files = readdirSync(jadi);
                totalSessions = files.length;
            }
            const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED && m.chat.includes(conn.user.jid)).map((conn) => conn)])];

            const testuser2 = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED && m.chat.includes(conn.user.jid)).map((conn) => conn)])];

            const message = users.map((v, index) => `• 「 ${index + 1} 」\n✐ Usuario: ${v.user.name || 'Sub-Bot'}\n @${v.user.jid.replace(/[^0-9]/g, '')}`).join('\n\n__________________________\n\n');
            const replyMessage = message.length === 0 ? `` : message;
            const totalUsers = users.length || 0;
            const testuser = testuser2.length || 0;
            const responseMessage = `「✦」Lista de subbots activos en este grupo\n\n✐ Sesiones: ${totalSessions}\n✧ Sockets: ${testuser}\n❐ Sockets en el grupo: ${totalUsers}\n\n${replyMessage.trim()}`.trim();
            await _envio.sendMessage(m.chat, { text: responseMessage, mentions: _envio.parseMention(responseMessage) }, { quoted: m });
            break;
    }
};

handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarai', 'pausarbot', 'bots', 'listjadibots', 'subbots'];
export default handler;