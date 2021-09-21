const express = require("express")
let router = express.Router()
const controlleurs=require('./controller/Cprof')

router.get('/',controlleurs.profGet) 

router.post('/',controlleurs.profPost) 

router.get('/:id',controlleurs.ajoutnoteGet)
router.post('/:id',controlleurs.ajoutnotePost)

router.get('/listeconsulternote/:id',controlleurs.listenote) 
router.get('/etatsexe/:id/:mat',controlleurs.etatsexe)
router.get('/graphsexe/:id',controlleurs.graphsexe)
router.get('/etatMoyene/:id/:mat',controlleurs.etatMoyene)
router.get('/graphMoyene/:id',controlleurs.graphMoyene)
module.exports= router   