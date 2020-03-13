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
                        break;
                    }
                }
                yield msg.clearReactions();
            }));
            yield collector.on('end', (collected) => {
                console.log(`Collected ${collected.size} items`);
            });
            msg.clearReactions();
        }));
    }
}
exports.Reacciones = Reacciones;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw2QkFBMkI7QUFDM0IscUNBQWdEO0FBQ2hELHVDQUFzQztBQUN0QyxtQ0FBcUM7QUFFckMsTUFBYSxVQUFVO0lBQ3RCLFlBQW9CLFFBQXdCO1FBQXhCLGFBQVEsR0FBUixRQUFRLENBQWdCO0lBQUssQ0FBQztJQUNsRCxZQUFZO1FBQ1gsTUFBTSxTQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQVEsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sUUFBUSxHQUE0QixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZGLFFBQVEsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTyxHQUFvQixFQUFFLEVBQUU7WUFFL0UsTUFBTSxNQUFNLEdBQUcsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDaEMsUUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDM0IsS0FBSyxLQUFLLENBQUMsQ0FBQzt3QkFDWCxPQUFPLElBQUksQ0FBQzt3QkFDWixNQUFNO3FCQUNOO29CQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7d0JBQ1osT0FBTyxJQUFJLENBQUM7d0JBQ1osTUFBTTtxQkFDTjtvQkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUNaLE9BQU8sSUFBSSxDQUFDO3dCQUNaLE1BQU07cUJBQ047aUJBQ0Q7Z0JBQUMsT0FBTyxLQUFLLENBQUM7WUFDaEIsQ0FBQyxDQUFDO1lBRUYsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBd0IsQ0FBQztZQUU3RSxNQUFNLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQU8sUUFBaUMsRUFBRSxpQkFBNEMsRUFBRSxFQUFFO2dCQUN2SCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLE9BQU8sR0FBNEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQzdCLFFBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQzNCLEtBQUssS0FBSyxDQUFDLENBQUM7d0JBQ1gsTUFBTSxTQUFTLEdBQUcsSUFBSSxtQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDL0MsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDcEQsTUFBTTtxQkFDTjtvQkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUNaLE1BQU0sUUFBUSxHQUFHLElBQUksa0JBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQy9DLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNuQyxNQUFNO3FCQUNOO29CQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7d0JBQ1osTUFBTSxVQUFVLEdBQUcsSUFBSSxrQkFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDakQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3JDLE1BQU07cUJBQ047b0JBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFFWixNQUFNO3FCQUNOO2lCQUNEO2dCQUFDLE1BQU0sR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQSxDQUFDLENBQUM7WUFFSCxNQUFNLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBYyxFQUFFLEVBQUU7Z0JBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUEsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztDQUVEO0FBdkRELGdDQXVEQyJ9