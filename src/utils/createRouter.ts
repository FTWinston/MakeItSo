import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from 'src/features/landingpage';
import { Overview } from 'src/features/training/components/Overview';
import { SuspenseOutlet } from 'src/components/SuspenseOutlet';

export const createRouter = () => createBrowserRouter([
    {
        path: "/",
        index: true,
        Component: LandingPage,
    },
    {
        path: "training",
        Component: SuspenseOutlet,
        children: [
            {
                index: true,
                Component: Overview,
            },
            {
                path: "helm",
                lazy: () => import('src/features/training/components/Helm'),
            },
            {
                path: "engineering",
                lazy: () => import('src/features/training/components/Engineering'),
            }
        ]
    },
]);