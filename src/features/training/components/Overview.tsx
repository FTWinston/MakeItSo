import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import { exitFullscreen } from 'src/features/layout';
import { Box, styled } from 'src/lib/mui';

const Intro = styled(Box)({
    whiteSpace: 'pre-wrap',
})

export const Overview: React.FC = () => {
    const { t } = useTranslation('common');
    useEffect(() => { exitFullscreen() }, []);

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