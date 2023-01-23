const express = require('express')
const multer = require('multer')
const app = express()
const path = require('path')
require('dotenv').config()
const port = process.env.PORT || 5000




//now we need to store it in the local storage
//the idea is that the middleware will be something called upload 
//and it will contain the multer object and inside of it will contain two things
//in this case it will only be one thing aka storage
//this is the object that will contain all the information into the storage

//in the storage object we have to determine a bunch of stuff
//weere we are going to store the image //the name of the file
//we have to handle the duplicate file 
//so the storage object is where all of the specitfication of our file will be determined

//and with the multer middleware we can just say 

//here cb is teh callback function which will determine where we want to store our image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'images')
    },
    filename: (req, file, cb) =>{
        console.log(file) 
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

//we have this middleware which have this storage object //which has
//where we wnant to store our image //and what is the name of the file that we want to store
const upload = multer({storage: storage})

app.set('view engine', 'ejs')

app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})


//to get all the uploaded image
//inside the upload.single //which will tell that we want to put the single files here
//we will put the name of the input from where we will be taking the file from 
app.get('/upload',(req , res)=>{

   res.render("upload")

})

//to upload an image
app.post('/upload', upload.single('image') , (req , res)=>{

   res.send('image successfully uploaded')

})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))