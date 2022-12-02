import { useTranslation } from 'react-i18next';

/**
 * Displays a "loading" message.
 */
export const Loading: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <div className="loading">
            {t('loading')}
        </div>
    );
};
