export const enterFullscreen = () => document.body.requestFullscreen().catch(() => {});

export const exitFullscreen = () => document.exitFullscreen().catch(() => {});

export const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        enterFullscreen();
    }
    else {
        exitFullscreen();
    }
}