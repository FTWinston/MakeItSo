interface ISystemProps {
    width: number;
    height: number;
    visible: boolean;

    index: number;
    key: number;
    touchMode: FeatureState;
    registerCallback: (index: number, receiveMessage: MessageFunc) => void;
}

interface ISystem {
    receiveMessage: MessageFunc
}