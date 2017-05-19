class CubeFace {
    public normal: Vector3;
    public vertices: [Vector3, Vector3, Vector3, Vector3];
    constructor(private origNormal: Vector3, private origVertices: [Vector3, Vector3, Vector3, Vector3], public drawSymbol: (ctx: CanvasRenderingContext2D) => void) { }

    public reset() {
        this.normal = this.origNormal.clone();
        let vertices = this.origVertices;
        this.vertices = [vertices[0].clone(), vertices[1].clone(), vertices[2].clone(), vertices[3].clone()];
    }

    public applyTransform(ctx: CanvasRenderingContext2D, size: number) {
        let tl = this.vertices[0], tr = this.vertices[1], br = this.vertices[2];
        //let oldMatrix = [[-1, 1, 1], [1, 1, -1], [1, 1, 1]];
        //let inverseOld = CubeFace.getMatrixInverse(oldMatrix);
        let inverseOld = [[-.5, 0, .5], [.5, .5, 0], [0, -.5, .5]];

        let newMatrix = [[tl.x, tr.x, br.x], [tl.y, tr.y, br.y]];
        let transform = CubeFace.matrixMultiply(newMatrix, inverseOld);

        ctx.transform(transform[0][0], transform[1][0], transform[0][1], transform[1][1], transform[0][2], transform[1][2]);
    }
    private static matrixMultiply(matrixA, matrixB) {
        let n = 2, m = 3, p = 3;
        let matrixC = [new Array(3), new Array(3)];

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < p; j++) {
                let sum = 0;
                for (let k = 0; k < m; k++) {
                    sum += matrixA[i][k] * matrixB[k][j];
                }
                matrixC[i][j] = sum;
            }
        }
        return matrixC;
    }
}