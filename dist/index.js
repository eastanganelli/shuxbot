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
const ini_1 = require("./ini");
const user_1 = require("./user");
const juegos_1 = require("./juegos");
const reaction_1 = require("./reaction");
exports.dsclient = new Discord.Client();
let app = firebase.initializeApp(config_1.firebaseConfig);
exports.dsclient.on("ready", () => {
    (new ini_1.IniBOT(exports.dsclient)).iniLoading();
    ini_1.intervals(exports.dsclient);
    const iniReac = new reaction_1.Reacciones(exports.dsclient);
    iniReac.catchingReac();
});
exports.dsclient.on("guildMemberAdd", member => {
    member.addRole('674086387510673414').then(() => { (new user_1.User(exports.dsclient)).setPerfil(member.id); });
});
exports.dsclient.on('guildMemberRemove', member => {
});
exports.dsclient.on("message", msg => {
    (new msg_1.MSGshux(exports.dsclient)).getMSG(msg);
});
exports.dsclient.on('messageReactionAdd', (reaction, user) => {
});
exports.dsclient.on('messageReactionRemove', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.dsclient.on('voiceStateUpdate', (oldMember, newMember) => {
    (new juegos_1.Juegos(exports.dsclient)).autoDelteChannel();
});
exports.dsclient.on("presenceUpdate", (oldMember, newMember) => {
    if (oldMember.presence.status !== newMember.presence.status) {
    }
});
exports.dsclient.login(config_1.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBc0M7QUFDdEMseUNBQXlDO0FBQ3pDLDZCQUEyQjtBQUMzQix5QkFBdUI7QUFDdkIscUNBQWtEO0FBSWxELCtCQUFnQztBQUNoQywrQkFBMEM7QUFDMUMsaUNBQThCO0FBQzlCLHFDQUFrQztBQUNsQyx5Q0FBd0M7QUFJM0IsUUFBQSxRQUFRLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzdELElBQUksR0FBRyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUFjLENBQUMsQ0FBQztBQUVuRSxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3RCLENBQUMsSUFBSSxZQUFNLENBQUMsZ0JBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEMsZUFBUyxDQUFDLGdCQUFRLENBQUMsQ0FBQztJQUNwQixNQUFNLE9BQU8sR0FBRyxJQUFJLHFCQUFVLENBQUMsZ0JBQVEsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQztBQUNILGdCQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFO0lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLFdBQUksQ0FBQyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEcsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsRUFBRTtBQUUxQyxDQUFDLENBQUMsQ0FBQztBQUNILGdCQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUN6QixDQUFDLElBQUksYUFBTyxDQUFDLGdCQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQztBQUNILGdCQUFRLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO0FBRXJELENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBTyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7QUFFOUQsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNILGdCQUFRLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ3JELENBQUMsSUFBSSxlQUFNLENBQUMsZ0JBQVEsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUM5QyxDQUFDLENBQUMsQ0FBQztBQUNILGdCQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ25ELElBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7S0FHM0Q7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILGdCQUFRLENBQUMsS0FBSyxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyJ9