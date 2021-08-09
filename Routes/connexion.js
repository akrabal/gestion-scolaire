const express = require("express")
let router = express.Router()

router.get('/', (req, res, next) =>
{   
   res.render('securiter/connexion');
}) 

router.post('/',function (req, res, next) {
}) 

module.exports= router