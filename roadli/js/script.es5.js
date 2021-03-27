"use strict";

$(document).ready(function () {
  // Dynamic Adapt v.1
  // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
  // e.x. data-da=".item,992,2"
  // Andrikanych Yevhen 2020
  // https://www.youtube.com/c/freelancerlifestyle
  "use strict";

  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    var _this2 = this;

    var _this = this; // массив объектов


    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_"; // массив DOM-элементов

    this.nodes = document.querySelectorAll("[data-da]"); // наполнение оbjects объктами

    for (var i = 0; i < this.nodes.length; i++) {
      var node = this.nodes[i];
      var data = node.dataset.da.trim();
      var dataArray = data.split(",");
      var оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects); // массив уникальных медиа-запросов

    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    }); // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске

    var _loop = function _loop(_i) {
      var media = _this2.mediaQueries[_i];
      var mediaSplit = String.prototype.split.call(media, ',');
      var matchMedia = window.matchMedia(mediaSplit[0]);
      var mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом

      var оbjectsFilter = Array.prototype.filter.call(_this2.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });

      _this2.mediaHandler(matchMedia, оbjectsFilter);
    };

    for (var _i = 0; _i < this.mediaQueries.length; _i++) {
      _loop(_i);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (var i = 0; i < оbjects.length; i++) {
        var оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      for (var _i2 = 0; _i2 < оbjects.length; _i2++) {
        var _оbject = оbjects[_i2];

        if (_оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(_оbject.parent, _оbject.element, _оbject.index);
        }
      }
    }
  }; // Функция перемещения


  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);

    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }

    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }

    destination.children[place].insertAdjacentElement('beforebegin', element);
  }; // Функция возврата


  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);

    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }; // Функция получения индекса внутри родителя


  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    var array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  }; // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max


  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  var da = new DynamicAdapt("max");
  da.init();
  var iconMenu = document.querySelector('.header__burger');
  var menuBody = document.querySelector('.header__menu');
  var header = document.querySelector('.header');
  var nav = document.querySelector('.header__body');
  var aimSection = document.querySelectorAll('menu-aim');
  var menuItem = document.querySelectorAll('.menu__item');
  var menuTarget = document.querySelectorAll('.menu__item--target a');
  var headerMenuLink = document.querySelectorAll('.header__menu .menu-item a'); // === SHOW MENU ON MOBILE DEVICES START ===

  if (iconMenu) {
    iconMenu.addEventListener('click', function () {
      document.body.classList.toggle('lock');
      iconMenu.classList.toggle('active');
      menuBody.classList.toggle('active');
    });
  } // === SHOW MENU ON MOBILE DEVICES END ===
  // === ADD ACTIONS WHEN THE PAGE IS SCROLLED START ===


  var scroll = $(window).scrollTop();

  if (scroll > 0) {
    $(header).addClass('bg');
  }

  $(window).on('scroll', function () {
    scroll = $(window).scrollTop();

    if (scroll > 0) {
      $(header).addClass('bg');
    } else {
      $(header).removeClass('bg');
    }
  }); // === ADD ACTIONS WHEN THE PAGE IS SCROLLED END ===
  // === ACTIVE STATE OF THE MENU WHEN SCROLLING THE PAGE START ===

  var navHeight = $(nav).outerHeight();
  window.addEventListener('orientationchange', function () {
    navHeight = $(nav).outerHeight();
  }, false);
  $(menuTarget).on('click', function () {
    var id = $(this).attr('href');
    $('body,html').animate({
      scrollTop: $(id).offset().top - navHeight - 30
    }, 1000);

    if (iconMenu.classList.contains('active')) {
      removeActive();
    }
  }); // === ACTIVE STATE OF THE MENU WHEN SCROLLING THE PAGE END ===
  // === REMOVE ACTIVE FUNCTION START ===

  function removeActive() {
    document.body.classList.remove('lock');
    iconMenu.classList.remove('active');
    menuBody.classList.remove('active');
  } // === REMOVE ACTIVE FUNCTION END ===
  // === SHOW SUB-MENU START ===


  var isMobile = {
    Android: function Android() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
  };

  if (isMobile.any()) {
    document.body.classList.add('_touch');
    var menuArrows = document.querySelectorAll('.menu__arrow');

    if (menuArrows.length > 0) {
      var _loop2 = function _loop2(index) {
        var menuArrow = menuArrows[index];
        menuArrow.addEventListener('click', function (e) {
          menuArrow.parentElement.classList.toggle('active');
        });
      };

      for (var index = 0; index < menuArrows.length; index++) {
        _loop2(index);
      }

      var mediaQueryMenu = window.matchMedia('(max-width: 575px)');

      if (mediaQueryMenu.matches) {
        $(menuArrows).click(function () {
          $(this).closest(menuItem).find('.menu__sub-list').slideToggle(300);
        });
      }
    }
  } else {
    document.body.classList.add('_pc');
  } // === SHOW SUB-MENU END ===
  // === SHOW SUB-MENU START ===
  // === SHOW SUB-MENU END ===


  $('.clients__list').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 575,
      settings: {
        slidesToShow: 2
      }
    }]
  }); // $('.gallery__thumbnails').slick({
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     asNavFor: '.gallery__main',
  //     arrows: false,
  //     focusOnSelect: true,
  //     vertical: true,
  //     verticalSwiping: true,
  //     responsive: [
  //         {
  //           breakpoint: 991,
  //           settings: {
  //             vertical: false,
  //             verticalSwiping: false,
  //           }
  //         },
  //       ]
  // });
  // $('#productGallery .tabs-triggers__item').click(function() {
  //     $('.gallery__main').slick('refresh');
  //     $('.gallery__thumbnails').slick('refresh');
  // })

  $('.tabs__triggers-item').click(function (e) {
    e.preventDefault();
    var tabsid = $(this).closest('.tabs').attr("id");
    $('#' + tabsid + ' ' + '.tabs__triggers-item').removeClass('tabs__triggers-item--active');
    $('#' + tabsid + ' ' + '.tabs__content-item').removeClass('tabs__content-item--active');
    $(this).addClass('tabs__triggers-item--active');
    $($(this).attr('href')).addClass('tabs__content-item--active');
  });
  var tabsList = document.querySelectorAll('.tabs');

  if (tabsList.length > 0) {
    for (var i = 0; i < tabsList.length; i++) {
      var element = tabsList[i];
      var elementID = $(element).attr('id');
      $("#" + elementID + " .tabs__triggers-item:first").click();
    }
  }
});