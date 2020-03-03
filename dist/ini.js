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
class IniBOT {
    constructor(dsclient) {
        this.dsclient = dsclient;
        this.iniLoading();
    }
    iniLoading() {
        console.log('>>LOADING BOT...');
        if (config_1.TESTMode) {
            const ShuxDevTC = this.dsclient.guilds.find('id', config_1.serverID).channels.find('id', config_1.channelsTC.shuxestado.idTC);
            ShuxDevTC.fetchMessage(config_1.channelsTC.shuxestado.msg[0]).then((estadoMSG) => __awaiter(this, void 0, void 0, function* () {
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
            this.botDataRefresh();
        }
    }
    botDataRefresh() {
        let retime = 300;
        setInterval(() => {
            {
                const usrRanking = (new user_1.User(this.dsclient)).listaTopUsers();
                const lvls = ['LVL 10', 'LVL 15', 'LVL 20', 'LVL 25', 'LVL 30', 'LVL 35', 'LVL 40'];
                const msgRank = this.dsclient.guilds.find('id', config_1.serverID).channels.find('id', config_1.channelsTC.shuxestado.idTC);
                msgRank.fetchMessage(config_1.channelsTC.shuxestado.msg[config_1.channelsTC.shuxestado.msg.length - 1]).then((rankMSg) => __awaiter(this, void 0, void 0, function* () {
                    let msg = new Discord.RichEmbed();
                    msg.setTitle('**RANKING**').setDescription('se actualiza cada 5 min').setColor('0xFFD700');
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
        }, retime * 1000);
    }
}
exports.IniBOT = IniBOT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsNkJBQTJCO0FBQzNCLHlCQUF1QjtBQUN2QixxQ0FBOEQ7QUFDOUQsaUNBQThCO0FBRTlCLE1BQWEsTUFBTTtJQUNsQixZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNELFVBQVU7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsSUFBRyxpQkFBUSxFQUFFO1lBQ1osTUFBTSxTQUFTLEdBQTRCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JJLFNBQVMsQ0FBQyxZQUFZLENBQUMsbUJBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU0sU0FBYyxFQUFFLEVBQUU7Z0JBQ2pGLElBQUksTUFBTSxHQUFrQixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQ3JELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRSxpQkFBUSxDQUFDLENBQUM7Z0JBQUMsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBQ3ZHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBQyxpQkFBUSxDQUFDLENBQUM7Z0JBQUMsTUFB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