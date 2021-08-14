const express = require("express")
let router = express.Router()
const controlleurs=require('./controller')

router.get('/',controlleurs.acceuilleGet) 

router.post('/',controlleurs.acceuillePost) 

module.exports= router