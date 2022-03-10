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
            <h3>{t('systemEventLog')}</h3>

            <ul>
                {props.events.map((event, index) => (
                    <div key={index}>{t(event.identifier, event.parameters)}</div>
                ))}
            </ul>
        </div>
    );
};