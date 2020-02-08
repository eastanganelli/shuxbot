import * as firebase from "firebase/app";
import 'firebase/auth';
import "firebase/database";
import { fbuser } from "./interfaces/users";

export class DBshux {
    constructor() {  }
    //#region GETs
        getUser(dsID: string|number) {
            return new Promise((resolve, reject) => {
                firebase.database().ref('/users').child(String(dsID)).once('value', snapshot => {
                    snapshot.forEach(snap => {
                        resolve({
                            duid: dsID,
                            points: snap.val().points,
                            birth: snap.val().birth,
                            report: snap.val().report,
                            expulsiones: snap.val().expulsiones
                        });
                    });
                }).catch(err => reject(err));
            });
        }
        getUsers() {
            let usuarios: Array<fbuser> = new Array(0);
            return new Promise((resolve, reject) => {
                firebase.database().ref('/users').once('value', snapshot => {
                    snapshot.forEach(snap => {
                        usuarios.push({
                            points: snap.val().points,
                            birth: snap.val().birth,
                            report: snap.val().report,
                            expulsiones: snap.val().expulsiones
                        })
                    });
                    resolve(usuarios);
                }).catch(err => reject(err));
            });
        }
        getUserPoints(dsID: string|number) {
            return new Promise((resolve, reject) => {
                firebase.database().ref('/users').child(String(dsID)).once('value', snpashot => {
                    resolve(snpashot.val().points);
                }).catch(err => reject(err));
            });
        }
        getUserReports(dsID: string|number) {
            return new Promise((resolve, reject) => {
                firebase.database().ref('/users').child(String(dsID)).child('report').once('value', snapshot => {
                    resolve(snapshot.val());
                }).catch(err => reject(err));
            });
        }
        getAllVOTA() {
            return new Promise((resolve, reject) => {
                let votos_: Array<{ electorID: string|number; counts: number }> = new Array(0);
                firebase.database().ref('/votaciones').once('value', snapshot => {
                    const aux: Array<any> = snapshot.val().dsIDs;
                    votos_.push({ electorID: String(snapshot.key), counts: aux.length });
                }).then(() => resolve(votos_)). catch(err => reject(err));
            });
        }
        getElectorVotos(dsID: string|number) {
            /* return new Promise((resolve, reject) => {
                firebase.database().ref('/votaciones')
            }); */
        }
    //#endregion
    //#region PUTs
        setUserProfile(dsID: string|number) {
            return new Promise((resolve, reject) => {
                const newProfile: fbuser = {
                    points: 0,
                    birth: '1/1/1',
                    report: 0,
                    expulsiones: 0
                }
                firebase.database().ref('/users').child(String(dsID)).set(newProfile).then(() => resolve('LOADED')).catch(err => reject(err));
            });
        }
    //#endregion
    //#region UPDATEs
        updatePOINTS(dsID: string|number, _points: number) {
            return new Promise((resolve, reject) => {
                firebase.database().ref('/users').child(String(dsID)).child('points').update(_points).then(() => resolve('DONE')).catch(err => reject(err));
            });
        }
        updateFC(dsID: string|number, _fec: string) {
            return new Promise((resolve, reject) => {
                firebase.database().ref('/users').child(String(dsID)).child('birth').update(_fec).then(() => resolve('DONE')).catch(err => reject(err));
            });
        }
        updateVOTA(dsID: string|number, miID: string|number) {
            return new Promise((resolve, reject) => {
                firebase.database().ref('/votaciones').child(String(dsID))
            });
        }
    //#endregion
    //#region DELETEs

    //#endregion
}