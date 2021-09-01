const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , elves, etablisements ,fraisscolaire  , matiers, notes ,parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');

exports.ElevesGet= async(req,res)=>{
    if (req.verifsession()) 
    { 
 
       if (req.session.user.role.typeRole=='eleves'){
          chemin=req.baseUrl
          res.locabbwwls.headers=res.locals.headers+req.activ("Eleves",chemin) 
          res.locals.headers=res.locals.headers+req.activ("deconexion",chemin) 
          return  res.render('eleves/acceuille');

         }else{
          error={}
          arraymsg=[]
          error.msg="vous n'etes pas autoriser "
          arraymsg.push(error)
          req.flash('error',arraymsg)
          return res.redirect('/connexion')  
       }
       
    } else{
       error={}
       arraymsg=[]
       error.msg="veillez vous connecter "
       arraymsg.push(error)
       req.flash('error',arraymsg)
       return res.redirect('/connexion')    
    }  
 
    
 
 
 }

 exports.ElevesPost= async(req,res)=>{
    if (req.verifsession()) 
    { 
 
       
    } else{
       error={}
       arraymsg=[]
       error.msg="veillez vous connecter "
       arraymsg.push(error)
       req.flash('error',arraymsg)
       return res.redirect('/connexion')    
    }  
 }
