const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');
const bcrypt = require('bcrypt')

exports.connexionGet= async (req, res, next) =>
{   
  if (!req.verifsession()) 
  { 
    chemin='/connexion';
    res.locals.headers=res.locals.headers+req.activ("acceille",chemin) 
    res.locals.headers=res.locals.headers+req.activ("connexion",chemin) 
    res.locals.headers=res.locals.headers+req.activ("inscription",chemin)
    res.render('securiter/connexion');
      
  } else{
     error={}
     arraymsg=[]
     error.msg="vous etes deja connecter "
     arraymsg.push(error)
     req.flash('danger',arraymsg)
     const compt = await CompteUtilisateur.findByPk(res.req.session.user.compt.id)
     req.findActionForRole(compt)  
  }  
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
      req.flash('danger',arraymsg)
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
        req.flash('success',arraymsg)
         if (await req.verifcompte(compt))
         {  
            req.session.user.compt=compt
            req.session.user.role= await compt.getRole()
      
            if (compt.ElevesID !== null)
             {
                 try { 
                       req.session.user.Eleve = await compt.getElefe()
                     } catch (error) {
                       console.log(error);
                       faillconection('votre compte a un probleme veillez contacter l\' administrateur')
                     }
             
              }

              if (compt.ParentID !== null) {
                try {
                req.session.user.Parent =await compt.getParent()
                } catch (error) {
                  console.log(error);
                
                }
               
              }
              if (compt.personelID !== null) {
               req.session.user.Personel =  await compt.getPersoneladmin()
               req.session.user.administration = await req.session.user.Personel.getEtablisement()
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
