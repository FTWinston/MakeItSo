export interface TouchEvents {
    onClick?: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
    onMouseDown?: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
    onMouseUp?: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
    onMouseMove?: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
    onTouchStart?: (e: React.TouchEvent<HTMLCanvasElement>) => void;
    onTouchEnd?: (e: React.TouchEvent<HTMLCanvasElement>) => void;
    onTouchMove?: (e: React.TouchEvent<HTMLCanvasElement>) => void;
}