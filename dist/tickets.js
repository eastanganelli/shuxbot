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
                            yield channel.overwritePermissions(uid, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true });
                            for (let rol_ of const_1.channelsTC.tecnicos.roles) {
                                yield channel.overwritePermissions(rol_, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true });
                            }
                            const msg = this.shuxServe.channels.get(channel.id);
                            yield msg.send('<@' + uid + '> Su Ticket Soporte ya fue abierto');
                            break;
                        }
                        case 'STAFF': {
                            saveChannel.setTicketTC(uid, 'STAFF');
                            yield channel.overwritePermissions(uid, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'EMBED_LINKS': true, 'ATTACH_FILES': true });
                            for (let rol_ of const_1.channelsTC.tecnicos.roles) {
                                yield channel.overwritePermissions(rol_, { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'READ_MESSAGE_HISTORY': false, 'EMBED_LINKS': false, 'ATTACH_FILES': false });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90aWNrZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQStDO0FBQy9DLGlDQUE4QjtBQUc5QixNQUFhLFNBQVM7SUFJckIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFINUMsV0FBTSxHQUFXLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQztRQUMvQixjQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZ0JBQVEsQ0FBQyxDQUFDO0lBRXBCLENBQUM7SUFDbEQsV0FBVyxDQUFDLEdBQVcsRUFBRSxPQUFlLEVBQUUsS0FBYTtRQUN0RCxJQUFJLEtBQUssR0FBWSxJQUFJLENBQUM7UUFDMUIsQ0FBQyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDL0QsTUFBTSxRQUFRLEdBQVcsS0FBSyxDQUFDO1lBQy9CLFFBQU8sS0FBSyxFQUFFO2dCQUNiLEtBQUssTUFBTSxDQUFDLENBQUM7b0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2hDLElBQUcsUUFBUSxDQUFDLFNBQVMsSUFBRSxTQUFTLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFBRSxLQUFLLEdBQUMsS0FBSyxDQUFDO3FCQUFFO3lCQUN0RSxJQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQUUsS0FBSyxHQUFDLEtBQUssQ0FBQztxQkFBRTtvQkFDL0MsTUFBTTtpQkFDTjtnQkFBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDO29CQUNm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