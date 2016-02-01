window.Weapons = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		var selectWidth = this.props.width * 0.6;
		var infoWidth = this.props.width - selectWidth;
		
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				<WeaponTargetSelect ref="select" width={selectWidth} height={this.props.height} visible={this} targetSelected={this.targetSelected} />
				<WeaponTargetInfo ref="target" width={infoWidth} height={this.props.height} visible={this} />
			</system>
		);
	},
	receiveMessage: function(msg, data) {
		if (msg == 'clr') {
			this.refs.select.clearAllTargets();
			this.refs.target.setTarget(null);
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
		this.refs.target.setTarget(target);
	}
});

window.WeaponTargetSelect = React.createClass({
	getInitialState: function () {
		return { targets: {} };
	},
	mixins: [CanvasComponentMixin],
	onTap: function (x, y) {
		;
	},
	onMouseDown: function(btn, x, y) {
		if (btn != 1)
			return;
		
		this.props.targetSelected(targetObj); // TODO: construct proper object here
	},
	draw: function() {
		if (!this.props.visible)
			return;
		var ctx = this.refs.canvas.getContext('2d');
		this.drawBackground(ctx);
		
		var minSize = Math.min(this.props.width, this.props.height) * 0.025;
		
		for (var target in this.state.targets)
			this.state.targets[target].draw(ctx, this.props.width, this.props.height, minSize);
	},
	drawBackground: function(ctx) {
		ctx.fillStyle = '#000000';
		ctx.beginPath();
		ctx.rect(0, 0, this.props.width, this.props.height);
		ctx.fill();
		
		// draw firing arc indicators
		var shipX = this.props.width / 2, shipY = this.props.height * 0.67;
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
		
		target.setPosition(angle, dist);
		
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
	}
});

function WeaponTarget(id, size, status, angle, dist) {
	this.id = id;
	this.size = size;
	this.status = status;
	this.setPosition(angle, dist);
	this.selected = false;
}

WeaponTarget.prototype.setPosition = function(angle, dist) {
	this.angle = angle * Math.PI / 180; // 0 - 2pi
	this.distance = dist / 100; // 0 - 1
}

WeaponTarget.prototype.StatusType = {
	Friendly: 1,
	Hostile: 2,
	Unknown: 3
};

WeaponTarget.prototype.draw = function(ctx, panelWidth, panelHeight, minSize) {
	if (this.status == this.StatusType.Friendly)
		ctx.fillStyle = '#00cc00';
	else if (this.status == this.StatusType.Hostile)
		ctx.fillStyle = '#cc0000';
	else
		ctx.fillStyle = '#cccc00';
	
	var x = panelWidth / 2 + (panelWidth / 2) * this.distance * Math.cos(this.angle);
	var y = panelHeight / 2 + (panelHeight / 2) * this.distance * Math.sin(this.angle);
	var size = minSize * (this.size * 0.1 + 1);
	
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2);
	ctx.fill();
	
	if (this.selected) {
		ctx.strokeStyle = '#ff0000';
		ctx.lineWidth = minSize * 0.1;
		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.PI * 2);
		ctx.stroke();
	}
}

window.WeaponTargetInfo = React.createClass({
	mixins: [CanvasComponentMixin],
	onTap: function (x, y) {
		;
	},
	onMouseDown: function(btn, x, y) {
		if (btn != 1)
			return;
		;
	},
	draw: function() {
		if (!this.props.visible)
			return;
		var ctx = this.refs.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.props.width, this.props.height);
	},
	setTarget: function(target) {
		if (target == null)
			console.log('Target is null');
		else
			console.log('Target is not null');
	}
});