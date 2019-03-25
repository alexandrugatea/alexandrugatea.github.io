jQuery(document).ready(function($){
    
    // check window width
    var wW = $(window).width();
    // check window height
    var wH = $(window).height();

    // and only add animation effects if the viewport is a tablet or higher 
    // visibility is dependent of css
    if (wW > 768) {

        $('#app img').onScreen({
            doIn: function() {
                $(this).addClass('animated fadeInUp')},
                tolerance: 50
        });

    }

    // switch between prototype and concept

    var switcher = $('[data-switch]');

    switcher.on('click', function(){
        $(this).toggleClass('concept prototype btn-primary btn-accent');
        $("#app").toggleClass('inactive');
        $("#concept").toggleClass('active');
    });


    $('.floating-dial-top-center button').float(0, 0, 90, 90, 225, 315, 1, 'fa-link', 'fa-unlink');


    // resolution check 
    if (wW < 1366 && wH < 768) {
        $('.modal').css('display', 'flex');
    }

});
