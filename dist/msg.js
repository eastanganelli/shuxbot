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
const dbshux_1 = require("./dbshux");
const _1 = require(".");
function getMSG(msg) {
    if (!(msg.author.bot)) {
        if (msg.channel.type == 'dm') {
            dmSYS(msg);
        }
        else {
            pubSYS(msg);
        }
    }
    if (msg.author.bot) {
        return;
    }
}
exports.getMSG = getMSG;
function dmSYS(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        if (msg.content.toLocaleLowerCase().startsWith('shux!')) {
            switch (msg.content.toLocaleLowerCase()) {
                case 'shux!addfc': {
                    yield msg.author.send('Por favor ingrese su fecha de cumpleaños\n**FORMATO: DIA/MES* - ejemplo: 31/5*');
                    yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected) => {
                        dbshux_1.updateFC(msg.author.id, collected.first().content);
                        msg.author.send('Su fecha de cumpleaños ha sido guardada');
                    }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    break;
                }
                case 'shux!consulta': {
                    yield msg.author.send('Por favor escriba su consulta referida a **HARDWARE / SOFTWARE**\nSi desea cancelar -> #cancelar');
                    yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected) => {
                        _1.client.channels.forEach((c) => {
                            if (c.id == '674045015084761127') {
                                const server_ = _1.client.guilds.get('392414185633611776');
                                server_.channels.get('674045015084761127').send('CONSULTA POR <@' + msg.author.id + '>\n' + collected.first().content);
                                msg.author.send('Mensaje enviado\nEspere su respuesta en <#674045015084761127>');
                            }
                        });
                    }).catch((err) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    break;
                }
                case 'shux!presupuesto': {
                    yield msg.author.send('Estamos bajos los presupuestos');
                    break;
                }
                case 'shux!report': {
                    break;
                }
                case 'shux!propuesta': {
                    yield msg.author.send('Por favor ingrese su fecha de cumpleaños\n**FORMATO: DIA/MES* - ejemplo: 31/5*\nSi desea cancelar -> #cancelar');
                    yield msg.author.dmChannel.awaitMessages((m) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected) => {
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
                            _1.client.channels.forEach((c) => {
                                if (c.id == '674408701125459968') {
                                    const server_ = _1.client.guilds.get('392414185633611776');
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
exports.dmSYS = dmSYS;
function pubSYS(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        if (msg.content.startsWith('shux!')) {
            switch (msg.content) {
                case 'shux!perfil': {
                    dbshux_1.getUser(msg.author.id).then((user_) => {
                        var _a;
                        const userData = user_;
                        let embed_ = new Discord.RichEmbed();
                        embed_.setTitle('Perfil de ' + msg.author.username).setThumbnail(msg.author.displayAvatarURL).setColor('red').addField('Cumpleaños: ' + String(userData.birth), false)
                            .addField('Reports: ' + userData.report, false)
                            .addField('Expulsiones: ' + userData.expulsiones, false)
                            .setTimestamp((_a = msg.guild.members.get(msg.author.id)) === null || _a === void 0 ? void 0 : _a.joinedAt);
                        msg.channel.send(embed_);
                    });
                    break;
                }
                default:
                    break;
            }
        }
    });
}
exports.pubSYS = pubSYS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QyxxQ0FBNkM7QUFDN0Msd0JBQTJCO0FBRXZCLFNBQWdCLE1BQU0sQ0FBQyxHQUFvQjtJQUN2QyxJQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xCLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO1lBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQUU7YUFDdkM7WUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FBRTtLQUN4QjtJQUNELElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUs7UUFBRSxPQUFPO0tBQUU7QUFDckMsQ0FBQztBQU5ELHdCQU1DO0FBQ0QsU0FBc0IsS0FBSyxDQUFDLEdBQW9COztRQUM1QyxJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEQsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3JDLEtBQUssWUFBWSxDQUFDLENBQUE7b0JBQ2QsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO29CQUN4RyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUks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