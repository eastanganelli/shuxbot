import * as Discord from "discord.js";
import { serverID, channelsTC } from "./config";

export class AdminStaff {
	shuxServe: Discord.Guild = this.dsClient.guilds.find('id', serverID);

   	constructor(private dsClient: Discord.Client) {  }
	async setSugerencia(uid: string) {
		const author: Discord.GuildMember = this.shuxServe.members.find('id', uid);
		await author.send(`**FORMATO DE FORMULARIO EN <#684205035177115720> || NO RESPETAR EL FORMULARIS, SE PENALIZA CON WARN`);
		await author.send('Por favor escriba su Ayuda | Consulta | Presupuesto | Reporte\nTiene 15 Minutos para responder || Si desea cancelar -> #cancelar');
		await author.user.dmChannel.awaitMessages((m: any) => author.id == m.author.id, { max: 1, time: 15*60000, errors: ['TIME'] }).then((collected: any) => {
			if(collected.first().content == '#cancelar') {
				author.send('Ha sido cancelada');
			} else {
				const ch: any|Discord.TextChannel = this.shuxServe.channels.find('id', channelsTC.sugerencia.idTC);
				ch.send('SUGERENCIA POR <@'+author.id+'>\n'+collected.first().content);
				author.send('Mensaje enviado\nEspere su respuesta, Por Favor');
			}
		}).catch((err: any) => { author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
	}
	async setEntrevista(uid: string) {
		const author: Discord.GuildMember = this.shuxServe.members.find('id', uid);
		await author.send(`**FORMATO DE FORMULARIO EN <#684205035177115720> || NO RESPETAR EL FORMULARIOS, SE PENALIZA CON WARN`);
		await author.send('Por favor, responda con el formato del formulario, en un solo msj.\nSi desea cancelar -> #cancelar\nComplete el formulario a continuacion, al terminar **presione Enter**');
		await author.user.dmChannel.awaitMessages((m: any) => author.id == m.author.id, { max: 1, time: 5*60000, errors: ['TIME'] }).then((collected: any) => {
			if(collected.first().content == '#cancelar') {
				author.send('Ha sido cancelada');
			} else {
				const ch: any|Discord.TextChannel = this.shuxServe.channels.find('id', channelsTC.entrevista.idTC);
				ch.send('<@'+author.id+'>\n'+collected.first().content);
				author.send('Mensaje enviado\nEspere su respuesta, Por Favor');
			}
		}).catch((err: any) => { author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
	}
}