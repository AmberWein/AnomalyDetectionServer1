const express = require('express')

const multer = require('multer');

const path = require('path');

const app = express()

app.use(express.urlencoded({
    extended: false
}))
//app.use(fileUpload({}))


app.use(express.static('public'));
const model = require('./models/find_anomalies')
app.set('view engine', 'ejs')

// define a port to whoch the app is listening to
const PORT = process.env.PORT || 8080

// home page render
app.get('/', (req, res) => {
    //this is for convenience because json tag in html has to be defined. need to fix
    let jsonData = []
  
    jsonData.push({
        description: "no results yet",
        timeStep: "3:00"
    })
        res.render("index", { jsonData: jsonData })
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
var multipleUploads = upload.fields([{name: 'trainFile'}, {name: 'testFile'}])
// make a post request to upload
app.post('/detect', multipleUploads, (req, res) => {
   // check if successfully uploaded
  
    if (req.files) {
        console.log("files uploaded", req.files['trainFile'][0].path)
      
        let algo = req.body.algo_choice     
        const result = model.findAnomalies(req.files['trainFile'][0].path, req.files['testFile'][0].path, algo)
        res.send({jsonData : result})
   //     res.send(html of result?)
    }
    res.end()
})

// app is listening to port 8080
app.listen(PORT, () =>{
    console.log('App is listening...')
})