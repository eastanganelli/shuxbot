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
const Mee6LevelsApi = require("mee6-levels-api");
exports.dsclient = new Discord.Client();
let app = firebase.initializeApp(config_1.firebaseConfig);
exports.dsclient.on("ready", () => {
    const iniServicios = new ini_1.IniBOT(exports.dsclient);
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
    }
});
exports.dsclient.login(config_1.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBc0M7QUFDdEMseUNBQXlDO0FBQ3pDLDZCQUEyQjtBQUMzQix5QkFBdUI7QUFDdkIscUNBQWtEO0FBSWxELCtCQUFnQztBQUNoQywrQkFBK0I7QUFJL0IsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFcEMsUUFBQSxRQUFRLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzdELElBQUksR0FBRyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUFjLENBQUMsQ0FBQztBQUVuRSxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3RCLE1BQU0sWUFBWSxHQUFHLElBQUksWUFBTSxDQUFDLGdCQUFRLENBQUMsQ0FBQztBQUM5QyxDQUFDLENBQUMsQ0FBQztBQUNILGdCQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFO0lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNILGdCQUFRLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxFQUFFO0FBRTFDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksYUFBTyxDQUFDLGdCQUFRLENBQUMsQ0FBQztJQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBTyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsa0RBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNsRSxnQkFBUSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFPLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxrREFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ3JFLGdCQUFRLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0QsZ0JBQVEsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUU7SUFDbkQsSUFBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtLQUczRDtBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=