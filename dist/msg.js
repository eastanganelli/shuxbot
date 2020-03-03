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
class MSGshux {
    constructor(dsClient) {
        this.dsClient = dsClient;
        this.oneday = 24 * 60 * 60 * 1000;
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
                    case 'shux!addfc': {
                        yield msg.author.send('Por favor ingrese su fecha de cumpleaños\n**FORMATO: DIA/MES* - ejemplo: 31/5*');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 63000, errors: ['TIME'] }).then((collected) => {
                            let user_ = new user_1.User(this.dsClient);
                            user_.setaddfc(msg.author.id, collected.first().content);
                            msg.author.send('Su fecha de cumpleaños ha sido guardada');
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        break;
                    }
                    case 'shux!presupuesto': {
                        yield msg.author.send('Estamos bajos los presupuestos');
                        break;
                    }
                    case 'shux!mibuild': {
                        yield msg.author.send('Por favor, ingresa su URL del build de PicPartPicker\nSi no posee un enlace, vaya a https://pcpartpicker.com/');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected) => {
                            let user_ = new user_1.User(this.dsClient);
                            user_.setPCBuilf(msg.author.id, collected.first().content);
                            msg.author.send('Su build ha sido guardada');
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        break;
                    }
                    case 'shux!report': {
                        break;
                    }
                    case 'shux!propuesta': {
                        yield msg.author.send('Por favor ingrese su segurencia / idea\nSi desea cancelar -> #cancelar');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 120000, errors: ['TIME'] }).then((collected) => {
                            this.dsClient.channels.forEach((c) => {
                                if (c.id == '673212666210287657') {
                                    const server_ = this.dsClient.guilds.get(config_1.serverID);
                                    server_.channels.get('673212666210287657').send('**SUGERENCIA POR <@' + msg.author.id + '>**\n' + collected.first().content);
                                    msg.author.send('Mensaje enviado\nEspere su respuesta en <#673212666210287657>');
                                }
                            });
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        break;
                    }
                    case 'shux!entrevista': {
                        yield msg.author.send(`**FORMATO DE FORMULARIO PARA CONSULTOR (#💻consultas:@Consultor) / SHUXTESTER: (#devtest : @SHUXTESTER)**\n------------------------------------------------------------------------------------------------------------------------------------------------------\nPARA QUE ROL?\nPOR QUE QUERES SERLO?\nEXPERIENCIA?\nPOR QUE DEBEMOS ELEGIRTE?\n--------------------------------------------------------------------------------------------------------------------------------------------------------`);
                        yield msg.author.send('Por favor, responda con el formato del formulario, en un solo msj.\nSi desea cancelar -> #cancelar\nComplete el formulario a continuacion, al terminar **presione Enter**');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected) => {
                            if (collected.first().content == '#cancelar') {
                                msg.author.send('Ha sido cancelada');
                            }
                            else {
                                this.dsClient.channels.forEach((c) => {
                                    if (c.id == '674408701125459968') {
                                        const server_ = this.dsClient.guilds.get('392414185633611776');
                                        server_.channels.get('674408701125459968').send('<@' + msg.author.id + '>\n' + collected.first().content);
                                        msg.author.send('Mensaje enviado\nEspere su respuesta en <#674408701125459968>\n**:white_check_mark: ACEPTADO - :x: RECHAZADO - :loudspeaker: REVISION - :speech_balloon: VA A PRUEBA**\n*Puede haber preguntas o plantear un problema y tener que resolverlo*');
                                    }
                                });
                            }
                        }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                        break;
                    }
                    default:
                        break;
                }
            }
        });
    }
    pubSYS(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.content.toLocaleLowerCase().includes('shux!')) {
                if (msg.content.toLocaleLowerCase().includes('shux!perfil')) {
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
                else if (msg.content.toLocaleLowerCase().includes('shux!mivoto')) {
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
            }
            if (msg.channel.id == config_1.channelsTC.consulta.idTC || msg.channel.id == config_1.channelsTC.entrevista.idTC || msg.channel.id == config_1.channelsTC.sugerencia.idTC) {
                if (msg.content.toLowerCase().startsWith('shux!finticket') || msg.content.toLowerCase().startsWith('shux!finticket') || isUserEnable(config_1.channelsTC.consulta.roles, msg.author.id)) {
                    if (msg.content.toLowerCase().startsWith('shux!finticket') && isUserEnable(config_1.channelsTC.consulta.roles, msg.author.id)) {
                        const usuario = new user_1.User(this.dsClient);
                        let menUser = msg.mentions.users.first();
                        yield menUser.send('Su ticket de **Consulta / Ayuda** en <#' + config_1.channelsTC.consulta.idTC + '> fue cerrado.\nCalifique del 1 al 10 como fue... *Tiene 24hs (1 Día) para calificar*');
                        yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: this.oneday, errors: ['TIME'] }).then((collected) => __awaiter(this, void 0, void 0, function* () {
                            usuario.updatePoints(menUser.id, 100);
                            msg.author.send('Muchas gracias por calificar.\nHa recibido 100pts.\nSaludos, <@673655111041548288>').then(() => {
                                const tecnicos = this.dsClient.guilds.find('id', config_1.serverID).channels.find('id', config_1.channelsTC.tecnicos.idTC);
                                tecnicos.send('El usuario <@' + menUser.id + '> califico la **CONSULTA / AYDUA**\n**' + collected.first().content + '/10**');
                            });
                        })).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!'); });
                    }
                    return;
                }
                else if (msg.content.toLowerCase().includes('shux!sugerencia') || isUserEnable(config_1.channelsTC.sugerencia.roles, msg.author.id)) {
                    return;
                }
                else if (msg.content.toLowerCase().includes('shux!entrevista') || isUserEnable(config_1.channelsTC.entrevista.roles, msg.author.id)) {
                    return;
                }
                else {
                    msg.delete();
                    msg.author.send('Para publicar un mensaje en <#674045015084761127> | <#673212666210287657> | <#674408701125459968>\n Haga click en este enlace para leer los comandos de SHUX -> https://discordapp.com/channels/392414185633611776/674086159697313833/678965114656784394');
                }
            }
            if (isUserEnable(config_1.channelsTC.warnings.roles, msg.author.id)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxpQ0FBOEI7QUFDOUIscUNBQTBEO0FBRTFELHdCQUE2QjtBQUU3QixNQUFhLE9BQU87SUFFaEIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFENUMsV0FBTSxHQUFXLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQztJQUcvQixDQUFDO0lBQ0QsTUFBTSxDQUFDLEdBQW9CO1FBQ3ZCLElBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbEIsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO2lCQUM1QztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQUU7U0FDN0I7UUFDRCxJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQUUsT0FBTztTQUFFO0lBQ2xDLENBQUM7SUFDSyxLQUFLLENBQUMsR0FBb0I7O1lBQzVCLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbEQsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQUU7b0JBQ3JDLEtBQUssWUFBWSxDQUFDLENBQUE7d0JBQ2QsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO3dCQUN4RyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFD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