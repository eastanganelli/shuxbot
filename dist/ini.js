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
const const_1 = require("./const");
const user_1 = require("./user");
const juegos_1 = require("./juegos");
const fetch = require('node-fetch');
class IniBOT {
    constructor(dsclient) {
        this.dsclient = dsclient;
        this.shuxServe = this.dsclient.guilds.find('id', const_1.serverID);
    }
    iniLoading() {
        console.log('>>LOADING BOT...');
        if (const_1.TESTMode) {
            const ShuxDevTC = this.shuxServe.channels.find('id', const_1.channelsTC.shuxestado.idTC);
            ShuxDevTC.fetchMessage(String(const_1.channelsTC.shuxestado.msg[0])).then((estadoMSG) => __awaiter(this, void 0, void 0, function* () {
                let ESTADO = new Array(0);
                yield estadoMSG.edit('>>**INICIANDO SERVICIOS** - ');
                yield console.log('>>>>>DEBUG MODE:' + const_1.TESTMode);
                yield estadoMSG.edit('>>**INICIANDO SERVICIOS**\t -');
                yield ESTADO.push('>>ESTADO DEBUG: ' + const_1.TESTMode);
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
            const ShuxDevTC = this.shuxServe.channels.find('id', const_1.channelsTC.shuxestado.idTC);
            ShuxDevTC.fetchMessage(const_1.channelsTC.shuxestado.msg[0]).then((estadoMSG) => __awaiter(this, void 0, void 0, function* () {
                yield estadoMSG.edit('>>**INICIANDO SERVICIOS**');
                yield firebase.auth().signInWithEmailAndPassword(config_1.db.user, config_1.db.pass).catch((Err) => {
                });
                yield this.botDataRefresh();
                yield estadoMSG.edit('>>**BOT ENCENDIDO!!!**');
                yield estadoMSG.edit('BOT Version **' + const_1.version + '**\n');
            }));
        }
    }
    botDataRefresh() {
        const usrRanking = (new user_1.User(this.dsclient)).listaTopUsers();
        const lvls = ['LVL 10-14', 'LVL 15-19', 'LVL 20-24', 'LVL 25-29', 'LVL 30-34', 'LVL 35-39', 'LVL 40-49'];
        const msgRank = this.shuxServe.channels.find('id', const_1.channelsTC.shuxestado.idTC);
        setInterval(() => {
            msgRank.fetchMessage(const_1.channelsTC.shuxestado.msg[const_1.channelsTC.shuxestado.msg.length - 1]).then((rankMSg) => __awaiter(this, void 0, void 0, function* () {
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
        }, 30000);
    }
    agregarReaccionesAmsgs() {
        const addReac = [
            {
                idTC: '674086159697313833',
                data: [{
                        id: '688036583399489641',
                        emojis: ["📸", "💡", "🎟️", "shux"]
                    }, {
                        id: '687122556666511415',
                        emojis: ["✅", "🎙️"]
                    }]
            },
        ];
        for (let _Chan of addReac) {
            const msgToReact = this.shuxServe.channels.find('id', _Chan.idTC);
            for (let _data of _Chan.data) {
                msgToReact.fetchMessage(_data.id).then((msg) => __awaiter(this, void 0, void 0, function* () {
                    for (let thisReact of _data.emojis) {
                        yield msg.react(msg.guild.emojis.find('name', thisReact).id);
                    }
                }));
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsNkJBQTJCO0FBQzNCLHlCQUF1QjtBQUN2QixxQ0FBOEI7QUFDOUIsbUNBQWtFO0FBQ2xFLGlDQUE4QjtBQUM5QixxQ0FBa0M7QUFDbEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXBDLE1BQWEsTUFBTTtJQUdsQixZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUY1QyxjQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZ0JBQVEsQ0FBQyxDQUFDO0lBRXBCLENBQUM7SUFDbEQsVUFBVTtRQUVULE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxJQUFHLGdCQUFRLEVBQUU7WUFDWixNQUFNLFNBQVMsR0FBNEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRyxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFNLFNBQWMsRUFBRSxFQUFFO2dCQUN6RixJQUFJLE1BQU0sR0FBa0IsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUUsZ0JBQVEsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sU0FBUyxDQUFDLElB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