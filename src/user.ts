//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
//#endregion
import { serverID, listaErr, listaPass, channelsTC, LVLs } from "./config";
import { electos } from "./interfaces/elecciones";
import { fbuser } from "./interfaces/users";
import { dsclient } from ".";
//#endregion
const Mee6LevelsApi = require("mee6-levels-api");

export class User {

    constructor(private dsclient: Discord.Client) {  }

    //#region User FNs
        lvlUP(uid: string) {
            this.getMyProfile(uid).then((myPoints: number|any) => {
                for(let i = 0; i < LVLs.length; i++) {
                    if(myPoints>=((LVLs[i].minLvl)*1000) && myPoints<((LVLs[i].maxLvl)*1000)) {
                        const myServer: Discord.Guild|any = this.dsclient.guilds.get(serverID);
                        const User_: Discord.GuildMember = myServer.fetchMember(uid);
                        if(!(User_.roles.has(String(LVLs[i].roleLVL)))) {
                            User_.addRole(String(LVLs[i].roleLVL));
                            if(User_.roles.has(String(LVLs[i-1].roleLVL))) User_.removeRole(String(LVLs[i].roleLVL));
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
        listaTopUsers(): Array<Array<any>> {
            let ListaUsers: Array<Array<any>> = []
            const shuxRoles: Discord.Guild|any = dsclient.guilds.find('id', serverID);
            for(let i = (LVLs.length-7); i < LVLs.length; i++) {
                const rolAux:Discord.Role = shuxRoles.roles.find('id', LVLs[i].roleLVL);
                ListaUsers.push(rolAux.members.array());
            }  
            //this.searchDeletedUser(ListaUsers);
            return ListaUsers;
        }
        searchDeletedUser(users: Array<Array<string>>) {
            const shuxuser: Discord.Guild|any = this.dsclient.guilds.find('id', serverID);
            for(let i=0; i<users.length; i++){
                if(users[i].length>0) {
                    for(let j=0; j<users[i].length; j++) {
                        const me: Discord.GuildMember = shuxuser.member(String(users[i][j]));
                        console.log(me)
                        if(!me) { console.log('No esta en el server'); }
                    }
                }
            }
        }
        createRole(clientID: string, name_: string, color_: string) {
            this.getMyProfile(clientID).then((miPerfil: fbuser|any) => {
                console.log(miPerfil.customRole)
                if(miPerfil.customRole!='' || miPerfil.customRole==undefined || miPerfil.customRole==NaN) {
                    const shuxServe: Discord.Guild = this.dsclient.guilds.find('id', serverID);
                    shuxServe.createRole({ name: name_, color: color_ }).then(async(role_) => {
                        await role_.setPosition(17);
                        await shuxServe.member(clientID).addRole(role_.id);
                        await this.updateRole(clientID, role_.id);
                    });
                }
            }).catch(() => {});
            
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
                return new Promise((resolve, reject) => {
                    if(isUserEnable(channelsTC.ciervos.roles, uidElector)) {
                        const eleccionesFB = firebase.database().ref('/elecciones/staff');
                        this.votoNoRep(uidVoter, eleccionesFB).then((res) => {
                            if(res==true) { this.votoFn(uidVoter, (eleccionesFB.child(uidElector))).then((res: any) => { resolve(res); }); }
                        }).catch((err) => { reject(err) });
                    } else {
                        const eleccionesFB = firebase.database().ref('/elecciones/user');
                        this.votoNoRep(uidVoter, eleccionesFB).then((res) => {
                            if(res==true) { this.votoFn(uidVoter, (eleccionesFB.child(uidElector))).then((res: any) => { resolve(res); }); }
                        }).catch((err) => { reject(err); });
                    }
                });
            }
            //#region VOTO
                votoFn(uidVoter: string, eleccionesFB: any) {
                    return new Promise((resolve, reject) => {
                        let votantes: Array<string> = new Array(0);
                        eleccionesFB.once('value', (snapshot: any) => {
                            snapshot.forEach((item: any) => { votantes.push(item.val()); }); 
                            votantes.push(uidVoter);
                            if(votantes.length == 1) { eleccionesFB.set(votantes).then(() => { resolve(listaPass.voto.info); }); }
                            else { eleccionesFB.update(votantes).then(() => { resolve(listaPass.voto.info); }); }
                        }).catch((err: any) => { console.log(err); });
                    });
                }
                votoNoRep(uidVoter: string, electos: any) {
                    return new Promise((resolve, reject) => {
                        electos.once('value', (snapshot: any) => {
                            let contador = 0;
                            snapshot.forEach((snap: any) => {
                                snap.forEach((item: any) => { if(item.val() == uidVoter) contador++; }); 
                            });
                            if(contador>=3) { reject(listaErr.votoMulti.info); }
                            else if(contador>0 && contador<3) { reject(listaErr.votoRep.info); }
                            resolve(true)
                        });
                    });
                }
            //#endregion
            setWarn(uid: string) { firebase.database().ref('/users').child(uid).update({ warns: 1 }); }
        //#endregion
        //#region UPDATE
        updateRole(uid: string, flag: string) {
            firebase.database().ref('/users').child(uid).update({ customRole: flag }).catch((err: any) => console.log(err));
        }
        updateWarn(uid: string, addrm: string) {
            this.getMyProfile(uid).then((miPerfil: fbuser|any) => {
                console.log(miPerfil.warns);
                if((miPerfil.warns==0 || miPerfil.warns==undefined || miPerfil.warns==NaN) && (addrm != '-')) {
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
            deleteProfile(dsid: string) {
                firebase.database().ref('/users').child(dsid).remove();
            }
        //#endregion
    //#endregion
}
function isUserEnable(roles: Array<string>, userDSID: string): boolean {
    const sv: Discord.Guild|any = dsclient.guilds.get(serverID);
    for(let rol of roles) {
        if(sv.members.get(userDSID)?.roles.has(rol)) return true;
    } return false;
}