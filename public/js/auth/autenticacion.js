class Autenticacion {

  onError(id) {
    console.log(`Sucedio un error al obtener el personaje: ${id}`)
  }

  async autEmailPass(email, password) {
    try {      
      let result = await firebase.auth().signInWithEmailAndPassword(email, password)
      window.location.replace("http://localhost:9080/blogs.html")
      alert(`Bienvenido ${result.user.displayName}`)
    } catch (id) {
      this.onError(id)
    }
  }

}
