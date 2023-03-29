import { styled } from 'src/lib/mui';
import { useTranslation } from 'react-i18next';
import { LogEvent } from '../types/TileInfo';

interface Props {
    event: LogEvent;
}

const Entry = styled('li')({
    fontSize: '0.9em',
    marginBottom: '0.25em',
    whiteSpace: 'pre-wrap',
});

export const LogEntry: React.FC<Props> = (props) => {
    const { t } = useTranslation('engineering');

    let { identifier, parameters } = props.event;

    if (identifier === 'play card' && 'card' in parameters) {
        // Get real card name to show.
        parameters = {
            ...parameters,
            card: t(`card ${parameters.card} title` as any),
        }
    }
    else if (identifier.startsWith('effect ') && 'effect' in parameters) {
        // Get real effect name to show.
        parameters = {
            ...parameters,
            effect: t(`effect ${parameters.effect}` as any),
        }
    }

    const entryText = t(`log ${identifier}`, parameters);

    return (
        <Entry>{entryText}</Entry>
    );
};