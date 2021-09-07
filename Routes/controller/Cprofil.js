const { render } = require('ejs');
const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');



exports.profilGet=async(req,res)=>{
    if (req.verifsession()) 
    { 
        res.render('securiter/profil')
      
    } else{
       error={}
       arraymsg=[]
       error.msg="veillez vous connecter "
       arraymsg.push(error)
       req.flash('error',arraymsg)
       return res.redirect('/connexion')    
    }  
 }
