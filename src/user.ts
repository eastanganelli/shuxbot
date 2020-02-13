//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
//#endregion
import { serverID } from "./config";
import { electos } from "./interfaces/elecciones";
//#endregion
const Mee6LevelsApi = require("mee6-levels-api");

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
        eleccionesWinners() {
            const elecFB = firebase.database().ref('/elecciones');
            let votaciones: Array<electos> = new Array(0);
            elecFB.once('value', snapshot => {
                snapshot.forEach(snap => {
                    let auxElec: electos = { idElecto: null, idVotantes: 0 };
                    auxElec.idElecto = snap.key;
                    snap.forEach(voto => {
                        auxElec.idVotantes++;
                    }); votaciones.push(auxElec);
                }); this.ponsacMonthRol(votaciones);
            });
        }
        ponsacMonthRol(votos: Array<electos>) {
            //let ;
        }
        asignarlvls(dsID: string|any) {
            let LVLs: Array<{ minLvl: number; maxLvl: number; roleLVL: string }> = [
                { minLvl: 0,  maxLvl: 5,   roleLVL: '674086387510673414' },
                { minLvl: 5,  maxLvl: 10,  roleLVL: '675185452931874836' },
                { minLvl: 10, maxLvl: 15,  roleLVL: '675185597589225502' },
                { minLvl: 15, maxLvl: 20,  roleLVL: '675185648466133052' },
                { minLvl: 20, maxLvl: 25,  roleLVL: '675185689872039946' },
                { minLvl: 25, maxLvl: 30,  roleLVL: '675185738815373312' },
                { minLvl: 30, maxLvl: 35,  roleLVL: '675185783673454622' },
                { minLvl: 35, maxLvl: 40,  roleLVL: '675185839772270612' },
                { minLvl: 40, maxLvl: 500, roleLVL: '675185892276699141' },
            ];
        
            const SHUX: any|Discord.Guild = this.dsclient.guilds.get(serverID);
            const shuxMEM: Discord.GuildMember = SHUX.members.get(dsID);
        
            {
                for(let i = 1; i < LVLs.length; i++) {
                    if(shuxMEM.roles.has(LVLs[i].roleLVL)) { return false; }
                }
                shuxMEM.addRole(LVLs[0].roleLVL);
            }
        
            Mee6LevelsApi.getUserXp(serverID, dsID).then((meeUser: any) => {
                const kValue: number = 1000;
                for(let i = 0; i < LVLs.length; i++) {
                    if(meeUser.level>=LVLs[i].minLvl && meeUser.level<LVLs[i].maxLvl) { 
                        shuxMEM.addRole(LVLs[i].roleLVL);
                        firebase.database().ref('/users').child(dsID).update({ points: (meeUser.level)*kValue })
                        return true;
                    }
                } console.log(`${meeUser.tag} is at level ${meeUser.level} and rank ${meeUser.rank}.`);
            }).catch(() => {});
        }
    //#endregion
    //#region DB
        //#region GET
            getMyProfile(uid: string) {
                return new Promise((resolve, reject) => {
                    const userFB = firebase.database().ref('/users').child(uid);
                    userFB.once('value', snapshot => {
                        resolve({ points: snapshot.val().points, birth: snapshot.val().birth, report: snapshot.val().report, expulsiones: snapshot.val().expulsiones, urlbuild: snapshot.val().urlbuild });
                    }).catch(err => reject(err));
                });
            }
        //#endregion
        //#region SET
            setaddfc(uid: string, fecha: string){
                const userFB = firebase.database().ref('/users').child(uid);
                userFB.update({ birth: fecha });
            }
            setKick(uid: string) {
                firebase.database().ref('/users').child(uid).once('value', snapshot => {
                    firebase.database().ref('/users').child(uid).update({
                        expulsiones: snapshot.val().expulsiones + 1
                    });
                });
            }
            setPCBuilf(uid: string, url_: string) {
                const userFB = firebase.database().ref('/users').child(uid);
                userFB.update({
                    urlbuild: url_
                });
            }
            setVoto(uidVoter: string, uidElector: string) {
                const eleccionesFB = firebase.database().ref('/elecciones').child(uidElector);
                let votantes: Array<string> = new Array(0);
                eleccionesFB.once('value', snapshot => {
                    snapshot.forEach(item => {
                        votantes.push(item.val());
                    }); votantes.push(uidVoter);
                    eleccionesFB.update(votantes);
                }).catch(() => {
                    votantes.push(uidVoter);
                    eleccionesFB.set(votantes);
                });
            }
        //#endregion
        //#region UPDATE

        //#endregion
        //#region DELETE

        //#endregion
    //#endregion
}