const Util = require('./anomaly_detection_util.js');
const TimeSeries = require('./parse_file.js')

class AnomalyReport{
	constructor(description, timeStep){
        this.description = description;
        this.timeStep = timeStep;
    }
}
/*class TimeSeriesAnomalyDetector {
	learnNormal(ts);
	detect(ts);
}*/

class CorrelatedFeatures{
	constructor (f1, f2, corr, line, thresh, isSimp, c = null){
		this.feature1=f1;
		this.feature2=f2;
		this.corrlation=corr;
		this.lin_reg=line;
		this.threshold=thresh;
		this.isSimple=isSimp;
		this.center=c;
	}
}
	

class SimpleAnomalyDetector {//extends TimeSeriesAnomalyDetector{
	// class members
	cf = [];
	anomalies = [];
	min_simple_correlation = 0.9;
	
	constructor(csvToLearn, csvToDetect = null){
		let timeSLearn = new TimeSeries(csvToLearn);
		let timeSDetect = new TimeSeries(csvToDetect);
		// shold we wait?
		let maxPearson, curr, thresh, matchedProperty, matches = [];
        //let headlines = ts.headlines;
        //let mapValues = ts.data;
        let numOfFeatures = timeSLearn.getNumOfFeatures();
        let numOfValues = timeSLearn.getNumOfRows(); // maybe should check [0] exists before
        // for every feature, find the feature that it is most correlated to
        for (let f1 = 0; f1 < numOfFeatures; f1++){
            matches.push(-1);
            matchedProperty = this.getMostCorrelatedFeature(timeSLearn, f1, this.min_simple_correlation);
            // if no matchedProperty go to next feature 
            if (matchedProperty==-1){
                continue;
            }
            // if the matched feature is not yet checked, or is most correlated to a different feature- add a new correlatedFeatures
            if (matches.length <= matchedProperty || matches[matchedProperty] != f1){
               this.cf.push(this.createCorrelated(timeSLearn,f1,matchedProperty));
                // update the match that was found
                matches[f1] = matchedProperty;
            }		
        }
		
		// detect
		let cfIndex, reports = [], currLine = [], numOfFeatures = timeSDetect.getNumOfFeatures();
		let numOfCorrlatedFeatures = cf.length, timeStep=1, numOfRows = timeSDetect.getNumOfRows();
		let couples = this.getCouples(features, numOfFeatures);
		// run seperately over each line of ts
		for (let line = 0; line < numOfRows; line++){
			currLine = timeSDetect.getFlightLine(line); // no such??
			// for each feature - if it is normaly correlated to another feature, check for anomalies
			this.getAnomalies(timeSDetect, currLine, timeStep, reports, couples);
			timeStep++;
		}
		this.anomalies = reports;
	}

	setMinCorrelation(newCorr){
		this.min_simple_correlation = newCorr;
		return;
	}
	getMostCorrelatedFeature (ts, feature1, minCorrelation){
		let matchedProperty, corr, maxPearson=0.0, num=ts.getNumOfFeatures(), numOfValues= ts.getNumOfRows();
		// run over features
		for (let f2 = 0; f2 < num; f2++){
			// skip self
			if (feature1 == f2)
				continue;
			corr = this.getCorrelation(feature1, f2, ts.data, numOfValues);
			// save the feature with the maximum correlation to feature1
			if (Math.abs(corr) > maxPearson){
				maxPearson = Math.abs(corr);
				matchedProperty = f2;
			}
		}
		// if the maimum correlation above minumum, return the most correlated feature 
		if (maxPearson >= minCorrelation)
			return matchedProperty;
		// return -1 if no features is above the minimum correlation
		return -1;
	}

	getCorrelation(srcFeature, destFeature, data, size){
		let feature1 = data[srcFeature]; 	// get data of column srcFeature
		let feature2 = data[destFeature]; 	// get data of column destFeature
		return Util.pearson(feature1, feature2, size);
		
	}
	findThreshold(points, size, line){
		let maxDeviation = 0;
		for (let i = 0; i < size; i++){
			let currDev = Util.dev(points[i], line);
			if (Math.abs(currDev) > maxDeviation){
				maxDeviation = Math.abs(currDev);
			}
		}
		// threshold will be 10% above the maximum deviation found
		return (1.1 * maxDeviation);
	}
	createPointsVec(f1Data, f2Data, size){
		let points = [];
		for (let i=0; i<size; i++){
			let p = new Util.Point(f1Data[i], f2Data[i]);
			points.push(p);
		}
		return points;
	}
	getCFsize(){ 
		return this.cf.length;
	}
	getIndexAsFeature1(tag){
		let cfSize = this.getCFsize();
		for (let i = 0; i < cfSize; i++){
			///if (tag.compare(cf[i].feature1)==0){
			if (tag === cf[i].feature1){
				return i;
			}
		}
		return -1;
	}
	getFeatureIndex(tag, features, size){
		for (let i = 0; i < size; i++){
			if (features[i] === tag){
				return i;
			}
		}
		return -1;
	}
	getCouples(features, size){
		let couples = [];
		// initiate
		for (let i = 0; i < size; i++){
			couples.push(-1);
		}
		// for every feature, write down if he has a feature2 correlated
		for (let i = 0; i < size; i++){
			let f1 = this.getIndexAsFeature1(features[i]);
			if (f1 != (-1)){
				let f2 = this.getFeatureIndex(this.cf[f1].feature2, features, size);
				if (f2 != (-1)){
					couples[i] = f2;
				}
			}
		}
		return couples;
	}
	isSimpleCorrelation(index){
		return this.cf[index].isSimple;
	}

	createCorrelated(ts, f1, f2){
		let numOfValues = ts.getNumOfRows();
		let points = this.createPointsVec(ts.data[f1], ts.data[f2], numOfValues);		
		//Point** pointsArray = points.data();
		//let line = linear_reg(pointsArray,numOfValues);
		let line = Util.linear_reg(points, numOfValues);
		let thresh = this.findThreshold(points, numOfValues, line);
		let correlation = this.getCorrelation(f1, f2, ts.data, numOfValues);
		// create a simple correlatedFeatures object for this 2 correlated features (defined by regresion line)
		let currMatch = new CorrelatedFeatures(ts.headers[f1], ts.headers[f2], correlation, line, thresh, true);
		// destroy all points that were created to define regresion line and threshold
		//destroyAllPoints(points, numOfValues);
		// return the new correlatedFeatures
		return currMatch;
	}
	reportAnAnomaly(features, f1, f2, timeStep, reports){
		let description = features[f1] + "-" + features[f2];
		let repo = new AnomalyReport (description,timeStep);
		reports.push(repo);
	}
	getAnomalies (ts, line, timeStep, reports, couples){
		let cfIndex, numOfFeatures = ts.getNumOfFeatures();
		// go over features
		for (let i = 0; i < numOfFeatures; i++){
			if (couples[i] != (-1)){		
				cfIndex = getIndexAsFeature1(features[i]);
				// detect only Simple Coorrelation anomalies
				if (!isSimpleCorrelation(cfIndex))
					continue;
				let p = new Util.Point (line[i], line[couples[i]]);
				let deviation= Util.dev (p, this.cf[cfIndex].lin_reg);
				// if deviation is above threshold report an anomaly
				if (Math.abs(deviation) > this.cf[cfIndex].threshold)
				reportAnAnomaly(features, i, couples[i], timeStep, reports);
			}
		}
	}
}

module.exports = {AnomalyReport, SimpleAnomalyDetector};