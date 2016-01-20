window.Shields = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Shields" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		var shield1 = this.props.visible ? <ShieldDisplay width={this.props.width/3} height={this.props.height/2.1} visibility={this} /> : null;

		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				{shield1}
			</system>
		);
	}
});

window.ShieldDisplay = React.createClass({
	getDefaultProps: function() {
		return { width: 0, height: 0, x: 0, y: 0, cellsTall: 25, cellsWide: 18 };
	},
	componentDidMount: function () {
		var startX = Math.floor(this.props.cellsWide / 2), startY = Math.floor(this.props.cellsTall / 2);
		var cellWidth = this.props.width / this.props.cellsWide, cellHeight = this.props.height / this.props.cellsTall;
		this.cursor = new ShieldCursor(startX, startY, cellWidth, cellHeight);
		this.data = new ShieldData(this.props.cellsWide, this.props.cellsTall);
		
		requestAnimationFrame(this.draw);
		
		Hotkeys.register('W', this);
		Hotkeys.register('S', this);
		Hotkeys.register('A', this);
		Hotkeys.register('D', this);
		Hotkeys.register(' ', this);
	},
	componentWillUnmount: function() {
		this.cursor = null;
		this.data = null;
		
		Hotkeys.unregister('W', this);
		Hotkeys.unregister('S', this);
		Hotkeys.unregister('A', this);
		Hotkeys.unregister('D', this);
		Hotkeys.unregister(' ', this);
	},
	componentDidUpdate: function (prevProps, prevState) {
		if (prevProps.width != this.props.width || prevProps.height != this.props.height) {
			this.cursor.xscale = this.props.width / this.props.cellsWide;
			this.cursor.yscale = this.props.height / this.props.cellsTall;
		}
		
		requestAnimationFrame(this.draw);
	},
	render: function() {
		return (
			<Canvas ref="canvas" width={this.props.width} height={this.props.height} minSwipeDist="20" maxTapDist="10" onSwipe={this.swiped} onTap={this.tapped} onMouseDown={this.clicked} />
		);
	},
	tapped: function (x, y) {
		swap();
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
		ctx.clearRect(0, 0, this.props.width, this.props.height);
		
		this.cursor.draw(ctx);
	},
	keyDown: function(e) {
		if (e.which == 87)
			this.moveUp();
		else if (e.which == 83)
			this.moveDown();
		else if (e.which == 65)
			this.moveLeft();
		else if (e.which == 68)
			this.moveRight();
		else if (e.which == 32)
			this.swap();
		else
			return;
		
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
		
	}
});

function ShieldCursor(x, y, xscale, yscale) {
	this.x = x; this.y = y; this.xscale = xscale; this.yscale = yscale;
};

ShieldCursor.prototype.draw = function(ctx) {
	ctx.strokeStyle = '#FF9900';
	ctx.beginPath();
	ctx.rect(this.x * this.xscale, this.y * this.yscale, 2 * this.xscale, this.yscale);
	ctx.stroke();
};

function ShieldData(cols, rows) {
	this.cols = cols; this.rows = rows;
	this.data = new Array(cols * rows);
}

ShieldData.prototype.index = function(x, y) {
	return y * this.cols + x
}

ShieldData.prototype.getValue = function(x, y) {
	return this.data[this.index(x,y)];
};

ShieldData.prototype.setValue = function(x, y, val) {
	this.data[this.index(x,y)] = val;
};

ShieldData.prototype.swapValues = function(x, y) {
	var i1 = this.index(x, y), i2 = this.index(x + 1, y);
	var tmp = this.data[i1];
	this.data[i1] = this.data[i2];
	this.data[i2] = tmp;
};

ShieldData.prototype.isFull = function() {
	// if anything in the last row, then the shield is full, and cannot add more data
	var i1 = this.index(0, this.rows - 1);
	for (var i = i1; i<this.data.length; i++)
		if (this.data(i) !== undefined)
			return true;
	return false;
}

ShieldData.prototype.addRow = function() {
	// remove the last row (we checked it wasn't full already, right?)	
	var i1 = this.index(0, this.rows - 1);
	this.data.splice(i1, this.cols);
	
	// add a row of new data
	for (var i=0; i<this.cols; i++)
		this.data.unshift(Math.floor(Math.random() * this.numColors));
}