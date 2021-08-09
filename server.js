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




//affichage

app.route('/tab')
.get( (req, res, next) =>
{ 
   res.render('tab');
}) 
.post(function (req, res, next) {
}) 


app.listen(port)  



