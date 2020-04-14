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
            this.changeLVL(uid);
        }).catch(() => { });
    }
    deleteProfile(dsid) {
        const userData = firebase.database().ref('/users').child(dsid).remove();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EseUNBQTJDO0FBQzNDLDZCQUEyQjtBQUUzQixtQ0FBMEU7QUFHMUUsd0JBQTZCO0FBRzdCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRWpELE1BQWEsSUFBSTtJQUdiLFlBQW9CLFFBQXdCO1FBQXhCLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBRi9DLGNBQVMsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxnQkFBUSxDQUFDLENBQUM7SUFFakIsQ0FBQztJQUV4QyxRQUFRLENBQUMsR0FBVzs7WUFDNUIsTUFBTSxNQUFNLEdBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckUsTUFBTSxRQUFRLEdBQWtCO2dCQUM1QixpRkFBaUY7Z0JBQ2pGLCtHQUErRzthQUNsSCxDQUFDO1lBQ0YsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLHFIQUFxSCxDQUFDLENBQUM7WUFDekksS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUMsS0FBSyxF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LENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDMU4sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsU0FBUyxDQUFDLEdBQVc7UUFDakIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDRCxRQUFRLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDL0IsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFF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