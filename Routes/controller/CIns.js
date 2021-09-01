const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , elves, etablisements ,fraisscolaire  , matiers, notes ,parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');

exports.GetIns= async (req,res) =>{
    chemin='/inscription'
    res.locals.headers=res.locals.headers+req.activ("acceille",chemin) 
    res.locals.headers=res.locals.headers+req.activ("connexion",chemin)
    res.locals.headers=res.locals.headers+req.activ("inscription",chemin)
    return  res.render('securiter/inscription');
}

exports.PostIns = async (req,res) =>{
    
   res.redirect('/connexion')
}