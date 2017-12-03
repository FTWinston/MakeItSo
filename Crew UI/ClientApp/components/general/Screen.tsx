import * as React from 'react';
import './Screen.scss';

interface IScreenProps {
    centered?: boolean;
    pageLayout?: boolean;
    className?: string;
    heading?: string;
}

export class Screen extends React.Component<IScreenProps, {}> {
    static defaultProps = {
        centered: false,
        pageLayout: false,
    };

    render() {
        let classes = 'screen';

        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        if (this.props.centered) {
            classes += ' screen--centered';
        }
        
        if (this.props.pageLayout) {
            classes += ' screen--pageLayout';
        }

        let heading;
        if (this.props.heading !== undefined) {
            heading = <h1 className="screen__heading">{this.props.heading}</h1>;
        }

        return (
            <div className={classes}>
                {heading}
                {this.props.children}
            </div>
        );
    }
}