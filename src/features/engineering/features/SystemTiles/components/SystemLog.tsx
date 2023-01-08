import { useTranslation } from 'react-i18next';
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

            <ul>
                {props.events.map((event, index) => <LogEntry key={index} event={event} />)}
            </ul>
        </div>
    );
};