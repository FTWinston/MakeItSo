import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const SuspenseOutlet = () => {
    return (
        <Suspense fallback={<div>...</div>}>
            <Outlet />
        </Suspense>
    );
}