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
require("firebase/database");
const const_1 = require("./const");
const tickets_1 = require("./tickets");
const admin_1 = require("./admin");
const user_1 = require("./user");
class Reacciones {
    constructor(dsclient) {
        this.dsclient = dsclient;
        this.shuxServe = this.dsclient.guilds.find('id', const_1.serverID);
    }
    catchingReac() {
        const Comandos = this.shuxServe.channels.find('id', const_1.channelsTC.comandos.idTC);
        const filter = (reaction) => {
            console.log(reaction.emoji.name);
            switch (reaction.emoji.name) {
                case "🎟️": {
                    return true;
                    break;
                }
                case "💡": {
                    return true;
                    break;
                }
                case "📸": {
                    return true;
                    break;
                }
                case "shux": {
                    return true;
                    break;
                }
                case "✅": {
                    return true;
                    break;
                }
                case "🎙️": {
                    return true;
                    break;
                }
                default: {
                    return false;
                    break;
                }
            }
            return false;
        };
        for (let msg_ of const_1.channelsTC.comandos.msg) {
            Comandos.fetchMessage(msg_).then((msg) => __awaiter(this, void 0, void 0, function* () {
                const collector = msg.createReactionCollector(filter);
                yield collector.on('collect', (reaction, reactionCollector) => __awaiter(this, void 0, void 0, function* () {
                    const nowUser = reaction.users.first();
                    if (!(nowUser.bot)) {
                        switch (reaction.emoji.name) {
                            case "🎟️": {
                                const newTicket = new tickets_1.TicketSup(this.dsclient);
                                newTicket.abrirTicket(nowUser.id, nowUser.username, 'SUPP');
                                break;
                            }
                            case "shux": {
                                const newTicket = new tickets_1.TicketSup(this.dsclient);
                                newTicket.abrirTicket(nowUser.id, nowUser.username, 'STAFF');
                                break;
                            }
                            case "💡": {
                                const sugStaff = new admin_1.AdminStaff(this.dsclient);
                                sugStaff.setSugerencia(nowUser.id);
                                break;
                            }
                            case "📸": {
                                const usrProfile = new user_1.User(this.dsclient);
                                usrProfile.miPerfil(nowUser.id);
                                break;
                            }
                            case "✅": {
                                for (let miLvl of const_1.LVLs) {
                                    if (this.shuxServe.member(nowUser.id).roles.has(miLvl.roleLVL)) {
                                        this.shuxServe.member(nowUser.id).addRole(const_1.channelsTC.reglas.roles[0], 'Usuario Acepto las Reglas');
                                        break;
                                    }
                                    else {
                                        this.shuxServe.member(nowUser.id).removeRole(const_1.channelsTC.reglas.roles[1], 'Usuario Acepto las Reglas');
                                        const impRole = [const_1.channelsTC.reglas.roles[0], const_1.LVLs[0].roleLVL];
                                        this.shuxServe.member(nowUser.id).addRoles(impRole, 'Usuario Acepto las Reglas');
                                        const msgchan = this.shuxServe.channels.find('id', const_1.channelsTC.chatgeneral.idTC);
                                        msgchan.send('<@' + nowUser.id + '> **Bienvenido a Shux!!**\nPor favor, recuerde que para pedir ayuda de hardware/software, debe abrir un ticket en 🧰comandos-tickets\nPara hablar de Hardware, y otros temas, usar sus canales respectivos.\nSaludos, Shux');
                                        break;
                                    }
                                }
                                break;
                            }
                            case "🎙️": {
                                this.shuxServe.member(nowUser.id).addRole(const_1.channelsTC.hablemosde.roles, 'Acepto Ver Hablemos De...');
                                break;
                            }
                        }
                        yield reaction.remove(nowUser.id);
                    }
                }));
            }));
        }
    }
}
exports.Reacciones = Reacciones;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw2QkFBMkI7QUFDM0IsbUNBQXFEO0FBQ3JELHVDQUFzQztBQUN0QyxtQ0FBcUM7QUFDckMsaUNBQThCO0FBRTlCLE1BQWEsVUFBVTtJQUd0QixZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUY1QyxjQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZ0JBQVEsQ0FBQyxDQUFDO0lBRXBCLENBQUM7SUFDbEQsWUFBWTtRQUVYLE1BQU0sUUFBUSxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZHLE1BQU0sTUFBTSxHQUFHLENBQUMsUUFBYSxFQUFFLEVBQUU7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2hDLFFBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQzNCLEtBQUssS0FBSyxDQUFDLENBQUM7b0JBQ1gsT0FBTyxJQUFJLENBQUM7b0JBQ1osTUFBTTtpQkFDTjtnQkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDO29CQUNaLE9BQU8sSUFBSSxDQUFDO29CQUNaLE1BQU07aUJBQ047Z0JBR0ksS0FBSyxJQUFJLENBQUMsQ0FBQztvQkFDZixPQUFPLElBQUksQ0FBQztvQkFDWixNQUFNO2lCQUNOO2dCQUFDLEtBQUssTUFBTSxDQUFDLENBQUM7b0JBQ2QsT0FBTyxJQUFJLENBQUM7b0JBQ1osTUFBTTtpQkFDTjtnQkFBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNYLE9BQU8sSUFBSSxDQUFD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