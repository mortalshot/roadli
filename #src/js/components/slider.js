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