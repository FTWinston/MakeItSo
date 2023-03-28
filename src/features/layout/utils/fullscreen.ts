export const enterFullscreen = () => document.body.requestFullscreen().catch(() => {});

export const exitFullscreen = () => document.exitFullscreen().catch(() => {});