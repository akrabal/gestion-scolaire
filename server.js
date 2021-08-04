//importations
const express = require('express')
const session = require('express-session')
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


//route

//acceuille
app.route('/')
.get( (req, res, next) =>
{  
   
   res.render('acceille');
})  
.post(function (req, res, next) {
    
}) 

//connexion
app.route('/connexion')
.get( (req, res, next) =>
{   
   res.render('connexion');
}) 

.post(function (req, res, next) {

  
  
}) 
//affichage

app.route('/tab')
.get( (req, res, next) =>
{ 
   res.render('tab');
}) 
.post(function (req, res, next) {
}) 


app.listen(port)  



