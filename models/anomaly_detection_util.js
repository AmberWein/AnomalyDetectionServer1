const Math = require('mathjs');

// Line object holds a and b defining linear line
class Line{
    constructor (a = 0, b = 0){
        this.a = a;
        this.b = b;
    }
    // get f(x) of this line
    f (x){
        return this.a * x + this.b;
    }
}
// Point object holds x and y coordinates
class Point{
    constructor (x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

// sum the values of the given array
function sum(array, size){
    let s = 0;
    for (let i = 0 ; i < size ; i++){
        s += Number(array[i]);
    }
    return s;
}
// sum the powered values of the given array
function sumOfDoubles(array, size){
    let s = 0;
    for (let i = 0 ; i < size ; i++){
        s += array[i]*array[i];
    }
    return s;
}
// Average the values of the given array x
function avg(x, size){
	let s = sum(x, size);
	return (s / size);
}
// Calculate the variance of the given array x
function variance(x, size){
    let s = sum(x, size);
    let dSum = sumOfDoubles(x, size);
    return ((dSum/size) - Math.pow((s/size),2));
}
// Calculate the covariance of the given arrays x and y
function cov(x, y, size){
    let avgX = avg(x, size);
    let avgY = avg(y, size);
    let s = 0;
    for (let i = 0; i < size ; i++){
        s = s + ((x[i]-avgX)*(y[i]-avgY));
    }
    return (s / size);
}
// Calculate the pearson correlation between the 2 given arrays x and y
function pearson(x, y, size){
    let varX = variance(x, size), varY = variance(y, size)
    let denominator = Math.sqrt(varX) * Math.sqrt(varY)

    let covXY = cov(x, y, size)
    if (denominator == 0 || covXY < Math.pow(10, -5)) // not sure this is actually good..
        return 0;
    return  covXY / denominator;
}
// Return the new line of regresion for the given points array
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
// Calculate the deviation of the point p from the regresion line of points array
function dev(p, points, size){
    let line = linear_reg(points,size);
    return dev(p,line);
}
// Calculate the deviation of the point p from the regresion line l
function dev(p, l){
    let x=p.x;
    let onLineY=(l.a)*x+l.b;
	if (onLineY>p.y)
        return (onLineY-p.y);
    else
        return p.y-onLineY;    
}

// export modules from file
module.exports = {Line, Point, sum, sumOfDoubles, avg, variance, cov, pearson, linear_reg, dev, dev}