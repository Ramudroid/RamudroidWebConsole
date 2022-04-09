    function deviceMotionHandler(event) {
        console.log("deviceMotionHandler", event);
    }

    // if (window.DeviceMotionEvent) {
    //     window.addEventListener('devicemotion', deviceMotionHandler);
    //     setTimeout(stopJump, 3 * 1000);
    // }


    function handleOrientation(event) {
        var absolute = event.absolute;
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;
        console.log(" absolute", absolute,
            "alpha", alpha,
            "beta", beta,
            "gamma", gamma);
        // Do stuff with the new orientation data
    }

    // if (window.DeviceOrientationEvent) {
    //     window.addEventListener('deviceorientation', handleOrientation);
    //     setTimeout(stopJump, 3 * 1000);
    // }