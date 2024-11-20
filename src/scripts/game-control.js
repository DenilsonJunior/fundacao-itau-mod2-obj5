events.on("ready", function () {
  controlAudio();
  controleAvatar();
  controlHeader();
  controlMenuScreen();
  controlCarregamento();
  controlResetFase();
  controlPoster();
  controlModulo();
  controlPremio();
  controlPodcast();
});

function controlAudio() {
  $(".efeitosonoroBase .efeitosonoro").each(function () {
    this.volume = 0;
  });

  var audioObj = bridge.statusAudioObj();
  if (audioObj.status == 1) {
    $("header .btnAudio .playAudio").addClass("hide");
    $("header .btnAudio .pauseAudio").removeClass("hide");

    $(".efeitosonoroBase .efeitosonoro").each(function () {
      this.volume = 0.2;
    });
  } else {
  }

  $("header .btnAudio").on("click", function () {
    bridge.statusAudio();

    var audioObj = bridge.statusAudioObj();
    if (audioObj.status == 0) {
      $(this).find(".playAudio").removeClass("hide");
      $(this).find(".pauseAudio").addClass("hide");
      $(".efeitosonoroBase .efeitosonoro").each(function () {
        this.volume = 0;
      });
    } else {
      $(this).find(".playAudio").addClass("hide");
      $(this).find(".pauseAudio").removeClass("hide");
      $(".efeitosonoroBase .efeitosonoro").each(function () {
        this.volume = 0.2;
      });
    }
  });
}

function controleAvatar() {
  if (scorm.loadObject("name")) {
    $(".nome").text(scorm.loadObject("name"));
    $(".nameAvatar").text(scorm.loadObject("name"));
  }

  $("header .containerAvatar").on("click", function () {
    bridge.avatarPlay();
    scorm.saveObject("avatarReturn", navigate.currentScreenUid);
    navigate.goto("04_tela");
  });

  resetAvatar();
  function resetAvatar() {
    $(".avatarContainer .cabelo").addClass("hide");
    $(".avatarContainer .estetoscopio").addClass("hide");
    $(".avatarContainer .pulseira").addClass("hide");
    $(".avatarContainer .relogio").addClass("hide");
    $(".avatarContainer .chapeu").addClass("hide");
    $(".avatarContainer .oculos").addClass("hide");
    $(".avatarContainer .sapato").addClass("hide");
    $(".avatarContainer .roupa").addClass("hide");
    $(".avatarContainer .cabelo").addClass("hide");

    if (scorm.loadObject("avatar")) {
      const {
        oculos,
        relogio,
        estetoscopio,
        pulseira,
        sapatoModel,
        cabeloModel,
        chapeuModel,
        corPele,
        corCabelo,
        roupaModel,
      } = scorm.loadObject("avatar");

      $(".avatarContainer .oculos").removeClass(oculos ? "hide" : "");
      $(".avatarContainer .relogio").removeClass(relogio ? "hide" : "");
      $(".avatarContainer .estetoscopio").removeClass(
        estetoscopio ? "hide" : ""
      );
      $(".avatarContainer .pulseira").removeClass(pulseira ? "hide" : "");

      $(`.avatarContainer .cabelo${cabeloModel}`).removeClass("hide");
      $(`.avatarContainer .chapeu${chapeuModel}`).removeClass("hide");
      $(`.avatarContainer .roupa${roupaModel}`).removeClass("hide");
      $(`.avatarContainer .sapato${sapatoModel}`).removeClass("hide");

      $(".avatarContainer .pele path").css("fill", corPele);
      $(".avatarContainer .cabelo .fundo path").css("fill", corCabelo);
    }
  }
}

function controlHeader() {
  $(".modal-close").focusin(function () {
    $("body").trigger("modal-close");
  });

  $(".modal-close").on("click", function () {
    $("body").trigger("modal-close");
  });

  $("#attention .btnNot").on("click", function () {
    $("#attention").css("display", "none");
  });

  $("#attention .btnYes").on("click", function () {
    bridge.audioPause("time");
    scorm.set("cmi.suspend_data", "{}");
    navigate.goto("03_tela");
  });
}

function controlMenuScreen() {
  function handlerMenuScreen() {
    $(".menuBase .area").addClass("inativo");

    if (scorm.loadObject("area")) {
      var check = scorm.loadObject("area");

      for (var i = 1; i <= check; i++) {
        var area = $(".menuBase .area" + i);
        area.removeClass("inativo");

        if (i < check) {
          area.addClass("checkIt");
        } else {
          area.addClass("current");
          $(".menuBase .hand").addClass("handPag" + i);
          $(".menuBase .hand").attr("page", area.attr("page"));
        }
      }
    }

    if (scorm.loadObject("podcast")) {
      if (scorm.loadObject("podcast") < 3) {
        $(".menuBase .podcast").addClass("active");
      } else {
        $(".menuBase .podcast").addClass("checkIt");
      }
    }
  }

  handlerMenuScreen();
  $("body").on("activeArea", function (e, area) {
    if (scorm.loadObject("area")) {
      if (parseInt(scorm.loadObject("area")) <= parseInt(area)) {
        scorm.saveObject("area", parseInt(area));
      }
    } else {
      scorm.saveObject("area", parseInt(area));
    }

    handlerMenuScreen();
  });
}

function controlCarregamento() {
  var _page = 7; /// valor inicial // remove as 7 primeiras telas
  var _pageFinais = 4;

  console.log("XXXX");
  console.log("navigate", navigate);

  var index = navigate.currentScreen.index + 1 - _page;
  var total = navigate.pagesTotal - _page;
  var porc = parseInt((index * 100) / total);

  var carregamento = scorm.loadObject("porc") ? scorm.loadObject("porc") : 0;

  if (navigate.currentScreenUid != "99_tela_podcast") {
    if (navigate.currentScreen.index >= _page) {
      console.log("index", index);
      console.log("total", total);
      console.log("porc", porc);
      console.log("XXXX");

      if (scorm.loadObject("porc")) {
        if (porc >= parseInt(scorm.loadObject("porc"))) {
          scorm.saveObject("porc", porc);
        }
      } else {
        scorm.saveObject("porc", porc);
      }

      carregamento = scorm.loadObject("porc");
      if (carregamento == 1) {
        carregamento = 0;
      }
    }
  }

  $("header .progress .porc .porcInt").css("width", carregamento + "%");
  $(".porc .porcInt").css("width", carregamento + "%");
  console.log("carregamento: " + carregamento);
}

function controlPoster() {
  function handlerPost() {
    $(".posterBaseView .poster").addClass("hide");

    if (scorm.loadObject("poster")) {
      var poster = scorm.loadObject("poster");

      $(".barraPoster").removeClass(
        "barraPoster0 barraPoster1 barraPoster2 barraPoster3 barraPoster4"
      );

      $(".barraPoster").addClass("barraPoster" + poster);
      $(".posterBaseView .poster" + poster).removeClass("hide");
      $(".barraPoster .poster" + poster).removeClass("hide");
    }
  }
  handlerPost();
  $("body").on("controlPoster", function (e, poster) {
    setTimeout(function () {
      bridge.audioPlay("poster");
    }, 1000 * 1);

    $(".posterContainerBase").removeClass("hide");

    if (scorm.loadObject("poster")) {
      if (parseInt(scorm.loadObject("poster")) <= parseInt(poster)) {
        scorm.saveObject("poster", parseInt(poster));
      }
    } else {
      scorm.saveObject("poster", parseInt(poster));
    }

    handlerPost();
  });
}

function controlPodcast() {
  function handlerPodcast() {
    if (scorm.loadObject("podcast")) {
      var podcast = scorm.loadObject("podcast");

      for (var i = 1; i <= podcast; i++) {
        $(".list .el" + i).removeClass("elInativo");
      }
    }
  }
  handlerPodcast();
  $("body").on("controlPodcast", function (e, poster) {
    if (scorm.loadObject("podcast")) {
      if (parseInt(scorm.loadObject("podcast")) <= parseInt(poster)) {
        scorm.saveObject("podcast", parseInt(poster));
      }
    } else {
      scorm.saveObject("podcast", parseInt(poster));
    }

    handlerPodcast();
  });
}

function controlModulo() {
  function handlerModulo(area) {
    const modulo = "modulo" + area;

    if (scorm.loadObject(modulo)) {
      var check = parseInt(scorm.loadObject(modulo));

      for (var i = 1; i <= check; i++) {
        if (i < check) {
          $(".mapAreaModulo .it" + i).addClass("checkIt");
        } else {
          $(".mapAreaModulo .it" + i).addClass("active");
        }
      }
    }
  }

  // handlerModulo();
  $("body").on("controlModulo", function (e, area, item) {
    const modulo = "modulo" + area;
    if (scorm.loadObject(modulo)) {
      if (parseInt(scorm.loadObject(modulo)) <= parseInt(item)) {
        scorm.saveObject(modulo, parseInt(item));
      }
    } else {
      scorm.saveObject(modulo, parseInt(item));
    }

    handlerModulo(area);
  });
}

function controlPremio() {
  const handlerPremio = (premio) => {
    $(`.${premio} .xd`).addClass("inactive");

    if (scorm.loadObject(premio)) {
      var check = parseInt(scorm.loadObject(premio));

      for (var i = 1; i <= check; i++) {
        $(`.${premio} .xd${i}`).removeClass("inactive");
      }
    }
  };

  handlerPremio("mochila");
  handlerPremio("conquistas");

  $("body").on("controlPremio", function (e, premio, item) {
    if (scorm.loadObject(premio)) {
      if (parseInt(scorm.loadObject(premio)) <= parseInt(item)) {
        scorm.saveObject(premio, parseInt(item));
      }
    } else {
      scorm.saveObject(premio, parseInt(item));
    }
    handlerPremio(premio);
  });
}

function controlResetFase() {
  $("body").on("faseReset", function (e, fase) {});

  $("body").on("faseResetEnd", function (e, fase) {});
}
