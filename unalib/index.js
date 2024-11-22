const validators = {
  phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/i,
  image: /\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i,
  video: /\.(mp4|webm|ogg)$/i,
  youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i
};

const escapeHtml = (unsafe) =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const getImageEmbedCode = (url) => {
  const escapedUrl = escapeHtml(url);
  return `<img src="${escapedUrl}" alt="Image" style="max-width: 200px; max-height: 200px;" />`;
};

const getVideoEmbedCode = (url) => {
  let videoId;

  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else {
    return escapeHtml(url);
  }

  return `<iframe width="200" height="113" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
};

const sanitizeMessage = (msg) => msg.replace(/[^a-zA-Z0-9\s.,?!-:_=/]/g, '');

const isValidPhone = (phone) => validators.phone.test(phone);
const isValidImageUrl = (url) => validators.image.test(url);
const isValidVideoUrl = (url) => validators.video.test(url);
const isValidYoutubeUrl = (url) => validators.youtube.test(url);

const validateMessage = (msg) => {
  let obj;

  try {
    obj = JSON.parse(msg);
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return msg;
  }

  obj.mensaje = decodeURIComponent(obj.mensaje).trim();
  obj.mensaje = sanitizeMessage(obj.mensaje);

  if (isValidPhone(obj.mensaje)) {
    console.log('Es un teléfono!');
  } else if (isValidImageUrl(obj.mensaje)) {
    console.log('Es una imagen!');
    obj.mensaje = getImageEmbedCode(obj.mensaje);
  } else if (isValidVideoUrl(obj.mensaje) || isValidYoutubeUrl(obj.mensaje)) {
    console.log('Es un video!');
    obj.mensaje = getVideoEmbedCode(obj.mensaje);
  } else {
    console.log('Es un texto!');
  }

  return JSON.stringify(obj);
};

module.exports = {
  is_valid_phone: isValidPhone,
  is_valid_image_url: isValidImageUrl,
  is_valid_video_url: isValidVideoUrl,
  is_valid_youtube_url: isValidYoutubeUrl,
  sanitizeMessage,
  escapeHtml,
  getImageEmbedCode,
  getVideoEmbedCode,
  validateMessage
};
