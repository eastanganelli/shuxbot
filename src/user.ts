//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
//#endregion
import { serverID } from "./config";
import { electos } from "./interfaces/elecciones";
import { fbuser, dbmee6 } from "./interfaces/users";
//#endregion
const Mee6LevelsApi = require("mee6-levels-api");

export class User {
    LVLs: Array<{ minLvl: number; maxLvl: number; roleLVL: string }> = [
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

    constructor(private dsclient: Discord.Client) {  }

    //#region User FNs
        lvlUP(uid: string) {
            this.getMyProfile(uid).then((myPoints: number|any) => {
                for(let i = 0; i < this.LVLs.length; i++) {
                    if(myPoints>=((this.LVLs[i].minLvl)*1000) && myPoints<((this.LVLs[i].maxLvl)*1000)) {
                        const myServer: Discord.Guild|any = this.dsclient.guilds.get(serverID);
                        const User_: Discord.GuildMember = myServer.fetchMember(uid);
                        if(!(User_.roles.has(String(this.LVLs[i].roleLVL)))) {
                            User_.addRole(String(this.LVLs[i].roleLVL));
                            if(User_.roles.has(String(this.LVLs[i-1].roleLVL))) User_.removeRole(String(this.LVLs[i].roleLVL));
                        }
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
    //#endregion
    //#region DB
        //#region GET
            getMyProfile(uid: string) {
                return new Promise((resolve, reject) => {
                    const userFB = firebase.database().ref('/users').child(uid);
                    userFB.once('value', snapshot => {
                        resolve({ points: snapshot.val().points, birth: snapshot.val().birth, warns: snapshot.val().warns, urlbuild: snapshot.val().urlbuild });
                    }).catch(err => reject(err));
                });
            }
        //#endregion
        //#region SET
            setPerfil(uid: string) {
                const userFB = firebase.database().ref('/users').child(uid);
                userFB.set({ birth: '-', points: 0, warns: 0, urlbuild: '-' });
            }
            setaddfc(uid: string, fecha: string){
                const userFB = firebase.database().ref('/users').child(uid);
                userFB.update({ birth: fecha });
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
            setWarn(uid: string) {
                firebase.database().ref('/users').child(uid).update({ warns: 1 });
            }
        //#endregion
        //#region UPDATE
        updateWarn(uid: string, addrm: string) {
            this.getMyProfile(uid).then((miPerfil: fbuser|any) => {
                console.log(miPerfil.warns);
                if((miPerfil.warns == 0 || miPerfil.warns == undefined || miPerfil.warns == NaN) && (addrm != '-')) {
                    this.setWarn(uid);
                    return;
                }
                {
                    let sum = miPerfil.warns;
                    switch(addrm) {
                        case '+': {
                            sum+=1;
                            break;
                        } case '-': {
                            if(sum > 0) sum-=1;
                            break;
                        }
                    }
                    firebase.database().ref('/users').child(uid).update({ warns: sum }); 
                }
            }).catch(() => {});
        }
        updatePoints(uid: string, points_: number) {
            this.getMyProfile(uid).then((miPerfil: fbuser|any) => {
                let sum = miPerfil.points + points_;
                firebase.database().ref('/users').child(uid).update({ points: sum }); 
            }).catch(() => {});
        }
        //#endregion
        //#region DELETE

        //#endregion
    //#endregion
}