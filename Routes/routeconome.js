const express = require("express")
let router = express.Router()
const controlleurs=require('./controller/Ceconome')

router.get('/',controlleurs.EconomeGet) 
router.post('/',controlleurs.EconomePost) 

module.exports= router