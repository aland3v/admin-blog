class Utilidad {
    static obtenerFecha (timeStamp) {    
      const d = new Date(timeStamp)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear()
  
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
  
      return [day, month, year].join('/')
    }

    static format(text,max){
      return text.length > max ? text.slice(0,max)+'...' : text
    }
    static getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
  }
  