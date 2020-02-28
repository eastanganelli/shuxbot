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
        return __awaiter(this, void 0, void 0, function* () {
            yield console.log('>>LOADING BOT...');
            const ShuxDevTC = this.dsclient.guilds.find('id', config_1.serverID).channels.find('id', '675061892863098890');
            yield ShuxDevTC.send('>>**INICIANDO SERVICIOS**');
            yield console.log('>>>>>DEBUG MODE: __' + config_1.TESTMode + '__');
            yield ShuxDevTC.send('>>>>>ESTADO DEBUG: __' + config_1.TESTMode + '__');
            yield firebase.auth().signInWithEmailAndPassword(config_1.db.user, config_1.db.pass).then(() => {
                console.log('>>>>>BOT DB Connected');
                ShuxDevTC.send('>>>>>ESTADO DB: __conectado__');
            }).catch((Err) => {
                console.log('>>>>>DB STATE:__' + Err + '__');
                ShuxDevTC.send('>>>>>ESTADO DB:__' + Err + '__');
            });
            yield ShuxDevTC.send('>>**CARGA FINALIZADA**');
            yield console.log('>>LOAD FINISH');
            yield ShuxDevTC.send('>>**BOT ENCENDIDO!!!**');
            yield console.log('>>BOT READY TO GO');
        });
    }
}
exports.IniBOT = IniBOT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHlDQUF5QztBQUN6Qyw2QkFBMkI7QUFDM0IseUJBQXVCO0FBQ3ZCLHFDQUFrRDtBQUVsRCxNQUFhLE1BQU07SUFDbEIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFDM0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDSyxVQUFVOztZQUNmLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sU0FBUyxHQUE0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGlCQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQy9ILE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRSxpQkFBUSxHQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRSxpQkFBUSxHQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdELE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLDBCQUEwQixDQUFDLFdBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDckMsU0FBUyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ2pELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFFLEdBQUcsR0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRSxHQUFHLEdBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUMvQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbkMsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDL0MsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0NBQ0Q7QUF0QkQsd0JBc0JDIn0=