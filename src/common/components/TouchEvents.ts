export interface TouchEvents {
    onMouseDown?: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onMouseUp?: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onMouseMove?: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onMouseLeave?: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onTouchStart?: (e: React.TouchEvent<Element>) => void;
    onTouchEnd?: (e: React.TouchEvent<Element>) => void;
    onTouchMove?: (e: React.TouchEvent<Element>) => void;
}