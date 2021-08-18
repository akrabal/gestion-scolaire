const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , elves, etablisements ,fraisscolaire  , matiers, notes ,parents,personeladmin,professeurs,roles,typeFrais }=require('../models');
const bcrypt = require('bcrypt')
/*acceille*/
exports.acceuilleGet=async  (req, res, next) =>
{  
   
   chemin='/acceille'
   res.locals.headers=res.locals.headers+req.activ("acceille",chemin) 
   res.locals.headers=res.locals.headers+req.activ("connexion",chemin)
   res.render('acceille');
}
exports.acceuillePost=async (req, res, next) => {
   chemin='/acceille'
}





//connexion
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


//deconnexion
exports.logout= async (req,res)=>
{
   req.session.user=undefined
   res.redirect('/')
}


//Secretaire

exports.secretaireGet = async(req,res)=>{
   if (req.verifsession()) 
   { 

      if (req.session.user.role.typeRole=='secretaire'){
         chemin=req.baseUrl
         res.locals.headers=res.locals.headers+req.activ("secretaire",chemin) 
         res.locals.headers=res.locals.headers+req.activ("deconexion",chemin) 
         return  res.render('personnelle/secretaire/acceuille');
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


    //econome

    exports.EconomeGet= async (req,res)=>{
      if (req.verifsession()) 
      { 
   
         if (req.session.user.role.typeRole=='econome'){
            chemin=req.baseUrl
            res.locals.headers=res.locals.headers+req.activ("econome",chemin) 
            res.locals.headers=res.locals.headers+req.activ("deconexion",chemin) 
            return  res.render('personnelle/econome/acceuille');
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

   exports.EconomePost=async(req,res)=>{
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

   //Eleves

   exports.ElevesGet= async(req,res)=>{
      if (req.verifsession()) 
      { 
   
         if (req.session.user.role.typeRole=='Eleves'){
            chemin=req.baseUrl
            res.locals.headers=res.locals.headers+req.activ("Eleves",chemin) 
            res.locals.headers=res.locals.headers+req.activ("deconexion",chemin) 
            return  res.render('eleves/acceuille');

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

   exports.ElevesPost= async(req,res)=>{
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

   //parent 

   exports.ParentGet=async(req,res)=>{
      if (req.verifsession()) 
      { 
   
         if (req.session.user.role.typeRole=='Parent'){
            chemin=req.baseUrl
            res.locals.headers=res.locals.headers+req.activ("Parent",chemin) 
            res.locals.headers=res.locals.headers+req.activ("deconexion",chemin) 
            return  res.render('parents/acceuille');
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

exports.ParentPost=async(req,res)=>{
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

//prof

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