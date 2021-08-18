const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , elves, etablisements ,fraisscolaire  , matiers, notes ,parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');

exports.profGet=async(req,res)=>{
    if (req.verifsession()) 
    { 
 
       if (req.session.user.role.typeRole=='professeurs'){
          chemin=req.baseUrl
          res.locals.headers=res.locals.headers+req.activ("professeurs",chemin) 
          res.locals.headers=res.locals.headers+req.activ("deconexion",chemin) 
          return  res.render('professeurs/acceuille');
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
 
 
 exports.profPost=async(req,res)=>{
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