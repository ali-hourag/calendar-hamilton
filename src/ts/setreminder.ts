

export function setReminderEvent() {


    let currentHour:string = getCurrentFormattedTime();
    let currentDay: string = getCurrentFormattedDate();

    if (localStorage.getItem("events") !== null) {

        let arrEndDate: string | null  = localStorage.getItem("events");
        if (arrEndDate === null) return;
        let events: Array<Event> = JSON.parse(arrEndDate);

            events.forEach((event)=>{
                 events.sort((firstDate, secondDate) => (firstDate.initialTime > secondDate.initialTime) ? 1 : -1);

                    let { initialDate, initialTime, isCheckedReminder } = event;
                        const initDate = initialDate.toString().slice(0,10);

                        let minutesDifference:number = getTotalMinutes(initialTime, currentHour);
                        if(initDate === currentDay){
                                if(isCheckedReminder){
                                    if( minutesDifference <= 0 ){
                                        return
                                    }
                                    if(minutesDifference <= 5){
                                        console.log('faltan menos de 5');
                                        console.log(minutesDifference);
                                        return
                                    } else if(minutesDifference <= 10){console.log('faltan menos de 10');
                                    console.log(minutesDifference);
                                } else if (minutesDifference <= 15){
                                    console.log('faltan menos de 15');
                                    console.log(minutesDifference);
                                } else if( minutesDifference <= 30){
                                    console.log('faltan menos de 30');
                                    console.log(minutesDifference);
                                } else if(minutesDifference <= 60)
                                    console.log('faltan menos de 60');
                                } else {
                                    console.log('No tiene recordatorio');
                            }
                    } else {
                        console.log('No es el mismo dia');
                    }
                })
    }
}
                                        