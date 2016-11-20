interface ICanvasProps {
    width?: number;
    height?: number;
    visible?: boolean;
    style?: string;

    minSwipeDist?: number;
    maxSwipeTime?: number;
    maxTapDist?: number;
    maxTapTime?: number;
    rotate?: boolean;

    draw?: (ctx: CanvasRenderingContext2D, width: number, height: number, time?: number) => void;
    onMouseDown?: (button: number, x: number, y: number) => void;
    onMouseUp?: (button: number, x: number, y: number) => void;
    onClick?: (button: number, x: number, y: number) => void;
    onSwipe?: (dir: SwipeDir, x: number, y: number) => void;
    onTap?: (x: number, y: number) => void;
    onTouchStart?: (x: number, y: number) => void;
    onTouchEnd?: (x: number, y: number) => void;
}

class Canvas extends React.Component<ICanvasProps, {}> {
    static defaultProps = {
        width: 300, height: 200, rotate: false, visible: true
    }
    componentDidMount () {
        let component = this;
        let canvas = this.refs['canvas'] as HTMLCanvasElement;
        canvas.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);
        
        if (component.props.onMouseDown !== undefined)        
            canvas.addEventListener('mousedown', function(e) {
                var rect = canvas.getBoundingClientRect();
                component.props.onMouseDown(e.which, e.clientX - rect.left, e.clientY - rect.top);
            });
        
        if (component.props.onMouseUp !== undefined)        
            canvas.addEventListener('mouseup', function(e) {
                var rect = canvas.getBoundingClientRect();
                component.props.onMouseUp(e.which, e.clientX - rect.left, e.clientY - rect.top);
            });
        
        if (component.props.onClick !== undefined)        
            canvas.addEventListener('click', function(e) {
                var rect = canvas.getBoundingClientRect();
                component.props.onClick(e.which, e.clientX - rect.left, e.clientY - rect.top);
            });
        
        if (component.props.onSwipe !== undefined)
            TouchFunctions.detectSwipe(canvas, this.props.minSwipeDist, this.props.maxSwipeTime, function(dir,x,y) {
                var rect = canvas.getBoundingClientRect();
                component.props.onSwipe(dir, x - rect.left, y - rect.top);
            });
        
        if (component.props.onTap !== undefined)
            TouchFunctions.detectTap(canvas, this.props.maxTapDist, this.props.maxTapTime, function(x,y) {
                var rect = canvas.getBoundingClientRect();
                component.props.onTap(x - rect.left, y - rect.top);
            });
        if (component.props.onTouchStart !== undefined)
            canvas.addEventListener('touchstart', function(e) {
                var rect = canvas.getBoundingClientRect();
                var touch = e.changedTouches[0];
                component.props.onTouchStart(touch.clientX - rect.left, touch.clientY - rect.top);
            });
        if (component.props.onTouchEnd !== undefined)
            canvas.addEventListener('touchend', function(e) {
                var rect = canvas.getBoundingClientRect();
                var touch = e.changedTouches[0];
                component.props.onTouchEnd(touch.clientX - rect.left, touch.clientY - rect.top);
            });
        
        this.redraw();
    }
    componentDidUpdate (prevProps, prevState) {
        this.redraw();
    }
    redraw() {
        if (this.props.visible)
            requestAnimationFrame(this.callDraw.bind(this));
    }
    private callDraw(time) {
        let ctx = this.getContext();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        let width, height;
        if (this.props.rotate) {
            width = this.props.height;
            height = this.props.width;

            ctx.translate(this.props.width, 0);
            ctx.rotate(Math.PI / 2);
        }
        else {
            width = this.props.width;
            height = this.props.height;
        }

        this.props.draw(ctx, width, height, time);
    }
    render() {
        return (
            <canvas ref="canvas" width={this.props.width} height={this.props.height} style={this.props.style} />
        );
    }
    getContext(): CanvasRenderingContext2D {
        return (this.refs['canvas'] as HTMLCanvasElement).getContext('2d');
    }
}

interface ICanvasDrawable {
    draw: (ctx: CanvasRenderingContext2D) => void;
}