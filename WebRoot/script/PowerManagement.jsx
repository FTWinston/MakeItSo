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
		var component = this;
		this.refs.canvas.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);
		this.refs.canvas.addEventListener('mousedown', function(e) {
			var rect = component.refs.canvas.getBoundingClientRect();
			component.clicked(e.which, e.clientX - rect.left, e.clientY - rect.top);
		});
		TouchFunctions.detectSwipe(this.refs.canvas, 10, undefined, this.swiped);
		TouchFunctions.detectTap(this.refs.canvas, 10, undefined, this.tapped);
		requestAnimationFrame(this.update);
	},
	componentWillUnmount: function() {
		cancelAnimationFrame(this.anim);
	},
	componentDidUpdate: function (prevProps, prevState) {
		if (prevProps.width != this.props.width || prevProps.height != this.props.height)
			this.createItems();
		
		requestAnimationFrame(this.update);
	},
	render: function() {
		return (
			<canvas ref="canvas" width={this.props.width} height={this.props.height} />
		);
	},
	tapped: function (x, y) {
		this.clearSelection();
		requestAnimationFrame(this.update);
	},
	swiped: function(dir, x, y) {
		var rect = this.refs.canvas.getBoundingClientRect();
		
		if (dir == TouchFunctions.SwipeDir.Up)
			this.changeNode(x - rect.left, y - rect.top, true, true);
		else if (dir == TouchFunctions.SwipeDir.Down)
			this.changeNode(x - rect.left, y - rect.top, false, true);
		else
			this.clearSelection();
		requestAnimationFrame(this.update);
	},
	clicked: function(btn, x, y) {
		this.changeNode(x, y, btn == 1, false);
		requestAnimationFrame(this.update);
	},
	clearSelection: function() {
		if (this.selectedNode != null) {
			this.selectedNode.selected = false;
			this.selectedNode = null;
		}
	},
	changeNode: function(x, y, increase, swiped) {
		this.clearSelection();
	
		for (var i=0; i<this.nodes.length; i++) {
			var node = swiped ? this.nodes[i].touchbounds : this.nodes[i].bounds;
			if (x >= node.x && x <= node.x + node.width && y >= node.y && y <= node.y + node.height) {
				this.selectedNode = this.nodes[i];
				this.selectedNode.selected = true;
				break;
			}
		}
		
		if (this.selectedNode == null)
			return;
		
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
	update: function() {
		for (var i=0; i<this.items.length; i++)
			this.items[i].update();
	},
	createItems: function() {
		this.selectedNode = null;
		var context = this.refs.canvas.getContext('2d');
		this.items = []; this.nodes = [];
		
		var cx = this.props.width / 2, cy = this.props.height / 2;
		var size = Math.min(this.props.width, this.props.height);
		
		var r1 = size * 0.28, r2 = size * 0.38, r3 = size * 0.48;
		
		this.items.push(new PowerWireStraight(context, cx, cy, cx + r1, cy, 1, size * 0.01));
		this.items.push(new PowerWireStraight(context, cx, cy, cx - r1, cy, 1, size * 0.01));
		this.items.push(new PowerWireStraight(context, cx, cy, cx, cy + r1, 1, size * 0.01));
		this.items.push(new PowerWireStraight(context, cx, cy, cx, cy - r1, 1, size * 0.01));
		
		for (var angle = Math.PI / 4; angle < Math.PI * 2; angle += Math.PI / 2)
			this.items.push(new PowerWireStraight(context,
				cx + Math.cos(angle) * r1,
				cy + Math.sin(angle) * r1,
				cx + Math.cos(angle) * r2,
				cy + Math.sin(angle) * r2,
			1, size * 0.01));
			
		for (var angle = Math.PI / 8; angle < Math.PI * 2; angle += Math.PI / 4)
			this.items.push(new PowerWireStraight(context,
				cx + Math.cos(angle) * r2,
				cy + Math.sin(angle) * r2,
				cx + Math.cos(angle) * r3,
				cy + Math.sin(angle) * r3,
			1, size * 0.01));
		
		var radii = [r1, r2, r3];
		
		for (var i=0; i<3; i++) {
			var r = radii[i];
		
			this.items.push(new PowerWireCurved(context, cx, cy, r, 0, Math.PI * 0.25, 1, size * 0.01));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 0.25, Math.PI * 0.5, 1, size * 0.01));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 0.5, Math.PI * 0.75, 1, size * 0.01));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 0.75, Math.PI * 1, 1, size * 0.01));
			
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 1, Math.PI * 1.25, 1, size * 0.01));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 1.25, Math.PI * 1.5, 1, size * 0.01));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 1.5, Math.PI * 1.75, 1, size * 0.01));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 1.75, Math.PI * 2, 1, size * 0.01));
		}
		
		var node = new PowerNode(context, cx + r2, cy, size * 0.072);
		this.items.push(node); this.nodes.push(node);
		node = new PowerNode(context, cx - r2, cy, size * 0.072);
		this.items.push(node); this.nodes.push(node);
		node = new PowerNode(context, cx, cy + r2, size * 0.072);
		this.items.push(node); this.nodes.push(node);
		node = new PowerNode(context, cx, cy - r2, size * 0.072);
		this.items.push(node); this.nodes.push(node);
		
		var offset = Math.cos(Math.PI / 4) * r3;
		node = new PowerNode(context, cx + offset, cy + offset, size * 0.072);
		this.items.push(node); this.nodes.push(node);
		node = new PowerNode(context, cx + offset, cy - offset, size * 0.072);
		this.items.push(node); this.nodes.push(node);
		node = new PowerNode(context, cx - offset, cy + offset, size * 0.072);
		this.items.push(node); this.nodes.push(node);
		node = new PowerNode(context, cx - offset, cy - offset, size * 0.072);
		this.items.push(node); this.nodes.push(node);
		
		this.centerNode = new PowerNodeCentral(context, cx, cy, size * 0.18);
		this.items.push(this.centerNode);
	}
});
				
window.PowerCards = React.createClass({
	render: function() {
		return (
			<div style={{backgroundColor: 'red', position: 'absolute', right: '0', top: '0', bottom: '0', width: this.props.width}} />
		);
	}
});

function PowerWireCurved(context, x, y, r, startA, endA, value, width) {
	this.context = context; this.x = x; this.y = y; this.r = r; this.startA = startA; this.endA = endA; this.value = value; this.width = width;
	this.update = function() {
		this.context.strokeStyle = '#00CC00';
		this.context.lineWidth = this.width;
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.r, this.startA, this.endA);
		this.context.stroke();	
	}
};

function PowerWireStraight(context, x1, y1, x2, y2, value, width) {
	this.context = context; this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2; this.value = value; this.width = width;
	this.update = function() {
		this.context.strokeStyle = '#00CC00';
		this.context.lineWidth = this.width;
		
		this.context.beginPath();
		this.context.moveTo(this.x1, this.y1);
		this.context.lineTo(this.x2, this.y2);
		this.context.stroke();	
	}
};

function PowerNode(context, x, y, r) {
	this.context = context; this.x = x; this.y = y; this.r = r;
	this.bounds = {x: x - r, y: y - r, width: r * 2, height: r * 2};
	this.touchbounds = {x: x - r * 2, y: y - r * 2, width: r * 4, height: r * 4};
	this.value = 1; this.selected = false;
	this.update = function() {
		this.context.fillStyle = '#0099FF';
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		this.context.fill();
		
		this.context.strokeStyle = this.selected ? '#CCCCFF' : '#0099FF';
		this.context.stroke();
		
		this.context.font = this.r * 1.65 + 'px Arial';
		this.context.fillStyle = this.value > 0 ? 'black' : 'red';
		this.context.textAlign = 'center';
		this.context.textBaseline = "middle";
		this.context.fillText(this.value, this.x, this.y);
	}
};

function PowerNodeCentral(context, x, y, r) {
	this.context = context; this.x = x; this.y = y; this.r = r;
	this.value = 5;
	this.update = function() {
		this.context.fillStyle = '#FFCCCC';
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		this.context.fill();
		
		this.context.font = this.r + 'px Arial';
		this.context.fillStyle = this.value > 0 ? 'black' : 'red';
		this.context.textAlign = 'center';
		this.context.textBaseline = "middle";
		this.context.fillText(this.value, this.x, this.y);
	}
};