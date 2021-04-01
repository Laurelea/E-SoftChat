const formConst = document.getElementById("regForm");
// console.log("UsersEmail: " + UsersEmail);
var emailError = document.querySelector("#emailErrorSpan");
// console.log(emailError);
//

function CheckFunc() {
    const regName = document.getElementById("regName");
    const regPw = document.getElementById("regPw");
    const regRepPw = document.getElementById("regRepPw");
    const regEmail = document.getElementById("regEmail");
    if (regPw.value != regRepPw.value) {
        alert ("Passwords not same");
        return false;
    } else {
        alert ("Now OK");
    }
}

formConst.addEventListener("submit", function (event){
    //Если что-то неверно:
    if (formConst.validity.valid)
        // UsersEmail.setCustomValidity("Формат email")
        emailError.innerHTML = "";
    //Если всё ок:
    else
        console.log("Здесь будут введённые пользователем значения");
        // emailError.innerHTML = "Неверно";
})


