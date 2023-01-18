import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { SystemAppBar } from 'src/features/layout';
import { Badge, Box, Tab, Tabs, styled } from 'src/lib/mui';
import { CrewIcon } from 'src/components';
import { CrewStation } from 'src/types/ShipSystem';

type TabIdentifiers = 'systems' | 'draw';

interface Props {
    currentTab: TabIdentifiers;
    setCurrentTab: (tab: TabIdentifiers) => void;
    numChoices: number;
    anyOffline: boolean;
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
    const { currentTab, setCurrentTab, numChoices, anyOffline } = props;

    return (
        <SystemAppBar>
            <CrewIcon
                station={CrewStation.Engineering}
                fontSize="large"
                titleAccess={t('title')}
                role="img"
                color="disabled"
            />
            <Box sx={{flexGrow: 1}} />

            <Tabs
                value={currentTab}
                onChange={(_e, newTab) => setCurrentTab(newTab)}
            >
                <AppBarTab
                    label={<AppBarBadge variant="dot" invisible={!anyOffline || currentTab === 'systems'} color="error">{t('ship systems')}</AppBarBadge>}
                    value="systems"
                />
                <AppBarTab
                    label={<AppBarBadge badgeContent={props.numChoices} invisible={currentTab === 'draw'} color="secondary">{t('choose cards')}</AppBarBadge>}
                    color="secondary"
                    value="draw"
                />
            </Tabs>
        </SystemAppBar>
    );
}