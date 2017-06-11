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
                    <ButtonSet color={ButtonColor.Secondary}>
                        <div className="spacer" />
                        <HeldButton text={words.up} hotkey="W" />
                        <div className="spacer" />
                    </ButtonSet>
                    <ButtonSet color={ButtonColor.Secondary}>
                        <HeldButton text={words.left} hotkey="A" />
                        <PushButton color={ButtonColor.Primary} text={words.stop} hotkey="S" />
                        <HeldButton text={words.right} hotkey="D" />
                    </ButtonSet>
                    <ButtonSet color={ButtonColor.Secondary}>
                        <div className="spacer" />
                        <HeldButton text={words.down} hotkey="X" />
                        <div className="spacer" />
                    </ButtonSet>
                </ButtonSet>
            </fieldset>
            <fieldset className="translation">
                <legend>{words.translation}</legend>
                <ButtonSet vertical={true}>
                    <ButtonSet color={ButtonColor.Quaternary}>
                        <div className="spacer" />
                        <HeldButton text={words.up} hotkey="I" />
                        <div className="spacer" />
                    </ButtonSet>
                    <ButtonSet color={ButtonColor.Quaternary}>
                        <HeldButton text={words.left} hotkey="J" />
                        <PushButton color={ButtonColor.Tertiary} text={words.stop} hotkey="K" />
                        <HeldButton text={words.right} hotkey="L" />
                    </ButtonSet>
                    <ButtonSet color={ButtonColor.Quaternary}>
                        <div className="spacer" />
                        <HeldButton text={words.down} hotkey="M" />
                        <div className="spacer" />
                    </ButtonSet>
                </ButtonSet>
            </fieldset>
            <fieldset className="speed">
                <legend>{words.speed}</legend>
                <ButtonSet vertical={true}  color={ButtonColor.Secondary}>
                    <HeldButton text={words.faster} hotkey="shift" />
                    <PushButton color={ButtonColor.Primary} text={words.stop} hotkey="space" />
                    <HeldButton text={words.slower} hotkey="control" />
                </ButtonSet>
            </fieldset>
            
            <fieldset className="speed">
                <legend>{words.speed}</legend>
                <Choice color={ButtonColor.Secondary}>
                    <ToggleButton text="-1/4" />
                    <ToggleButton text="-1/8" />
                    <ToggleButton color={ButtonColor.Primary} text={words.stop} />
                    <ToggleButton text="1/8" />
                    <ToggleButton text="1/4" />
                    <ToggleButton text="3/8" />
                    <ToggleButton text="1/2" />
                    <ToggleButton text="5/8" />
                    <ToggleButton text="3/4" />
                    <ToggleButton text="7/8" />
                    <ToggleButton text="Full" />
                </Choice>
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