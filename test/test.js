var unalib = require('../unalib/index');
var assert = require('assert');
//Pruebas

describe('unalib', function () {
  //Dentro de 'unalib', vamos a probar una función especifica
  describe('función is_valid_phone', function () {
    it('debería devolver true para 8297-8547', function () {
      //Esta es la comprobación
      assert.equal(unalib.is_valid_phone('8297-8547'), true);
    });
  });

  describe('función is_valid_image_url', function () {
    it('debería devolver true para URLs de imágenes', function () {
      assert.equal(
        unalib.is_valid_image_url('https://example.com/image.jpg'),
        true
      );
    });
    it('debería devolver false para URLs que no son imágenes', function () {
      assert.equal(
        unalib.is_valid_image_url('https://example.com/file.pdf'),
        false
      );
      assert.equal(
        unalib.is_valid_image_url('https://example.com/file.text'),
        false
      );
    });
  });

  describe('función is_valid_video_url', function () {
    it('debería devolver true para URLs de videos', function () {
      assert.equal(
        unalib.is_valid_video_url('https://example.com/video.mp4'),
        true
      );
    });
    it('debería devolver false para URLs que no son videos', function () {
      assert.equal(
        unalib.is_valid_video_url('https://example.com/file.jpg'),
        false
      );
    });
  });
});
