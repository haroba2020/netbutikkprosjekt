const Shoe = require("../modules/Shoes");
const User = require("../modules/Users");
const jwt = require('jsonwebtoken')


module.exports.signup_get = (req,res)=>{
    res.render('signup');
}

module.exports.login_get = (req,res)=>{
    res.render('login');
}
module.exports.admin = (req,res)=>{
    res.render('admin');
}
module.exports.addShoe = async (req,res)=>{
    const {title, brand, price, model} = req.body
    console.log(req.body)
    const articleNumber = Math.floor(Math.random() * 9000000000000) + 1000000000000;

    const shoe = await Shoe.create({title, brand, price, model, articleNumber})
    res.status(201).json({shoe})
}

module.exports.addUser = async (req,res)=>{
    const {name, password, email} = req.body
    const user = await User.create({name, password, email})
    const token = createToken(user._id)
    res.cookie('jwt',token, {maxAge: maxAge * 1000})
    res.status(201).json({user})
}
const maxAge = 3* 24 * 60 * 60 

//en jwt cookie som tar in user id som lagres for senere bruk
const createToken = (id) => {
    return jwt.sign({ id }, 'hrobos secret', {
        expiresIn: maxAge
    })
}
module.exports.login_post = async (req,res)=>{
    const {email, password} = req.body
    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)

        res.cookie('jwt',token, {httpOnly:true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id})
    }

    catch(err){
        res.status(400).json({ err })
    }
}
module.exports.logout = async (req,res) =>{
    res.cookie('jwt', '',{maxAge: 1 })
    res.redirect('/')
}