import { styled } from '@mui/material/styles';

export const ScreenReaderOnly = styled('div')({
    position: 'absolute',
    left: '-10000px',
    top: 'auto',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
});