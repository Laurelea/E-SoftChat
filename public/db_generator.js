// const list = [[`Laurelea`, `flsdfjlsjdflkjsdl`, `laurelea@mail.ru`], [`Slava`, `123217hh`, `slavinizm@yandex.ru`], [`Chuck`, `dsdgfdgfd`, `csev@unich.edu`], [`VSukh`, `35345`, `vsukh@mail.ru`], [`Lin`, `qwerty`, `xoma18@gmail.com`], [`Maman`, `risik`, `S.Maltseva@yandex.edu`], [`Tanya`, `angelina`, `stn1958@yandex.ru`], [`Bobr`, `kostponam`, `yukunu@mail.ru`]]
// list.forEach(function (item, i, list){
//     // console.log(list[i])
//     console.log("INSERT INTO users (user_name, password, email) VALUES ('" + item[0] + "', '" + item[1] + "', '" + item[2] + "');");
// })

const msg = [[`Hello`, 1],[`Hi`, 3],[`How are you?`, 1],[`Fine thanks`, 3],[`And you?`, 3],[`Me good too`, 1]];

msg.forEach(function (item, i, msg) {
    const mdate = new Date();
    console.log("INSERT INTO messages (message, date, user_id) VALUES ('" + item[0] + "', '" + mdate.toUTCString() + "', '" + item[1] + "');");
})