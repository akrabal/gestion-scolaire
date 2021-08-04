module.exports= function(req,res,next){
     
    if (req.session.flash) {
        console.log(req.session.flash);
        res.locals.flash= req.session.flash
        req.session.flash=undefined
    }
  
    req.flash=function(type,content)
    {   
        if (req.session.flash==undefined) {
            req.session.flash={}
        }
         req.session.flash.content=content 
         req.session.flash.type=type
    }

    next()
}