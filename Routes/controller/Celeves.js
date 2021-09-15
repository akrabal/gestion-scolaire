const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');

exports.ElevesGet= async(req,res)=>{
    if (req.verifsession()) 
    { 
          // console.log(req.session.user );
       if (req.session.user.role.typeRole=='eleves'){
         chemin=req.baseUrl
         let matier = await sequelize.query(" select * from notes,matiers where notes.EleveID = :Eleid and notes.MatierID = matiers.id ",{
            model: matiers,
            replacements: { Eleid:  req.session.user.Eleve.id }
         })
         Matieretab=[]
         Matieretab.push(matier[0])
         for (let i = 1; i < matier.length; i++) {
                if (Matieretab[i-1].NomMatiere != matier[i].NomMatiere ) {
                    Matieretab.push(matier[i])
                }
         }
         res.locals.matiers=Matieretab
         res.locals.user= req.session.user
         return  res.render('eleves/acceuille');

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












 exports.voirnote= async(req,res)=>{
    if (req.verifsession()) 
    {  
      if (req.session.user.role.typeRole=='eleves'){
         idmat= req.params.id
         chemin=req.baseUrl

         //ici on cherche les matiere dans les quelle il a composer
         let matier = await sequelize.query(" select * from notes,matiers where notes.EleveID = :Eleid and notes.MatierID = matiers.id ",{
            model: matiers,
            replacements: { Eleid:  req.session.user.Eleve.id }
         })
         //ici on filltre  les doublon
         Matieretab=[]
         Matieretab.push(matier[0])
         for (let i = 1; i < matier.length; i++) {
                if (Matieretab[i-1].NomMatiere != matier[i].NomMatiere ) {
                    Matieretab.push(matier[i])
                }
         }

         //je vais chercher la note en fonction de la matiere 
         let note = await sequelize.query(" select * from notes where notes.EleveID = :Eleid and notes.MatierID = :matierid ",{
            model: notes,
            replacements: { Eleid:  req.session.user.Eleve.id , matierid: idmat }
         })

        
         res.locals.matiers=Matieretab
         res.locals.user= req.session.user
         console.log(note[0].getMatier());
         res.locals.affiche = await note[0].getMatier()
         res.locals.note= note[0]
         return  res.render('eleves/voirenote');

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

 exports.bulletin = async (req,res) =>
 {
   if (req.verifsession()) 
   { 
         // console.log(req.session.user );
      if (req.session.user.role.typeRole=='eleves'){

               chemin=req.baseUrl
               res.locals.user= req.session.user
               res.render('eleves/bulletin')

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

 
