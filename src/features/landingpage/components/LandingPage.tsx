import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import { Box, styled } from 'src/lib/mui';

const Intro = styled(Box)({
    whiteSpace: 'pre-wrap',
})

export const LandingPage: React.FC = () => {
    const { t } = useTranslation('common');
    
    return (
        <div>
            <Intro as="p">{t('landing intro')}</Intro>
        
            <Link to="training">{t('training link')}</Link>
        </div>
    );
}