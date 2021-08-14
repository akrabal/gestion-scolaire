module.exports= function(req,res,next){
     
    if (req.session.flash) {
        res.locals.flash= req.session.flash
        req.session.flash=undefined
    }
  
    req.flash=function(type,content)
    {   
       if (type=="error"||type=="sucess") {
            if (req.session.flash==undefined) {
                req.session.flash={}
            }
            req.session.flash.content=content 
            req.session.flash.type=type
        }else{
            if (req.session.flash==undefined) {
                req.session.flash={}
            }
            let error={}
            error.msg="la class"+" "+type+" "+"n\'existe pas"

            req.session.flash.content=[];
            req.session.flash.content.push(error)
            req.session.flash.type="error" 
        }
           
    } 
       

    next()
}