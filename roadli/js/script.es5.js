"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  /*
      jQuery Masked Input Plugin
      Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
      Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
      Version: 1.4.1
  */

  !function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? require("jquery") : jQuery);
  }(function (a) {
    var b,
        c = navigator.userAgent,
        d = /iphone/i.test(c),
        e = /chrome/i.test(c),
        f = /android/i.test(c);
    a.mask = {
      definitions: {
        9: "[0-9]",
        a: "[A-Za-z]",
        "*": "[A-Za-z0-9]"
      },
      autoclear: !0,
      dataName: "rawMaskFn",
      placeholder: "-"
    }, a.fn.extend({
      caret: function caret(a, b) {
        var c;
        if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
          this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select());
        })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
          begin: a,
          end: b
        });
      },
      unmask: function unmask() {
        return this.trigger("unmask");
      },
      mask: function mask(c, g) {
        var h, i, j, k, l, m, n, o;

        if (!c && this.length > 0) {
          h = a(this[0]);
          var p = h.data(a.mask.dataName);
          return p ? p() : void 0;
        }

        return g = a.extend({
          autoclear: a.mask.autoclear,
          placeholder: a.mask.placeholder,
          completed: null
        }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
          "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null);
        }), this.trigger("unmask").each(function () {
          function h() {
            if (g.completed) {
              for (var a = l; m >= a; a++) {
                if (j[a] && C[a] === p(a)) return;
              }

              g.completed.call(B);
            }
          }

          function p(a) {
            return g.placeholder.charAt(a < g.placeholder.length ? a : 0);
          }

          function q(a) {
            for (; ++a < n && !j[a];) {
              ;
            }

            return a;
          }

          function r(a) {
            for (; --a >= 0 && !j[a];) {
              ;
            }

            return a;
          }

          function s(a, b) {
            var c, d;

            if (!(0 > a)) {
              for (c = a, d = q(b); n > c; c++) {
                if (j[c]) {
                  if (!(n > d && j[c].test(C[d]))) break;
                  C[c] = C[d], C[d] = p(d), d = q(d);
                }
              }

              z(), B.caret(Math.max(l, a));
            }
          }

          function t(a) {
            var b, c, d, e;

            for (b = a, c = p(a); n > b; b++) {
              if (j[b]) {
                if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
                c = e;
              }
            }
          }

          function u() {
            var a = B.val(),
                b = B.caret();

            if (o && o.length && o.length > a.length) {
              for (A(!0); b.begin > 0 && !j[b.begin - 1];) {
                b.begin--;
              }

              if (0 === b.begin) for (; b.begin < l && !j[b.begin];) {
                b.begin++;
              }
              B.caret(b.begin, b.begin);
            } else {
              for (A(!0); b.begin < n && !j[b.begin];) {
                b.begin++;
              }

              B.caret(b.begin, b.begin);
            }

            h();
          }

          function v() {
            A(), B.val() != E && B.change();
          }

          function w(a) {
            if (!B.prop("readonly")) {
              var b,
                  c,
                  e,
                  f = a.which || a.keyCode;
              o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault());
            }
          }

          function x(b) {
            if (!B.prop("readonly")) {
              var c,
                  d,
                  e,
                  g = b.which || b.keyCode,
                  i = B.caret();

              if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
                if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                  if (t(c), C[c] = d, z(), e = q(c), f) {
                    var k = function k() {
                      a.proxy(a.fn.caret, B, e)();
                    };

                    setTimeout(k, 0);
                  } else B.caret(e);

                  i.begin <= m && h();
                }

                b.preventDefault();
              }
            }
          }

          function y(a, b) {
            var c;

            for (c = a; b > c && n > c; c++) {
              j[c] && (C[c] = p(c));
            }
          }

          function z() {
            B.val(C.join(""));
          }

          function A(a) {
            var b,
                c,
                d,
                e = B.val(),
                f = -1;

            for (b = 0, d = 0; n > b; b++) {
              if (j[b]) {
                for (C[b] = p(b); d++ < e.length;) {
                  if (c = e.charAt(d - 1), j[b].test(c)) {
                    C[b] = c, f = b;
                    break;
                  }
                }

                if (d > e.length) {
                  y(b + 1, n);
                  break;
                }
              } else C[b] === e.charAt(d) && d++, k > b && (f = b);
            }

            return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l;
          }

          var B = a(this),
              C = a.map(c.split(""), function (a, b) {
            return "?" != a ? i[a] ? p(b) : a : void 0;
          }),
              D = C.join(""),
              E = B.val();
          B.data(a.mask.dataName, function () {
            return a.map(C, function (a, b) {
              return j[b] && a != p(b) ? a : null;
            }).join("");
          }), B.one("unmask", function () {
            B.off(".mask").removeData(a.mask.dataName);
          }).on("focus.mask", function () {
            if (!B.prop("readonly")) {
              clearTimeout(b);
              var a;
              E = B.val(), a = A(), b = setTimeout(function () {
                B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a));
              }, 10);
            }
          }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
            B.prop("readonly") || setTimeout(function () {
              var a = A(!0);
              B.caret(a), h();
            }, 0);
          }), e && f && B.off("input.mask").on("input.mask", u), A();
        });
      }
    });
  });
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

  var animItems = document.querySelectorAll('._anim-items');

  if (animItems.length > 0) {
    var animOnScroll = function animOnScroll(params) {
      for (var _index = 0; _index < animItems.length; _index++) {
        var animItem = animItems[_index];
        var animItemHeight = animItem.offsetHeight;
        var animItemOffset = offset(animItem).top;
        var animStart = 55; // Коэффициент старта анимации

        var animItemPoint = window.innerHeight - animItemHeight / animStart;

        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
          animItem.classList.add('_active');
        } else {
          if (!animItem.classList.contains('_anim-no-hide')) {
            animItem.classList.remove('_active');
          }
        }
      }
    };

    var offset = function offset(el) {
      var rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      };
    };

    window.addEventListener('scroll', animOnScroll);
    setTimeout(function () {
      animOnScroll();
    }, 300);
  }

  $('.accordion__title').click(function (event) {
    var accordionid = $(this).closest('.accordion').attr("id");

    if ($('#' + accordionid).hasClass('accordion-one')) {
      $('#' + accordionid + ' ' + '.accordion__title').not($(this)).removeClass('active');
      $('#' + accordionid + ' ' + '.accordion__text').not($(this).next()).slideUp(300);
    }

    $(this).toggleClass('active').next().slideToggle(300);
  });
  var popupLinks = document.querySelectorAll('.popup-link');
  var body = document.querySelector('body');
  var lockPadding = document.querySelectorAll(".lock-padding");
  var unlock = true;
  var timeout = 800;

  if (popupLinks.length > 0) {
    var _loop3 = function _loop3(_index2) {
      var popupLink = popupLinks[_index2];
      popupLink.addEventListener("click", function (e) {
        var popupName = popupLink.getAttribute('href').replace('#', '');
        var currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      });
    };

    for (var _index2 = 0; _index2 < popupLinks.length; _index2++) {
      _loop3(_index2);
    }
  }

  var popupCloseIcon = document.querySelectorAll('.close-popup');

  if (popupCloseIcon.length > 0) {
    var _loop4 = function _loop4(_index3) {
      var el = popupCloseIcon[_index3];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    };

    for (var _index3 = 0; _index3 < popupCloseIcon.length; _index3++) {
      _loop4(_index3);
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      var popupActive = document.querySelector('.popup.open');

      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }

      currentPopup.classList.add('open');
      currentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive) {
    var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (unlock) {
      popupActive.classList.remove('open');

      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    var lockPaddingValue = window.innerWidth - document.querySelector('.site__main').offsetWidth + 'px'; //!обратить внимание на контейнер

    if (lockPadding.length > 0) {
      for (var _index4 = 0; _index4 < lockPadding.length; _index4++) {
        var el = lockPadding[_index4];
        el.style.paddingRight = lockPaddingValue;
      }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (var _index5 = 0; _index5 < lockPadding.length; _index5++) {
          var el = lockPadding[_index5];
          el.style.paddingRight = '0px';
        }
      }

      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      var popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  });

  (function () {
    // проверяем поддержку
    if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
        var node = this;

        while (node) {
          if (node.matches(css)) return node;else node = node.parentElement;
        }

        return null;
      };
    }
  })();

  (function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
    }
  })();

  ; // === FORM PHONE MASK START ===

  $('.form__input--phone').mask("+7 (999) 999 99 99"); // === FORM PHONE MASK END ===
  // === FORM__SELECT--SEARCH START ===

  $('.form__select--search').select2({
    placeholder: "Город",
    width: '100%',
    language: {
      noResults: function noResults() {
        return "Результатов не найдено";
      }
    }
  });
  $('.form__item--city .select2').click(function () {
    $('.select2-search__field').attr("placeholder", "Введите ваш город");
  }); // === FORM__SELECT--SEARCH END ===
  // === CARD ORDER START ===

  var modalCardInner = $('#quickCardOrder .offer__card-inner');
  var modalCardName = $('#quickCardOrder .offer__card-name');
  var modalCardImage = $('#quickCardOrder .offer__card-image img');
  var modalCardStatus = $('#quickCardOrder .card-order__card-name span');
  $('.offer__btn').click(function (e) {
    var cardTab = $(this).closest('.tabs').find('.tabs__triggers-item--active');
    var cardParent = $(this).closest('.tabs__content-item');
    var cardInner = $(cardParent).find('.offer__card-inner');
    var cardInnerClass = $(cardParent).find('.offer__card-inner').attr('class');
    var cardInnerBGI = $(cardInner).css('background-image');
    var cardName = $(cardParent).find('.offer__card-name').text();
    var cardImage = $(cardParent).find('.offer__card-image img').attr('src');
    modalCardInner.css('background-image', cardInnerBGI);
    modalCardName.text(cardName);
    $(modalCardInner).addClass(cardInnerClass);
    $(modalCardImage).attr('src', cardImage);
    $(modalCardStatus).text(cardTab.text());
  }); // === CARD ORDER END ===
  // === CARD ORDER START ===
  // === CARD ORDER END ===
});