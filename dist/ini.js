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
const firebase = require("firebase/app");
require("firebase/database");
require("firebase/auth");
const config_1 = require("./config");
class IniBOT {
    constructor(dsclient) {
        this.dsclient = dsclient;
        this.iniLoading();
    }
    iniLoading() {
        console.log('>>LOADING BOT...');
        const ShuxDevTC = this.dsclient.guilds.find('id', config_1.serverID).channels.find('id', config_1.channelsTC.shuxestado.idTC);
        ShuxDevTC.fetchMessage(config_1.serverState).then((estadoMSG) => __awaiter(this, void 0, void 0, function* () {
            let ESTADO = new Array(0);
            yield estadoMSG.edit('>>**INICIANDO SERVICIOS** - ');
            yield console.log('>>>>>DEBUG MODE:' + config_1.TESTMode);
            yield estadoMSG.edit('>>**INICIANDO SERVICIOS** \ ');
            yield ESTADO.push('>>ESTADO DEBUG: __' + config_1.TESTMode + '__');
            yield estadoMSG.edit('>>**INICIANDO SERVICIOS** | ');
            yield firebase.auth().signInWithEmailAndPassword(config_1.db.user, config_1.db.pass).then(() => {
                console.log('>>>>>BOT DB Connected');
                estadoMSG.edit('>>**INICIANDO SERVICIOS** / ');
                ESTADO.push('>>ESTADO DB: __conectado__');
                estadoMSG.edit('>>**INICIANDO SERVICIOS** - ');
            }).catch((Err) => {
                console.log('>>>>>DB STATE:__' + Err + '__');
                estadoMSG.edit('>>**INICIANDO SERVICIOS** \ ');
                ESTADO.push('>>ESTADO DB:__' + Err + '__');
                estadoMSG.edit('>>**INICIANDO SERVICIOS** | ');
            });
            yield ESTADO.push('\n>>**CARGA FINALIZADA**');
            yield estadoMSG.edit('>>**INICIANDO SERVICIOS** - ');
            yield console.log('>>LOAD FINISH');
            yield ESTADO.push('>>**BOT ENCENDIDO!!!**');
            yield console.log('>>BOT READY TO GO');
            yield estadoMSG.edit(ESTADO);
        }));
    }
}
exports.IniBOT = IniBOT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHlDQUF5QztBQUN6Qyw2QkFBMkI7QUFDM0IseUJBQXVCO0FBQ3ZCLHFDQUEyRTtBQUUzRSxNQUFhLE1BQU07SUFDbEIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFDM0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDRCxVQUFVO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sU0FBUyxHQUE0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGlCQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNySSxTQUFTLENBQUMsWUFBWSxDQUFDLG9CQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTyxTQUFjLEVBQUUsRUFBRTtZQUNqRSxJQUFJLE1BQU0sR0FBa0IsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDckQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFFLGlCQUFRLENBQUMsQ0FBQztZQUFDLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ3RHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRSxpQkFBUSxHQUFDLElBQUksQ0FBQyxDQUFDO1lBQUMsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDN0csTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsMEJBQTBCLENBQUMsV0FBRSxDQUFDLElBQUksRUFBRSxXQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDckYsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUMzRixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRSxHQUFHLEdBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2dCQUMxRixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFFLEdBQUcsR0FBQyxJQUFJLENBQUMsQ0FBQztnQkFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDekYsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUFDLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ3BHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNuQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUM1QyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN2QyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQTFCRCx3QkEwQkMifQ==