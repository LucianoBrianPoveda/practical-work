jQuery('document').ready(function($) {

    var menuButton = $('.menuIcon'),
        menu = $('.navList ul');

        menu.removeClass('navbarNav');
        
        menuButton.click(function() {

            if (menu.hasClass('navbarNav')) {

                menu.removeClass('navbarNav');
            } else {
                menu.addClass('navbarNav');
            }
        });
});