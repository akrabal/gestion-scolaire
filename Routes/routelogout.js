const express = require("express")
const controlleurs=require('./controller/Clogout')
const{ body, check }=require('express-validator')
let router = express.Router()
router.get('/',controlleurs.logout)
module.exports= router