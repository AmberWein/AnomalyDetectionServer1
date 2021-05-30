# AnomalyDetectionServer
A web application to detect a flight's anomalies, at Advanced Programming 2nd course, Bar-Ilan University.  
Created by: Nicole Sharabany, Amber Weiner and Avia wolf.

## Overview and Features:
The program features a convenient user interface, that supports two options for the user: 
1. Upload a csv file that he wants to train, and another csv file with possible anomalies.    
The user choose an anomaly detection algorithm (one from two available options- a simple one based on regression line and a hybrid one based on min circle) which proccess the uploaded data.  
When the user press the "Upload" button, the algorithm's results are presented.  
2. Write a code that sends an http POST request to the domain http://localhost/8080/detect/ with a json file.  
Run it and get back a Json file with the anomalies detected in the given file (if there are any).  
Our app using JavaScript, HTML, EJS and CSS with the MVC design pattern.  
The project is divided into four main parts:  
1. The client side.
2. Model- a RESTful API that manages the data and the logic by using the chosen anomaly detection algorithm.
3. Controller- to run and manage the app's flow. It accepts input and convert it to commands for the model or for the view.
4. View- to present all of the information and render presentation of the model in a particular format.

## Organization of the Project:
Our project is organized in five folders:
1. models- contains all of the models.
2. controller- conatins app.js which start the application.
3. views- contains all of the views including partials directory in which we define a view for different parts of the page.
4. public- contains styles.css which define a style for the entire project.
5. uploads- contains csv files that the client chose to upload.

## Required Installations:
Before we can run the app, there are some required installations to do, download node.js package and the express package.  
To do that, please follow the next steps:
1. Download npm from the internet, you can use this link: https://nodejs.org/en/download/
2. Open a cmd and press the following commands  
* "npm init --yes"  
* "npm i express"  
* "npm install --save multer"  
3. Save the project's files on your computer.   
That's all, now we are ready to start!
Notice: if you wish to run Naftali.py, please pip install requests and change the path at the file to where you have saved the files in your computer.

## Manual:
1. Download the repository.
2. Run the app (from the directory where you saved the project) by using "node app" in the cmd.  
Notice: if the app is succesfully ruמning you should see "App is listening.." in the cmd.
4. Open a browser and enter http://localhost:8080/ in the address line.
5. The app is on, feel free to try to use it!

## project's structure:
### Model:
Responsible for the logic part of the application. It gets (from the controller) the user's selection of two CSV files, one for leraning and another for detection, and an anomaly detection algorithm he wishes to use in order to detect the anomalies. After the information is given, the model finds anomalies in the given file (if there are any). Then, the result are sent back to the controller.

### controller:
Gets an http request from the user,using what the user has chosen and send them to the model.  
After the model have detected the anomalies using the given arguments, it returns it to the controller which sends it to the view for represting.

### View:
For any representation of information in our site. It's porpuse is to make the detection's results more accesible.  

## The API:
GET / - this path representing the home page of the app in which the user can upload 2 csv files and choose an anomaly detection algorithm.  
In addition, after uplouding, on the right hand side the algorithm's results are presented.  
POST /detect - this path represent that the client have uploaded the required csv files and chose an anomaly detection algorithm.

## The client side:
The user sends a POST request to the controller which get from the server the detected anomalies according to the given files and the chosen algorithm.  
When the results from the API server return to the controller, it passes them to the view in order to present them to the user.  
Therefore, the user can observe any anomaly that were found arranged in a table.  

## The server side:
According to 2 different anomaly detection algorithms, the server (in this case, a model), detects anomalies.  
The user can choose either simple (line regression) anomaly detector or a hybrid anomaly detector (basd on a min circle).
It receives two different csv files, one for learning and another for detection.

## UML diagram:
![image](https://user-images.githubusercontent.com/63461543/120115001-7820df80-c18a-11eb-9f4e-66d4c0cc2384.png)
