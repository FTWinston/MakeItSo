import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import LogIcon from '@mui/icons-material/List';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import { ShipSystem } from 'src/types/ShipSystem';
import { LogEvent } from '../types/TileInfo';
import { LogEntry } from './LogEntry';
import { IconButton } from 'src/components';

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

const HelpButton = styled(IconButton)({
    marginTop: '-0.825em',
    marginRight: '-0.75em',
})

const TitleText = styled('div')({
    flexGrow: 1,
})

const HelpText = styled('div')({
    whiteSpace: 'pre-line',
});

const LogEntries: React.FC<{ events: LogEvent[] }> = props => (
    <TransitionGroup component="ul">
        {props.events.map(event => (
            <Collapse key={event.id}>
                <LogEntry event={event} />
            </Collapse>
        ))}
    </TransitionGroup>
);

export const SystemLog: React.FC<Props> = (props) => {
    const { t } = useTranslation('engineering');
    const [showHelp, setShowHelp] = useState(false);

    const titleSuffix = showHelp
        ? t('system help')
        : t('event log');

    const buttonLabel = showHelp
        ? t('event log')
        : t('system help');

    const ButtonIcon = showHelp
        ? CloseIcon
        : HelpIcon;

    const content = showHelp
        ? <HelpText>{t(`system help ${props.system}`)}</HelpText>
        : <LogEntries events={props.events} />

    return (
        <Root>
            <Title>
                <PositionedIcon color="disabled" />
                <TitleText>{t(`system ${props.system}`)} {titleSuffix}</TitleText>
                
                <HelpButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label={buttonLabel}
                    onClick={() => setShowHelp(!showHelp)}
                >
                    <ButtonIcon />
                </HelpButton>
            </Title>

            {content}
        </Root>
    );
};
