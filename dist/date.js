"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("firebase/database");
const user_1 = require("./user");
class DateFNs {
    constructor(dsClient) {
        this.dsClient = dsClient;
        this.treintamin = 1000 * 6 * 30;
    }
    periodicWork() {
        setInterval(() => {
            this.electionsWinners();
        }, this.treintamin);
    }
    electionsWinners() {
        if (this.isTheLastDay()) {
            const elecciones = new user_1.User(this.dsClient);
            elecciones.eleccionesWinners();
        }
    }
    lastday(y, m) {
        return new Date(y, m + 1, 0).getDate();
    }
    isTheLastDay() {
        const today = new Date();
        if (today.getDate() == this.lastday(today.getFullYear(), today.getMonth()))
            return true;
        return false;
    }
}
exports.DateFNs = DateFNs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsNkJBQTJCO0FBRzNCLGlDQUE4QjtBQUc5QixNQUFhLE9BQU87SUFFaEIsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFEcEMsZUFBVSxHQUFXLElBQUksR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO0lBQ1UsQ0FBQztJQUU5QyxZQUFZO1FBQ1IsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVCLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUNELGdCQUFnQjtRQUNaLElBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFHRCxPQUFPLENBQUMsQ0FBYSxFQUFFLENBQWE7UUFDaEMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsWUFBWTtRQUNSLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBRyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQUcsT0FBTyxJQUFJLENBQUM7UUFDeEYsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUVSO0FBMUJELDBCQTBCQyJ9