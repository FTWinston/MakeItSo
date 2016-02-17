window.Weapons = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null };
	},
	getInitialState: function() {
		return { target: null };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		var selectWidth = this.props.width * 0.6;
		var infoWidth = this.props.width - selectWidth;
		
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				<WeaponTargetSelect ref="select" width={selectWidth} height={this.props.height} visible={this} targetSelected={this.targetSelected} />
				<WeaponTargetInfo ref="target" width={infoWidth} height={this.props.height} visible={this} target={this.state.target} />
			</system>
		);
	},
	receiveMessage: function(msg, data) {
		if (msg == 'clr') {
			this.refs.select.clearAllTargets();
			this.setState({target: null});
			this.refs.target.redraw();
			return true;
		}
		
		var params = data.split(' ');
		switch (msg) {
			case 'add':
				var size = parseInt(params[1]), status = parseInt(params[2]);
				var angle = parseInt(params[3]), dist = parseInt(params[4]);
				if (isNaN(size) || isNaN(status) || isNaN(angle) || isNaN(dist)) {
					console.error('Parameter was not numeric');
					return false;
				}
				return this.refs.select.addTarget(params[0], size, status, angle, dist);
			case 'rem':
				return this.refs.select.removeTarget(params[0]);
			case 'mov':
				var angle = parseInt(params[1]), dist = parseInt(params[2]);
				if (isNaN(angle) || isNaN(dist)) {
					console.error('Parameter was not numeric');
					return false;
				}
				return this.refs.select.moveTarget(params[0], angle, dist);
			case 'upd':
				var status = parseInt(params[1]);
				if (isNaN(status)) {
					console.error('Parameter was not numeric');
					return false;
				}
				return this.refs.select.changeTarget(params[0], status);
			default:
				return false;
		}
	},
	targetSelected: function(target) {
		this.setState({target: target});
		this.refs.target.redraw();
	}
});

window.WeaponTargetSelect = React.createClass({
	getInitialState: function () {
		return { targets: {} };
	},
	mixins: [CanvasComponentMixin],
	onTap: function (x, y) {
		this._trySelectTarget(x, y, true);
	},
	onMouseDown: function(btn, x, y) {
		if (btn != 1)
			return;
		
		this._trySelectTarget(x, y, false);
	},
	draw: function(time) {
		if (!this.props.visible)
			return;
		var ctx = this.refs.canvas.getContext('2d');
		this.drawBackground(ctx);
		
		var minSize = Math.min(this.props.width, this.props.height) * 0.025;
		
		for (var target in this.state.targets)
			this.state.targets[target].draw(ctx, time, this.props.width, this.props.height, minSize);
		
		if (this.animateEndTime !== undefined)
			if (this.animateEndTime <= time)
				this.animateEndTime = undefined;
			else
				this.redraw();
	},
	drawBackground: function(ctx) {
		ctx.fillStyle = '#000000';
		ctx.beginPath();
		ctx.rect(0, 0, this.props.width, this.props.height);
		ctx.fill();
		
		// draw firing arc indicators
		var shipX = this.props.width / 2, shipY = this.props.height * 0.67;
		ctx.lineWidth = 1;
		this.drawFiringArc(ctx, '#990000', shipX, shipY, 0, 0.57735026919); // tan 30, for 120 degree arc
		this.drawFiringArc(ctx, '#996600', shipX, shipY, 0, 1); // tan 45, for 90 degree arc
		this.drawFiringArc(ctx, '#009900', shipX, shipY, 0, 1.73205080757); // tan 60, for 60 degree arc
		
		this.drawFiringArc(ctx, '#990000', shipX, shipY, this.props.height, 1.73205080757); // tan 60, for 60 degree arc
		
		// draw ship indicator
		var shipRadius = Math.min(this.props.width * 0.025, this.props.height * 0.025);
		ctx.fillStyle = '#cccccc';
		ctx.beginPath();
		ctx.arc(shipX, shipY, shipRadius, 0, Math.PI * 2);
		ctx.fill();
	},
	drawFiringArc: function(ctx, color, shipX, shipY, endY, tanAngle) {
		ctx.strokeStyle = color;
		var dx = Math.abs(shipY - endY) / tanAngle;
		
		ctx.beginPath();
		ctx.moveTo(shipX - dx, endY);
		ctx.lineTo(shipX, shipY);
		ctx.lineTo(shipX + dx, endY);
		ctx.stroke();
	},
	addTarget: function(id, size, status, angle, dist) {
		if (size < 1 || size > 10) {
			console.error('invalid size');
			return false;
		}
		else if (status < 1 || status > WeaponTarget.prototype.StatusType.Unknown) {
			console.error('invalid status');
			return false;
		}
		else if (angle < 0 || angle >= 360) {
			console.error('invalid angle');
			return false;
		}
		else if (dist < 1 || dist > 100) {
			console.error('invalid dist');
			return false;
		}
		
		var target = new WeaponTarget(id, size, status, angle, dist)

		this.setState(function(previousState, currentProps) {
			var targets = previousState.targets;
			targets[id] = target;
			return {targets: targets};
		});
		
		this.redraw();
		return true;
	},
	removeTarget: function(id) {
		this.setState(function(previousState, currentProps) {
			var targets = previousState.targets;
			delete targets[id];
			return {targets: targets};
		});
		
		this.redraw();
		return true;
	},
	moveTarget: function(id, angle, dist) {
		if (angle < 0 || angle >= 360) {
			console.error('invalid angle');
			return false;
		}
		else if (dist < 1 || dist > 100) {
			console.error('invalid dist');
			return false;
		}
		
		var target = this.state.targets[id];
		if (target === undefined) {
			console.error('invalid target');
			return false;
		}
		
		target.updatePosition(angle, dist);
		this.animateEndTime = performance.now() + WeaponTarget.lerpDuration;
		
		this.setState(function(previousState, currentProps) {
			var targets = previousState.targets;
			targets[id] = target;
			return {targets: targets};
		});
		
		this.redraw();
		return true;
	},
	changeTarget: function(id, status) {
		if (status < 1 || status > WeaponTarget.prototype.StatusType.Unknown) {
			console.error('invalid status');
			return false;
		}
		
		var target = this.state.targets[id];
		if (target === undefined) {
			console.error('invalid target');
			return false;
		}
		
		target.status = status;
		
		this.setState(function(previousState, currentProps) {
			var targets = previousState.targets;
			targets[id] = target;
			return {targets: targets};
		});
		
		this.redraw();
		return true;
	},
	clearAllTargets: function() {
		this.setState({targets: {}});
		this.redraw();
	},
	_trySelectTarget: function(x,y, padRadius) {
		var selected = null;
		
		for (var id in this.state.targets) {
			var target = this.state.targets[id];
			target.selected = false;
			
			if (selected == null && target.intersects(x, y, false))
				selected = target;
		}
			
		if (selected == null && padRadius) {
			for (var id in this.state.targets) {
				var target = this.state.targets[id];
				if (target.intersects(x, y, true)) {
					selected = target;
					break;
				}			
			}
		}
		
		if (selected != null)
			selected.selected = true;
		
		this.redraw();
		this.props.targetSelected(selected);
	}
});

function WeaponTarget(id, size, status, angle, dist) {
	this.id = id;
	this.size = size;
	this.status = status;
	this.updatePosition(angle, dist);
	this.selected = false;
}

WeaponTarget.prototype = {
    constructor: WeaponTarget,
    updatePosition: function(angle, dist) {
		angle = angle * Math.PI / 180; // 0 - 2pi
		dist = dist / 100; // 0 - 1
		
		var x = 0.5 + 0.5 * dist * Math.cos(angle);
		var y = 0.5 + 0.5 * dist * Math.sin(angle);
		
		if (this.x === undefined) {
			this.x = x;
			this.y = y;
			return;
		}
		
		this.fromX = this.x;
		this.fromY = this.y;
		
		this.nextX = x;
		this.nextY = y;
		this.lerpEndTime = performance.now() + WeaponTarget.lerpDuration;
	},
	StatusType: {
		Friendly: 1,
		Hostile: 2,
		Unknown: 3
	},
	lerpDuration: 1000,
	
	draw: function(ctx, time, panelWidth, panelHeight, minSize) {
		if (this.status == this.StatusType.Friendly)
			ctx.fillStyle = '#00cc00';
		else if (this.status == this.StatusType.Hostile)
			ctx.fillStyle = '#cc0000';
		else
			ctx.fillStyle = '#cccc00';
		
		// lerp these variables if lerpEndTime is set
		if (this.lerpEndTime !== undefined) {
			if (this.lerpEndTime <= time) {
				this.lerpEndTime = undefined;
				
				this.x = this.nextX;
				this.y = this.nextY;
				this.nextX = undefined;
				this.nextY = undefined;
			}
			else {
				var fraction = 1 - (this.lerpEndTime - time) / WeaponTarget.lerpDuration;
				this.x = this.fromX + (this.nextX - this.fromX) * fraction;
				this.y = this.fromY + (this.nextY - this.fromY) * fraction;
			}
		}
		
		this.renderX = this.x * panelWidth;
		this.renderY = this.y * panelHeight;
		
		this.radius = minSize * (this.size * 0.1 + 1);
		
		ctx.beginPath();
		ctx.arc(this.renderX, this.renderY, this.radius, 0, Math.PI * 2);
		ctx.fill();
		
		if (this.selected) {
			ctx.strokeStyle = '#ff0000';
			ctx.lineWidth = minSize * 0.25;
			ctx.beginPath();
			ctx.arc(this.renderX, this.renderY, this.radius, 0, Math.PI * 2);
			ctx.stroke();
		}
	},
	intersects: function(x, y, padRadius) {
		var r = padRadius ? this.radius * 1.75 : this.radius;
		return x >= this.renderX - r && x <= this.renderX + r
			&& y >= this.renderY - r && y <= this.renderY + r;
	}
};

window.WeaponTargetInfo = React.createClass({
	mixins: [CanvasComponentMixin],
	getDefaultProps: function() {
		return {target: null};
	},
	onTap: function (x, y) {
		;
	},
	onMouseDown: function(btn, x, y) {
		if (btn != 1)
			return;
	},
	draw: function() {
		if (!this.props.visible)
			return;
		var ctx = this.refs.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.props.width, this.props.height);
		
		if (this.props.target != null)
			this.drawTarget(ctx);
	},
	drawTarget: function(ctx) {
		var numSegments = this.props.target.size, segmentSize = Math.PI * 2 / numSegments, startAngle = 0;
		var cx = this.props.width / 2, cy = this.props.height / 2
		var outerRadius = Math.min(cx, cy) * 0.99, innerRadius = outerRadius * 0.4;
		var colors = ['#ff0000', '#00ccff', '#00cc00', '#cccc00', '#cc00ff', '#ccff00', '#ff00cc', '#ffcccc', '#ccffcc', '#ccccff'];
		
		for (var i=0; i<numSegments; i++) {
			ctx.fillStyle = colors[i];
			ctx.beginPath();
			
			var endAngle = startAngle + segmentSize;
			ctx.arc(cx, cy, outerRadius, startAngle, endAngle);
			
			ctx.lineTo(
				cx + Math.cos(endAngle) * innerRadius,
				cy + Math.sin(endAngle) * innerRadius
			)
			
			ctx.arc(cx, cy, innerRadius, endAngle, startAngle, true);
			
			ctx.lineTo(
				cx + Math.cos(startAngle) * outerRadius,
				cy + Math.sin(startAngle) * outerRadius
			)
			
			ctx.fill();
			
			startAngle = endAngle;
		}
	}
});