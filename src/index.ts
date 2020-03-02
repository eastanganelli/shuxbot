//#region IMPORTS
//#region Plug
import * as Discord from "discord.js";
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import { config, firebaseConfig, serverID } from "./config";
//#endregion
//#region Class
/* import { DBshux } from "./dbshux"; */
import { MSGshux } from "./msg";
import { IniBOT } from "./ini";
//#endregion
//#endregion

export const dsclient: Discord.Client = new Discord.Client();
let app: firebase.app.App = firebase.initializeApp(firebaseConfig);

dsclient.on("ready", () => { 
    new IniBOT(dsclient);
});
dsclient.on("guildMemberAdd", member => { 
    member.addRole('674086387510673414');
});
dsclient.on('guildMemberRemove', member => {
    
});
dsclient.on("message", msg => {
    let msg_ = new MSGshux(dsclient);
    msg_.getMSG(msg);
});
dsclient.on('messageReactionAdd', async (reaction, user) => {  });
dsclient.on('messageReactionRemove', async (reaction, user) => {  });
dsclient.on('voiceStateUpdate', (oldMember, newMember) => { });
dsclient.on("presenceUpdate", (oldMember, newMember) => {
    if(oldMember.presence.status !== newMember.presence.status) {
        //console.log(newMember.user.username + ' is now ' + newMember.presence.status); 
        //if(!(newMember.roles.has('674086387510673414'))) { newMember.addRole('674086387510673414'); }
    }
});

dsclient.login(config.token);

/*  {
    id: '637746217492807680',
    level: 6,
    username: 'xLukaaL2',
    discriminator: '4754',
    avatarUrl: 'https://cdn.discordapp.com/avatars/637746217492807680/d613038af4971c886e5fdd85f37e7df1?size=2048',
    tag: 'xLukaaL2#4754',
    xp: { userXp: 157, levelXp: 580, totalXp: 1782 },
    rank: 89
  } */