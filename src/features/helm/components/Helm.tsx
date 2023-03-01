import { useTranslation } from 'react-i18next';
import { Box, SlideTransition, styled, ZoomTransition } from 'src/lib/mui';
import { AppBarHeight, Page } from 'src/features/layout';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { HelmAppBar } from './HelmAppBar';
import { HelmMap } from './HelmMap';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { interpolatePosition } from 'src/utils/interpolate';
import { Position } from 'src/types/Position';
import { useState } from 'react';
import { Mode, ModeToggle } from './ModeToggle';
import { ManeuverCard, ManeuverChoice, ManeuverType } from '../features/maneuvers';
import { ManeuverInfo } from '../features/maneuvers/types/ManeuverType';
import { getManeuverStartPosition } from '../utils/getManeuverStartPosition';
import { getTime } from 'src/utils/timeSpans';

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
    ship: GameObjectInfo;
    otherObjects: Iterable<GameObjectInfo>;
    speedToManeuver: number;
    power: PowerLevel;
    health: number;
    stop: () => void;
    maneuvers: ManeuverInfo[];
    maneuverChoice: ManeuverChoice;
    discardManeuverCard: () => void;
    maneuver: (type: ManeuverType) => void;
    destination: Position | null;
    setDestination: (destination: Position) => void;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr`,
});

const CardWrapper = styled(Box)({
    position: 'absolute',
    left: '0.25em',
    bottom: '0.25em',
})

export const Helm: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');

    const [mode, setMode] = useState<Mode>('travel');
    const [previewManeuver, setPreviewManeuver] = useState<ManeuverType | null>(null);
    
    const currentMotionEndAngle = getManeuverStartPosition(props.ship.motion, props.maneuvers, props.speedToManeuver, getTime()).val.angle;

    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <HelmAppBar power={props.power} health={props.health} />

            <HelmMap
                mode={mode}
                stop={props.stop}
                getInitialCenter={() => interpolatePosition(props.ship.motion)}
                ship={props.ship}
                otherObjects={props.otherObjects}
                maneuvers={props.maneuvers}
                previewManeuver={previewManeuver}
                speedToManeuver={props.speedToManeuver}
                destination={props.destination}
                setDestination={props.setDestination}
            />

            <SlideTransition
                in={mode === 'maneuver'}
                direction="up"
                appear={false}
                exit={true}
            >
                <CardWrapper>
                    <ZoomTransition
                        in={true}
                        appear={true}
                        enter={true}
                        exit={false}
                        key={props.maneuverChoice.id}
                    >
                        <div>
                            <ManeuverCard
                                currentPower={props.power}
                                maneuvers={props.maneuverChoice}
                                selectManeuver={props.maneuver}
                                previewManeuver={setPreviewManeuver}
                                discard={props.discardManeuverCard}
                                startAngle={currentMotionEndAngle}
                            />
                        </div>
                    </ZoomTransition>
                </CardWrapper>
            </SlideTransition>

            <ModeToggle mode={mode} setMode={setMode} />
        </Root>
    );
};
