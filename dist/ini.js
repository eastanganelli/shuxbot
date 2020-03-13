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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsNkJBQTJCO0FBQzNCLHlCQUF1QjtBQUN2QixxQ0FBOEQ7QUFDOUQsaUNBQThCO0FBQzlCLHFDQUFrQztBQUVsQyxNQUFhLE1BQU07SUFHbEIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFGNUMsY0FBUyxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGlCQUFRLENBQUMsQ0FBQztJQUVwQixDQUFDO0lBQ2xELFVBQVU7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsSUFBRyxpQkFBUSxFQUFFO1lBQ1osTUFBTSxTQUFTLEdBQTRCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsbUJBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTSxTQUFjLEVBQUUsRUFBRTtnQkFDekYsSUFBSSxNQUFNLEdBQWtCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDckQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFFLGlCQUFRLENBQUMsQ0FBQztnQkFBQyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDdkcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGtC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