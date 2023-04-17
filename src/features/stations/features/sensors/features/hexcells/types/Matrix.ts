function checkRowIndex(matrix: Matrix, index: number, outer: boolean = false) {
    let max = outer ? matrix.rows : matrix.rows - 1;
    if (index < 0 || index > max) {
        throw new RangeError('Row index out of range');
    }
}

export class Matrix {
    private _rows: number;
    private _columns: number;

    constructor(private data: number[][]) {
        this._rows = data.length;
        this._columns = data[0].length;

        for (let i = 0; i < this._rows; i++) {
            if (data[i].length !== this._columns) {
                throw new RangeError('Inconsistent array dimensions');
            }
            /*
            if (!isArrayOfNumbers(_data[i])) {
                throw new TypeError('Input data contains non-numeric values');
            }
            */
        }
    }

    static create(rows: number, columns: number): Matrix {
        const data: number[][] = [];

        for (let i = 0; i < rows; i++) {
            data.push(new Array(columns).fill(0))
        }

        return new Matrix(data);
    }
  
    public get rows() { return this._rows; }
    public get columns() { return this._columns; }

    set(rowIndex: number, columnIndex: number, value: number) {
        this.data[rowIndex][columnIndex] = value;
        return this;
    }
    
    get(rowIndex: number, columnIndex: number) {
        return this.data[rowIndex][columnIndex];
    }
  
    /**
     * Removes a row from the matrix (in place).
     * @param index - Row index.
     */
    removeRow(index: number) {
        checkRowIndex(this, index);
        this.data.splice(index, 1);
        this._rows -= 1;
        return this;
    };
  
    /**
     * Adds a new row to the matrix (in place).
     * @param index - Row index. Default: `this.rows`.
     * @param array - Row to add.
     */
    addRow(index: number, array: number[]) {
        checkRowIndex(this, index, true);

        if (array.length !== this.columns) {
            throw new RangeError('vector size must be the same as the number of columns');
        }

        this.data.splice(index, 0, array);
        this._rows += 1;
        return this;
    }
  }