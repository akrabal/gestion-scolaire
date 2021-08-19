
const express = require("express")
const controlleurs=require('./controller/Cdirecteur')
const{ body, check }=require('express-validator')
let router = express.Router()
//premier page
router.get( '/',controlleurs.directeurGet) 
router.post('/',controlleurs.directeurPost) 

//router.get('/AjoutSecretaire',controlleurs.ajoutSecretaireGet) 
router.post('/AjoutSecretaire',[check('Nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('naissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numTel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutSecretairePost)
router.post('/AjoutEconome',[check('Nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('naissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numTel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutEconomePost)
module.exports= router