import { styled } from '@mui/material/styles';
import { grid } from '@mui/system';
import { Page } from 'src/components/Page';
import { CardHand, EngineeringCardInfo } from '../features/Cards';
import { SystemTiles, TileDisplayInfo } from '../features/SystemTiles';

interface Props {
    systems: TileDisplayInfo[];
    handCards: EngineeringCardInfo[];
    choiceCards: EngineeringCardInfo[];
    log: string[];
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: '1fr 6em 9em',
});

const Systems = styled(SystemTiles)({

});

const Hand = styled(CardHand)({
    
});

const Log = styled('div')({
    
});

const LogEntry = styled('p')({
    
});

export const Engineering: React.FC<Props> = (props) => {
    return (
        <Root>
            <Systems
                systems={props.systems}
            />

            <Log>
                {props.log.map((msg, index) => <LogEntry key={index}>{msg}</LogEntry>)}
            </Log>

            <Hand
                cards={props.handCards}
            />
        </Root>
    );
};