import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import { LinearTimer } from 'src/components/LinearTimer';
import { TimeSpan } from 'src/types/TimeSpan';
import { EngineeringCardInfo } from '../types/EngineeringCard';
import { EngineeringCardStub } from './CardStub';

interface Props {
    cards: EngineeringCardInfo[];
    focus: (card: EngineeringCardInfo | null) => void;
    progress?: TimeSpan;
    choose: (id: number) => void;
}

const Root = styled('div')({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

const Prompt = styled(
    Typography
    , { shouldForwardProp: (prop) => prop !== 'hide' }
)<{ hide: boolean }>(({ theme, hide }) => ({
    color: theme.palette.text.secondary,
    fontSize: '1.5em',
    transition: 'opacity 0.5s linear',
    opacity: hide ? 0 : undefined,
}));

const Cards = styled('div')({    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
    gap: '1em',
});

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
    marginTop: '0.5em',
    marginBottom: '0.5em',
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
                {props.progress && <CardGeneration {...props.progress} color="secondary" />}
            </EmptyPrompt>
        )
        : (
            <Prompt hide={props.cards.length === 0}>
                Choose one:
            </Prompt>
        );
        
    const cardDisplay = cards.length === 0
        ? undefined
        : (
            <Cards>
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
                                    onClick={() => { if (selected === undefined) { setSelected(card); props.choose(card.id); } }}
                                    onMouseEnter={() => props.focus(card)}
                                    onMouseLeave={() => props.focus(null)}
                                >
                                    <EngineeringCardStub
                                        type={card.type}
                                        rarity={card.rarity}
                                    />
                                </CardWrapper>
                            </Slide>
                        </Zoom>
                    );
                })}
            </Cards>
        );

    return (
        <Root>
            {prompt}
            {cardDisplay}
            {props.progress && <CardGeneration {...props.progress} color="secondary" />}
        </Root>
    );
};