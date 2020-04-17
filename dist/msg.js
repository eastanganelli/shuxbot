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
const Discord = require("discord.js");
const user_1 = require("./user");
const const_1 = require("./const");
const _1 = require(".");
const juegos_1 = require("./juegos");
const tickets_1 = require("./tickets");
const const_2 = require("./const");
class MSGshux {
    constructor(dsClient) {
        this.dsClient = dsClient;
        this.shuxServe = this.dsClient.guilds.find('id', const_1.serverID);
    }
    getMSG(msg) {
        if (!(msg.author.bot)) {
            if (msg.channel.type == 'dm') {
                this.dmSYS(msg);
            }
            else {
                this.pubSYS(msg);
            }
        }
        if (msg.author.bot) {
            return;
        }
    }
    dmSYS(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.content.toLocaleLowerCase().includes('shux!')) {
                switch (msg.content.toLocaleLowerCase()) {
                    case 'shux!micanal': {
                        let datos_ = new Array(0);
                        yield msg.author.send('Por favor, ingrese su nombre de Rol\nSi desea cancelar -> #cancelar');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 120000, errors: ['TIME'] }).then((collected) => {
                            datos_.push(collected.first().content);
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        yield msg.author.send('Por favor, el color (Recuerde ingresar un color en formato COLOR sin #, puede usar ColorPicker en Google)');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 120000, errors: ['TIME'] }).then((collected) => {
                            datos_.push(collected.first().content);
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        yield msg.author.send('Su ROL ya fue creado!!\nSaludos, SHUX');
                        let roles_ = new Array(0);
                        for (let i = const_1.LVLs.length - 5; i < const_1.LVLs.length; i++) {
                            roles_.push(const_1.LVLs[i].roleLVL);
                        }
                        if (isUserEnable(roles_, msg.author.id)) {
                            const newRole = new user_1.User(this.dsClient);
                            console.log(datos_);
                        }
                        break;
                    }
                    default: break;
                }
            }
        });
    }
    pubSYS(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.content.toLocaleLowerCase().startsWith('shux!')) {
                if (msg.content.toLocaleLowerCase().startsWith('shux!perfil')) {
                    let user_ = new user_1.User(this.dsClient);
                    user_.getMyProfile(msg.author.id).then((miPerfil) => {
                        var _a;
                        let embed_ = new Discord.RichEmbed();
                        embed_.setTitle('Perfil de ' + msg.author.username).setThumbnail(msg.author.displayAvatarURL).setColor('red').addField('Cumpleaños: ', String(miPerfil.birth), false)
                            .addField('Mi PC: ', miPerfil.urlbuild, false)
                            .addField('Puntos: ', miPerfil.points == null ? '-' : Math.floor(miPerfil.points), false)
                            .addField('Warnings: ', miPerfil.warns == null ? '-' : miPerfil.warns, false)
                            .setTimestamp((_a = msg.guild.members.get(msg.author.id)) === null || _a === void 0 ? void 0 : _a.joinedAt);
                        msg.channel.send(embed_);
                    }).catch(() => {
                        msg.reply('NO tenes un perfil creado');
                    });
                }
                else if (msg.content.toLocaleLowerCase().startsWith('shux!mivoto')) {
                    let user_ = new user_1.User(this.dsClient);
                    let menUser = msg.mentions.users.first();
                    console.log(menUser.username);
                    if (msg.author.id != menUser.id) {
                        user_.setVoto(msg.author.id, msg.mentions.users.first().id).then((res) => { msg.reply(res); }).catch((err) => { msg.reply(err); });
                    }
                    else {
                        msg.reply(const_1.listaErr.votoMe.info);
                    }
                }
                else if (msg.content.toLocaleLowerCase().includes('shux!ping')) {
                    msg.reply('pong');
                }
                else if (msg.channel.id == const_1.channelsTC.vicioroom.idTC && msg.content.toLowerCase().startsWith('shux!vcgame') && isUserEnable(const_1.channelsTC.vicioroom.roles, msg.author.id)) {
                    const TCNombre = msg.content.substring(('shux!vcgame ').length);
                    (new juegos_1.Juegos(this.dsClient)).creategameChannel(TCNombre, msg.author.username);
                }
                else if (msg.content.toLowerCase().startsWith('shux!finsoporte') && isUserEnable(const_1.channelsTC.tickets.roles, msg.author.id)) {
                    if (this.shuxServe.channels.find('id', msg.channel.id).parentID == const_1.channelsTC.tickets.category) {
                        if (msg.mentions.users.first().id != undefined) {
                            const closeTicket_ = new tickets_1.TicketSup(this.dsClient);
                            closeTicket_.cerrarTicket(msg, 'SUPP');
                        }
                        else
                            msg.reply('No se menciono al usuario con ticket a cerrar');
                    }
                }
                else if (msg.content.toLowerCase().startsWith('shux!finticket') && isUserEnable(const_1.channelsTC.staff.roles, msg.author.id)) {
                    if (this.shuxServe.channels.find('id', msg.channel.id).parentID == const_1.channelsTC.tickets.category) {
                        if (msg.mentions.users.first().id != undefined) {
                            const closeTicket_ = new tickets_1.TicketSup(this.dsClient);
                            closeTicket_.cerrarTicket(msg, 'STAFF');
                        }
                        else
                            msg.reply('No se menciono al usuario con ticket a cerrar');
                    }
                }
                if ((isUserEnable(const_1.channelsTC.warnings.roles, msg.author.id)) && (!(const_2.TESTMode))) {
                    if (msg.content.toLocaleLowerCase().startsWith('shux!warn') && msg.content.toLocaleLowerCase().includes('-')) {
                        const usuario = new user_1.User(this.dsClient);
                        let menUser = msg.mentions.users.first();
                        if (menUser.username != undefined || menUser.id != undefined) {
                            const razon = msg.content.split('-');
                            {
                                usuario.updateWarn(menUser.id, '+');
                                menUser.send('**FUE WARNEADO**\nMotivo de reporte: ' + razon[razon.length - 1] + '\nPara más info contactarse con Moderadores en <#501500942122745880>\nSHUX');
                            }
                            {
                                const ShuxSev = this.dsClient.guilds.find('id', const_1.serverID).channels.find('id', const_1.channelsTC.warnings.idTC);
                                ShuxSev.send('**WARNING A <@' + menUser.id + '>** por <@' + msg.author.id + '>\n__Razón/Prueba__: ' + razon[razon.length - 1]);
                            }
                        }
                    }
                    else if (msg.content.toLocaleLowerCase().startsWith('shux!rmwarn') && msg.content.toLocaleLowerCase().includes('-')) {
                        const usuario = new user_1.User(this.dsClient);
                        let menUser = msg.mentions.users.first();
                        if (menUser.username != undefined || menUser.id != undefined) {
                            const razon = msg.content.split('-');
                            {
                                msg.delete();
                                usuario.updateWarn(menUser.id, '-');
                                menUser.send('**SU WARN FUE REMOVIDO** por <@' + msg.author.id + '>\nSHUX');
                            }
                            {
                                const ShuxSev = this.dsClient.guilds.find('id', const_1.serverID).channels.find('id', const_1.channelsTC.warnings.idTC);
                                ShuxSev.fetchMessage(razon[razon.length - 2]).then((msg) => { msg.delete(); });
                                ShuxSev.send('**REMOVE WARNING DE <@' + menUser.id + '>** por <@' + msg.author.id + '>\n__Razón/Prueba__: ' + razon[razon.length - 1]);
                            }
                        }
                    }
                }
            }
        });
    }
    getPointsByLetter(msg) {
        let points = countCharsToPoints(msg);
        const upPoints = new user_1.User(this.dsClient);
        upPoints.updatePoints(msg.author.id, points);
    }
}
exports.MSGshux = MSGshux;
function isUserEnable(roles, userDSID) {
    var _a;
    const sv = _1.dsclient.guilds.get(const_1.serverID);
    for (let rol of roles) {
        if ((_a = sv.members.get(userDSID)) === null || _a === void 0 ? void 0 : _a.roles.has(rol))
            return true;
    }
    return false;
}
function countCharsToPoints(msg) {
    const multiplierEXP = [
        { min: 1, max: 250 },
        { min: 250, max: 500 },
        { min: 500, max: 750 },
        { min: 750, max: 1000 },
        { min: 1000, max: 1250 },
        { min: 1250, max: 1500 },
        { min: 1500, max: 1750 },
        { min: 1750, max: 2000 }
    ];
    let mPoints = 0, flag = false;
    for (let i = 0; i < multiplierEXP.length && !flag; i++) {
        if (String(msg.content).length >= multiplierEXP[i].min && String(msg.content).length < multiplierEXP[i].max) {
            let mylength = msg.content.length, charP = 0.1, multiplicador = i + 1;
            mPoints += mylength * multiplicador * charP;
            console.log(String(msg.content).length, 'ID', msg.author.username, 'Points', mPoints);
            flag = true;
        }
    }
    return mPoints;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxpQ0FBOEI7QUFDOUIsbUNBQStEO0FBRS9ELHdCQUE2QjtBQUM3QixxQ0FBa0M7QUFDbEMsdUNBQXNDO0FBQ3RDLG1DQUFtQztBQUVuQyxNQUFhLE9BQU87SUFFaEIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFENUMsY0FBUyxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGdCQUFRLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ2xELE1BQU0sQ0FBQyxHQUFvQjtRQUN2QixJQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtpQkFDNUM7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO1NBQzdCO1FBQ0QsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUFFLE9BQU87U0FBRTtJQUVsQyxDQUFDO0lBQ0ssS0FBSyxDQUFDLEdBQW9COztZQUM1QixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2xELFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO29CQUNyQyxLQUFLLGNBQWMsQ0FBQyxDQUFDO3dCQUNqQixJQUFJLE1BQU0sR0FBa0IsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pDLE1BQU0sR0FBRyxDQUFDLE1B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