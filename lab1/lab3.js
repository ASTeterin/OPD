function findOlderWorker() {
    const staff = {
        "Вася": 23,
        "Петя": 27,
        "Даша": 22,
    };
    if (Object.keys(staff).length != 0) {
        let olderWorker = Object.keys(staff)[0];
        let maxAge = staff[olderWorker];
        for (const name in staff) {

            if (maxAge < staff[name]) {
                maxAge = staff[name];
                olderWorker = name;
            }
        }
        let result = {};
        result[olderWorker] = maxAge;
        return result;   
    }
    return null;   
}

function printOlderWorker(olderWorker) {
    if (olderWorker != null)
        console.log(olderWorker);
    else
        console.log("объект не задан");
}

printOlderWorker(findOlderWorker());