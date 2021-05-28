const fs = require("fs");
const Util = require('./anomaly_detection_util.js');

/* TimeSeries object holds arrays of headers, data, and a csv path. 
* The 2 arrays extracted from the given file referenced.
*/
class TimeSeries{
     constructor(csvPath){
          this.headers = null;
          this.data = null;
          this.csvPath = csvPath;
          let reader = fs.readFileSync(this.csvPath);
          // Convert the data to String and        // split it in an array
          let dataLines = reader.toString().split("\r\n");      
          let result = [];

          // The array[0] contains all the header columns so we store them in headers array
          let headers = dataLines[0].split(',');
          // create a list for each column
          for (let i = 0; i < headers.length; i++) {
               result[i] = [];
          }
          // Since headers are separated, we need to traverse remaining n-1 rows.
          for (let i = 1; i < dataLines.length - 1; i++) {
               let currRow = dataLines[i].split(",");
               for (let j = 0; j < currRow.length; j++){
                    result[j].push(currRow[j]);
               }
          }
          this.headers = headers;
          this.data = result;
     }
     getNumOfFeatures(){
          return this.headers.length;
     }
     getNumOfRows(){
          return this.data[0].length;
     }
     getFlightLine(index){
          let lineDetails = [];
          let numOfFeaturs = this.getNumOfFeatures();
          for (let i = 0; i < numOfFeaturs; i++){
              lineDetails.push(this.data[i][index]);
          }
          return lineDetails;
      }
}


// export file module TimeSeries
module.exports = TimeSeries;

