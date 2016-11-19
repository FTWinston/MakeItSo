interface ISystemProps {
    width: number;
    height: number;
    visible: boolean;

    index: number;
    key: number;
    inputMode: InputMode;
    registerCallback: (index: number, system: ISystem) => void;
}

interface ISystem {
    receiveMessage: MessageFunc
    clearAllData: () => void
}

interface MessageFunc {
    (cmd: string, data: string): boolean;
}