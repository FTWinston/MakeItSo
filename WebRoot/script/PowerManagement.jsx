window.PowerManagement = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Power" };
	},
	getInitialState: function () {
		return { width: 600, height: 400 };
	},
	mixins: [ShipSystemMixin],
	componentDidMount: function () {
		this.createItems();
		requestAnimationFrame(() => {this.update()});
	},
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				  <canvas ref="canvas" width={this.state.width} height={this.state.height} />
			</system>
		);
	},
	createItems: function() {
		var context = this.refs.canvas.getContext('2d');
		this.items = [];
		
		var cx = this.state.width / 2, cy = this.state.height / 2;
		var r1 = this.state.height * 0.28, r2 = this.state.height * 0.38, r3 = this.state.height * 0.48;
		
		this.items.push(new PowerWireStraight(context, cx, cy, cx + r1, cy, 1));
		this.items.push(new PowerWireStraight(context, cx, cy, cx - r1, cy, 1));
		this.items.push(new PowerWireStraight(context, cx, cy, cx, cy + r1, 1));
		this.items.push(new PowerWireStraight(context, cx, cy, cx, cy - r1, 1));
		
		for (var angle = Math.PI / 4; angle < Math.PI * 2; angle += Math.PI / 2)
			this.items.push(new PowerWireStraight(context,
				cx + Math.cos(angle) * r1,
				cy + Math.sin(angle) * r1,
				cx + Math.cos(angle) * r2,
				cy + Math.sin(angle) * r2,
			1));
			
		for (var angle = Math.PI / 8; angle < Math.PI * 2; angle += Math.PI / 4)
			this.items.push(new PowerWireStraight(context,
				cx + Math.cos(angle) * r2,
				cy + Math.sin(angle) * r2,
				cx + Math.cos(angle) * r3,
				cy + Math.sin(angle) * r3,
			1));
		
		var radii = [r1, r2, r3];
		
		for (var i=0; i<3; i++) {
			var r = radii[i];
		
			this.items.push(new PowerWireCurved(context, cx, cy, r, 0, Math.PI * 0.25, 1));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 0.25, Math.PI * 0.5, 1));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 0.5, Math.PI * 0.75, 1));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 0.75, Math.PI * 1, 1));
			
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 1, Math.PI * 1.25, 1));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 1.25, Math.PI * 1.5, 1));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 1.5, Math.PI * 1.75, 1));
			this.items.push(new PowerWireCurved(context, cx, cy, r, Math.PI * 1.75, Math.PI * 2, 1));
		}
		
		this.items.push(new PowerNode(context, cx + r2, cy));
		this.items.push(new PowerNode(context, cx - r2, cy));
		this.items.push(new PowerNode(context, cx, cy + r2));
		this.items.push(new PowerNode(context, cx, cy - r2));
		
		var offset = Math.cos(Math.PI / 4) * r3;
		this.items.push(new PowerNode(context, cx + offset, cy + offset));
		this.items.push(new PowerNode(context, cx + offset, cy - offset));
		this.items.push(new PowerNode(context, cx - offset, cy + offset));
		this.items.push(new PowerNode(context, cx - offset, cy - offset));
		
		this.items.push(new PowerNodeCentral(context, cx, cy));
	},
	update: function() {
		for (var i=0; i<this.items.length; i++)
			this.items[i].update();
		
		// requestAnimationFrame(() => {this.update()});
	}
});

function PowerWireCurved(context, x, y, r, startA, endA, value) {	
	this.context = context; this.x = x; this.y = y; this.r = r; this.startA = startA; this.endA = endA; this.value = value;
	this.update = function() {
		this.context.strokeStyle = "#00CC00";
		this.context.lineWidth = 5;
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.r, this.startA, this.endA);
		this.context.stroke();	
	}
};

function PowerWireStraight(context, x1, y1, x2, y2, value) {	
	this.context = context; this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2; this.value = value;
	this.update = function() {
		this.context.strokeStyle = "#00CC00";
		this.context.lineWidth = 5;
		
		this.context.beginPath();
		this.context.moveTo(this.x1, this.y1);
		this.context.lineTo(this.x2, this.y2);
		this.context.stroke();	
	}
};


function PowerNode(context, x, y) {	
	this.context = context; this.x = x; this.y = y;
	this.update = function() {
		this.context.fillStyle = "#0099FF";
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, 30, 0, Math.PI * 2);
		this.context.fill();	
	}
};

function PowerNodeCentral(context, x, y) {	
	this.context = context; this.x = x; this.y = y;
	this.update = function() {
		this.context.fillStyle = "#FFCCCC";
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, 70, 0, Math.PI * 2);
		this.context.fill();	
	}
};