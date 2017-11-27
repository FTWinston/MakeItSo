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
                        <PushButton text={words.stop} hotkey="S" color={ButtonColor.Primary} />
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
                        <HeldButton text={words.up} hotkey="U" />
                        <div className="spacer" />
                    </ButtonSet>
                    <ButtonSet color={ButtonColor.Quaternary}>
                        <HeldButton text={words.left} hotkey="H" />
                        <PushButton text={words.stop} hotkey="J" color={ButtonColor.Tertiary} />
                        <HeldButton text={words.right} hotkey="K" />
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
                <Choice color={ButtonColor.Secondary} allowUnselected={true}>
                    <ToggleButton text="-1/2" hotkey="1" />
                    <ToggleButton text="-1/4" hotkey="2" />
                    <ToggleButton text={words.stop} hotkey="3" color={ButtonColor.Primary} />
                    <ToggleButton text="1/4" hotkey="4" />
                    <ToggleButton text="1/2" hotkey="5" />
                    <ToggleButton text="3/4" hotkey="6" />
                    <ToggleButton text="Full" hotkey="7" />
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