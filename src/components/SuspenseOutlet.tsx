import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const SuspenseOutlet = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
    </Suspense>
);