import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Switch, Typography, styled } from 'src/lib/mui';

interface Props {
    repairMode: boolean;
    setRepairMode: (value: boolean) => void;
}

const Label = styled(Typography)({
    fontSize: 'min(1em, 5.1vw)',
});

export const ModeToggle: React.FC<Props> = (props) => {
    const { t } = useTranslation('engineering');
    
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifySelf="center"
            component="label"
        >
            <Label
                variant="button"
                color={props.repairMode ? 'grey' : undefined}
                role="none"
            >
                {t('effect mode')}
            </Label>
            <Switch
                color="error"
                checked={props.repairMode}
                onChange={e => props.setRepairMode(e.target.checked)}
            />
            <Label
                variant="button"
                color={props.repairMode ? undefined : 'grey'}
            >
                {t('repair mode')}
            </Label>
        </Stack>
    );
};
