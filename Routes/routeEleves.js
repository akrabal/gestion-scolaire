const express = require("express")
let router = express.Router()
const controlleurs=require('./controller/Celeves')

router.get('/',controlleurs.ElevesGet) 
router.get('/etatbulletin/:id',controlleurs.etatBulletin)
router.get('/voirnote/:id',controlleurs.voirnote) 
router.get('/buletin',controlleurs.bulletin) 
module.exports= router