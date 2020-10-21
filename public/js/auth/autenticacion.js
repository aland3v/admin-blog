class Autenticacion {
  autEmailPass(email, password) {    
    firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      alert(`Bienvenido ${result.user.displayName}`)
      
    }).catch(error => {
      console.log("error: ",error)
    })
  }
}
