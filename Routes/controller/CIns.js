const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');


exports.GetIns= async (req,res) =>{
   if (!req.verifsession()) 
   { 
    chemin='/inscription'
    res.locals.user= req.session.user
    return  res.render('securiter/inscription');
   } else{
      error={}
      arraymsg=[]
      error.msg="vous etes deja connecter "
      arraymsg.push(error)
      req.flash('danger',arraymsg)
      const compt = await CompteUtilisateur.findByPk(res.req.session.user.compt.id)
      req.findActionForRole(compt)  }

}

exports.PostIns = async (req,res) =>{
    
   res.redirect('/connexion')
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

 exports.ajoutProfIns = async (req, res) => {
  
   const error = validationResult(req)
   if (!error.isEmpty()) {
     errors=error.array()
     req.flash('danger',errors) 
     res.redirect('/inscription')
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
         res.redirect('/connexion')
   }
}

exports.ajoutParentIns = async (req, res) => {
  
   const error = validationResult(req)
   if (!error.isEmpty()) {
     errors=error.array()
     req.flash('danger',errors) 
     res.redirect('/inscription')
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

      res.redirect('/connexion')
     
   }
}


   exports.ajoutEtabdirecteurIns = async (req, res) => {
    
 
      const error = validationResult(req)
      if (!error.isEmpty()) {
        errors=error.array()
        req.flash('danger',errors) 
        res.redirect('/inscription')
      }else{
   
         try {
            const role2 = await roles.findOne({
               where:{
                   typeRole:'directeur'
                    }
                       })
                const etab = await etablisements.create({NomEtab:req.body.nomEtab,adresseEtab: req.body.adresseEtab , teleEtab:req.body.numtelEtab })
                const directeur = await personeladmin.create({NomPersonel: req.body.nom, prenomPersonel:req.body.prenom ,emailPersonel: req.body.password ,sexPersonel: req.body.sexe  , lieunaissPersonel: req.body.lieunaissance, telPersonel: req.body.numtel, etablisementID: etab.id})
                directeur.setEtablisement(etab)
                const compt = await CompteUtilisateur.create({NomUtilisateur: directeur.NomPersonel , passwordUtilisateur: req.body.password, email: directeur.emailPersonel,personelID: directeur.id,roleID: role2.id})
                arraymsg=[]
                sucess={}
               sucess.msg=' enregistrer'
               arraymsg.push(sucess)
               req.flash('success',arraymsg)
              
            
         } catch (error) {
            error={}
            arraymsg=[]
            error.msg="Etudiant non enregistre veillez contacter l'administrateur "
            arraymsg.push(error)
            req.flash('danger',arraymsg)
         }
        
   
      }
   
 
   }  
   
   




