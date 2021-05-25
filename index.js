const express = require('express')

const multer = require('multer');

const path = require('path');

const det = require('./models/detectors.js') // this is probably not needed here, but the controller that will pass on the paths

const app = express()


/// Amber -- ! should pass to detector ( or some other being=, not yet known) the paths to learn and detect flights
let Detector = new det.HybridAnomalyDetector('C:\\Users\\NicoleS\\Downloads\\reg_short.csv', 'C:\\Users\\NicoleS\\Downloads\\anomaly_short.csv');
console.log(Detector.cf);
/// ******* this should not be here, was only added to check if working. 

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