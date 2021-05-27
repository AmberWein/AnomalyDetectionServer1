# AnomalyDetectionServer
A web application to detect a flight's anomalies, at Advanced Programming 2nd course, Bar-Ilan University.
Created by: Nicole Sharabany, Amber Weiner and Avia wolf.

## Overview and Features:
The program features a convenient user interface to upload a csv file he wishes to train, and another csv file with possible anomalies.
The user choose an anomaly detection algorithm which proccess the uploaded data.
The algorithm's results are presented to the user in a table. 
Our app using JavaScript, HTML, EJS and CSS with the MVC design pattern.
The project is divided into two main parts:
1. The client side
2. A RESTful API handling the logic by interacting with a server that detects anomalies.

## Organization of the Project:
Our project is organized in five folders:
1. models- contains all of the models.
2. controller- conatins app.js which start the application.
3. views- contains all of the views including partials directory in which we define a view for different parts of the page.
4. public- contains styles.css which define a style for the entire project.
5. uploads- contains csv files that the client chose to upload.
