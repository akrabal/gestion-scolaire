const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraiscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typefrais }=require('../../models');
const puppeteer = require('puppeteer')
    //econome

    exports.EconomeGet= async (req,res)=>{
        if (req.verifsession()) 
        { 
     
           if (req.session.user.role.typeRole=='econome'){
              chemin=req.baseUrl
              res.locals.classes =  await classes.findAll()
              res.locals.user= req.session.user
              return  res.render('personnelle/econome/acceuille');
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
  
     exports.EconomePost=async(req,res)=>{
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

exports.getlistpayement= async (req,res) =>{
   if (req.verifsession()) 
   { 
         idclass= req.params.id
      if (req.session.user.role.typeRole=='econome'){
         let elevesTab = await sequelize.query(" select * from eleves e, classeleves c where c.classId= :idclass and e.id = c.ElefeId ",{
            model: Eleves,
            replacements: { idclass: idclass   }
         })


   
        
         
         res.locals.eleves= elevesTab
         res.locals.classe= await classes.findByPk(idclass)
         res.locals.classes =  await classes.findAll()
         res.locals.user= req.session.user

         return  res.render('personnelle/econome/listesolde');

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
  exports.payerget = async (req,res)=>{
   if (req.verifsession()) 
   { 

      if (req.session.user.role.typeRole=='econome'){
         idelv = req.params.id
         typefraisTab = await typefrais.findAll()
         let frais=[]
         console.log(typefraisTab[0].id);
        
     
           for (let i = 0; i < typefraisTab.length; i++) {
               frais.push(await sequelize.query(" select * from fraiscolaires f where f.EleveID = :Eleid and f.typefraisID = :typefrais ",{
                 model: fraiscolaire,
                 replacements: { Eleid: idelv, typefrais: typefraisTab[i].id }
              }) ) 
           }
           res.locals.type = typefraisTab
           res.locals.frais = frais
           res.locals.etu= await Eleves.findByPk(idelv)
     
           res.locals.classes =  await classes.findAll()
           res.locals.user= req.session.user
     
         res.render('personnelle/econome/payerElv')
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

  exports.payerpost = async (req,res)=>{
   if (req.verifsession()) 
   { 

      if (req.session.user.role.typeRole=='econome'){
         idelv= req.params.idelv
         idtypfrais= req.params.type
         console.log(req.body);
         ecolage= req.body.ecolage
        if (req.body.ecolage == '') {
           ecolage='0'
        }
        
         console.log(ecolage.toString());
         fraiscolaire.create({fraisolde: ecolage.toString(),EleveID:idelv,typefraisID:idtypfrais ,annescolaireID:1})
         error={}
         arraymsg=[]
         error.msg="payement ajouter "
         arraymsg.push(error)
         req.flash('success',arraymsg) 
         res.redirect('/econome')
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

  exports.soldeget = async(req,res)=>{
   if (req.verifsession()) 
   { 

      if (req.session.user.role.typeRole=='econome'){
         idclass= req.params.id
         let elevesTab = await sequelize.query(" select * from eleves e, classeleves c where c.classId= :idclass and e.id = c.ElefeId ",{
            model: Eleves,
            replacements: { idclass: idclass   }
         })
         typefraisTab = await typefrais.findAll()
         res.locals.eleves= elevesTab
         res.locals.classes =  await classes.findAll()
         res.locals.user= req.session.user
         return  res.render('personnelle/econome/');
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

  exports.etatEconome= async(req,res)=>{
   if (req.verifsession()) 
   { 

      if (req.session.user.role.typeRole=='econome'){
         idclass = req.params.id
         let elevesTab = await sequelize.query(" select * from eleves e, classeleves c where c.classId= :idclass and e.id = c.ElefeId ",{
            model: Eleves,
            replacements: { idclass: idclass   }
         })

         typefraisTab = await typefrais.findAll()
         frais=[]
         soldePayer=[]
      
         
         for (let i = 0; i < typefraisTab.length; i++) {
            for (let a = 0; a < elevesTab.length; a++) {
               total=0;
               let scolaire = await sequelize.query(" select * from fraiscolaires f where f.EleveID = :Eleid and f.typefraisID = :typefrais ",{
                  model: fraiscolaire,
                  replacements: { Eleid: elevesTab[a].id , typefrais: typefraisTab[i].id }
               })
               for (let n =0 ; n < scolaire.length; n++){
                  total=total + parseInt( scolaire[n].fraisolde)
               }
               frais.push(total) 
               total=0;
              
            }
            
         }

          
         const browser = await puppeteer.launch();
         const page = await browser.newPage();
         await page.goto('http://localhost:3000/econome/list/'+idclass, {
           waitUntil: 'networkidle2',
         });
         maclase= await classes.findByPk(idclass)
         nom= maclase.niveauclasse
         chemin= 'public/pdf/econome/'+ nom +'.pdf'
         console.log(chemin);
         await page.pdf({ path:  chemin, format: 'a4' });
       
         await browser.close();
        
         res.locals.classe=maclase
         res.locals.type = typefraisTab
         res.locals.soldePayer= frais
         res.locals.Eleves = elevesTab 
         res.locals.classes =  await classes.findAll()
         res.locals.user= req.session.user
         return  res.render('personnelle/econome/etatsClass');
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

  exports.list = async (req,res)=>{
  
      idclass = req.params.id
      let elevesTab = await sequelize.query(" select * from eleves e, classeleves c where c.classId= :idclass and e.id = c.ElefeId ",{
         model: Eleves,
         replacements: { idclass: idclass   }
      })

      typefraisTab = await typefrais.findAll()
      frais=[]
      soldePayer=[]
   
      
      for (let i = 0; i < typefraisTab.length; i++) {
         for (let a = 0; a < elevesTab.length; a++) {
            total=0;
            let scolaire = await sequelize.query(" select * from fraiscolaires f where f.EleveID = :Eleid and f.typefraisID = :typefrais ",{
               model: fraiscolaire,
               replacements: { Eleid: elevesTab[a].id , typefrais: typefraisTab[i].id }
            })
            for (let n =0 ; n < scolaire.length; n++){
               total=total + parseInt( scolaire[n].fraisolde)
            }
            frais.push(total) 
            total=0;
           
         }
         
      }
       maclase=classes.findByPk(idclass)
    
     
      res.locals.classe=maclase
      res.locals.type = typefraisTab
      res.locals.soldePayer= frais
      res.locals.Eleves = elevesTab 
      res.locals.classes =  await classes.findAll()
      res.locals.user= req.session.user
      return  res.render('personnelle/econome/listetat');
   
  }