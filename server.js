//importations
const express = require('express')


const port = 3000
let app = express() 
app.set('view engine','ejs') 
app.use('/assets',express.static('public'))


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



