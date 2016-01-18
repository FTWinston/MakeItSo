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
		
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				<PowerDistribution ref="distribution" width={distribSize} height={distribSize} visible={this.props.visible} />
				<PowerCards ref="cards" width={cardWidth} height={this.props.height} />
			</system>
		);
	}
});

window.PowerDistribution = React.createClass({
	getDefaultProps: function() {
		return { visible: false, width: 0, height: 0 };
	},
	getInitialState: function () {
		return { };
	},
	componentDidMount: function () {
		this.createItems();
		
		if (this.props.visible)
			requestAnimationFrame(() => {this.update()});
	},
	componentDidUpdate: function (prevProps, prevState) {
		if (prevProps.width != this.props.width || prevProps.height != this.props.height)
			this.createItems();
		
		if (this.props.visible)
			requestAnimationFrame(() => {this.update()});
	},
	render: function() {
		return (
			<canvas ref="canvas" width={this.props.width} height={this.props.height} />
		);
	},
	update: function() {
		for (var i=0; i<this.items.length; i++)
			this.items[i].update();
		
		if (this.props.visible)
			requestAnimationFrame(() => {this.update()});
	},
	createItems: function() {
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
		
		this.items.push(new PowerNodeCentral(context, cx, cy, size * 0.18));
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
		this.context.strokeStyle = "#00CC00";
		this.context.lineWidth = this.width;
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.r, this.startA, this.endA);
		this.context.stroke();	
	}
};

function PowerWireStraight(context, x1, y1, x2, y2, value, width) {
	this.context = context; this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2; this.value = value; this.width = width;
	this.update = function() {
		this.context.strokeStyle = "#00CC00";
		this.context.lineWidth = this.width;
		
		this.context.beginPath();
		this.context.moveTo(this.x1, this.y1);
		this.context.lineTo(this.x2, this.y2);
		this.context.stroke();	
	}
};


function PowerNode(context, x, y, r) {	
	this.context = context; this.x = x; this.y = y; this.r = r;
	this.bounds = {x: x - r, y: y - r, width: r + r, height: r + r};
	this.update = function() {
		this.context.fillStyle = "#0099FF";
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		this.context.fill();	
	}
};

function PowerNodeCentral(context, x, y, r) {	
	this.context = context; this.x = x; this.y = y; this.r = r;
	this.update = function() {
		this.context.fillStyle = "#FFCCCC";
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		this.context.fill();	
	}
};