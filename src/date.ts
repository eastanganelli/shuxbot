//#region IMPORTS
//#region Plug
import * as Discord    from "discord.js";
import * as firebase   from "firebase/app";
import "firebase/database";
//#endregion
import { serverID } from "./const";
import { User } from "./user";
//#endregion

export class DateFNs {
    private treintamin: number = 1000*6*30;
    constructor(private dsClient: Discord.Client) {  }
    //#region FNs
        periodicWork() {
            setInterval(() => {
                this.electionsWinners();
            }, this.treintamin)
        }
        electionsWinners() {
            if(this.isTheLastDay()) {
                const elecciones = new User(this.dsClient);
                elecciones.eleccionesWinners();
            }
        }
    //#endregion
    //#region Controllers
        lastday(y: number|any, m: number|any){
            return new Date(y, m +1, 0).getDate();
        }
        isTheLastDay(): boolean {
            const today = new Date();
            if(today.getDate() == this.lastday(today.getFullYear(), today.getMonth()))  return true;
            return false;
        }
    //#endregion
}