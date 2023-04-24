const jwt = require('jsonwebtoken')
const User = require("../modules/Users");

//sjekk om brukeren har noen cookies for å sjekke om de har logget in
const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'hrobos secret', async (err, decodedToken) => {
            if (err) {
              res.locals.user = null;
              next();
            } else {
              let user = await User.findById(decodedToken.id);
              res.locals.user = user;
              next();
            }
          });
    }else{
        res.locals.user = null
        next()
    }
}

module.exports = {checkUser}