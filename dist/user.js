"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase/app");
require("firebase/database");
const config_1 = require("./config");
const _1 = require(".");
const Mee6LevelsApi = require("mee6-levels-api");
class User {
    constructor(dsclient) {
        this.dsclient = dsclient;
    }
    lvlUP(uid) {
        this.getMyProfile(uid).then((myPoints) => {
            for (let i = 0; i < config_1.LVLs.length; i++) {
                if (myPoints >= ((config_1.LVLs[i].minLvl) * 1000) && myPoints < ((config_1.LVLs[i].maxLvl) * 1000)) {
                    const myServer = this.dsclient.guilds.get(config_1.serverID);
                    const User_ = myServer.fetchMember(uid);
                    if (!(User_.roles.has(String(config_1.LVLs[i].roleLVL)))) {
                        User_.addRole(String(config_1.LVLs[i].roleLVL));
                        if (User_.roles.has(String(config_1.LVLs[i - 1].roleLVL)))
                            User_.removeRole(String(config_1.LVLs[i].roleLVL));
                    }
                }
            }
        });
    }
    eleccionesWinners() {
        const elecFB = firebase.database().ref('/elecciones');
        let votaciones = new Array(0);
        elecFB.once('value', snapshot => {
            snapshot.forEach(snap => {
                let auxElec = { idElecto: null, idVotantes: 0 };
                auxElec.idElecto = snap.key;
                snap.forEach(voto => {
                    auxElec.idVotantes++;
                });
                votaciones.push(auxElec);
            });
            this.ponsacMonthRol(votaciones);
        });
    }
    ponsacMonthRol(votos) {
    }
    listaTopUsers() {
        let ListaUsers = [];
        const shuxRoles = _1.dsclient.guilds.find('id', config_1.serverID);
        for (let i = (config_1.LVLs.length - 7); i < config_1.LVLs.length; i++) {
            const rolAux = shuxRoles.roles.find('id', config_1.LVLs[i].roleLVL);
            ListaUsers.push(rolAux.members.array());
        }
        return ListaUsers;
    }
    searchDeletedUser(users) {
        const shuxuser = this.dsclient.guilds.find('id', config_1.serverID);
        for (let i = 0; i < users.length; i++) {
            if (users[i].length > 0) {
                for (let j = 0; j < users[i].length; j++) {
                    const me = shuxuser.member(String(users[i][j]));
                    console.log(me);
                    if (!me) {
                        console.log('No esta en el server');
                    }
                }
            }
        }
    }
    createRole(clientID, name_, color_) {
        this.getMyProfile(clientID).then((miPerfil) => {
            console.log(miPerfil.customRole);
            if (miPerfil.customRole != '' || miPerfil.customRole == undefined || miPerfil.customRole == NaN) {
                const shuxServe = this.dsclient.guilds.find('id', config_1.serverID);
                shuxServe.createRole({ name: name_, color: color_ }).then((role_) => __awaiter(this, void 0, void 0, function* () {
                    yield role_.setPosition(17);
                    yield shuxServe.member(clientID).addRole(role_.id);
                    yield this.updateRole(clientID, role_.id);
                }));
            }
        }).catch(() => { });
    }
    getMyProfile(uid) {
        return new Promise((resolve, reject) => {
            const userFB = firebase.database().ref('/users').child(uid);
            userFB.once('value', snapshot => {
                resolve({ points: snapshot.val().points, birth: snapshot.val().birth, warns: snapshot.val().warns, urlbuild: snapshot.val().urlbuild });
            }).catch(err => reject(err));
        });
    }
    setPerfil(uid) {
        const userFB = firebase.database().ref('/users').child(uid);
        userFB.set({ birth: '-', points: 0, warns: 0, urlbuild: '-' });
    }
    setaddfc(uid, fecha) {
        const userFB = firebase.database().ref('/users').child(uid);
        userFB.update({ birth: fecha });
    }
    setPCBuilf(uid, url_) {
        const userFB = firebase.database().ref('/users').child(uid);
        userFB.update({
            urlbuild: url_
        });
    }
    setVoto(uidVoter, uidElector) {
        return new Promise((resolve, reject) => {
            if (isUserEnable(config_1.channelsTC.ciervos.roles, uidElector)) {
                const eleccionesFB = firebase.database().ref('/elecciones/staff');
                this.votoNoRep(uidVoter, eleccionesFB).then((res) => {
                    if (res == true) {
                        this.votoFn(uidVoter, (eleccionesFB.child(uidElector))).then((res) => { resolve(res); });
                    }
                }).catch((err) => { reject(err); });
            }
            else {
                const eleccionesFB = firebase.database().ref('/elecciones/user');
                this.votoNoRep(uidVoter, eleccionesFB).then((res) => {
                    if (res == true) {
                        this.votoFn(uidVoter, (eleccionesFB.child(uidElector))).then((res) => { resolve(res); });
                    }
                }).catch((err) => { reject(err); });
            }
        });
    }
    votoFn(uidVoter, eleccionesFB) {
        return new Promise((resolve, reject) => {
            let votantes = new Array(0);
            eleccionesFB.once('value', (snapshot) => {
                snapshot.forEach((item) => { votantes.push(item.val()); });
                votantes.push(uidVoter);
                if (votantes.length == 1) {
                    eleccionesFB.set(votantes).then(() => { resolve(config_1.listaPass.voto.info); });
                }
                else {
                    eleccionesFB.update(votantes).then(() => { resolve(config_1.listaPass.voto.info); });
                }
            }).catch((err) => { console.log(err); });
        });
    }
    votoNoRep(uidVoter, electos) {
        return new Promise((resolve, reject) => {
            electos.once('value', (snapshot) => {
                let contador = 0;
                snapshot.forEach((snap) => {
                    snap.forEach((item) => { if (item.val() == uidVoter)
                        contador++; });
                });
                if (contador >= 3) {
                    reject(config_1.listaErr.votoMulti.info);
                }
                else if (contador > 0 && contador < 3) {
                    reject(config_1.listaErr.votoRep.info);
                }
                resolve(true);
            });
        });
    }
    setWarn(uid) { firebase.database().ref('/users').child(uid).update({ warns: 1 }); }
    updateRole(uid, flag) {
        firebase.database().ref('/users').child(uid).update({ customRole: flag }).catch((err) => console.log(err));
    }
    updateWarn(uid, addrm) {
        this.getMyProfile(uid).then((miPerfil) => {
            console.log(miPerfil.warns);
            if ((miPerfil.warns == 0 || miPerfil.warns == undefined || miPerfil.warns == NaN) && (addrm != '-')) {
                this.setWarn(uid);
                return;
            }
            {
                let sum = miPerfil.warns;
                switch (addrm) {
                    case '+': {
                        sum += 1;
                        break;
                    }
                    case '-': {
                        if (sum > 0)
                            sum -= 1;
                        break;
                    }
                }
                firebase.database().ref('/users').child(uid).update({ warns: sum });
            }
        }).catch(() => { });
    }
    updatePoints(uid, points_) {
        this.getMyProfile(uid).then((miPerfil) => {
            let sum = miPerfil.points + points_;
            firebase.database().ref('/users').child(uid).update({ points: sum });
        }).catch(() => { });
    }
    deleteProfile(dsid) {
        firebase.database().ref('/users').child(dsid).remove();
    }
}
exports.User = User;
function isUserEnable(roles, userDSID) {
    var _a;
    const sv = _1.dsclient.guilds.get(config_1.serverID);
    for (let rol of roles) {
        if ((_a = sv.members.get(userDSID)) === null || _a === void 0 ? void 0 : _a.roles.has(rol))
            return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EseUNBQTJDO0FBQzNDLDZCQUEyQjtBQUUzQixxQ0FBMkU7QUFHM0Usd0JBQTZCO0FBRTdCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRWpELE1BQWEsSUFBSTtJQUViLFlBQW9CLFFBQXdCO1FBQXhCLGFBQVEsR0FBUixRQUFRLENBQWdCO0lBQUssQ0FBQztJQUc5QyxLQUFLLENBQUMsR0FBVztRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBb0IsRUFBRSxFQUFFO1lBQ2pELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqQyxJQUFHLFFBQVEsSUFBRSxDQUFDLENBQUMsYUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsR0FBQyxDQUFDLENBQUMsYUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0RSxNQUFNLFFBQVEsR0FBc0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFRLENBQUMsQ0FBQztvQkFDdkUsTUFBTSxLQUFLLEdBQXdCLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzdELElBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxh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QUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDNUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsU0FBUyxDQUFDLEdBQVc7UUFDakIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDRCxRQUFRLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDL0IsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQs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