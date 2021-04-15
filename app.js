//Подключили модуль
const express = require('express')
//Создали инстанс. = function handler
const app = express()
//Порт записали в переменную
const port = process.env.PORT || 3002
//Зарегистрировали движок:
app.set('view engine', 'ejs');
//Указываем папку для хранения шаблонов:
app.set('views', 'www')
//Зарегистрировали папку:
app.use(express.static("public"));

const homeRoutes =  require("./routes/home")

app.use(express.json())
app.use(express.urlencoded({
  extended: true,
}))

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



const io = require("socket.io")(server);

//Тут объект socket - расширение объекта EventEmitter, socket instance
//io - server instance
io.on('connection', (socket) => {
  console.log('New user connected')

  socket.username = "Guest"

  //Это новый  кусок по мануалу https://socket.io/get-started/chat
  //Почему-то работает
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  //кончился кусок

  //Это слушатель событий. Общий вид: socket.on(eventName, listener)
  socket.on('change_username', (data) => {
    console.log(socket.username + ' change username on ' + data.username)
    socket.username = data.username
  })

  socket.on('new_message', (data) => {
    //Это выводится в браузере:
    io.sockets.emit('add_message', {message : data.message, username : socket.username, className:data.className});
    console.log(socket.username +' send message ' + data.message)
  })

  socket.on('typing', (data) => {
    //broadcast означает, что сообщение покажут всем участникам. Это тоже выводится в браузере:
    socket.broadcast.emit('typing', {username : socket.username})
    console.log(socket.username +' typing')
  })
})
