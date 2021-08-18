const express = require("express")
let router = express.Router()
const controlleurs=require('./controller/Cprof')

router.get('/',controlleurs.profGet) 

router.post('/',controlleurs.profPost) 

module.exports= router