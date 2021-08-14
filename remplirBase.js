const { sequelize, classes, administration , anneescolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('./models');
const facker = require('faker')
const bcrypt = require('bcrypt');

async function etablisement()
{
    const etab = await etablisements.create({NomEtab: facker.company.companyName(),adresseEtab: facker.address.cityName() , teleEtab:facker.phone.phoneNumberFormat(3) })
    return etab ;
}


async function admin()
{   
    const etab = await etablisement()
    const admin = await administration.create({cool:facker.company.companyName(),etablisementID: etab.id})
    return admin ;
}
async function role()
{
    const role1 =await roles.create({typeRole:'directeur' ,descRoles:'est le directeur de l\'etablisement'})
    const role2 =await roles.create({typeRole:'secretaire' ,descRoles:'est le secretaire de l\'etablisement'})
    const role3 =await roles.create({typeRole:'econome' ,descRoles:'est l\' econome de l\'etablisement'})
    const role4 =await roles.create({typeRole:'professeurs' ,descRoles:'est un professeurs de l\'etablisement'})
    const role5 =await roles.create({typeRole:'eleves' ,descRoles:'est un eleves de l\'etablisement'})
    const role6 =await roles.create({typeRole:'Parent' ,descRoles:'est un parent d\'eleves '})

    
}

async function secretaire()
{   
      const admin = await administration.findOne({
          where:{
              id:1
          }
      })
      const role1 = await roles.findOne({
        where:{
            typeRole:'secretaire'
        }
    })
     for (let i = 0; i < 5; i++) {
        
        const secretaire = await personeladmin.create({NomPersonel: facker.name.firstName(), prenomPersonel:facker.name.lastName() ,emailPersonel: facker.internet.email(),sexPersonel: 'M' , lieunaissPersonel: facker.address.cityName() , telPersonel: facker.phone.phoneNumberFormat(3), adminsID: admin.id})
        secretaire.setAdministration(admin)
        const compt = await CompteUtilisateur.create({NomUtilisateur: secretaire.NomPersonel , passwordUtilisateur: 'cool', email: secretaire.emailPersonel ,personelID: secretaire.id,roleID: role1.id})
     }
    
}
async function directeur()
{       
         const admin=await administration.findOne({
             where:{
                id:1
             }
         })
         const role2 = await roles.findOne({
            where:{
                typeRole:'directeur'
            }
        })
         
         
         const directeur = await personeladmin.create({NomPersonel: facker.name.firstName(), prenomPersonel:facker.name.lastName() ,emailPersonel: facker.internet.email() , lieunaissPersonel: facker.address.cityName() , telPersonel: facker.phone.phoneNumberFormat(3), adminsID: admin.id})
         directeur.setAdministration(admin)
         const compt = await CompteUtilisateur.create({NomUtilisateur: directeur.NomPersonel , passwordUtilisateur: 'cool', email: directeur.emailPersonel,sexPersonel: 'M' ,personelID: directeur.id,roleID: role2.id})

}

async function parents()
{   const role2 = await roles.findOne({
    where:{
        typeRole:'Parent'
    }})
   const pr = await Parents.create({NomParent:facker.name.firstName(),prenomParent:facker.name.lastName() ,emailParent:facker.internet.email(),sexParent:'M',telParent:facker.phone.phoneNumberFormat(3)})
  
   const compt = await CompteUtilisateur.create({NomUtilisateur: pr.NomParent , passwordUtilisateur: 'cool', email: pr.emailParent ,ParentID: pr.id ,roleID: role2.id})
   //compt.setRole(role2)
   console.log(await compt.getRole());
}

async function eleves()
{   const  par = await Parents.findOne({
    where:{
        id:1
    }
})  
    

    const role2 = await roles.findOne({
    where:{
        typeRole:'eleves'
    }
})
    console.log(par.id);
    console.log(par);


   const elv = await Eleves.create({NomEleve:facker.name.firstName(),prenomEleve:facker.name.lastName(),emailEleve:facker.internet.email(),sexEleve:'M',lieunaissEleve:facker.address.cityName(),telEleve:facker.phone.phoneNumberFormat(3),ParentID: par.id })
   const compt = await CompteUtilisateur.create({NomUtilisateur: elv.NomEleve , passwordUtilisateur: 'cool', email: elv.emailEleve ,personelID: elv.id,roleID: role2.id})
}

async function prof()
{ 
    const role2 = await roles.findOne({
        where:{
            typeRole:'professeurs'
        }
    })
    const pro = await professeurs.create({NomProf:facker.name.firstName(),prenomProf:facker.name.lastName(),emailProf:facker.internet.email(),sexProf:'M',lieunaissProf: facker.address.cityName(),telProf:facker.phone.phoneNumberFormat(3)})
    const compt = await CompteUtilisateur.create({NomUtilisateur: pro.NomProf , passwordUtilisateur: 'cool', email: pro.emailProf ,ProfID: pro.id,roleID: role2.id})

}
async function bcryp()
{
  return  await bcrypt.hash('cool',10)
}
//1
/*
  admin()
  role()
 */

  //2
 /*
    directeur()
    secretaire()
    */
  
 //3
 /*
 parents()
 prof()
  */

 

  







