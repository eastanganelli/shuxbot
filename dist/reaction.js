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
    }
    catchingReac() {
        const shuxServe = this.dsclient.guilds.find('id', config_1.serverID);
        const Comandos = shuxServe.channels.get('674086159697313833');
        Comandos.fetchMessage('687122556666511415').then((msg) => __awaiter(this, void 0, void 0, function* () {
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
            const collector = msg.createReactionCollector(filter);
            yield collector.on('collect', (reaction, reactionCollector) => __awaiter(this, void 0, void 0, function* () {
                yield console.log(reaction.users);
                const nowUser = reaction.users.first();
                console.log(nowUser.username);
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
            }));
            yield collector.on('end', (collected) => {
                console.log(`Collected ${collected.size} items`);
            });
        }));
    }
}
exports.Reacciones = Reacciones;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw2QkFBMkI7QUFDM0IscUNBQWdEO0FBQ2hELHVDQUFzQztBQUN0QyxtQ0FBcUM7QUFDckMsaUNBQThCO0FBRTlCLE1BQWEsVUFBVTtJQUN0QixZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtJQUFLLENBQUM7SUFDbEQsWUFBWTtRQUNYLE1BQU0sU0FBUyxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGlCQUFRLENBQUMsQ0FBQztRQUMzRSxNQUFNLFFBQVEsR0FBNEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN2RixRQUFRLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sR0FBb0IsRUFBRSxFQUFFO1lBRS9FLE1BQU0sTUFBTSxHQUFHLENBQUMsUUFBYSxFQUFFLEVBQUU7Z0JBQ2hDLFFBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQzNCLEtBQUssS0FBSyxDQUFDLENBQUM7d0JBQ1gsT0FBTyxJQUFJLENBQUM7d0JBQ1osTUFBTTtxQkFDTjtvQkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUNaLE9BQU8sSUFBSSxDQUFDO3dCQUNaLE1BQU07cUJBQ047b0JBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDWixPQUFPLElBQUksQ0FBQzt3QkFDWixNQUFNO3FCQUNOO29CQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7d0JBQ1osT0FBTyxJQUFJLENBQUM7d0JBQ1osTUFBTTtxQkFDTjtvQkFBQyxPQUFPLENBQUMsQ0FBQzt3QkFDVixPQUFPLEtBQUssQ0FBQzt3QkFDYixNQUFNO3FCQUNOO2lCQUNEO2dCQUFDLE9BQU8sS0FBSyxDQUFDO1lBQ2hCLENBQUMsQ0FBQztZQUVGLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQXdCLENBQUM7WUFFN0UsTUFBTSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFPLFFBQWlDLEVBQUUsaUJBQTRDLEVBQUUsRUFBRTtnQkFDdkgsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxPQUFPLEdBQTRCLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUM3QixRQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO29CQUMzQixLQUFLLEtBQUssQ0FBQyxDQUFDO3dCQUNYLE1BQU0sU0FBUyxHQUFHLElBQUksbUJBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQy9DLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3BELE1BQU07cUJBQ047b0JBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDWixNQUFNLFFBQVEsR0FBRyxJQUFJLGtCQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMvQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDbkMsTUFBTTtxQkFDTjtvQkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUNaLE1BQU0sVUFBVSxHQUFHLElBQUksa0JBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ2pELFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNyQyxNQUFNO3FCQUNOO29CQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7d0JBQ1osTUFBTSxVQUFVLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMzQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDaEMsTUFBTTtxQkFDTjtpQkFDRDtZQUNGLENBQUMsQ0FBQSxDQUFDLENBQUM7WUFFSCxNQUFNLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBYyxFQUFFLEVBQUU7Z0JBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztRQUVKLENBQUMsQ0FBQSxDQUFDLENBQUE7SUFDSCxDQUFDO0NBRUQ7QUE5REQsZ0NBOERDIn0=