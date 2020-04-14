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
        this.getPointsByLetter(msg);
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
                else if (msg.content.toLocaleLowerCase().startsWith('aschente') && msg.channel.id === const_1.channelsTC.comandos.idTC) {
                    msg.member.addRole(const_1.LVLs[0].roleLVL);
                    msg.author.send('**Bienvenido a SHUX!!!**\nA partir de ahora podrá ver todo el contenido y canales disponibles!\nRecuerde respestar las reglas que acepto para que no le caiga la ley encima!\n Shux Staff');
                    msg.member.removeRole(const_1.rolNoRules);
                    msg.delete();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxpQ0FBOEI7QUFDOUIsbUNBQTJFO0FBRTNFLHdCQUE2QjtBQUM3QixxQ0FBa0M7QUFDbEMsdUNBQXNDO0FBQ3RDLG1DQUFtQztBQUVuQyxNQUFhLE9BQU87SUFFaEIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFENUMsY0FBUyxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGdCQUFRLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ2xELE1BQU0sQ0FBQyxHQUFvQjtRQUN2QixJQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtpQkFDNUM7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO1NBQzdCO1FBQ0QsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNLLEtBQUssQ0FBQyxHQUFvQjs7WUFDNUIsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNsRCxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtvQkFDckMsS0FBSyxjQUFjLENBQUMsQ0FBQzt3QkFDakIsSUFBSSxNQUFNLEdBQWtCLElBQUksS0FBSyxD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