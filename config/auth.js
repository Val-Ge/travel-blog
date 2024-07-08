//create an authorization middleware

module.exports={
    ensureAuthenticated:function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please log in to view that source');
        res.redirect('/login');
    },
    ensureAdmin:function(req,res,next){
        if(req.isAuthenticated() && req.user.role === 'admin'){
            return next();
        }
        req.flash('error_msg', 'you are not authorized to view that source');
        res.redirect('/');
    }
};