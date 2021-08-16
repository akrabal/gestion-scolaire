const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , elves, etablisements ,fraisscolaire  , matiers, notes ,parents,personeladmin,professeurs,Roles,typeFrais }=require('../models');
const bcrypt = require('bcrypt')
/*acceille*/
exports.acceuilleGet=async  (req, res, next) =>
{   chemin='/acceille'
   chemin=req.path;
   res.locals.headers=res.locals.headers+req.activ("acceille",chemin) 
   res.locals.headers=res.locals.headers+req.activ("connexion",chemin) 
   res.render('acceille');
}
exports.acceuillePost=async (req, res, next) => {
   chemin='/acceille'
}

/*directeur*/
   /* /directeur */
   exports.directeurGet=async (req, res, next) =>
   { 
      chemin='/directeur';
      res.locals.headers=res.locals.headers+req.activ("acceille",chemin) 
      res.locals.headers=res.locals.headers+req.activ("directeur",chemin) 
      res.render('personnelle/directeur/directeuracc');
   }
   exports.directeurPost=async  (req, res, next) => 
   {
      chemin='/directeur';
      res.render('personnelle/directeur/directeuracc.ejs');
   }
   /* /directeur/ajoutsecretaire */

   exports.ajoutSecretaireGet= async (req,res,next)=>{
      chemin='/directeur';
      res.locals.headers=res.locals.headers+req.activ("acceille",chemin) 
      res.locals.headers=res.locals.headers+req.activ("directeur",chemin) 
      res.render('personnelle/directeur/AjoutSecretaire')
    }
    exports.ajoutSecretairePost= async (req,res,next)=> {
        const error= validationResult (req)
       if (!error.isEmpty()) {
          errors=error.array()
          req.flash('error',errors) 
          res.redirect('/directeur')
       }         
       try {
         const etab = await etablisements.create({NomEtab: 'cool',adresseEtab: 'lome' , teleEtab:'92118764' })
        /* const etab = await etablisements.findOne({
            where:{
               NomEtab: 'cool',
            }
         })*/
          console.log(etab);
          const admin = await administration.create({cool:'bien',etablisementID: etab.id})
          admin.setEtablisement(etab)
          console.log( await admin.getEtablisement());
          const secretaire = await personeladmin.create({NomPersonel: req.body.Nom, prenomPersonel: req.body.prenom ,email: req.body.email , lieunaissPersonel: req.body.naissance , telPersonel: req.body.numTel, adminsID: admin.id})
          //secretaire.setAdministration(admin) 
          console.log(await secretaire.getAdministration());
          const compt = await CompteUtilisateur.create({NomUtilisateur: req.body.email, passwordUtilisateur: req.body.Nom+req.body.prenom, email:req.body.email,personelID: secretaire.id})
         
       } catch (error) {
          console.log(error);
       }   
     
          arraymsg=[]
          sucess={}
         sucess.msg='secretaire enregistrer'
         arraymsg.push(sucess)

         req.flash('sucess',arraymsg)
         res.redirect('/directeur')
     /* 
        */
      
    }


//connexion
exports.connexionGet= async (req, res, next) =>
{   
   chemin='/connexion';
   res.locals.headers=res.locals.headers+req.activ("acceille",chemin) 
   res.locals.headers=res.locals.headers+req.activ("connexion",chemin) 
   res.render('securiter/connexion');
}
exports.connexionPost= async (req, res, next) => { 
    const compt = await CompteUtilisateur.findOne({
       where:{
         email: req.body.email
       }
    })
    console.log(compt);
    if(compt!== null)
    { 
       function faillconection(msg)
       {
         error={}
         arraymsg=[]
         error.msg=msg
         arraymsg.push(error)
         req.flash('error',arraymsg)
         res.redirect('/connexion') 

       }
      if (bcrypt.compareSync(req.body.password,compt.passwordUtilisateur) )
      {
         
        sucess={}
        let arraymsg=[]
        sucess.msg='conection reussi'
        arraymsg.push(sucess) 
        req.flash('sucess',arraymsg)
         if (req.verifcompte(compt)) {
             req.session.user=compt;
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