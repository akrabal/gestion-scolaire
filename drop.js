

const {sequelize} =require ('./models')

async function main()
{
   await sequelize.drop()
   
}
main()