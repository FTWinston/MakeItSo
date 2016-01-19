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
		
		var distribution = this.props.visible ? <PowerDistribution ref="distribution" width={distribSize} height={distribSize} /> : null;
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
		requestAnimationFrame(this.refs.canvas.draw);
	},
	componentDidUpdate: function (prevProps, prevState) {
		if (prevProps.width != this.props.width || prevProps.height != this.props.height)
			this.createItems();
		
		requestAnimationFrame(this.refs.canvas.draw);
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
		var rect = this.refs.canvas.getBoundingClientRect();
		
		if (dir == TouchFunctions.SwipeDir.Up)
			this.tryChangeNode(x - rect.left, y - rect.top, true, true);
		else if (dir == TouchFunctions.SwipeDir.Down)
			this.tryChangeNode(x - rect.left, y - rect.top, false, true);
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
		requestAnimationFrame(this.refs.canvas.draw);
	},
	tryChangeNode: function(x, y, increase, swiped) {
		for (var i=0; i<this.nodes.length; i++) {
			var node = swiped ? this.nodes[i].touchbounds : this.nodes[i].bounds;
			if (x >= node.x && x <= node.x + node.width && y >= node.y && y <= node.y + node.height) {
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
	},
	nodes: [],
	createItems: function() {
		for (var i=0; i<this.nodes.length; i++)
			this.nodes[i].dispose();

		var component = this;
		this.selectedNode = null;
		var items = []; this.nodes = [];
		this.refs.canvas.clearItems();
		
		var cx = this.props.width / 2, cy = this.props.height / 2;
		var size = Math.min(this.props.width, this.props.height);
		
		var r1 = size * 0.28, r2 = size * 0.38, r3 = size * 0.48;
		
		items.push(new PowerWireStraight(cx, cy, cx + r1, cy, 1, size * 0.01));
		items.push(new PowerWireStraight(cx, cy, cx - r1, cy, 1, size * 0.01));
		items.push(new PowerWireStraight(cx, cy, cx, cy + r1, 1, size * 0.01));
		items.push(new PowerWireStraight(cx, cy, cx, cy - r1, 1, size * 0.01));
		
		for (var angle = Math.PI / 4; angle < Math.PI * 2; angle += Math.PI / 2)
			items.push(new PowerWireStraight(
				cx + Math.cos(angle) * r1,
				cy + Math.sin(angle) * r1,
				cx + Math.cos(angle) * r2,
				cy + Math.sin(angle) * r2,
			1, size * 0.01));
			
		for (var angle = Math.PI / 8; angle < Math.PI * 2; angle += Math.PI / 4)
			items.push(new PowerWireStraight(
				cx + Math.cos(angle) * r2,
				cy + Math.sin(angle) * r2,
				cx + Math.cos(angle) * r3,
				cy + Math.sin(angle) * r3,
			1, size * 0.01));
		
		var radii = [r1, r2, r3];
		
		for (var i=0; i<3; i++) {
			var r = radii[i];
		
			items.push(new PowerWireCurved(cx, cy, r, 0, Math.PI * 0.25, 1, size * 0.01));
			items.push(new PowerWireCurved(cx, cy, r, Math.PI * 0.25, Math.PI * 0.5, 1, size * 0.01));
			items.push(new PowerWireCurved(cx, cy, r, Math.PI * 0.5, Math.PI * 0.75, 1, size * 0.01));
			items.push(new PowerWireCurved(cx, cy, r, Math.PI * 0.75, Math.PI * 1, 1, size * 0.01));
			
			items.push(new PowerWireCurved(cx, cy, r, Math.PI * 1, Math.PI * 1.25, 1, size * 0.01));
			items.push(new PowerWireCurved(cx, cy, r, Math.PI * 1.25, Math.PI * 1.5, 1, size * 0.01));
			items.push(new PowerWireCurved(cx, cy, r, Math.PI * 1.5, Math.PI * 1.75, 1, size * 0.01));
			items.push(new PowerWireCurved(cx, cy, r, Math.PI * 1.75, Math.PI * 2, 1, size * 0.01));
		}
		
		var node = new PowerNode(this, cx + r2, cy, size * 0.072, 'D');
		items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx - r2, cy, size * 0.072, 'A');
		items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx, cy + r2, size * 0.072, 'X');
		items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx, cy - r2, size * 0.072, 'W');
		items.push(node); this.nodes.push(node);
		
		var offset = Math.cos(Math.PI / 4) * r3;
		node = new PowerNode(this, cx + offset, cy + offset, size * 0.072, 'C');
		items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx + offset, cy - offset, size * 0.072, 'E');
		items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx - offset, cy + offset, size * 0.072, 'Z');
		items.push(node); this.nodes.push(node);
		
		node = new PowerNode(this, cx - offset, cy - offset, size * 0.072, 'Q');
		items.push(node); this.nodes.push(node);
		
		this.centerNode = new PowerNodeCentral(cx, cy, size * 0.18);
		items.push(this.centerNode);
		
		this.refs.canvas.addItems(items);
	}
});
				
window.PowerCards = React.createClass({
	render: function() {
		return (
			<div style={{backgroundColor: 'red', position: 'absolute', right: '0', top: '0', bottom: '0', width: this.props.width}} />
		);
	}
});

function PowerWireCurved(x, y, r, startA, endA, value, width) {
	this.x = x; this.y = y; this.r = r; this.startA = startA; this.endA = endA; this.value = value; this.width = width;
	this.draw = function(ctx) {
		ctx.strokeStyle = '#00CC00';
		ctx.lineWidth = this.width;
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, this.startA, this.endA);
		ctx.stroke();	
	}
};

function PowerWireStraight(x1, y1, x2, y2, value, width) {
	this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2; this.value = value; this.width = width;
	this.draw = function(ctx) {
		ctx.strokeStyle = '#00CC00';
		ctx.lineWidth = this.width;
		
		ctx.beginPath();
		ctx.moveTo(this.x1, this.y1);
		ctx.lineTo(this.x2, this.y2);
		ctx.stroke();	
	}
};

function PowerNode(component, x, y, r, hotkey) {
	this.component = component; this.hotkey = hotkey;
	this.x = x; this.y = y; this.r = r;
	this.bounds = {x: x - r, y: y - r, width: r * 2, height: r * 2};
	this.touchbounds = {x: x - r * 2, y: y - r * 2, width: r * 4, height: r * 4};
	this.value = 1; this.selected = false;
	this.draw = function(ctx) {
		ctx.fillStyle = '#0099FF';
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
		
		if (this.selected)
		{
			ctx.strokeStyle = '#CCCCFF';
			ctx.stroke();
		}
		
		ctx.font = this.r * 1.65 + 'px Arial';
		ctx.fillStyle = this.value > 0 ? 'black' : 'red';
		ctx.textAlign = 'center';
		ctx.textBaseline = "middle";
		ctx.fillText(this.value, this.x, this.y);
	}
	this.isVisible = function() { return true; }
	this.mouseDown = function(e) { this.component.changeNode(this, !e.shiftKey); }
	this.dispose = function() { Hotkeys.unregister(this.hotkey, this); }
	Hotkeys.register(this.hotkey, this);
};

function PowerNodeCentral(x, y, r) {
	this.x = x; this.y = y; this.r = r;
	this.value = 5;
	this.draw = function(ctx) {
		ctx.fillStyle = '#FFCCCC';
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
		
		ctx.font = this.r + 'px Arial';
		ctx.fillStyle = this.value > 0 ? 'black' : 'red';
		ctx.textAlign = 'center';
		ctx.textBaseline = "middle";
		ctx.fillText(this.value, this.x, this.y);
	}
};