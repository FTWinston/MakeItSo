import * as React from 'react';
import './TargetElement.scss';

export enum TargetingElementStatus {
    Clickable,
    Selected,
    Removing,
}

export enum Shape {
    Star,
    Triangle,
    Square,
    Pentagon,
    Hexagon,
    Octagon,
    Circle,
}

export enum Color {
    Red,
    Yellow,
    Green,
    Blue,
}

enum MoveAnimation {
    UpDown,
    LeftRight,
}

enum RotationAnimation {
    None,
    Clockwise,
    Anticlockwise,
}

interface IProps {
    status: TargetingElementStatus;
    shape: Shape;
    color: Color;
    clicked: () => void;
}

interface IState {
    moveAnimation: MoveAnimation;
    rotAnimation: RotationAnimation;
    delay: number;
    duration: number;
    fixedAngle?: number;
    fixedX?: number;
    fixedY?: number
}

export class TargetingElement extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = this.getNewState();
    }

    componentWillUpdate(nextProps: IProps, nextState: IState) {
        // Recalcuate internals only if shape or color change.
        // Don't recalculate if only state changes.

        if (nextProps.color !== this.props.color || nextProps.shape !== this.props.shape) {
            this.setState(this.getNewState());
        }
    }

    render() {
        let classes = 'targetingElement';
        let rotation: string | undefined;

        switch (this.state.moveAnimation) {
            case MoveAnimation.LeftRight:
                classes += ' targetingElement--leftRight';
                break;
            case MoveAnimation.UpDown:
                classes += ' targetingElement--upDown';
                break;
        }

        switch (this.state.rotAnimation) {
            case RotationAnimation.Clockwise:
                classes += ' targetingElement--clockwise';
                break;
            case RotationAnimation.Anticlockwise:
                classes += ' targetingElement--anticlockwise';
                break;
            case RotationAnimation.None:
                if (this.state.fixedAngle !== undefined) {
                    rotation = `rotate(${this.state.fixedAngle}deg)`;
                }
                break;
        }

        switch (this.props.shape) {
            case Shape.Star:
                classes += ' targetingElement--star';
                break;
            case Shape.Triangle:
                classes += ' targetingElement--triangle';
                break;
            case Shape.Square:
                classes += ' targetingElement--square';
                break;
            case Shape.Pentagon:
                classes += ' targetingElement--pentagon';
                break;
            case Shape.Hexagon:
                classes += ' targetingElement--hexagon';
                break;
            case Shape.Octagon:
                classes += ' targetingElement--octagon';
                break;
            case Shape.Circle:
                classes += ' targetingElement--circle';
                break;
        }

        switch (this.props.color) {
            case Color.Red:
                classes += ' targetingElement--red';
                break;
            case Color.Yellow:
                    classes += ' targetingElement--yellow';
                    break;
            case Color.Green:
                classes += ' targetingElement--green';
                break;
            case Color.Blue:
                classes += ' targetingElement--blue';
                break;
        }

        const style = {
            animationDelay: `-${this.state.delay}ms`,
            animatioDuration: `${this.state.duration}ms`,
            animationIterationCount: 'infinite',
            transform: rotation,
        };
        
        const clicked = () => this.props.clicked();

        return <div
            className={classes}
            style={style}
            onMouseDown={clicked}
            onTouchStart={clicked}
        />;
    }

    private getNewState(): IState {
        let animation: MoveAnimation;
        let rotAnimation: RotationAnimation;
        let fixedX: number | undefined;
        let fixedY: number | undefined;
        let fixedAngle: number | undefined;

        if (Math.random() < 0.5) {
            animation = MoveAnimation.LeftRight;
            fixedY = Math.round(Math.random() * 9000) / 100 + 5; // 5 - 95
        }
        else {
            animation = MoveAnimation.UpDown;
            fixedX = Math.round(Math.random() * 9000) / 100 + 5; // 5 - 95
        }

        const rotTest = Math.random();
        if (rotTest < 0.4) {
            rotAnimation = RotationAnimation.Clockwise;
        }
        else if (rotTest < 0.8) {
            rotAnimation = RotationAnimation.Anticlockwise;
        }
        else {
            rotAnimation = RotationAnimation.None
            fixedAngle = Math.round(Math.random() * 360); // 0 - 360
        }

        return {
            moveAnimation: animation,
            rotAnimation: rotAnimation,
            delay: Math.round(Math.random() * 5000), // 0 - 5000 ms
            duration: Math.round(Math.random() * 3000) + 2000, // 2000 - 5000 ms
            fixedX: fixedX,
            fixedY: fixedY,
            fixedAngle: fixedAngle,
        }
    }
}