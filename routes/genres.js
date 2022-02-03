const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { string } = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:5,
        maclength:50

    }
});

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name : {
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
}));

router.get('/',async(req,res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.post('/',async(req,res) => {
   
    const {error} = vallidatee(req.body);


    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let genre = new Genre({name:req.body.name});

    genre = await genre.save();
    res.send(genre);
})

router.put('/:id', async(req,res) => {
    const {error} = vallidatee(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const movie = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new:true});
    if(!movie) res.status(404).send('Course not found');

    
    res.send(movie);
    

    
})

router.delete('/:id', async(req,res) => {
    const movie = await Genre.findByIdAndRemove(req.params.id);
    if(!movie) {
        res.status(404).send('Course id not found');
    }

    res.send(movie);
})

function vallidatee(genre) {
    const schema = Joi.object({
        genre: Joi.string().min(3).required()
    });

    return schema.validate(genre);

}

module.exports = router ;