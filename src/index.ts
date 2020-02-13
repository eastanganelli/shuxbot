//#region IMPORTS
//#region Plug
import * as Discord from "discord.js";
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import { config, firebaseConfig, db } from "./config";
//#endregion
//#region Class
/* import { DBshux } from "./dbshux"; */
import { MSGshux } from "./msg";
//#endregion
//#endregion


export const dsclient: Discord.Client = new Discord.Client();
let app: firebase.app.App = firebase.initializeApp(firebaseConfig);

dsclient.on("ready", () => { 
    console.log("Ready to go!!!");
    firebase.auth().signInWithEmailAndPassword(db.user, db.pass).then(() => { console.log('BOT DB Connected') }).catch(Err => { console.log(Err); });
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
        if(!(newMember.roles.has('674086387510673414'))) { newMember.addRole('674086387510673414'); }
    }
});

dsclient.login(config.token);