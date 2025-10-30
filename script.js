$(document).ready(function() {
    // Select the menu toggle button and the mobile navigation menu
    const $menuToggle = $('.menu-toggle');
    const $mobileMenu = $('#mobile-menu');

    // Attach a click event handler to the menu toggle button
    $menuToggle.on('click', function() {
        // Use .slideToggle() for a smooth reveal/hide animation
        $mobileMenu.slideToggle(300); 

        // Change the button icon
        // Check if the mobile menu is currently visible (using :visible pseudo-selector)
        if ($mobileMenu.is(':visible')) {
            // If visible after toggle, set to 'X' (close icon)
            $menuToggle.html('&times;'); 
        } else {
            // If hidden after toggle, set to 'Hamburger' icon
            $menuToggle.html('&#9776;');
        }
    });

    // Close mobile menu when a link is clicked
    $mobileMenu.find('a').on('click', function() {
        // Use .slideUp() to hide the menu
        $mobileMenu.slideUp(300);
        // Reset the icon to Hamburger
        $menuToggle.html('&#9776;');
    });
});