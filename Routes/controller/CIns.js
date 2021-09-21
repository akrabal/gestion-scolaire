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
   
   




