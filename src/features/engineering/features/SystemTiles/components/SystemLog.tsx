import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import LogIcon from '@mui/icons-material/List';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { ShipSystem } from 'src/types/ShipSystem';
import { LogEvent } from '../types/TileInfo';
import { LogEntry } from './LogEntry';

interface Props {
    system: ShipSystem;
    events: LogEvent[];
}

const Root = styled('div')({
    padding: '0.5em',
    width: '16em',
});

const Title = styled('h3')({
    marginBottom: '0.5em',
    display: 'flex',
});

const PositionedIcon = styled(LogIcon)({
    marginTop: '-0.075em',
    marginRight: '0.4em',
})

export const SystemLog: React.FC<Props> = (props) => {
    const { t } = useTranslation('engineering');

    return (
        <Root>
            <Title>
                <PositionedIcon />
                {t(`system ${props.system}`)} {t('event log')}
            </Title>

            <TransitionGroup component="ul">
                {props.events.map(event => (
                    <Collapse key={event.id}>
                        <LogEntry event={event} />
                    </Collapse>
                ))}
            </TransitionGroup>
        </Root>
    );
};
