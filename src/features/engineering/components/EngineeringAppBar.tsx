import EngineeringIcon from '@mui/icons-material/Engineering';
import { styled } from '@mui/material/styles';
import { Tab } from 'src/components/Tab';
import { Tabs } from 'src/components/Tabs';
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from 'src/components/Badge';
import { SystemAppBar } from 'src/components/SystemAppBar';
import Box from '@mui/material/Box';

type TabIdentifiers = 'systems' | 'draw';

interface Props {
    currentTab: TabIdentifiers;
    setCurrentTab: (tab: TabIdentifiers) => void;
    numChoices: number;
}

const AppBarTab = styled(Tab)<ComponentProps<typeof Tab>>({
    marginTop: '4px',
});

const AppBarBadge = styled(Badge)<ComponentProps<typeof Badge>>({
    '& .MuiBadge-badge': {
        right: '-0.55em',
    },
});

export const EngineeringAppBar: React.FC<Props> = (props) => {
    const { t } = useTranslation('engineering');
    const { currentTab: contentTab, setCurrentTab: setContentTab, numChoices } = props;

    return (
        <SystemAppBar>
            <EngineeringIcon
                fontSize="large"
                titleAccess={t('title')}
                role="img"
                color="disabled"
            />
            <Box sx={{flexGrow: 1}} />

            <Tabs
                value={contentTab}
                onChange={(_e, newTab) => setContentTab(newTab)}
            >
                <AppBarTab label={t('ship systems')} value="systems" />
                <AppBarTab
                    label={<AppBarBadge badgeContent={props.numChoices} invisible={contentTab === 'draw'} color="secondary">{t('choose cards')}</AppBarBadge>}
                    color="secondary"
                    value="draw"
                    disabled={numChoices === 0}
                />
            </Tabs>
        </SystemAppBar>
    );
}