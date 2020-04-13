"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase/app");
require("firebase/database");
const const_1 = require("./const");
class Juegos {
    constructor(dsclient) {
        this.dsclient = dsclient;
    }
    autoDelteChannel() {
        const shuxServe = this.dsclient.guilds.find('id', const_1.serverID);
        firebase.database().ref('/dynamicVTC').child('viciogame').once('value', snapshot => {
            snapshot.forEach(snap => {
                if (snap.exists()) {
                    const shuxchannel = shuxServe.channels.find('id', snap.val().vcid);
                    if ((shuxchannel.members.keyArray()).length <= 0 || shuxchannel.members == null) {
                        shuxchannel.delete();
                        firebase.database().ref('/dynamicVTC').child('viciogame').child(String(snap.key)).remove();
                    }
                }
            });
        });
    }
    creategameChannel(tcName, creatorName) {
        const shuxServe = this.dsclient.guilds.find('id', const_1.serverID);
        shuxServe.createChannel(creatorName + ' ' + tcName, "voice").then(channel => {
            let category = shuxServe.channels.find(c => c.id == const_1.channelsTC.vicioroom.category && c.type == "category");
            if (!category)
                throw new Error("Category channel does not exist");
            channel.setParent(category.id).then(() => { firebase.database().ref('/dynamicVTC').child('viciogame').push({ vcid: channel.id }); });
        }).catch(console.error);
    }
}
exports.Juegos = Juegos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVlZ29zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2p1ZWdvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUEyQztBQUMzQyw2QkFBMkI7QUFDM0IsbUNBQStDO0FBRS9DLE1BQWEsTUFBTTtJQUNsQixZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtJQUFLLENBQUM7SUFDbEQsZ0JBQWdCO1FBQ2YsTUFBTSxTQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZ0JBQVEsQ0FBQyxDQUFDO1FBQzNFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDbEYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsSUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLE1BQU0sV0FBVyxHQUE2QixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3RixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBRSxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sSUFBRSxJQUFJLEVBQUU7d0JBQzVFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDckIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDM0Y7aUJBQ0Q7WUFDRixDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBRUgsQ0FBQztJQUNELGlCQUFpQixDQUFDLE1BQWMsRUFBRSxXQUFtQjtRQUNwRCxNQUFNLFNBQVMsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxnQkFBUSxDQUFDLENBQUM7UUFDM0UsU0FBUyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUMsR0FBRyxHQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckUsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLGtCQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxDQUFDO1lBQzdHLElBQUksQ0FBQyxRQUFRO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUNsRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0NBQ0Q7QUF6QkQsd0JBeUJDIn0=