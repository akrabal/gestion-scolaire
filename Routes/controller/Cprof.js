const { validationResult } = require('express-validator');
const { sequelize, classes, ClassEleves , administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');
const eleves = require('../../models/eleves');

exports.profGet=async(req,res)=>{
    if (req.verifsession()) 
    { 
 
       if (req.session.user.role.typeRole=='professeurs'){
          chemin=req.baseUrl
           const matier = await matiers.findOne({      
             where:{
               id:req.session.user.prof.MatierID
             } ,
          })
        
          res.locals.classes = await matier.getClasses() ;
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
         res.locals.id= id
         chemin=req.baseUrl
         //trouver les classe ensigner
         const matier = await matiers.findOne({      
            where:{
              id:req.session.user.prof.MatierID
            } ,
         })
       
         res.locals.classes = await matier.getClasses() ;
         //selection de la classe pour trouver les eleves de la classe 
         const classe = await classes.findByPk(id)
         res.locals.eleves = await classe.getEleves()
         res.locals.user= req.session.user
         res.locals.Matiere= matier.NomMatiere
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
      elemnts=req.body['note']
      Noerreur=true;
  for (let i = 0; i < elemnts.length; i++) {
    if (elemnts[i]=="") {
      error={}
      arraymsg=[]
      error.msg="veillez renplir toutes les champs"
      arraymsg.push(error)
      req.flash('danger',arraymsg)  
      Noerreur=false 
      break
    } 

    if (elemnts[i]>20 || elemnts[i]<0) {
      error={}
      arraymsg=[]
      error.msg="les notes doivent etre comprises entre 0 et 20"
      arraymsg.push(error)
      req.flash('danger',arraymsg)  
      Noerreur=false 
      break
    }
     
  }

  if (Noerreur) {
  
         const classe = await classes.findByPk(id)
         const eleves = await classe.getEleves()
         for (let i = 0; i < eleves.length; i++) 
         { 
           await  notes.create({valenote:elemnts[i],EleveID:eleves[i].id, MatierID: req.session.user.prof.MatierID})    
         }
  }
      
  res.redirect('/professeurs')
}




exports.listenote = async (req,res)=>{
   if (req.verifsession()) 
   { 
     idclass= req.params.id
     const noteTab = await sequelize.query("select* from notes,classeleves where  notes.EleveID = Elefeid and  notes.MatierID = :idmatier  and classeleves.classId= :idclass ",{
        model: notes,
        replacements: { idmatier:  req.session.user.prof.MatierID ,idclass: idclass}
     })

      elevesTab=[]
      for (let i = 0; i < noteTab.length; i++) {
        elevesTab.push(await noteTab[i].getElefe())  
      }

      //trouver les classe ensigner
      const matier = await matiers.findOne({      
      where:{
        id:req.session.user.prof.MatierID
            },
      })

      res.locals.classes = await matier.getClasses() ;
      res.locals.eleves = elevesTab
      res.locals.notes= noteTab
      res.locals.user= req.session.user
      res.locals.Matiere= matier.NomMatiere
      res.render('professeurs/listenotes')
      
   } else{
      error={}
      arraymsg=[]
      error.msg="veillez vous connecter "
      arraymsg.push(error)
      req.flash('danger',arraymsg)
      return res.redirect('/professeurs')    
   }  
}
   


