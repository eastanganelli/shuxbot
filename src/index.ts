//#region IMPORTS
//#region Plug
import * as Discord from "discord.js";
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import { config, firebaseConfig } from "./config";
//#endregion
//#region Class
/* import { DBshux } from "./dbshux"; */
import { MSGshux } from "./msg";
import { IniBOT, intervals } from "./ini";
import { User } from "./user";
import { Juegos } from "./juegos";
import { Reacciones } from "./reaction";
//#endregion
//#endregion

export const dsclient: Discord.Client = new Discord.Client();
let app: firebase.app.App = firebase.initializeApp(firebaseConfig);

dsclient.on("ready", () => { 
    (new IniBOT(dsclient)).iniLoading();
    intervals(dsclient);
    const iniReac = new Reacciones(dsclient);
    iniReac.catchingReac();
});
dsclient.on("guildMemberAdd", member => { 
    member.addRole('674086387510673414').then(() => { (new User(dsclient)).setPerfil(member.id); });
});
dsclient.on('guildMemberRemove', member => {
    
});
dsclient.on("message", msg => {
    (new MSGshux(dsclient)).getMSG(msg);
});
dsclient.on('messageReactionAdd', (reaction, user) => {
        
});
dsclient.on('messageReactionRemove', async (reaction, user) => {

});
dsclient.on('voiceStateUpdate', (oldMember, newMember) => { 
    (new Juegos(dsclient)).autoDelteChannel();
});
dsclient.on("presenceUpdate", (oldMember, newMember) => {
    if(oldMember.presence.status !== newMember.presence.status) {
        //console.log(newMember.user.username + ' is now ' + newMember.presence.status); 
        //if(!(newMember.roles.has('674086387510673414'))) { newMember.addRole('674086387510673414'); }
    }
});

dsclient.login(config.token);