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
const dbshux_1 = require("./dbshux");
const msg_1 = require("./msg");
exports.client = new Discord.Client();
const iniDB = new dbshux_1.DBshux();
exports.client.on("ready", () => {
    console.log("Ready to go!!!");
    const server_ = exports.client.guilds.get('392414185633611776');
    server_.channels.get('675061892863098890').send('SHUX ESTA PRENDIDO');
});
exports.client.on("guildMemberAdd", member => { member.addRole('674086387510673414'); });
exports.client.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    let msg_ = new msg_1.MSGshux(exports.client, iniDB);
    msg_.getMSG(msg);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBc0M7QUFDdEMscUNBQWtDO0FBR2xDLHFDQUFrQztBQUNsQywrQkFBZ0M7QUFJbkIsUUFBQSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNELE1BQU0sS0FBSyxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7QUFFM0IsY0FBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5QixNQUFNLE9BQU8sR0FBUSxjQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzdELE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDMUUsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakYsY0FBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBTSxHQUFHLEVBQUMsRUFBRTtJQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLGFBQU8sQ0FBQyxjQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFPLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtBQUN6RCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFPLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtBQUU1RCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRTtJQUNuRCxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxFQUFFLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBQ3JGLElBQUcsY0FBYyxLQUFLLFNBQVMsSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsSUFBSSxvQkFBb0IsSUFBSSxTQUFTLENBQUMsY0FBYyxJQUFJLG9CQUFvQixDQUFDLEVBQUUsR0FBSTtTQUNuTSxJQUFHLGNBQWMsS0FBSyxTQUFTLEVBQUMsR0FBaUI7QUFDMUQsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ2pELElBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqRjtBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLEtBQUssQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUMifQ==