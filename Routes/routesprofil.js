const express = require("express")
let router = express.Router()
const controlleurs=require('./controller/Cprofil')

router.get('/',controlleurs.profilGet) 


module.exports= router