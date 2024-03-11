{/* <script> */}
jQuery(document).ready(function($){
    $('.homepage-hero .is-animated, .homepage-hero .button').addClass('animated fadeInUp');
    $('#sct').removeClass("inview");

    
    var ww = $(window).width();
    var isElementOnScreen = new OnScreen({
        tolerance: 100,
        debounce: 1,
        container: window
    });
    var map = $('.descriptive-images.how-it-works img').attr('src');
    $('.descriptive-images.how-it-works img').attr('src', "");
    
    isElementOnScreen.on('enter', 'section .is-animated', (element, event) => {
      element.classList.add('animated');
      element.classList.add('fadeInUp')
    });
		isElementOnScreen.on('enter', '.homepage-how .button', (element, event) => {
      element.classList.add('animated');
      element.classList.add('fadeInUp')
    });
    
    isElementOnScreen.on('enter', '#sct', (element, event) => {
    	$('#sct').addClass('inview');
      $('.descriptive-images.how-it-works img').attr('src', map);
		});
    
    connectAll();
    if (ww >767) {
      setActiveChallenge();
    	carouselSwitch();
      
        $('.cpm-carousel').css({
          height: "100vh",
          overflow: "hidden"
        });
    } else {
        $('.cpm-carousel').css({
          height: "auto",
          overflow: "visible"
        });
    }
    
    $(window).on("resize", function() { 
      connectAll();
      var ww = $(window).width();
    if (ww >767) {
      setActiveChallenge();
    	carouselSwitch();
        $('.cpm-carousel').css({
          height: "100vh",
          overflow: "hidden"
        });
    } else {
        $('.cpm-carousel').css({
          height: "auto",
          overflow: "visible"
        });
    }
    });

    $(window).on("scroll", function(){
        setActiveChallenge();
        carouselSwitch();
        connectAll();
    });

    function setActiveChallenge(){
        var chParent 			= $(".homepage-challenges"),
            chChild 			= chParent.find(".section-container"),
            chScroll			= $('.challenges-scroll'),
            chParentH 		= chParent.height(),
            chChildH 			= chChild.outerHeight(),
            chContOff 		= chChild.position().top,
            chScrollH 		= chParentH - chChildH,
            chPercent 		=  Math.floor((chContOff / chScrollH) * 100);

        if (chPercent >= 0 && chPercent < 33) {

            chScroll.css({ top: $('.challenges-list-item:nth-child(1)').position().top + 'px' });
            $('.challenges-grid').removeClass('slide-2 slide-3').addClass("slide-1");

        } else if (chPercent >= 33 && chPercent < 67) {

            chScroll.css({ top: $('.challenges-list-item:nth-child(2)').position().top + 'px' });
            $('.challenges-grid').removeClass('slide-1 slide-3').addClass("slide-2");

        } else if (chPercent >= 67 && chPercent <= 100) {

            chScroll.css({ top: $('.challenges-list-item:nth-child(3)').position().top + 'px' });
            $('.challenges-grid').removeClass('slide-1 slide-2').addClass("slide-3");

        }
        
        var chChildren =  $('.challenges-list .challenges-list-item').length;
        
    }
    function carouselSwitch() {
        var parent = $(".homepage-cpm .cpm-graph-container"),
            child = parent.find(".cpm-carousel"),
            pillarScroll = $('.pilars-scroll'),
            compScroll = $('.components-scroll'),
            parentH = parent.height(),
            childH = child.outerHeight(),
            scrollH = parentH - childH,
            contOff = child.position().top,
            percent = Math.floor((contOff / scrollH) * 100),
            pillarSO = $('.pilars-el:eq(0) .section-subheadline').outerHeight();


            if (percent >= 1 && percent <= 20) { 
              $('.cpm-carousel-inner').css('transform', 'translateY(0vh)');
              $('.pillars-graph-box.resources').addClass('active');
              $('.pil-box.pillars-resources').addClass('active');
            
              setTimeout(function(){
                $('.pillars-graph-box.activities').addClass('active');
                $('.pil-box.pillars-activities').addClass('active');
              }, 200)

              setTimeout(function(){
                $('.pillars-graph-box.marketing').addClass('active');
						    $('.pil-box.pillars-marketing').addClass('active');
              }, 400)

              setTimeout(function(){
                $('.pillars-graph-box.products').addClass('active');
                $('.pil-box.pillars-products').addClass('active');
              }, 600)

            } else if (percent > 20 && percent <= 40) {
              $('.cpm-carousel-inner').css('transform', 'translateY(-100vh)');
              $('.components-el').removeClass('active');
              $('.components-el').eq(0).addClass('active');
              $('.graph-box').removeClass('active-2 active-3').addClass('active-1')
              compScroll.css({ top: '0%' });
          } else if (percent > 40 && percent <= 60) {
              $('.cpm-carousel-inner').css('transform', 'translateY(-100vh)');
              $('.components-el').removeClass('active');
              $('.components-el').eq(1).addClass('active');
              $('.graph-box').removeClass('active-1 active-3').addClass('active-2')
              compScroll.css({ top: $('.components-el').eq(1).position().top + "px" });
          } else if (percent > 60 && percent <= 80) {
              $('.cpm-carousel-inner').css('transform', 'translateY(-100vh)');
              $('.components-el').removeClass('active');
              $('.components-el').eq(2).addClass('active');
              $('.graph-box').removeClass('active-1 active-2').addClass('active-3')
              compScroll.css({ top: $('.components-el').eq(2).position().top + "px" });
              $('.graph-to-output').addClass('active');
          } else if (percent > 80 && percent <= 100) {
              $('.cpm-carousel-inner').css('transform', 'translateY(-200vh)');
              $('.cpm-output-graph-container').addClass('active');
          }


        if (percent >= 1 && percent <= 12.5) {
        		$('.cpm-carousel-inner').css('transform', 'translateY(0vh)');
            $('.pilars-el').removeClass('active');
            $('.pilars-el').eq(0).addClass('active');
            pillarScroll.css({ top: '0px' });
            $('.pillars-graph-box.resources').addClass('active');
						$('.pil-box.pillars-resources').addClass('active');
        } else if (percent > 12.5 && percent <= 25) {
        		$('.cpm-carousel-inner').css('transform', 'translateY(0vh)');
            $('.pilars-el').removeClass('active');
            $('.pilars-el').eq(1).addClass('active');
            pillarScroll.css({ top: pillarSO + 'px' });
            $('.pillars-graph-box.activities').addClass('active');
            $('.pil-box.pillars-activities').addClass('active');
        } else if (percent > 25 && percent <= 37.5) {
        		$('.cpm-carousel-inner').css('transform', 'translateY(0vh)');
            $('.pilars-el').removeClass('active');
            $('.pilars-el').eq(2).addClass('active');
            pillarScroll.css({ top: pillarSO * 2 + 'px' });
            $('.pillars-graph-box.marketing').addClass('active');
						$('.pil-box.pillars-marketing').addClass('active');
        } else if (percent > 37.5 && percent <= 50) {
        		$('.cpm-carousel-inner').css('transform', 'translateY(0vh)');
            $('.pilars-el').removeClass('active');
            $('.pilars-el').eq(3).addClass('active');
            pillarScroll.css({ top: pillarSO * 3 + 'px' });
            $('.pillars-graph-box.products').addClass('active');
            $('.pil-box.pillars-products').addClass('active');
        } else if (percent > 50 && percent <= 62.5) {
        		$('.cpm-carousel-inner').css('transform', 'translateY(-100vh)');
            $('.components-el').removeClass('active');
            $('.components-el').eq(0).addClass('active');
            $('.graph-box').removeClass('active-2 active-3').addClass('active-1')
            compScroll.css({ top: '0%' });
        } else if (percent > 62.5 && percent <= 75) {
        		$('.cpm-carousel-inner').css('transform', 'translateY(-100vh)');
            $('.components-el').removeClass('active');
            $('.components-el').eq(1).addClass('active');
            $('.graph-box').removeClass('active-1 active-3').addClass('active-2')
            compScroll.css({ top: $('.components-el').eq(1).position().top + "px" });
        } else if (percent > 75 && percent <= 87.5) {
        		$('.cpm-carousel-inner').css('transform', 'translateY(-100vh)');
            $('.components-el').removeClass('active');
            $('.components-el').eq(2).addClass('active');
            $('.graph-box').removeClass('active-1 active-2').addClass('active-3')
            compScroll.css({ top: $('.components-el').eq(2).position().top + "px" });
            $('.graph-to-output').addClass('active');
        } else if (percent > 87.5 && percent <= 100) {
          	$('.cpm-carousel-inner').css('transform', 'translateY(-200vh)');
            $('.cpm-output-graph-container').addClass('active');
        }
    }

    function drawPath(path, goDown, bezieDown, bezierUp, startX, startY, endX, endY) {
      path.attr("d", "M"  + startX + " " + startY +
        " L" + startX + " " + goDown +
        " C" + startX + " " + (goDown + bezieDown)  + " " + endX + " " + (endY - bezierUp) + " " + endX + " " + endY);
    }


    function connectElements(path, offset, off, startElem, endElem) {
      var svgContainer = $("#cpmSvgContainer");
      var svgTop = svgContainer.offset().top;
      var svgLeft = svgContainer.offset().left;
      var startCoord = startElem.offset();
      var endCoord = endElem.offset();
      var startX = startCoord.left + 0.5 * startElem.outerWidth() - 1 - svgLeft;
      var startY = startCoord.top - startElem.outerHeight()  - svgTop;
      var endX = endCoord.left + 0.5 * endElem.outerWidth() - svgLeft;
      var endY = endCoord.top + (endElem.outerHeight() / 2) - svgTop;
      var goDown = startY + offset;
      var bezieDown = (endCoord.top - startCoord.top) / 3;
      var bezierUp = off;
      drawPath(path, goDown, bezieDown, bezierUp, startX, startY, endX, endY);
    }
    
    function connectAll() {
 			var i = $(window).height();
      $('#svg1').css('height', "0%");
      var res = $('#pill-res').parents(".pillars-graph-box").outerHeight() * 1.6;
      var act = $('#pill-act').parents(".pillars-graph-box").outerHeight() * 1.4;
      var mkt = $('#pill-mkt').parents(".pillars-graph-box").outerHeight() * 0.4;
      var pro = $('#pill-pro').parents(".pillars-graph-box").outerHeight() * 0.2;
      
    	connectElements($('.pil-box.pillars-resources path') , res, 250,  $("#pill-res"), $('#graphBoxTop'));
      connectElements($('.pil-box.pillars-activities path') , act, 300,  $("#pill-act"), $('#graphBoxTop'));
      connectElements($('.pil-box.pillars-marketing path') , mkt, 250,  $("#pill-mkt"), $('#graphBoxTop'));
      connectElements($('.pil-box.pillars-products path') , pro, 300,  $("#pill-pro"), $('#graphBoxTop'));
      
      connectElements($('.graph-to-output path'), pro, 350, $("#graphBoxBottom"), $('#out'));
      $('#svg1').css('height', "100%");
    }


});

// </script>

