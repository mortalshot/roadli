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