//#region IMPORTS
import * as discord from 'discord.js';
import { GuildChannel, GuildMember } from "discord.js";
//#region Plug

//#endregion
//#endregion

class roles {
    constructor(private tcGuild: GuildChannel, private memGuild: GuildMember) {

    }
    reactiones(reaction: any, user: any) {
        
        const guildMember: discord.GuildMember = reaction.message.guild.members.get(user.id);
        if(!user.bot) {
            switch(reaction.message.channel.id) {
                case '💻': {
    
                    break;
                } case 'roles' :{
                    switch(reaction.message.channel.reaction.id) {
                        case '⚔️': {
                            /* guildMember.addRoles(); */
                            break;
                        } case '☔': {
                            
                            break;
                        } case '🔫': {
                            
                            break;
                        } case '🚗': {
                            
                            break;
                        } case '🌍': {
                            
                            break;
                        } case '💡': {
                            
                            break;
                        } case '🎮': {
            
                            break;
                        }
                    }
                }
            }
        }
    }
    quiteRoles(reaction: any, user: any) {
        const guildMember: any = reaction.message.guild.members.get(user.id);
        if(reaction.message.channel.id === '56465454' && !user.bot ) {
            switch(reaction.emoji.name) {
                case "🔞":  {  break; }
            }
        }
    }
}