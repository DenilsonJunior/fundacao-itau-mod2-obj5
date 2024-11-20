events.on('ready', function () {

    var language = navigate.currentScreen.model.language;
    if(language == "pt-br"){

        if (navigate.currentScreen.model.acessibility.customLibras) {

            scorm.saveObject( 'libras', navigate.currentScreenUid );

            $(".librasDiv").draggable({
                containment : "#main",
                zIndex:true,
                iframeFix: true
            });

            $(".btnLibras").on('click',function () {
                activeLibras();
            });

            $(".librasDiv .closeLibras").on('click', function () {
                closeLibras();
            });

            $("[data-libras]").on("click", function () {

                scorm.saveObject( 'libras', $(this).attr("data-libras") );
                liberateLibras();

            });
            
            // slide ballon
            $("body").on("libras", function (e, url) {

                scorm.saveObject( 'libras', url );
                liberateLibras();

            });

            liberateLibras();
        }
    }else{
        $(".btnLibras").addClass('hide');
    }
});

var liberateLibras = function () {
    if (scorm.loadObject("librasActive") == true) {
        $(".librasDiv").fadeIn();
        $(".librasDiv").css("display", "flex");
        
        callLibras();
    }
}

var activeLibras = function () {

    scorm.saveObject("librasActive", true);
    liberateLibras();
}

var callLibras =  function () {

    var url = navigate.currentScreenUid;
    if( scorm.loadObject("libras") ){
      url = scorm.loadObject("libras");
    }

    console.log("*Libras ID: " + url);

    var pathVideo = `../../assets/video/libras/${url}.mp4`;
    var newHtml = `<video src="${pathVideo}"
                          class="videoLibras" 
                          width="100%" 
                          height="100%" 
                          controls 
                          autoplay 
                          muted 
                          type="video/mp4">
                  </video>`;
    setTimeout(function () {
        $(".librasDiv").find('.video').empty();
        $(".librasDiv").find('.video').html(newHtml);
        $('body').trigger('callVideoLibras');
    }, 500);
  
}

var closeLibras = function () {
    scorm.saveObject("librasActive", false);
    $(".librasDiv").css("display", "none");
    $(".librasDiv").find('.video').empty();
}

