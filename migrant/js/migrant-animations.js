jQuery(document).ready(function($){


// animate tap on disabled optionlink

const disabledLink            = $('.option-link.disabled');
const disabledAnimatedElement = $('.option-info');

disabledLink.on('click', function(e){
    e.preventDefault();
    $(this).css('pointer-events', 'none');
    disabledAnimatedElement.addClass('animated heartBeat');

    setTimeout(function(){
        disabledLink.css('pointer-events', 'all');
        disabledAnimatedElement.removeClass('heartBeat');
    }, 1000)
});


// move to next screen, while animating

var option = $('.choose .option-link:not(.disabled)');

option.on('click', function( ){
    $(this).parents('.options.active').addClass('is-transitioning');
    setTimeout(function(){
        $('.options.choose').removeClass('active');
        $('.options.send-receive').addClass('active');
    }, 600);
});




});