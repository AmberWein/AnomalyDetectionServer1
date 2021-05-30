const detector = require('./detectors')
const fs = require('fs')

function findAnomalies(train, anomaly, algo) {
    let det 
    // create the anomaly detector according the required algo
    // simple algorithm chosen
    if (algo == 'Simple')
        det = new detector.SimpleAnomalyDetector(train, anomaly)
        //hybrid algorithm chosen
    else
        det = new detector.HybridAnomalyDetector(train, anomaly)

    let j = det.anomalies
    // return the anomalies detected
    return j
}

//export file to module
module.exports.findAnomalies = findAnomalies