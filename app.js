const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const routes = require('./router/router')
const app = express();
const {checkUser} = require('./middleware/authmiddleware');
const Shoe = require("./modules/Shoes");

//middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs')

//connect til databasen og koble seg til
mongoose.set('strictQuery', false)
const dbURI = 'mongodb+srv://haroba:magnin@cluster0.bvxfvdp.mongodb.net/Kickshub?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err)=> console.log(err))

app.get('*', checkUser)

app.get('/', async(req,res)=>{

await Shoe.find().sort({ createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'All blogs', shoes: result})
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.use(routes);
