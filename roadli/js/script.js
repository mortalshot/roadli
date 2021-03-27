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
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
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
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
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

const da = new DynamicAdapt("max");
da.init();

const iconMenu = document.querySelector('.header__burger');
const menuBody = document.querySelector('.header__menu');
const header = document.querySelector('.header');
const nav = document.querySelector('.header__body');
const aimSection = document.querySelectorAll('menu-aim');
const menuItem = document.querySelectorAll('.menu__item');
const menuTarget = document.querySelectorAll('.menu__item--target a');
const headerMenuLink = document.querySelectorAll('.header__menu .menu-item a');

// === SHOW MENU ON MOBILE DEVICES START ===
if (iconMenu) {
    iconMenu.addEventListener('click', function () {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
    })
}
// === SHOW MENU ON MOBILE DEVICES END ===

// === ADD ACTIONS WHEN THE PAGE IS SCROLLED START ===
let scroll = $(window).scrollTop();
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
});
// === ADD ACTIONS WHEN THE PAGE IS SCROLLED END ===

// === ACTIVE STATE OF THE MENU WHEN SCROLLING THE PAGE START ===
let navHeight = $(nav).outerHeight();

window.addEventListener('orientationchange', function () {
    navHeight = $(nav).outerHeight();
}, false);

$(menuTarget).on('click', function () {
    const id = $(this).attr('href');
    $('body,html').animate({ scrollTop: $(id).offset().top - navHeight - 30 }, 1000);

    if (iconMenu.classList.contains('active')) {
        removeActive();
    }
});
// === ACTIVE STATE OF THE MENU WHEN SCROLLING THE PAGE END ===

// === REMOVE ACTIVE FUNCTION START ===
function removeActive() {
    document.body.classList.remove('lock');
    iconMenu.classList.remove('active');
    menuBody.classList.remove('active');
}
// === REMOVE ACTIVE FUNCTION END ===

// === SHOW SUB-MENU START ===
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android()
            || isMobile.BlackBerry()
            || isMobile.iOS()
            || isMobile.Opera()
            || isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener('click', function (e) {
                menuArrow.parentElement.classList.toggle('active');
            });
        }

        const mediaQueryMenu = window.matchMedia('(max-width: 575px)');
        if (mediaQueryMenu.matches) {
            $(menuArrows).click(function () {
                $(this).closest(menuItem).find('.menu__sub-list').slideToggle(300);
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}
// === SHOW SUB-MENU END ===

// === SHOW SUB-MENU START ===

// === SHOW SUB-MENU END ===
$('.clients__list').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
            }
        },
    ]
});

// $('.gallery__thumbnails').slick({
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

let tabsList = document.querySelectorAll('.tabs');
if (tabsList.length > 0) {
    for (let i = 0; i < tabsList.length; i++) {
        const element = tabsList[i];
        let elementID = $(element).attr('id');
        $("#" + elementID + " .tabs__triggers-item:first").click();
    }
}



})