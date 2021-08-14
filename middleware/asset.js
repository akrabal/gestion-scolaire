module.exports= function(req,res,next){
     
     res.locals.headers='';
     req.activ=function(namelink,chemin)
     {    
         asset=''
         if (namelink==chemin.replace('/','')) {
            asset="class=\"active\"";
            }
            let link = namelink
         if (namelink=='acceille') {
             link ="";
             if (chemin.replace('/','')=='') {
               asset="class=\"active\"";
             }
           
         }   
          return '<a href="/'+link+'"'+asset+'>'+namelink+'</a>';       
    }
    
    next()
}