import * as React from 'react';
import './Panel.scss';

interface IPanelProps {
    className?: string;
    headerText?: string;
    footer?: JSX.Element;
    forceScroll?: boolean;
    contentIsList?: boolean;
}

export class Panel extends React.PureComponent<IPanelProps, {}> {
    static defaultProps = {
        forceScroll: false,
    };
    render() {
        let contentClasses = this.props.forceScroll ? 'panel__content panel__content--forceScroll' : 'panel__content';
        let content = this.props.contentIsList
            ? <ul className={contentClasses}>{this.props.children}</ul>
            : <div className={contentClasses}>{this.props.children}</div>;

        return (
            <div className={this.props.className === undefined ? 'panel' : 'panel ' + this.props.className}>
                {this.props.headerText === undefined ? undefined : <div className="panel__header">{this.props.headerText}</div>}
                {content}
                {this.props.footer === undefined ? undefined : <div className="panel__footer">{this.props.footer}</div>}
            </div>
        );
    }
}