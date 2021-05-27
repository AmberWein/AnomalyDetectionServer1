const detector = require('./detectors')

const fs = require('fs')
function findAnomalies(train, anomaly, algo) {
    let det
    // begin of switch case
    det = new detector.SimpleAnomalyDetector(train, anomaly)
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