import * as Discord from "discord.js";
import "firebase/database";
import { serverID, channelsTC } from "./config";
import { TicketSup } from "./tickets";
import { AdminStaff } from "./admin";

export class Reacciones {
	constructor(private dsclient: Discord.Client) {  }
	catchingReac() {
		const shuxServe: Discord.Guild = this.dsclient.guilds.find('id', serverID);
		const Comandos: any|Discord.TextChannel = shuxServe.channels.get('674086159697313833');
		Comandos.fetchMessage('687122556666511415').then(async (msg: Discord.Message) => {

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
					}
				} return false;
			};

			const collector = msg.createReactionCollector(filter, /* { time: 15000 } */);

			await collector.on('collect', async (reaction: Discord.MessageReaction, reactionCollector: Discord.ReactionCollector) => {
				await console.log(reaction.users);
				const nowUser: any|Discord.GuildMember = reaction.users.first();
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
						
						break;	
					}
				} await msg.clearReactions();
			});

			await collector.on('end', (collected: any) => {
				console.log(`Collected ${collected.size} items`);
			});
			msg.clearReactions();
		})
	}
	
}