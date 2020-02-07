//#region IMPORTS
//#region Plug
import * as Discord from "discord.js";
import { config } from "./config";
//#endregion
//#region Class
import { DBshux } from "./dbshux";
import { MSGshux } from "./msg";
//#endregion
//#endregion

export const client: Discord.Client = new Discord.Client();
const iniDB = new DBshux();

client.on("ready", () => { 
    console.log("Ready to go!!!");
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
    let newUserChannel = newMember.voiceChannel, oldUserChannel = oldMember.voiceChannel;
    if(oldUserChannel === undefined && newUserChannel !== undefined && !(newMember.user.bot) && (oldMember.voiceChannelID != '496525236888535042' && newMember.voiceChannelID != '496525236888535042')) {  } 
    else if(newUserChannel === undefined){ /*Leaves VC*/ }
});
client.on("presenceUpdate", (oldMember, newMember) => {
    if(oldMember.presence.status !== newMember.presence.status) {
        console.log(newMember.user.username + ' is now ' + newMember.presence.status);
    } 
});

client.login(config.token);