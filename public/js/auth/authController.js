$(() => {
  const auth = new Autenticacion()

  $('#btnInicioSesion').on("click",() => {
    const email = $('#login-email').val()
    const password = $('#login-pass').val()
    console.log(email)
    console.log(password)
    auth.autEmailPass(email, password)
  })

})
