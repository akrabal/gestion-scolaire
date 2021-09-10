const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');


/*directeur*/
   /* /directeur */
   exports.directeurGet=async (req, res, next) =>
   {  
      
      
     
   if (req.verifsession()) 
   { 

      if (req.session.user.role.typeRole=='directeur'){
         res.locals.user= req.session.user
         res.render('personnelle/directeur/acceuille')
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
   exports.directeurPost=async  (req, res, next) => 
   {
      chemin='/directeur';
      res.locals.user= req.session.user
      res.render('personnelle/directeur/directeuracc.ejs');
   }







   /* /directeur/ajoutsecretaire */

   exports.ajoutSecretaireGet= async (req,res,next)=>{
      chemin='/directeur';
      res.locals.user= req.session.user 
      res.render('personnelle/directeur/AjoutSecretaire')
    }

    exports.ajoutSecretairePost= async (req,res,next)=> {
   
        const error= validationResult (req)
       if (!error.isEmpty()) {
          errors=error.array()
          req.flash('danger',errors) 
          res.redirect('/directeur/AjoutSecretaire')
       }else{
         try {
            
             const role1 = await roles.findOne({
               where:{
                   typeRole:'secretaire'
               }
           })
             const secretaire = await personeladmin.create({NomPersonel: req.body.nom, prenomPersonel: req.body.prenom ,emailPersonel: req.body.email , sexPersonel:req.body.sexe, lieunaissPersonel: req.body.naissance , telPersonel: req.body.numtel, etablisementID: req.session.user.administration.id})
             const compt = await CompteUtilisateur.create({NomUtilisateur: req.body.email, passwordUtilisateur: 'cool', email:req.body.email,personelID: secretaire.id,roleID: role1.id})
             arraymsg=[]
             sucess={}
            sucess.msg='secretaire enregistrer'
            arraymsg.push(sucess)
            req.flash('success',arraymsg)
            
          } catch (error) {
             console.log(error)
             
          }   
            res.redirect('/directeur')
      
       }         
       
    }


    //listeeco
    exports.listeco = async (req,res)=>
    {  
      if (req.verifsession()) 
      { 
   
         if (req.session.user.role.typeRole=='directeur'){
            res.locals.user= req.session.user
            res.render('personnelle/directeur/listeco')
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

    //listesecre
    exports.listesecre = async (req,res)=>
    {  
      if (req.verifsession()) 
      { 
   
         if (req.session.user.role.typeRole=='directeur'){
            res.locals.user= req.session.user
            res.render('personnelle/directeur/listeSecretaire')
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

    //listesurveil
    exports.listesurveil = async (req,res)=>
    {  
      if (req.verifsession()) 
      { 
   
         if (req.session.user.role.typeRole=='directeur'){
            res.locals.user= req.session.user
            res.render('personnelle/directeur/listesurveil')
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


    exports.ajoutEconomeGet= async (req,res,next)=> {

      if (req.verifsession()) 
      { 
   
         if (req.session.user.role.typeRole=='directeur'){
            res.locals.user= req.session.user
            res.render('personnelle/directeur/ajouteconome')
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
   

    exports.ajoutEconomePost= async (req,res,next)=> {
   
      const error= validationResult (req)
     if (!error.isEmpty()) {
        errors=error.array()
        req.flash('danger',errors) 
        res.redirect('/directeur/AjoutEconome')
     }else{
       try {
          
           const role1 = await roles.findOne({
             where:{
                 typeRole:'econome'
             }
         })
           const econome = await personeladmin.create({NomPersonel: req.body.nom, prenomPersonel: req.body.prenom ,emailPersonel: req.body.email , sexPersonel:req.body.sexe, lieunaissPersonel: req.body.naissance , telPersonel: req.body.numtel, adminsID: req.session.user.administration.id})
           const compt = await CompteUtilisateur.create({NomUtilisateur: req.body.email, passwordUtilisateur: 'cool', email:req.body.email,personelID: econome.id,roleID: role1.id})
          
        } catch (error) {
           console.log(error);
        }   
      
           arraymsg=[]
           sucess={}
          sucess.msg='econome enregistrer'
          arraymsg.push(sucess)
 
          req.flash('success',arraymsg)
          res.redirect('/directeur')
    
     }         
     
  }
  
  //surveillant

  exports.ajoutSurveillantGet= async (req,res,next)=> {

   if (req.verifsession()) 
   { 

      if (req.session.user.role.typeRole=='directeur'){
         res.locals.user= req.session.user
         res.render('personnelle/directeur/ajoutsurveillant')
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


 exports.ajoutSurveillantPost= async (req,res,next)=> {

   const error= validationResult (req)
  if (!error.isEmpty()) {
     errors=error.array()
     req.flash('danger',errors) 
     res.redirect('/directeur/AjoutSurveillant')
  }else{
    try {
       
        const role1 = await roles.findOne({
          where:{
              typeRole:'secretaire'
          }
      })
        const econome = await personeladmin.create({NomPersonel: req.body.nom, prenomPersonel: req.body.prenom ,emailPersonel: req.body.email , sexPersonel:req.body.sexe, lieunaissPersonel: req.body.lieunaissance , telPersonel: req.body.numtel, adminsID: req.session.user.administration.id})
        const compt = await CompteUtilisateur.create({NomUtilisateur: req.body.email, passwordUtilisateur: 'cool', email:req.body.email,personelID: econome.id,roleID: role1.id})
       
     } catch (error) {
        console.log(error);
     }   
   
        arraymsg=[]
        sucess={}
       sucess.msg='econome enregistrer'
       arraymsg.push(sucess)

       req.flash('success',arraymsg)
       res.redirect('/directeur')
 
  }         
  
}
