$(".pulse").addClass("wow  pulse infinite");
$(".zoomIn").addClass("wow  zoomIn");
$(".heartBeat").addClass("wow  heartBeat");
$(".left").addClass("wow  fadeInLeft");
$(".right").addClass("wow  fadeInRight");
$(".down").addClass("wow  fadeInDown");
$(".up").addClass("wow  fadeInUp");
$(".in").addClass("wow  fadeIn");

for (var i = 1; i < 50; i++) {
  var tempo = i / 2;
  $(".delay" + i).css("animation-delay", tempo + "s");
  $(".delay" + i).addClass("delay_tablet delay_mobile");
}

events.on("ready", function () {
  $(".completeScorm").isInViewportComplete({
    container: $(".mr-full"),
    call: function () {
      console.log("complete one-page");
      scorm.setCompleted();
    },
  });

  $(".pulse").addClass("wow pulse infinite");
  $(".zoomIn").addClass("wow zoomIn");
  $(".heartBeat").addClass("wow heartBeat");
  $(".left").addClass("wow fadeInLeft");
  $(".right").addClass("wow fadeInRight");
  $(".down").addClass("wow fadeInDown");
  $(".up").addClass("wow fadeInUp");
  $(".in").addClass("wow fadeIn");

  for (var i = 1; i < 50; i++) {
    var tempo = i / 2;
    $(".delay" + i).css("animation-delay", tempo + "s");
  }

  $.getScript("../../scripts/wow.min.js", function () {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: ".mr-full", // optional scroll container selector, otherwise use window,
      resetAnimation: true, // reset animation on end (default is true)
    });
    wow.init();
  });
});
