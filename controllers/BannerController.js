var Banner = require('../models/Banner');
var fs = require('fs');
var path = require('path');

const registro_banner_admin = async function(req,res){
    try {
        if(req.user){
             
                let data = req.body;
                //console.log(data);
                
                var img_path = req.files.banner.path;
                var name = img_path.split('/');
                var banner_name = name[2];
    
                data.banner = banner_name;
                let reg = await Banner.create(data);
    
                res.status(200).send({data:reg});
    
            
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    } catch (error) {
        // Si hay algún error, lo mostramos en la consola para depuración
        console.error('Error en la función registro_banner_admin:');
        console.error(error);
        // Enviamos una respuesta de error al cliente
        res.status(500).send({ message: 'Error en el servidor' });
    }   
    }
    
    const listar_banners_admin = async function(req,res){
        if(req.user){
            // if(req.user.role == 'admin'){
                
                var filtro = req.params['filtro'];
    
                let reg = await Banner.find({titulo: new RegExp(filtro, 'i')}).sort({createdAt:-1});
                res.status(200).send({data: reg});
    
            // }else{
            //     res.status(500).send({message: 'NoAccess'});
            // }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }
    
    const obtener_banner_banner = async function(req,res){
        var img = req.params['img'];
    
    
        fs.stat('./uploads/banners/'+img, function(err){
            if(!err){
                let path_img = './uploads/banners/'+img;
                res.status(200).sendFile(path.resolve(path_img));
            }else{
                let path_img = './uploads/default.jpg';
                res.status(200).sendFile(path.resolve(path_img));
            }
        })
    }
    
    const obtener_banner_admin = async function(req,res){
        if(req.user){
            // if(req.user.role =='admin'){
                
                var id = req.params['id'];
    
                try {
                    var reg = await Banner.findById({_id:id});
                    //console.log('reg');
                    //console.log(reg);
                    res.status(200).send({data:reg});
                } catch (error) {
                    res.status(200).send({data:undefined});
                }
    
            // }else{
            //     res.status(500).send({message: 'NoAccess'});
            // }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }
    
    
    const actualizar_banner_admin = async function(req,res){
        if(req.user){
            // if(req.user.role == 'admin'){
                let id = req.params['id'];
                let data = req.body;
    
                if(req.files){
                    //SI HAY IMAGEN
                    var img_path = req.files.banner.path;
                    var name = img_path.split('/');
                    var banner_name = name[2];
    
                    
                    let reg = await Banner.findByIdAndUpdate({_id:id},{
                        titulo: data.titulo,
                        banner: banner_name
                    });
    
                    fs.stat('./uploads/banners/'+reg.banner, function(err){
                        if(!err){
                            fs.unlink('./uploads/banners/'+reg.banner, (err)=>{
                                if(err) throw err;
                            });
                        }
                    })
    
                    res.status(200).send({data:reg});
                }else{
                    //NO HAY IMAGEN
                   let reg = await Banner.findByIdAndUpdate({_id:id},{
                        titulo: data.titulo,
                        
                   });
                   res.status(200).send({data:reg});
                }
                
            // }else{
            //     res.status(500).send({message: 'NoAccess'});
            // }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }
    
    const eliminar_banner_admin = async function(req,res){
        if(req.user){
            // if(req.user.role =='admin'){
                
                var id = req.params['id'];
    
                let reg = await Banner.findByIdAndRemove({_id:id});
                res.status(200).send({data:reg});
                
            // }else{
            //     res.status(500).send({message: 'NoAccess'});
            // }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }
    
    const obtener_banner_activo = async function(req,res){
        let banners = await Banner.find().sort({createdAt:-1});
        var arr_banners = [];
        var today = Date.parse(new Date().toString())/1000;
       
        banners.forEach(element => {
            var tt_inicio = Date.parse(element.fecha_inicio+"T00:00:00")/1000;
            var tt_fin = Date.parse(element.fecha_fin+"T23:59:59")/1000;
    
            if(today >= tt_inicio && today <= tt_fin){
                arr_banners.push(element);
            }
        });
    
        if(arr_banners.length >= 1){
            res.status(200).send({data:arr_banners});
        }else{
            res.status(200).send({data:undefined});
        }
    
    }
    const listar_banners_admin_public = async function(req,res){
        // if(req.user){
            // if(req.user.role == 'admin'){
                
                // var filtro = req.params['filtro'];
    
                // let reg = await Banner.find({titulo: new RegExp(filtro, 'i')}).sort({createdAt:-1});
                let reg = await Banner.find();
                res.status(200).send({data: reg});
    
            // }else{
            //     res.status(500).send({message: 'NoAccess'});
            // }
        // }else{
        //     res.status(500).send({message: 'NoAccess'});
        // }
    }
    
    module.exports = {
        registro_banner_admin,
        listar_banners_admin,
        obtener_banner_banner,
        obtener_banner_admin,
        actualizar_banner_admin,
        eliminar_banner_admin,
        obtener_banner_activo,
        listar_banners_admin_public
    }