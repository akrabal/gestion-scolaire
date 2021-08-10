
const express = require("express")
const controlleurs=require('./controller')
let router = express.Router()

router.get( '/',controlleurs.directeur) 
router.post('/',function (req, res, next) {
   res.render('personnelle/directeur/directeuracc.ejs');
}) 
module.exports= router