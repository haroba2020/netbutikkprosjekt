const Shoe = require("../modules/Shoes");
const User = require("../modules/Users");
const jwt = require('jsonwebtoken')


module.exports.signup_get = (req,res)=>{
    res.render('signup');
}
module.exports.login_get = (req,res)=>{
    res.render('login');
}
module.exports.functionHelp = (req,res)=>{
    res.render('functionHelp');
}
module.exports.linuxSetup = (req,res)=>{
    res.render('linuxSetup');
}
module.exports.superAdmin = (req,res)=>{
    let users;
    User.find({isAdmin:'false'}).sort({ createdAt: -1})
    .then((result)=>{
        users = result;
        console.log(users)

        User.find({isAdmin:'true'}).sort({ createdAt: -1})
        .then((result)=>{
            res.render('superAdmin', {users, admins:result})
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports.admin = (req,res)=>{
    res.render('admin');
}
module.exports.adminHelp = (req,res)=>{
    res.render('adminHelp');
}
// get request som ser etter /blog id ved bruk av req.params.id derreter så finner den en spesifik blog ved bruk av id og sender den tilbake til siden
module.exports.kicks_edit = (req,res) => {
    const id = req.params.id
    Shoe.findById(id)
    .then(result =>{
        res.render('shoeEdit', {Shoe: result})
    })
    .catch(err =>{
        res.status(404).render('404')
    });
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
    const isAdmin = false
    const user = await User.create({name, password, email,isAdmin})
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
module.exports.roleSwitch = async (req,res) =>{
    const {id} = req.body
    const user = await User.findById(id)
    if(user.isAdmin === 'false'){
        const updatedUser = await User.findByIdAndUpdate(id, {isAdmin: 'true'}, {new: true});
        res.status(200).json({updatedUser})
    }else{
        const updatedUser = await User.findByIdAndUpdate(id, {isAdmin: 'false'}, {new: true});
        res.status(200).json({updatedUser})
    }
}
module.exports.editShoes = async (req,res) =>{
    const {title,brand,price,model,articleNumber,createdAt,id} = req.body
    console.log('post is working')
    const updatedShoe = await Shoe.findByIdAndUpdate(id, {title,brand,price,model,articleNumber,createdAt}, {new: true});
    res.status(200).json({updatedShoe})

}
module.exports.kicks_delete = (req, res) =>{
    const id = req.params.id

    Shoe.findByIdAndDelete(id)
    .then(result=>{
        res.json({ redirect: '/' });
    })
    .catch(err=>{
        console.log(err)
    })
}