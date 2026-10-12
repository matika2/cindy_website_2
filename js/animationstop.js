$(document).ready(function(){
    addCustomTransitionOnHover(".custom-button");
    addCustomTransitionOnHover(".display-table td");
    addCustomTransitionOnHover(".plus-minus-button");
    addCustomTransitionOnHoverWithTarget("#hamburger-menu","animated-menu");
});

function addCustomTransitionOnHover(selector) {
    $(selector).mouseover(
        function () {
            $(this).addClass("custom-transition");
        }).mouseout(function () {
        $(this).removeClass("custom-transition");
    });
}

function addCustomTransitionOnHoverWithTarget(selector, target) {
    $(selector).mouseover(
        function () {
            $(target).addClass("custom-transition");
        }).mouseout(function () {
        $(target).removeClass("custom-transition");
    });
}
