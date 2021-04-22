//Подключили модуль
const express = require('express')
//Создали инстанс. = function handler
const app = express()
//Порт записали в переменную
const port = process.env.PORT || 3002

//Подключаем модуль сессий:
global.session = require(`express-session`)

//Зарегистрировали движок:
app.set('view engine', 'ejs');
//Указываем папку для хранения шаблонов:
app.set('views', 'www')
//Зарегистрировали папку:
app.use(express.static("public"));

//Прописываем руты:
const homeRoutes =  require("./routes/home")

//Это не знаю, зачем:
app.use(express.json())
app.use(express.urlencoded({
  extended: true,
}))

//Регистрируем сессию:
app.use(session ({
  secret: `some secret value`,
  resave: false,
  saveUninitialized: false
}))

//Регистрируем руты:
app.use("/",  homeRoutes)



//Обрабатываем запрос GET- при загрузке страницы
//"/" - route handler
//
// app.get('/', (req, res) => {
//   //Рендерит страничку index из папки www
//   res.render('index1')
// })

//Задаем слушатель:
// app.listen(port, () => {
//   console.log('Server is running on port ${PORT}')
//
// })

//Начинаем слушать:
server = app.listen(port, () => console.log(`Server is running... at http://localhost:${port}`));


//Подключаем библиотеку для работы с сокетами: Подключаем сервер. Можно передать порт первым аргументом: const io = require("socket.io")(3000);
//Инициализация io общий вид:
//const options = { /* ... */ };
// const io = require("socket.io")(options);
//
// io.on("connection", socket => { /* ... */ });
//
// io.listen(3000);
//This implicitly starts a Node.js HTTP server, which can be accessed through io.httpServer

//Подключаем модуль:
const io = require("socket.io")(server);


//Попытка посчитать кол-во пользователей чата, не работает
// global.numberOfUsers = {
//   current: 0,
//   update: function () {
//     this.current = +1
//   }
// };
//Другой вариант:
var numberOfUsers = 0;

//Пытаемся работать с БД:
//Подключаем модуль:
const pgp = require("pg-promise")(/*options*/);

//Создаём переменную соединения:
const db = pgp("postgres://laurelea:qwerty@host:5432/esoftchat");

// db.one("SELECT $1 AS value", 123)
//     .then(function (data) {
//       console.log("DATA:", data.value);
//     })
//     .catch(function (error) {
//       console.log("ERROR:", error);
//     });


//Тут объект socket - расширение объекта EventEmitter, socket instance
//io - server instance
io.on('connection', (socket) => {
  console.log('New user connected')
  numberOfUsers  += 1;
  console.log (`Всего юзеров: `+ numberOfUsers)
  socket.username = "Guest"
  // session.number = +1
  // console.log (`Всего юзеров: `+ session.number)


  //Это новый  кусок по мануалу https://socket.io/get-started/chat
  //Почему-то работает
  socket.on('disconnect', () => {
    numberOfUsers  -= 1;
    console.log (`Всего юзеров: `+ numberOfUsers)
    console.log('user disconnected');

    io.emit('disconnect', {username : socket.username, number: numberOfUsers})
    console.log(socket.username +' disconnected')

  });
  //кончился кусок

  //Это слушатель событий. Общий вид: socket.on(eventName, listener)
  //Получает с сокета клиента инфу о событии и массив данных
  socket.on('change_username', (data) => {
    console.log(socket.username + ' change username on ' + data.username)
    socket.username = data.username
    // io.sockets.emit ("", {});

    //io.emit - трансляция абсолютно всем участникам, в том числе тому, кто вызывает событие.
    io.emit('new', {username : socket.username, number: numberOfUsers})
    console.log(socket.username +' new user')


  })

  socket.on('new_message', (data) => {
    //Это выводится в браузере:
    io.sockets.emit('add_message', {message : data.message, username : socket.username, className:data.className});
    console.log(socket.username +' send message ' + data.message)
  })

  socket.on('typing', (data) => {
    //broadcast означает, что сообщение покажут всем участникам, кроме того, кто печатает: (вызывает событие). Это тоже выводится в браузере:
    socket.broadcast.emit('typing', {username : socket.username})
    console.log(socket.username +' typing')
  })
})
