var scroll_lock = false;
var mapSection = [];
var setMenu = () => {
  let st = $(window).scrollTop();
  if (st > 150) {
    $('header').addClass('sticky');
  } else {
    $('header').removeClass('sticky');
  }
}

var setSteps = () => {
  var have_steps = false;
  var window_scrolltop = $(window).scrollTop();
  if (window_scrolltop == 0) {
    $('header nav li').removeClass('active');
    $('header nav li').eq(0).addClass('active');
    have_steps = true;
  }
  else if (window_scrolltop + $(window).height() == $(document).height()) {
    $('header nav li').removeClass('active');
    $('header nav li').last().addClass('active');
    have_steps = true;
  }
  if (!have_steps) {
    $('.home-section').not(':first-of-type, :last-of-type').each(function() {
      var index = $(this).index();
      var section_offset_top = $(this).offset();
      var section_offset_top = section_offset_top.top;
      if (window_scrolltop >= section_offset_top - 200) {
        $('header nav li').removeClass('active');
        $('header nav li').eq(index-1).addClass('active');
      }
    });
  };
}

$(document).ready(function() {

  $("a.scrollspy").on('click', function(event) {
  if (this.hash !== "") {
      scroll_lock = true;
      event.preventDefault();
      $('header nav').removeClass('active');
      $('header nav ul li').removeClass('active');
      $(this).parent('li').addClass('active');
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 50
      }, 1000);
      setTimeout(function() {scroll_lock = false;}, 1000);
  }
  });

  $('#rmenu').click(function() {
    $('header nav').toggleClass('active');
  });

  $('.venobox').venobox();
  $(window).scroll(function() {
    setMenu();
    if (!scroll_lock) {
      setSteps();
    }
  });

});

window.onload = function() {

  setTimeout(function() {
    new WOW().init();
    $('#loader').fadeOut(1500, function() {
      $('#loader').remove();
    },0);

    var $container = $('#grid-container');
    $container.isotope({
      resizable: false,
      animationEngine: 'best-available',
      animationOptions: {
        duration: 300,
        easeing: 'linear',
      },
      masonry: {
          columnWidth: 0,
          gutterWidth: 5
      }
    });

    var resizeTimer;
    $(window).on('resize', function(e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        $container.isotope('reLayout');
      }, 250);
      setMenu();
      setSteps();
    });

    $('.iso-controls button').click(function() {
      var mFilter = $(this).data('filter');
      $container.isotope({ filter: mFilter});
    });

    setMenu();
    setSteps();

  }, 1000);
};
