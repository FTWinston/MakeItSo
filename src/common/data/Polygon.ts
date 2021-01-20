// import Queue from 'tinyqueue';
import { Vector2D } from './Vector2D';

export type Polygon = Vector2D[];

export function getArea(polygon: Polygon) {
    if (polygon.length < 3) {
        return 0;
    }

    let firstTot = 0;
    let secondTot = 0;

    let prev = polygon[0];
    let current;

    for (let i = 1; i < polygon.length; i++) {
        current = polygon[i];

        firstTot += prev.x * current.y;
        secondTot += prev.y * current.x;

        prev = current;
    }

    current = polygon[0];
    firstTot += prev.x * current.y;
    secondTot += prev.y * current.x;

    return (firstTot - secondTot) / 2;
}

export function getBounds(polygon: Polygon) {
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    for (const point of polygon) {
        if (point.x < minX) {
            minX = point.x;
        }
        if (point.x > maxX) {
            maxX = point.x;
        }

        if (point.y < minY) {
            minY = point.y;
        }
        if (point.y > maxY) {
            maxY = point.y;
        }
    }
    
    return {
        minX,
        minY,
        maxX,
        maxY,
    };
}

export function getCentroid(polygon: Polygon): Vector2D {
    let sumX = 0;
    let sumY = 0;

    for (const point of polygon) {
        sumX += point.x;
        sumY += point.y;
    }

    return {
        x: sumX / polygon.length,
        y: sumY / polygon.length,
    };
}

/*
export function getPointFurthestFromEdge(polygon: Polygon): Vector2D {
    // based on this: https://github.com/mapbox/polylabel
    const precision = 0.1;

    const { minX, minY, maxX, maxY } = getBounds(polygon);
    const width = maxX - minX;
    const height = maxY - minY;

    const cellSize = Math.min(width, height);

    if (cellSize === 0) {
        return {
            x: minX,
            y: minY,
        };
    }

    let h = cellSize / 2;

    // a priority queue of cells in order of their "potential" (max distance to polygon)
    const cellQueue = new Queue<Cell>(undefined, (a: Cell, b: Cell) => b.max - a.max);

    // cover polygon with initial cells
    for (let x = minX; x < maxX; x += cellSize) {
        for (let y = minY; y < maxY; y += cellSize) {
            cellQueue.push(new Cell(x + h, y + h, h, this));
        }
    }
    
    // take centroid as the first best guess
    const centroid = this.centroid;
    let bestCell = new Cell(centroid.x, centroid.y, 0, this);

    // special case for rectangular polygons
    const bboxCell = new Cell(minX + width / 2, minY + height / 2, 0, this);
    if (bboxCell.d > bestCell.d) {
        bestCell = bboxCell;
    }

    while (cellQueue.length) {
        // pick the most promising cell from the queue
        let cell = cellQueue.pop();

        // update the best cell if we found a better one
        if (cell.d > bestCell.d) {
            bestCell = cell;
        }

        // do not drill down further if there's no chance of a better solution
        if (cell.max - bestCell.d <= precision) continue;

        // split the cell into four cells
        h = cell.h / 2;
        cellQueue.push(new Cell(cell.x - h, cell.y - h, h, this));
        cellQueue.push(new Cell(cell.x + h, cell.y - h, h, this));
        cellQueue.push(new Cell(cell.x - h, cell.y + h, h, this));
        cellQueue.push(new Cell(cell.x + h, cell.y + h, h, this));
    }

    return bestCell;
}
*/

export function bisect(polygon: Polygon, p1: Vector2D, p2: Vector2D): Polygon[] {
    if (polygon.length < 3) {
        return [];
    }

    const [gradientBisector, yInterceptBisector] = getEquation(p1, p2);

    const isAboveBisector = p2.x === p1.x
        ? (test: Vector2D) => test.x < p1.x
        : (test: Vector2D) => gradientBisector * test.x + yInterceptBisector > test.y;

    const above: Polygon = [];
    const below: Polygon = [];

    // Check each point, as soon as one is on the other side of the bisector from the previous point, find exactly where the connecting line crossed it.
    // ... and start building separate polygons.
    
    // Currently not bothering to see if we need more than one polygon on a side (e.g. when a C is bisected vertically)
    // cos we're only calculating the area, so that isn't needed.

    let prevPoint = polygon[0];
    let prevIsAbove = isAboveBisector(prevPoint);

    if (prevIsAbove)
        above.push(prevPoint);
    else
        below.push(prevPoint);

    let currentPoint: Vector2D;
    let currentIsAbove: boolean;

    for (let i = 1; i < polygon.length; i++) {
        currentPoint = polygon[i];
        currentIsAbove = isAboveBisector(currentPoint);

        if (currentIsAbove !== prevIsAbove) {
            const intersection = getBisectorIntersection(prevPoint, currentPoint, gradientBisector, yInterceptBisector);
            tryAddNotMatchingLast(above, intersection);
            tryAddNotMatchingLast(below, intersection);
        }

        if (currentIsAbove) {
            tryAddNotMatchingLast(above, currentPoint);
        }
        else {
            tryAddNotMatchingLast(below, currentPoint);
        }

        prevPoint = currentPoint;
        prevIsAbove = currentIsAbove;
    }

    currentPoint = polygon[0];
    currentIsAbove = isAboveBisector(currentPoint);
    if (currentIsAbove !== prevIsAbove) {
        const intersection = getBisectorIntersection(prevPoint, currentPoint, gradientBisector, yInterceptBisector);
        tryAddNotMatchingLast(above, intersection);
        tryAddNotMatchingLast(below, intersection);
    }

    const results = [];

    if (above.length >= 3) {
        results.push(above);
    }
    if (below.length >= 3) {
        results.push(below);
    }

    return results;
}

function getBisectorIntersection(prevPoint: Vector2D, currentPoint: Vector2D, gradientBisector: number, yInterceptBisector: number) {
    // if this segment crossed the bisection line, add the point that happens at to both sets and continue (adding to the other set now)
    const [gradientSegment, yInterceptSegment] = getEquation(prevPoint, currentPoint);
    const intersection = getIntersection(gradientBisector, yInterceptBisector, gradientSegment, yInterceptSegment);
    return intersection;
}

function tryAddNotMatchingLast(points: Polygon, newPoint: Vector2D) {
    if (points.length !== 0) {
        const last = points[points.length - 1];

        if (nearEqual(last, newPoint)) {
            return;
        }
    }

    points.push(newPoint);
}

function nearEqual(a: Vector2D, b: Vector2D) {
    if (a.x < b.x - 0.001 || a.x > b.x + 0.001) {
        return false;
    }

    if (a.y < b.y - 0.001 || a.y > b.y + 0.001) {
        return false;
    }

    return true;
}

function getEquation(p1: Vector2D, p2: Vector2D): [number, number] {
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

function getIntersection(m1: number, c1: number, m2: number, c2: number): Vector2D {
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

/*
class Cell implements Vector2D {
    public readonly d: number;
    public readonly max: number;

    constructor(public readonly x: number, public readonly y: number, public readonly h: number, polygon: Polygon) {
        this.d = this.pointToPolygonDist(x, y, polygon);
        this.max = this.d + this.h * Math.SQRT2; // max distance to polygon within this cell
    }

    private pointToPolygonDist(x: number, y: number, polygon: Polygon) {
        let inside = false;
        let minDistSq = Infinity;

        const points = polygon;

        for (let i = 0, len = points.length, j = len - 1; i < len; j = i++) {
            const a = points[i];
            const b = points[j];

            if ((a.y > y !== b.y > y) && (x < (b.x - a.x) * (y - a.y) / (b.y - a.y) + a.x)) {
                inside = !inside;
            }

            minDistSq = Math.min(minDistSq, this.getSegDistSq(x, y, a, b));
        }

        return (inside ? 1 : -1) * Math.sqrt(minDistSq);
    }

    // get squared distance from a point to a segment
    private getSegDistSq(px: number, py: number, a: Vector2D, b: Vector2D) {
        let x = a.x;
        let y = a.y;
        let dx = b.x - x;
        let dy = b.y - y;

        if (dx !== 0 || dy !== 0) {
            const t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);

            if (t > 1) {
                x = b.x;
                y = b.y;
            } else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }

        dx = px - x;
        dy = py - y;

        return dx * dx + dy * dy;
    }
}
*/
