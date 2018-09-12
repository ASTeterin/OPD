function findOlderWorker() {
    const staff = {
        "Вася": 23,
        "Петя": 27,
        "Даша": 22,
    };
    if ([Object.keys(staff)].length != 0) {
        let olderWorker = Object.keys(staff)[0];
        let maxAge = staff[olderWorker];
        //console.log(olderWorker);
        for (const name in staff) {

            if (maxAge < staff[name]) {
                maxAge = staff[name];
                olderWorker = name;
            }
        }
        return olderWorker + ' ' + maxAge;    
    }   
}

function printOlderWorker(olderWorker) {
    console.log(olderWorker);
}

printOlderWorker(findOlderWorker());