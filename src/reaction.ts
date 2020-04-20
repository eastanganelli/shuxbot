import * as Discord from "discord.js";
import "firebase/database";
import { serverID, channelsTC, LVLs } from "./const";
import { TicketSup } from "./tickets";
import { AdminStaff } from "./admin";
import { User } from "./user";

export class Reacciones {
	shuxServe: Discord.Guild = this.dsclient.guilds.find('id', serverID);

	constructor(private dsclient: Discord.Client) {  }
	catchingReac() {
		//#region 
		const Comandos: any|Discord.TextChannel = this.shuxServe.channels.find('id', channelsTC.comandos.idTC);
		const filter = (reaction: any) => {
			console.log(reaction.emoji.name)
			switch(reaction.emoji.name) {
				case "🎟️": {
					return true;
					break;	
				} case "💡": {
					return true;
					break;	
				} /* case "📝": {
					return true;
					break;	
				}  */case "📸": {
					return true;
					break;	
				} case "shux": {
					return true;		
					break;
				} case "✅": {
					return true;		
					break;
				} case "🎙️": {
					return true;		
					break;
				} default: {
					return false;
					break;
				}
			} return false;
		};
		//#endregion
		for(let msg_ of channelsTC.comandos.msg) {
			Comandos.fetchMessage(msg_).then(async (msg: Discord.Message) => {
				const collector = msg.createReactionCollector(filter, /* { time: 15000 } */);
				await collector.on('collect', async (reaction: Discord.MessageReaction, reactionCollector: Discord.ReactionCollector) => {
					//await console.log(reaction.users);
					const nowUser: Discord.User = reaction.users.first();
					if(!(nowUser.bot)) {
						//console.log(nowUser.username)
						switch(reaction.emoji.name) {
							case "🎟️": {
								const newTicket = new TicketSup(this.dsclient);
								newTicket.abrirTicket(nowUser.id, nowUser.username, 'SUPP');
								break;	
							} case "shux": {
								const newTicket = new TicketSup(this.dsclient);
								newTicket.abrirTicket(nowUser.id, nowUser.username, 'STAFF');
								break;	
							} case "💡": {
								const sugStaff = new AdminStaff(this.dsclient);
								sugStaff.setSugerencia(nowUser.id);
								break;	
							} /* case "📝": {
								const entreStaff = new AdminStaff(this.dsclient);
								entreStaff.setEntrevista(nowUser.id);
								break;	
							} */ case "📸": {
								const usrProfile = new User(this.dsclient);
								usrProfile.miPerfil(nowUser.id);
								break;
							} case "✅": {
								const impRole: Array<string>=[channelsTC.reglas.roles[0], LVLs[0].roleLVL];
								for(let miLvl of LVLs) {
									if(this.shuxServe.member(nowUser.id).roles.has(miLvl.roleLVL)) {
										await this.shuxServe.member(nowUser.id).addRole(impRole[0], 'Usuario Acepto las Reglas');
										break;
									} else {
										await this.shuxServe.member(nowUser.id).removeRole(channelsTC.reglas.roles[1],  'Usuario Acepto las Reglas');
										await this.shuxServe.member(nowUser.id).addRoles(impRole, 'Usuario Acepto las Reglas');
										const msgchan: any|Discord.TextChannel=this.shuxServe.channels.find('id', channelsTC.chatgeneral.idTC);
										await msgchan.send('<@'+nowUser.id+'> **Bienvenido a Shux!!**\nPor favor, recuerde que para pedir ayuda de hardware/software, debe abrir un ticket en 🧰comandos-tickets\nPara hablar de Hardware, y otros temas, usar sus canales respectivos.\nSaludos, Shux');
										break;
									}							  
						 		}
								
								break;
							} case "🎙️": {
								//if(this.shuxServe.member(nowUser.id).roles.has(channelsTC.comandos.roles[0])) {
									await this.shuxServe.member(nowUser.id).addRole(channelsTC.hablemosde.roles, 'Acepto Ver Hablemos De...');
								//}
								break;
							}
						} await reaction.remove(nowUser.id);
						//reactionCollector.cleanup();
					}
				});
				//await collector.on('end', (collected: any) => { console.log(`Collected ${collected.size} items`); });
			})
		}
	}
}