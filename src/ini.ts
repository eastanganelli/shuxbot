import * as Discord from "discord.js";
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import { db, serverID, TESTMode, channelsTC, serverState } from "./config";

export class IniBOT {
	constructor(private dsclient: Discord.Client) {
		this.iniLoading();
	}
	iniLoading() {
		console.log('>>LOADING BOT...');
		const ShuxDevTC: Discord.TextChannel|any = this.dsclient.guilds.find('id', serverID).channels.find('id', channelsTC.shuxestado.idTC);
		ShuxDevTC.fetchMessage(serverState).then(async (estadoMSG: any) => {
			let ESTADO: Array<string> = new Array(0);
			await estadoMSG.edit('>>**INICIANDO SERVICIOS** - ');
			await console.log('>>>>>DEBUG MODE:' +TESTMode); await estadoMSG.edit('>>**INICIANDO SERVICIOS** \ ');
			await ESTADO.push('>>ESTADO DEBUG: __' +TESTMode+'__'); await estadoMSG.edit('>>**INICIANDO SERVICIOS** | ');
			await firebase.auth().signInWithEmailAndPassword(db.user, db.pass).then(() => { 
				console.log('>>>>>BOT DB Connected'); estadoMSG.edit('>>**INICIANDO SERVICIOS** / ');
				ESTADO.push('>>ESTADO DB: __conectado__'); estadoMSG.edit('>>**INICIANDO SERVICIOS** - ');
			}).catch((Err) => { 
				console.log('>>>>>DB STATE:__' +Err+'__'); estadoMSG.edit('>>**INICIANDO SERVICIOS** \ ');
				ESTADO.push('>>ESTADO DB:__' +Err+'__'); estadoMSG.edit('>>**INICIANDO SERVICIOS** | ');
			});
			await ESTADO.push('\n>>**CARGA FINALIZADA**'); await estadoMSG.edit('>>**INICIANDO SERVICIOS** - ');
			await console.log('>>LOAD FINISH');
			await ESTADO.push('>>**BOT ENCENDIDO!!!**');
			await console.log('>>BOT READY TO GO');
			await estadoMSG.edit(ESTADO);
		});
	}
}