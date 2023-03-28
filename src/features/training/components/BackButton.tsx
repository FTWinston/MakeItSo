import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from 'src/lib/mui';

export const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('common');
    
    return (
        <MenuItem onClick={() => navigate('..')}>{t('training back')}</MenuItem>
    );
}