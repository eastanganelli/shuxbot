import * as Discord from "discord.js";
import "firebase/database";
import { serverID, channelsTC } from "./config";
import { TicketSup } from "./tickets";
import { AdminStaff } from "./admin";
import { User } from "./user";

export class Reacciones {
	shuxServe: Discord.Guild = this.dsclient.guilds.find('id', serverID);

	constructor(private dsclient: Discord.Client) {  }
	catchingReac() {
		//#region 
		const Comandos: any|Discord.TextChannel = this.shuxServe.channels.get('674086159697313833');
		const filter = (reaction: any) => {
			switch(reaction.emoji.name) {
				case "🎟️": {
					return true;
					break;	
				} case "💡": {
					return true;
					break;	
				} case "📝": {
					return true;
					break;	
				} case "📸": {
					return true;
					break;	
				} default: {
					return false;
					break;
				}
			} return false;
		};
		//#endregion
		Comandos.fetchMessage('687122556666511415').then(async (msg: Discord.Message) => {
			const collector = msg.createReactionCollector(filter, /* { time: 15000 } */);
			await collector.on('collect', async (reaction: Discord.MessageReaction, reactionCollector: Discord.ReactionCollector) => {
				//await console.log(reaction.users);
				const nowUser: any|Discord.GuildMember = reaction.users.last();
				if(!(nowUser.user.bot)) {
					console.log(nowUser.username)
					switch(reaction.emoji.name) {
						case "🎟️": {
							const newTicket = new TicketSup(this.dsclient);
							newTicket.abrirTicket(nowUser.id, nowUser.username);
							break;	
						} case "💡": {
							const sugStaff = new AdminStaff(this.dsclient);
							sugStaff.setSugerencia(nowUser.id);
							break;	
						} case "📝": {
							const entreStaff = new AdminStaff(this.dsclient);
							entreStaff.setEntrevista(nowUser.id);
							break;	
						} case "📸": {
							const usrProfile = new User(this.dsclient);
							usrProfile.miPerfil(nowUser.id);
							break;
						}
					} reaction.remove(nowUser.id);
				} 
			});
			await collector.on('end', (collected: any) => { console.log(`Collected ${collected.size} items`); });
			//await msg.clearReactions();
		})
	}
	
}