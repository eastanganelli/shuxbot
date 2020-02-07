"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class roles {
    constructor(tcGuild, memGuild) {
        this.tcGuild = tcGuild;
        this.memGuild = memGuild;
    }
    reactiones(reaction, user) {
        const guildMember = reaction.message.guild.members.get(user.id);
        if (!user.bot) {
            switch (reaction.message.channel.id) {
                case '💻': {
                    break;
                }
                case 'roles': {
                    switch (reaction.message.channel.reaction.id) {
                        case '⚔️': {
                            break;
                        }
                        case '☔': {
                            break;
                        }
                        case '🔫': {
                            break;
                        }
                        case '🚗': {
                            break;
                        }
                        case '🌍': {
                            break;
                        }
                        case '💡': {
                            break;
                        }
                        case '🎮': {
                            break;
                        }
                    }
                }
            }
        }
    }
    quiteRoles(reaction, user) {
        const guildMember = reaction.message.guild.members.get(user.id);
        if (reaction.message.channel.id === '56465454' && !user.bot) {
            switch (reaction.emoji.name) {
                case "🔞": {
                    break;
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ3VpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxNQUFNLEtBQUs7SUFDUCxZQUFvQixPQUFxQixFQUFVLFFBQXFCO1FBQXBELFlBQU8sR0FBUCxPQUFPLENBQWM7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFhO0lBRXhFLENBQUM7SUFDRCxVQUFVLENBQUMsUUFBYSxFQUFFLElBQVM7UUFFL0IsTUFBTSxXQUFXLEdBQXdCLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JGLElBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1YsUUFBTyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLEtBQUssSUFBSSxDQUFDLENBQUM7b0JBRVAsTUFBTTtpQkFDVDtnQkFBQyxLQUFLLE9BQVEsQ0FBQyxDQUFBO29CQUNaLFFBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTt3QkFDekMsS0FBSyxJQUFJLENBQUMsQ0FBQzs0QkFFUCxNQUFNO3lCQUNUO3dCQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7NEJBRVIsTUFBTTt5QkFDVDt3QkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDOzRCQUVULE1BQU07eUJBQ1Q7d0JBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzs0QkFFVCxNQUFNO3lCQUNUO3dCQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7NEJBRVQsTUFBTTt5QkFDVDt3QkFBQyxLQUFLLElBQUksQ0FBQyxDQUFDOzRCQUVULE1BQU07eUJBQ1Q7d0JBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzs0QkFFVCxNQUFNO3lCQUNUO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFDRCxVQUFVLENBQUMsUUFBYSxFQUFFLElBQVM7UUFDL0IsTUFBTSxXQUFXLEdBQVEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRztZQUN6RCxRQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUN4QixLQUFLLElBQUksQ0FBQyxDQUFFO29CQUFHLE1BQU07aUJBQUU7YUFDMUI7U0FDSjtJQUNMLENBQUM7Q0FDSiJ9