events.on("ready", function () {
  $(".abasMixin").each(function () {
    const $box = $(this);

    $box.find(".boxMessage .msg").addClass("hide");
    $box.find(".boxMessage .msg0").removeClass("hide");
    $box.find(".img").addClass("hide");
    $box.find(".img0").removeClass("hide");

    $box.find(".aba0").addClass("open");

    $box.find(".btn").on("click", function () {
      const indice = $(this).attr("aba");
      const $messages = $box.find(".boxMessage .msg");
      const $buttons = $box.find(".btn");

      $messages.addClass("hide");
      $box.find(".msg" + indice).removeClass("hide");
      $box.find(".img").addClass("hide");
      $box.find(".img" + indice).removeClass("hide");

      $buttons.removeClass("open");
      $(this).addClass("open");
    });
  });
});
