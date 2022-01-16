import { classNames } from 'src/utils/classNames';
import classes from './Page.module.scss';

interface Props {
    className?: string;
}

export const Page: React.FC<Props> = (props) => {
    return (
        <div className={classes.outer}>
            <div className={classNames(classes.inner, props.className)}>
                {props.children}
            </div>
        </div>
    );
};
