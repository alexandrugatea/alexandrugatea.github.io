jQuery(document).ready(function(){

   
    // back to top

    $(document).on('click','#toTop', function(){
        $("html, body").animate({scrollTop: 0}, 1000);
    });

    // open mobile menu
    var wW = $(window).width();

    if (wW < 768) {
        $('header .menu').on('click', function(){
            $(this).toggleClass('open');
        });
    }

    //ripple effect on buttons
    $(document).on("mousedown", "[data-ripple]", function (e) {

        var $self = $(this);

        if ($self.is(".btn-disabled")) {
            return;
        }
        if ($self.closest("[data-ripple]")) {
            e.stopPropagation();
        }

        var initPos = $self.css("position"),
            offs = $self.offset(),
            x = e.pageX - offs.left,
            y = e.pageY - offs.top,
            dia = Math.min(this.offsetHeight, this.offsetWidth, 100), // start diameter
            $ripple = $('<div/>', {
                class: "ripple",
                appendTo: $self
            });

        if (!initPos || initPos === "static") {
            $self.css({
                position: "relative"
            });
        }

        $('<div/>', {
            class: "rippleWave",
            css: {
                background: $self.data("ripple"),
                width: dia,
                height: dia,
                left: x - (dia / 2),
                top: y - (dia / 2),
            },
            appendTo: $ripple,
            one: {
                animationend: function () {
                    $ripple.remove();
                }
            }
        });
    });

    // circle animation for page transition

    var link = $('.link');

    link.on('click', function(e){

        // stop page redirect
        e.preventDefault();

        // get target url
        // var host = window.location.host;
        var goTo = $(this).attr('href');
        var elColor = $(this).css('backgroundColor');

        if (elColor == "rgba(0, 0, 0, 0)") {
            elColor = $(this).css('color');
        }


        var elHex = hexc(elColor);
        // $.cookie("clickedColor", hexc(elColor));
        sessionStorage.setItem('colour', '#' + hexc(elColor));

        // create circle
        $('body').addClass('locked').append('<div class="transition-circle" style="background: #' + elHex + '; top: ' + (e.clientY + document.body.scrollTop) + 'px; left: ' + e.clientX + 'px"></div>');

        setTimeout(function(){
            $(location).attr('href', goTo);
        }, 800);


    });

    // get color value
    function hexc(colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        colorVar = parts.join('');

        return colorVar;
    }

});









