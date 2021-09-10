
const express = require("express")
const controlleurs=require('./controller/Cdirecteur')
const{ body, check }=require('express-validator')
let router = express.Router()
//premier page
router.get( '/',controlleurs.directeurGet) 
router.post('/',controlleurs.directeurPost) 

//listeco
router.get('/listeco',controlleurs.listeco)
//listesecretaire
router.get('/listesecre',controlleurs.listesecre)
//listesurveil
router.get('/listesurveil',controlleurs.listesurveil)


//ajoutbase econome
router.get('/AjoutEconome',[check('nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('lieunaissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numtel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutEconomeGet)
router.post('/AjoutEconome',[check('nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('lieunaissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numtel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutEconomePost)

//ajoutbase surveillant
router.get('/AjoutSurveillant',[check('nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('lieunaissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numtel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutSurveillantGet)
router.post('/AjoutSurveillant',[check('nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('lieunaissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numtel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutSurveillantPost)

//ajoutbase secretaire
router.get('/AjoutSecretaire',[check('nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('lieunaissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numtel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutSecretaireGet)
router.post('/AjoutSecretaire',[check('nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('lieunaissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numtel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutSecretairePost)

module.exports= router