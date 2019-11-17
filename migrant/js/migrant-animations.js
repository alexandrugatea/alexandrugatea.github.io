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
        $('body').addClass('locked');
    });

    $('.carousel-item.active .is-animated').addClass('animated fadeInUp');

    $('.carousel').on('slid.bs.carousel', function () {
        $('.carousel-item.active .is-animated').addClass('animated fadeInUp');
    });

    // enable receive form button if all inputs are filled

    if ($('#receiveForm').length > 0) {
        var receiveInput = $(this).find('[required]');

        // calculate required fields
        for (i=0; i <= $(this).find(receiveInput).length; i++) {
            var required = i;
        }

        receiveInput.on('blur', function (e) {
            if ($(this).val().length > 1) {
                required--;
                $(this).removeClass('error');
            } else {
                $(this).addClass('error');
            }

            if (required === 0) {
                $('[type="submit"]').prop("disabled", false);
                addReceivedInfo();
            } else {
                $('[type="submit"]').prop("disabled", true);
            }
        });
    }

    if ($('#sendForm').length > 0) {
        $('#sendForm .btn').prop("disabled", true).parent().css('opacity', '0.5');

        $('.carousel-item').each(function () {
            var delay = 100;
            var sendInput = $(this).find('[required]');
            var next = $(this).find('.btn');
    
            // animate inputs on page load
            $(this).find('.is-animated').each(function () {
                $(this).css('animation-delay', delay + 'ms');
                delay += 100;
            });

            // calculate required fields
            for (i=0; i <= $(this).find(sendInput).length; i++) {
                var required = i;
            }
            
            sendInput.on('blur', function (e) {
                if ($(this).val().length > 1) {
                    required--;
                    $(this).removeClass('error');
                } else {
                    $(this).addClass('error');
                }

                if (required === 0) {
                    next.removeAttr("disabled").parent().css('opacity', '1');
                } else {
                    next.prop("disabled", true).parent().css('opacity', '0.5');
                }
            });
        });
    }

    // fill received data
    function addReceivedInfo() {
        $(".receive-amount span").text("4720").parent().removeClass("inactive");
        $(".receive-sender span").text("Red John \n 90 High Street, Bristol, UK");
    }

    $("#receiveForm").on('submit', function (e) {
        e.preventDefault();
        $("#receiveForm [type='submit']").text('Money Received');
        setTimeout(function () {
            goBack();
        }, 4000);
    });
    
    // return to homepage after success animation is done
    if ($('.page').hasClass('success')) {
        setTimeout(function () {
            goBack();
        }, 8000);
    }

    function goBack() {
        window.location.href = '/migrant/index.html';
    };

});