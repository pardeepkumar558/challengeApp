$(document).ready(function () {

    $(document).on("scroll", function () {
        if ($(document).scrollTop() > 86) {
            $("#header").addClass("shrink");
        }
        else {
            $("#header").removeClass("shrink");
        }
    });
    
    $("#collapsibleNavbar").click(function () {
        $(this).toggleClass("show");
    });
});
