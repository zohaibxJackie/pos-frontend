(function ($) {
  "use strict";

  /*
  |--------------------------------------------------------------------------
  | Template Name: Posing
  | Author: ThemeMarch
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Accordian
  | 7. Counter Animation
  | 8. Review
  | 9. Modal Video
  | 10. Toast Notifications
  | 11. Form Validation & Submission
  |
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    $(window).trigger("scroll");
    $(window).trigger("resize");
    preloader();
  });

  $(function () {
    $(window).trigger("resize");
    mainNav();
    onePage();
    stickyHeader();
    dynamicBackground();
    slickInit();
    modal();
    accordian();
    counterInit();
    review();
    if ($.exists(".wow")) {
      new WOW().init();
    }
  });

  $(window).on("scroll", function () {
    stickyHeader();
    counterInit()
  });



  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $(".cs-preloader_in").fadeOut();
    $(".cs-preloader").delay(150).fadeOut("slow");
  }

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $(".cs-nav").append('<span class="cs-munu_toggle"><span></span></span>');
    $(".menu-item-has-children").append(
      '<span class="cs-munu_dropdown_toggle"></span>'
    );
    $(".cs-munu_toggle").on("click", function () {
      $(this).toggleClass("cs-toggle_active").siblings(".cs-nav_list").slideToggle();
    });
    $(".cs-munu_dropdown_toggle").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });
    $('.cs-smoth_scroll').on('click', function () {
      $('.cs-munu_toggle').removeClass('cs-toggle_active').siblings(".cs-nav_list").slideToggle();
    })
  }

  // Smoth Animated Scroll
  function onePage() {
    $(".cs-smoth_scroll").on("click", function () {
      var thisAttr = $(this).attr("href");
      if ($(thisAttr).length) {
        var scrollPoint = $(thisAttr).offset().top - 40;
        $("body,html").animate(
          {
            scrollTop: scrollPoint,
          },
          600
        );
      }
      return false;
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $(".cs-sticky-header").addClass("cs-sticky-active");
    } else {
      $(".cs-sticky-header").removeClass("cs-sticky-active");
    }
  }

  /*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }

  /*--------------------------------------------------------------
    5. Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    if ($.exists(".cs-slider")) {
      $(".cs-slider").each(function () {
        // Slick Variable
        var $ts = $(this).find(".cs-slider_container");
        var $slickActive = $(this).find(".cs-slider_wrapper");
        // Auto Play
        var autoPlayVar = parseInt($ts.attr("data-autoplay"), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr("data-speed"), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr("data-loop"), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr("data-center"), 10));
        // Slider Center
        var variableWidthVar = Boolean(
          parseInt($ts.attr("data-variable-width"), 10)
        );
        // Pagination
        var paginaiton = $(this).find(".cs-pagination").hasClass("cs-pagination");
        // Slide Per View
        var slidesPerView = $ts.attr("data-slides-per-view");
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == "responsive") {
          var slidesPerView = parseInt($ts.attr("data-add-slides"), 10);
          var lgPoint = parseInt($ts.attr("data-lg-slides"), 10);
          var mdPoint = parseInt($ts.attr("data-md-slides"), 10);
          var smPoint = parseInt($ts.attr("data-sm-slides"), 10);
          var xsPoing = parseInt($ts.attr("data-xs-slides"), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr("data-fade-slide"));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: "7%",
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find(".cs-left_arrow"),
          nextArrow: $(this).find(".cs-right_arrow"),
          appendDots: $(this).find(".cs-pagination"),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          // slidesToScroll: slidesPerView,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
                // slidesToScroll: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
                // slidesToScroll: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
                // slidesToScroll: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
                // slidesToScroll: xsPoing,
              },
            },
          ],
        });
      });
    }
  }

  /*--------------------------------------------------------------
    6. Accordian
  --------------------------------------------------------------*/
  function accordian() {
    $(".cs-accordian").children(".cs-accordian-body").hide();
    $(".cs-accordian.active").children(".cs-accordian-body").show();
    $(".cs-accordian_head").on("click", function () {
      $(this).parent(".cs-accordian").siblings().children(".cs-accordian-body").slideUp(250);
      $(this).siblings().slideDown(250);
      $(this).parent().parent().siblings().find(".cs-accordian-body").slideUp(250);
      /* Accordian Active Class */
      $(this).parents(".cs-accordian").addClass("active");
      $(this).parent(".cs-accordian").siblings().removeClass("active");
    });
  }

  /*--------------------------------------------------------------
    7. Counter Animation
  --------------------------------------------------------------*/
  function counterInit() {
    if ($.exists(".odometer")) {
      $(window).on("scroll", function () {
        function winScrollPosition() {
          var scrollPos = $(window).scrollTop(),
            winHeight = $(window).height();
          var scrollPosition = Math.round(scrollPos + winHeight / 1.2);
          return scrollPosition;
        }

        $(".odometer").each(function () {
          var elemOffset = $(this).offset().top;
          if (elemOffset < winScrollPosition()) {
            $(this).html($(this).data("count-to"));
          }
        });
      });
    }
  }

  /*--------------------------------------------------------------
    8. Review
  --------------------------------------------------------------*/
  function review() {
    $('.cs-review').each(function () {
      var review = $(this).data('review');
      var reviewVal = (review * 20) + "%";
      $(this).find('.cs-review_in').css('width', reviewVal);
    });
  }

  /*--------------------------------------------------------------
    9. Modal Video
  --------------------------------------------------------------*/
  function modal() {
    $(".cs-modal_btn").on('click', function () {
      var modalData = $(this).attr("data-modal")
      $(`[data-modal='${modalData}']`).addClass('active')
      $(this).parents('.cs-modal').removeClass('active')
    })
    $(".cs-close_modal, .cs-close_overlay").on('click', function () {
      var modalData = $(this).parents('.cs-modal').attr("data-modal")
      $(`[data-modal='${modalData}']`).removeClass('active')
    })
  }

  /*--------------------------------------------------------------
    10. Toast Notifications
  --------------------------------------------------------------*/
  function showToast(message, type) {
    // Remove any existing toast
    $('.cs-toast').remove();

    var icon = type === 'success' ? '✅' : '❌';
    var toast = $(
      '<div class="cs-toast cs-toast-' + type + '">' +
      '<span class="cs-toast-icon">' + icon + '</span>' +
      '<span class="cs-toast-msg">' + message + '</span>' +
      '<button class="cs-toast-close" aria-label="Close">×</button>' +
      '</div>'
    );

    $('body').append(toast);

    // Trigger show
    setTimeout(function () {
      toast.addClass('cs-toast-show');
    }, 10);

    // Auto-dismiss after 4.5s
    var dismissTimer = setTimeout(function () {
      dismissToast(toast);
    }, 4500);

    // Manual close
    toast.find('.cs-toast-close').on('click', function () {
      clearTimeout(dismissTimer);
      dismissToast(toast);
    });
  }

  function dismissToast(toast) {
    toast.removeClass('cs-toast-show');
    setTimeout(function () { toast.remove(); }, 400);
  }

  /*--------------------------------------------------------------
    11. Form Validation & Submission
  --------------------------------------------------------------*/
  function validateField($field) {
    var val = $field.val().trim();
    var placeholder = ($field.attr('placeholder') || '').toLowerCase();
    var ok = false;

    if (placeholder.indexOf('email') !== -1) {
      ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    } else {
      ok = val.length > 0;
    }

    $field.toggleClass('cs-field-error', !ok).toggleClass('cs-field-success', ok);
    return ok;
  }

  function handleFormSubmit($form) {
    var $fields = $form.find('.cs-form_field');
    var $submitBtn = $form.find('button[type="submit"], button.cs-btn').first();
    var valid = true;

    // Clear previous states
    $fields.removeClass('cs-field-error cs-field-success');

    // Validate each field
    $fields.each(function () {
      if (!validateField($(this))) {
        valid = false;
      }
    });

    if (!valid) {
      // Determine language
      var isSpanish = window.location.pathname.indexOf('/es') !== -1 ||
        window.location.href.indexOf('es.html') !== -1;
      var errMsg = isSpanish
        ? 'Por favor completa todos los campos obligatorios correctamente.'
        : 'Please fill in all required fields correctly.';

      showToast(errMsg, 'error');

      // Scroll to first error
      var $firstError = $form.find('.cs-field-error').first();
      if ($firstError.length) {
        $('body,html').animate({ scrollTop: $firstError.offset().top - 120 }, 400);
        $firstError.focus();
      }
      return;
    }

    // Show loading state
    var originalHtml = $submitBtn.html();
    $submitBtn.addClass('cs-form_loading').html('<span>Sending…</span>');

    // ----------------------------------------------------------------
    // Replace the simulation below with a real $.ajax() call:
    //
    // $.ajax({
    //   url: '/api/contact',           // <-- your endpoint
    //   method: 'POST',
    //   contentType: 'application/json',
    //   data: JSON.stringify(formData),
    //   success: function () { /* show success toast */ },
    //   error:   function () { /* show error toast  */ }
    // });
    // ----------------------------------------------------------------

    setTimeout(function () {
      $submitBtn.removeClass('cs-form_loading').html(originalHtml);
      $fields.val('').removeClass('cs-field-error cs-field-success');

      var isSpanish = window.location.pathname.indexOf('/es') !== -1 ||
        window.location.href.indexOf('es.html') !== -1;

      var successMsg = isSpanish
        ? '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.'
        : 'Message sent successfully! We\'ll be in touch soon.';

      showToast(successMsg, 'success');

      // Close modal if form is inside one
      var $parentModal = $form.closest('.cs-modal');
      if ($parentModal.length) {
        var modalData = $parentModal.attr('data-modal');
        setTimeout(function () {
          $('[data-modal="' + modalData + '"]').removeClass('active');
        }, 1600);
      }
    }, 1200);
  }

  // Attach submit handlers when DOM is ready
  $(function () {
    // Intercept form submit
    $(document).on('submit', 'form', function (e) {
      var $form = $(this);
      if ($form.find('.cs-form_field').length > 0) {
        e.preventDefault();
        handleFormSubmit($form);
      }
    });

    // Also handle cs-btn clicks inside forms (some buttons lack type="submit")
    $(document).on('click', 'form button.cs-btn', function (e) {
      var $form = $(this).closest('form');
      if ($form.length && $form.find('.cs-form_field').length > 0) {
        e.preventDefault();
        handleFormSubmit($form);
      }
    });

    // Live validation on blur
    $(document).on('blur', 'form .cs-form_field', function () {
      var val = $(this).val().trim();
      if (val.length > 0) {
        validateField($(this));
      }
    });
  });

})(jQuery); // End of use strict
