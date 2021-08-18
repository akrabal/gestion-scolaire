const express = require("express")
let router = express.Router()
const controlleurs=require('./controller/Cconnexion')

router.get('/', controlleurs.connexionGet) 

router.post('/',controlleurs.connexionPost) 

module.exports= router