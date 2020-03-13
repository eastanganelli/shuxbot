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
const config_1 = require("./config");
class AdminStaff {
    constructor(dsClient) {
        this.dsClient = dsClient;
        this.shuxServe = this.dsClient.guilds.find('id', config_1.serverID);
    }
    setSugerencia(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = this.shuxServe.members.find('id', uid);
            yield author.send(`**FORMATO DE FORMULARIO EN <#684205035177115720> || NO RESPETAR EL FORMULARIS, SE PENALIZA CON WARN`);
            yield author.send('Por favor escriba su Ayuda | Consulta | Presupuesto | Reporte\nTiene 15 Minutos para responder || Si desea cancelar -> #cancelar');
            yield author.user.dmChannel.awaitMessages((m) => author.id == m.author.id, { max: 1, time: 15 * 60000, errors: ['TIME'] }).then((collected) => {
                if (collected.first().content == '#cancelar') {
                    author.send('Ha sido cancelada');
                }
                else {
                    const ch = this.shuxServe.channels.find('id', config_1.channelsTC.sugerencia.idTC);
                    ch.send('SUGERENCIA POR <@' + author.id + '>\n' + collected.first().content);
                    author.send('Mensaje enviado\nEspere su respuesta, Por Favor');
                }
            }).catch((err) => { author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
        });
    }
    setEntrevista(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = this.shuxServe.members.find('id', uid);
            yield author.send(`**FORMATO DE FORMULARIO EN <#684205035177115720> || NO RESPETAR EL FORMULARIOS, SE PENALIZA CON WARN`);
            yield author.send('Por favor, responda con el formato del formulario, en un solo msj.\nSi desea cancelar -> #cancelar\nComplete el formulario a continuacion, al terminar **presione Enter**');
            yield author.user.dmChannel.awaitMessages((m) => author.id == m.author.id, { max: 1, time: 5 * 60000, errors: ['TIME'] }).then((collected) => {
                if (collected.first().content == '#cancelar') {
                    author.send('Ha sido cancelada');
                }
                else {
                    const ch = this.shuxServe.channels.find('id', config_1.channelsTC.entrevista.idTC);
                    ch.send('<@' + author.id + '>\n' + collected.first().content);
                    author.send('Mensaje enviado\nEspere su respuesta, Por Favor');
                }
            }).catch((err) => { author.send('Se ha quedado sin tiempo!!\nVuelva a empezar'); });
        });
    }
}
exports.AdminStaff = AdminStaff;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxxQ0FBZ0Q7QUFFaEQsTUFBYSxVQUFVO0lBR25CLFlBQW9CLFFBQXdCO1FBQXhCLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBRi9DLGNBQVMsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxpQkFBUSxDQUFDLENBQUM7SUFFakIsQ0FBQztJQUMvQyxhQUFhLENBQUMsR0FBVzs7WUFDOUIsTUFBTSxNQUFNLEdBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0UsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7WUFDekgsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGtJQUFrSSxDQUFDLENBQUM7WUFDdEosTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFjLEVBQUUsRUFBRTtnQkFDckosSUFBRyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxJQUFJLFdBQVcsRUFBRTtvQkFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUNqQztxQkFBTTtvQkFDTixNQUFNLEVBQUUsR0FBNEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBQyxNQUFNLENBQUMsRUFBRSxHQUFDLEtBQUssR0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQztpQkFDL0Q7WUFDRixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLENBQUM7S0FBQTtJQUNLLGFBQWEsQ0FBQyxHQUFXOztZQUM5QixNQUFNLE1BQU0sR0FBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzRSxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0dBQXNHLENBQUMsQ0FBQztZQUMxSCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsMktBQTJLLENBQUMsQ0FBQztZQUMvTCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFO2dCQUNwSixJQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLElBQUksV0FBVyxFQUFFO29CQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7aUJBQ2pDO3FCQUFNO29CQUNOLE1BQU0sRUFBRSxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNuRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxNQUFNLENBQUMsRUFBRSxHQUFDLEtBQUssR0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQztpQkFDL0Q7WUFDRixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLENBQUM7S0FBQTtDQUNEO0FBaENELGdDQWdDQyJ9