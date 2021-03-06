'use strict'

var Album = require('../models/album');

function getAlbum(req, res){
  var albumId = req.params.id;
  Album.findById(albumId, (err, album)=>{
    if(err){
      res.status(500).send({message: "Error in petition"}); //no se usa return para que no tenga problemas en la cabecera
    }else{
      if(!album){
        res.status(404).send({message: "Album not found"}); 
      }else{
        res.status(200).send({album});
      }
    }
  })
}

function getAlbums(req, res){
  Album.find({}, (err, albums)=>{
    if(err){
      res.status(500).send({message: "Error in petition"}); //no se usa return para que no tenga problemas en la cabecera
    }else{
      if(!albums){
        res.status(404).send({message: "there are not albums"}); 
      }else{
        res.status(200).send({albums});
      }
    }
  })
}

function saveAlbum(req, res){
  var album = new Album(); //instance
  var params = req.body;
  album.title = params.title;
  album.description = params.description;
  album.save((err, albumStored)=>{
    if(err){
      res.status(500).send({message: "Error in petition, album not stored!!"});
    }else{
      if(albumStored){
        res.status(200).send({album: albumStored});
      }else{
        res.status(404).send({message: "Album not stored!"});
      }
    }
  });
}

function updateAlbum(req, res){
  var albumId = req.params.id; //<-- por url
  var update = req.body; //<- por el post/put
  Album.findByIdAndUpdate(albumId, update, (err,albumUpdated)=>{
    //trae el objeto antes que se actualizara
    if(err){
      res.status(500).send({message: "Error in petition, album not updated!!"});
    }else{
      if(!albumUpdated){
        res.status(404).send({message: "ERROR, album not found!"});
      }else{
        res.status(200).send({album: albumUpdated});
      }
    }
  });
}

function deleteAlbum(req, res){
  var albumId = req.params.id; //<-- por url
  Album.findByIdAndRemove(albumId, (err,albumDeleted)=>{
    //trae el objeto antes que se actualizara
    if(err){
      res.status(500).send({message: "Error in petition, album not deleted!!"});
    }else{
      if(!albumDeleted){
        res.status(404).send({message: "ERROR, album not found!"});
      }else{
        res.status(200).send({album: albumDeleted});
      }
    }
  });
}

module.exports = {
  getAlbum,
  getAlbums,
  saveAlbum,
  updateAlbum,
  deleteAlbum
};