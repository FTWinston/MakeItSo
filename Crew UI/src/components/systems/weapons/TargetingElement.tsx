import * as React from 'react';
import './TargetingElement.scss';

export enum Status {
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

enum RotationAnimation {
    Clockwise,
    Anticlockwise,
}

interface IProps {
    status: Status;
    shape: Shape;
    color: Color;
    clicked: () => void;
}

interface IState {
    rotAnimation: RotationAnimation;
    
    leftRightDuration: number;
    upDownDuration: number;
    rotationDuration: number;

    leftRightDelay: number;
    upDownDelay: number;
    rotationDelay: number;
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

        switch (this.props.status) {
            case Status.Selected:
                classes += ' targetingElement--selected';
                break;
            case Status.Removing:
                classes += ' targetingElement--removing';
                break;
        }

        switch (this.state.rotAnimation) {
            case RotationAnimation.Clockwise:
                classes += ' targetingElement--clockwise';
                break;
            case RotationAnimation.Anticlockwise:
                classes += ' targetingElement--anticlockwise';
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
            animationDelay: `-${this.state.leftRightDelay}ms, -${this.state.upDownDelay}ms, -${this.state.rotationDelay}ms`,
            animationDuration: `${this.state.leftRightDuration}ms, ${this.state.upDownDuration}ms, ${this.state.rotationDuration}ms`,
            animationIterationCount: 'infinite',
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
        const leftRightDuration = Math.round(Math.random() * 10000) + 5000; // 5000 - 15000
        const upDownDuration = Math.round(Math.random() * 10000) + 5000; // 5000 - 15000
        const rotationDuration = Math.round(Math.random() * 6000) + 3000; // 3000 - 9000

        const rotAnimation = Math.random() < 0.5
            ? RotationAnimation.Clockwise
            : RotationAnimation.Anticlockwise;

        return {
            rotAnimation: rotAnimation,
            leftRightDuration: leftRightDuration,
            leftRightDelay: Math.round(Math.random() * leftRightDuration),
            upDownDuration: upDownDuration,
            upDownDelay: Math.round(Math.random() * upDownDuration),
            rotationDuration: rotationDuration,
            rotationDelay: Math.round(Math.random() * rotationDuration),
        };
    }
}