const express = require('express')

const multer = require('multer');

const path = require('path');


const app = express()


app.use(express.static('public'));

app.set('view engine', 'ejs')



const PORT = process.env.PORT || 8080

// home page render
app.get('/', (req, res) => {
    res.render('index')
})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
        },
        filename: (req, file, cb) => { // to save original file's name
            const { originalname } = file;
            cb(null, originalname); // costumize a file name
        }
})

var upload = multer({storage: storage});
var multipleUploads = upload.fields([{name: 'file1'}, {name: 'file2'}])
// make a post request to upload
app.post('/uploadfile', multipleUploads, (req, res) => {
   // check if successfully uploaded
    if(req.files) {
        console.log("files uploaded")
    }
})

app.listen(PORT, () =>{
    console.log('App is listening...')
})