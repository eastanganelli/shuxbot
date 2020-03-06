import * as Discord from "discord.js";
import { User } from "./user";
import { serverID, channelsTC, listaErr } from "./config";
import { fbuser } from "./interfaces/users";
import { dsclient } from ".";

export class MSGshux {
    oneday: number = 24*60*60*1000;
    constructor(private dsClient: Discord.Client) {
        
    }
    getMSG(msg: Discord.Message) {
        if(!(msg.author.bot)) { 
            if(msg.channel.type == 'dm') { this.dmSYS(msg); }
            else { this.pubSYS(msg); }
        }
        if(msg.author.bot) { return; }
    }
    async dmSYS(msg: Discord.Message) {
        if(msg.content.toLocaleLowerCase().includes('shux!')) {
            switch (msg.content.toLocaleLowerCase()) {
                case 'shux!addfc':{
                    await msg.author.send('Por favor ingrese su fecha de cumpleaños\n**FORMATO: DIA/MES* - ejemplo: 31/5*');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 63000, errors: ['TIME'] }).then((collected: any) => {
                        let user_ = new User(this.dsClient);
                        user_.setaddfc(msg.author.id,collected.first().content);
                        msg.author.send('Su fecha de cumpleaños ha sido guardada');
                    }).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    break;
                } case 'shux!presupuesto':{
                    await msg.author.send('Estamos bajos los presupuestos');
                    /* await msg.author.send(); */
                    break;
                } case 'shux!mibuild':{
                    await msg.author.send('Por favor, ingresa su URL del build de PicPartPicker\nSi no posee un enlace, vaya a https://pcpartpicker.com/');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected: any) => {
                        let user_ = new User(this.dsClient);
                        user_.setPCBuilf(msg.author.id,collected.first().content);
                        msg.author.send('Su build ha sido guardada');
                    }).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    break;
                } case 'shux!report':{
                
                    break;
                } case 'shux!propuesta':{
                    await msg.author.send('Por favor ingrese su segurencia / idea\nSi desea cancelar -> #cancelar');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 120000, errors: ['TIME'] }).then((collected: any) => {
                        this.dsClient.channels.forEach((c: Discord.Channel) => {
                            if(c.id == '673212666210287657') {
                                const server_: any = this.dsClient.guilds.get(serverID);
                                server_.channels.get('673212666210287657').send('**SUGERENCIA POR <@'+msg.author.id+'>**\n'+collected.first().content);
                                msg.author.send('Mensaje enviado\nEspere su respuesta en <#673212666210287657>');
                            }
                        });
                    }).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    break;
                } case 'shux!entrevista':{
                    await msg.author.send(`**FORMATO DE FORMULARIO PARA CONSULTOR (#💻consultas:@Consultor) / SHUXTESTER: (#devtest : @SHUXTESTER)**\n------------------------------------------------------------------------------------------------------------------------------------------------------\nPARA QUE ROL?\nPOR QUE QUERES SERLO?\nEXPERIENCIA?\nPOR QUE DEBEMOS ELEGIRTE?\n--------------------------------------------------------------------------------------------------------------------------------------------------------`);
                    await msg.author.send('Por favor, responda con el formato del formulario, en un solo msj.\nSi desea cancelar -> #cancelar\nComplete el formulario a continuacion, al terminar **presione Enter**');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected: any) => {
                        if(collected.first().content == '#cancelar') {
                            msg.author.send('Ha sido cancelada');
                        } else {
                            this.dsClient.channels.forEach((c: Discord.Channel) => {
                                if(c.id == '674408701125459968') {
                                    const server_: any = this.dsClient.guilds.get('392414185633611776');
                                    server_.channels.get('674408701125459968').send('<@'+msg.author.id+'>\n'+collected.first().content);
                                    msg.author.send('Mensaje enviado\nEspere su respuesta en <#674408701125459968>\n**:white_check_mark: ACEPTADO - :x: RECHAZADO - :loudspeaker: REVISION - :speech_balloon: VA A PRUEBA**\n*Puede haber preguntas o plantear un problema y tener que resolverlo*');
                                }
                            });
                        }
                    }).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    break;
                } default:
                    break;
            }

        }
    }
    async pubSYS(msg: Discord.Message) {
        if(msg.content.toLocaleLowerCase().includes('shux!')) {
            if(msg.content.toLocaleLowerCase().includes('shux!perfil')) {
                let user_ = new User(this.dsClient);
                user_.getMyProfile(msg.author.id).then((miPerfil: fbuser|any) => {
                    let embed_: Discord.RichEmbed = new Discord.RichEmbed();
                    embed_.setTitle('Perfil de '+msg.author.username).setThumbnail(msg.author.displayAvatarURL).setColor('red').addField('Cumpleaños: ', String(miPerfil.birth), false)
                    .addField('Mi PC: ', miPerfil.urlbuild, false)
                    .addField('Warnings: ', miPerfil.warns, false)
                    .setTimestamp(msg.guild.members.get(msg.author.id)?.joinedAt)
                    msg.channel.send(embed_);
                }).catch(() => {
                    msg.reply('NO tenes un perfil creado')
                });
            } else if(msg.content.toLocaleLowerCase().includes('shux!mivoto')) {
                //#region vars
                    let user_ = new User(this.dsClient);
                    let menUser = msg.mentions.users.first();
                    console.log(menUser.username)
                //#endregion
                if(msg.author.id!=menUser.id) {
                    user_.setVoto(msg.author.id, msg.mentions.users.first().id).then((res: any) => { msg.reply(res); }).catch((err) => { msg.reply(err); });
                } else { msg.reply(listaErr.votoMe.info); }
            } else if(msg.content.toLocaleLowerCase().includes('shux!ping')) {
                msg.reply('pong');
            }
        } if(msg.channel.id == channelsTC.consulta.idTC || msg.channel.id == channelsTC.entrevista.idTC || msg.channel.id == channelsTC.sugerencia.idTC) { //TC especiales
            if(msg.content.toLowerCase().startsWith('shux!ticket') || msg.content.toLowerCase().startsWith('shux!finticket') || isUserEnable(channelsTC.consulta.roles, msg.author.id)) {
                if(msg.content.toLowerCase().startsWith('shux!finticket') && isUserEnable(channelsTC.consulta.roles, msg.author.id)) {
                    const usuario = new User(this.dsClient);
                    let menUser = msg.mentions.users.first();
                    await menUser.send('Su ticket de **Consulta / Ayuda** en <#'+channelsTC.consulta.idTC+'> fue cerrado.\nCalifique del 1 al 10 como fue... *Tiene 24hs (1 Día) para calificar*');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: this.oneday, errors: ['TIME'] }).then(async (collected: any) => {
                        usuario.updatePoints(menUser.id, 100);
                        msg.author.send('Muchas gracias por calificar.\nHa recibido 100pts.\nSaludos, <@673655111041548288>').then(() => {
                            const tecnicos: Discord.TextChannel|any = this.dsClient.guilds.find('id', serverID).channels.find('id', channelsTC.tecnicos.idTC);
                            tecnicos.send('El usuario <@'+menUser.id+'> califico la **CONSULTA / AYDUA**\n**'+collected.first().content+'/10**');
                        });
                    }).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!'); });
                }
                return;
            } else if(msg.content.toLowerCase().includes('shux!sugerencia') || isUserEnable(channelsTC.sugerencia.roles, msg.author.id)) {
                return;
            } else if(msg.content.toLowerCase().includes('shux!entrevista') || isUserEnable(channelsTC.entrevista.roles, msg.author.id)) {
                return;
            } else { 
                if(!(msg.content.toLocaleLowerCase().startsWith('shux!warn') && msg.content.toLocaleLowerCase().includes('-'))){
                    msg.delete();
                msg.author.send('Para publicar un mensaje en <#674045015084761127> | <#673212666210287657> | <#674408701125459968>\n Haga click en este enlace para leer los comandos de SHUX -> https://discordapp.com/channels/392414185633611776/674086159697313833/678965114656784394')
                }
            }
        } else if(isUserEnable(channelsTC.warnings.roles, msg.author.id)) {
            if(msg.content.toLocaleLowerCase().startsWith('shux!warn') && msg.content.toLocaleLowerCase().includes('-')) {
                const usuario = new User(this.dsClient);
                let menUser = msg.mentions.users.first();
                if(menUser.username != undefined || menUser.id != undefined) {
                    const razon = msg.content.split('-');
                    {
                        usuario.updateWarn(menUser.id, '+');
                        menUser.send('**FUE WARNEADO**\nMotivo de reporte: '+razon[razon.length-1]+'\nPara más info contactarse con Moderadores en <#501500942122745880>\nSHUX');
                    }
                    {
                        const ShuxSev: Discord.TextChannel|any = this.dsClient.guilds.find('id', serverID).channels.find('id', channelsTC.warnings.idTC);
                        ShuxSev.send('**WARNING A <@' + menUser.id + '>** por <@' + msg.author.id + '>\n__Razón/Prueba__: ' + razon[razon.length-1]);
                    }
                }
            } else if(msg.content.toLocaleLowerCase().startsWith('shux!rmwarn') && msg.content.toLocaleLowerCase().includes('-')) {
                const usuario = new User(this.dsClient);
                let menUser = msg.mentions.users.first();
                if(menUser.username != undefined || menUser.id != undefined) {
                    const razon = msg.content.split('-');
                    {
                        msg.delete();
                        usuario.updateWarn(menUser.id, '-');
                        menUser.send('**SU WARN FUE REMOVIDO** por <@'+msg.author.id+'>\nSHUX');
                    }
                    {
                        const ShuxSev: Discord.TextChannel|any = this.dsClient.guilds.find('id', serverID).channels.find('id', channelsTC.warnings.idTC);
                        ShuxSev.fetchMessage(razon[razon.length-2]).then((msg: any) => { msg.delete(); })
                        ShuxSev.send('**REMOVE WARNING DE <@' + menUser.id + '>** por <@' + msg.author.id + '>\n__Razón/Prueba__: ' + razon[razon.length-1]);
                    }
                }
            }
        }
    }
}
function isUserEnable(roles: Array<string>, userDSID: string): boolean {
    const sv: Discord.Guild|any = dsclient.guilds.get(serverID);
    for(let rol of roles) {
        if(sv.members.get(userDSID)?.roles.has(rol)) return true;
    } return false;
}