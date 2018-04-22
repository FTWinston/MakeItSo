import * as React from 'react';
import { PowerCellType } from '~/store/power';
import { FlexibleCanvas } from '~/components/general';
import { GridCell } from "./GridCell";

interface ListCellProps {
    type: PowerCellType;
    clicked: () => void;
    selected: boolean;
}

export class ListCell extends React.PureComponent<ListCellProps, {}> {
    render() {
        let classes = 'gridCell gridCell--inList';

        if (this.props.selected) {
            classes += ' gridCell--selected';
        }
        
        return (
            <FlexibleCanvas
                className={classes}
                onClick={this.props.clicked}
                draw={(ctx, w, h) => GridCell.draw(ctx, w, h, this.props.type)}
            />
        );
    }
}