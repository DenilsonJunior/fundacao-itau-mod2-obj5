events.on("ready", function () {
  $(".container-accordeon").each(function (indice, item) {
    var titles = $(item).find(".accordeon-title");
    var contents = $(item).find(".accordeon-texto");
    var nextLiberate = $(item).attr("nextLiberate")
      ? $(item).attr("nextLiberate")
      : false;

    titles.find(".seta-container").addClass("animated infinite pulse");
    titles.on("click", function () {
      $(this).removeClass("animated infinite pulse");
      var title = $(this);
      contents.filter(":visible").slideUp(function () {
        $(this).prev(".accordeon-title").removeClass("is-opened");
      });
      var content = title.next(".accordeon-texto");
      if (!content.is(":visible")) {
        content.slideDown(function () {
          title.addClass("is-opened");
        });
      }

      $(this).find(".seta-container").removeClass("animated infinite pulse");
      $(this).addClass("open");

      verifyNext();
    });

    function verifyNext() {
      var botoes = $(titles).toArray();
      var todosBotoesClicados = botoes.every((botao) => {
        return $(botao).hasClass("open");
      });

      if (todosBotoesClicados) {
        $("body").trigger("nextLiberate");
        // $('.btn-next').removeClass('hide');
      }
    }
  });
});
