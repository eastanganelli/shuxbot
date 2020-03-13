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
const config_1 = require("./config");
const _1 = require(".");
const juegos_1 = require("./juegos");
const tickets_1 = require("./tickets");
class MSGshux {
    constructor(dsClient) {
        this.dsClient = dsClient;
        this.shuxServe = this.dsClient.guilds.find('id', config_1.serverID);
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
                    case 'shux!mirol': {
                        let datos_ = new Array(0);
                        yield msg.author.send('Por favor, ingrese su nombre de Rol\nSi desea cancelar -> #cancelar');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 120000, errors: ['TIME'] }).then((collected) => {
                            datos_.push(collected.first().content);
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        yield msg.author.send('Por favor, ingresar el color (**Formato #COLOR** -> usar ColorPicker en Google)');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 120000, errors: ['TIME'] }).then((collected) => {
                            datos_.push(collected.first().content);
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        yield msg.author.send('Su ROL ya fue creado!!\nSaludos, SHUX');
                        let roles_ = new Array(0);
                        for (let i = config_1.LVLs.length - 5; i < config_1.LVLs.length; i++) {
                            roles_.push(config_1.LVLs[i].roleLVL);
                        }
                        if (isUserEnable(roles_, msg.author.id)) {
                            const newRole = new user_1.User(this.dsClient);
                            console.log(datos_);
                            newRole.createRole(msg.author.id, datos_[0], datos_[1]);
                        }
                        break;
                    }
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
                        for (let i = config_1.LVLs.length - 5; i < config_1.LVLs.length; i++) {
                            roles_.push(config_1.LVLs[i].roleLVL);
                        }
                        if (isUserEnable(roles_, msg.author.id)) {
                            const newRole = new user_1.User(this.dsClient);
                            console.log(datos_);
                            newRole.createRole(msg.author.id, datos_[0], datos_[1]);
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
                            .addField('Warnings: ', miPerfil.warns, false)
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
                        msg.reply(config_1.listaErr.votoMe.info);
                    }
                }
                else if (msg.content.toLocaleLowerCase().includes('shux!ping')) {
                    msg.reply('pong');
                }
                else if (msg.channel.id == config_1.channelsTC.vicioroom.idTC && msg.content.toLowerCase().startsWith('shux!vcgame') && isUserEnable(config_1.channelsTC.vicioroom.roles, msg.author.id)) {
                    const TCNombre = msg.content.substring(('shux!vcgame ').length);
                    (new juegos_1.Juegos(this.dsClient)).creategameChannel(TCNombre, msg.author.username);
                }
                else if (msg.content.toLowerCase().startsWith('shux!finticket') && isUserEnable(config_1.channelsTC.tickets.roles, msg.author.id)) {
                    if (this.shuxServe.channels.find('id', msg.channel.id).parentID == config_1.channelsTC.tickets.category) {
                        const closeTicket_ = new tickets_1.TicketSup(this.dsClient);
                        closeTicket_.cerrarTicket(msg);
                    }
                }
                if ((isUserEnable(config_1.channelsTC.warnings.roles, msg.author.id)) && (!(config_1.TESTMode))) {
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
                                const ShuxSev = this.dsClient.guilds.find('id', config_1.serverID).channels.find('id', config_1.channelsTC.warnings.idTC);
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
                                const ShuxSev = this.dsClient.guilds.find('id', config_1.serverID).channels.find('id', config_1.channelsTC.warnings.idTC);
                                ShuxSev.fetchMessage(razon[razon.length - 2]).then((msg) => { msg.delete(); });
                                ShuxSev.send('**REMOVE WARNING DE <@' + menUser.id + '>** por <@' + msg.author.id + '>\n__Razón/Prueba__: ' + razon[razon.length - 1]);
                            }
                        }
                    }
                }
            }
        });
    }
}
exports.MSGshux = MSGshux;
function isUserEnable(roles, userDSID) {
    var _a;
    const sv = _1.dsclient.guilds.get(config_1.serverID);
    for (let rol of roles) {
        if ((_a = sv.members.get(userDSID)) === null || _a === void 0 ? void 0 : _a.roles.has(rol))
            return true;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxpQ0FBOEI7QUFDOUIscUNBQTBFO0FBRTFFLHdCQUE2QjtBQUM3QixxQ0FBa0M7QUFDbEMsdUNBQXNDO0FBRXRDLE1BQWEsT0FBTztJQUVoQixZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUQ1QyxjQUFTLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQVEsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFDbEQsTUFBTSxDQUFDLEdBQW9CO1FBQ3ZCLElBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbEIsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO2lCQUM1QztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQUU7U0FDN0I7UUFDRCxJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQUUsT0FBTztTQUFFO0lBQ2xDLENBQUM7SUFDSyxLQUFLLENBQUMsR0FBb0I7O1lBQzVCLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbEQsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQUU7b0JBQ3JDLEtBQUssWUFBWSxDQUFDLENBQUM7d0JBQ2YsSUFBSSxNQUFNLEdBQWtCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxD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