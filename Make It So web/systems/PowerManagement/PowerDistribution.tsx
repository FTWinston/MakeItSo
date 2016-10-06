abstract class PowerWire implements ICanvasDrawable {
    constructor() {
        this.load = 0;
        this.broken = false;
        this.links = [];
    }

    load: number;
    broken: boolean;
    links: PowerWire[];
    bestLink: PowerWire;
    distanceTo: number;

    getColor = function() {
	    if (this.broken)
		    return '#666666';
	
	    switch(this.load) {
		    case 0: return '#00CC00';
		    case 1: return '#3CD300';
		    case 2: return '#7CDA00';
		    case 3: return '#C1E100';
		    case 4: return '#E9C700';
		    case 5: return '#F08900';
		    case 6: return '#F74600';
	        default: return '#FF0000';
	    }
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
}

class PowerWireCurved extends PowerWire {
    constructor(startA, endA) {
        super();
        this.startA = startA;
        this.endA = endA;
    }
    x: number;
    y: number;
    r: number;
    width: number;
    startA: number;
    endA: number;

    setSize(x, y, r, width) {
	    this.x = x; this.y = y; this.r = r; this.width = width;
    }

    draw(ctx) {
	    ctx.strokeStyle = this.getColor();
	    ctx.lineWidth = this.width;
	
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.r, this.startA, this.endA);
	    ctx.stroke();	
    }
}

class PowerWireStraight extends PowerWire {
    constructor() {
        super();
    }

    x1: number;
    y1: number;
    x2: number;
    y2: number;
    width: number;

    setSize(x1, y1, x2, y2, width) {
    	this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2; this.width = width;
    }

    draw(ctx) {
	    ctx.strokeStyle = this.getColor();
	    ctx.lineWidth = this.width;
	
	    ctx.beginPath();
	    ctx.moveTo(this.x1, this.y1);
	    ctx.lineTo(this.x2, this.y2);
	    ctx.stroke();	
    }
}

class PowerNode extends PowerWire {
    constructor(component, hotkey, central = false) {
        super();

	    this.component = component; this.hotkey = hotkey; this.central = central;
	    this.value = central === true ? 5 : 1; this.selected = false;
	
	    if (this.hotkey != null)
		    Hotkeys.register(this.hotkey, this);
    }

    value: number;
    component: any;
    hotkey: any;
    central: boolean;
    selected: boolean;

    x: number;
    y: number;
    r: number;

    setSize(x, y, r) {
	    this.x = x; this.y = y; this.r = r;
    }
    draw(ctx) {
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
	    ctx.textBaseline = 'middle';
	    ctx.fillText(this.value, this.x, this.y);	
    }
    getBounds(touch) {
	    return touch ?
		    {x: this.x - this.r * 2, y: this.y - this.r * 2, width: this.r * 4, height: this.r * 4}
	      : {x: this.x - this.r, y: this.y - this.r, width: this.r * 2, height: this.r * 2};
    }
    isVisible() { return this.component.isVisible(); }

    keyDown(e) { this.component.changeNode(this, !e.shiftKey); }

    unlink() {
	    if (this.hotkey != null)
		    Hotkeys.unregister(this.hotkey, this);
    }
}

interface IPowerDistributionProps {
    width?: number;
    height?: number;
    visible?: boolean;
    minSwipeDist?: number;
    maxTapDist?: number;
}

class PowerDistribution extends React.Component<IPowerDistributionProps, {}> {
    static defaultProps = {
        minSwipeDist: 20, maxTapDist: 10
    };
	componentDidMount() {
		this.createItems();
		this.setItemSizes();
		this.allocatePower();
	}
	componentWillUnmount() {
		for (var i=0; i<this.nodes.length; i++)
			this.nodes[i].unlink();
	}
	componentDidUpdate (prevProps, prevState) {
		if (prevProps.width != this.props.width || prevProps.height != this.props.height)
			this.setItemSizes();
	}
	render() {
		return (
			<Canvas ref="canvas" width={this.props.width} height={this.props.height} visible={this.props.visible}
                onSwipe={this.onSwipe.bind(this)} onMouseDown={this.onMouseDown.bind(this)} draw={this.draw.bind(this)} />
		);
	}
    redraw() {
        (this.refs['canvas'] as Canvas).redraw();
    }
	onTap(x, y) {
		this.clearSelection();
		this.redraw();
	}
	onSwipe(dir, x, y) {
		if (dir == SwipeDir.Up)
			this.tryChangeNode(x, y, true, true);
		else if (dir == SwipeDir.Down)
			this.tryChangeNode(x, y, false, true);
		else {
			this.clearSelection();
			this.redraw();
		}		
	}
	onMouseDown(btn, x, y) {
		this.tryChangeNode(x, y, btn == 1, false);
	}
	private clearSelection() {
		if (this.selectedNode != null) {
			this.selectedNode.selected = false;
			this.selectedNode = null;
		}
	}
	private tryChangeNode(x, y, increase, swiped) {
		for (var i=0; i<this.nodes.length; i++) {
			var bounds = this.nodes[i].getBounds(swiped);
			if (x >= bounds.x && x <= bounds.x + bounds.width
			 && y >= bounds.y && y <= bounds.y + bounds.height) {
				this.changeNode(this.nodes[i], increase);
				return;
			}
		}
		
		this.clearSelection();
		this.redraw();
	}
	changeNode(node, increase) {
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
		this.redraw();
	}
	nodes: PowerNode[];
    selectedNode: PowerNode;
    centerNode: PowerNode;
    items: PowerWire[];
	private createItems() {
		if (this.items !== undefined)
			return; // don't overwrite existing items
		var component = this;
		this.selectedNode = null;
		this.items = []; this.nodes = [];
		
		for (var i=0; i<16; i++)
            this.items.push(new PowerWireStraight());
		
		for (var angle = 0; angle < 2; angle += 0.25)
            this.items.push(new PowerWireCurved(Math.PI * angle, Math.PI * (angle + 0.25)));
		
		for (var angle = 0; angle < 2; angle += 0.125)
            this.items.push(new PowerWireCurved(Math.PI * angle, Math.PI * (angle + 0.125)));
		
        this.items.push(new PowerWireCurved(Math.PI * -0.125, Math.PI * 0.125));
        this.items.push(new PowerWireCurved(Math.PI * 0.125, Math.PI * 0.25));
        this.items.push(new PowerWireCurved(Math.PI * 0.25, Math.PI * 0.375));
        this.items.push(new PowerWireCurved(Math.PI * 0.375, Math.PI * 0.625));
        this.items.push(new PowerWireCurved(Math.PI * 0.625, Math.PI * 0.75));
        this.items.push(new PowerWireCurved(Math.PI * 0.75, Math.PI * 0.875));
        this.items.push(new PowerWireCurved(Math.PI * 0.875, Math.PI * 1.125));
        this.items.push(new PowerWireCurved(Math.PI * 0.125, Math.PI * 1.25));
        this.items.push(new PowerWireCurved(Math.PI * 0.25, Math.PI * 1.375));
        this.items.push(new PowerWireCurved(Math.PI * 0.375, Math.PI * 1.625));
        this.items.push(new PowerWireCurved(Math.PI * 0.625, Math.PI * 1.75));
        this.items.push(new PowerWireCurved(Math.PI * 0.75, Math.PI * 1.875));
		
		var node = new PowerNode(this, 'D'); this.items.push(node); this.nodes.push(node);
		node = new PowerNode(this, 'A'); this.items.push(node); this.nodes.push(node);
		node = new PowerNode(this, 'X'); this.items.push(node); this.nodes.push(node);
		node = new PowerNode(this, 'W'); this.items.push(node); this.nodes.push(node);
		node = new PowerNode(this, 'C'); this.items.push(node); this.nodes.push(node);
		node = new PowerNode(this, 'E'); this.items.push(node); this.nodes.push(node);
		node = new PowerNode(this, 'Z'); this.items.push(node); this.nodes.push(node);
		node = new PowerNode(this, 'Q'); this.items.push(node); this.nodes.push(node);
		
		this.centerNode = new PowerNode(this, null, true);
		this.items.push(this.centerNode);
		
		this.linkItems(60, 0); this.linkItems(60, 1); this.linkItems(60, 2); this.linkItems(60, 3);
		this.linkItems(0, 16); this.linkItems(0, 23); this.linkItems(1, 19); this.linkItems(1, 20);
		this.linkItems(2, 17); this.linkItems(2, 18); this.linkItems(3, 21); this.linkItems(3, 22);
		
		this.linkItems(16, 17); this.linkItems(16, 23); this.linkItems(16, 4); this.linkItems(17, 18);
		this.linkItems(17, 18); this.linkItems(17, 4); this.linkItems(18, 19); this.linkItems(18, 5); this.linkItems(19, 20);
		this.linkItems(19, 5); this.linkItems(20, 21); this.linkItems(20, 6); this.linkItems(21, 22);
		this.linkItems(21, 6); this.linkItems(22, 23); this.linkItems(22, 7); this.linkItems(23, 7);
		
		this.linkItems(4, 25); this.linkItems(4, 26); this.linkItems(5, 29); this.linkItems(5, 30);
		this.linkItems(6, 33); this.linkItems(6, 34); this.linkItems(7, 37); this.linkItems(7, 38);
		
		this.linkItems(24, 52); this.linkItems(24, 8); this.linkItems(24, 25); this.linkItems(25, 8);
		this.linkItems(25, 26); this.linkItems(26, 9); this.linkItems(26, 27); this.linkItems(27, 9);
		this.linkItems(27, 54); this.linkItems(28, 54);this.linkItems(28, 10); this.linkItems(28, 29); this.linkItems(29, 10);
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
	}
	private setItemSizes() {
		var cx = this.props.width / 2, cy = this.props.height / 2;
		var size = Math.min(this.props.width, this.props.height);
		
		var r1 = size * 0.28, r2 = size * 0.38, r3 = size * 0.48;
		
		(this.items[0] as PowerWireStraight).setSize(cx, cy, cx + r1, cy, size * 0.01);
		(this.items[1] as PowerWireStraight).setSize(cx, cy, cx - r1, cy, size * 0.01);
		(this.items[2] as PowerWireStraight).setSize(cx, cy, cx, cy + r1, size * 0.01);
		(this.items[3] as PowerWireStraight).setSize(cx, cy, cx, cy - r1, size * 0.01);
		
		var i = 4;
		for (var angle = Math.PI / 4; angle < Math.PI * 2; angle += Math.PI / 2)
			(this.items[i++] as PowerWireStraight).setSize(
				cx + Math.cos(angle) * r1,
				cy + Math.sin(angle) * r1,
				cx + Math.cos(angle) * r2,
				cy + Math.sin(angle) * r2,
			size * 0.01);
			
		for (var angle = Math.PI / 8; angle < Math.PI * 2; angle += Math.PI / 4)
			(this.items[i++] as PowerWireStraight).setSize(
				cx + Math.cos(angle) * r2,
				cy + Math.sin(angle) * r2,
				cx + Math.cos(angle) * r3,
				cy + Math.sin(angle) * r3,
			size * 0.01);
    		
		while (i < 24)
			(this.items[i++] as PowerWireCurved).setSize(cx, cy, r1, size * 0.01);
		
		while (i < 40)
			(this.items[i++] as PowerWireCurved).setSize(cx, cy, r2, size * 0.01);
		
		while (i < 52)
			(this.items[i++] as PowerWireCurved).setSize(cx, cy, r3, size * 0.01);
		
		this.nodes[0].setSize(cx + r2, cy, size * 0.072);
		this.nodes[1].setSize(cx - r2, cy, size * 0.072);
		this.nodes[2].setSize(cx, cy + r2, size * 0.072);
		this.nodes[3].setSize(cx, cy - r2, size * 0.072);
		
		var offset = Math.cos(Math.PI / 4) * r3;
		this.nodes[4].setSize(cx + offset, cy + offset, size * 0.072);
		this.nodes[5].setSize(cx + offset, cy - offset, size * 0.072);
		this.nodes[6].setSize(cx - offset, cy + offset, size * 0.072);
		this.nodes[7].setSize(cx - offset, cy - offset, size * 0.072);
		
		this.centerNode.setSize(cx, cy, size * 0.18);
	}
	private linkItems(a, b) {
		var itemA = this.items[a], itemB = this.items[b];
		itemA.links.push(itemB);
		itemB.links.push(itemA);
	}
	draw(ctx) {
		ctx.clearRect(0, 0, this.props.width, this.props.height);
		
		for (var i=0; i<this.items.length; i++)
			this.items[i].draw(ctx);
	}
	isVisible() { return this.props.visible; }
	private allocatePower() {
		for (var i=0; i<this.items.length; i++)
			this.items[i].load = 0;
			
		// for each unit of power allocated to any node, allocate it along the best path to that node.
		for (var i=0; i<this.nodes.length; i++) {
			var node = this.nodes[i];
			for (var j=0; j<node.value; j++) {
				if (!this.calculateDistanceTo(this.centerNode, node)) {
					this.centerNode.value += node.value;
					node.value = 0;
					break;
				}
				let walk:PowerWire = node;
				while (walk != this.centerNode) {
					walk.load ++;
					walk = walk.bestLink;	
				}
			}
		}
	}
	private calculateDistanceTo(fromNode, toNode) {
		// set the "load" of every wire to 0
		for (var i=0; i<this.items.length; i++) {
			var item = this.items[i];
			item.distanceTo = Number.MAX_VALUE;
			item.bestLink = undefined;
		}
		var unvisited = this.items.concat([]);
		fromNode.distanceTo = 0;
		
		while (unvisited.length > 0) {
			// find the node with the smallest distanceTo value
			var bestDist = Number.MAX_VALUE, bestIndex = -1;
			for (var i=0; i<unvisited.length; i++) {
				var dist = unvisited[i].distanceTo;
				if (dist < bestDist) {
					bestIndex = i;
					bestDist = dist;
				}
			}
			if (bestDist == Number.MAX_VALUE)
				break; // a break in the network means it is not possible to reach any more nodes
			
			var node = unvisited[bestIndex];
			unvisited.splice(bestIndex, 1);
			
			if (node.broken) {
				node.distanceTo = Number.MAX_VALUE;
				continue;
			}
			
			// loop over all neighbours of this node
			for (var i=0; i<node.links.length; i++) {
				var test = node.links[i];
				var dist = node.distanceTo + test.load;
				
				if (dist >= test.distanceTo)
					continue;
				
				test.distanceTo = dist;
				test.bestLink = node;
			}
		}
		return toNode.bestLink !== undefined;
	}
	wireChanged(wireNum, broken) {
		this.items[wireNum].broken = broken;
		this.allocatePower();
		requestAnimationFrame(this.draw);
	}
}