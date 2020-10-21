class Posts{
    constructor() {
        this.db = firebase.firestore()        
    }

    consultarTodosPost() {
        // Nos registramos en posts para que firebase nos avise siempre
        // que haya una modificación en la colección posts
        this.db.collection('postsblog')
            .orderBy('date', 'desc')// param: asc | desc
            .onSnapshot(querySnapshot => {
                /* eliminamos todos los posts para volverlos a pintar */
                $('#postsblog').empty()
                if (querySnapshot.empty) {
                    /* sino hay posts */
                    $('#postsblog').append(this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.docs.forEach((post, index) => {
                        let postHtml = ""
                        let img = firebase.storage().ref('hero_img/OpenGL-in-Android.jpg')
                        if (index === 0) {                          
                            /* Trae el template de un Post */
                            postHtml = this.obtenerPostTemplateMain(
                                //Utilidad.format(post.data().content, 225),
                                Utilidad.format(post.data().summary, 225),
                                post.data().img,
                                post.data().title,
                                Utilidad.obtenerFecha(post.data().date.toDate()),
                                post.id
                            )
                            $('#postmain').append(postHtml)
                        }

                        /* Trae el template de un Post */
                        postHtml = this.obtenerPostTemplate(
                            //Utilidad.format(post.data().content, 128),
                            Utilidad.format(post.data().summary, 128),
                            post.data().img,
                            post.data().title,
                            Utilidad.obtenerFecha(post.data().date.toDate()),
                            post.id
                        )                        
                        $('#postsblog').append(postHtml)
                        const btns_vermas = document.querySelectorAll('.list-item-blog')
                        btns_vermas.forEach(btn => {
                            btn.addEventListener('click',(e)=>{
                                console.log(e.target.dataset.id)
                                window.location.href = `/blog.html?post=${e.target.dataset.id}`
                            })
                        })                   
                    })
                }
            })
    }

    obtenerTemplatePostVacio() {

        return `<article class="post-container">
          <img src="assets/img/post-img.png" alt="">
          <p>Título del blog post</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum modi perferendis ad inventore recusandae eveniet minima quidem voluptatibus.</p>
          <a href="#" class="blogs-button">Leer más</a>
        </article>`
    }

    obtenerPostTemplate(
        content,
        imagenLink,
        title,
        date,
        postId
    ) {
        return `<article class="post-container">
          <img src="${imagenLink}" alt="">
          <div class="content-posts"><h2><p>${title}</p></h2>
          <p>${content}</p>
          <p>${date}</p></div>
          <div class="leer-mas"><a href="#" class="blogs-button list-item-blog" data-id="${postId}">Leer más</a></div>
        </article>`
    }
    obtenerPostTemplateMain(
        content,
        imagenLink,
        title,
        date,
        postId
    ) {
        return `<h3></h3>
        <div class="blogs-news-img-container">
          <img src="${imagenLink}" alt="">
        </div>
        <div class="blogs-news-info-container">
          <h2>${title}</h2>
          <p>${content}</p>
          <p>${date}</p>
          <div class="leer-mas"><a href="#" class="blogs-button list-item-blog" data-id="${postId}">Leer más</a></div>
        </div>`
    }
}
