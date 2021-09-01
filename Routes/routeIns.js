const express = require("express")
let router = express.Router()
const controlleurs = require('./controller/CIns')

router.get('/',controlleurs.GetIns) 

router.post('/',controlleurs.PostIns) 

module.exports= router