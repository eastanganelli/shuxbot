import * as Discord from "discord.js";
import { serverID, channelsTC } from "./const";
import { User } from "./user";
import { fbuser } from "./interfaces/users";

export class TicketSup {
	oneday: number = 24*60*60*1000;
	shuxServe: Discord.Guild = this.dsclient.guilds.find('id', serverID);

	constructor(private dsclient: Discord.Client) {  }
	abrirTicket(uid: string, usrname: string, tipoT: string) {
		let flag_: boolean = true;
		(new User(this.dsclient)).getMyProfile(uid).then((getIn: any) => {
			const userData: fbuser = getIn;
			switch(tipoT) {
				case 'SUPP': {
					console.log(userData.supTicket);
					if(userData.supTicket!=undefined && !(userData.supTicket)) { flag_=false; }
					else if(!(userData.supTicket)) { flag_=false; }
					break;
				} case 'STAFF': {
					console.log(userData.staffTicket);
					if(userData.staffTicket!=undefined && !(userData.staffTicket)) { flag_=false; }
					else if(!(userData.staffTicket)) { flag_=false; }
					break;
				}
			}
			console
			if(!flag_) {
				const nombre_: string = tipoT+'-'+usrname;
				this.shuxServe.createChannel(String(nombre_), "text").then(async (channel: Discord.GuildChannel) => {
					const saveChannel = new User(this.dsclient);
					let category = this.shuxServe.channels.find(c => c.id == channelsTC.tickets.category && c.type == "category");
					if (!category) throw new Error("Category channel does not exist");
					await channel.setParent(channelsTC.tickets.category);
					await channel.lockPermissions();
					switch(tipoT) {
						case 'SUPP': {
							saveChannel.setTicketTC(uid, 'SUPP');
							await channel.overwritePermissions(uid, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true });
							for(let rol_ of channelsTC.tecnicos.roles) {
								await channel.overwritePermissions(rol_, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true });
							} 
							const msg: any|Discord.TextChannel = this.shuxServe.channels.get(channel.id);
							await msg.send('<@'+uid+'> Su Ticket Soporte ya fue abierto');
							break;
						} case 'STAFF': {
							saveChannel.setTicketTC(uid, 'STAFF');
							await channel.overwritePermissions(uid, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true });
							for(let rol_ of channelsTC.tecnicos.roles) {
								await channel.overwritePermissions(rol_, { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'READ_MESSAGE_HISTORY': false, 'EMBED_LINKS': false, 'ATTACH_FILES': false });
							} 
							const msg: any|Discord.TextChannel = this.shuxServe.channels.get(channel.id);
							await msg.send('<@'+uid+'> Su Ticket Staff ya fue abierto');
							break;
						}
					}
				}).catch(/* console.error */);
			}
		});
	}
	cerrarTicket(msg: Discord.Message, tipo_: string) {
		const ticketCh:any|Discord.TextChannel = this.shuxServe.channels.find('id', msg.channel.id);
		if(ticketCh.parentID == channelsTC.tickets.category) {
			ticketCh.delete().then (() => { 
				this.calidadDeTicket(msg, tipo_);
				const Delticket = new User(this.dsclient);
				Delticket.deleteTicket(msg.mentions.users.first().id, tipo_);
			});
		}
	}
	async calidadDeTicket(msg: Discord.Message, tipo_: string) {
		const usuario = new User(this.dsclient);
		let menUser = msg.mentions.users.first();
		await menUser.send('Su ticket fue cerrado.\nCalifique del 1 al 10 como fue... *Tiene 24hs (1 Día) para calificar*');
		await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: this.oneday, errors: ['TIME'] }).then(async (collected: any) => {
			usuario.updatePoints(menUser.id, 100);
			msg.author.send('Muchas gracias por calificar.\nHa recibido 100pts.\nSaludos, <@673655111041548288>').then(() => {
				switch(tipo_) {
					case ('SUPP'): {
						const tecnicos: Discord.TextChannel|any = this.shuxServe.channels.find('id', channelsTC.tecnicos.idTC);
						tecnicos.send('El usuario <@'+menUser.id+'> califico la **Ayuda | Consulta | Presupuesto | Reportes**\n**'+collected.first().content+'/10**');
						break;
					} case ('STAFF'): {
						const staff: Discord.TextChannel|any = this.shuxServe.channels.find('id', channelsTC.staff.idTC);
						staff.send('El usuario <@'+menUser.id+'> califico la **Ayuda | Consulta | Reporte**\n**'+collected.first().content+'/10**');
						break;
					}
				}
			});
		}).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!'); });
	}
}