import * as React from 'react';
import './TargetingElement.scss';
import { ElementColor, ElementShape } from './store';

export enum Status {
    Clickable,
    Selected,
    Removing,
}

enum RotationAnimation {
    Clockwise,
    Anticlockwise,
}

interface IProps {
    status: Status;
    shape: ElementShape;
    color: ElementColor;
    animate: boolean;
    clicked?: () => void;
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

        if (props.animate) {
            this.state = this.getNewState();
        }
        else {
            this.state = {
                rotAnimation: RotationAnimation.Clockwise,
                leftRightDuration: 0,
                upDownDuration: 0,
                rotationDuration: 0,
                leftRightDelay: 0,
                upDownDelay: 0,
                rotationDelay: 0,
            };
        }
    }

    componentWillUpdate(nextProps: IProps, nextState: IState) {
        // Recalcuate internals only if shape or color change.
        // Don't recalculate if only state changes.

        if (nextProps.animate && nextProps.color !== this.props.color || nextProps.shape !== this.props.shape) {
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

        if (this.props.animate) {
            switch (this.state.rotAnimation) {
                case RotationAnimation.Clockwise:
                    classes += ' targetingElement--clockwise';
                    break;
                case RotationAnimation.Anticlockwise:
                    classes += ' targetingElement--anticlockwise';
                    break;
            }
        }
        else {
            classes += ' targetingElement--static';
        }

        switch (this.props.shape) {
            case ElementShape.FilledNoRounded:
                classes += ' targetingElement--noRound targetingElement--filled';
                break;
            case ElementShape.FilledOneRounded:
                classes += ' targetingElement--oneRound targetingElement--filled';
                break;
            case ElementShape.FilledThreeRounded:
                classes += ' targetingElement--threeRound targetingElement--filled';
                break;
            case ElementShape.FilledAllRounded:
                classes += ' targetingElement--allRound targetingElement--filled';
                break;
            case ElementShape.FilledRoundedOpposite:
                classes += ' targetingElement--oppositeRound targetingElement--filled';
                break;
            case ElementShape.FilledRoundedAdjacent:
                classes += ' targetingElement--adjacentRound targetingElement--filled';
                break;
            case ElementShape.OutlineNoRounded:
                classes += ' targetingElement--noRound targetingElement--outline';
                break;
            case ElementShape.OutlineOneRounded:
                classes += ' targetingElement--oneRound targetingElement--outline';
                break;
            case ElementShape.OutlineThreeRounded:
                classes += ' targetingElement--threeRound targetingElement--outline';
                break;
            case ElementShape.OutlineAllRounded:
                classes += ' targetingElement--allRound targetingElement--outline';
                break;
            case ElementShape.OutlineRoundedOpposite:
                classes += ' targetingElement--oppositeRound targetingElement--outline';
                break;
            case ElementShape.OutlineRoundedAdjacent:
                classes += ' targetingElement--adjacentRound targetingElement--outline';
                break;
        }

        switch (this.props.color) {
            case ElementColor.Red:
                classes += ' targetingElement--red';
                break;
            case ElementColor.Yellow:
                classes += ' targetingElement--yellow';
                break;
            case ElementColor.Green:
                classes += ' targetingElement--green';
                break;
            case ElementColor.Blue:
                classes += ' targetingElement--blue';
                break;
            case ElementColor.Purple:
                classes += ' targetingElement--purple';
                break;
            case ElementColor.Lime:
                classes += ' targetingElement--lime';
                break;
        }

        const style = this.props.animate
            ? {
                animationDelay: `-${this.state.leftRightDelay}ms, -${this.state.upDownDelay}ms, -${this.state.rotationDelay}ms`,
                animationDuration: `${this.state.leftRightDuration}ms, ${this.state.upDownDuration}ms, ${this.state.rotationDuration}ms`,
                animationIterationCount: 'infinite',
            }
            : undefined;
        
        const clicked = this.props.clicked === undefined
            ? undefined
            : () => this.props.clicked!();

        return <div
            className={classes}
            style={style}
            onMouseDown={clicked}
            onTouchStart={clicked}
        />;
    }

    private getNewState(): IState {
        const leftRightDuration = Math.round(Math.random() * 30000) + 15000; // 15000 - 45000
        const upDownDuration = Math.round(Math.random() * 30000) + 15000; // 15000 - 45000
        const rotationDuration = Math.round(Math.random() * 15000) + 10000; // 10000 - 25000

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