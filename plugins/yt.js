const config = require('../settings')
const {
    default: makeWASocket,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')
const l = console.log
const { cmd, commands } = require('../lib/command')
const dl = require('@bochilteam/scraper')  
const yts = require('yt-search');
const fg = require('api-dylux');
const ytdl = require('youtubedl-core');
const api = require("caliph-api")
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
var request = require("request")
var cheerio = require("cheerio")
let soundcloud = async (link) => {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'POST',
			url: "https://www.klickaud.co/download.php",
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			formData: {
				'value': link,
				'2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37': '710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3'
			}
		};
		request(options, async function(error, response, body) {

			if (error) throw new Error(error);
			const $ = cheerio.load(body)
			resolve({
				judul: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)').text(),
				download_count: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)').text(),
				thumb: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img').attr('src'),
				link: $('#dlMP3').attr('onclick').split(`downloadFile('`)[1].split(`',`)[0]
			});
		});
	})
}

let axios=require("axios");
async function ssearch (i){let e="https://m.soundcloud.com",t=await axios.get(`${e}/search?q=${encodeURIComponent(i)}`,{headers:{"User-Agent":'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}}),a=cheerio.load(t.data),d=[];return a("div > ul > li > div").each((function(i,t){let r=a(t).find("a").attr("aria-label"),v=e+a(t).find("a").attr("href"),s=a(t).find("a > div > div > div > picture > img").attr("src"),n=a(t).find("a > div > div > div").eq(1).text(),o=a(t).find("a > div > div > div > div > div").eq(0).text(),u=a(t).find("a > div > div > div > div > div").eq(1).text(),l=a(t).find("a > div > div > div > div > div").eq(2).text();d.push({title:r,url:v,thumb:s,artist:n,views:o,release:l,timestamp:u})})),{status:t.status,creator:"Caliph",result:d}}




function ytreg(url) {
    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
    return ytIdRegex.test(url);
}



// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B` : views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M` : views >= 1_000 ? `${(views / 1_000).toFixed(1)}K` : views.toString(); 


        







const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, getsize, jsonformat} = require('../lib/functions')
const dl2 = require('inrl-dl')
var descv =''
if(config.LANG === 'SI') descv = "Youtube වෙතින් videos බාගත කරයි."
else descv = "Download videos from Youtube."

var descs =''
if(config.LANG === 'SI') descs = "Youtube වෙතින් songs බාගත කරයි."
else descs = "Download songs from Youtube."

var descyt =''
if(config.LANG === 'SI') descyt = "Youtube වෙතින් video සහ songs බාගත කරයි."
else descyt = "Download videos and songs from Youtube."

var descsh =''
if(config.LANG === 'SI') descsh = "Youtube search බාගත කරයි."
else descsh = "Search and get details from youtube."

var N_FOUND =''
if(config.LANG === 'SI') N_FOUND = "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
else N_FOUND = "*I couldn't find anything :(*"

var urlneed =''
if(config.LANG === 'SI') urlneed = "*කරුණාකර Youtube url එකක් ලබා දෙන්න*"
else urlneed = "*Please give me youtube url..*"

var urlneed1 =''
if(config.LANG === 'SI') urlneed1 = "එය soundcloud වෙතින් songs බාගත කරයි."
else urlneed1 = "It downloads songs from soundcloud."

var imgmsg =''
if(config.LANG === 'SI') imgmsg = "```කරුණාකර වචන කිහිපයක් ලියන්න!```"
else imgmsg = "```Please write a few words!```"

var sizetoo =''
if(config.LANG === 'SI') sizetoo = "_This file size is too big_\n ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​  *මෙම file එක upload කිරීමට මෙම bot host වෙන platform එකේ bandwith එක ප්‍රමානවත් නැත !*"
else sizetoo =  "_This file size is too big_\n​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ *The bandwidth of the platform where this bot is hosted is not enough to upload this file!*"




 

cmd({ 
	pattern: "song2", 
	desc: "Download songs", 
	category: "download", 
	filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => { 
	    try { 
		    if (!q) { 
	    await conn.sendPresenceUpdate('recording', from); 
			    await conn.sendMessage(from, { audio: { url: 'https://github.com/themiyadilann/DilaMD-Media/raw/main/voice/song.mp3' }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek }); return; } 
		    const search = await yts(q); 
		    const data = search.videos[0]; 
		    const url = data.url; 
		    let desc = `> VAJIRA MD YTDL\n\n🎶 *𝗧𝗶𝘁𝗹𝗲*: _${data.title}_\n👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _${data.author.name}_\n📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _${data.description}_\n⏳ *𝗧𝗶𝗺𝗲*: _${data.timestamp}_\n⏱️ *𝗔𝗴𝗼*: _${data.ago}_\n👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _${formatViews(data.views)}_\n🔗 *𝗟𝗶𝗻𝗸*: ${url}`; 
		    await conn.sendPresenceUpdate('typing', from); 
		    await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek }); 
		    let down = await fg.yta(url); 
		    let downloadUrl = down.dl_url; 
		    await conn.sendPresenceUpdate('recording', from); 
		    await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek }); 
		    await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "💻 *VAJIRA MD YTDL*" }, { quoted: mek }); 
	    } catch (e) { 
		    console.log(e); 
		    reply(`Error: ${e.message}`); 
	    } }); 

cmd({ 
     pattern: "video2", 
     desc: "Download videos", 
     category: "download", 
     filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => { 
	    try { 
		    if (!q) { 
			    await conn.sendPresenceUpdate('recording', from); 
			    await conn.sendMessage(from, { audio: { url: 'https://github.com/themiyadilann/DilaMD-Media/raw/main/voice/video.mp3' }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek }); 
			    return; 
		    } 
		    const search = await yts(q); 
		    const data = search.videos[0]; 
		    const url = data.url; 
		    let desc = `VAJIRA MD YTDL\n\n🎶 *𝗧𝗶𝘁𝗹𝗲*: _${data.title}_\n👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _${data.author.name}_\n📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _${data.description}_\n⏳ *𝗧𝗶𝗺𝗲*: _${data.timestamp}_\n⏱️ *𝗔𝗴𝗼*: _${data.ago}_\n👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _${formatViews(data.views)}_\n🔗 *𝗟𝗶𝗻𝗸*: ${url}`; 
		    await conn.sendPresenceUpdate('typing', from); 
		    await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek }); 
		    let down = await fg.ytv(url); 
		    let downloadUrl = down.dl_url; 
		    await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek }); 
		    await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "💻 *VAJIRA MD YTDL*" }, { quoted: mek }); 
	    } catch (e) { 
		    console.log(e); 
		    reply(`Error: ${e.message}`); 
	    } 
    });



cmd({
    pattern: "play",
    react: "📱",
    desc: urlneed1,
    category: "download",
    use: '.soundcloud lelena',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await conn.sendMessage(from , { text: imgmsg }, { quoted: mek } )        
const data2 = await ssearch(q)
const data = data2.result
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
  if(data[i].thumb && !data[i].views.includes('Follow')){
srh.push({
title: i + 1,
description: data[i].title + ' | ' + data[i].artist + ' | ' + data[i].views + ' | '+ data[i].release + ' | '+ data[i].timestamp,
/**
	description: data[i].artist + ' | ' + data[i].views + ' | '+ data[i].release + ' | '+ data[i].timestamp,
	**/
rowId: prefix + 'selectaud3 ' + data[i].url
});
  }
}
const sections = [{
title: "_[Result from m.soundcloud.com]_",
rows: srh
}]
const listMessage = {
text: `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *SOUNDCLOUD DOWNLOADER*

*📱 Entered Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from m.soundcloud.com 📲',
buttonText: '*🔢 Reply below number*',
sections
}
await conn.replyList(from, listMessage ,{ quoted : mek }) 
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
  alias: ["selectaud3"],
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(from.endsWith("@g.us")){

let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

  *SELECT VIDEO QUALITY*`
const sections = [
    {
	title: "",
	rows: [
  {title: "1", rowId: prefix + 'soundaud ' + q , description: 'Normal type song 🎶'}, 
  {title: "2", rowId: prefix + 'sounddoc ' + q , description: 'Document type song 📁'},
]
    } 
]
  const listMessage = {
 text : dat ,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })



}else{

//──────────────────────Button───────────────────────



const cap = `📽️ *ᴠᴀᴊɪʀᴀ-ᴍᴅ ᴠɪᴅᴇᴏ-ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*📽️`


	
let msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: `` },
              carouselMessage: {
                cards: [
                  {
                    
                    header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: config.LOGO } }, { upload: conn.waUploadToServer })),
          title: ``,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: cap },
                    nativeFlowMessage: {
                      



          buttons : [
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "Audio 🎧",
                        id: `${prefix}soundaud ${q}`
                    }),
                },
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "Document 📁",
                        id: `${prefix}sounddoc ${q}`
                    }),
                }
                ]


			    
                    },
                  },                                    
                ],
                            messageVersion: 1,
                        },
                         contextInfo: {
                         mentionedJid: [m.sender],
                         forwardingScore: 999,
                         isForwarded: true,
                         forwardedNewsletterMessageInfo: {
                         newsletterJid: '120363290448968237@newsletter',
                         newsletterName: `⛅ 𝘝𝘈𝘑𝘐𝘙𝘈 𝑴𝑫 💙`,
                         serverMessageId: 143
                            }
                        }
                    }
                }
            },
        },
        { quoted: m })
        
            await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });
}
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})






	



cmd({
    pattern: "sounddoc",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need link...*' }, { quoted: mek } ) 
const data = await soundcloud(q)
let listdata = `*📚 Name :* ${data.judul}
*📺 Down Count :* ${data.download_count}`
await conn.sendMessage(from, { image: { url: data.thumb }, caption: listdata }, { quoted: mek })
let sendapk = await conn.sendMessage(from , { document : { url : data.link  } ,mimetype: 'audio/mpeg', fileName : data.judul + '.' + 'mp3'} , { quoted: mek })
await conn.sendMessage(from, { react: { text: '📁', key: sendapk.key }})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply('*ERROR !!*')
  l(e)
}
})

cmd({
  pattern: "soundaud",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need link...*' }, { quoted: mek } ) 
const data = await soundcloud(q)
let listdata = `*📚 Name :* ${data.judul}
*📺 Down Count :* ${data.download_count}`
await conn.sendMessage(from, { image: { url: data.thumb }, caption: listdata }, { quoted: mek })
let sendapk = await conn.sendMessage(from , { audio : { url : data.link  } ,mimetype: 'audio/mpeg', fileName : data.judul + '.' + 'mp3'} , { quoted: mek })
await conn.sendMessage(from, { react: { text: '📁', key: sendapk.key }})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})




cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts lelena',
    react: "🔎",
    desc: descsh,
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
try {
let yts = require("yt-search")
var arama = await yts(q);
} catch(e) {
    l(e)
return await conn.sendMessage(from , { text: '*Error !!*' }, { quoted: mek } )
}
var mesaj = '';
arama.all.map((video) => {
mesaj += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
});
await conn.sendMessage(from , { text:  mesaj }, { quoted: mek } )
} catch (e) {
    l(e)
  reply('*Error !!*')
}
})

cmd({
    pattern: "yt",
    use: '.yt [song name or link]',
    react: "🎬",
    desc: descyt,
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;	
if(isUrl(q) && q.includes('/shorts')){let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *SELECT SONG TYPE*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytmp3 ${q}|${data.title}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytdocs ${q}|${data.title}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  text: dat,
  footer: `*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections
}

return await conn.replyList(from, listMessage ,{ quoted : mek }) 				      
				     }
if(ytreg(q)){let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

*SELECT SONG TYPE*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytmp3 ${q}|${data.title}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytdocs ${q}|${data.title}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  text: dat,
  footer: `*ᴠᴀᴊɪʀᴀ-ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections }	

	     
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
	    }
        
const cap = `📽️ *ᴠᴀᴊɪʀᴀ-ᴍᴅ ꜱᴏɴʜ-ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*📽️

┌──────────────────

*ℹ️ Title:* ${data.title}
*👁️‍🗨️ Views:* ${data.views}
*🕘 Duration:* ${data.timestamp}
*📌 Ago :* ${data.ago}
*🔗 Url:* ${data.url} 

└──────────────────`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytmp3 ${data.url}|${data.title}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytdocs ${data.url}|${data.title}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  image: {url: data.thumbnail},
  caption: cap,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })



	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "video",
    alias: ["ytvideo"],
    use: '.video lelena',
    react: "📽️",
    desc: descv,
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]	
if(isUrl(q) && q.includes('/shorts')){let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *SELECT VIDEO TYPE*`
const sections = [
    {
	title: '*[1] NORMAL QUALITY 🎶*',
	rows: [
	    {title: "    1.1", rowId: prefix + `240p ${q}` , description: '```240p```'} ,
            {title: "    1.2", rowId: prefix + `360p ${q}` , description: '```320p```'},
	    {title: "    1.3", rowId: prefix + `480p ${q}` , description: '```480p```'} ,
	    {title: "    1.4", rowId: prefix + `720p ${q}` , description: '```720p```'},
	    {title: "    1.5", rowId: prefix + `1080p ${q}` , description: '```1080p```'} ,
	]
    } ,

   {
	title: '*[2] DOCUMENT QUALITY 📂*',
	rows: [
	    {title: "    2.1", rowId: prefix + `24p ${q}` , description: '```240p```'} ,
            {title: "    2.2", rowId: prefix + `36p ${q}` , description: '```320p```'},
	    {title: "    2.3", rowId: prefix + `48p ${q}` , description: '```480p```'} ,
	    {title: "    2.4", rowId: prefix + `72p ${q}` , description: '```720p```'},
	    {title: "    2.5", rowId: prefix + `108p ${q}` , description: '```1080p```'} ,
	]
    } 	
]
const listMessage = {
caption: dat,
image : { url: config.LOGO },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}

return await conn.replyList(from, listMessage ,{ quoted : mek }) 				      
				     }
if(ytreg(q)){let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]
*SELECT VIDEO TYPE*`
const sections = [
    {
	title: '*[1] NORMAL QUALITY 🎶*',
	rows: [
	    {title: "    1.1", rowId: prefix + `240p ${q}` , description: '```240p```'} ,
            {title: "    1.2", rowId: prefix + `360p ${q}` , description: '```320p```'},
	    {title: "    1.3", rowId: prefix + `480p ${q}` , description: '```480p```'} ,
	    {title: "    1.4", rowId: prefix + `720p ${q}` , description: '```720p```'},
	    {title: "    1.5", rowId: prefix + `1080p ${q}` , description: '```1080p```'} ,
	]
    } ,

   {
	title: '*[2] DOCUMENT QUALITY 📂*',
	rows: [
	    {title: "    2.1", rowId: prefix + `24p ${q}` , description: '```240p```'} ,
            {title: "    2.2", rowId: prefix + `36p ${q}` , description: '```320p```'},
	    {title: "    2.3", rowId: prefix + `48p ${q}` , description: '```480p```'} ,
	    {title: "    2.4", rowId: prefix + `72p ${q}` , description: '```720p```'},
	    {title: "    2.5", rowId: prefix + `108p ${q}` , description: '```1080p```'} ,
	]
    } 	
]
const listMessage = {
  text: dat,
  footer: config.FOOTER,
  buttonText: "🔢 Reply below number,",
  sections 
}	

	     
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
	}

       
const cap = `📽️ *ᴠᴀᴊɪʀᴀ-ᴍᴅ ᴠɪᴅᴇᴏ-ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*📽️
┌──────────────────

*ℹ️ Title:* ${anu.title}
*👁️‍🗨️ Views:* ${anu.views}
*🕘 Duration:* ${anu.timestamp}
*🔗 Url:* ${anu.url
	 } 

└──────────────────`

const sections = [
    {
	title: '*[1] NORMAL QUALITY 🎶*',
	rows: [
	    {title: "    1.1", rowId: prefix + `240p ${anu.url}` , description: '```240p```'} ,
            {title: "    1.2", rowId: prefix + `360p ${anu.url}` , description: '```320p```'},
	    {title: "    1.3", rowId: prefix + `480p ${anu.url}` , description: '```480p```'} ,
	    {title: "    1.4", rowId: prefix + `720p ${anu.url}` , description: '```720p```'},
	    {title: "    1.5", rowId: prefix + `1080p ${anu.url}` , description: '```1080p```'} ,
	]
    } ,

   {
	title: '*[2] DOCUMENT QUALITY 📂*',
	rows: [
	    {title: "    2.1", rowId: prefix + `24p ${anu.url}` , description: '```240p```'} ,
            {title: "    2.2", rowId: prefix + `36p ${anu.url}` , description: '```320p```'},
	    {title: "    2.3", rowId: prefix + `48p ${anu.url}` , description: '```480p```'} ,
	    {title: "    2.4", rowId: prefix + `72p ${anu.url}` , description: '```720p```'},
	    {title: "    2.5", rowId: prefix + `108p ${anu.url}` , description: '```1080p```'} ,
	]
    } 	
]
const listMessage = {
  image: {url: anu.thumbnail},
  caption: cap,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} catch (e) {
reply('*Error !!*')
l(e)
}
})



//---------------------------------------------------------------------------


		    
cmd({
    pattern: "song",
    alias: ["ytsong"],
    use: '.song lelena',
    react: "🎧",
    desc: descs,
    category: "download",
    filename: __filename
},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;	
if(isUrl(q) && q.includes('/shorts')){let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *SELECT SONG TYPE*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytmp3 ${q}|${data.title}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytdocs ${q}|${data.title}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  text: dat,
  footer: `*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections
}

return await conn.replyList(from, listMessage ,{ quoted : mek }) 				      
				     }
if(ytreg(q)){let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

*SELECT SONG TYPE*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytmp3 ${q}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytdocs ${q}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  text: dat,
  footer: `*ᴠᴀᴊɪʀᴀ-ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections }	

	     
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
	    }
        
const cap = `📽️ *ᴠᴀᴊɪʀᴀ-ᴍᴅ ꜱᴏɴɢ-ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*📽️

┌──────────────────

*ℹ️ Title:* ${data.title}
*👁️‍🗨️ Views:* ${data.views}
*🕘 Duration:* ${data.timestamp}
*📌 Ago :* ${data.ago}
*🔗 Url:* ${data.url} 

└──────────────────`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytmp3 ${data.url}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytdocs ${data.url}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  image: {url: data.thumbnail},
  caption: cap,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
  alias: ["selectaud"],
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

  *SELECT VIDEO QUALITY*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytmp3 ${q}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytdocs ${q}` , description: 'Document type song 📂'},

	]
    } 
]
  const listMessage = {
text: dat,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
  alias: ["selectvid"],
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

  *SELECT VIDEO QUALITY*`
const sections = [
    {
	title: '*[1] NORMAL QUALITY 🎶*',
	rows: [
	    {title: "    1.1", rowId: prefix + `240p ${q}` , description: '```240p```'} ,
            {title: "    1.2", rowId: prefix + `360p ${q}` , description: '```320p```'},
	    {title: "    1.3", rowId: prefix + `480p ${q}` , description: '```480p```'} ,
	    {title: "    1.4", rowId: prefix + `720p ${q}` , description: '```720p```'},
	    {title: "    1.5", rowId: prefix + `1080p ${q}` , description: '```1080p```'} ,
	]
    } ,

   {
	title: '*[2] DOCUMENT QUALITY 📂*',
	rows: [
	    {title: "    2.1", rowId: prefix + `24p ${q}` , description: '```240p```'} ,
            {title: "    2.2", rowId: prefix + `36p ${q}` , description: '```320p```'},
	    {title: "    2.3", rowId: prefix + `48p ${q}` , description: '```480p```'} ,
	    {title: "    2.4", rowId: prefix + `72p ${q}` , description: '```720p```'},
	    {title: "    2.5", rowId: prefix + `108p ${q}` , description: '```1080p```'} ,
	]
    } 	
]
  const listMessage = {
text: dat,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
reply('*Error !!*')
l(e)
}
})






//===================================================================================================
/*
  
cmd({
  pattern: "ytmp3",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
        try {
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need link...*' }, { quoted: mek } ) 
let dl = await fg.yta(q)
let sendapk = await conn.sendMessage(from , { audio : { url : dl.dl_url  } ,mimetype: 'audio/mpeg', fileName : dl.title + '.' + 'mp3'} , { quoted: mek })
await conn.sendMessage(from, { react: { text: '📁', key: sendapk.key }})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})*/
//---------------------------------------------------------------------------

cmd({
  pattern: "ytmp4",
  use: '.ytmp4 <yt url>',
  react: "🎧",
  desc: "Download yt song.",
  category: "download",
  filename: __filename
},

async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("Harap masukkan link YouTube.");
    const body = m.body
	const args = body.trim().split(/ +/).slice(1);
    const vidIdMatch = args[0].match(/(?:youtu\.be\/|youtube\.com\/(?:.*[?&]v=|embed\/|shorts\/|v\/))([\w-]{11})/);
					const vidId = vidIdMatch ? vidIdMatch[1] : null;
					if (!vidId) {
						return reply(`Gagal mengekstrak ID video dari link! 😓`);
					}
					let search = await yts({ videoId: vidId, hl: 'id', gl: 'ID' });
					if (!search) return reply(`*Video tidak ditemukan!* ☹️`);
					let { title, url, image } = search;
					let caption = `「 *YOUTUBE VIDEO* 」\n\n`;
					caption += `💬 Title : ${title}\n`;
					caption += `🔗 URL Video : ${url}`;
					await conn.sendMessage(from, {
						image: { url: image }, 
						caption: caption
					}, { quoted: m });
					let videoData = await saveTube.dl(url, args[1], 'video');
					if (!videoData || !videoData.link) {
						return reply(`*Video tidak ditemukan, silahkan ketik ulang command atau coba lagi nanti ya kak! 🙏*`);
					}		
					await conn.sendMessage(from, { 
						video: { url: videoData.link }, 
						mimetype: 'video/mp4',
						caption: '✅ *Video berhasil diunduh!*'
					}, { quoted: m });		
				
				//db.data.users[m.sender].limit -= 1;
      await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });
    
  } catch (e) {
    console.log(e);
    reply(`Error: ${e.message}`);
  }
});
//---------------------------------------------------------------------------
cmd({
  pattern: "ytmp3",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
        try {
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need link...*' }, { quoted: mek } ) 

    const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp3', '128kbps');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        audio: { url: downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${video.title}.mp3`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });		
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})
cmd({
  pattern: "ytdocs",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
        try {
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need link...*' }, { quoted: mek } )
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp3', '128kbps');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${video.title}.mp3`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})


//---------------------------------------------------------------------------

cmd({
  pattern: "ytdocv",
  use: '.ytdoc <yt url>',
  react: "🎧",
  desc: "Download yt song.",
  category: "download",
  filename: __filename
},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const pm = q.split(" & ")[0];
        const rr = q.split(" & ")[1];
        //if (!pm) return reply(msr.url);
        if (!pm.includes('https://youtube.com/watch?v=')) return await reply();

   // const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data


//const jsonResponse = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/ytmp4?url=${q}`);
//const downloadUrl = jsonResponse.result[rr].dl_link;
let data = await ytmp4(`${pm.trim()}`,`${rr.trim()}`)
let downloadUrl = data
const search = await yts(q);
const data3 = search.videos[0];

        // Reacting with upload icon
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }});

await conn.sendMessage(from, { document: { url:downloadUrl }, mimetype: "video/mp4",fileName:  data3.title + ".mp4", caption: `${config.FOOTER}`}, {quoted:mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})
//---------------------------------------------------------------------------

cmd({
    pattern: "240p",
    react: "🎥",
    dontAddCommandList: true,
    filename: __filename
},


async (conn, m, mek, { from, q, reply }) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp4', '240p');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        video: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });	

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});

//---------------------------------------------------------------------------
cmd({
  pattern: "360p",
  react: "📽️",
  dontAddCommandList: true,
    filename: __filename
},

async (conn, m, mek, { from, q, reply }) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp4', '360p');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        video: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });		
    
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});

//---------------------------------------------------------------------------

cmd({
  pattern: "480p",
  react: "📽️",
  dontAddCommandList: true,
    filename: __filename

},

async (conn, m, mek, { from, q, reply }) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp4', '480p');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        video: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });		
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});

//---------------------------------------------------------------------------

cmd({
    pattern: "720p",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename

},

async (conn, m, mek, { from, q, reply }) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp4', '720p');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        video: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });		

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});

//---------------------------------------------------------------------------

cmd({
  pattern: "1080p",
  react: "📽️",
  dontAddCommandList: true,
    filename: __filename

},

async (conn, m, mek, { from, q, reply }) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp4', '1080P');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        video: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });		
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});


cmd({
    pattern: "24p",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename

},

async (conn, m, mek, { from, q, reply }) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp4', '240p');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });		

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});
	
cmd({
    pattern: "36p",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename

},

async (conn, m, mek, { from, q, reply }) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp4', '360p');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });		

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});




cmd({
    pattern: "48p",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},

async (conn, m, mek, { from, q, reply }) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp4', '480p');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });		

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});

				      

cmd({
    pattern: "72p",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename

},

async (conn, m, mek, { from, q, reply }) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp4', '720p');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });		

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});


cmd({
    pattern: "108p",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename

},

async (conn, m, mek, { from, q, reply }) => {
try{
if (!ytreg(q)) return await  reply(urlneed)
const query = q;

    const fetchDownloadUrl = async (videoUrl) => {
      try {
        return await y2save.main(videoUrl, 'mp4', '1080P');
      } catch (error) {
        console.error('Error with y2save:', error.message);
        throw error;
      }
    };

    
      const search = await yts(query);
      if (!search || search.all.length === 0) return reply('*The song you are looking for was not found.*');

      const video = search.all[0];
      const downloadUrl = await fetchDownloadUrl(video.url);
      console.log('Final download URL:', downloadUrl);

      await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${video.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴠᴀᴊɪʀᴀ-ᴍᴅ',
            body: `${video.title}`,
            thumbnailUrl: `${video.thumbnail}`,
            sourceUrl: `${video.url}`,
            mediaType: 2,
            mediaUrl: `${video.thumbnail}`
          }
        }
      }, { quoted: m });		

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});




