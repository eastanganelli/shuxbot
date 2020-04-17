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
const const_1 = require("./const");
exports.dsclient = new Discord.Client();
let app = firebase.initializeApp(config_1.firebaseConfig);
exports.dsclient.on("ready", () => {
    (new ini_1.IniBOT(exports.dsclient)).iniLoading();
    ini_1.intervals(exports.dsclient);
    (new reaction_1.Reacciones(exports.dsclient)).catchingReac();
});
exports.dsclient.on("guildMemberAdd", member => {
    member.addRole(const_1.channelsTC.reglas.roles[1]).then(() => { (new user_1.User(exports.dsclient)).setPerfil(member.id); });
});
exports.dsclient.on('guildMemberRemove', member => {
});
exports.dsclient.on("message", msg => {
    (new msg_1.MSGshux(exports.dsclient)).getMSG(msg);
});
exports.dsclient.on('messageReactionAdd', (reaction, user) => {
    if (!(user.bot)) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBc0M7QUFDdEMseUNBQXlDO0FBQ3pDLDZCQUEyQjtBQUMzQix5QkFBdUI7QUFDdkIscUNBQWtEO0FBSWxELCtCQUFnQztBQUNoQywrQkFBMEM7QUFDMUMsaUNBQXdDO0FBQ3hDLHFDQUFrQztBQUNsQyx5Q0FBd0M7QUFDeEMsbUNBQXFDO0FBSXhCLFFBQUEsUUFBUSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM3RCxJQUFJLEdBQUcsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBYyxDQUFDLENBQUM7QUFFbkUsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUN0QixDQUFDLElBQUksWUFBTSxDQUFDLGdCQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BDLGVBQVMsQ0FBQyxnQkFBUSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxJQUFJLHFCQUFVLENBQUMsZ0JBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7QUFFOUMsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsRUFBRTtJQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksV0FBSSxDQUFDLGdCQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRyxDQUFDLENBQUMsQ0FBQztBQUNILGdCQUFRLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxFQUFFO0FBRTFDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBQ3pCLENBQUMsSUFBSSxhQUFPLENBQUMsZ0JBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDakQsSUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQW9EO0FBQ3hFLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBTyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7QUFFOUQsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNILGdCQUFRLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ3JELENBQUMsSUFBSSxlQUFNLENBQUMsZ0JBQVEsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUM5QyxDQUFDLENBQUMsQ0FBQztBQUNILGdCQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ25ELElBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7S0FHM0Q7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILGdCQUFRLENBQUMsS0FBSyxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyJ9