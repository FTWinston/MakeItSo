import Collapse from '@mui/material/Collapse';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { ShipSystem } from 'src/types/ShipSystem';
import { LogEvent } from '../types/TileInfo';
import { LogEntry } from './LogEntry';

interface Props {
    system: ShipSystem;
    events: LogEvent[];
}

export const SystemLog: React.FC<Props> = (props) => {
    const { t } = useTranslation('engineering');

    return (
        <div>
            <h3>{t(`system ${props.system}`)} {t('event log')}</h3>

            <TransitionGroup component="ul">
                {props.events.map(event => (
                    <Collapse key={event.id}>
                        <LogEntry event={event} />
                    </Collapse>
                ))}
            </TransitionGroup>
        </div>
    );
};