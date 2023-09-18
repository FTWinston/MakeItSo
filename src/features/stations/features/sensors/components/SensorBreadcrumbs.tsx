import { useTranslation } from 'react-i18next';
import { Breadcrumbs, Link, styled, Typography } from 'src/lib/mui';

interface Props {
    depth: number;
    setDepth: (depth: number) => void;
}

const Root = styled(Breadcrumbs)({
    marginLeft: '0.33em',
})

const CurrentCrumb = styled(Typography)({
    display: 'inline-block',
    verticalAlign: 'middle',
});

export const SensorBreadcrumbs: React.FC<Props> = (props) => {
    const { depth, setDepth } = props;
    const { t } = useTranslation('sensors');

    type TextKey = Exclude<Parameters<typeof t>[0], string | string[] | TemplateStringsArray>;
    const textKeys = [
        'targetSelect' as unknown as TextKey,
        'scanSelect' as unknown as TextKey,
        'scanning' as unknown as TextKey,
        'scanResult' as unknown as TextKey
    ];

    const prevCrumbs = textKeys
        .slice(0, depth)
        .map((textKey, index) => (
            <Link key={index} component="button" underline="hover" color="inherit" onClick={() => setDepth(index)}>
                {t(textKey)}
            </Link>
        ));


    return (
        <Root aria-label="breadcrumb">
            {prevCrumbs}
            
            <CurrentCrumb key={depth} color="white">
                {t(textKeys[depth])}
            </CurrentCrumb>
        </Root>
    );
}