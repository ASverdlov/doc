$(function() {
    var doc_main_page_title = '.documentation-main-page-title';
    var b_block_wrapper = '.b-block-wrapper';
    var b_section_title = '.b-section-title';
    var nav_button = "#start-menu-nav-button";
    var b_page_header = '.b-page_header';
    var doc_main_page_content = '.documentation-main-page-content';
    var start_menu = '.start-menu';

    if ($(doc_main_page_title)) {
      $(doc_main_page_title).find(b_section_title).addClass('toggle-navigation');
      $(doc_main_page_title).find(b_section_title).attr('id', 'start-menu-nav-button');
    }

    $(nav_button).on('click', function(event) {
        event.stopPropagation();
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(start_menu).addClass('active');
            $("body").addClass('stop-scroll');
        } else {
            $(this).removeClass('active');
            $(start_menu).removeClass('active');
            $("body").removeClass('stop-scroll');
        }
    });

    $("body").click(function() {
        $(start_menu).removeClass("active");
        $(nav_button).removeClass("active");
        $("body").removeClass('stop-scroll');
    });

    // Adding available versions list to doc main page
    if ($(doc_main_page_content)) {
      if ($(b_page_header)) {
        $(doc_main_page_content).prepend($(b_page_header));
      }
    }
});