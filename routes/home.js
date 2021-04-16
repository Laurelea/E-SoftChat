//Из экспресса берём подкласс Router

const {Router} = require("express")

//Создаём экземпляр
const router = Router()

router.get("/", (req, res) => {
    ///рендерим с помощью движка:
    res.render('index1', {
        title: "For test",
        isHome: true
    })
    // req.session.number = +1
})
//Экспортируем его:
module.exports = router
