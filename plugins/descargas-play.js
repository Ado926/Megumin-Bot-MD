import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `💣 Ingresa el nombre de la música a descargar.`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);
    const infoMessage = `*𖹭.╭╭ִ╼࣪━ִﮩ٨ـﮩ♡̫𝗆𝖾𝗀֟፝𝗎꯭𝗆𝗂꯭𝗇♡ִ̫ﮩ٨ـﮩ━ִ╾࣪╮╮.𖹭*\n> ♡ *Título:* ${title}\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ♡ *Duración:* ${timestamp}\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ♡ *Vistas:* ${vistas}\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ♡ *Canal:* ${videoInfo.author.name || 'Desconocido'}\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ♡ *Publicado:* ${ago}\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ♡ *Enlace:* ${url}\n*⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︢︣ۛ۫۫۫۫۫۫ۜ⏝ּׅ︢︣ۛ۫۫۫۫۫۫ۜ⏝ּׅ︢︣ۛ۫۫۫۫۫۫ۜ⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︢︣ׄۛ۫۫۫۫۫۫ۜ*`;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: packname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    if (command === 'play') {
      try {
        const apiUrl = `https://api.siputzx.my.id/api/d/ytmp3?url=${url}`;
        const res = await fetch(apiUrl);
        const { data } = await res.json();

        await conn.sendMessage(m.chat, {
          audio: { url: data.dl },
          mimetype: 'audio/mp4',
          fileName: `${title}.mp3`
        }, { quoted: m || null });
      } catch (e1) {
        try {    
          const apiUrl = `https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${url}`;
          const res = await fetch(apiUrl);
          const { result } = await res.json();

          await conn.sendMessage(m.chat, {
            audio: { url: result.download.url },
            fileName: `${title}.mp3`
          }, { quoted: m });
        } catch (e2) {
          return m.reply(`🪛 *Error de descarga:* ${e2.message}`);
        }
      }
    } else if (command === 'play2' || command === 'ytmp4') {
      try {
        const apiUrl = `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`;
        const res = await fetch(apiUrl);
        const { data } = await res.json();

        await conn.sendMessage(m.chat, {
          video: { url: data.dl },
          fileName: `${title}.mp4`,
          mimetype: 'video/mp4',
          caption: `${title}`,
          thumbnail: thumb
        }, { quoted: m || null });
      } catch (e1) {
        try {    
          const apiUrl = `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`;
          const res = await fetch(apiUrl);
          const { result } = await res.json();

          await conn.sendMessage(m.chat, {
            video: { url: result.download.url },
            fileName: `${title}.mp4`,
            caption: `${title}`
          }, { quoted: m });
        } catch (e2) {
          try {    
            const apiUrl = `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`;
            const res = await fetch(apiUrl);
            const { downloads } = await res.json();

            await conn.sendMessage(m.chat, {
              video: { url: downloads.url },
              fileName: `${title}.mp4`,
              caption: `${title}`
            }, { quoted: m });
          } catch (e3) {
            try {                
              const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`;
              const res = await fetch(apiUrl);
              const { data } = await res.json();

              await conn.sendMessage(m.chat, {
                video: { url: data.download.url },
                fileName: `${title}.mp4`,
                caption: `${title}`
              }, { quoted: m });
            } catch (e4) {
              try {
                await conn.sendMessage(m.chat, {
                  video: { url: data.download.url },
                  fileName: `${title}.mp4`,
                  mimetype: 'video/mp4',
                  caption: `${title}`
                }, { quoted: m });
              } catch (e5) {
                return m.reply(`🪛 *Error final:* ${e5.message}`);
              }
            }
          }
        }
      }
    } else {
      throw "Comando no reconocido.";
    }
  } catch (error) {
    return m.reply(`🪛 *Error:* ${error.message}`);
  }
};

handler.command = handler.help = ['play', 'ytmp4', 'play2'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  } else {
    return views.toString();
  }
}