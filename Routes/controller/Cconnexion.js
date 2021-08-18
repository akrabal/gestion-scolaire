const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , elves, etablisements ,fraisscolaire  , matiers, notes ,parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');
const bcrypt = require('bcrypt')

exports.connexionGet= async (req, res, next) =>
{   
   req.firewall() 
   
      chemin='/connexion';
      res.render('securiter/connexion');
}      
   
exports.connexionPost= async (req, res, next) => { 
    const compt = await CompteUtilisateur.findOne({
       where:{
         email: req.body.email
       }
    })
    function faillconection(msg)
    {
      error={}
      arraymsg=[]
      error.msg=msg
      arraymsg.push(error)
      req.flash('error',arraymsg)
      res.redirect('/connexion') 
   }

    if(compt!== null)
    { 
       
      if (bcrypt.compareSync(req.body.password,compt.passwordUtilisateur) )
      {
         
        sucess={}
        let arraymsg=[]
        sucess.msg='conection reussi'
        arraymsg.push(sucess) 
        req.flash('sucess',arraymsg)
         if (await req.verifcompte(compt))
         {  
            req.session.user.compt=compt
            req.session.user.role= await compt.getRole()
      
            if (compt.ElevesID !== null) {
               req.session.user.Eleve = await compt.getEleve()
              }
              if (compt.ParentID !== null) {
               req.session.user.Parent =await compt.getParent()
              }
              if (compt.personelID !== null) {
               req.session.user.Personel =  await compt.getPersoneladmin()
               req.session.user.administration = await req.session.user.Personel.getAdministration()
              }
              if (compt.ProfID !== null) {
               req.session.user.prof = await compt.getProfesseur()
              }    
             req.findActionForRole(compt)
         }else{
             faillconection('votre compte a un probleme veillez contacter l\' administrateur')
         }
      }else{
             faillconection('email ou mots de passe incorrect')
      }

    }else{
            faillconection('email ou mots de passe incorrect')

    }
    
}
