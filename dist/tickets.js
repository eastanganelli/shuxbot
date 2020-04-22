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
const const_1 = require("./const");
const user_1 = require("./user");
class TicketSup {
    constructor(dsclient) {
        this.dsclient = dsclient;
        this.oneday = 24 * 60 * 60 * 1000;
        this.shuxServe = this.dsclient.guilds.find('id', const_1.serverID);
    }
    abrirTicket(uid, usrname, tipoT) {
        let flag_ = true;
        (new user_1.User(this.dsclient)).getMyProfile(uid).then((getIn) => {
            const userData = getIn;
            switch (tipoT) {
                case 'SUPP': {
                    console.log(userData.supTicket);
                    if (userData.supTicket != undefined && !(userData.supTicket)) {
                        flag_ = false;
                    }
                    else if (!(userData.supTicket)) {
                        flag_ = false;
                    }
                    break;
                }
                case 'STAFF': {
                    console.log(userData.staffTicket);
                    if (userData.staffTicket != undefined && !(userData.staffTicket)) {
                        flag_ = false;
                    }
                    else if (!(userData.staffTicket)) {
                        flag_ = false;
                    }
                    break;
                }
            }
            console;
            if (!flag_) {
                const nombre_ = tipoT + '-' + usrname;
                const ticketsperms = {
                    soporte_: {
                        usuario: { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true },
                        tecnicos: { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true }
                    }, shux_: {
                        usuario: { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true },
                        tecnicos: { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'READ_MESSAGE_HISTORY': false, 'EMBED_LINKS': false, 'ATTACH_FILES': false }
                    },
                };
                this.shuxServe.createChannel(String(nombre_), "text").then((channel) => __awaiter(this, void 0, void 0, function* () {
                    const saveChannel = new user_1.User(this.dsclient);
                    let category = this.shuxServe.channels.find(c => c.id == const_1.channelsTC.tickets.category && c.type == "category");
                    if (!category)
                        throw new Error("Category channel does not exist");
                    yield channel.setParent(const_1.channelsTC.tickets.category);
                    yield channel.lockPermissions();
                    switch (tipoT) {
                        case 'SUPP': {
                            saveChannel.setTicketTC(uid, 'SUPP');
                            yield channel.overwritePermissions(uid, ticketsperms.soporte_.usuario);
                            for (let rol_ of const_1.channelsTC.tecnicos.roles) {
                                yield channel.overwritePermissions(rol_, ticketsperms.soporte_.tecnicos);
                            }
                            const msg = this.shuxServe.channels.get(channel.id);
                            yield msg.send('<@' + uid + '> Su Ticket Soporte ya fue abierto');
                            break;
                        }
                        case 'STAFF': {
                            saveChannel.setTicketTC(uid, 'STAFF');
                            yield channel.overwritePermissions(uid, ticketsperms.shux_.usuario);
                            for (let rol_ of const_1.channelsTC.tecnicos.roles) {
                                yield channel.overwritePermissions(rol_, ticketsperms.shux_.tecnicos);
                            }
                            const msg = this.shuxServe.channels.get(channel.id);
                            yield msg.send('<@' + uid + '> Su Ticket Staff ya fue abierto');
                            break;
                        }
                    }
                })).catch();
            }
        });
    }
    cerrarTicket(msg, tipo_) {
        const ticketCh = this.shuxServe.channels.find('id', msg.channel.id);
        if (ticketCh.parentID == const_1.channelsTC.tickets.category) {
            ticketCh.delete().then(() => {
                this.calidadDeTicket(msg, tipo_);
                const Delticket = new user_1.User(this.dsclient);
                Delticket.deleteTicket(msg.mentions.users.first().id, tipo_);
            });
        }
    }
    calidadDeTicket(msg, tipo_) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = new user_1.User(this.dsclient);
            let menUser = msg.mentions.users.first();
            yield menUser.send('Su ticket fue cerrado.\nCalifique del 1 al 10 como fue... *Tiene 24hs (1 Día) para calificar*');
            yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: this.oneday, errors: ['TIME'] }).then((collected) => __awaiter(this, void 0, void 0, function* () {
                usuario.updatePoints(menUser.id, 100);
                msg.author.send('Muchas gracias por calificar.\nHa recibido 100pts.\nSaludos, <@673655111041548288>').then(() => {
                    switch (tipo_) {
                        case ('SUPP'): {
                            const tecnicos = this.shuxServe.channels.find('id', const_1.channelsTC.tecnicos.idTC);
                            tecnicos.send('El usuario <@' + menUser.id + '> califico la **Ayuda | Consulta | Presupuesto | Reportes**\n**' + collected.first().content + '/10**');
                            break;
                        }
                        case ('STAFF'): {
                            const staff = this.shuxServe.channels.find('id', const_1.channelsTC.staff.idTC);
                            staff.send('El usuario <@' + menUser.id + '> califico la **Ayuda | Consulta | Reporte**\n**' + collected.first().content + '/10**');
                            break;
                        }
                    }
                });
            })).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!'); });
        });
    }
}
exports.TicketSup = TicketSup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90aWNrZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQStDO0FBQy9DLGlDQUE4QjtBQUc5QixNQUFhLFNBQVM7SUFJckIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFINUMsV0FBTSxHQUFXLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQztRQUMvQixjQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZ0JBQVEsQ0FBQyxDQUFDO0lBRXBCLENBQUM7SUFDbEQsV0FBVyxDQUFDLEdBQVcsRUFBRSxPQUFlLEVBQUUsS0FBYTtRQUN0RCxJQUFJLEtBQUssR0FBWSxJQUFJLENBQUM7UUFDMUIsQ0FBQyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDL0QsTUFBTSxRQUFRLEdBQVcsS0FBSyxDQUFDO1lBQy9CLFFBQU8sS0FBSyxFQUFFO2dCQUNiLEtBQUssTUFBTSxDQUFDLENBQUM7b0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2hDLElBQUcsUUFBUSxDQUFDLFNBQVMsSUFBRSxTQUFTLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFBRSxLQUFLLEdBQUMsS0FBSyxDQUFDO3FCQUFFO3lCQUN0RSxJQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQUUsS0FBSyxHQUFDLEtBQUssQ0FBQztxQkFBRTtvQkFDL0MsTUFBTTtpQkFDTjtnQkFBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNsQyxJQUFHLFFBQVEsQ0FBQyxXQUFXLElBQUUsU0FBUyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7d0JBQUUsS0FBSyxHQUFDLEtBQUssQ0FBQztxQkFBRTt5QkFDMUUsSUFBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO3dCQUFFLEtBQUssR0FBQyxLQUFLLENBQUM7cUJBQUU7b0JBQ2pELE1BQU07aUJBQ047YUFDRDtZQUNELE9BQU8sQ0FBQTtZQUNQLElBQUcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsTUFBTSxPQUFPLEdBQVcsS0FBSyxHQUFDLEdBQUcsR0FBQyxPQUFPLENBQUM7Z0JBQzFDLE1BQU0sWUFBWSxHQUFHO29CQUNwQixRQUFRLEVBQUU7d0JBQ1QsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7d0JBQ2pJLFFBQVEsRUFBRyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO3FCQUNuSSxFQUFFLEtBQUssRUFBRTt3QkFDVCxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTt3QkFDakksUUFBUSxFQUFHLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUU7cUJBQ3hJO2lCQUNELENBQUE7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFPLE9BQTZCLEVBQUUsRUFBRTtvQkFDbEcsTUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLGtCQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxDQUFDO29CQUM5RyxJQUFJLENBQUMsUUFBUTt3QkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBQ2xFLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDckQsTUFBTSxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ2hDLFFBQU8sS0FBSyxFQUFFO3dCQUNiLEtBQUssTUFBTSxDQUFDLENBQUM7NEJBQ1osV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7NEJBQ3JDLE1BQU0sT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUN2RSxLQUFJLElBQUksSUFBSSxJQUFJLGtCQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtnQ0FDMUMsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7NkJBQ3pFOzRCQUNELE1BQU0sR0FBRyxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUM3RSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxvQ0FBb0MsQ0FBQyxDQUFDOzRCQUM5RCxNQUFNO3lCQUNOO3dCQUFDLEtBQUssT0FBTyxDQUFDLENBQUM7NEJBQ2YsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7NEJBQ3RDLE1BQU0sT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUNwRSxLQUFJLElBQUksSUFBSSxJQUFJLGtCQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtnQ0FDMUMsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7NkJBQ3RFOzRCQUNELE1BQU0sR0FBRyxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUM3RSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxrQ0FBa0MsQ0FBQyxDQUFDOzRCQUM1RCxNQUFNO3lCQUNOO3FCQUNEO2dCQUNGLENBQUMsQ0FBQSxDQUFDLENBQUMsS0FBSyxFQUFxQixDQUFDO2FBQzlCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsWUFBWSxDQUFDLEdBQW9CLEVBQUUsS0FBYTtRQUMvQyxNQUFNLFFBQVEsR0FBMkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVGLElBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDcEQsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBRSxHQUFHLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlELENBQUMsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0lBQ0ssZUFBZSxDQUFDLEdBQW9CLEVBQUUsS0FBYTs7WUFDeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pDLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQywrRkFBK0YsQ0FBQyxDQUFDO1lBQ3BILE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFPLFNBQWMsRUFBRSxFQUFFO2dCQUNqSyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3RDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9GQUFvRixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDL0csUUFBTyxLQUFLLEVBQUU7d0JBQ2IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ2QsTUFBTSxRQUFRLEdBQTRCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3ZHLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUMsaUVBQWlFLEdBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sR0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDOUksTUFBTTt5QkFDTjt3QkFBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs0QkFDakIsTUFBTSxLQUFLLEdBQTRCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsa0JBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2pHLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUMsa0RBQWtELEdBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sR0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDNUgsTUFBTTt5QkFDTjtxQkFDRDtnQkFDRixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQztLQUFBO0NBQ0Q7QUFoR0QsOEJBZ0dDIn0=