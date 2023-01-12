import HelmIcon from '@mui/icons-material/NearMe';
import { styled } from '@mui/material/styles';
import { Badge, Tab, Tabs } from 'src/components';
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { SystemAppBar } from 'src/features/layout';

interface Props {
}

const AppBarBadge = styled(Badge)<ComponentProps<typeof Badge>>({
    '& .MuiBadge-badge': {
        right: '-0.55em',
    },
});

export const HelmAppBar: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');

    return (
        <SystemAppBar>
            <HelmIcon
                fontSize="large"
                titleAccess={t('title')}
                role="img"
                color="disabled"
            />
            <Box sx={{flexGrow: 1}} />

        </SystemAppBar>
    );
}