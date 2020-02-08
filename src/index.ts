//#region IMPORTS
//#region Plug
import * as Discord from "discord.js";
import * as firebase from "firebase/app";
import "firebase/database";
import { config, firebaseConfig, db } from "./config";
//#endregion
//#region Class
import { DBshux } from "./dbshux";
import { MSGshux } from "./msg";
//#endregion
//#endregion

export const client: Discord.Client = new Discord.Client();
let app: firebase.app.App = firebase.initializeApp(firebaseConfig);
const iniDB = new DBshux();

client.on("ready", () => { 
    console.log("Ready to go!!!");
    firebase.auth().signInWithEmailAndPassword(db.user, db.pass).then(() => { console.log('BOT DB Connected') }).catch(Err => { console.log(Err); });
    const server_: any = client.guilds.get('392414185633611776');
    server_.channels.get('675061892863098890').send('SHUX ESTA PRENDIDO');
    
});
client.on("guildMemberAdd", member => { member.addRole('674086387510673414'); });
client.on("message", async msg => {
    let msg_ = new MSGshux(client, iniDB);
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
    } 
});

client.login(config.token);