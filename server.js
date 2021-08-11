//importations
const express = require('express')
const session = require('express-session')
const routconnexion = require('./Routes/connexion')
const routacceille = require('./Routes/acceille')
const routadministration= require('./Routes/administration')
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
app.use('/directeur',routadministration)


app.listen(port)  



