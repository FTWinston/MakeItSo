import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import { LinearTimer } from 'src/components/LinearTimer';
import { TimeSpan } from 'src/types/TimeSpan';
import { EngineeringCardInfo } from '../types/EngineeringCard';
import { cardHeight, shrinkScale } from './EngineeringCard';
import { ZoomableCard } from './ZoomableCard';

interface Props {
    cards: EngineeringCardInfo[];
    progress?: TimeSpan;
    choose: (card: EngineeringCardInfo) => void;
}

const Root = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
    position: 'relative',
    marginTop: 2,
    gap: -(1 - shrinkScale) * cardHeight * 0.75,
});

const Prompt = styled(Typography)<{ hide: boolean }>(({ theme, hide }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: 'rotate(-90deg)',
    transformOrigin: 'left top 0',
    color: theme.palette.text.secondary,
    fontSize: '2em',
    transition: 'opacity 0.5s linear',
    opacity: hide ? 0 : undefined,
}));

const EmptyPrompt = styled('div')({
    textAlign: 'center',
});

const CardWrapper = styled('div')<{ selected: boolean }>(({ selected }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    zIndex: selected ? 1 : undefined,
}));

const CardGeneration = styled(LinearTimer)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));

export const exitDuration = 1000;

export const CardChoice: React.FC<Props> = props => {
    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: exitDuration,
    };

    const [cards, setCards] = useState(props.cards);

    const [selected, setSelected] = useState<EngineeringCardInfo>();

    useEffect(
        () => {
            const newCards = props.cards;
            const callback = () => {
                setSelected(undefined);
                setCards(newCards);
            };

            const id = setTimeout(callback, transitionDuration.exit);

            return () => {
                clearTimeout(id);
            };
        },
        [props.cards, transitionDuration.exit]
    );
    
    const [firstRender, setFirstRender] = useState(true);

    useEffect(
        () => {
            setFirstRender(false);
        },
        []
    );

    const prompt = cards.length === 0
        ? (
            <EmptyPrompt>
                No card choice available.
                <br/>Please wait...
                {props.progress && <CardGeneration {...props.progress} color="primary" />}
            </EmptyPrompt>
        )
        : (
            <Prompt hide={props.cards.length === 0}>
                Choose one:
            </Prompt>
        );
    
    return (
        <Root>
            {prompt}
            {cards.map(card => {
                return (
                    <Zoom
                        in={props.cards.indexOf(card) !== -1 || card === selected}
                        timeout={transitionDuration}
                        unmountOnExit
                        key={card.id}
                        appear={!firstRender}
                    >
                        <Slide
                            in={props.cards.indexOf(card) !== -1 || card !== selected}
                            timeout={transitionDuration}
                            appear={false}
                            direction="left"
                            unmountOnExit
                            key={card.id}
                        >
                            <CardWrapper
                                selected={card === selected}
                                onClick={() => { if (selected === undefined) { setSelected(card); props.choose(card); } }}
                            >
                                <ZoomableCard
                                    type={card.type}
                                    rarity={card.rarity}
                                    forceZoom={selected ? card === selected : undefined}
                                />
                            </CardWrapper>
                        </Slide>
                    </Zoom>
                );
            })}
        </Root>
    );
};