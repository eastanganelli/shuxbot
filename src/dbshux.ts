import * as firebase from "firebase/app";
import 'firebase/auth';
import "firebase/database";
import { firebaseConfig, db } from "./config";
import { fbuser } from "./interfaces/users";

let app: firebase.app.App = firebase.initializeApp(firebaseConfig);

export function iniDB() {
        firebase.auth().signInWithEmailAndPassword(db.user, db.pass).then(() => { console.log('BOT DB Connected') }).catch(Err => { console.log(Err); });
    }
//#region GETs
    export function getUser(dsID: string|number) {
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
    export function getUsers() {
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
    export function getUserPoints(dsID: string|number) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('/users').child(String(dsID)).once('value', snpashot => {
                resolve(snpashot.val().points);
            }).catch(err => reject(err));
        });
    }
    export function getUserReports(dsID: string|number) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('/users').child(String(dsID)).child('report').once('value', snapshot => {
                resolve(snapshot.val());
            }).catch(err => reject(err));
        });
    }
    export function getAllVOTA() {
        return new Promise((resolve, reject) => {
            let votos_: Array<{ electorID: string|number; counts: number }> = new Array(0);
            firebase.database().ref('/votaciones').once('value', snapshot => {
                const aux: Array<any> = snapshot.val().dsIDs;
                votos_.push({ electorID: String(snapshot.key), counts: aux.length });
            }).then(() => resolve(votos_)). catch(err => reject(err));
        });
    }
    export function getElectorVotos(dsID: string|number) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('/votaciones')
        });
    }
//#endregion
//#region PUTs
    export function setUserProfile(dsID: string|number) {
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
    export function updatePOINTS(dsID: string|number, _points: number) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('/users').child(String(dsID)).child('points').update(_points).then(() => resolve('DONE')).catch(err => reject(err));
        });
    }
    export function updateFC(dsID: string|number, _fec: string) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('/users').child(String(dsID)).child('birth').update(_fec).then(() => resolve('DONE')).catch(err => reject(err));
        });
    }
    export function updateVOTA(dsID: string|number, miID: string|number) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('/votaciones').child(String(dsID))
        });
    }
//#endregion
//#region DELETEs

//#endregion