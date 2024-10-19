module.exports = {
    is_valid_phone: function (phone) {
        var isValid = false;
        var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
        
        try {
            isValid = re.test(phone);
        } catch (e) {
            console.log(e);
        } finally {
            return isValid;
        }
    },

    is_valid_image_url: function (url) {
        var imagePattern = /\.(jpeg|jpg|gif|png)$/i;
        return imagePattern.test(url);
    },

    is_valid_video_url: function (url) {
        var videoPattern = /\.(mp4|webm|ogg)$/i;
        return videoPattern.test(url);
    },

    is_valid_youtube_url: function (url) {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i;
        return youtubeRegex.test(url);
    },

    sanitizeMessage: function(msg) {
         return msg.replace(/[^a-zA-Z0-9\s.,?!-:_=/]/g, '');
      
    },

    validateMessage: function(msg) {
        var obj = JSON.parse(msg);
    
        obj.mensaje = decodeURIComponent(obj.mensaje);
      
        obj.mensaje = obj.mensaje.trim();
    
        obj.mensaje = this.sanitizeMessage(obj.mensaje);
   
        if (this.is_valid_phone(obj.mensaje)) {
            console.log("Es un teléfono!");
        } else {
            console.log("Es un texto!");
        }
    

        if (this.is_valid_image_url(obj.mensaje) || this.is_valid_video_url(obj.mensaje) || this.is_valid_youtube_url(obj.mensaje)) {
            console.log("URL válida detectada: " + obj.mensaje);
        } else {
            console.log("URL no válida o mensaje normal detectado");
        }
    
        return JSON.stringify(obj);
    },
    
};
