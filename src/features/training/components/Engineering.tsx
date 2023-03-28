import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Ship } from 'src/classes/Ship';
import { EngineeringTraining } from 'src/features/engineering';
import { enterFullscreen } from 'src/features/layout';
import { MenuItem } from 'src/lib/mui';
import { ShipSystem } from 'src/types/ShipSystem';

export const Component: React.FC = () => {
    useEffect(() => { enterFullscreen() }, []);
    const navigate = useNavigate();
    const { t } = useTranslation('common');

    return (
    <EngineeringTraining
        getInitialState={() => new Ship(1)}
        getEffects={() => [
            {
                type: 'damage',
                system: ShipSystem.Shields,
                healthChange: -1,
            }
        ]}
        renderMenuItems={() => <MenuItem onClick={() => navigate('..')}>{t('training back')}</MenuItem>}
    />
    )
}
