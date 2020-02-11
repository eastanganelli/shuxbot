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

export const client: Discord.Client = new Discord.Client();
let app: firebase.app.App = firebase.initializeApp(firebaseConfig);

client.on("ready", () => { 
    console.log("Ready to go!!!");
    firebase.auth().signInWithEmailAndPassword(db.user, db.pass).then(() => { console.log('BOT DB Connected') }).catch(Err => { console.log(Err); });
});
client.on("guildMemberAdd", member => { 
    member.addRole('674086387510673414');
});
client.on("message", async msg => {
    let msg_ = new MSGshux(client/* , iniDB */);
    msg_.getMSG(msg);
});
client.on('messageReactionAdd', async (reaction, user) => {
});
client.on('messageReactionRemove', async (reaction, user) => {
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
});
client.on("presenceUpdate", (oldMember, newMember) => {
    if(oldMember.presence.status !== newMember.presence.status) {
        console.log(newMember.user.username + ' is now ' + newMember.presence.status); 
        if(!(newMember.roles.has('674086387510673414'))) { newMember.addRole('674086387510673414'); }
    } 
});
 
client.login(config.token);
