const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , elves, etablisements ,fraisscolaire  , matiers, notes ,parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');


/*directeur*/
   /* /directeur */
   exports.directeurGet=async (req, res, next) =>
   {  
      
      
     // console.log(req.session.user);
   if (req.verifsession()) 
   { 

      if (req.session.user.role.typeRole=='directeur'){
         chemin=req.baseUrl
         res.locals.headers=res.locals.headers+req.activ("directeur",chemin) 
         res.locals.headers=res.locals.headers+req.activ("deconexion",chemin) 
         return  res.render('personnelle/directeur/directeuracc');
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
       }else{
         try {
            
             const role1 = await roles.findOne({
               where:{
                   typeRole:'secretaire'
               }
           })
             const secretaire = await personeladmin.create({NomPersonel: req.body.Nom, prenomPersonel: req.body.prenom ,emailPersonel: req.body.email , sexPersonel:req.body.sexe, lieunaissPersonel: req.body.naissance , telPersonel: req.body.numTel, adminsID: req.session.user.administration.id})
             const compt = await CompteUtilisateur.create({NomUtilisateur: req.body.email, passwordUtilisateur: 'cool', email:req.body.email,personelID: secretaire.id,roleID: role1.id})
            
          } catch (error) {
             console.log(error);
          }   
        
             arraymsg=[]
             sucess={}
            sucess.msg='secretaire enregistrer'
            arraymsg.push(sucess)
   
            req.flash('sucess',arraymsg)
            res.redirect('/directeur')
      
       }         
       
    }

    exports.ajoutEconomePost= async (req,res,next)=> {
   
      const error= validationResult (req)
     if (!error.isEmpty()) {
        errors=error.array()
        req.flash('error',errors) 
        res.redirect('/directeur')
     }else{
       try {
          
           const role1 = await roles.findOne({
             where:{
                 typeRole:'econome'
             }
         })
           const econome = await personeladmin.create({NomPersonel: req.body.Nom, prenomPersonel: req.body.prenom ,emailPersonel: req.body.email , sexPersonel:req.body.sexe, lieunaissPersonel: req.body.naissance , telPersonel: req.body.numTel, adminsID: req.session.user.administration.id})
           const compt = await CompteUtilisateur.create({NomUtilisateur: req.body.email, passwordUtilisateur: 'cool', email:req.body.email,personelID: econome.id,roleID: role1.id})
          
        } catch (error) {
           console.log(error);
        }   
      
           arraymsg=[]
           sucess={}
          sucess.msg='econome enregistrer'
          arraymsg.push(sucess)
 
          req.flash('sucess',arraymsg)
          res.redirect('/directeur')
    
     }         
     
  }

