const express = require("express")
let router = express.Router()
const controlleurs=require('./controller/Cparent')

router.get('/',controlleurs.ParentGet) 

router.post('/',controlleurs.ParentPost) 

module.exports= router