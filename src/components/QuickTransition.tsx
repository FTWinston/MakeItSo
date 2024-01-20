import { Grow } from 'src/lib/mui';

interface Props {
    show: boolean;
    appear: boolean;
    exit?: boolean;
    children: React.ReactElement<any, any>;
}

export const QuickTransition: React.FC<Props> = props => (
    <Grow
        in={props.show}
        appear={props.appear}
        unmountOnExit={true}
        exit={props.exit ?? false}
    >
        {props.children}
    </Grow>
);
