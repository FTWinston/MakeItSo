import { Theme } from 'src/lib/mui';
import { normal } from 'color-blend';
import { RGBA } from 'color-blend/dist/types';

const hex2rgba = (hex: string, a: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b, a };
};

export function getHealthColor(healthScale: number, theme: Theme) {
    let fromColor: string;
    let toColor: string;
    let blendAmount: number;

    if (healthScale === 0) {
        fromColor = theme.palette.error.dark;
        toColor = theme.palette.background.default;
        blendAmount = 0.5;
    }
    else if (healthScale < 0.5) {
        fromColor = theme.palette.error.dark;
        toColor = theme.palette.warning.dark;
        blendAmount = healthScale * 2;
    }
    else {
        fromColor = theme.palette.warning.dark;
        toColor = theme.palette.success.dark;
        blendAmount = (healthScale - 0.5) * 2;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const color: RGBA = normal(
        hex2rgba(fromColor, 1),
        hex2rgba(toColor, blendAmount)
    );

    return `rgb(${color.r},${color.g},${color.b})`;
}
