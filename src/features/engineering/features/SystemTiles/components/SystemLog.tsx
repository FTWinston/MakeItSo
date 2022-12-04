import { useTranslation } from 'react-i18next';
import { ShipSystem } from 'src/types/ShipSystem';
import { LogEvent } from '../types/TileInfo';

interface Props {
    system: ShipSystem;
    events: LogEvent[];
}

export const SystemLog: React.FC<Props> = (props) => {
    const { t } = useTranslation('engineering');

    return (
        <div>
            <h3>{t('system event log')}</h3>

            <ul>
                {props.events.map((event, index) => (
                    <div key={index}>{t(event.identifier as any, event.parameters)}</div>
                ))}
            </ul>
        </div>
    );
};