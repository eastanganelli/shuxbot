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
const const_1 = require("./const");
const _1 = require(".");
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
    asignarViejosMiembros() {
        const usuariosShux = this.shuxServe.members.array();
        let i = 0;
        setInterval(() => {
            for (let miLvl of const_1.LVLs) {
                if (usuariosShux[i].roles.has(miLvl.roleLVL)) {
                    usuariosShux[i].addRole('700343155593183255').catch(() => { });
                    break;
                }
            }
            i++;
            console.log(i, ' de ', usuariosShux.length);
        }, 1000);
    }
    changeLVL(uid) {
        this.getMyProfile(uid).then((snapshot) => {
            const usuario = snapshot;
            if (usuario.points == null)
                return;
            let userShux = this.shuxServe.member(uid);
            let subeNivel = lvlUP(usuario.points, userShux.roles.keyArray());
            if (subeNivel.newLVL && subeNivel.idLVL != subeNivel.oldLVL) {
                if (!(userShux.roles.has(subeNivel.idLVL))) {
                    userShux.addRole(subeNivel.idLVL).then(() => {
                        userShux.removeRole(subeNivel.oldLVL);
                    });
                }
            }
            return;
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
                resolve(snapshot.exportVal());
            }).catch(err => reject(err));
        });
    }
    setPerfil(uid) {
        const userFB = firebase.database().ref('/users').child(uid);
        userFB.set({ birth: '-', points: 0, warns: 0 });
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
    setTicketTC(uid, tipo_) {
        const userFB = firebase.database().ref('/users').child(uid);
        switch (tipo_) {
            case 'SUPP': {
                userFB.update({ supTicket: true });
                break;
            }
            case 'STAFF': {
                userFB.update({ staffTicket: true });
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
        this.getMyProfile(uid).then((snap) => {
            let sum = points_, miPerfil = snap;
            if (miPerfil.points != null) {
                sum += miPerfil.points;
            }
            firebase.database().ref('/users').child(uid).update({ points: sum });
            this.changeLVL(uid);
        }).catch(() => { });
    }
    deleteTicket(uid, tipo_) {
        const userFB = firebase.database().ref('/users').child(uid);
        switch (tipo_) {
            case 'SUPP': {
                userFB.update({ supTicket: false });
                break;
            }
            case 'STAFF': {
                userFB.update({ staffTicket: false });
                break;
            }
        }
    }
    deleteProfile(dsid) {
        const userData = firebase.database().ref('/users').child(dsid).remove();
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
function lvlUP(userPoints, roles_) {
    let actualLVL = '-';
    for (let lvls_ of const_1.LVLs) {
        for (let myLvl of roles_) {
            if (myLvl == lvls_.roleLVL) {
                actualLVL = lvls_.roleLVL;
                break;
            }
        }
    }
    for (let lvls_ of const_1.LVLs) {
        if (userPoints >= (lvls_.minLvl * 1000) && userPoints < (lvls_.maxLvl * 1000)) {
            return { newLVL: true, idLVL: lvls_.roleLVL, oldLVL: actualLVL };
        }
    }
    return { newLVL: false, idLVL: '-', oldLVL: '-' };
}
function updateDB() {
    firebase.database().ref('/users').on('value', snapshot => {
        snapshot.forEach(snap => {
            console.log(snap.exportVal());
        });
    });
}
exports.updateDB = updateDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EseUNBQXlDO0FBQ3pDLDZCQUEyQjtBQUUzQixtQ0FBMEU7QUFHMUUsd0JBQTZCO0FBRzdCLE1BQWEsSUFBSTtJQUdiLFlBQW9CLFFBQXdCO1FBQXhCLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBRi9DLGNBQVMsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxnQkFBUSxDQUFDLENBQUM7SUFFakIsQ0FBQztJQUV4QyxRQUFRLENBQUMsR0FBVzs7WUFDNUIsTUFBTSxNQUFNLEdBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckUsTUFBTSxRQUFRLEdBQWtCO2dCQUM1QixpRkFBaUY7Z0JBQ2pGLCtHQUErRzthQUNsSCxDQUFDO1lBQ0YsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLHFIQUFxSCxDQUFDLENBQUM7WUFDekksS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJ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