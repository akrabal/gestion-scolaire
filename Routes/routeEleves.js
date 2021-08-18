const express = require("express")
let router = express.Router()
const controlleurs=require('./controller/Celeves')

router.get('/',controlleurs.ElevesGet) 

router.post('/',controlleurs.ElevesPost) 

module.exports= router