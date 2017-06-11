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
                        <HeldButton color={ButtonColor.Secondary} text={words.up} hotkey="W" />
                        <div className="spacer" />
                    </ButtonSet>
                    <ButtonSet>
                        <HeldButton color={ButtonColor.Secondary} text={words.left} hotkey="A" />
                        <PushButton color={ButtonColor.Primary} text={words.stop} hotkey="S" />
                        <HeldButton color={ButtonColor.Secondary} text={words.right} hotkey="D" />
                    </ButtonSet>
                    <ButtonSet>
                        <div className="spacer" />
                        <HeldButton color={ButtonColor.Secondary} text={words.down} hotkey="X" />
                        <div className="spacer" />
                    </ButtonSet>
                </ButtonSet>
            </fieldset>
            <fieldset className="translation">
                <legend>{words.translation}</legend>
                <ButtonSet vertical={true}>
                    <ButtonSet>
                        <div className="spacer" />
                        <HeldButton color={ButtonColor.Quaternary} text={words.up} hotkey="I" />
                        <div className="spacer" />
                    </ButtonSet>
                    <ButtonSet>
                        <HeldButton color={ButtonColor.Quaternary} text={words.left} hotkey="J" />
                        <PushButton color={ButtonColor.Tertiary} text={words.stop} hotkey="K" />
                        <HeldButton color={ButtonColor.Quaternary} text={words.right} hotkey="L" />
                    </ButtonSet>
                    <ButtonSet>
                        <div className="spacer" />
                        <HeldButton color={ButtonColor.Quaternary} text={words.down} hotkey="M" />
                        <div className="spacer" />
                    </ButtonSet>
                </ButtonSet>
            </fieldset>
            <fieldset className="speed">
                <legend>{words.speed}</legend>
                <ButtonSet vertical={true}>
                    <HeldButton color={ButtonColor.Secondary} text={words.faster} hotkey="shift" />
                    <PushButton color={ButtonColor.Primary} text={words.stop} hotkey="space" />
                    <HeldButton color={ButtonColor.Secondary} text={words.slower} hotkey="control" />
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