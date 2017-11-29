class ClientSettings {
    inputMode: InputMode;
    userName: string;

    static load(): ClientSettings | undefined {
        let mode = localStorage.getItem('inputMode');
        let name = localStorage.getItem('userName');
        if (mode === null || name == null)
            return undefined;

        let settings = new ClientSettings();
        settings.inputMode = parseInt(mode);
        settings.userName = name;
        return settings;
    }

    static save(settings: ClientSettings) {
        localStorage.setItem('inputMode', settings.inputMode.toString());
        localStorage.setItem('userName', settings.userName);
    }
}