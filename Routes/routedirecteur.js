
const express = require("express")
const controlleurs=require('./controller')
const{ body, check }=require('express-validator')
let router = express.Router()

router.get( '/',controlleurs.directeurGet) 
router.post('/',controlleurs.directeurPost) 

router.get('/AjoutSecretaire',controlleurs.ajoutSecretaireGet) 
router.post('/AjoutSecretaire',[check('Nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('naissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numTel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutSecretairePost)
module.exports= router