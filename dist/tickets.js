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
const config_1 = require("./config");
const user_1 = require("./user");
class TicketSup {
    constructor(dsclient) {
        this.dsclient = dsclient;
        this.oneday = 24 * 60 * 60 * 1000;
        this.shuxServe = this.dsclient.guilds.find('id', config_1.serverID);
    }
    abrirTicket(uid, usrname) {
        this.shuxServe.createChannel('T-' + usrname, "text").then((channel) => __awaiter(this, void 0, void 0, function* () {
            let category = this.shuxServe.channels.find(c => c.id == config_1.channelsTC.tickets.category && c.type == "category");
            if (!category)
                throw new Error("Category channel does not exist");
            yield channel.setParent(config_1.channelsTC.tickets.category);
            yield channel.lockPermissions();
            yield channel.overwritePermissions(uid, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true });
        })).catch(console.error);
    }
    cerrarTicket(msg) {
        const ticketCh = this.shuxServe.channels.find('id', msg.channel.id);
        if (ticketCh.parentID == config_1.channelsTC.tickets.category) {
            ticketCh.delete().then(() => {
                this.calidadDeTicket(msg);
            });
        }
    }
    calidadDeTicket(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = new user_1.User(this.dsclient);
            let menUser = msg.mentions.users.first();
            yield menUser.send('Su ticket fue cerrado.\nCalifique del 1 al 10 como fue... *Tiene 24hs (1 Día) para calificar*');
            yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: this.oneday, errors: ['TIME'] }).then((collected) => __awaiter(this, void 0, void 0, function* () {
                usuario.updatePoints(menUser.id, 100);
                msg.author.send('Muchas gracias por calificar.\nHa recibido 100pts.\nSaludos, <@673655111041548288>').then(() => {
                    const tecnicos = this.shuxServe.channels.find('id', config_1.channelsTC.tecnicos.idTC);
                    tecnicos.send('El usuario <@' + menUser.id + '> califico la **Ayuda | Consulta | Presupuesto | Reportes**\n**' + collected.first().content + '/10**');
                });
            })).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!'); });
        });
    }
}
exports.TicketSup = TicketSup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90aWNrZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWdEO0FBQ2hELGlDQUE4QjtBQUU5QixNQUFhLFNBQVM7SUFJbEIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFIL0MsV0FBTSxHQUFXLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQztRQUMvQixjQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQVEsQ0FBQyxDQUFDO0lBRWpCLENBQUM7SUFDckQsV0FBVyxDQUFDLEdBQVcsRUFBRSxPQUFlO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksR0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU0sT0FBTyxFQUFDLEVBQUU7WUFDdkUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxtQkFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQztZQUM1RyxJQUFJLENBQUMsUUFBUTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDcEUsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLG1CQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNoSyxDQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELFlBQVksQ0FBQyxHQUFvQjtRQUNoQyxNQUFNLFFBQVEsR0FBMkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVGLElBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDcEQsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBRSxHQUFHLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUFDSyxlQUFlLENBQUMsR0FBb0I7O1lBQ3pDLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QyxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6QyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsK0ZBQStGLENBQUMsQ0FBQztZQUNwSCxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTyxTQUFjLEVBQUUsRUFBRTtnQkFDakssT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvRkFBb0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQy9HLE1BQU0sUUFBUSxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN2RyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBQyxPQUFPLENBQUMsRUFBRSxHQUFDLGlFQUFpRSxHQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEdBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9JLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RSxDQUFDO0tBQUE7Q0FDRDtBQWxDRCw4QkFrQ0MifQ==