const express = require("express")
let router = express.Router()
const controlleurs=require('./controller/Cprof')

router.get('/',controlleurs.profGet) 

router.post('/',controlleurs.profPost) 

router.get('/:id',controlleurs.ajoutnoteGet)
router.post('/:id',controlleurs.ajoutnotePost)
module.exports= router