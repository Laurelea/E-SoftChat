function CheckFunc(event) {
    //Обнуляем поля с ошибками:
    const nameError = document.querySelector("#nameErrorSpan");
    nameError.innerHTML = "";
    const pwError = document.querySelector("#pwErrorSpan");
    pwError.innerHTML = "";
    const repPwError = document.querySelector("#repPwErrorSpan");
    repPwError.innerHTML = "";
    const emailError = document.querySelector("#emailErrorSpan");
    emailError.innerHTML = "";
    const checkErrors = {
        name: [],
        pw: [],
        pwequal: [],
        email: [],
    };
    const regName = document.getElementById("regName");
    const regPw = document.getElementById("regPw");
    const regRepPw = document.getElementById("regRepPw");
    const regEmail = document.getElementById("regEmail");
    console.log("regPW.value: "+ regPw.value);
    //Проверяем имя
    if (regName.value.length <3 ) {
        // alert ("Caught name error");
        checkErrors.name.push("Минимальная длина имени пользователя - 3 символа");
        console.log(checkErrors.name[checkErrors.name.length-1]);
    }
    if (regName.value.match(/[a-zA-Z]+/) == null) {
        // alert ("Wrong symbols in User name!");
        checkErrors.name.push("Имя пользователя должно состоять только из латинских букв");
        console.log(checkErrors.name[checkErrors.name.length-1]);
    }
    if (regName.value.length > 10 ) {
        // alert ("Too long name!");
        checkErrors.name.push("Максимальная длина имени пользователя - 10 символов");
        console.log(checkErrors.name[checkErrors.name.length-1]);
    }
    //Проверяем пароль
    if (regPw.value.length < 8 ) {
        // alert ("Caught pass error");
        checkErrors.pw.push("Минимальная длина пароля - 8 символов");
        console.log(checkErrors.pw[checkErrors.pw.length-1]);
    }
    if (regPw.value.match(/^[a-zA-Z]+[a-zA-Z0-9]*$/) == null) {
        // alert ("Wrong symbols in pass!");
        checkErrors.pw.push("Пароль должен состоять из латинских букв и цифр и начинаться с буквы");
        console.log(checkErrors.pw[checkErrors.pw.length-1]);
    }
    if (regPw.value.length > 20 ) {
        // alert ("Too long pass!");
        checkErrors.pw.push("Максимальная длина пароля - 20 символов");
        console.log(checkErrors.pw[checkErrors.pw.length-1]);
    }
    //Проверяем, что пароли совпадают
    if (regPw.value != regRepPw.value ) {
        // alert ("Passwords not same!");
        checkErrors.pwequal.push("Пароли не совпадают");
        console.log(checkErrors.pwequal.length);
        console.log(checkErrors.pwequal[checkErrors.pwequal.length-1]);
    }
    //Проверяем емайл
    if (regEmail.value.match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/) == null) {
        // alert ("Wrong email format");
        checkErrors.email.push("Введите корректный адрес");
        console.log(checkErrors.email[checkErrors.email.length-1]);
    }
    // Собственно валидация
    //Если всё ок, выводим в консоль
    const ifAnyMks = [checkErrors.name.length, checkErrors.pw.length, checkErrors.pwequal.length, checkErrors.email.length];
    console.log(ifAnyMks.some( elem => elem != 0));
    if (!(ifAnyMks.some( elem => elem != 0))) {
        console.log("User name: " + regName.value);
        console.log("Password: " + regPw.value);
        console.log("Email: " + regEmail.value);
    //Если нет, выводим все ошибки в поля ошибок.
    } else {
        for (const i in checkErrors.name) {
            nameError.innerHTML = nameError.innerHTML +checkErrors.name[i] + "<br>";
            nameError.style.display = "inline-block";
        }
        for (const i in checkErrors.pw) {
            pwError.innerHTML = pwError.innerHTML + checkErrors.pw[i] + "<br>";
            pwError.style.display = "inline-block"
        }
        for (const i in checkErrors.pwequal) {
            repPwError.innerHTML = (checkErrors.pwequal[i] + "<br>");
            repPwError.style.display = "inline-block"
        }

        for (const i in checkErrors.email) {
            emailError.innerHTML = (checkErrors.email[i] + "<br>");
            emailError.style.display = "inline-block"

        }

    }
}

const formConst = document.getElementById("submitIt");
// console.log("UsersEmail: " + UsersEmail);


formConst.addEventListener("click", CheckFunc, false);


