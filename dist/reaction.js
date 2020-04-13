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
                case "shux": {
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
                    case "🏳️": {
                        const newRole = new user_1.User(this.dsclient);
                        newRole.createRole(nowUser.id);
                        break;
                    }
                }
                yield reaction.remove(nowUser.id);
                reactionCollector.cleanup();
            }));
            yield collector.on('end', (collected) => { console.log(`Collected ${collected.size} items`); });
        }));
    }
}
exports.Reacciones = Reacciones;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw2QkFBMkI7QUFDM0IsbUNBQStDO0FBQy9DLHVDQUFzQztBQUN0QyxtQ0FBcUM7QUFDckMsaUNBQThCO0FBRTlCLE1BQWEsVUFBVTtJQUd0QixZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUY1QyxjQUFTLEdBQXNCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZ0JBQVEsQ0FBQyxDQUFDO0lBRXhCLENBQUM7SUFDbEQsWUFBWTtRQUVYLE1BQU0sUUFBUSxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDbkcsTUFBTSxNQUFNLEdBQUcsQ0FBQyxRQUFhLEVBQUUsRUFBRTtZQUNoQyxRQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUMzQixLQUFLLEtBQUssQ0FBQyxDQUFDO29CQUNYLE9BQU8sSUFBSSxDQUFDO29CQUNaLE1BQU07aUJBQ047Z0JBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztvQkFDWixPQUFPLElBQUksQ0FBQztvQkFDWixNQUFNO2lCQUNOO2dCQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7b0JBQ1osT0FBTyxJQUFJLENBQUM7b0JBQ1osTUFBTTtpQkFDTjtnQkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDO29CQUNaLE9BQU8sSUFBSSxDQUFDO29CQUNaLE1BQU07aUJBQ047Z0JBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQztvQkFDZCxPQUFPLElBQUksQ0FBQztvQkFDWixNQUFNO2lCQUNOO2dCQUdJLE9BQU8sQ0FBQyxDQUFDO29CQUNiLE9BQU8sS0FBSyxDQUFDO29CQUNiLE1BQU07aUJBQ047YUFDRDtZQUFDLE9BQU8sS0FBSyxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUVGLFFBQVEsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTyxHQUFvQixFQUFFLEVBQUU7WUFDL0UsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBd0IsQ0FBQztZQUM3RSxNQUFNLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQU8sUUFBaUMsRUFBRSxpQkFBNEMsRUFBRSxFQUFFO2dCQUV2SCxNQUFNLE9BQU8sR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFcEQsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDM0IsS0FBSyxLQUFLLENBQUMsQ0FBQzt3QkFDWCxNQUFNLFNBQVMsR0FBRyxJQUFJLG1CQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMvQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDNUQsTUFBTTtxQkFDTjtvQkFBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDO3dCQUNkLE1BQU0sU0FBUyxHQUFHLElBQUksbUJBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQy9DLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUM3RCxNQUFNO3FCQUNOO29CQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7d0JBQ1osTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDL0MsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ25DLE1BQU07cUJBQ047b0JBSUksS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDZixNQUFNLFVBQVUsR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzNDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNO3FCQUNOO29CQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7d0JBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN4QyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDL0IsTUFBTTtxQkFDTjtpQkFDRDtnQkFBQyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQUEsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQWMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEcsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNILENBQUM7Q0FDRDtBQXpFRCxnQ0F5RUMifQ==