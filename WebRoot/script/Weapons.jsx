window.Weapons = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Weapons" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		var selectWidth = this.props.width * 0.6;
		var infoWidth = this.props.width - selectWidth;
		
		var targetSelect = this.props.visible ? <WeaponTargetSelect ref="select" width={selectWidth} height={this.props.height} visibility={this} /> : null;
		var targetInfo = this.props.visible ? <WeaponTargetInfo ref="info" width={infoWidth} height={this.props.height} /> : null;
		
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				{targetSelect}
				{targetInfo}
			</system>
		);
	}
});

window.WeaponTargetSelect = React.createClass({
	componentDidMount: function () {
		requestAnimationFrame(this.draw);
	},
	componentDidUpdate: function (prevProps, prevState) {
		if (prevProps.width != this.props.width || prevProps.height != this.props.height)
			requestAnimationFrame(this.draw);
	},
	render: function() {
		return (
			<Canvas ref="canvas" width={this.props.width} height={this.props.height} onTap={this._tapped} onMouseDown={this._clicked} />
		);
	},
	_tapped: function (x, y) {
		;
	},
	_clicked: function(btn, x, y) {
		if (btn != 1)
			return;
		;
	},
	draw: function() {
		var ctx = this.refs.canvas.getContext('2d');
		
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
	}
});

window.WeaponTargetInfo = React.createClass({
	componentDidMount: function () {
		requestAnimationFrame(this.draw);
	},
	componentDidUpdate: function (prevProps, prevState) {
		if (prevProps.width != this.props.width || prevProps.height != this.props.height)
			requestAnimationFrame(this.draw);
	},
	render: function() {
		return (
			<Canvas ref="canvas" width={this.props.width} height={this.props.height} onTap={this._tapped} onMouseDown={this._clicked} />
		);
	},
	_tapped: function (x, y) {
		;
	},
	_clicked: function(btn, x, y) {
		if (btn != 1)
			return;
		;
	},
	draw: function() {
		var ctx = this.refs.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.props.width, this.props.height);
	}
});