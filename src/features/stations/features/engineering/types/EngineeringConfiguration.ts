import { EngineeringCardType } from '../features/Cards';

export interface EngineeringConfiguration {
    activeCards: EngineeringCardType[];
    inactiveCards: EngineeringCardType[];
}