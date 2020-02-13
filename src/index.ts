//#region IMPORTS
//#region Plug
import * as Discord from "discord.js";
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import { config, firebaseConfig, db, serverID } from "./config";
//#endregion
//#region Class
/* import { DBshux } from "./dbshux"; */
import { MSGshux } from "./msg";
//#endregion
//#endregion

const Mee6LevelsApi = require("mee6-levels-api");


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
    if(!(msg.author.bot)) asignarlvls(msg.author.id);
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

export function asignarlvls(dsID: string|any) {
    let LVLs: Array<{ minLvl: number; maxLvl: number; roleLVL: string }> = [
        { minLvl: 0,  maxLvl: 5,   roleLVL: '674086387510673414' },
        { minLvl: 5,  maxLvl: 10,  roleLVL: '675185452931874836' },
        { minLvl: 10, maxLvl: 15,  roleLVL: '675185597589225502' },
        { minLvl: 15, maxLvl: 20,  roleLVL: '675185648466133052' },
        { minLvl: 20, maxLvl: 25,  roleLVL: '675185689872039946' },
        { minLvl: 25, maxLvl: 30,  roleLVL: '675185738815373312' },
        { minLvl: 30, maxLvl: 35,  roleLVL: '675185783673454622' },
        { minLvl: 35, maxLvl: 40,  roleLVL: '675185839772270612' },
        { minLvl: 40, maxLvl: 500, roleLVL: '675185892276699141' },
    ];

    const SHUX: any|Discord.Guild = dsclient.guilds.get(serverID);
    const shuxMEM: Discord.GuildMember = SHUX.members.get(dsID);

    {
        for(let i = 1; i < LVLs.length; i++) {
            if(shuxMEM.roles.has(LVLs[i].roleLVL)) { return null; }
        }
        shuxMEM.addRole(LVLs[0].roleLVL);
    }

    Mee6LevelsApi.getUserXp(serverID, dsID).then((meeUser: any) => {
        const kValue: number = 1000;
        for(let i = 0; i < LVLs.length; i++) {
            if(meeUser.level>=LVLs[i].minLvl && meeUser.level<LVLs[i].maxLvl) { 
                shuxMEM.addRole(LVLs[i].roleLVL);
                firebase.database().ref('/users').child(dsID).update({ points: (meeUser.level)*kValue })
            }
        } console.log(`${meeUser.tag} is at level ${meeUser.level} and rank ${meeUser.rank}.`);
    }).catch(() => {});
}