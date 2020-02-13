import * as Discord from "discord.js";
import { User } from "./user";
import { serverID } from "./config";
import { fbuser } from "./interfaces/users";
import { asignarlvls } from "./index";

export class MSGshux {
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
                } case 'shux!consulta':{
                    await msg.author.send('Por favor escriba su consulta referida a **HARDWARE / SOFTWARE**\nSi desea cancelar -> #cancelar');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 120000, errors: ['TIME'] }).then((collected: any) => {
                        this.dsClient.channels.forEach((c: Discord.Channel) => {
                            if(c.id == '674045015084761127') {
                                const server_: any = this.dsClient.guilds.get(serverID);
                                server_.channels.get('674045015084761127').send('**CONSULTA POR <@'+msg.author.id+'>**\n'+collected.first().content);
                                msg.author.send('Mensaje enviado\nEspere su respuesta en <#674045015084761127>');
                            }
                        });
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
                    .addField('Warnings: ', miPerfil.report, false)
                    .addField('Expulsiones: ', miPerfil.expulsiones, false)
                    .setTimestamp(msg.guild.members.get(msg.author.id)?.joinedAt)
                    msg.channel.send(embed_);
                }).catch(() => {
                    msg.reply('NO tenes un perfil creado')
                });
            } if(msg.content.toLocaleLowerCase().includes('shux!mivoto')) {
                //#region vars
                    let user_ = new User(this.dsClient);
                    let menUser = msg.mentions.users.first();
                    console.log(menUser.username)
                //#endregion

                user_.setVoto(msg.author.id, msg.mentions.users.first().id);
            } if(msg.content.toLocaleLowerCase().includes('shux!translevel')) {
                asignarlvls(msg.author.id);
            }
        } 

    }
    
}