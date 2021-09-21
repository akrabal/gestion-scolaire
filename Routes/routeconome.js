const express = require("express")
let router = express.Router()
const controlleurs=require('./controller/Ceconome')

router.get('/',controlleurs.EconomeGet) 
router.post('/',controlleurs.EconomePost) 

//payement
router.get('/payement/:id',controlleurs.getlistpayement)
//router.post('/payement/:id')

//payementElv
router.get('/payementElv/:id',controlleurs.payerget)
router.post('/payementfinal/:idelv/:type',controlleurs.payerpost)

//etat

router.get('/solde/:id',controlleurs.etatEconome)
//router.post('/solde/:id')

//list
router.get('/list/:id',controlleurs.list)
module.exports= router