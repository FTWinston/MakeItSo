import { useEffect } from 'react';
import { enterFullscreen } from '../utils/fullscreen';

export function useFullscreen() {
    useEffect(() => { enterFullscreen() }, []);
}