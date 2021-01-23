import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Polygon } from '../../../common/data/Polygon';
import { Slicer } from './Slicer';

const useStyles = makeStyles(theme => ({

}));

interface Props {
    requiredAccuracy: number;
    polygon?: Polygon;
    fire: (x1: number, y1: number, x2: number, y2: number) => void;
}

export const Aim: React.FC<Props> = props => {
    const classes = useStyles();

    // TODO: store entered solution for each step,
    // then send all the slices together at the end.

    return (
        <Slicer
            polygon={props.polygon}
            requiredAccuracy={props.requiredAccuracy}
            fire={props.fire}
        />
    );
}
