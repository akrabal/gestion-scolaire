const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');

exports.secretaireGet = async(req,res)=>{
    if (req.verifsession()) 
    { 
 
       if (req.session.user.role.typeRole=='secretaire'){
          chemin=req.baseUrl
          res.locals.user= req.session.user
          return  res.render('personnelle/secretaire/acceuille');
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

 exports.secretairePost = async(req,res)=>{
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

//prof
exports.getprof = async(req,res)=>{

   if (req.verifsession()) 
   { 
      res.locals.user= req.session.user
      res.render('personnelle/secretaire/ajoutprof')
   } else{
      error={}
      arraymsg=[]
      error.msg="veillez vous connecter "
      arraymsg.push(error)
      req.flash('danger',arraymsg)
      return res.redirect('/connexion')    
   }   
}  



exports.ajoutProfIns = async (req, res) => {
  
   const error = validationResult(req)
   if (!error.isEmpty()) {
     errors=error.array()
     req.flash('danger',errors) 
     res.redirect('/secretaire')
   }else{

      try {
         const role2 = await roles.findOne({
            where:{
                typeRole:'professeurs'
            }
        })
        const pro = await professeurs.create({NomProf:req.body.nom,prenomProf:req.body.nom,emailProf:req.body.email,sexProf:req.body.sexe,lieunaissProf: req.body.lieunaissance,telProf:req.body.numtel})
        const compt = await CompteUtilisateur.create({NomUtilisateur: pro.NomProf , passwordUtilisateur: req.body.password, email: pro.emailProf ,ProfID: pro.id,roleID: role2.id})
        arraymsg=[]
        sucess={}
       sucess.msg='enregistrer'
       arraymsg.push(sucess)

       req.flash('success',arraymsg)
       
         
      } catch (error) {
         console.log(error);
         error={}
         arraymsg=[]
         error.msg=" votre inscription n'a pas été enregistré veillez contacter l'administrateur "
         arraymsg.push(error)
         req.flash('danger',arraymsg)
      }
         res.redirect('/secretaire')
   }
}

//eleves 
exports.getetuIns=async(req,res)=>{
   res.locals.user= req.session.user
   res.render('personnelle/secretaire/ajoutEtudiant')
}

exports.ajoutEleveIns = async (req, res) => {

   const error = validationResult(req)
   if (!error.isEmpty()) {
     errors=error.array()
     req.flash('danger',errors) 
     res.redirect('/secretaire')
   }else{

      try{
        const role2 = await roles.findOne({
           where:{typeRole:'eleves'}
         })

        const elv = await Eleves.create({NomEleve: req.body.nom ,prenomEleve:req.body.prenom,emailEleve:req.body.email,sexEleve:req.body.sexe,lieunaissEleve: req.body.lieunaissance,telEleve:req.body.numtel })
        const compt = await CompteUtilisateur.create({NomUtilisateur: elv.NomEleve , passwordUtilisateur: 'cool', email: elv.emailEleve ,ElevesID: elv.id,roleID: role2.id})
        arraymsg=[]
        sucess={}
       sucess.msg=' enregistrer'
       arraymsg.push(sucess)

       req.flash('success',arraymsg)
      } catch (error) {
       console.log(error);
        error={}
        arraymsg=[]
        error.msg="votre inscription n'a pas été enregistré veillez contacter l'administrateur"
        arraymsg.push(error)
        req.flash('danger',arraymsg)
      }

      res.redirect('/secretaire')
   }

}

//Parent


exports.getpar = async(req,res)=>{

   res.locals.user= req.session.user
   res.render('personnelle/secretaire/ajoutParent')

}
 
exports.ajoutParentIns = async (req, res) => {
  
   const error = validationResult(req)
   if (!error.isEmpty()) {
     errors=error.array()
     req.flash('danger',errors) 
     res.redirect('/secretaire')
   }else{

      try {
         const role2 = await roles.findOne({
            where:{
                typeRole:'Parent'
            }})
           const pr = await Parents.create({NomParent:req.body.nom,prenomParent:req.body.prenom ,emailParent:req.body.email,sexParent:req.body.sexe,telParent:req.body.numtel})
           await CompteUtilisateur.create({NomUtilisateur: pr.NomParent , passwordUtilisateur:req.body.password , email: pr.emailParent ,ParentID: pr.id ,roleID: role2.id})
           arraymsg=[]
           sucess={}
          sucess.msg='enregistrer'
          arraymsg.push(sucess)
 
          req.flash('success',arraymsg)
         

      } catch (error) {
         console.log(error);
         error={}
         arraymsg=[]
         error.msg="votre  inscription n'a pas ete enregistrer veillez contacter l'administrateur "
         arraymsg.push(error)
         req.flash('danger',arraymsg)
      }

      res.redirect('/secretaire')
     
   }
}


