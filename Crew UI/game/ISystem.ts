interface ISystemProps {
    width: number;
    height: number;
    visible: boolean;

    index: number;
    key: number;
    inputMode: InputMode;
    registerCallback: (index: number, receiveMessage: MessageFunc) => void;
}

interface ISystem {
    receiveMessage: MessageFunc
}

interface MessageFunc {
    (cmd: string, data: string): boolean;
}