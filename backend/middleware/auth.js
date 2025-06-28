const jwt = require('jsonwebtoken');

function checkforAuth(req,res,next){
    const token = req.cookies?.token;
    if(!token){
       return next();
    }
    try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    
  } catch (err) {}
  next();

};

module.exports={checkforAuth};