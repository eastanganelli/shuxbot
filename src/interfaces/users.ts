export interface fbuser {
    points: number;
    birth: string;
    warns: number;
    urlbuild: string;
    customRole: string;
    customChat: Array<string>;
    supTicket: string;
    staffTicket: string;
    roles: Array<string>;
}
export interface fbvotaciones {
    dsIDs: Array<string|number>
}
export interface dbmee6 { avatar: string; detailed_xp: any; discriminator: string; guild_id:string; level: number; message_count: number; id: string; username: string; xp: number }