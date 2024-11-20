events.on("ready", function () {
  $("header .helpBtn").on("click", function () {
    $("#help").removeClass("hide");
  });

  $("#help .modal-closeHelp").on("click", function () {
    $("#help").addClass("hide");
  });

  var prevHide = $("body").attr("prev-hide");
  var nextHide = $("body").attr("next-hide");
  var menuHide = $("body").attr("menu-hide");
  var prevPage = $("body").attr("prev-page");
  var nextPage = $("body").attr("next-page");

  var prevClass = ".container-arrow-left";
  var nextClass = ".container-arrow-right";

  if (typeof menuHide !== "undefined" && menuHide !== false) {
    $("header .menuBtn").addClass("hide");
  }

  if (typeof prevHide !== "undefined" && prevHide !== false) {
    $(prevClass).addClass("hide");
  }

  if (typeof nextHide !== "undefined" && nextHide !== false) {
    $(nextClass).addClass("hide");
  }

  $(prevClass).on("click", function () {
    if (typeof prevPage !== "undefined" && prevPage !== false) {
      if (prevPage != "prev") {
        navigate.goto(prevPage);
      } else {
        navigate.prev();
      }
    } else {
      navigate.prev();
    }
  });

  $(nextClass).on("click", function () {
    if (typeof nextPage !== "undefined" && nextPage !== false) {
      if (nextPage != "prev") {
        navigate.goto(nextPage);
      } else {
        navigate.next();
      }
    } else {
      navigate.next();
    }
  });

  /// call modal, arcodeon, slide
  $("body").on("nextLiberate", function () {
    $(nextClass).removeClass("hide");
  });

  $("body").on("orquestras", function (_this, menu, item) {
    var orquestra = "orquestra" + menu;
    if (scorm.loadObject(orquestra)) {
      if (scorm.loadObject(orquestra) <= item) {
        scorm.saveObject(orquestra, item);
      }
    } else {
      scorm.saveObject(orquestra, item);
    }
  });
});
