import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Ship } from 'src/classes/Ship';
import { HelmTraining } from 'src/features/helm';
import { enterFullscreen } from 'src/features/layout';
import { getClosestCellCenter, worldScaleCellRadius } from 'src/features/spacemap';
import { MenuItem } from 'src/lib/mui';

export const Component: React.FC = () => {
    useEffect(() => { enterFullscreen() }, []);
    const navigate = useNavigate();
    const { t } = useTranslation('common');
    
    return (
    <HelmTraining
        getInitialState={() => {
            const ship = new Ship(1);
            
            const fromPos = getClosestCellCenter(0, 0, worldScaleCellRadius);
            const toPos = getClosestCellCenter(100, 0, worldScaleCellRadius);

            ship.motion = [
                {
                    time: 0,
                    val: {
                        ...fromPos,
                        angle: 0,
                    }
                }, {
                    time: 5000,
                    val: {
                        ...toPos,
                        angle: 0,
                    }
                }
            ];
            
            return ship;
        }}
        getOtherObjects={() => []}
        renderMenuItems={() => <MenuItem onClick={() => navigate('..')}>{t('training back')}</MenuItem>}
    />
    );
}
