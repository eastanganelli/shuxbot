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
exports.dsclient = new Discord.Client();
let app = firebase.initializeApp(config_1.firebaseConfig);
exports.dsclient.on("ready", () => {
    new ini_1.IniBOT(exports.dsclient);
});
exports.dsclient.on("guildMemberAdd", member => {
    member.addRole('674086387510673414').then(() => { (new user_1.User(exports.dsclient)).setPerfil(member.id); });
});
exports.dsclient.on('guildMemberRemove', member => {
});
exports.dsclient.on("message", msg => {
    (new msg_1.MSGshux(exports.dsclient)).getMSG(msg);
});
exports.dsclient.on('messageReactionAdd', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.dsclient.on('messageReactionRemove', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.dsclient.on('voiceStateUpdate', (oldMember, newMember) => { });
exports.dsclient.on("presenceUpdate", (oldMember, newMember) => {
    if (oldMember.presence.status !== newMember.presence.status) {
    }
});
exports.dsclient.login(config_1.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBc0M7QUFDdEMseUNBQXlDO0FBQ3pDLDZCQUEyQjtBQUMzQix5QkFBdUI7QUFDdkIscUNBQTREO0FBSTVELCtCQUFnQztBQUNoQywrQkFBK0I7QUFDL0IsaUNBQThCO0FBSWpCLFFBQUEsUUFBUSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM3RCxJQUFJLEdBQUcsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBYyxDQUFDLENBQUM7QUFFbkUsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUN0QixJQUFJLFlBQU0sQ0FBQyxnQkFBUSxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsRUFBRTtJQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxXQUFJLENBQUMsZ0JBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BHLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLEVBQUU7QUFFMUMsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFDekIsQ0FBQyxJQUFJLGFBQU8sQ0FBQyxnQkFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFPLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxrREFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ2xFLGdCQUFRLENBQUMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQU8sUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLGtEQUFJLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDckUsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMvRCxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUNuRCxJQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO0tBRzNEO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxnQkFBUSxDQUFDLEtBQUssQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUMifQ==