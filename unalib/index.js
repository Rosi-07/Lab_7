export const unalib = {
    is_valid_phone: function (phone) {
        let isValid = false;
        const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;

        try {
            isValid = re.test(phone);
        } catch (e) {
            console.log(e);
        } finally {
            return isValid;
        }
    },

    is_valid_image_url: function (url) {
        const imagePattern = /\.(jpeg|jpg|gif|png)$/i;
        return imagePattern.test(url);
    },

    is_valid_video_url: function (url) {
        const videoPattern = /\.(mp4|webm|ogg)$/i;
        return videoPattern.test(url);
    },

    is_valid_youtube_url: function (url) {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i;
        return youtubeRegex.test(url);
    },

    sanitizeMessage: function (msg) {
        return msg.replace(/[^a-zA-Z0-9\s.,?!-:_]/g, '');
    },

    validateMessage: function (msg) {
        const obj = JSON.parse(msg);

        // Sanitizar el mensaje para prevenir inyecciones
        obj.mensaje = this.sanitizeMessage(obj.mensaje);

        // Validar si el mensaje es un teléfono
        if (this.is_valid_phone(obj.mensaje)) {
            console.log("Es un teléfono!");
        } else {
            console.log("Es un texto!");
        }

        // Validar URL de imágenes, videos y YouTube
        if (this.is_valid_image_url(obj.mensaje) || this.is_valid_video_url(obj.mensaje) || this.is_valid_youtube_url(obj.mensaje)) {
            console.log("URL válida detectada: " + obj.mensaje);
        } else {
            console.log("URL no válida o mensaje normal detectado");
        }

        return JSON.stringify(obj);
    }
};
