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
                    if (userData.supTicket != undefined) {
                        flag_ = false;
                    }
                    break;
                }
                case 'STAFF': {
                    console.log(userData.staffTicket);
                    if (userData.staffTicket != undefined) {
                        flag_ = false;
                    }
                    break;
                }
            }
            if (flag_) {
                const nombre_ = tipoT + '-' + usrname;
                this.shuxServe.createChannel(String(nombre_), "text").then((channel) => __awaiter(this, void 0, void 0, function* () {
                    const saveChannel = new user_1.User(this.dsclient);
                    let category = this.shuxServe.channels.find(c => c.id == const_1.channelsTC.tickets.category && c.type == "category");
                    if (!category)
                        throw new Error("Category channel does not exist");
                    yield channel.setParent(const_1.channelsTC.tickets.category);
                    yield channel.lockPermissions();
                    switch (tipoT) {
                        case 'SUPP': {
                            saveChannel.setTicketTC(uid, channel.id, 'SUPP');
                            yield channel.overwritePermissions(uid, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true });
                            for (let rol_ of const_1.channelsTC.tecnicos.roles) {
                                yield channel.overwritePermissions(rol_, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true });
                            }
                            break;
                        }
                        case 'STAFF': {
                            saveChannel.setTicketTC(uid, channel.id, 'STAFF');
                            yield channel.overwritePermissions(uid, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true });
                            for (let rol_ of const_1.channelsTC.tecnicos.roles) {
                                yield channel.overwritePermissions(rol_, { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'READ_MESSAGE_HISTORY': false, 'EMBED_LINKS': false, 'ATTACH_FILES': false });
                            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90aWNrZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQStDO0FBQy9DLGlDQUE4QjtBQUc5QixNQUFhLFNBQVM7SUFJckIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFINUMsV0FBTSxHQUFXLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQztRQUMvQixjQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZ0JBQVEsQ0FBQyxDQUFDO0lBRXBCLENBQUM7SUFDbEQsV0FBVyxDQUFDLEdBQVcsRUFBRSxPQUFlLEVBQUUsS0FBYTtRQUN0RCxJQUFJLEtBQUssR0FBWSxJQUFJLENBQUM7UUFDMUIsQ0FBQyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDL0QsTUFBTSxRQUFRLEdBQVcsS0FBSyxDQUFDO1lBQy9CLFFBQU8sS0FBSyxFQUFFO2dCQUNiLEtBQUssTUFBTSxDQUFDLENBQUM7b0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2hDLElBQUcsUUFBUSxDQUFDLFNBQVMsSUFBRSxTQUFTLEVBQUU7d0JBQUUsS0FBSyxHQUFDLEtBQUssQ0FBQztxQkFBRTtvQkFDbEQsTUFBTTtpQkFDTjtnQkFBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNsQyxJQUFHLFFBQVEsQ0FBQyxXQUFXLElBQUUsU0FBUyxFQUFFO3dCQUFFLEtBQUssR0FBQyxLQUFLLENBQUM7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