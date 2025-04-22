(function ($) {
    "use strict";
    var wind = $(window);
    var sticky = $(".header-wrap");
    wind.on("scroll", function () {
      var scroll = wind.scrollTop();
      if (scroll < 100) {
        sticky.removeClass("sticky");
      } else {
        sticky.addClass("sticky");
      }
    });
    $(window).on("resize", function () {
      if ($(window).width() <= 1199) {
        $(".collapse.navbar-collapse").removeClass("collapse");
      } else {
        $(".navbar-collapse").addClass("collapse");
      }
    });
    $(".mobile-menu a").on("click", function () {
      $(".main-menu-wrap").addClass("open");
      $(".collapse.navbar-collapse").removeClass("collapse");
    });
    $(".mobile_menu a").on("click", function () {
      $(this).parent().toggleClass("open");
      $(".main-menu-wrap").toggleClass("open");
    });
    $(".menu-close").on("click", function () {
      $(".main-menu-wrap").removeClass("open");
    });
    $(".mobile-top-bar").on("click", function () {
      $(".header-top").addClass("open");
    });
    $(".close-header-top button").on("click", function () {
      $(".header-top").removeClass("open");
    });
    var $offcanvasNav = $(".navbar-nav"),
      $offcanvasNavSubMenu = $offcanvasNav.find(".dropdown-menu");
    $offcanvasNavSubMenu
      .parent()
      .prepend(
        '<span class="menu-expand"><i class="ri-arrow-down-s-line"></i></span>'
      );
    $offcanvasNavSubMenu.slideUp();
    $offcanvasNav.on("click", "li a, li .menu-expand", function (e) {
      var $this = $(this);
      if ($this.attr("href") === "#" || $this.hasClass("menu-expand")) {
        e.preventDefault();
        if ($this.siblings("ul:visible").length) {
          $this.siblings("ul").slideUp("slow");
        } else {
          $this.closest("li").siblings("li").find("ul:visible").slideUp("slow");
          $this.siblings("ul").slideDown("slow");
        }
      }
      if (
        $this.is("a") ||
        $this.is("span") ||
        $this.attr("class").match(/\b(menu-expand)\b/)
      ) {
        $this.parent().toggleClass("menu-open");
      } else if (
        $this.is("li") &&
        $this.attr("class").match(/\b('dropdown-menu')\b/)
      ) {
        $this.toggleClass("menu-open");
      }
    });
    AOS.init();
    
  })(jQuery);
  