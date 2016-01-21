window.PowerManagement = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Power", width: 0, height: 0 };
	},
	getInitialState: function () {
		return { };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		var distribSize = Math.min(this.props.width * 0.8, this.props.height);
		var cardWidth = this.props.width - distribSize;
		
		var distribution = this.props.visible ? <PowerDistribution ref="distribution" width={distribSize} height={distribSize} visibility={this} /> : null;
		var cards = this.props.visible ? <PowerCards ref="cards" width={cardWidth} height={this.props.height} /> : null;
		
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				{distribution}
				{cards}
			</system>
		);
	}
});

window.PowerDistribution = React.createClass({
	getDefaultProps: function() {
		return { width: 0, height: 0 };
	},
	getInitialState: function () {
		return { };
	},
	componentDidMount: function () {
		this.createItems();
		this.calculateRoutes();
		this.allocatePower();
		requestAnimationFrame(this.draw);
	},
	componentWillUnmount: function() {
		for (var i=0; i<this.nodes.length; i++)
			this.nodes[i].unlink();
		this.node = []; this.items = [];
	},
	componentDidUpdate: function (prevProps, prevState) {
		if (prevProps.width != this.props.width || prevProps.height != this.props.height)
			this.createItems();
		
		requestAnimationFrame(this.draw);
	},
	render: function() {
		return (
			<Canvas ref="canvas" width={this.props.width} height={this.props.height} minSwipeDist="10" maxTapDist="10" onSwipe={this.swiped} onTap={this.tapped} onMouseDown={this.clicked} />
		);
	},
	tapped: function (x, y) {
		this.clearSelection();
	},
	swiped: function(dir, x, y) {
		if (dir == TouchFunctions.SwipeDir.Up)
			this.tryChangeNode(x, y, true, true);
		else if (dir == TouchFunctions.SwipeDir.Down)
			this.tryChangeNode(x, y, false, true);
		else
			this.clearSelection();
		
	},
	clicked: function(btn, x, y) {
		this.tryChangeNode(x, y, btn == 1, false);
	},
	clearSelection: function() {
		if (this.selectedNode != null) {
			this.selectedNode.selected = false;
			this.selectedNode = null;
		}
		requestAnimationFrame(this.draw);
	},
	tryChangeNode: function(x, y, increase, swiped) {
		for (var i=0; i<this.nodes.length; i++) {
			var bounds = this.nodes[i].getBounds(swiped);
			if (x >= bounds.x && x <= bounds.x + bounds.width
			 && y >= bounds.y && y <= bounds.y + bounds.height) {
				this.changeNode(this.nodes[i], increase);
				return;
			}
		}
		
		this.clearSelection();
	},
	changeNode: function(node, increase) {
		this.clearSelection();
	
		node.selected = true;
		this.selectedNode = node;
		
		if (increase) {
			if (this.centerNode.value == 0)
				return;
			this.selectedNode.value ++;
			this.centerNode.value --;
		}
		else if (this.selectedNode.value > 0) {
			this.selectedNode.value --;
			this.centerNode.value ++;
		}
		else
			return;
		this.allocatePower();
	},
	nodes: [],
	createItems: function() {
		for (var i=0; i<this.nodes.length; i++)
			this.nodes[i].unlink();

		var component = this;
		this.selectedNode = null;
		this.items = []; this.nodes = [];
		
		var cx = this.props.width / 2, cy = this.props.height / 2;
		var size = Math.min(this.props.width, this.props.height);
		
		var r1 = size * 0.28, r2 = size * 0.38, r3 = size * 0.48;
		
		this.items.push(new PowerWireStraight(cx, cy, cx + r1, cy, size * 0.01));
		this.items.push(new PowerWireStraight(cx, cy, cx - r1, cy, size * 0.01));
		this.items.push(new PowerWireStraight(cx, cy, cx, cy + r1, size * 0.01));
		this.items.push(new PowerWireStraight(cx, cy, cx, cy - r1, size * 0.01));
		
		for (var angle = Math.PI / 4; angle < Math.PI * 2; angle += Math.PI / 2)
			this.items.push(new PowerWireStraight(
				cx + Math.cos(angle) * r1,
				cy + Math.sin(angle) * r1,
				cx + Math.cos(angle) * r2,
				cy + Math.sin(angle) * r2,
			size * 0.01));
			
		for (var angle = Math.PI / 8; angle < Math.PI * 2; angle += Math.PI / 4)
			this.items.push(new PowerWireStraight(
				cx + Math.cos(angle) * r2,
				cy + Math.sin(angle) * r2,
				cx + Math.cos(angle) * r3,
				cy + Math.sin(angle) * r3,
			size * 0.01));
		
		for (var angle = 0; angle < 2; angle += 0.25)
			this.items.push(new PowerWireCurved(cx, cy, r1, Math.PI * angle, Math.PI * (angle + 0.25), size * 0.01));
		
		for (var angle = 0; angle < 2; angle += 0.125)
			this.items.push(new PowerWireCurved(cx, cy, r2, Math.PI * angle, Math.PI * (angle + 0.125), size * 0.01));
		
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 0.875, Math.PI * 0.125, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 0.125, Math.PI * 0.25, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 0.25, Math.PI * 0.375, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 0.375, Math.PI * 0.625, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 0.625, Math.PI * 0.75, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 0.75, Math.PI * 0.875, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 0.875, Math.PI * 1.125, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 1.125, Math.PI * 1.25, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 1.25, Math.PI * 1.375, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 1.375, Math.PI * 1.625, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 1.625, Math.PI * 1.75, size * 0.01));
		this.items.push(new PowerWireCurved(cx, cy, r3, Math.PI * 1.75, Math.PI * 0.875, size * 0.01));
		
		var node = new PowerNode(this, cx + r2, cy, size * 0.072, 'D');
		this.items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx - r2, cy, size * 0.072, 'A');
		this.items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx, cy + r2, size * 0.072, 'X');
		this.items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx, cy - r2, size * 0.072, 'W');
		this.items.push(node); this.nodes.push(node);
		
		var offset = Math.cos(Math.PI / 4) * r3;
		node = new PowerNode(this, cx + offset, cy + offset, size * 0.072, 'C');
		this.items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx + offset, cy - offset, size * 0.072, 'E');
		this.items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx - offset, cy + offset, size * 0.072, 'Z');
		this.items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx - offset, cy - offset, size * 0.072, 'Q');
		this.items.push(node); this.nodes.push(node);
		
		this.centerNode = new PowerNode(this, cx, cy, size * 0.18, null, true);
		this.items.push(this.centerNode);
		
		this.linkItems(60, 0); this.linkItems(60, 1); this.linkItems(6, 2); this.linkItems(60, 3);
		this.linkItems(0, 16); this.linkItems(0, 23); this.linkItems(1, 19); this.linkItems(1, 20);
		this.linkItems(2, 17); this.linkItems(2, 18); this.linkItems(3, 21); this.linkItems(3, 22);
		
		this.linkItems(16, 17); this.linkItems(16, 23); this.linkItems(16, 4); this.linkItems(17, 18);
		this.linkItems(17, 4); this.linkItems(18, 19); this.linkItems(18, 5); this.linkItems(19, 20);
		this.linkItems(19, 5); this.linkItems(20, 21); this.linkItems(20, 6); this.linkItems(21, 22);
		this.linkItems(21, 6); this.linkItems(22, 23); this.linkItems(22, 7); this.linkItems(23, 7);
		
		this.linkItems(4, 25); this.linkItems(4, 26); this.linkItems(5, 29); this.linkItems(5, 30);
		this.linkItems(6, 33); this.linkItems(6, 34); this.linkItems(7, 37); this.linkItems(7, 38);
		
		this.linkItems(24, 52); this.linkItems(24, 8); this.linkItems(24, 25); this.linkItems(25, 8);
		this.linkItems(25, 26); this.linkItems(26, 9); this.linkItems(26, 27); this.linkItems(27, 9);
		this.linkItems(27, 54); this.linkItems(28, 10); this.linkItems(28, 29); this.linkItems(29, 10);
		this.linkItems(29, 30); this.linkItems(30, 11); this.linkItems(30, 31); this.linkItems(31, 11);
		this.linkItems(31, 53); this.linkItems(32, 53); this.linkItems(32, 12); this.linkItems(32, 33);
		this.linkItems(33, 12); this.linkItems(33, 34); this.linkItems(34, 13); this.linkItems(34, 35);
		this.linkItems(35, 13); this.linkItems(35, 55); this.linkItems(36, 55); this.linkItems(36, 14);
		this.linkItems(36, 37); this.linkItems(37, 14); this.linkItems(37, 38); this.linkItems(38, 15);
		this.linkItems(38, 39); this.linkItems(39, 15); this.linkItems(39, 52);
		
		this.linkItems(8, 40); this.linkItems(8, 41); this.linkItems(9, 42); this.linkItems(9, 43);
		this.linkItems(10, 43); this.linkItems(10, 44); this.linkItems(11, 45); this.linkItems(11, 46);
		this.linkItems(12, 46); this.linkItems(12, 47); this.linkItems(13, 48); this.linkItems(13, 49);
		this.linkItems(14, 49); this.linkItems(14, 50); this.linkItems(15, 51); this.linkItems(15, 40);
		
		this.linkItems(40, 51); this.linkItems(40, 41); this.linkItems(41, 56); this.linkItems(42, 56);
		this.linkItems(42, 43); this.linkItems(43, 44); this.linkItems(44, 58); this.linkItems(45, 58);
		this.linkItems(45, 46); this.linkItems(46, 47); this.linkItems(47, 59); this.linkItems(48, 59);
		this.linkItems(48, 49); this.linkItems(49, 50); this.linkItems(50, 57); this.linkItems(51, 57);
	},
	linkItems: function(a, b) {
		var itemA = this.items[a], itemB = this.items[b];
		itemA.links.push(itemB);
		itemB.links.push(itemA);
	},
	draw: function() {
		var ctx = this.refs.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.props.width, this.props.height);
		
		for (var i=0; i<this.items.length; i++)
			this.items[i].draw(ctx);
	},
	isVisible: function() { return this.props.visibility.props.visible; },
	calculateRoutes: function() {
		// Based on Dijkstra's algorithm, calculate every route from the center node to each other node. Each route should store a list of the "node" objects it comprises.
	},
	allocatePower: function() {
		// set the "load" of every wire to 0
		for (var i=0; i<this.items.length; i++)
			this.items[i].load = 0;
		
		/*
		For each unit of power allocated to any node,
		Sort all the routes to that node only - excluding those that use unpassable wires
		for the "shortest" route to that node, increase the load on each wire of that route by 1.
		*/
	},
	wireChanged: function(wireNum, broken) {
		this.items[wireNum].broken = broken;
		this.allocatePower();
	}
});
				
window.PowerCards = React.createClass({
	render: function() {
		return (
			<div style={{position: 'absolute', right: '0', top: '0', bottom: '0', width: this.props.width}} />
		);
	}
});

function PowerWire() {
	this.load = 0;
	this.broken = false;
	this.links = [];
}

PowerWire.prototype.getColor = function() {
	switch(this.load) {
	case 0:  return '#00CC00';
	case 1:  return '#29D100';
	case 2:  return '#55D600';
	case 3:  return '#83DB00';
	case 4:  return '#B3E000';
	case 5:  return '#E5E500';
	case 6:  return '#EABB00';
	case 7:  return '#EF8F00';
	case 8:  return '#F46100';
	case 9:  return '#F93100';
	default: return '#FF0000';
	}
};

function PowerWireCurved(x, y, r, startA, endA, width) {
	this.x = x; this.y = y; this.r = r; this.startA = startA; this.endA = endA; this.width = width; 
	PowerWire.call(this);
};

PowerWireCurved.prototype = Object.create(PowerWire.prototype);
PowerWireCurved.constructor = PowerWireCurved;

PowerWireCurved.prototype.draw = function(ctx) {
	ctx.strokeStyle = this.getColor();
	ctx.lineWidth = this.width;
	
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, this.startA, this.endA);
	ctx.stroke();	
};

function PowerWireStraight(x1, y1, x2, y2, width) {
	this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2; this.width = width; 
	PowerWire.call(this);
};

PowerWireStraight.prototype = Object.create(PowerWire.prototype);
PowerWireStraight.constructor = PowerWireStraight;

PowerWireStraight.prototype.draw = function(ctx) {
	ctx.strokeStyle = this.getColor();
	ctx.lineWidth = this.width;
	
	ctx.beginPath();
	ctx.moveTo(this.x1, this.y1);
	ctx.lineTo(this.x2, this.y2);
	ctx.stroke();	
};

function PowerNode(component, x, y, r, hotkey, central) {
	this.component = component; this.hotkey = hotkey; this.central = central;
	this.x = x; this.y = y; this.r = r;
	this.value = central === true ? 5 : 1; this.selected = false;
	
	if (this.hotkey != null)
		Hotkeys.register(this.hotkey, this);
	
	PowerWire.call(this);
};

PowerNode.prototype = Object.create(PowerWire.prototype);
PowerNode.constructor = PowerNode;

PowerNode.prototype.draw = function(ctx) {
	ctx.fillStyle = this.central ? '#FFCCCC' : '#0099FF';
	
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
	ctx.fill();
	
	if (this.selected)
	{
		ctx.strokeStyle = '#CCCCFF';
		ctx.stroke();
	}
	
	var size = this.central ? this.r : this.r * 1.65;
	ctx.font = size + 'px Arial';
	ctx.fillStyle = this.value > 0 ? 'black' : 'red';
	ctx.textAlign = 'center';
	ctx.textBaseline = "middle";
	ctx.fillText(this.value, this.x, this.y);
}

PowerNode.prototype.getBounds = function(touch) {
	return touch ?
		{x: this.x - this.r * 2, y: this.y - this.r * 2, width: this.r * 4, height: this.r * 4}
	  : {x: this.x - this.r, y: this.y - this.r, width: this.r * 2, height: this.r * 2};
};

PowerNode.prototype.isVisible = function() { return this.component.isVisible(); }

PowerNode.prototype.keyDown = function(e) { this.component.changeNode(this, !e.shiftKey); }

PowerNode.prototype.unlink = function() {
	if (this.hotkey != null)
		Hotkeys.unregister(this.hotkey, this);
}