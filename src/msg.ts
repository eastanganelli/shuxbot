import * as Discord from "discord.js";
import { fbuser } from "./interfaces/users";
import { updateFC, getUser } from "./dbshux";
import { client } from ".";

    export function getMSG(msg: Discord.Message) {
        if(!(msg.author.bot)) { 
            if(msg.channel.type == 'dm') { dmSYS(msg); }
            else { pubSYS(msg); }
        }
        if(msg.author.bot)    { return; }
    }
    export async function dmSYS(msg: Discord.Message) {
        if(msg.content.toLocaleLowerCase().startsWith('shux!')) {
            switch (msg.content.toLocaleLowerCase()) {
                case 'shux!addfc':{
                    await msg.author.send('Por favor ingrese su fecha de cumpleaños\n**FORMATO: DIA/MES* - ejemplo: 31/5*');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected: any) => {
                        updateFC(msg.author.id,collected.first().content);
                        msg.author.send('Su fecha de cumpleaños ha sido guardada');
                    }).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    break;
                } case 'shux!consulta':{
                    await msg.author.send('Por favor escriba su consulta referida a **HARDWARE / SOFTWARE**\nSi desea cancelar -> #cancelar');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected: any) => {
                        client.channels.forEach((c: Discord.Channel) => {
                            if(c.id == '674045015084761127') {
                                const server_: any = client.guilds.get('392414185633611776');
                                server_.channels.get('674045015084761127').send('CONSULTA POR <@'+msg.author.id+'>\n'+collected.first().content);
                                msg.author.send('Mensaje enviado\nEspere su respuesta en <#674045015084761127>');
                            }
                        });
                    }).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    break;
                } case 'shux!presupuesto':{
                    await msg.author.send('Estamos bajos los presupuestos');
                    /* await msg.author.send(); */
                    break;
                } case 'shux!report':{
                
                    break;
                } case 'shux!propuesta':{
                    await msg.author.send('Por favor ingrese su fecha de cumpleaños\n**FORMATO: DIA/MES* - ejemplo: 31/5*\nSi desea cancelar -> #cancelar');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected: any) => {
                        /* saveFC(collected.first().content).then(() => {
                            msg.author.send('Su fecha de cumpleaños a sido guardada');
                        }); */
                    }).catch((err: any) => { msg.author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
                    break;
                } case 'shux!entrevista':{
                    await msg.author.send(`**FORMATO DE FORMULARIO PARA CONSULTOR (#💻consultas:@Consultor) / SHUXTESTER: (#devtest : @SHUXTESTER)**\n------------------------------------------------------------------------------------------------------------------------------------------------------\nPARA QUE ROL?\nPOR QUE QUERES SERLO?\nEXPERIENCIA?\nPOR QUE DEBEMOS ELEGIRTE?\n--------------------------------------------------------------------------------------------------------------------------------------------------------`);
                    await msg.author.send('Por favor, responda con el formato del formulario, en un solo msj.\nSi desea cancelar -> #cancelar\nComplete el formulario a continuacion, al terminar **presione Enter**');
                    await msg.author.dmChannel.awaitMessages((m: any) => msg.author.id == m.author.id, { max: 1, time: 60000, errors: ['TIME'] }).then((collected: any) => {
                        if(collected.first().content == '#cancelar') {
                            msg.author.send('Ha sido cancelada');
                        } else {
                            client.channels.forEach((c: Discord.Channel) => {
                                if(c.id == '674408701125459968') {
                                    const server_: any = client.guilds.get('392414185633611776');
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
    export async function pubSYS(msg: Discord.Message) {
        if(msg.content.startsWith('shux!')) {
            switch (msg.content) {
                case 'shux!perfil':{
                    getUser(msg.author.id).then((user_: any) => {
                        const userData: fbuser = user_;
                        let embed_: Discord.RichEmbed = new Discord.RichEmbed();
                        embed_.setTitle('Perfil de '+msg.author.username).setThumbnail(msg.author.displayAvatarURL).setColor('red').addField('Cumpleaños: '+String(userData.birth), false)
                        .addField('Reports: '+userData.report, false)
                        .addField('Expulsiones: '+userData.expulsiones, false)
                        .setTimestamp(msg.guild.members.get(msg.author.id)?.joinedAt)
                        msg.channel.send(embed_);
                    });
                    break;
                } default:
                    break;
            }

        }
    }