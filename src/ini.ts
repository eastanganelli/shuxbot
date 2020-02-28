import * as Discord from "discord.js";
import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import { db, serverID, TESTMode } from "./config";

export class IniBOT {
	constructor(private dsclient: Discord.Client) {
		this.iniLoading();
	}
	async iniLoading() {
		await console.log('>>LOADING BOT...');
		const ShuxDevTC: Discord.TextChannel|any = this.dsclient.guilds.find('id', serverID).channels.find('id', '675061892863098890');
		await ShuxDevTC.send('>>**INICIANDO SERVICIOS**');
		await console.log('>>>>>DEBUG MODE: __' +TESTMode+'__')
		await ShuxDevTC.send('>>>>>ESTADO DEBUG: __' +TESTMode+'__');
		await firebase.auth().signInWithEmailAndPassword(db.user, db.pass).then(() => { 
			console.log('>>>>>BOT DB Connected'); 
			ShuxDevTC.send('>>>>>ESTADO DB: __conectado__'); 
		}).catch((Err) => { 
			console.log('>>>>>DB STATE:__' +Err+'__'); 
			ShuxDevTC.send('>>>>>ESTADO DB:__' +Err+'__');
		});
		await ShuxDevTC.send('>>**CARGA FINALIZADA**');
		await console.log('>>LOAD FINISH');
		await ShuxDevTC.send('>>**BOT ENCENDIDO!!!**');
		await console.log('>>BOT READY TO GO');
	}
}