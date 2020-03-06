"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase/app");
require("firebase/database");
const config_1 = require("./config");
class Juegos {
    constructor(dsclient) {
        this.dsclient = dsclient;
    }
    autoDelteChannel() {
        const shuxServe = this.dsclient.guilds.find('id', config_1.serverID);
        firebase.database().ref('/dynamicVTC').child('viciogame').once('value', snapshot => {
            snapshot.forEach(snap => {
                const shuxchannel = shuxServe.channels.find('id', snap.val().vcid);
                if ((shuxchannel.members.keyArray()).length <= 0 || shuxchannel.members == null) {
                    shuxchannel.delete();
                    firebase.database().ref('/dynamicVTC').child('viciogame').child(String(snap.key)).remove();
                }
            });
        });
    }
    creategameChannel(tcName, creatorName) {
        const shuxServe = this.dsclient.guilds.find('id', config_1.serverID);
        shuxServe.createChannel(creatorName + ' ' + tcName, "voice").then(channel => {
            let category = shuxServe.channels.find(c => c.id == config_1.channelsTC.vicioroom.category && c.type == "category");
            if (!category)
                throw new Error("Category channel does not exist");
            channel.setParent(category.id).then(() => { firebase.database().ref('/dynamicVTC').child('viciogame').push({ vcid: channel.id }); });
        }).catch(console.error);
    }
}
exports.Juegos = Juegos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVlZ29zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2p1ZWdvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUEyQztBQUMzQyw2QkFBMkI7QUFDM0IscUNBQWdEO0FBRWhELE1BQWEsTUFBTTtJQUNsQixZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtJQUFLLENBQUM7SUFDbEQsZ0JBQWdCO1FBQ2YsTUFBTSxTQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQVEsQ0FBQyxDQUFDO1FBQzNFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDbEYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsTUFBTSxXQUFXLEdBQTZCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdGLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFFLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxJQUFFLElBQUksRUFBRTtvQkFDNUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNyQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUMzRjtZQUNGLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFSCxDQUFDO0lBQ0QsaUJBQWlCLENBQUMsTUFBYyxFQUFFLFdBQW1CO1FBQ3BELE1BQU0sU0FBUyxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGlCQUFRLENBQUMsQ0FBQztRQUMzRSxTQUFTLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBQyxHQUFHLEdBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNyRSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksbUJBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLENBQUM7WUFDN0csSUFBSSxDQUFDLFFBQVE7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0SSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRDtBQXZCRCx3QkF1QkMifQ==