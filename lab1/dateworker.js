

function getCurrentDayNumber() {
    let date = new Date();
    return(date.getDay());
}

function convertNumberToDay(dayNumber) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'thursday', 'friday', 'saturday'];
    return days[dayNumber];
}

function printDay(){
    const dayNumber = getCurrentDayNumber();
    console.log('current day is:' + convertNumberToDay(dayNumber));
}

printDay();