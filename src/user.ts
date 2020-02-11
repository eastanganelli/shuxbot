//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
//#endregion
import { fbuser } from "./interfaces/users";
import { serverID } from "./config";
//#endregion

export class User {
    LVLs: Array<{ minLvl: number; maxLvl: number; roleLVL: string }> = [
        { minLvl: 5,  maxLvl: 10,  roleLVL: '675185452931874836' },
        { minLvl: 10, maxLvl: 15,  roleLVL: '675185597589225502' },
        { minLvl: 15, maxLvl: 20,  roleLVL: '675185648466133052' },
        { minLvl: 20, maxLvl: 25,  roleLVL: '675185689872039946' },
        { minLvl: 25, maxLvl: 30,  roleLVL: '675185738815373312' },
        { minLvl: 30, maxLvl: 35,  roleLVL: '675185783673454622' },
        { minLvl: 35, maxLvl: 40,  roleLVL: '675185839772270612' },
        { minLvl: 40, maxLvl: 500, roleLVL: '675185892276699141' },
    ];

    constructor(private dsclient: Discord.Client) {  }
    //#region User FNs
        lvlUP(uid: string) {
            this.getMyProfile(uid).then((myPoints: number|any) => {
                for(let i = 0; i < this.LVLs.length; i++) {
                    if(myPoints>=this.LVLs[i].minLvl && myPoints<this.LVLs[i].maxLvl) {
                        const myServer: Discord.Guild|any = this.dsclient.guilds.get(serverID);
                        const User_: Discord.GuildMember = myServer.fetchMember(uid);
                        User_.addRole(String(this.LVLs[i].roleLVL))
                    }
                }
            });
            
        }
    //#endregion
    //#region DB
        //#region GET
            getMyProfile(uid: string) {
                return new Promise((resolve, reject) => {
                    const userFB = firebase.database().ref('/users');
                    userFB.child(uid).once('value', snapshot => {
                        resolve({ points: snapshot.val().points, birth: snapshot.val().birth, report: snapshot.val().report, expulsiones: snapshot.val().expulsiones, urlbuild: snapshot.val().urlbuild });
                    }).catch(err => reject(err));
                });
            }
        //#endregion
        //#region SET
            setaddfc(uid: string, fecha: string){
                const userFB = firebase.database().ref('/users');
                userFB.child(uid).update({
                    birth: fecha
                });
            }
            setKick(uid: string) {
                firebase.database().ref('/users').child(uid).once('value', snapshot => {
                    firebase.database().ref('/users').child(uid).update({
                        expulsiones: snapshot.val().expulsiones + 1
                    });
                });
            }
            setPCBuilf(uid: string, url_: string) {
                const userFB = firebase.database().ref('/users');
                userFB.child(uid).update({
                    urlbuild: url_
                });
            }
        //#endregion
        //#region UPDATE

        //#endregion
        //#region DELETE

        //#endregion
    //#endregion
}