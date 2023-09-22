'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BannerSchema = Schema({
    // empresa: {type: Schema.ObjectId, ref: 'categoria', required: true},
    titulo: {type: String, required: true},
    banner: {type: String, required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('banner',BannerSchema);