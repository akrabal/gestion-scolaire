
const express = require("express")
const controlleurs=require('./controller/Csecretaire')
const{ body, check }=require('express-validator')
let router = express.Router()

router.get( '/',controlleurs.secretaireGet) 
//router.post('/',controlleurs.secretairePost) 

 
//router.post('/AjoutEleves',[check('Nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('naissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numTel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutSecretairePost)
module.exports= router