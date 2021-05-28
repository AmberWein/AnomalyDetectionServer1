const enclosingCircle = require('smallest-enclosing-circle')
const Util = require('./anomaly_detection_util.js')

// Circle object holds center point and radius
class Circle {
    constructor(c, r) {
        this.center = c;
        this.radius = r;
    }
}

// calculate the distance between the two given points, using Pythagoras law
function dist(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

// find the minimum circle enclosing all the points from the given array
function findMinCircle(points){
    let circ = enclosingCircle(points);
    let p = new Util.Point(circ.x, circ.y);
    return new Circle(p, circ.r);
}

// export modules
module.exports.Circle = Circle;
module.exports.findMinCircle = findMinCircle;
module.exports.dist = dist;