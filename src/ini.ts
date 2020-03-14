import * as Discord from "discord.js";
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import { db, serverID, TESTMode, channelsTC } from "./config";
import { User } from "./user";
import { Juegos } from "./juegos";

export class IniBOT {
	shuxServe: Discord.Guild = this.dsclient.guilds.find('id', serverID);

	constructor(private dsclient: Discord.Client) {  }
	iniLoading() {
		//this.agregarReaccionesAmsgs();
		console.log('>>LOADING BOT...');
		if(TESTMode) {
			const ShuxDevTC: Discord.TextChannel|any = this.shuxServe.channels.find('id', channelsTC.shuxestado.idTC);
			ShuxDevTC.fetchMessage(String(channelsTC.shuxestado.msg[0])).then(async(estadoMSG: any) => {
				let ESTADO: Array<string> = new Array(0);
				await estadoMSG.edit('>>**INICIANDO SERVICIOS** - ');
				await console.log('>>>>>DEBUG MODE:' +TESTMode); await estadoMSG.edit('>>**INICIANDO SERVICIOS**\t -');
				await ESTADO.push('>>ESTADO DEBUG: '+TESTMode); await estadoMSG.edit('>>**INICIANDO SERVICIOS**\t \ ');
				await firebase.auth().signInWithEmailAndPassword(db.user, db.pass).then(() => { 
					console.log('>>>>>BOT DB Connected'); estadoMSG.edit('>>**INICIANDO SERVICIOS\t |**');
					ESTADO.push('>>ESTADO DB: conectado'); estadoMSG.edit('>>**INICIANDO SERVICIOS**\t / ');
				}).catch((Err) => { 
					console.log('>>>>>DB STATE ' +Err); estadoMSG.edit('>>**INICIANDO SERVICIOS\t -**');
					ESTADO.push('>>ESTADO DB: ' +Err); estadoMSG.edit('>>**INICIANDO SERVICIOS**\t \ ');
				});
				await this.botDataRefresh();  await ESTADO.push('>>RANKING: cargado'); await estadoMSG.edit('>>**INICIANDO SERVICIOS**\t | ');
				await ESTADO.push('\n>>**CARGA FINALIZADA**'); await estadoMSG.edit('>>**INICIANDO SERVICIOS**\t - ');
				await console.log('>>LOAD FINISH');
				await ESTADO.push('>>**BOT ENCENDIDO!!!**');
				await console.log('>>BOT READY TO GO');
				await estadoMSG.edit(ESTADO);
			});
		} else {
			const ShuxDevTC: Discord.TextChannel|any = this.shuxServe.channels.find('id', channelsTC.shuxestado.idTC);
			ShuxDevTC.fetchMessage(channelsTC.shuxestado.msg[0]).then(async(estadoMSG: any) => {
				await estadoMSG.edit('>>**INICIANDO SERVICIOS**');
				await firebase.auth().signInWithEmailAndPassword(db.user, db.pass).catch((Err) => { 
				});
				await this.botDataRefresh();
				await estadoMSG.edit('>>**BOT ENCENDIDO!!!**');
			});
		}
		
	}
	botDataRefresh() {
		const usrRanking: Array<Array<any>> = (new User(this.dsclient)).listaTopUsers();
		const lvls: Array<string> = ['LVL 10', 'LVL 15', 'LVL 20','LVL 25', 'LVL 30','LVL 35', 'LVL 40'];
		const msgRank: Discord.TextChannel|any = this.shuxServe.channels.find('id', channelsTC.shuxestado.idTC);
		msgRank.fetchMessage(channelsTC.shuxestado.msg[channelsTC.shuxestado.msg.length-1]).then(async(rankMSg: any) => { 
			let msg: Discord.RichEmbed = new Discord.RichEmbed();
			msg.setTitle('**RANKING**').setDescription('se actualiza cada 4 min').setColor('0xFFD700');
			for(let i=(usrRanking.length-1); i>=0; i--) {
				let values_: Array<string> = new Array(0);
				if(usrRanking[i].length>0) {
					for(let j=0; j<usrRanking[i].length; j++) { if(usrRanking[i][j].user.username!='') { values_.push(usrRanking[i][j].user.username); } }
				} else { values_.push('Sin usuarios'); }
				msg.addField(lvls[i], values_, false);
			} await rankMSg.edit(msg);
		});
	}
	agregarReaccionesAmsgs() {
		const msgToReact: Discord.TextChannel|any = this.shuxServe.channels.find('id', '');
		msgToReact.fetchMessage('').then(async (msg: Discord.Message) => {
			await msg.react("🏳");
		})
	}
}
export function intervals(dsclient: Discord.Client) {
	setInterval(() => {
		const init = new IniBOT(dsclient);
		init.botDataRefresh();
		(new Juegos(dsclient)).autoDelteChannel();
	},300000 );
}