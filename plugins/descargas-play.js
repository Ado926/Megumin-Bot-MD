import fetch from 'node-fetch';
import yts from 'yt-search';
import axios from 'axios';

const MAX_SIZE_MB = 100;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = globalThis.db.data.users[m.sender];

  if (user.cookies < 2) {
    return conn.reply(m.chat, `💔 No tienes suficientes 🍪 Cookies. Necesitas 2 más para usar este comando.`, m);
  }

  if (!text.trim()) {
    return conn.reply(m.chat, `✧ Ingresa el nombre de la música o video a descargar.`, m);
  }

  try {
    const search = await yts(text);
    if (!search.all.length) return m.reply('No se encontraron resultados.');

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const infoMessage = `
*𖹭.╭╭ִ╼࣪━ִﮩ٨ـﮩ♡̫𝗆𝖾𝗀֟፝𝗎꯭𝗆𝗂꯭𝗇♡ִ̫ﮩ٨ـﮩ━ִ╾࣪╮╮.𖹭*
> ♡ Título:* ${title}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ♡ Duración:* ${timestamp || 'Desconocido'}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ♡ Vistas:* ${formatViews(views)}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ♡ Canal:* ${author.name || 'Desconocido'}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ♡ Publicado:* ${ago || 'Desconocido'}
*⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︢︣ۛ۫۫۫۫۫۫ۜ⏝ּׅ︢︣ۛ۫۫۫۫۫۫ۜ⏝ּׅ︢︣ۛ۫۫۫۫۫۫ۜ⏝ּׅ︢︣ۛ۫۫۫۫۫۫ۜ⏝ּׅ︢︣ׄۛ۫۫۫۫۫۫ۜ*`;

    const thumb = (await conn.getFile(thumbnail)).data;
    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
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

    let api, result, fileSizeMB;
    const type = command.includes('mp4') ? 'video' : 'audio';

    api = await fetchWithFallback(url, type);
    result = api.download || api.data.url;

    fileSizeMB = await getFileSize(result);
    const isLargeFile = fileSizeMB > MAX_SIZE_MB;

    if (type === 'audio') {
      await conn.sendMessage(m.chat, {
        [isLargeFile ? 'document' : 'audio']: { url: result },
        fileName: `${api.title || api.data.filename}.mp3`,
        mimetype: 'audio/mpeg',
      }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, {
        [isLargeFile ? 'document' : 'video']: { url: result },
        fileName: `${api.title || api.data.filename}.mp4`,
        mimetype: 'video/mp4',
        caption: isLargeFile ? '' : `🎬 *Título:* ${title}\n🔗 *URL:* ${url}`,
        thumbnail: api.thumbnail || thumb,
      }, { quoted: m });
    }

    user.cookies -= 2;
    conn.reply(m.chat, `💥 Has utilizado 2 🍪 Cookies`, m);
  } catch (error) {
    console.error(error);
    return m.reply(`⚠️ Ocurrió un error: ${error.message}`);
  }
};

const fetchWithFallback = async (url, type) => {
  const apis = {
    neoxr: `https://api.neoxr.eu/api/youtube?url=${url}&type=${type}&quality=${type === 'audio' ? '128kbps' : '720p'}&apikey=GataDios`,
    delirius: `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`,
  };

  for (let key of Object.keys(apis)) {
    try {
      const response = await fetchWithTimeout(apis[key], 10000);
      const json = await response.json();
      if (json.download || json.result?.download_url) return json;
    } catch (error) {
      console.warn(`⚠️ ${key} falló, intentando con la siguiente...`);
    }
  }
  throw new Error("⚠️ Todas las APIs fallaron. Intenta más tarde.");
};

const fetchWithTimeout = (url, timeout) => {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error("⏳ Tiempo de espera agotado")), timeout))
  ]);
};

const getFileSize = async (url) => {
  try {
    const response = await axios.head(url);
    return parseFloat((response.headers['content-length'] || 0) / (1024 * 1024)).toFixed(2);
  } catch (error) {
    console.error("Error obteniendo el tamaño del archivo:", error);
    return 0;
  }
};

handler.command = ['play', 'mp3', 'play2', 'mp4'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  return views.toString();
}