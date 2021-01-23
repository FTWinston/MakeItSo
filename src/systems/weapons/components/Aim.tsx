import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Slicer } from './Slicer';
import { TargetingSolution } from '../data/TargetingSolution';

const useStyles = makeStyles(theme => ({

}));

interface Props {
    requiredAccuracy: number;
    solution?: TargetingSolution;
    fire: (stepPoints: number[][]) => void;
}

export const Aim: React.FC<Props> = props => {
    const classes = useStyles();

    const [slices, setSlices] = useState<number[][]>([])

    useEffect(
        () => setSlices([]),
        [props.solution]
    );

    const slice = (x1: number, y1: number, x2: number, y2: number) => {
        const newSlices = [
            ...slices,
            [x1, y1, x2, y2]
        ];
        setSlices(newSlices);

        if (slices.length === props.solution?.shapes.length) {
            props.fire(newSlices);
        }
    }

    return (
        <Slicer
            polygon={props.solution?.shapes[slices.length]}
            requiredAccuracy={props.requiredAccuracy}
            slice={slice}
        />
    );
}
