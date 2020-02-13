"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const firebase = require("firebase/app");
require("firebase/database");
require("firebase/auth");
const config_1 = require("./config");
const msg_1 = require("./msg");
exports.dsclient = new Discord.Client();
let app = firebase.initializeApp(config_1.firebaseConfig);
exports.dsclient.on("ready", () => {
    console.log("Ready to go!!!");
    firebase.auth().signInWithEmailAndPassword(config_1.db.user, config_1.db.pass).then(() => { console.log('BOT DB Connected'); }).catch(Err => { console.log(Err); });
});
exports.dsclient.on("guildMemberAdd", member => {
    member.addRole('674086387510673414');
});
exports.dsclient.on('guildMemberRemove', member => {
});
exports.dsclient.on("message", msg => {
    let msg_ = new msg_1.MSGshux(exports.dsclient);
    msg_.getMSG(msg);
});
exports.dsclient.on('messageReactionAdd', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.dsclient.on('messageReactionRemove', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.dsclient.on('voiceStateUpdate', (oldMember, newMember) => { });
exports.dsclient.on("presenceUpdate", (oldMember, newMember) => {
    if (oldMember.presence.status !== newMember.presence.status) {
        if (!(newMember.roles.has('674086387510673414'))) {
            newMember.addRole('674086387510673414');
        }
    }
});
exports.dsclient.login(config_1.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBc0M7QUFDdEMseUNBQXlDO0FBQ3pDLDZCQUEyQjtBQUMzQix5QkFBdUI7QUFDdkIscUNBQWdFO0FBSWhFLCtCQUFnQztBQUtuQixRQUFBLFFBQVEsR0FBbUIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDN0QsSUFBSSxHQUFHLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQWMsQ0FBQyxDQUFDO0FBRW5FLGdCQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxXQUFFLENBQUMsSUFBSSxFQUFFLFdBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JKLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEVBQUU7SUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLEVBQUU7QUFFMUMsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxhQUFPLENBQUMsZ0JBQVEsQ0FBQyxDQUFDO0lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFPLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxrREFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ2xFLGdCQUFRLENBQUMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQU8sUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLGtEQUFJLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDckUsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMvRCxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUNuRCxJQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBRXhELElBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRTtZQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUFFO0tBQ2hHO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxnQkFBUSxDQUFDLEtBQUssQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUMifQ==