const express = require("express")
let router = express.Router()

router.get('/', (req, res, next) =>
{   
   res.render('acceille');
}) 

router.post('/',function (req, res, next) {
    
}) 

module.exports= router