function CheckFunc() {
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
        checkErrors.name.push("User name must be at least 3 chars long");
        console.log(checkErrors.name[checkErrors.name.length-1]);
    }
    if (regName.value.match(/[a-zA-Z]+/) == null) {
        // alert ("Wrong symbols in User name!");
        checkErrors.name.push("User name must only contain Latin chars");
        console.log(checkErrors.name[checkErrors.name.length-1]);
    }
    if (regName.value.length > 10 ) {
        // alert ("Too long name!");
        checkErrors.name.push("User name must be max 10 chars long");
        console.log(checkErrors.name[checkErrors.name.length-1]);
    }
    //Проверяем пароль
    if (regPw.value.length < 8 ) {
        // alert ("Caught pass error");
        checkErrors.pw.push("Pass must be at least 8 chars long");
        console.log(checkErrors.pw[checkErrors.pw.length-1]);
    }
    if (regPw.value.match(/^[a-zA-Z][a-zA-Z0-9]$/) == null) {
        // alert ("Wrong symbols in pass!");
        checkErrors.pw.push("Pass must only contain Latin chars and digits");
        console.log(checkErrors.pw[checkErrors.pw.length-1]);
    }
    if (regPw.value.length > 20 ) {
        // alert ("Too long pass!");
        checkErrors.pw.push("Pass must be max 20 chars long");
        console.log(checkErrors.pw[checkErrors.pw.length-1]);
    }
    //Проверяем, что пароли совпадают
    if (regPw.value != regRepPw.value ) {
        // alert ("Passwords not same!");
        checkErrors.pwequal.push("Passwords are not same");
        console.log(checkErrors.pwequal.length);
        console.log(checkErrors.pwequal[checkErrors.pwequal.length-1]);
    }
    //Проверяем емайл
    if (regEmail.value.match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/) == null) {
        // alert ("Wrong email format");
        checkErrors.email.push("Enter correct email");
        console.log(checkErrors.email[checkErrors.email.length-1]);
    }
    //
    if (Object.keys(checkErrors).length == 0 ) {
        console.log("User name: " + regName.value);
        console.log("Password: " + regPw.value);
        console.log("Email: " + regEmail.value);
    } else {
        var nameError = document.querySelector("#nameErrorSpan");
        for (const i in checkErrors.name) {
            nameError.innerHTML = nameError.innerHTML +checkErrors.name[i] + "<br>";
            nameError.style.display = "inline-block"
        }
        var pwError = document.querySelector("#pwErrorSpan");
        for (const i in checkErrors.pw) {
            // pwError.innerHTML = (checkErrors.pw[i] + "<br>");
            // pwError.style.display = "inline-block"
            pwError.innerHTML = pwError.innerHTML + checkErrors.pw[i] + "<br>";
            pwError.style.display = "inline-block"
        }
        var repPwError = document.querySelector("#repPwErrorSpan");
        for (const i in checkErrors.pwequal) {
            repPwError.innerHTML = (checkErrors.pwequal[i] + "<br>");
            repPwError.style.display = "inline-block"
        }

        var emailError = document.querySelector("#emailErrorSpan");
        for (const i in checkErrors.email) {
            emailError.innerHTML = (checkErrors.email[i] + "<br>");
            emailError.style.display = "inline-block"

        }

    }
}

const formConst = document.getElementById("submitIt");
// console.log("UsersEmail: " + UsersEmail);


formConst.addEventListener("click", CheckFunc);


