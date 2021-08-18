module.exports = async (req,res,next) =>
{       
    if (req.session.user == undefined) {
        req.session.user={};
     }

    req.verifsession= ()=>
    {  
       value = false
      if (req.session.user.compt != undefined && req.session.user.role != undefined) {
          value= true
      }   
      return value
    } 

    

    req.firewall = async () =>
    {   
     
       switch (req.baseUrl) {
        
         case '/connexion':
            chemin=req.baseUrl
            res.locals.headers=res.locals.headers+req.activ("acceille",chemin) 
            res.locals.headers=res.locals.headers+req.activ("connexion",chemin) 
               break;   
         case '/directeur':
            
              
           
                  break;     
            case '/deconexion':

               break;      
       
          default:
             break;
       }
        
    }
   

  
    

   
  
   next();
}