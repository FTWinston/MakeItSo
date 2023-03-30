import { ComponentProps } from 'react';
import { SystemAppBar } from '../../appbar';
import { Badge, Tab, Tabs, styled } from 'src/lib/mui';
import { CrewStation } from 'src/types/ShipSystem';
import { useTranslation } from 'react-i18next';

type TabIdentifiers = 'systems' | 'draw';

interface Props {
    currentTab: TabIdentifiers;
    setCurrentTab: (tab: TabIdentifiers) => void;
    numChoices: number;
    anyOffline: boolean;
    renderMenuItems?: () => JSX.Element;
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
    const { currentTab, setCurrentTab, renderMenuItems, anyOffline } = props;

    return (
        <SystemAppBar
            renderMenuItems={renderMenuItems}
            station={CrewStation.Engineering}
            justifyContent="flex-end"
        >
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