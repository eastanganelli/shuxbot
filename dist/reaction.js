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
const config_1 = require("./config");
const tickets_1 = require("./tickets");
const admin_1 = require("./admin");
const user_1 = require("./user");
class Reacciones {
    constructor(dsclient) {
        this.dsclient = dsclient;
        this.shuxServe = this.dsclient.guilds.find('id', config_1.serverID);
    }
    catchingReac() {
        const Comandos = this.shuxServe.channels.find('id', '674086159697313833');
        const filter = (reaction) => {
            switch (reaction.emoji.name) {
                case "🎟️": {
                    return true;
                    break;
                }
                case "💡": {
                    return true;
                    break;
                }
                case "📝": {
                    return true;
                    break;
                }
                case "📸": {
                    return true;
                    break;
                }
                case "🏳️": {
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
        Comandos.fetchMessage('687122556666511415').then((msg) => __awaiter(this, void 0, void 0, function* () {
            const collector = msg.createReactionCollector(filter);
            yield collector.on('collect', (reaction, reactionCollector) => __awaiter(this, void 0, void 0, function* () {
                yield console.log(reaction.users);
                const nowUser = reaction.users.last();
                if (!(nowUser.id == '673655111041548288')) {
                    switch (reaction.emoji.name) {
                        case "🎟️": {
                            const newTicket = new tickets_1.TicketSup(this.dsclient);
                            newTicket.abrirTicket(nowUser.id, nowUser.user.username);
                            break;
                        }
                        case "💡": {
                            const sugStaff = new admin_1.AdminStaff(this.dsclient);
                            sugStaff.setSugerencia(nowUser.id);
                            break;
                        }
                        case "📝": {
                            const entreStaff = new admin_1.AdminStaff(this.dsclient);
                            entreStaff.setEntrevista(nowUser.id);
                            break;
                        }
                        case "📸": {
                            const usrProfile = new user_1.User(this.dsclient);
                            usrProfile.miPerfil(nowUser.id);
                            break;
                        }
                        case "🏳️": {
                            const newRole = new user_1.User(this.dsclient);
                            newRole.createRole(nowUser.id);
                            break;
                        }
                    }
                    reaction.remove(nowUser.id);
                }
            }));
            yield collector.on('end', (collected) => { console.log(`Collected ${collected.size} items`); });
            yield msg.clearReactions();
        }));
    }
}
exports.Reacciones = Reacciones;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw2QkFBMkI7QUFDM0IscUNBQWdEO0FBQ2hELHVDQUFzQztBQUN0QyxtQ0FBcUM7QUFDckMsaUNBQThCO0FBRTlCLE1BQWEsVUFBVTtJQUd0QixZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUY1QyxjQUFTLEdBQXNCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQVEsQ0FBQyxDQUFDO0lBRXhCLENBQUM7SUFDbEQsWUFBWTtRQUVYLE1BQU0sUUFBUSxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDbkcsTUFBTSxNQUFNLEdBQUcsQ0FBQyxRQUFhLEVBQUUsRUFBRTtZQUNoQyxRQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUMzQixLQUFLLEtBQUssQ0FBQyxDQUFDO29CQUNYLE9BQU8sSUFBSSxDQUFDO29CQUNaLE1BQU07aUJBQ047Z0JBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztvQkFDWixPQUFPLElBQUksQ0FBQztvQkFDWixNQUFNO2lCQUNOO2dCQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7b0JBQ1osT0FBTyxJQUFJLENBQUM7b0JBQ1osTUFBTTtpQkFDTjtnQkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDO29CQUNaLE9BQU8sSUFBSSxDQUFDO29CQUNaLE1BQU07aUJBQ047Z0JBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQztvQkFDYixPQUFPLElBQUksQ0FBQztvQkFDWixNQUFNO2lCQUNOO2dCQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNWLE9BQU8sS0FBSyxDQUFDO29CQUNiLE1BQU07aUJBQ047YUFD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