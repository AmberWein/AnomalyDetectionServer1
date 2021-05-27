const enclosingCircle = require('smallest-enclosing-circle')
const Util = require('./anomaly_detection_util.js')

class Circle {
    center;
    radius;
    constructor(c, r) {
        this.center = c;
        this.radius = r;
    }
}

/*
function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function dist(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function defineCircleByTwoPoints(p1, p2) {
    let diameter = distance(p1, p2);
    let radius = diameter / 2;
    let center = Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    return new Circle(center, radius);
}

function minRadiusCircle(vector<Circle*> circles) {
    float min = std::numeric_limits<double>::infinity();
    // define a default circle
    Circle *minCircle = circles[0];
    for (Circle *c: circles) {
        if (c->radius < min) {
            min = c->radius;
            minCircle = c;
        }
    }
    return *minCircle;
}

Circle circleBy3Points(Point &p1, Point &p2, Point &p3) {
    float a, b, r, a1, a2, b1, b2, x, y;
    a1 = (p2.x * p2.x + p2.y * p2.y - p1.x * p1.x - p1.y * p1.y) / (2 * (p2.x - p1.x));
    a2 = (p1.y - p2.y) / (p2.x - p1.x);
    b1 = (p3.x * p3.x + p3.y * p3.y - p1.x * p1.x - p1.y * p1.y) / (2 * (p3.x - p1.x));
    b2 = (p1.y - p3.y) / (p3.x - p1.x);
    b = (b1 - a1) / (a2 - b2);
    a = a1 + a2 * b;
    x = p1.x - a;
    y = p1.y - b;
    r = sqrt(x * x + y * y);
    return {Point(a, b), r};
}

bool isInside(Point p, Circle &c) {
    float d = distance(p, c.center);
    if (d <= c.radius) {
        return true;
    }
    return false;
}

Circle defineCircleByThreePoints(Point &p1, Point &p2, Point &p3) {
    Circle c1 = defineCircleByTwoPoints(p1, p2);
    Circle c2 = defineCircleByTwoPoints(p2, p3);
    Circle c3 = defineCircleByTwoPoints(p1, p3);
    vector<Circle *> circles;
    // push into vector, any circle that contains the 3'rd point, that is not defining it.
    if (isInside(p3, c1))
        circles.push_back(&c1);
    if (isInside(p2, c3))
        circles.push_back(&c3);
    if (isInside(p1, c2))
        circles.push_back(&c2);
    //check if no circle contained the 3'rd point - define the circle by 3 points.
    if (circles.empty())
        return circleBy3Points(p1, p2, p3);
    // there is at least one circle that contains all 3 points, return the one with the smallest radius.
    return minRadiusCircle(circles);
}

Circle recursiveMinCircle(Point** points, vector<Point*> pRadius, size_t size) {
    int pRadiusSize = pRadius.size();
    // base case, no points to define the circle, ot there are already 3 point on the perimeter, so they define the circle.
    if (size == 0 || pRadiusSize == 3) {
        if (pRadiusSize == 0) {
            return {Point(0, 0), 0};
        }
        if (pRadiusSize == 1) {
            return {*pRadius[0], 0};
        }
        if (pRadiusSize == 2) {
            return defineCircleByTwoPoints(*pRadius[0], *pRadius[1]);
        }
        if (pRadiusSize == 3) {
            return defineCircleByThreePoints(*pRadius[0], *pRadius[1], *pRadius[2]);
        }
    }
    // save a reference to the last point given
    Point *p = points[size-1];
    // define a circle without Point p
    Circle c = recursiveMinCircle(points, pRadius, size-1);
    // if p inside c return circle c
    if (isInside(*p, c)) {
        return c;
    }
    // else - put p in pRadius, and find circle for points-{p}, pRadius+{p}
    pRadius.push_back(p);
    return recursiveMinCircle(points, pRadius, size-1);
}
*/
function findMinCircle(points){
    let circ = enclosingCircle(points);
    let p = new Util.Point(circ.x, circ.y);
    return new Circle(p, circ.r);
}




module.exports.Circle = Circle;
module.exports.findMinCircle = findMinCircle;