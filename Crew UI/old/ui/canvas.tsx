interface ICanvasProps {
    visible?: boolean;
    style?: Object;
    minSwipeDist?: number;
    maxSwipeTime?: number;
    maxTapDist?: number;
    maxTapTime?: number;

    draw?: (ctx: CanvasRenderingContext2D, width: number, height: number, time?: number) => void;
    onMouseDown?: (button: number, x: number, y: number) => void;
    onMouseUp?: (button: number, x: number, y: number) => void;
    onClick?: (button: number, x: number, y: number) => void;
    onSwipe?: (dir: SwipeDir, x: number, y: number) => void;
    onTap?: (x: number, y: number) => void;
    onTouchStart?: (x: number, y: number) => void;
    onTouchEnd?: (x: number, y: number) => void;
}

interface ICanvasState {
    width?: number;
    height?: number;
}

class Canvas extends React.Component<ICanvasProps, ICanvasState> {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
    }
    static defaultProps = {
        visible: true,
        style: null
    }
    private resizeEvent: any;
    componentDidMount () {
        let component = this;

        this.resizeEvent = this.updateSize.bind(this);
        window.addEventListener('resize', this.resizeEvent);
        this.updateSize();

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
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeEvent);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.visible && !prevProps.visible)
            this.updateSize();
    }
    updateSize() {
        let canvas = this.refs['canvas'] as HTMLCanvasElement;
        let state: ICanvasState = {
            width: canvas.offsetWidth,
            height: canvas.offsetHeight
        };

        if (state.width == this.state.width && state.height == this.state.height)
            return; // no change

        this.setState(state);
        this.redraw();
    }
    redraw() {
        if (this.props.visible)
            requestAnimationFrame(this.callDraw.bind(this));
    }
    private callDraw(time) {
        let ctx = this.getContext();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.props.draw(ctx, this.state.width, this.state.height, time);
    }
    render() {
        return (
            <div style={this.props.style}>
                <canvas ref="canvas" width={this.state.width} height={this.state.height} />
            </div>
        );
    }
    private getContext(): CanvasRenderingContext2D {
        return (this.refs['canvas'] as HTMLCanvasElement).getContext('2d');
    }
}