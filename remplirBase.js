const { sequelize, classes, administration , anneeScolaire ,CompteUtilisateur,cours , Eleves, etablisements ,fraisscolaire  , matiers, notes ,Parents,personeladmin,professeurs,roles,typeFrais }=require('./models');
const facker = require('faker')
const bcrypt = require('bcrypt');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
facker . locale  =  "fr"
async function etablisement()
{    
    const role2 = await roles.findOne({
    where:{
        typeRole:'directeur'
         }
            })
    const etab = await etablisements.create({NomEtab: facker.company.companyName(),adresseEtab: facker.address.cityName() , teleEtab:facker.phone.phoneNumberFormat(3) })
    const directeur = await personeladmin.create({NomPersonel: facker.name.firstName(), prenomPersonel:facker.name.lastName() ,emailPersonel: facker.internet.email(),sexPersonel: 'M'  , lieunaissPersonel: facker.address.cityName() , telPersonel: facker.phone.phoneNumberFormat(3), etablisementID: etab.id})
     directeur.setEtablisement(etab)
     const compt = await CompteUtilisateur.create({NomUtilisateur: directeur.NomPersonel , passwordUtilisateur: 'cool', email: directeur.emailPersonel,personelID: directeur.id,roleID: role2.id})
    
}


async function admin()
{   
    const etab = await etablisement()
    return etab ;
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
      const admin = await etablisements.findOne({
          where:{
              id:1
          }
      })
      const role1 = await roles.findOne({
        where:{
            typeRole:'secretaire'
        }
    })
    
        
        const secretaire = await personeladmin.create({NomPersonel: facker.name.firstName(), prenomPersonel:facker.name.lastName() ,emailPersonel: facker.internet.email(),sexPersonel: 'M' , lieunaissPersonel: facker.address.cityName() , telPersonel: facker.phone.phoneNumberFormat(3), etablisementID: admin.id})
        secretaire.setEtablisement(admin)
        const compt = await CompteUtilisateur.create({NomUtilisateur: secretaire.NomPersonel , passwordUtilisateur: 'cool', email: secretaire.emailPersonel ,personelID: secretaire.id,roleID: role1.id})
         
}
async function directeur()
{       
         const admin=await etablisements.findOne({
             where:{
                id:1
             }
         })
         const role2 = await roles.findOne({
            where:{
                typeRole:'directeur'
            }
        })
         
         
         const directeur = await personeladmin.create({NomPersonel: facker.name.firstName(), prenomPersonel:facker.name.lastName() ,emailPersonel: facker.internet.email(),sexPersonel: 'M' , lieunaissPersonel: facker.address.cityName() , telPersonel: facker.phone.phoneNumberFormat(3), etablisementID: admin.id})
         directeur.setEtablisement(admin)
         const compt = await CompteUtilisateur.create({NomUtilisateur: directeur.NomPersonel , passwordUtilisateur: 'cool', email: directeur.emailPersonel ,personelID: directeur.id,roleID: role2.id})

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
{ /*   const  par = await Parents.findOne({
    where:{
        id:1
    }
})  */
    

    const role2 = await roles.findOne({
    where:{
        typeRole:'eleves'
    }
})
   

   const elv = await Eleves.create({NomEleve:facker.name.firstName(),prenomEleve:facker.name.lastName(),emailEleve:facker.internet.email(),sexEleve:'M',lieunaissEleve:facker.address.cityName(),telEleve:facker.phone.phoneNumberFormat(3)})

   const compt = await CompteUtilisateur.create({NomUtilisateur: elv.NomEleve , passwordUtilisateur: 'cool', email: elv.emailEleve ,ElevesID: elv.id,roleID: role2.id})
   console.log(compt.getEleve); 
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
async function anne()
{    

    let  annepremier=facker.date.past('2020')  
    let bien = annepremier.getFullYear()
    const ann =  await anneeScolaire.create({anninf: annepremier ,annsup:annepremier.setFullYear(bien+1)})
}

async function matier()
{
    const matie = await matiers.create({NomMatiere:facker.name.jobTitle(),DescMatiere:facker.lorem.sentence()})
}

async function classe()
{
  const etab = await etablisements.findByPk(1) 
  const anne= await anneeScolaire.findByPk(1)
  await classes.create({niveauclasse:'l1', annescolaireID: anne.id ,etablisementID:etab.id})
  await classes.create({niveauclasse:'l2', annescolaireID: anne.id,etablisementID:etab.id})
  await classes.create({niveauclasse:'l3', annescolaireID: anne.id,etablisementID:etab.id})
}
/*********************************************************************************************************************************************************************************************************************************************************************************** */
async  function avantnote()
{
    const matier = await matiers.findAll()
   
    for (let i = 0; i < matier.length; i++) {
        const cool = matier[i];
        console.log(cool.NomMatiere);
        
    }         
}



async function ajoutclass()
{
    const classe = await classes.findByPk(1)
    const elv = await Eleves.findAll()

    for (let i = 0; i < elv.length; i++) {
        await elv[i].setClasses(classe);  
    }
}

async function bcryp()
{
  return  await bcrypt.hash('cool',10)
}
//1


//role()
  

  //2

//etablisement()

  
 

  //3
 
   
 // secretaire()

   
   
 //eleves()
    
  
 //4
 
 //parents()
 // prof()

 //5


// matier()

//anne()
// classe()
 


//6
//avantnote()

  
//ajoutclass()






