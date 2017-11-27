class ShieldData {
    constructor(cols, rows) {
        this.cols = cols; this.rows = rows;
        this.data = Array(cols * rows);
        this.minMatchNum = 3;
    }

    cols: number;
    rows: number;
    data: ShieldBlock[];
    minMatchNum: number;

    index(x, y) {
        return x * this.rows + y;
    }
    getBlock(x, y) {
        return this.data[this.index(x,y)];
    }
    swapValues(x, y) {
        var i1 = this.index(x, y), i2 = this.index(x + 1, y);
        var tmp1 = this.data[i1], tmp2 = this.data[i2];
        
        if (tmp1 !== undefined && !tmp1.canMove())
            return;
        if (tmp2 !== undefined && !tmp2.canMove())
            return;
        
        this.data[i1] = tmp2; this.data[i2] = tmp1;
        
        var combo = 0;
        if (tmp2 !== undefined)
            combo += this.checkMatchingGroup(x, y, 2);
        if (tmp1 !== undefined)
            combo += this.checkMatchingGroup(x + 1, y, 2);
        
        return combo;
    }
    isFull() {
        // if anything in the last row, then the shield is full, and cannot add more data
        var i1 = this.index(0, this.rows - 1);
        for (var i = i1; i<this.data.length; i++)
            if (this.data[i] !== undefined)
                return true;
        return false;
    }
    setBlock(block, x, y) {
        block.falling = true;
        var index = this.index(x,y);
        this.data[index] = block;
    }
    checkMatchingGroup(x, y, comboLifetime) {
        let block = this.getBlock(x,y);
        if (block === undefined || block.type == ShieldBlockType.ActiveCombo)
            return 0;
        
        var matches = [];
        var minX = x, maxX = x, minY = y, maxY = y;
        
        while (minX > 0 && block.isMatch(this.getBlock(minX - 1,y)))
            minX --;
        
        while (maxX < this.cols - 1 && block.isMatch(this.getBlock(maxX + 1, y)))
            maxX ++;
        
        var comboBlocks = [];
        
        var numX = maxX - minX + 1;
        if (numX >= this.minMatchNum) {
            for (var tx=minX; tx<=maxX; tx++)
                comboBlocks.push(this.getBlock(tx, y));
        }
        else
            numX = 0;
        
        while (minY > 0 && block.isMatch(this.getBlock(x, minY - 1)))
            minY --;
        
        while (maxY < this.rows - 1 && block.isMatch(this.getBlock(x, maxY + 1)))
            maxY ++;
        
        var numY = maxY - minY + 1;
        if (numY >= this.minMatchNum) {
            for (var ty=minY; ty<=maxY; ty++)
                comboBlocks.push(this.getBlock(x, ty));
            
            if (numX > 0)
                numY --;
        }
        else
            numY = 0;
        
        for (var i=0; i<comboBlocks.length; i++) {
            let block = comboBlocks[i];
            block.type = ShieldBlockType.ActiveCombo;
            block.color = comboLifetime;
        }
        
        return numX + numY;
    }
    getFillPercentage(x1, x2) {
        var i1 = this.index(x1, 0), i2 = this.index(x2, this.rows - 1);
        
        var numCells = i2 - i1 - 1, numBlocks = 0;
        for (var i=i1; i<=i2; i++) {
            var block = this.data[i];
            if (block !== undefined && !block.isDamage())
                numBlocks ++;
        }
        
        return Math.round(100 * numBlocks / numCells);
    }
    applyGravity() {
        var stoppedBlocks = [];
        var lastRow = this.rows - 1;
        for (var x = 0; x < this.cols; x++)
            for (var y = lastRow; y >= 0; y--) {
                var bAbove = this.getBlock(x, y);
                if (bAbove === undefined)
                    continue;
                // remove "active combo" blocks, or progress them towards removal
                else if (bAbove.type == ShieldBlockType.ActiveCombo) {
                    bAbove.color --;
                    if (bAbove.color == 0)
                        this.data[this.index(x, y)] = undefined;
                    continue;
                }
                else if (y == lastRow) {
                    if (bAbove.falling) {
                        stoppedBlocks.push({x: x, y: y});
                        bAbove.falling = false;
                    }
                    continue;
                }
                
                var bBelow = this.getBlock(x, y + 1)
                if (bBelow === undefined) {
                    var i1 = this.index(x, y), i2 = this.index(x, y + 1);
                    this.data[i1] = undefined;
                    this.data[i2] = bAbove;
                    bAbove.falling = true;
                }
                else if (bAbove.falling) {
                    stoppedBlocks.push({x: x, y: y});
                    bAbove.falling = false;
                }
            }
        
        for (var i=0; i<stoppedBlocks.length; i++) {
            var pos = stoppedBlocks[i];
            this.checkMatchingGroup(pos.x, pos.y, 1);
        }
    }
    clear() {
        for (let i=this.data.length; i>=0; i--)
            this.data[i] = undefined;
    }
}