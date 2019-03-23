interface IPoint {
    x: number;
    y: number;
}

export class Polygon {
    points: IPoint[] = [];

    public get area() {
        if (this.points.length < 3) {
            return 0;
        }

        let firstTot = 0;
        let secondTot = 0;

        let prev = this.points[0];

        for (let i = 1; i < this.points.length; i++) {
            const current = this.points[i];

            firstTot += prev.x * current.y;
            secondTot += prev.y * current.x;

            prev = current;
        }

        return (firstTot - secondTot) / 2;
    }

    public get centroid(): IPoint {
        let sumX = 0;
        let sumY = 0;

        for (const point of this.points) {
            sumX += point.x;
            sumY += point.y;
        }

        return {
            x: sumX / this.points.length,
            y: sumY / this.points.length,
        };
    }

    public bisect(p1: IPoint, p2: IPoint): Polygon[] {
        if (this.points.length < 3) {
            return [];
        }

        const [gradientBisector, yInterceptBisector] = Polygon.getEquation(p1, p2);

        const isAboveBisector = p2.x === p1.x
            ? (test: IPoint) => test.x < p1.x
            : (test: IPoint) => gradientBisector * test.x + yInterceptBisector > test.y;

        const above = new Polygon();
        const below = new Polygon();

        // Check each point, as soon as one is on the other side of the bisector from the previous point, find exactly where the connecting line crossed it.
        // ... and start building separate polygons.
        
        // Currently not bothering to see if we need more than one polygon on a side (e.g. when a C is bisected vertically)
        // cos we're only calculating the area, so that isn't needed.

        let prevPoint = this.points[0];
        let prevIsAbove = isAboveBisector(prevPoint);

        if (prevIsAbove)
            above.points.push(prevPoint);
        else
            below.points.push(prevPoint);

        for (let i = 1; i < this.points.length; i++) {
            const currentPoint = this.points[i];
            const currentIsAbove = isAboveBisector(currentPoint);

            // if this segment crossed the bisection line, add the point that happens at to both sets and continue (adding to the other set now)
            if (currentIsAbove !== prevIsAbove) {
                const [gradientSegment, yInterceptSegment] = Polygon.getEquation(prevPoint, currentPoint);
                const intersection = Polygon.getIntersection(gradientBisector, yInterceptBisector, gradientSegment, yInterceptSegment);

                above.points.push(intersection);
                below.points.push(intersection);
            }

            if (currentIsAbove)
                above.points.push(prevPoint);
            else
                below.points.push(prevPoint);

            prevPoint = currentPoint;
            prevIsAbove = currentIsAbove;
        }

        const results = [];

        if (above.points.length >= 3) {
            results.push(above);
        }
        if (below.points.length >= 3) {
            results.push(below);
        }

        return results;
    }
    
    private static getEquation(p1: IPoint, p2: IPoint): [number, number] {
        let gradient: number;
        let yIntercept: number;

        if (p2.x === p1.x) {
            gradient = Number.POSITIVE_INFINITY;
            yIntercept = p1.x; // this is a bit of a hack but it's only used in the next function so that's ok-ish
        }
        else {
            gradient = (p2.y - p1.y) / (p2.x - p1.x);
            // y = mx + c
            // c = y - mx
            yIntercept = p2.y - gradient * p2.x;
        }

        return [gradient, yIntercept];
    }

    private static getIntersection(m1: number, c1: number, m2: number, c2: number): IPoint {
        if (m1 === m2) {
            if (m1 === Number.POSITIVE_INFINITY)
            {
                return {
                    x: c1,
                    y: 0,
                }
            }
            else {
                return {
                    x: 0,
                    y: c1, // i.e.   m1 x + c1
                }
            }
        }
        else if (m1 === Number.POSITIVE_INFINITY) {
            const x = c1;
            const y = m2 * x + c2;
            return { x, y };
        }
        else if (m2 === Number.POSITIVE_INFINITY) {
            const x = c2;
            const y = m1 * x + c1;
            return { x, y };
        }
        else {
            // y = m1 x + c1
            // y = m2 x + c2

            // m1 x + c1 = m2 x + c2
            // m1 x - m2 x + c1 = c2
            // m1 x - m2 x = c2 - c1
            // m1 - m2 = (c2 - c1) / x

            const x = (c2 - c1) / (m1 - m2)
            const y = m1 * x + c1;

            return { x, y };
        }
    }
}