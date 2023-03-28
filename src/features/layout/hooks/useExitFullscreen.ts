import { useEffect } from 'react';
import { exitFullscreen } from '../utils/fullscreen';

export function useExitFullscreen() {
    useEffect(() => { exitFullscreen() }, []);
}