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
const Discord = require("discord.js");
const firebase = require("firebase/app");
require("firebase/database");
const const_1 = require("./const");
const _1 = require(".");
const lvlsexport_1 = require("./lvlsexport");
const Mee6LevelsApi = require("mee6-levels-api");
class User {
    constructor(dsclient) {
        this.dsclient = dsclient;
        this.shuxServe = this.dsclient.guilds.find('id', const_1.serverID);
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
            for (let i = 0; i < const_1.LVLs.length; i++) {
                if (myPoints >= ((const_1.LVLs[i].minLvl) * 1000) && myPoints < ((const_1.LVLs[i].maxLvl) * 1000)) {
                    const myServer = this.dsclient.guilds.get(const_1.serverID);
                    const User_ = myServer.fetchMember(uid);
                    if (!(User_.roles.has(String(const_1.LVLs[i].roleLVL)))) {
                        User_.addRole(String(const_1.LVLs[i].roleLVL));
                        if (User_.roles.has(String(const_1.LVLs[i - 1].roleLVL)))
                            User_.removeRole(String(const_1.LVLs[i].roleLVL));
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
        const shuxRoles = _1.dsclient.guilds.find('id', const_1.serverID);
        for (let i = (const_1.LVLs.length - 7); i < const_1.LVLs.length; i++) {
            const rolAux = shuxRoles.roles.find('id', const_1.LVLs[i].roleLVL);
            ListaUsers.push(rolAux.members.array());
        }
        this.searchDeletedUser(ListaUsers);
        return ListaUsers;
    }
    searchDeletedUser(users) {
        const shuxuser = this.dsclient.guilds.find('id', const_1.serverID);
        for (let i = 0; i < users.length; i++) {
            if (users[i].length > 0) {
                for (let j = 0; j < users[i].length; j++) {
                    const me = shuxuser.member(String(users[i][j]));
                    if (!me) {
                    }
                }
            }
        }
    }
    createRole(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = this.shuxServe.members.find('id', uid);
            let roles_ = new Array(0);
            for (let i = const_1.LVLs.length - 5; i < const_1.LVLs.length; i++) {
                roles_.push(const_1.LVLs[i].roleLVL);
            }
            if (isUserEnable(roles_, uid)) {
                const listPreg = [
                    'Por favor, ingrese su nombre de Rol\nSi desea cancelar -> #cancelar',
                    'Por favor, ingresar el color (**Formato #COLOR** -> usar ColorPicker en Google)'
                ];
                let flag = false;
                let datos_ = new Array(0);
                console.log(listPreg.length);
                for (let i = 0; i < listPreg.length && !flag; i++) {
                    yield author.send(listPreg[i]);
                    yield author.user.dmChannel.awaitMessages((m) => uid == m.author.id, { max: 1, time: 130000, errors: ['TIME'] }).then((collected) => __awaiter(this, void 0, void 0, function* () {
                        if (collected.first().content == '#cancelar') {
                            author.send('Se ha quedado sin tiempo!!\nVuelva a empezar');
                            flag = true;
                        }
                        else {
                            console.log(collected.first().content);
                            yield datos_.push(collected.first().content);
                        }
                    })).catch((err) => { author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                }
                this.getMyProfile(uid).then((miPerfil) => {
                    if (miPerfil.customRole != '' || miPerfil.customRole == undefined || miPerfil.customRole == NaN) {
                        this.shuxServe.createRole({ name: String(datos_[0]), color: String(datos_[1]) }).then((role_) => __awaiter(this, void 0, void 0, function* () {
                            console.log('cree y entre');
                            yield role_.setPosition(17);
                            yield this.shuxServe.member(uid).addRole(role_.id);
                            yield this.updateRole(uid, role_.id);
                            yield author.send('Su ROL ya fue creado!!\nSaludos, SHUX');
                        }));
                    }
                    else {
                        author.send('Ya posee un rol, solicite un ticket reporte si quiere eliminarlo o modificarlo!!\nSaludos, SHUX');
                    }
                }).catch(() => { });
            }
            else {
                yield author.send('No posee rango para crear un rol, debe tener minimo LVL 20!!\nSaludos, SHUX');
            }
        });
    }
    getMyProfile(uid) {
        return new Promise((resolve, reject) => {
            const userFB = firebase.database().ref('/users').child(uid);
            userFB.once('value', snapshot => {
                resolve({ points: snapshot.val().points, birth: snapshot.val().birth, warns: snapshot.val().warns, urlbuild: snapshot.val().urlbuild, supTicket: snapshot.val().supTicket, staffTicket: snapshot.val().staffTicket });
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
            if (isUserEnable(const_1.channelsTC.ciervos.roles, uidElector)) {
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
    setTicketTC(uid, tcID, tipo_) {
        const userFB = firebase.database().ref('/users').child(uid);
        switch (tipo_) {
            case 'SUPP': {
                userFB.update({ supTicket: tcID });
                break;
            }
            case 'STAFF': {
                userFB.update({ staffTicket: tcID });
                break;
            }
        }
    }
    votoFn(uidVoter, eleccionesFB) {
        return new Promise((resolve, reject) => {
            let votantes = new Array(0);
            eleccionesFB.once('value', (snapshot) => {
                snapshot.forEach((item) => { votantes.push(item.val()); });
                votantes.push(uidVoter);
                if (votantes.length == 1) {
                    eleccionesFB.set(votantes).then(() => { resolve(const_1.listaPass.voto.info); });
                }
                else {
                    eleccionesFB.update(votantes).then(() => { resolve(const_1.listaPass.voto.info); });
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
                    reject(const_1.listaErr.votoMulti.info);
                }
                else if (contador > 0 && contador < 3) {
                    reject(const_1.listaErr.votoRep.info);
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
            let sum = points_;
            if (miPerfil.points != null) {
                sum += miPerfil.points;
            }
            firebase.database().ref('/users').child(uid).update({ points: sum });
        }).catch(() => { });
    }
    deleteProfile(dsid) {
        const userData = firebase.database().ref('/users').child(dsid);
        userData.child('points').remove();
        userData.child('birth').remove();
        userData.child('staffTicket').remove();
        userData.child('supTicket').remove();
        userData.child('roles').remove();
        userData.child('urlbuild').remove();
        userData.once('value', snapshot => {
            var _a, _b;
            let user_ = snapshot.val();
            if (user_.customRole.length > 0) {
                (_a = this.shuxServe.roles.get(String(user_.customRole))) === null || _a === void 0 ? void 0 : _a.delete().then(() => {
                    userData.child('customRole').remove();
                });
            }
            if (user_.customChat.length > 0) {
                for (let channel_ of user_.customRole) {
                    (_b = this.shuxServe.channels.get(String(channel_))) === null || _b === void 0 ? void 0 : _b.delete();
                }
                userData.child('customChat').remove();
            }
        });
    }
    deleteTicket(uid, tipo_) {
        const userFB = firebase.database().ref('/users').child(uid);
        switch (tipo_) {
            case 'SUPP': {
                userFB.child('supTicket').remove();
                break;
            }
            case 'STAFF': {
                userFB.child('staffTicket').remove();
                break;
            }
        }
    }
}
exports.User = User;
function isUserEnable(roles, userDSID) {
    var _a;
    const sv = _1.dsclient.guilds.find('id', const_1.serverID);
    for (let rol of roles) {
        if ((_a = sv.members.find('id', userDSID)) === null || _a === void 0 ? void 0 : _a.roles.has(rol))
            return true;
    }
    return false;
}
function transferLvl() {
    return __awaiter(this, void 0, void 0, function* () {
        const DScliente = new Discord.Client();
        console.log(DScliente.guilds.find('id', const_1.serverID));
        for (let users_ of lvlsexport_1.Players) {
            for (let player_ of lvlsexport_1.Players) {
            }
        }
    });
}
exports.transferLvl = transferLvl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsc0NBQXlDO0FBQ3pDLHlDQUEyQztBQUMzQyw2QkFBMkI7QUFFM0IsbUNBQTBFO0FBRzFFLHdCQUE2QjtBQUM3Qiw2Q0FBdUM7QUFFdkMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFakQsTUFBYSxJQUFJO0lBR2IsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFGL0MsY0FBUyxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGdCQUFRLENBQUMsQ0FBQztJQUVqQixDQUFDO0lBR3hDLFFBQVEsQ0FBQyxHQUFXOztZQUM1QixNQUFNLE1BQU0sR0FBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyRSxNQUFNLFFBQVEsR0FBa0I7Z0JBQzVCLGlGQUFpRjtnQkFDakYsK0dBQStHO2FBQ2xILENBQUM7WUFDRixNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMscUhBQXFILENBQUMsQ0FBQztZQUN6SSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUs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