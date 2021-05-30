const express = require('express')

const multer = require('multer');

const path = require('path');

const app = express()

app.use(express.urlencoded({
    extended: false
}))

app.use(express.static('public'));
//we want to use the model to find anomalies
const model = require('./models/find_anomalies')
app.set('view engine', 'ejs')
var tabular = require('tabular-json')

// define a port to whoch the app is listening to
const PORT = process.env.PORT || 8080

// home page render
app.get('/', (req, res) => {
    //this is for convenience because json tag in html has to be defined. need to fix
        res.render("index")
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
  
    if (req.files) { //if files uploaded, lets run anomalies finding algorithm placed in model
      //hybrid or simple?   
      let algo = req.body.algo_choice 
      //get the anomalies json data structure returned by the algorithm, pass files and algo choice as param  
      const result = model.findAnomalies(req.files['trainFile'][0].path, req.files['testFile'][0].path, algo)
      //return the json data of anomalies in response
      res.send(result)
    }
    res.end()
})
// make a post request to upload
app.post('/detectHTML', multipleUploads, (req, res) => {
  // check if successfully uploaded
   if (req.files) {
    //   console.log("files uploaded", req.files['trainFile'][0].path)
       //hybrid or simple?  
       let algo = req.body.algo_choice     
      //get the anomalies  as json data structure returned by the algorithm, pass files and algo choice as param  
      const result = model.findAnomalies(req.files['trainFile'][0].path, req.files['testFile'][0].path, algo)
//define the format of table we want to create
var opts = {
   dot: "/",
   separator: '  ',
   dateFormatter: function(date) {return date.toISOString().substr(0,10);},

   classes: {table: "table table-striped table-bordered"}
 };
 //create table from result, using tabular npm
 var table = tabular.html(result, opts);
//send the table as a response,  view will present
 res.send(table)


   }
   res.end()
})
// app is listening to port 8080
app.listen(PORT, () =>{
    console.log('App is listening...')
})