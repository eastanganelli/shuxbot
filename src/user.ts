//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
//#endregion
import { fbuser } from "./interfaces/users";
//#endregion

export class User {
    constructor() {  }
    addfc(uid: string, fecha: string){
        const userFB = firebase.database().ref('/users');
        userFB.child(uid).update({
            birth: fecha
        });
    }
    getMyProfile(uid: string):fbuser {
        let aux = { points: 0, birth: '-', report: 0, expulsiones: 0 };
        const userFB = firebase.database().ref('/users');
        userFB.child(uid).once('value', snapshot => {
            aux = { points: snapshot.val().points, birth: snapshot.val().birth, report: snapshot.val().report, expulsiones: snapshot.val().expulsiones };
            return aux;
        });
        return aux;
    }
}