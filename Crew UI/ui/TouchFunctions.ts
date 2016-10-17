const enum SwipeDir {
    Up = 0,
    Down,
    Left,
    Right
};

const TouchFunctions = {
    detectSwipe(surface, minDist, maxTime, callback) {
        if (minDist === undefined)
            minDist = 100;
        if (maxTime === undefined)
            maxTime = 500;
        
        var swipedir,
        startX, startY,
        distX, distY,
        maxPerpScale = 0.67,
        startTime, duration;

        surface.addEventListener('touchstart', function(e) {
            var touch = e.changedTouches[0];
            swipedir = null;
            distX = 0; distY = 0;
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
            e.preventDefault();
        }, false);

        surface.addEventListener('touchmove', function(e) {
            e.preventDefault(); // prevent scrolling when inside DIV
        }, false);

        surface.addEventListener('touchend', function(e) {
            e.preventDefault();
            
            var touch = e.changedTouches[0];
            distX = touch.clientX - startX;
            distY = touch.clientY - startY;
            duration = new Date().getTime() - startTime;
            
            if (duration > maxTime)
                return;

            var absX = Math.abs(distX), absY = Math.abs(distY);
            if (absX >= minDist && absY <= maxPerpScale * absX)
                swipedir = (distX < 0) ? SwipeDir.Left : SwipeDir.Right;
            else if (absY >= minDist && absX <= maxPerpScale * absY)
                swipedir = (distY < 0) ? SwipeDir.Up : SwipeDir.Down;
            else
                return;
            callback(swipedir, startX, startY);
        }, false);
    },
    detectTap(surface, maxDist, maxTime, callback) {
        if (maxDist === undefined)
            maxDist = 75;
        if (maxTime === undefined)
            maxTime = 750;
        
        var startX, startY,
        distX, distY,
        startTime, duration;

        surface.addEventListener('touchstart', function(e) {
            var touch = e.changedTouches[0];
            distX = 0; distY = 0;
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
            e.preventDefault();
        }, false);

        surface.addEventListener('touchmove', function(e) {
            e.preventDefault(); // prevent scrolling when inside DIV
        }, false);

        surface.addEventListener('touchend', function(e) {
            e.preventDefault();
            
            var touch = e.changedTouches[0];
            distX = touch.clientX - startX;
            distY = touch.clientY - startY;
            duration = new Date().getTime() - startTime;
            if (duration > maxTime)
                return;

            if (Math.abs(distX) > maxDist || Math.abs(distY) > maxDist)
                return;
            
            callback(startX, startY);
        }, false);
    },
    detectMovement(surface: HTMLElement, callback: (dx: number, dy: number) => void) {
        var ongoingTouches = {};
        var distX; var distY;
        
        surface.addEventListener('touchstart', function(e) {
            e.preventDefault();
            
            for (var i=0; i<e.changedTouches.length; i++) {
                var touch = e.changedTouches[i];
                ongoingTouches[touch.identifier] = { clientX: touch.clientX, clientY: touch.clientY };
            }
        }, false);

        surface.addEventListener('touchmove', function(e) {
            e.preventDefault();
            
            for (var i=0; i<e.touches.length; i++) {
                var currentTouch = e.touches[i]; // if using changedTouches instead, additional (stationary) presses wouldn't slow movement
                var prevTouch = ongoingTouches[currentTouch.identifier];
                if (prevTouch === undefined)
                    continue;
                
                distX = currentTouch.clientX - prevTouch.clientX;
                distY = currentTouch.clientY - prevTouch.clientY;

                callback(distX, distY);
            }
        }, false);

        var touchEnd = function(e) {
            e.preventDefault();
            
            for (var i=0; i<e.changedTouches.length; i++) {
                var touch = e.changedTouches[i];
                ongoingTouches[touch.identifier] = undefined;
                callback(0, 0);
            }
        };
        
        surface.addEventListener('touchend', touchEnd, false);
        surface.addEventListener('touchcancel', touchEnd, false);
        surface.addEventListener('touchleave', touchEnd, false);
    }
};