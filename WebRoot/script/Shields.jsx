window.Shields = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Shields" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		var shield = this.props.visible ? <ShieldDisplay ref="shield" width={this.props.width*0.85} height={this.props.height} visibility={this} /> : null;
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				{shield}
			</system>
		);
	}
});

window.ShieldDisplay = React.createClass({
	getDefaultProps: function() {
		return { width: 0, height: 0, x: 0, y: 0, cellsTall: 24, cellsWide: 36, colors: ['#cc0000', '#ff9900', '#cccc00', '#00cc00', '#0099ff', '#9900ff'] };
	},
	componentDidMount: function () {
		var startX = Math.floor(this.props.cellsWide / 2), startY = Math.floor(this.props.cellsTall / 2);
		this.cellWidth = this.props.width / this.props.cellsWide; this.cellHeight = this.props.height / this.props.cellsTall;
		this.cursor = new ShieldCursor(startX, startY);
		this.data = new ShieldData(this.props.cellsWide, this.props.cellsTall);
		
		this.readProps(this.props);

		for (var x=0; x<this.props.cellsWide; x++)
			for (var y=2; y<this.props.cellsTall; y++) {
				var color = Math.floor(Math.random() * this.props.colors.length);
				var block = new ShieldBlock(color, ShieldBlock.prototype.BlockType.Normal);
				this.data.placeBlock(block, x, y);
			}
		
		requestAnimationFrame(this.draw);
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
		this.readProps(nextProps);
	},
	componentDidUpdate: function (prevProps, prevState) {
		requestAnimationFrame(this.draw);
	},
	readProps: function(props) {
		this.cellWidth = props.width / props.cellsWide; this.cellHeight = props.height / props.cellsTall;
		this.cursor.xscale = props.width / props.cellsWide;
		this.cursor.yscale = props.height / props.cellsTall;
		this.cursor.cellsTall = props.cellsTall;
	},
	render: function() {
		var style = this.props.right ? 
		{ position: 'absolute', right: '0' } : undefined;
		
		return (
			<Canvas ref="canvas" width={this.props.width} height={this.props.height} minSwipeDist="20" maxTapDist="10" onSwipe={this.swiped} onTap={this.tapped} onMouseDown={this.clicked} style={style} />
		);
	},
	tapped: function (x, y) {
		this.swap();
		requestAnimationFrame(this.draw);
	},
	swiped: function(dir, x, y) {
		if (dir == TouchFunctions.SwipeDir.Up)
			this.moveUp();
		else if (dir == TouchFunctions.SwipeDir.Down)
			this.moveDown();
		else if (dir == TouchFunctions.SwipeDir.Left)
			this.moveLeft();
		else if (dir == TouchFunctions.SwipeDir.Right)
			this.moveRight();
		
		requestAnimationFrame(this.draw);
	},
	draw: function() {
		var ctx = this.refs.canvas.getContext('2d');

		this.drawBackground(ctx);
		
		var xBorder = this.cellWidth * 0.05, yBorder = this.cellHeight * 0.05;
		for (var y=0; y<this.props.cellsTall; y++)
			for (var x=0; x<this.props.cellsWide; x++) {
				var block = this.data.getBlock(x, y);
				if (block !== undefined)
					block.draw(ctx, x, y, this.cellWidth, this.cellHeight, this.props.colors);
			}

		this.cursor.draw(ctx);
	},
	drawBackground: function(ctx) {
		ctx.fillStyle = '#000000';
		ctx.beginPath();
		ctx.rect(0, 0, this.props.width, this.props.height);
		ctx.fill();
		
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
			this.moveUp();
		else if (e.which == 40)
			this.moveDown();
		else if (e.which == 37)
			this.moveLeft();
		else if (e.which == 39)
			this.moveRight();
		else if (e.which == 32)
			this.swap();
		else
			return;
		
		requestAnimationFrame(this.draw);
	},
	applyGravity() {
		this.data.applyGravity();
		requestAnimationFrame(this.draw);
	},
	isVisible: function() {
		return this.props.visibility.props.visible;
	},
	moveUp: function() {
		this.cursor.y = Math.max(this.cursor.y - 1, 0);
	},
	moveDown: function() {
		this.cursor.y = Math.min(this.cursor.y + 1, this.props.cellsTall - 1);
	},
	moveLeft: function() {
		this.cursor.x = Math.max(this.cursor.x - 1, 0);
	},
	moveRight: function() {
		this.cursor.x = Math.min(this.cursor.x + 1, this.props.cellsWide - 2);
	},
	swap: function() {
		var combo = this.data.swapValues(this.cursor.x, this.cursor.y);
		if (combo > 0)
			console.log('removed ' + combo + ' blocks');
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
		combo += this.checkMatchingGroup(x, y);
	if (tmp1 !== undefined && !tmp1.isMatch(tmp2))
		combo += this.checkMatchingGroup(x + 1, y);
	
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

ShieldData.prototype.placeBlock = function(block, x, y) {
	var index = this.index(x,y);
	this.data[index] = block;
};

ShieldData.prototype.addFallingBlock = function(block, x, y) {
	block.falling = true;
	var index = this.index(x,y);
	this.data[index] = block;
};

ShieldData.prototype.checkMatchingGroup = function(x, y) {
	var block = this.getBlock(x,y);
	if (block === undefined)
		return 0;
	
	var matches = [];
	var minX = x, maxX = x, minY = y, maxY = y;
	
	while (minX > 0 && block.isMatch(this.getBlock(minX - 1,y)))
		minX --;
	
	while (maxX < this.cols - 1 && block.isMatch(this.getBlock(maxX + 1, y)))
		maxX ++;
	
	var numX = maxX - minX + 1;
	if (numX >= this.minMatchNum) {
		for (var tx=minX; tx<=maxX; tx++)
			this.data[this.index(tx, y)] = undefined;
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
			this.data[this.index(x, ty)] = undefined;
		
		if (numX > 0)
			numY --;
	}
	else
		numY = 0;
	
	return numX + numY;
}

ShieldData.prototype.applyGravity = function() {
	var stoppedBlocks = [];
	
	for (var x = 0; x < this.cols; x++)
		for (var y = this.rows - 2; y >= 0; y--) {
			var bAbove = this.getBlock(x, y);
			if (bAbove === undefined)
				continue;
			
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
		this.checkMatchingGroup(pos.x, pos.y);
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
	Damage: 2
};

ShieldBlock.prototype.isMatch = function(b) {
	return b !== undefined && this.color == b.color && this.type == b.type;
};

ShieldBlock.prototype.canMove = function() {
	return this.type != this.BlockType.Damage;
};

ShieldBlock.prototype.draw = function(ctx, x, y, width, height, colors) {		
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