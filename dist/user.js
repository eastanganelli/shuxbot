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
        this.shuxServe = this.dsclient.guilds.find('id', config_1.serverID);
    }
    miPerfil(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = this.shuxServe.members.find('id', uid);
            const listPreg = [
                'Por favor, ingrese su fecha de cumpleaños\n**FORMATO: DIA/MES* - ejemplo: 31/5*',
                'Por favor, ingresa su URL del build de PicPartPicker\nSi no posee un enlace, vaya a https://pcpartpicker.com/'
            ];
            yield author.send('A continuación, podrá editar su perfil\n#cancelar :: terminar carga | #siguiente :: para saltear -- Tiene 5 minutos');
            for (let i = 0; i < listPreg.length; i++) {
                yield author.send(listPreg[i]);
                yield author.user.dmChannel.awaitMessages((m) => author.id == m.author.id, { max: 1, time: 5 * 60000, errors: ['TIME'] }).then((collected) => {
                    if (collected.first().content == '#cancelar') {
                        author.send('La carga fue cancelada,\nSaludos SHUX');
                        return 0;
                    }
                    else if (collected.first().content == '#siguiente') {
                    }
                    else {
                        switch (i) {
                            case 0: {
                                this.setaddfc(uid, collected.first().content);
                                break;
                            }
                            case 1: {
                                this.setPCBuilf(uid, collected.first().content);
                                break;
                            }
                        }
                    }
                }).catch((err) => { author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
            }
            yield author.send('La carga fue finalizada,\nSaludos SHUX');
        });
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
    updateTicket(uid = '-', channelID) {
        const updateTicket = firebase.database().ref('/users');
        if (uid == '-') {
            updateTicket.once('value', snapshot => {
                snapshot.forEach(snap => {
                    if (snap.val().customTicket == channelID)
                        updateTicket.child(String(snap.key)).child('customTicket').remove();
                });
            });
        }
        else {
            updateTicket.child(uid).update({ customTicket: channelID });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EseUNBQTJDO0FBQzNDLDZCQUEyQjtBQUUzQixxQ0FBMkU7QUFHM0Usd0JBQTZCO0FBRTdCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRWpELE1BQWEsSUFBSTtJQUdiLFlBQW9CLFFBQXdCO1FBQXhCLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBRi9DLGNBQVMsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxpQkFBUSxDQUFDLENBQUM7SUFFakIsQ0FBQztJQUd4QyxRQUFRLENBQUMsR0FBVzs7WUFDNUIsTUFBTSxNQUFNLEdBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckUsTUFBTSxRQUFRLEdBQWtCO2dCQUM1QixpRkFBaUY7Z0JBQ2pGLCtHQUErRzthQUNsSCxDQUFDO1lBQ0YsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLHFIQUFxSCxDQUFDLENBQUM7WUFDekksS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUMsS0FBSyxF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