import { styled } from 'src/lib/mui';
import { ShipDestroyingSystem } from 'src/types/ShipSystem';

interface Props {
    className?: string;
    shipDestroyed?: ShipDestroyingSystem
}

const Outer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.black,
}));

const Inner = styled('div'
    , { shouldForwardProp: (prop) => prop !== 'destroyed' }
)<{ destroyed?: ShipDestroyingSystem }>(({ destroyed, theme}) => ({
    maxWidth: 'calc(100vh * 2 / 3)',
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.grey[900],
    position: 'relative',
    overflow: 'hidden',
    filter: destroyed ? 'sepia(90%) hue-rotate(310deg) saturate(60%)' : undefined,
}));

export const Page: React.FC<React.PropsWithChildren<Props>> = (props) => {
    return (
        <Outer>
            <Inner className={props.className} destroyed={props.shipDestroyed}>
                {props.children}
            </Inner>
        </Outer>
    );
};
