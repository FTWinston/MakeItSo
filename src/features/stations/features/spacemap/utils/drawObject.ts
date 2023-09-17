import { Theme } from 'src/lib/mui';
import { ObjectAppearance } from 'src/types/ObjectAppearance';
import { RelationshipType } from 'src/types/RelationshipType';
import { DrawFunction } from '../types/DrawFunction';
import { drawChevron } from './appearances/drawChevron';
import { drawCircle } from './appearances/drawCircle';

export const drawFunctions: Record<ObjectAppearance, DrawFunction> = {
    chevron: drawChevron,
    circle: drawCircle,
};

type Colors = {
    mainColor: string;
    highlight: string;
}

export function getColors(relationship: RelationshipType, theme: Theme): Colors {
    switch (relationship) {
        case RelationshipType.None: 
            return { mainColor: theme.palette.grey[600], highlight: theme.palette.grey[400] };
        case RelationshipType.Hostile:
            return { mainColor: theme.palette.error.dark, highlight: theme.palette.error.light };
        case RelationshipType.Neutral:
            return { mainColor: theme.palette.grey[400], highlight: theme.palette.info.light };
        case RelationshipType.Friendly:
            return { mainColor: theme.palette.text.primary, highlight: theme.palette.success.light };
        case RelationshipType.Unknown:
            return { mainColor: theme.palette.warning.dark, highlight: theme.palette.warning.light };
    }
}

export function drawObject(
    ctx: CanvasRenderingContext2D,
    appearance: ObjectAppearance,
    relationship: RelationshipType,
    theme: Theme
) {
    const drawFunction = drawFunctions[appearance];
    if (!drawFunction) {
        throw new Error(`No draw function for type: ${appearance}`);
    }

    const { mainColor, highlight } = getColors(relationship, theme);

    return drawFunction(ctx, mainColor, highlight);
}
