import * as Discord from "discord.js";
import { User } from "./user";
import { serverID, channelsTC, listaErr, LVLs, TESTMode } from "./config";
import { fbuser } from "./interfaces/users";
import { dsclient } from ".";
import { Juegos } from "./juegos";
import { TicketSup } from "./tickets";

export class MSGshux {
    shuxServe: Discord.Guild = this.dsClient.guilds.find('id', serverID);
    constructor(private dsClient: Discord.Client) {  }
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
                case 'shux!micanal': {    
                    let datos_: Array<string> = new Array(0);  
                    await msg.author.send('Por favor, ingrese su nombre de Rol\nSi desea cancelar -> #cancelar');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 120000, errors: ['TIME'] }).then((collected: any) => {
                        datos_.push(collected.first().content);
                    }).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    await msg.author.send('Por favor, el color (Recuerde ingresar un color en formato COLOR sin #, puede usar ColorPicker en Google)');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 120000, errors: ['TIME'] }).then((collected: any) => {
                        datos_.push(collected.first().content);
                    }).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    await msg.author.send('Su ROL ya fue creado!!\nSaludos, SHUX');
                    let roles_: Array<string> = new Array(0);
                    for(let i=LVLs.length-5; i<LVLs.length; i++) { roles_.push(LVLs[i].roleLVL); }
                    if(isUserEnable(roles_, msg.author.id)) {
                        const newRole = new User(this.dsClient);
                        console.log(datos_)
                        //newRole.createRole(msg.author.id, datos_[0], datos_[1]);
                    } break;
                } default: break;
            }
        }
    }
    async pubSYS(msg: Discord.Message) {
        if(msg.content.toLocaleLowerCase().startsWith('shux!')) {
            if(msg.content.toLocaleLowerCase().startsWith('shux!perfil')) {
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
            } else if(msg.content.toLocaleLowerCase().startsWith('shux!mivoto')) {
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
            } else if(msg.channel.id == channelsTC.vicioroom.idTC && msg.content.toLowerCase().startsWith('shux!vcgame') && isUserEnable(channelsTC.vicioroom.roles, msg.author.id)) {
                const TCNombre: string = msg.content.substring(('shux!vcgame ').length,);
                (new Juegos(this.dsClient)).creategameChannel(TCNombre, msg.author.username);
            } else if(msg.content.toLowerCase().startsWith('shux!finticket') && isUserEnable(channelsTC.tickets.roles, msg.author.id)) {
                if(this.shuxServe.channels.find('id', msg.channel.id).parentID == channelsTC.tickets.category) {
                    const closeTicket_ = new TicketSup(this.dsClient);
                    closeTicket_.cerrarTicket(msg);
                }
            }
            if((isUserEnable(channelsTC.warnings.roles, msg.author.id)) && (!(TESTMode))) {
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
}
function isUserEnable(roles: Array<string>, userDSID: string): boolean {
    const sv: Discord.Guild|any = dsclient.guilds.get(serverID);
    for(let rol of roles) {
        if(sv.members.get(userDSID)?.roles.has(rol)) return true;
    } return false;
}