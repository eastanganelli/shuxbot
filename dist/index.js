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
const config_1 = require("./config");
const firebase = require("firebase/app");
require("firebase/database");
const dbshux_1 = require("./dbshux");
const msg_1 = require("./msg");
exports.client = new Discord.Client();
let app = firebase.initializeApp(config_1.firebaseConfig);
exports.client.on("ready", () => {
    console.log("Ready to go!!!");
    const server_ = exports.client.guilds.get('392414185633611776');
    server_.channels.get('675061892863098890').send('SHUX ESTA PRENDIDO');
    dbshux_1.iniDB();
});
exports.client.on("guildMemberAdd", member => { member.addRole('674086387510673414'); });
exports.client.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    msg_1.getMSG(msg);
}));
exports.client.on('messageReactionAdd', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.client.on('messageReactionRemove', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel, oldUserChannel = oldMember.voiceChannel;
    if (oldUserChannel === undefined && newUserChannel !== undefined && !(newMember.user.bot) && (oldMember.voiceChannelID != '496525236888535042' && newMember.voiceChannelID != '496525236888535042')) { }
    else if (newUserChannel === undefined) { }
});
exports.client.on("presenceUpdate", (oldMember, newMember) => {
    if (oldMember.presence.status !== newMember.presence.status) {
        console.log(newMember.user.username + ' is now ' + newMember.presence.status);
    }
});
exports.client.login(config_1.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBc0M7QUFDdEMscUNBQWtEO0FBQ2xELHlDQUF5QztBQUN6Qyw2QkFBMkI7QUFHM0IscUNBQWlDO0FBQ2pDLCtCQUErQjtBQUlsQixRQUFBLE1BQU0sR0FBbUIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDM0QsSUFBSSxHQUFHLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQWMsQ0FBQyxDQUFDO0FBRW5FLGNBQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDOUIsTUFBTSxPQUFPLEdBQVEsY0FBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM3RCxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3RFLGNBQUssRUFBRSxDQUFDO0FBRVosQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakYsY0FBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBTSxHQUFHLEVBQUMsRUFBRTtJQUM3QixZQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBTyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7QUFDekQsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBTyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7QUFFNUQsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUU7SUFDbkQsSUFBSSxjQUFjLEdBQUcsU0FBUyxDQUFDLFlBQVksRUFBRSxjQUFjLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztJQUNyRixJQUFHLGNBQWMsS0FBSyxTQUFTLElBQUksY0FBYyxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLElBQUksb0JBQW9CLElBQUksU0FBUyxDQUFDLGNBQWMsSUFBSSxvQkFBb0IsQ0FBQyxFQUFFLEdBQUk7U0FDbk0sSUFBRyxjQUFjLEtBQUssU0FBUyxFQUFDLEdBQWlCO0FBQzFELENBQUMsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUNqRCxJQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakY7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxLQUFLLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=