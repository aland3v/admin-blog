class Post {
  constructor() {
    this.db = firebase.firestore()
    const settings = { timestampsInSnapshots: true }
    this.db.settings(settings)
  }

  crearPost(uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
    return this.db
      .collection('postsblog')
      .add({
        uid: uid,
        autor: emailUser,
        titulo: titulo,
        descripcion: descripcion,
        imagenLink: imagenLink,
        videoLink: videoLink,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(refDoc => {
        console.log(`Id del post => ${refDoc.id}`)
      })
      .catch(error => {
        console.error(`Error creando el post => ${error}`)
      })
  }

  consultarPostxId(idPost) {
    var post = this.db.collection("postsblog").doc(idPost)
    post.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data())
        /* TODO asignar valores con jquery a los campos respectivos */
      } else {
        console.log("No se encontro Documento")
      }
    }).catch(function (error) {
      console.log("Error obteniendo documento: ", error)
    })
  }

  consultarTodosPost() {
    this.db
      .collection('postsblog')
      .orderBy('date', 'asc')
      .onSnapshot(querySnapshot => {
        $('#posts').empty()
        if (querySnapshot.empty) {
          $('#posts').append(this.obtenerTemplatePostVacio())
        } else {
          querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
              /* post.data().autor, */
              post.data().title,
              post.data().summary,
              post.data().content,
              post.data().img,
              post.data().imgpost,
              Utilidad.obtenerFecha(post.data().date.toDate())
            )
            $('#posts').append(postHtml)
          })
        }
      })
  }

  subirImagenPost(file, uid) {
    const refStorage = firebase.storage().ref(`imgsPosts/${uid}/${file.name}`)
    const task = refStorage.put(file)

    task.on(
      'state_changed',
      snapshot => {
        const porcentaje = snapshot.bytesTransferred / snapshot.totalBytes * 100
        $('.determinate').attr('style', `width: ${porcentaje}%`)
      },
      err => {
        Materialize.toast(`Error subiendo archivo = > ${err.message}`, 4000)
      },
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then(url => {
            console.log(url)
            sessionStorage.setItem('imgNewPost', url)
          })
          .catch(err => {
            Materialize.toast(`Error obteniendo downloadURL = > ${err}`, 4000)
          })
      }
    )
  }

  obtenerTemplatePostVacio() {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`
  }

  obtenerPostTemplate(
    title,
    summary,
    content,
    img,
    imgpost,
    date
  ) {
    return `<article class="post">
      <div class="post-titulo">
        <h5>${title}</h5>
      </div>
      <div class="post-descripcion summary">
        <p>${summary}</p>
      </div>
      <div class="post-video">
        <img id="imgmain" src='${img}' class="post-imagen-video"
          alt="Imagen Principal del Blog">
      </div>

      <div class="post-descripcion">
        <p>${content}</p>
      </div>
      <div class="post-video">
        <img id="imgpost" src='${imgpost}' class="post-imagen-video" alt="Imagen del Blog">
      </div>

      <div class="post-footer container">
        <div class="row">
          <div class="col m6">
            Fecha: ${date}
          </div>
          <div class="col m6">
            Autor: alan quispe
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col m6">
          <a href="#modal-editar-post" id="editar-post">Editar Post</a>
        </div>
        <div class="col m6">
          <a href="#" id="borrar-post">Borrar Post</a>
        </div>
      </div>
    </article>`
  }
}
