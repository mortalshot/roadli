$(document).ready(function () {
    @@include('index.js');

    // === FORM PHONE MASK START ===
    $('.form__input--phone').mask("+7 (999) 999 99 99");
    // === FORM PHONE MASK END ===

    // === FORM__SELECT--SEARCH START ===
    $('.form__select--search').select2({
        placeholder: "Город",
        width: '100%',
        language: {
            noResults: function () {
                return "Результатов не найдено"
            },
        }
    });

    $('.form__item--city .select2').click(function () {
        $('.select2-search__field').attr("placeholder", "Введите ваш город");
    })
    // === FORM__SELECT--SEARCH END ===

    // === CARD ORDER START ===
    const modalCardInner = $('#quickCardOrder .offer__card-inner');
    const modalCardName = $('#quickCardOrder .offer__card-name');
    const modalCardImage = $('#quickCardOrder .offer__card-image img');
    const modalCardStatus = $('#quickCardOrder .card-order__card-name span');

    $('.offer__btn').click(function (e) {
        const cardTab = $(this).closest('.tabs').find('.tabs__triggers-item--active');
        const cardParent = $(this).closest('.tabs__content-item');
        const cardInner = $(cardParent).find('.offer__card-inner');
        const cardInnerClass = $(cardParent).find('.offer__card-inner').attr('class');

        const cardInnerBGI = $(cardInner).css('background-image');
        const cardName = $(cardParent).find('.offer__card-name').text();
        const cardImage = $(cardParent).find('.offer__card-image img').attr('src');

        modalCardInner.css('background-image', cardInnerBGI);
        modalCardName.text(cardName);
        $(modalCardInner).addClass(cardInnerClass);
        $(modalCardImage).attr('src', cardImage);
        $(modalCardStatus).text(cardTab.text());

    });
    // === CARD ORDER END ===

    // === CARD ORDER START ===

    // === CARD ORDER END ===
})