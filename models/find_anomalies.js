const detector = require('./detectors')

const fs = require('fs')
function findAnomalies(train, anomaly, algo) {
    let det
    // begin of switch case
    //det = new detector.SimpleAnomalyDetector(train, anomaly)
   // if (algo == 'Simple')   // this is correct
   if (algo == 'Line')
        //det = new detector.SimpleAnomalyDetector('C:\\Users\\NicoleS\\Downloads\\Telegram Desktop\\Train_Little.csv', 'C:\\Users\\NicoleS\\Downloads\\Telegram Desktop\\Test_Little.csv')
        det = new detector.SimpleAnomalyDetector('.\\uploads\\Train_Little.csv', '.\\uploads\\Test_Little.csv')
    else
        det = new detector.HybridAnomalyDetector('.\\uploads\\Train_Little.csv', '.\\uploads\\Test_Little.csv') // this probably wont be the name
    // end of switch case
    let j = det.anomalies
    /*let j = []

     j.push({
         description: "files uploaded",
         timeStep: "3:00"
     })*/
  //console.log("pushed", j)


    //here we want to call  relevent function 
    return j
}
//export file to module
module.exports.findAnomalies = findAnomalies