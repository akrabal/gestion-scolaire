//importations
const express = require('express')
const session = require('express-session')
const routconnexion = require('./Routes/connexion')
const routacceille = require('./Routes/acceille')
const port = 3000
let app = express() 
app.set('view engine','ejs') 

//middlware

app.use(session({
  secret: 'cool on mange bien ',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use('/assets',express.static('public'))

app.use(require('./middleware/flash'))

//acceuille
app.use('/',routacceille)
//connexion
app.use('/connexion',routconnexion);  


//route



.post(function (req, res, next) {

  
  
}) 
//affichage

//administration
app.route('/directeur')
.get( (req, res, next) =>
{ 
   res.render('/personelle/directeur');
}) 
.post(function (req, res, next) {
   res.render('personnelle/directeur/directeuracc.ejs');
}) 

app.listen(port)  



