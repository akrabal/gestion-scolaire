//importations
const express = require('express')
const session = require('express-session')
const routeacceille = require('./Routes/routeacceille')
const routeconnexion = require('./Routes/routeconnexion')
const routeconome = require('./Routes/routeconome')
const routeDirecteur= require('./Routes/routedirecteur')
const routeEleves=require('./Routes/routeEleves')
const routeSecretaire = require('./Routes/routeSecretaire')
const routeParent = require('./Routes/routeParent')
const routeProf = require('./Routes/routeprof')
const routelogout= require('./Routes/routelogout')
const routeIns = require('./Routes/routeIns')

const port = 3000
let app = express()  
app.set('view engine','ejs') 

//middlware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'cool on mange bien ',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use('/assets',express.static('public'))
app.use(require('./middleware/flash'))
app.use(require('./middleware/asset'))
app.use(require('./middleware/RoleVerification'))
app.use(require('./middleware/security'))


//route

//acceuille
app.use('/',routeacceille)
//connexion
app.use('/connexion',routeconnexion);  
//Etablisement 
app.use('/inscription',routeIns)

//econome 
app.use('/econome',routeconome)

//directeur
app.use('/directeur',routeDirecteur)

//Eleves
app.use('/eleves',routeEleves)

//Parent
app.use('/parent',routeParent)

//prof
app.use('/professeurs',routeProf)

//secretaire
app.use('/secretaire',routeSecretaire)

//logout
app.use('/deconexion',routelogout)



 
app.listen(port)



