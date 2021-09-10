const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');

exports.profGet=async(req,res)=>{
    if (req.verifsession()) 
    { 
 
       if (req.session.user.role.typeRole=='professeurs'){
          chemin=req.baseUrl
          const classe = await classes.findAll()
          res.locals.classes =  classe ;
          res.locals.user= req.session.user
          return  res.render('professeurs/acceuille');
         }else{
          error={}
          arraymsg=[]
          error.msg="vous n'etes pas autoriser "
          arraymsg.push(error)
          req.flash('danger',arraymsg)
          return res.redirect('/connexion')  
       }
       
    } else{
       error={}
       arraymsg=[]
       error.msg="veillez vous connecter "
       arraymsg.push(error)
       req.flash('danger',arraymsg)
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
       req.flash('danger',arraymsg)
       return res.redirect('/connexion')    
    }  
 }


exports.ajoutnoteGet= async (req,res)=>{
   if (req.verifsession()) 
   { 
      if (req.session.user.role.typeRole=='professeurs'){
         id = req.params.id
         chemin=req.baseUrl
         const matier = await matiers.findByPk(req.session.user.prof.MatierID)
         res.locals.matiers=matier;
         const classe = await classes.findByPk(id)
         res.locals.eleves = await classe.getEleves()
         res.locals.user= req.session.user
         return  res.render('professeurs/ajoutnote');
        }else{
         error={}
         arraymsg=[]
         error.msg="vous n'etes pas autoriser "
         arraymsg.push(error)
         req.flash('danger',arraymsg)
         return res.redirect('/connexion')  }
      
   } else{
      error={}
      arraymsg=[]
      error.msg="veillez vous connecter "
      arraymsg.push(error)
      req.flash('danger',arraymsg)
      return res.redirect('/connexion')    
   }  
}



exports.ajoutnotePost=async (req,res)=>{
   id = req.params.id
   const matier = await matiers.findByPk(req.session.user.prof.MatierID)
   console.log(req.body);
   const classe = await classes.findByPk(id)
   const eleves = await classe.getEleves()
   for (let i = 0; i < eleves.length; i++) {
     
     console.log( await eleves[i].getNotes(req.body.note1)); 
      
   }
    
  res.redirect('/professeurs')
}