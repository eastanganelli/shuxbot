import * as Discord from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
import { serverID, channelsTC } from "./config";

export class Juegos {
	constructor(private dsclient: Discord.Client) {  }
	autoDelteChannel() {
		const shuxServe: Discord.Guild = this.dsclient.guilds.find('id', serverID);
		firebase.database().ref('/dynamicVTC').child('viciogame').once('value', snapshot => {
			snapshot.forEach(snap => {
				if(snap.exists()) {
					const shuxchannel: any|Discord.VoiceChannel = shuxServe.channels.find('id', snap.val().vcid);
					if ((shuxchannel.members.keyArray()).length<=0 || shuxchannel.members==null) {
						shuxchannel.delete();
						firebase.database().ref('/dynamicVTC').child('viciogame').child(String(snap.key)).remove();
					}
				}
			})
		})
		
	}
	creategameChannel(tcName: string, creatorName: string) {
		const shuxServe: Discord.Guild = this.dsclient.guilds.find('id', serverID);
		shuxServe.createChannel(creatorName+' '+tcName, "voice").then(channel => {
		  	let category = shuxServe.channels.find(c => c.id == channelsTC.vicioroom.category && c.type == "category");
			if (!category) throw new Error("Category channel does not exist");
			channel.setParent(category.id).then(() => { firebase.database().ref('/dynamicVTC').child('viciogame').push({ vcid: channel.id }); });
		}).catch(console.error);
	}   
}