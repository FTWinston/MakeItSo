import { colorBlue, colorGrey, colorOrange, colorPurple, MuiColor } from 'src/lib/mui';
import { EngineeringCardRarity } from '../types/EngineeringCard';

export function getRarityColor(rarity: EngineeringCardRarity): MuiColor {
    switch (rarity) {
    case EngineeringCardRarity.Common:
        return colorGrey;
    case EngineeringCardRarity.Uncommon:
        return colorBlue;
    case EngineeringCardRarity.Rare:
        return colorPurple;
    case EngineeringCardRarity.Epic:
        return colorOrange;
    }
}