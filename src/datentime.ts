//#region IMPORTS
//#region Plug

//#endregion
//#region KMPF

//#endregion
//#endregion

export function getWeekNumber() {
    const today: any = new Date();
    const firstDayOfYear: any = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
export function getDayOfYear(inDate: any) {
    let start:   any = new Date(inDate);
    //console.log(start);
    let now: any = new Date();
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    //console.log('Day of year: ' + day);
    return day;
}