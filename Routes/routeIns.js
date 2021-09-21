const express = require("express")
let router = express.Router()
const controlleurs = require('./controller/CIns')
const{ body, check }=require('express-validator')

router.get('/',controlleurs.GetIns) 

router.post('/',controlleurs.PostIns) 
router.post('/ajoutdirecteurIns',[check('nom'," ce nom est invalid ").exists().isLength({min:3}), check('prenom'," ce Prenom est invalid").exists().isString().isLength({min:3}),check('email'," email invalid ").exists().isEmail(),check('lieunaissance'," lieu de naissance invalid").exists().isString().isLength({min:2}),check('numtel'," numero de telephone invalid").exists().isNumeric().isLength({min:8,max:8},check('sexe'," sexe invalid ").exists().isBoolean())],controlleurs.ajoutEtabdirecteurIns) 
module.exports= router