class HelmSystem extends React.Component<ISystemProps, {}> implements IShipSystem {
    render() {
        if (!this.props.visible)
            return null;

        switch (this.props.inputMode) {
            case InputMode.ButtonsAndKeyboard:
                return this.renderButtons();
            case InputMode.Touchscreen:
                return this.renderTouch();
            case InputMode.GamePad:
                return this.renderGamepad();
        }
    }
    private renderButtons() {
        let words = language.systems.helm;

        return <div id="helm" className="buttonInput">
            <fieldset className="rotation">
                <legend>{words.rotation}</legend>
                <ButtonSet vertical={true}>
                    <ButtonSet>
                        <div className="spacer" />
                        <HeldButton color={ButtonColor.Secondary} text={words.up} />
                        <div className="spacer" />
                    </ButtonSet>
                    <ButtonSet>
                        <HeldButton color={ButtonColor.Secondary} text={words.left} />
                        <PushButton color={ButtonColor.Primary} text={words.stop} />
                        <HeldButton color={ButtonColor.Secondary} text={words.right} />
                    </ButtonSet>
                    <ButtonSet>
                        <div className="spacer" />
                        <HeldButton color={ButtonColor.Secondary} text={words.down} />
                        <div className="spacer" />
                    </ButtonSet>
                </ButtonSet>
            </fieldset>
            <fieldset className="translation">
                <legend>{words.translation}</legend>
                <ButtonSet vertical={true}>
                    <ButtonSet>
                        <div className="spacer" />
                        <HeldButton color={ButtonColor.Quaternary} text={words.up} />
                        <div className="spacer" />
                    </ButtonSet>
                    <ButtonSet>
                        <HeldButton color={ButtonColor.Quaternary} text={words.left} />
                        <PushButton color={ButtonColor.Tertiary} text={words.stop} />
                        <HeldButton color={ButtonColor.Quaternary} text={words.right} />
                    </ButtonSet>
                    <ButtonSet>
                        <div className="spacer" />
                        <HeldButton color={ButtonColor.Quaternary} text={words.down} />
                        <div className="spacer" />
                    </ButtonSet>
                </ButtonSet>
            </fieldset>
            <fieldset className="speed">
                <legend>{words.speed}</legend>
                <ButtonSet vertical={true}>
                    <HeldButton color={ButtonColor.Secondary} text={words.faster} />
                    <PushButton color={ButtonColor.Primary} text={words.stop} />
                    <HeldButton color={ButtonColor.Secondary} text={words.slower} />
                </ButtonSet>
            </fieldset>
        </div>;
    }
    private renderTouch() {
        let words = language.systems.helm;

        return <div id="helm" className="touchInput">
            
        </div>;
    }
    private renderGamepad() {
        let words = language.systems.helm;

        return <div id="helm" className="gamepadInput">
            
        </div>;
    }
    receiveMessage(cmd: string, data: string) {
        return false;
    }
}