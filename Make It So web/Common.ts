let gameClient: GameClient;

enum FeatureState {
    Unavailable = 0,
    Disabled,
    Enabled
};

interface MessageFunc {
    (cmd: string, data: string): boolean;
}