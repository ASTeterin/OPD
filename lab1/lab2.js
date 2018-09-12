function main() {
    const user = {
        name: "Vasya",
        surname: "Petrov"
    };
    console.log(user.name + ' ' + user.surname);
    user.name = "Sergey";
    console.log(user.name + ' ' + user.surname);
    delete user.name;
    console.log(user);
}

main();