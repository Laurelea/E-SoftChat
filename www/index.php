<!DOCTYPE html>
<html lang="ru">

  <head>
    <meta charset="utf-8">
    <title>E-soft Chat project</title>
    <link rel="stylesheet" type="text/css" href="esoftchat.css">
    <link rel="icon" type="image/png" href="favicon-32x32.png">

  </head>

  <body>
  <h1 id="mainheader">Тут будет чат</h1>
  <div  id="authorize" class="mainblock">
      <h2>Авторизация:</h2>
      <form method="post">
          <p>E-mail:
              <input type="text" name="email_auth" size="40"></p>
          <p>Password:
              <input type="password" name="password_auth"></p>
          <p class="centerbutton">
              <input type="submit" value="Enter" class="centerbutton"/></p>
  </div>
  <div  id="addnewuser" class="mainblock">
      <h2>Регистрация</h2>
      <form method="post">
          <p>Name:
              <input type="text" name="name_reg" size="40"></p>
          <p>Password:
              <input type="password" name="password_reg"></p>
          <p>Repeat password:
              <input type="password" name="password_reg_repeat"></p>
          <p>E-mail:
              <input type="email" name="email_reg"></p>
          <p class="centerbutton"><input type="submit" value="AddNewUser" class="centerbutton"/></p>
  </div>
  </body>

</html>