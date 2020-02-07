export interface channels {
    cuid: string;
    messages: Array<cMsg>;
}
export interface cMsg {
    tipo: string;
    titulo: string;
    msg: string;
    emojis: Array<string>
}