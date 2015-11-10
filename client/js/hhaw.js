function runParallax () {
    var controller = new ScrollMagic.Controller();
    // build scenes
    new ScrollMagic.Scene({
        offset: 0,
        duration: 0,
        triggerHook: 0,
        reverse: true
    })
    .setPin("#pane1")
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#pane2",
        duration: 0,
        triggerHook: 0,
        reverse: true
    })
    .setPin("#pane2")
    .addTo(controller);

    // new ScrollMagic.Scene({
    //     triggerElement: "#pane3",
    //     duration: 0,
    //     triggerHook: 0,
    //     reverse: true
    // })
    // .setPin("#pane3")
    // .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#pane4",
        duration: 0,
        triggerHook: 0,
        reverse: true
    })
    .setPin("#pane4")
    .addTo(controller);

    // new ScrollMagic.Scene({
    //     triggerElement: "#pane5",
    //     duration: 0,
    //     triggerHook: 0,
    //     reverse: true
    // })
    // .setPin("#pane5")
    // .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#pane6",
        duration: 0,
        triggerHook: 0,
        reverse: true
    })
    .setPin("#pane6")
    .addTo(controller);

    // new ScrollMagic.Scene({
    //     triggerElement: "#pane7",
    //     duration: 0,
    //     triggerHook: 0,
    //     reverse: true
    // })
    // .setPin("#pane7")
    // .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#pane8",
        duration: 0,
        triggerHook: 0,
        reverse: true
    })
    .setPin("#pane8")
    .addTo(controller);

    // new ScrollMagic.Scene({
    //     triggerElement: "#pane9",
    //     duration: 0,
    //     triggerHook: 0,
    //     reverse: true
    // })
    // .setPin("#pane9")
    // .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#pane10",
        duration: 0,
        triggerHook: 0,
        reverse: true
    })
    .setPin("#pane10")
    .addTo(controller);

    // new ScrollMagic.Scene({
    //     triggerElement: "#pane11",
    //     duration: 0,
    //     triggerHook: 0,
    //     reverse: true
    // })
    // .setPin("#pane11")
    // .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#pane12",
        duration: 0,
        triggerHook: 0,
        reverse: true
    })
    .setPin("#pane12")
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#pane13",
        duration: 0,
        triggerHook: 0,
        reverse: true
    })
    .setPin("#pane13")
    .addTo(controller);

    $("#pane13").css("min-height",($(window).height() - ($("#pane10").height() + $("#pane12").height())));
}

// Don't don't do scrolling effect on mobile
if (!(/Mobi/.test(navigator.userAgent))) {
    $(document).on("ready", runParallax);

    var reload = window.location.reload.bind(window.location);
    $(window).resize(_.debounce(reload, 500));
}
