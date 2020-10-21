$(() => {
  const auth = new Autenticacion()

  $('#btnInicioSesion').on("click",(event) => {
    event.preventDefault()
    const email = $('#login-email').val()
    const password = $('#login-pass').val()    
    auth.autEmailPass(email, password)
  })
})
