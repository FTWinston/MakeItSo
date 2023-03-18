import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export const SuspenseOutlet = () => {
    const { t } = useTranslation('common');
    
    return (
        <Suspense fallback={<div>{t('loading')}</div>}>
            <Outlet />
        </Suspense>
    );
}