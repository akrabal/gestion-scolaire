const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');
const puppeteer = require('puppeteer')
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
                 /* //ici on cherche les matiere dans les quelle il a composer
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
                  }*/

                  classEtudiant =  await sequelize.query(" select * from classes c,classeleves ce where c.id=ce.classId and ce.ElefeId = :Eleid ",{
                     model: classes,
                     replacements: { Eleid:  req.session.user.Eleve.id }
                  })
                    

                  matierClassTab= await sequelize.query(" select * from matiers m,matiersclasses mc where m.id=mc.matierId and :class=mc.classId  ",{
                     model: matiers,
                     replacements: { class:  classEtudiant[0].id } 
                  })
                 
                  let noteTab=[]
                  let note
                  for (let i = 0; i < matierClassTab.length; i++) {
                        note =  await sequelize.query(" select * from notes where notes.EleveID = :Eleid and notes.MatierID = :matierID ",{
                        model: notes,
                        replacements: { Eleid:  req.session.user.Eleve.id , matierID: matierClassTab[i].id }})
                     noteTab.push(note) 
                    
                  } 
                  const browser = await puppeteer.launch();
                  const page = await browser.newPage();
                  await page.goto('http://localhost:3000/eleves/etatbulletin/'+req.session.user.Eleve.id, {
                    waitUntil: 'networkidle2',
                  });
                   
                 console.log(req.session.user);
                  nom=  req.session.user.Eleve.NomEleve + req.session.user.Eleve.prenomEleve
                  chemin= 'public/pdf/eleves/'+ nom +'bulletin.pdf'
                  console.log(chemin);
                  await page.pdf({ path:  chemin, format: 'a4' });
                
                  await browser.close();
               
               res.locals.classe= classEtudiant   
               res.locals.etablisements= await classEtudiant[0].getEtablisement()
               res.locals.notes = noteTab
               res.locals.matier= matierClassTab
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

 

 exports.etatBulletin = async (req,res) =>{

    id=req.params.id
    classEtudiant =  await sequelize.query(" select * from classes c,classeleves ce where c.id=ce.classId and ce.ElefeId = :Eleid ",{
      model: classes,
      replacements: { Eleid:  id }
   })
     

   matierClassTab= await sequelize.query(" select * from matiers m,matiersclasses mc where m.id=mc.matierId and :class=mc.classId  ",{
      model: matiers,
      replacements: { class:  classEtudiant[0].id } 
   }) 
  
   let noteTab=[]
   let note
   for (let i = 0; i < matierClassTab.length; i++) {
         note =  await sequelize.query(" select * from notes where notes.EleveID = :Eleid and notes.MatierID = :matierID ",{
         model: notes,
         replacements: { Eleid:  id , matierID: matierClassTab[i].id }})
      noteTab.push(note) 
     
   } 

res.locals.classe= classEtudiant   
res.locals.etablisements= await classEtudiant[0].getEtablisement()
res.locals.notes = noteTab
res.locals.matier= matierClassTab
chemin=req.baseUrl 
res.locals.user={}
res.locals.user.Eleve= {}
res.locals.user.Eleve = await Eleves.findByPk(id)

res.render('eleves/etatBulletin')

}