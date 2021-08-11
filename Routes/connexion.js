const express = require("express")
let router = express.Router()

router.get('/', (req, res, next) =>
{   
   chemin=req.path;
   res.locals.headers=res.locals.headers+req.activ("acceille",chemin) 
   res.locals.headers=res.locals.headers+req.activ("connexion",chemin) 
   res.render('securiter/connexion');
}) 

router.post('/',function (req, res, next) {
}) 

module.exports= router