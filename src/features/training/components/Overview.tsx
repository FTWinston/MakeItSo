import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import { useExitFullscreen } from 'src/features/layout';
import { Box, styled } from 'src/lib/mui';

const Intro = styled(Box)({
    whiteSpace: 'pre-wrap',
})

export const Overview: React.FC = () => {
    useExitFullscreen();
    const { t } = useTranslation('common');

    return (
        <div>
            <Intro as="p">{t('training intro')}</Intro>

            <ul>
                <li><Link to="helm">{t('station helm')}</Link></li>
                <li><Link to="engineering">{t('station engineer')}</Link></li>
            </ul>
        </div>
    );
}