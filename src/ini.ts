import * as Discord from "discord.js";
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import { db } from "./config";
import { TESTMode, version, serverID, channelsTC } from "./const";
import { User } from "./user";
import { Juegos } from "./juegos";
const fetch = require('node-fetch');

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
				await estadoMSG.edit('BOT Version **'+version+'**\n');
			});
		} //this.agregarReaccionesAmsgs()
	}
	botDataRefresh() {
		const usrRanking: Array<Array<any>> = (new User(this.dsclient)).listaTopUsers();
		const lvls: Array<string> = ['LVL 10-14', 'LVL 15-19', 'LVL 20-24','LVL 25-29', 'LVL 30-34','LVL 35-39', 'LVL 40-49'];
		const msgRank: Discord.TextChannel|any = this.shuxServe.channels.find('id', channelsTC.shuxestado.idTC);
		setInterval(() => {
			msgRank.fetchMessage(channelsTC.shuxestado.msg[channelsTC.shuxestado.msg.length-1]).then(async(rankMSg: any) => { 
				let msg: Discord.RichEmbed = new Discord.RichEmbed();
				msg.setTitle('**RANKING**').setDescription('se actualiza cada 5 min').setColor('0xFFD700');
				for(let i=(usrRanking.length-1); i>=0; i--) {
					let values_: Array<string> = new Array(0);
					if(usrRanking[i].length>0) {
						for(let j=0; j<usrRanking[i].length; j++) { if(usrRanking[i][j].user.username!='') { values_.push(usrRanking[i][j].user.username); } }
					} else { values_.push('Sin usuarios'); }
					msg.addField(lvls[i], values_, false);
				} await rankMSg.edit(msg);
			});
		}, 30000);
	}
	agregarReaccionesAmsgs() {
		const addReac = [
			{
				idTC: '674086159697313833',
				data: [{
					id: '688036583399489641',
					emojis: ["📸", "💡", "🎟️", "shux"]
				}, {
					id: '687122556666511415',
					emojis: ["✅", "🎙️" ]
				}]
			},
		];
		for(let _Chan of addReac) {
			const msgToReact: Discord.TextChannel|any = this.shuxServe.channels.find('id', _Chan.idTC);
			for(let _data of _Chan.data) {
				msgToReact.fetchMessage(_data.id).then(async (msg: Discord.Message) => {
					for(let thisReact of _data.emojis) {
						await msg.react(msg.guild.emojis.find('name', thisReact).id);
					}
				})
			}
		}
	}
}
export function intervals(dsclient: Discord.Client) {
	setInterval(() => {
		const init = new IniBOT(dsclient);
		init.botDataRefresh();
		(new Juegos(dsclient)).autoDelteChannel();
	},300000 );
}