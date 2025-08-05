const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}


module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'VAJIRA-MD=b05AALJD#lrHN7i7862QlXVNM9j3q5AR2iUBuOElZi1Tdaq-Uv9I' : process.env.SESSION_ID,
OWNER_NUMBER: process.env.OWNER_NUMBER === undefined ? '94743454928' : process.env.OWNER_NUMBER,
N_JID: process.env.N_JID=== undefined ? '‌': process.env.N_JID,    
PREFIX: process.env.PREFIX || '.' ,
POSTGRESQL_URL: process.env.POSTGRESQL_URL === undefined ? 'postgres://vajiratech_user:oSIFl2xmSojMZ0rkzdd0g0W6msuVTpNN@dpg-cpd7fjv109ks73e5gtig-a.frankfurt-postgres.render.com/vajiratech' : process.env.POSTGRESQL_URL,   
MAX_SIZE: 500,
LOGO: process.env.LOGO || 'https://i.ibb.co/G4brrcB5/25.jpg' ,    
FOOTER: process.env.FOOTER || 'DORA-MD' ,
STATUS_REPLY_MESSAGE: '𝐘𝐎𝐔𝐑 𝐒𝐓𝐀𝐓𝐔𝐒 𝐒𝐄𝐄𝐍 𝐉𝐔𝐒𝐓 𝐍𝐎𝐖 𝐁𝐘 𝐃𝐎𝐑𝐀 𝐌𝐃 ✅',    
ALIVE:  process.env.ALIVE  || '> DORA MD'  ,    
DELETEMSGSENDTO : process.env.DELETEMSGSENDTO === undefined ? '' : process.env.DELETEMSGSENDTO        
};
