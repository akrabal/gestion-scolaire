const { render } = require('ejs');
const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');



exports.profilGet=async(req,res)=>{
    if (req.verifsession()) 
    {   res.locals.user= req.session.user
        res.render('securiter/profil')
      
    } else{
       error={}
       arraymsg=[]
       error.msg="veillez vous connecter "
       arraymsg.push(error)
       req.flash('danger',arraymsg)
       return res.redirect('/connexion')    
    }  
 }

exports.profilPost= async(req,res)=>
{
    if (req.verifsession()) 
    {    password=req.body.password
         tel=req.body.tel
        
         console.log(req.session.user.Personel);
        
        if ( req.session.user.prof) {
            prof = await professeurs.findByPk(req.session.user.prof.id)
            compt = await Prof.getCompteUtilisateur()
            prof.telProf=tel
            compt.passwordUtilisateur= password
            prof.save()
            compt.save()

        }
        if (req.session.user.Eleve) {
            Elev = await Eleves.findByPkr(res.session.user.Eleve.id)
            compt = await Elev.getCompteUtilisateur()
            Elev.telEleve= tel
            compt.passwordUtilisateur=password
            Elev.save()
            compt.save()
        }
        if (req.session.user.Parent) {
            paren= await Parents.findByPk(req.session.user.Parent.id)
            paren.telParent=tel
            compt = await paren.getCompteUtilisateur()
            compt.passwordUtilisateur=password
            paren.save()
            compt.save()
        }
        if (req.session.user.Personel) {
            Personel = await personeladmin.findByPk(req.session.user.Personel.id)
            Personel.telPersonel=tel
            compt = await Personel.getCompteUtilisateur()
            compt.passwordUtilisateur=password
            Personel.save()
            compt.save()
            console.log(compt);
        }
        req.findActionForRole(compt)  

    } else{
       error={}
       arraymsg=[]
       error.msg="veillez vous connecter "
       arraymsg.push(error)
       req.flash('danger',arraymsg)
       return res.redirect('/connexion')    
    }  
 
}
