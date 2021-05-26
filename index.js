const express = require('express')

const multer = require('multer');

const path = require('path');

const app = express()
const fs = require('fs')
app.use(express.urlencoded({
    extended: false
}))
//app.use(fileUpload({}))
app.use(express.static('public'));
const model = require('./models/find_anomalies')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 8080

// home page render
app.get('/', (req, res) => {
    //this is for convenience because json tag in html has to be defined. need to fix
    file = "jsonData.json"
    fs.exists(file, function(exists) {
      fs.readFile(file, "utf-8", (error, data) => {
        if (error) throw error
        let jsonData = []
        jsonData.push(data)
        res.render("index", { jsonData: jsonData })
      })
    })

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
  
    if (req.files) {
        console.log("files uploaded", req.files['file1'][0].path)
      
        let algo = req.body.algo_choice     
        
       let result = model.findAnomalies(req.files['file1'][0].path, req.files['file2'][0].path, algo)
      
        res.write(result)
       // res.json({ body : 0 })

       
    }
    res.end()
})




app.listen(PORT, () =>{
    console.log('App is listening...')
})
