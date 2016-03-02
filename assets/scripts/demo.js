$(function() {
  var aArray, aChild, aChildren, ahref, i;
  $('.js-demo-1-btn').on('click', function(e) {
    e.preventDefault();
    $(this).next().find('.js-demo-1_r').toggleClass('col-md-6-10 col-md-1-10');
    return $(this).next().find('.js-demo-2_l').toggleClass('col-md-4-10 col-md-9-10');
  });
  $(window).bind('scroll', function() {
    if ($(window).scrollTop() > $('#header').outerHeight()) {
      return $('#menu').addClass('fixed');
    } else {
      return $('#menu').removeClass('fixed');
    }
  });

  /**
   * This part causes smooth scrolling using scrollto.js
   * We target all a tags inside the nav, and apply the scrollto.js to it.
   */
  $('#menu a').click(function(evn) {
    var target;
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 400);
        return false;
      }
    }
  });

  /**
   * This part handles the highlighting functionality.
   * We use the scroll functionality again, some array creation and 
   * manipulation, class adding and class removing, and conditional testing
   */
  aChildren = $('#menu li').children();
  aArray = [];
  i = 0;
  while (i < aChildren.length) {
    aChild = aChildren[i];
    ahref = $(aChild).attr('href');
    aArray.push(ahref);
    i++;
  }
  $(window).scroll(function() {
    var i;
    var divHeight, divPos, docHeight, navActiveCurrent, theID, windowHeight, windowPos;
    windowPos = $(window).scrollTop();
    windowHeight = $(window).height();
    docHeight = $(document).height();
    i = 0;
    while (i < aArray.length) {
      theID = aArray[i];
      divPos = $(theID).offset().top;
      divHeight = $(theID).height();
      if (windowPos >= divPos && windowPos < divPos + divHeight) {
        $('a[href=\'' + theID + '\']').addClass('active');
      } else {
        $('a[href=\'' + theID + '\']').removeClass('active');
      }
      i++;
    }
    if (windowPos + windowHeight === docHeight) {
      if (!$('#menu li:last-child a').hasClass('active')) {
        navActiveCurrent = $('.active').attr('href');
        $('a[href=\'' + navActiveCurrent + '\']').removeClass('active');
        $('#menu li:last-child a').addClass('active');
      }
    }
  });
});
