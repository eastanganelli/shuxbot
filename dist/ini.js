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
require("firebase/auth");
const config_1 = require("./config");
const user_1 = require("./user");
const juegos_1 = require("./juegos");
const fetch = require('node-fetch');
class IniBOT {
    constructor(dsclient) {
        this.dsclient = dsclient;
        this.shuxServe = this.dsclient.guilds.find('id', config_1.serverID);
    }
    iniLoading() {
        console.log('>>LOADING BOT...');
        if (config_1.TESTMode) {
            const ShuxDevTC = this.shuxServe.channels.find('id', config_1.channelsTC.shuxestado.idTC);
            ShuxDevTC.fetchMessage(String(config_1.channelsTC.shuxestado.msg[0])).then((estadoMSG) => __awaiter(this, void 0, void 0, function* () {
                let ESTADO = new Array(0);
                yield estadoMSG.edit('>>**INICIANDO SERVICIOS** - ');
                yield console.log('>>>>>DEBUG MODE:' + config_1.TESTMode);
                yield estadoMSG.edit('>>**INICIANDO SERVICIOS**\t -');
                yield ESTADO.push('>>ESTADO DEBUG: ' + config_1.TESTMode);
                yield estadoMSG.edit('>>**INICIANDO SERVICIOS**\t \ ');
                yield firebase.auth().signInWithEmailAndPassword(config_1.db.user, config_1.db.pass).then(() => {
                    console.log('>>>>>BOT DB Connected');
                    estadoMSG.edit('>>**INICIANDO SERVICIOS\t |**');
                    ESTADO.push('>>ESTADO DB: conectado');
                    estadoMSG.edit('>>**INICIANDO SERVICIOS**\t / ');
                }).catch((Err) => {
                    console.log('>>>>>DB STATE ' + Err);
                    estadoMSG.edit('>>**INICIANDO SERVICIOS\t -**');
                    ESTADO.push('>>ESTADO DB: ' + Err);
                    estadoMSG.edit('>>**INICIANDO SERVICIOS**\t \ ');
                });
                yield this.botDataRefresh();
                yield ESTADO.push('>>RANKING: cargado');
                yield estadoMSG.edit('>>**INICIANDO SERVICIOS**\t | ');
                yield ESTADO.push('\n>>**CARGA FINALIZADA**');
                yield estadoMSG.edit('>>**INICIANDO SERVICIOS**\t - ');
                yield console.log('>>LOAD FINISH');
                yield ESTADO.push('>>**BOT ENCENDIDO!!!**');
                yield console.log('>>BOT READY TO GO');
                yield estadoMSG.edit(ESTADO);
            }));
        }
        else {
            const ShuxDevTC = this.shuxServe.channels.find('id', config_1.channelsTC.shuxestado.idTC);
            ShuxDevTC.fetchMessage(config_1.channelsTC.shuxestado.msg[0]).then((estadoMSG) => __awaiter(this, void 0, void 0, function* () {
                yield estadoMSG.edit('>>**INICIANDO SERVICIOS**');
                yield firebase.auth().signInWithEmailAndPassword(config_1.db.user, config_1.db.pass).catch((Err) => {
                });
                yield this.botDataRefresh();
                yield estadoMSG.edit('>>**BOT ENCENDIDO!!!**');
            }));
        }
    }
    botDataRefresh() {
        const usrRanking = (new user_1.User(this.dsclient)).listaTopUsers();
        const lvls = ['LVL 10', 'LVL 15', 'LVL 20', 'LVL 25', 'LVL 30', 'LVL 35', 'LVL 40'];
        const msgRank = this.shuxServe.channels.find('id', config_1.channelsTC.shuxestado.idTC);
        msgRank.fetchMessage(config_1.channelsTC.shuxestado.msg[config_1.channelsTC.shuxestado.msg.length - 1]).then((rankMSg) => __awaiter(this, void 0, void 0, function* () {
            let msg = new Discord.RichEmbed();
            msg.setTitle('**RANKING**').setDescription('se actualiza cada 4 min').setColor('0xFFD700');
            for (let i = (usrRanking.length - 1); i >= 0; i--) {
                let values_ = new Array(0);
                if (usrRanking[i].length > 0) {
                    for (let j = 0; j < usrRanking[i].length; j++) {
                        if (usrRanking[i][j].user.username != '') {
                            values_.push(usrRanking[i][j].user.username);
                        }
                    }
                }
                else {
                    values_.push('Sin usuarios');
                }
                msg.addField(lvls[i], values_, false);
            }
            yield rankMSg.edit(msg);
        }));
    }
    agregarReaccionesAmsgs() {
        const msgToReact = this.shuxServe.channels.find('id', '');
        msgToReact.fetchMessage('').then((msg) => __awaiter(this, void 0, void 0, function* () {
            yield msg.react("");
        }));
    }
}
exports.IniBOT = IniBOT;
function intervals(dsclient) {
    setInterval(() => {
        const init = new IniBOT(dsclient);
        init.botDataRefresh();
        (new juegos_1.Juegos(dsclient)).autoDelteChannel();
    }, 300000);
}
exports.intervals = intervals;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsNkJBQTJCO0FBQzNCLHlCQUF1QjtBQUN2QixxQ0FBOEQ7QUFDOUQsaUNBQThCO0FBQzlCLHFDQUFrQztBQUNsQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFcEMsTUFBYSxNQUFNO0lBR2xCLFlBQW9CLFFBQXdCO1FBQXhCLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBRjVDLGNBQVMsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxpQkFBUSxDQUFDLENBQUM7SUFFcEIsQ0FBQztJQUNsRCxVQUFVO1FBRVQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLElBQUcsaUJBQVEsRUFBRTtZQUNaLE1BQU0sU0FBUyxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLG1CQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU0sU0FBYyxFQUFFLEVBQUU7Z0JBQ3pGLElBQUksTUFBTSxHQUFrQixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQ3JELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRSxpQkFBUSxDQUFDLENBQUM7Z0JBQUMsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLCtCQUEr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