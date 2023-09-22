'use strict'

var express = require('express');
var BannerController = require('../controllers/BannerController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/banners'});

api.post('/registro_banner_admin',[auth.auth,path],BannerController.registro_banner_admin);
api.get('/listar_banners_admin/:filtro?',auth.auth,BannerController.listar_banners_admin);
api.get('/obtener_banner_banner/:img',BannerController.obtener_banner_banner);
api.get('/obtener_banner_admin/:id',auth.auth,BannerController.obtener_banner_admin);
api.put('/actualizar_descuento_admin/:id',[auth.auth,path],BannerController.actualizar_banner_admin);
api.delete('/eliminar_banner_admin/:id',auth.auth,BannerController.eliminar_banner_admin);

api.get('/listar_banners_admin_public',BannerController.listar_banners_admin_public);


// api.get('/obtener_descuento_activo',descuentoController.obtener_descuento_activo);

module.exports = api;