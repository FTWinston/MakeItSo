import { styled } from '@mui/material/styles';
import { Page } from 'src/components/Page';
import { CardHand, cardWidth, EngineeringCardInfo } from '../features/Cards';
import { SystemTiles, TileDisplayInfo } from '../features/SystemTiles';

interface Props {
    systems: TileDisplayInfo[];
    handCards: EngineeringCardInfo[];
    choiceCards: EngineeringCardInfo[];
    log: string[];
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `1fr ${cardWidth}`,
});

const Systems = styled(SystemTiles)({

});

const Hand = styled(CardHand)({
    
});

export const Engineering: React.FC<Props> = (props) => {
    return (
        <Root>
            <Systems
                systems={props.systems}
            />

            <Hand
                cards={props.handCards}
            />
        </Root>
    );
};