module.exports= function(req,res,next){
     
     res.locals.headers='';
     req.activ=function(namelink,chemin)
     {    
         asset=''
         fain=''
         if (namelink==chemin.replace('/','')) {
            asset="active";
            }
            let link = namelink
         if (namelink=='acceille') {
             link ="";
             if (chemin.replace('/','')=='') {
               asset="active";
          }
          fain="<div class=\"item\" >"+"<i class=\"bi bi-house\"></i>"+"</div> "
        }

         if (namelink=="connexion") {

         fain="<div class=\"item\" >"+"<i class=\"bi bi-box-arrow-right\"></i>"+"</div>"
          
         }  

         if (namelink=="inscription") {
         fain ="<div class=\"item\" >"+"<i class=\"bi bi-person-plus\"></i>"+"</div>"
         }  

       

         if (namelink=="deconexion") {
          fain="<div class=\"item\" >"+"<i class=\"bi bi-box-arrow-in-left\"></i>"+"</div>"
          console.log(fain);
        }
        if (namelink=="directeur") {
          fain=" <div class=\"item\" >"+"<a href=\"/profil\">"+"<i class=\"bi bi-person-circle\"></i>"+"</a>"+"</div>"
        }

        if (namelink=="professeurs") {
          fain=" <div class=\"item\" >"+"<a href=\"/profil\">"+"<i class=\"bi bi-person-circle\"></i>"+"</a>"+"</div>"   
          console.log(fain);
        }
    

       

       

         
          return"<div class=\"acool\" >"+fain+'<a class="'+asset+' container" href="/'+link+'">'+namelink+'</a>'+"</div>";       
    }
    
    next()
}