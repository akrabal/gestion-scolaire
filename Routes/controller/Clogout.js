const { validationResult } = require('express-validator');
const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , elves, etablisements ,fraisscolaire  , matiers, notes ,parents,personeladmin,professeurs,roles,typeFrais }=require('../../models');

exports.logout= async (req,res)=>
{
   req.session.user=undefined
   res.redirect('/')
}
