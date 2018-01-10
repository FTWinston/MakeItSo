// Type definitions for Hammer.js 2.0.8
// Project: http://hammerjs.github.io/
// Definitions by: Andrew Watkins <https://github.com/ftwinston>

declare module 'hammerjs' {
    export const DIRECTION_NONE: number;
    export const DIRECTION_LEFT: number;
    export const DIRECTION_RIGHT: number;
    export const DIRECTION_UP: number;
    export const DIRECTION_DOWN: number;
    export const DIRECTION_HORIZONTAL: number;
    export const DIRECTION_VERTICAL: number;
    export const DIRECTION_ALL: number;
    
    export interface Input {
        timeStamp: Date;
        pointers: { clientX: number, clientY: number }[];
        center: { x: number, y: number };
        deltaX: number;
        deltaY: number;
        rotation: number;
        scale: number;
    }

    export class Manager {
        constructor(element: HTMLElement, options?: object);
    
        someProperty: string[];

        add(recognizer: Recognizer): Manager | Recognizer;
        remove(recognizer: Recognizer): Manager;
        get(recognizer: Recognizer|string): Recognizer | null;
        
        on(events: string, handler: Function): Manager;
        off(events: string, handler: Function): Manager;

        destroy(): void;
    }

    export class Recognizer {
        constructor(options: object);

        recognizeWith(otherRecognizer: Recognizer): Recognizer;
        requireFailure(otherRecognizer: Recognizer): Recognizer;
    }

    export class Press extends Recognizer {
        constructor(options?: object);
    }

    export class Pan extends Recognizer {
      constructor(options?: object);
    }

    export class Pinch extends Recognizer {
        constructor(options?: object);
    }

    export class Rotate extends Recognizer {
        constructor(options?: object);
    }
}