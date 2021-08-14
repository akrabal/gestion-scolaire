//importations
const express = require('express')
const session = require('express-session')
const routconnexion = require('./Routes/routeconnexion')
const routacceille = require('./Routes/routeacceille')
const routdirecteur= require('./Routes/routedirecteur')
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

//route

//acceuille
app.use('/',routacceille)
//connexion
app.use('/connexion',routconnexion);  

//administration
app.use('/directeur',routdirecteur)


app.listen(port)



