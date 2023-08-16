function initializeCarousel(carouselId) {
    var carousel = jQuery('#' + carouselId),
      threshold = 30,
      slideWidth,
      dragStart,
      dragEnd;
  
    jQuery('#next_' + carouselId).click(function () { shiftSlide(carouselId, -1) });
    jQuery('#prev_' + carouselId).click(function () { shiftSlide(carouselId, 1) });
  
    carousel.on('mousedown touchstart', function (event) {
      if (carousel.hasClass('transition')) return;
      if (event.type === 'touchstart') {
        dragStart = event.originalEvent.touches[0].pageX;
      } else {
        dragStart = event.pageX;
      }
  
      jQuery(this).on('mousemove touchmove', function (event) {
        event.preventDefault();
        if (event.type === 'touchmove') {
          dragEnd = event.originalEvent.touches[0].pageX;
        } else {
          dragEnd = event.pageX;
        }
        jQuery(this).css('transform', 'translateX(' + dragPos() + 'px)');
      });
  
      jQuery(document).on('mouseup touchend', function () {
        if (dragPos() > threshold) {
          return shiftSlide(carouselId, 1);
        }
        if (dragPos() < -threshold) {
          return shiftSlide(carouselId, -1);
        }
        shiftSlide(carouselId, 0);
      });
    });
  
    function dragPos() {
      return dragEnd - dragStart;
    }
  
    function shiftSlide(carouselId, direction) {
      var carousel = jQuery('#' + carouselId);
      slideWidth = carousel.find('.slide_jquery:first-child').width();
  
      if (carousel.hasClass('transition')) return;
      dragEnd = dragStart;
      jQuery(document).off('mouseup touchend');
      carousel.off('mousemove touchmove')
        .addClass('transition')
        .css('transform', 'translateX(' + (direction * slideWidth) + 'px)');
  
      setTimeout(function () {
        if (direction === 1) {
          carousel.find('.slide_jquery:first-child').before(carousel.find('.slide_jquery:last-child'));
        } else if (direction === -1) {
          carousel.find('.slide_jquery:last-child').after(carousel.find('.slide_jquery:first-child'));
        }
        carousel.removeClass('transition');
        carousel.css('transform', 'translateX(0px)');
      }, 700);
    }
  }
  
  if (window.addEventListener) {
    window.addEventListener('load', function () {
      initializeCarousel('carousel_jquery');
      initializeCarousel('carousel_jquery2');
      initializeCarousel('carousel_jquery3');
      // Add more carousel IDs as needed
    }, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', function () {
      initializeCarousel('carousel_jquery');
      initializeCarousel('carousel_jquery2');
      initializeCarousel('carousel_jquery3');
      // Add more carousel IDs as needed
    });
  }  