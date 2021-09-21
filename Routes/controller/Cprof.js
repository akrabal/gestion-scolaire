const { validationResult } = require('express-validator');
const { sequelize, classes, ClassEleves , administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');
const puppeteer = require('puppeteer')

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
   
exports.etatsexe = async (req,res)=>{
  
         idmath= req.params.mat
         idclass= req.params.id
         const eleves = await sequelize.query("select* from eleves e ,classeleves ce where  e.id= ce.ElefeId    and ce.classId= :idclass ",{
            model: Eleves,
            replacements: { idclass: idclass}
         })
            Gar=0
            Meuf=0
         for (let i = 0; i < eleves.length; i++) {
              if (eleves[i].sexEleve=='M') {
                 Gar=Gar+1
              }
         }

         Gar=Gar*100
         Gar=Gar/eleves.length

         meuf=100-Gar

         

         const matier = await matiers.findOne({      
            where:{
              id: idmath
                  },
            })
      
         res.locals.classes = await matier.getClasses() ;
         res.locals.Gar=Gar
         res.locals.Meuf=Meuf
         res.locals.eleves= eleves
         res.locals.user= req.session.user
         return  res.render('professeurs/etatSexe');
       
}


exports.graphsexe = async (req,res)=>{
if (req.verifsession()) 
{
   if (req.session.user.role.typeRole=='professeurs'){ 
 
   idclass = req.params.id
   const eleves = await sequelize.query("select* from eleves e ,classeleves ce where  e.id= ce.ElefeId    and ce.classId= :idclass ",{
      model: Eleves,
      replacements: { idclass: idclass}
   })
   Gar=0
   Meuf=0
for (let i = 0; i < eleves.length; i++) {
     if (eleves[i].sexEleve=='M') {
        Gar=Gar+1
     }
   
}

if (Gar!=0) {
   Gar=Gar*100
   Gar=Gar/eleves.length
   Meuf=100-Gar
}

  
   console.log(Gar);
   console.log(Meuf);


  const matier = await matiers.findOne({      
   where:{
     id:req.session.user.prof.MatierID
         },
   })

   
   res.locals.classes = await matier.getClasses() ;
   res.locals.Gar=Gar
   res.locals.Meuf=Meuf
   res.locals.eleves= eleves
   res.locals.eleves= eleves
   res.locals.user= req.session.user
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto('http://localhost:3000/professeurs/etatsexe/'+idclass+'/'+req.session.user.prof.MatierID, {
     waitUntil: 'networkidle2',
   });
    
   chemin= 'public/pdf/prof/'+'repartitionsexe.pdf'
   console.log(chemin);
   await page.pdf({ path:  chemin, format: 'a4' });
   await browser.close();

   res.render('professeurs/graphSexe')    
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

exports.etatMoyene= async (req,res)=>{
   if (req.verifsession()) 
   { 

      if (req.session.user.role.typeRole=='professeurs'){

         idmath=req.params.id
         idclass= req.params.id
         const classe = await classes.findByPk(idclass)
         const eleves = await classe.getEleves()
         const note=[]
         

         for (let i = 0; i < eleves.length; i++) {
           
           note.push ( await sequelize.query("select* from notes n  where  n.EleveID = :eleve and n.MatierID= :Matier ",{
               model: notes,
               replacements: { eleve: eleves[i].id , Matier:idmath}
            }))
         }

        
          bonelve=0
         for (let i = 0; i < note.length; i++) {
         if (note[i][0].valenote>=10) {
            bonelve= bonelve+1
         }
            
         }
        
         bonelve = bonelve*100
         bonelve= bonelve/note.length
         mauvaiselve = 100 - bonelve
      

         const matier = await matiers.findOne({      
            where:{
              id:req.session.user.prof.MatierID
                  },
            })
      
         res.locals.classes = await matier.getClasses() ;
         res.locals.boneleve=bonelve
         res.locals.mauvaiselve=mauvaiselve
         res.locals.user= req.session.user
         return  res.render('professeurs/etatMoyene');
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

exports.graphMoyene= async (req,res)=>{
   idclass= req.params.id
   const classe = await classes.findByPk(idclass)
   const eleves = await classe.getEleves()
   const note=[]
   

   for (let i = 0; i < eleves.length; i++) {
     
     note.push ( await sequelize.query("select* from notes n  where  n.EleveID = :eleve and n.MatierID= :Matier ",{
         model: notes,
         replacements: { eleve: eleves[i].id , Matier: req.session.user.prof.MatierID}
      }))
   }

  
    bonelve=0
   for (let i = 0; i < note.length; i++) {
   if (note[i][0].valenote>=10) {
      bonelve= bonelve+1
   }
      
   }
  
   bonelve = bonelve*100
   bonelve= bonelve/note.length
   mauvaiselve = 100 - bonelve
  

   const matier = await matiers.findOne({      
      where:{
        id:req.session.user.prof.MatierID
            },
      })

   res.locals.classes = await matier.getClasses() ;
   res.locals.boneleve=bonelve
   res.locals.mauvaiselve=mauvaiselve
   res.locals.user= req.session.user
   const browser = await puppeteer.launch();
   const page = await browser.newPage();

   await page.goto('http://localhost:3000/professeurs/graphMoyene/'+idclass+'/'+req.session.user.prof.MatierID, {
     waitUntil: 'networkidle2',
   });
     

   classr = await classes.findByPk(idclass) 
   
   nom = classr.niveauclasse
   chemin= 'public/pdf/prof/'+'Moyenne.pdf'
  
   await page.pdf({ path:  chemin, format: 'a4' });
 
   await browser.close();
   return  res.render('professeurs/graphMoyene');
}