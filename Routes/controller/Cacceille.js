const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');


exports.acceuilleGet=async  (req, res, next) =>
{  
   
   chemin='/acceille'
   res.locals.headers=res.locals.headers+req.activ("acceille",chemin) 
   res.locals.headers=res.locals.headers+req.activ("connexion",chemin)
   res.locals.headers=res.locals.headers+req.activ("inscription",chemin)
   res.render('acceille');
}
exports.acceuillePost=async (req, res, next) => {
   chemin='/acceille'
}
