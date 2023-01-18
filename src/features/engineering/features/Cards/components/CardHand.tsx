import { useRef } from 'react';
import { useIsFirstRender } from 'src/hooks/useIsFirstRender';
import { SlideTransition, styled } from 'src/lib/mui';
import { EngineeringCardInfo } from '../types/EngineeringCard';
import { EngineeringCardStub, stubHeight, stubWidth } from './CardStub';
import { exitDuration } from './CardChoice';

interface Props {
    cards: EngineeringCardInfo[];
    selectedCard: EngineeringCardInfo | null;
    setFocus: (card: EngineeringCardInfo | null) => void;
    selectFocusedCard: () => void;
    clearSelection: () => void;
}

const Root = styled('div')({
    display: 'flex',
    height: stubHeight,
    justifyContent: 'center',
    alignItems: 'flex-end',
});

const StubsWrapper = styled('div',
    { shouldForwardProp: (prop) => prop !== 'numCards' }
)<{ numCards: number }>(({ numCards }) => ({
    position: 'relative',
    height: stubHeight,
    width: numCards > 0
        ? `min(100%, calc(${numCards - 1} * (${stubWidth} + ${stubPadding} + ${stubPadding})))`
        : undefined,
    marginRight: stubWidth,
    zIndex: 1,
    right: stubPadding,
    transition: `width ${exitDuration}ms linear`,
}));

const EmptyText = styled('div')({
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '1.2em',
    marginBottom: '1em',
});

const stubPadding = '0.1em';

const StubWrapper = styled('div')({
    padding: `0 ${stubPadding}`,
    position: 'absolute',
    transition: 'left 0.5s ease-in-out',
    '&:hover > *': {
        color: 'transparent',
    },
});

export const CardHand: React.FC<Props> = props => {
    const transitionDuration = {
        enter: 500,
        exit: 0,
    };
    
    const firstRender = useIsFirstRender();
    const isMouseDown = useRef(false);

    if (props.cards.length === 0) {
        return (
            <Root>
                <EmptyText>You have no cards.</EmptyText>
            </Root>
        );
    }

    const screenFractionStep =  1 / (props.cards.length - 1);
    let screenFraction = 0;

    return (
        <Root
            onMouseOut={() => { if (isMouseDown.current && !props.selectedCard) { props.selectFocusedCard(); }}}
            //onMouseEnter={props.clearSelection}
            onMouseDown={() => isMouseDown.current = true}
            onMouseUp={() => isMouseDown.current = false}
        >
            <StubsWrapper numCards={props.cards.length}>
                {props.cards.map((card, cardIndex) => {
                    const left = `calc(100% * ${screenFraction})`;
                    screenFraction += screenFractionStep;

                    const onClick = () => {
                        if (props.selectedCard) {
                            props.clearSelection();
                        }
                        else {
                            props.setFocus(card); props.selectFocusedCard();
                        }
                    };

                    return (
                        <SlideTransition
                            in={true}
                            timeout={transitionDuration}
                            appear={!firstRender}
                            enter={true}
                            exit={false}
                            direction="left"
                            key={card.id}
                            style={{
                                transitionDelay: `${exitDuration}ms`,
                            }}
                        >
                            <StubWrapper
                                key={card.id}
                                style={{
                                    left,
                                    zIndex: props.selectedCard === card ? 999 : props.cards.length - cardIndex,
                                    opacity: props.selectedCard === null || props.selectedCard === card ? undefined : 0.33,
                                }}
                                onMouseEnter={() => { if (!isMouseDown.current && !props.selectedCard) { props.setFocus(card); }}}
                                onMouseLeave={() => { if (!isMouseDown.current && !props.selectedCard) { props.setFocus(null); }}}
                                onClick={onClick}
                            >
                                <EngineeringCardStub
                                    type={card.type}
                                    rarity={card.rarity}
                                />
                            </StubWrapper>
                        </SlideTransition>
                    );
                })}
            </StubsWrapper>
        </Root>
    );
};