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
        const Comandos = this.shuxServe.channels.get('674086159697313833');
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
                const nowUser = reaction.users.last();
                if (!(nowUser.id == '673655111041548288')) {
                    switch (reaction.emoji.name) {
                        case "🎟️": {
                            const newTicket = new tickets_1.TicketSup(this.dsclient);
                            newTicket.abrirTicket(nowUser.id, nowUser.username);
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
                    }
                    reaction.remove(nowUser.id);
                }
            }));
            yield collector.on('end', (collected) => { console.log(`Collected ${collected.size} items`); });
        }));
    }
}
exports.Reacciones = Reacciones;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw2QkFBMkI7QUFDM0IscUNBQWdEO0FBQ2hELHVDQUFzQztBQUN0QyxtQ0FBcUM7QUFDckMsaUNBQThCO0FBRTlCLE1BQWEsVUFBVTtJQUd0QixZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUY1QyxjQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQVEsQ0FBQyxDQUFDO0lBRXBCLENBQUM7SUFDbEQsWUFBWTtRQUVYLE1BQU0sUUFBUSxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM1RixNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQWEsRUFBRSxFQUFFO1lBQ2hDLFFBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQzNCLEtBQUssS0FBSyxDQUFDLENBQUM7b0JBQ1gsT0FBTyxJQUFJLENBQUM7b0JBQ1osTUFBTTtpQkFDTjtnQkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDO29CQUNaLE9BQU8sSUFBSSxDQUFDO29CQUNaLE1BQU07aUJBQ047Z0JBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztvQkFDWixPQUFPLElBQUksQ0FBQztvQkFDWixNQUFNO2lCQUNOO2dCQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7b0JBQ1osT0FBTyxJQUFJLENBQUM7b0JBQ1osTUFBTTtpQkFDTjtnQkFBQyxPQUFPLENBQUMsQ0FBQztvQkFDVixPQUFPLEtBQUssQ0FBQztvQkFDYixNQUFNO2lCQUNOO2FBQ0Q7WUFBQyxPQUFPLEtBQUssQ0FBQztRQUNoQixDQUFDLENBQUM7UUFFRixRQUFRLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sR0FBb0IsRUFBRSxFQUFFO1lBQy9FLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQXdCLENBQUM7WUFDN0UsTUFBTSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFPLFFBQWlDLEVBQUUsaUJBQTRDLEVBQUUsRUFBRTtnQkFFdkgsTUFBTSxPQUFPLEdBQTRCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQy9ELElBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksb0JBQW9CLENBQUMsRUFBRTtvQkFFekMsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTt3QkFDM0IsS0FBSyxLQUFLLENBQUMsQ0FBQzs0QkFDWCxNQUFNLFNBQVMsR0FBRyxJQUFJLG1CQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUMvQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNwRCxNQUFNO3lCQUNOO3dCQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7NEJBQ1osTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDL0MsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ25DLE1BQU07eUJBQ047d0JBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzs0QkFDWixNQUFNLFVBQVUsR0FBRyxJQUFJLGtCQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNqRCxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDckMsTUFBTTt5QkFDTjt3QkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDOzRCQUNaLE1BQU0sVUFBVSxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDM0MsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ2hDLE1BQU07eUJBQ047cUJBQ0Q7b0JBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzlCO1lBQ0YsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUNILE1BQU0sU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFjLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRHLENBQUMsQ0FBQSxDQUFDLENBQUE7SUFDSCxDQUFDO0NBRUQ7QUE3REQsZ0NBNkRDIn0=