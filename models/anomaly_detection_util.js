const Math = require('Math');


class Line{
    constructor (a = 0, b = 0){
        this.a = a;
        this.b = b;
    }
    /*
    * Name: f
    * Input: float
    * Output: float
    * Function Operation: f(x) of this line
    */
    f (x){
        return this.a * x + this.b;
    }
}

class Point{
    constructor (x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

function sum(array, size){
    let s = 0;
    for (let i = 0 ; i < size ; i++){
        s += Number(array[i]);
    }
    return s;
}

function sumOfDoubles(array, size){
    let s = 0;
    for (let i = 0 ; i < size ; i++){
        s += array[i]*array[i];
    }
    return s;
}

function avg(x, size){
	let s = sum(x, size);
	return (s / size);
}

function variance(x, size){
    let s = sum(x, size);
    let dSum = sumOfDoubles(x, size);
    return ((dSum/size) - Math.pow(s/size,2));
}
function cov(x, y, size){
    let avgX = avg(x, size);
    let avgY = avg(y, size);
    let s = 0;
    for (let i = 0; i < size ; i++){
        s = s + ((x[i]-avgX)*(y[i]-avgY));
    }
    return (s / size);
}
function pearson(x, y, size){
	return (cov(x, y, size) / (Math.sqrt(variance(x, size)) * Math.sqrt(variance(y, size))));
}
function linear_reg(points, size){
    let xArray = [], yArray = [];
    for (let i = 0; i < size; i++){
        xArray[i] = points[i].x;
        yArray[i] = points[i].y;
    }
    let a = (cov(xArray,yArray,size)/variance(xArray,size));
    let b = avg(yArray,size)-a*avg(xArray,size);

	return new Line(a,b);
}
function dev(p, points, size){
    let line = linear_reg(points,size);
    return dev(p,line);
}
function dev(p, l){
    let x=p.x;
    let onLineY=(l.a)*x+l.b;
	if (onLineY>p.y)
        return (onLineY-p.y);
    else
        return p.y-onLineY;    
}

module.exports = {Line, Point, sum, sumOfDoubles, avg, variance, cov, pearson, linear_reg, dev, dev}