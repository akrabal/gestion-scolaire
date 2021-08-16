module.exports= (req,res,next)=>
{
    req.verifcompte = function (compt)
    {
        let nbrdeliaison= 0 ;

        if (compt.ElevesID !== null) {
         nbrdeliaison +=1
        }
        if (compt.ParentID !== null) {
         nbrdeliaison +=1
        }
        if (compt.personelID !== null) {
         nbrdeliaison +=1
        }
        if (compt.ProfID !== null) {
         nbrdeliaison +=1
        }
       
             let valide = true
            if (nbrdeliaison >1) {
               valide= false
            }
             return  valide 
        
    }
    req.findActionForRole = async (compt)=>{
        role= await compt.getRole()
            if (role.typeRole=='directeur') {
               res.redirect('/directeur')
            } 
            if (role.typeRole=='secretaire') {
               res.redirect('/connexion')
            } 
            if (role.typeRole=='econome') {
               res.redirect('/connexion')
            } 
            if (role.typeRole=='professeurs') {
               res.redirect('/connexion')
            } 
            if (role.typeRole=='eleves') {
               res.redirect('/connexion')
            } 
            if (role.typeRole=='Parent') {
               res.redirect('/connexion')
            } 
            
    }
    next()

}