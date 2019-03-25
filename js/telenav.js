jQuery(document).ready(function($){
    
    // check window width
    var wW = $(window).width();

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

    // init the floating button from the bottom of the page
    $('.floating-dial-top-center button').float(0, 0, 90, 90, 225, 315, 1, 'fa-link', 'fa-unlink');


    // init the slick carousel inside the concept

    var carousel = $('.concept-carousel');

    carousel.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        autoPlay: false,
        dots: true
    });

    carousel.on('afterChange', function(event, slick, currentSlide) {
        if (slick.$slides.length - 1 == currentSlide) {
            $('.splash').find('.btn-telenav').addClass('animated slideInUp');
        }
      });


      // change the screen 

      var screenChanger = $('#concept [data-target]');

      screenChanger.on('click', function(){
        var toGo = $(this).attr('data-target');

        $('.frame.active').removeClass('active').addClass('exit');
        
        setTimeout(function(){
            $('.frame').removeClass('exit');
        }, 1500);

        $('.application').find('.' + toGo).addClass('active');

      });
});
