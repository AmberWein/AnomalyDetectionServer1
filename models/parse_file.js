
// Reading the file using default
// fs npm package
const fs = require("fs");
const Util = require('./anomaly_detection_util.js');

class TimeSeries{
     headers = null;
     data = null;
     constructor(csvPath){
          this.csvPath = csvPath;
          let reader = fs.readFileSync(this.csvPath);
          // Convert the data to String and        // split it in an array
          let dataLines = reader.toString().split("\r\n");      
          let result = [];

          // The array[0] contains all the
          // header columns so we store them
          // in headers array
          let headers = dataLines[0].split(',');
          // create a list for each column
          for (let i = 0; i < headers.length; i++) {
               result[i] = [];
          }
          
          // Since headers are separated, we
          // need to traverse remaining n-1 rows.
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
    /* getHeaders(){
          let reader = fs.readFileSync(this.csvPath);
          // Convert the data to String and        // split it in an array
          let dataLines = reader.toString().split("\r\n");

          // All the rows of the CSV will be
          // converted to JSON objects which
          // will be added to result in an array
          
          // The array[0] contains all the
          // header columns so we store them
          // in headers array
          return dataLines[0].split(',');
     }

     getData(){          
          let reader = fs.readFileSync(this.csvPath);
          // Convert the data to String and        // split it in an array
          let dataLines = reader.toString().split("\r\n");      
          let result = [];

          // The array[0] contains all the
          // header columns so we store them
          // in headers array
          let headers = dataLines[0].split(',');
          // create a list for each column
          for (let i = 0; i < headers.length; i++) {
               result[i] = [];
          }
          
          // Since headers are separated, we
          // need to traverse remaining n-1 rows.
          for (let i = 1; i < dataLines.length; i++) {
               let currRow = dataLines[i].split(",");
               for (let j = 0; j < currRow.length; j++){
                    result[j].push(currRow[j]);
               }
          }
          this.headers = headers;
          this.data = result;
          return result;
     }*/
}

module.exports = TimeSeries;

