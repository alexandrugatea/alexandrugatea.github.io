jQuery(document).ready(function ($) {


    // animate tap on disabled optionlink

    const disabledLink = $('.option-link.disabled');
    const disabledAnimatedElement = $('.option-info');

    disabledLink.on('click', function (e) {
        e.preventDefault();
        $(this).css('pointer-events', 'none');
        disabledAnimatedElement.addClass('animated heartBeat');

        setTimeout(function () {
            disabledLink.css('pointer-events', 'all');
            disabledAnimatedElement.removeClass('heartBeat');
        }, 1000)
    });


    // move to next screen, while animating

    var option = $('.options.choose .option-link:not(.disabled)');

    option.on('click', function () {
        $(this).parents('.home').addClass('switched');
    });

    // animate inputs on page load

    $('.carousel-item').each(function(){
        var delay = 100;
        $(this).find('.is-animated').each(function(){
            $(this).css('animation-delay', delay + 'ms');
            delay += 100;
        });
    });


    $('.carousel-item.active .is-animated').addClass('animated fadeInUp');

    $('.carousel').on('slid.bs.carousel', function(){
        $('.carousel-item.active .is-animated').addClass('animated fadeInUp');
    })

});