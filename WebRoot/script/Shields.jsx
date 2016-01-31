window.Shields = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				<ShieldDisplay ref="shield" width={this.props.width*0.85} height={this.props.height} visible={this.props.visible} />
			</system>
		);
	},
	receiveMessage: function (msg, data) {
		switch(msg) {
			case 'set':
				var values = data.split(' ');
				if (values.length != 3) {
					console.error('Shields expected 3 parameters to its "' + msg + '" message, got: ' + data);
					return;
				}
				var index = parseInt(values[0]), type = parseInt(values[1]), color = parseInt(values[2]);
				this.refs.shield.setBlock(index, type, color);
				break;
			default:
				console.error('Shields received unexpected message: "' + msg + '" with data: ' + data);
		}
	}
});

window.ShieldDisplay = React.createClass({
	getDefaultProps: function() {
		return { x: 0, y: 0, cellsTall: 24, cellsWide: 36, minSwipeDist: 20, maxTapDist: 10, colors: ['#cc0000', '#ff9900', '#cccc00', '#00cc00', '#0099ff', '#9900ff'] };
	},
	mixins: [CanvasComponentMixin],
	componentDidMount: function () {
		var startX = Math.floor(this.props.cellsWide / 2), startY = Math.floor(this.props.cellsTall / 2);
		this.cursor = new ShieldCursor(startX, startY);
		this.data = new ShieldData(this.props.cellsWide, this.props.cellsTall);
		
		this._readProps(this.props);

		for (var x=0; x<this.props.cellsWide; x++)
			for (var y=2; y<this.props.cellsTall; y++) {
				var color = Math.floor(Math.random() * this.props.colors.length);
				var block = new ShieldBlock(color, ShieldBlock.prototype.BlockType.Normal);
				this.data.setBlock(block, x, y);
			}
		
		this.interval = setInterval(this.applyGravity,400);
		
		Hotkeys.register(37, this);
		Hotkeys.register(38, this);
		Hotkeys.register(39, this);
		Hotkeys.register(40, this);
		Hotkeys.register(' ', this);
	},
	componentWillUnmount: function() {
		this.cursor = null;
		this.data = null;
		
		clearInterval(this.interval);
		
		Hotkeys.unregister(37, this);
		Hotkeys.unregister(38, this);
		Hotkeys.unregister(39, this);
		Hotkeys.unregister(40, this);
		Hotkeys.unregister(' ', this);
	},
	componentWillReceiveProps: function (nextProps) {
		this._readProps(nextProps);
	},
	_readProps: function(props) {
		this.cellWidth = props.width / props.cellsWide; this.cellHeight = props.height * 0.95 / props.cellsTall;
		this.cursor.xscale = props.width / props.cellsWide;
		this.cursor.yscale = props.height * 0.95 / props.cellsTall;
		this.cursor.cellsTall = props.cellsTall;
	},
	onTap: function (x, y) {
		this._swap();
		this.redraw();
	},
	onSwipe: function(dir, x, y) {
		if (dir == TouchFunctions.SwipeDir.Up)
			this._moveUp();
		else if (dir == TouchFunctions.SwipeDir.Down)
			this._moveDown();
		else if (dir == TouchFunctions.SwipeDir.Left)
			this._moveLeft();
		else if (dir == TouchFunctions.SwipeDir.Right)
			this._moveRight();
		
		this.redraw();
	},
	draw: function() {
		if (!this.props.visible)
			return;
		var ctx = this.refs.canvas.getContext('2d');

		this._drawBackground(ctx);
		
		var xBorder = this.cellWidth * 0.05, yBorder = this.cellHeight * 0.05;
		for (var y=0; y<this.props.cellsTall; y++)
			for (var x=0; x<this.props.cellsWide; x++) {
				var block = this.data.getBlock(x, y);
				if (block !== undefined)
					block.draw(ctx, x, y, this.cellWidth, this.cellHeight, this.props.colors);
			}

		this.cursor.draw(ctx);
	},
	_drawBackground: function(ctx) {
		ctx.fillStyle = '#000000';
		ctx.beginPath();
		ctx.rect(0, 0, this.props.width, this.props.height * 0.95);
		ctx.fill();
		
		ctx.clearRect(0, this.props.height * 0.95, this.props.width, this.props.height * 0.05);
		
		// write column labels
		var size = Math.min(this.props.height * 0.04, this.props.width / 50);
		ctx.font = size + 'px Arial';
		ctx.fillStyle = '#cccccc';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'bottom';
		ctx.fillText('port: ' + this.data.getFillPercentage(0, 5) + ' %', this.props.width / 12, this.props.height);
		ctx.fillText('starboard: ' + this.data.getFillPercentage(6, 11) + '%', this.props.width * 3 / 12, this.props.height);
		ctx.fillText('bow: ' + this.data.getFillPercentage(12, 17) + '%', this.props.width * 5 / 12, this.props.height);
		ctx.fillText('stern: ' + this.data.getFillPercentage(18, 23) + '%', this.props.width * 7 / 12, this.props.height);
		ctx.fillText('dorsal: ' + this.data.getFillPercentage(24, 29) + '%', this.props.width * 9 / 12, this.props.height);
		ctx.fillText('ventral: ' + this.data.getFillPercentage(30, 35) + '%', this.props.width * 11 / 12, this.props.height);
		
		ctx.strokeStyle = '#999999';
		ctx.lineWidth = this.cellWidth * 0.075;
		ctx.beginPath();
		for (var x=6; x<this.props.cellsWide; x+=6) {
			ctx.moveTo(x * this.cellWidth, 0);
			ctx.lineTo(x * this.cellWidth, this.props.height);
		}
		ctx.stroke();
	},
	keyDown: function(e) {
		if (e.which == 38)
			this._moveUp();
		else if (e.which == 40)
			this._moveDown();
		else if (e.which == 37)
			this._moveLeft();
		else if (e.which == 39)
			this._moveRight();
		else if (e.which == 32)
			this._swap();
		else
			return;
		
		this.redraw();
	},
	applyGravity() {
		this.data.applyGravity();
		this.redraw();
	},
	isVisible: function() { return this.props.visible; },
	_moveUp: function() {
		this.cursor.y = Math.max(this.cursor.y - 1, 0);
	},
	_moveDown: function() {
		this.cursor.y = Math.min(this.cursor.y + 1, this.props.cellsTall - 1);
	},
	_moveLeft: function() {
		this.cursor.x = Math.max(this.cursor.x - 1, 0);
	},
	_moveRight: function() {
		this.cursor.x = Math.min(this.cursor.x + 1, this.props.cellsWide - 2);
	},
	_swap: function() {
		var combo = this.data.swapValues(this.cursor.x, this.cursor.y);
		if (combo > 0)
			console.log('removed ' + combo + ' blocks');
	},
	setBlock: function(index, type, color) {
		var block = new ShieldBlock(color, type);
		block.falling = true;
		this.data.data[index] = block;
	}
});

function ShieldData(cols, rows) {
	this.cols = cols; this.rows = rows;
	this.data = Array(cols * rows);
	this.minMatchNum = 3;
}

ShieldData.prototype.index = function(x, y) {
	return x * this.rows + y;
}

ShieldData.prototype.getBlock = function(x, y) {
	return this.data[this.index(x,y)];
};

ShieldData.prototype.swapValues = function(x, y) {
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
};

ShieldData.prototype.isFull = function() {
	// if anything in the last row, then the shield is full, and cannot add more data
	var i1 = this.index(0, this.rows - 1);
	for (var i = i1; i<this.data.length; i++)
		if (this.data(i) !== undefined)
			return true;
	return false;
}

ShieldData.prototype.setBlock = function(block, x, y) {
	block.falling = true;
	var index = this.index(x,y);
	this.data[index] = block;
};

ShieldData.prototype.checkMatchingGroup = function(x, y, comboLifetime) {
	var block = this.getBlock(x,y);
	if (block === undefined || block.type == ShieldBlock.prototype.BlockType.ActiveCombo)
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
		var block = comboBlocks[i];
		block.type = ShieldBlock.prototype.BlockType.ActiveCombo;
		block.color = comboLifetime;
	}
	
	return numX + numY;
}

ShieldData.prototype.getFillPercentage = function(x1, x2) {
	var i1 = this.index(x1, 0), i2 = this.index(x2, this.rows - 1);
	
	var numCells = i2 - i1 - 1, numBlocks = 0;
	for (var i=i1; i<=i2; i++) {
		var block = this.data[i];
		if (block !== undefined && !block.isDamage())
			numBlocks ++;
	}
	
	return Math.round(100 * numBlocks / numCells);
};

ShieldData.prototype.applyGravity = function() {
	var stoppedBlocks = [];
	var lastRow = this.rows - 1;
	for (var x = 0; x < this.cols; x++)
		for (var y = lastRow; y >= 0; y--) {
			var bAbove = this.getBlock(x, y);
			if (bAbove === undefined)
				continue;
			// remove "active combo" blocks, or progress them towards removal
			else if (bAbove.type == ShieldBlock.prototype.BlockType.ActiveCombo) {
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
};

function ShieldCursor(x, y) {
	this.x = x; this.y = y;
};

ShieldCursor.prototype.draw = function(ctx) {
	ctx.strokeStyle = '#FFFFFF';
	ctx.lineWidth = this.xscale * 0.15;
	ctx.beginPath();
	ctx.rect(this.x * this.xscale, this.y * this.yscale, 2 * this.xscale, this.yscale);
	ctx.stroke();
};

function ShieldBlock(color, type) {
	this.color = color;
	this.type = type;
	this.falling = false;
}

ShieldBlock.prototype.BlockType = {
	Normal: 1,
	ActiveCombo: 2,
	Damage: 3
};

ShieldBlock.prototype.isMatch = function(b) {
	return b !== undefined && this.color == b.color && this.type == b.type;
};

ShieldBlock.prototype.isDamage = function() {
	return this.type == this.BlockType.Damage;
}

ShieldBlock.prototype.canMove = function() {
	return this.type != this.BlockType.Damage;
};

ShieldBlock.prototype.draw = function(ctx, x, y, width, height, colors) {		
	if (this.type == this.BlockType.ActiveCombo)
		ctx.fillStyle = '#ffffff';
	else
		ctx.fillStyle = colors[this.color];
	ctx.beginPath();
	ctx.rect(width * x + width * 0.05, height * y + height * 0.05, width * 0.9, height * 0.9);
	ctx.fill();
	
	if (this.type == this.BlockType.Damage) {
		ctx.strokeStyle = '#999999';
		ctx.lineWidth = width * 0.15;
		
		ctx.beginPath();
		ctx.moveTo(width * x, height * y);
		ctx.lineTo(width * (x + 1), height * (y + 1));
		ctx.moveTo(width * (x + 1), height * y);
		ctx.lineTo(width * x, height * (y + 1));
		ctx.stroke();
	}
};