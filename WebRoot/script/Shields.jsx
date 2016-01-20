window.Shields = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Shields" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		var shield1 = this.props.visible ? <ShieldDisplay ref="s1" width={this.props.width/2.1} height={this.props.height} visibility={this} right={false} /> : null;
		var shield2 = this.props.visible ? <ShieldDisplay ref="s2" width={this.props.width/2.1} height={this.props.height} visibility={this} right={true} /> : null;
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				{shield1}
				{shield2}
			</system>
		);
	}
});

window.ShieldDisplay = React.createClass({
	getDefaultProps: function() {
		return { width: 0, height: 0, x: 0, y: 0, cellsTall: 25, cellsWide: 18, colors: ['#cc0000', '#ff9900', '#cccc00', '#00cc00', '#0099ff', '#9900ff'] };
	},
	componentDidMount: function () {
		var startX = Math.floor(this.props.cellsWide / 2), startY = Math.floor(this.props.cellsTall / 2);
		this.cellWidth = this.props.width / this.props.cellsWide; this.cellHeight = this.props.height / this.props.cellsTall;
		this.cursor = new ShieldCursor(startX, startY);
		this.data = new ShieldData(this.props.cellsWide, this.props.cellsTall);
		
		this.readProps(this.props);

		for (var i=0; i<6; i++) {
			var row = [];
			for (var j=0; j<this.props.cellsWide; j++)
				row.push(Math.floor(Math.random() * this.props.colors.length));
			this.data.addRow(row);
		}
		
		requestAnimationFrame(this.draw);
		
		Hotkeys.register(this.props.right ? 'I' : 'W', this);
		Hotkeys.register(this.props.right ? 'K' : 'S', this);
		Hotkeys.register(this.props.right ? 'J' : 'A', this);
		Hotkeys.register(this.props.right ? 'L' : 'D', this);
		Hotkeys.register(this.props.right ? 'N' : ' ', this);
	},
	componentWillUnmount: function() {
		this.cursor = null;
		this.data = null;
		
		Hotkeys.unregister(this.props.right ? 'I' : 'W', this);
		Hotkeys.unregister(this.props.right ? 'K' : 'S', this);
		Hotkeys.unregister(this.props.right ? 'J' : 'A', this);
		Hotkeys.unregister(this.props.right ? 'L' : 'D', this);
		Hotkeys.unregister(this.props.right ? 'N' : ' ', this);
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

		ctx.fillStyle = '#000000';
		ctx.beginPath();
		ctx.rect(0, 0, this.props.width, this.props.height);
		ctx.fill();
		
		for (var y=0; y<this.props.cellsTall; y++) {
			var ypos = this.cellHeight * (this.props.cellsTall - y - 1);
			
			for (var x=0; x<this.props.cellsWide; x++) {
				var value = this.data.getValue(x, y);
				if (value === undefined)
					continue;
				
				ctx.fillStyle = this.props.colors[value];
				ctx.beginPath();
				ctx.rect(this.cellWidth * x, ypos, this.cellWidth, this.cellHeight);
				ctx.fill();
			}
		}
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
		this.cursor.y = Math.min(this.cursor.y + 1, this.props.cellsTall - 1);
	},
	moveDown: function() {
		this.cursor.y = Math.max(this.cursor.y - 1, 0);
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

function ShieldCursor(x, y) {
	this.x = x; this.y = y;
};

ShieldCursor.prototype.draw = function(ctx) {
	ctx.strokeStyle = '#FFFFFF';
	ctx.lineWidth = this.xscale * 0.15;
	ctx.beginPath();
	ctx.rect(this.x * this.xscale, (this.cellsTall - this.y - 1) * this.yscale, 2 * this.xscale, this.yscale);
	ctx.stroke();
};

function ShieldData(cols, rows) {
	this.cols = cols; this.rows = rows;
	this.data = Array(cols * rows);
	this.minMatchNum = 3;
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
	
	var combo = this.data[i1] != tmp ? this.checkGroup(i1) : 0;
	combo += this.checkGroup(i2);
	
	this.applyGravity(i1, i2);
	
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

ShieldData.prototype.addRow = function(row) {
	// remove the last row (we checked it wasn't full already, right?)	
	var i1 = this.index(0, this.rows - 1);
	this.data.splice(i1, this.cols);
	
	// add a row of new data
	for (var i=0; i<this.cols && i<row.length; i++)
		this.data.unshift(row[i]);
}

ShieldData.prototype.checkGroup = function(start) {
	var color = this.data[start];
	if (color == undefined)
		return 0;
	
	var matches = [];
	
	var queue = [start];
	do
	{
		var w = queue.pop(), e = w;
		do {
			w--;
		} while (w >= 0 && (w % this.cols) != this.cols - 1 && this.data[w] == color);
		
		do {
			e++;
		} while (e < this.data.length && (e % this.cols) != 0 && this.data[e] == color);
		
		for (var i=w+1; i<e; i++) {
			this.data[i] = undefined;
			matches.push(i);
			
			var n = i + this.cols;
			if (n < this.data.length && this.data[n] == color)
				queue.push(n);
			
			var s = i - this.cols;
			if (s >= 0 && this.data[s] == color)
				queue.push(s);
		}
	} while (queue.length > 0);
	
	if (matches.length >= this.minMatchNum)
		return matches.length;
	
	// put things back to original color
	for (var i=0; i<matches.length; i++)
		this.data[matches[i]] = color;
	
	return 0;
}

ShieldData.prototype.applyGravity = function(skip1, skip2) {
	for (var i=this.cols; i<this.data.length; i++) {
		if (i == skip1 || i == skip2)
			continue;
		
		var below = i - this.cols;
		if (this.data[below] === undefined) {
			this.data[below] = this.data[i];
			this.data[i] = undefined;
		}
	}
}