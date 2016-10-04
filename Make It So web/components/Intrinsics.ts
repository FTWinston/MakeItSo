declare namespace JSX {
    interface IntrinsicElements {
        screen: { id?: string, className?: string, style?: Object };
        system: { id?: string, className?: string, style?: Object };
        row: { id?: string, className?: string, style?: Object };
        spacer: { id?: string, className?: string, style?: Object };
        choice: { id?: string, className?: string, style?: Object };
        buttonGroup: { id?: string, className?: string, style?: Object };
        prompt: { id?: string, className?: string, style?: Object };
        description: { id?: string, className?: string, style?: Object };
        clicker: { id?: string, className?: string, style?: Object, type: string, onMouseDown?: any, onMouseUp?: any, onMouseLeave?: any, onClick?: any, onTouchStart?: any, onTouchEnd?: any, ref?: string };
        touchArea: { id?: string, className?: string, style?: Object };
    }
}