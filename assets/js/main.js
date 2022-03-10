$(document).ready(function(){

     // Stick header
    if( $('.header-mb').length ){
        if ( $('.header-mb').offset().top >= 10 ) $('.header-mb').addClass("is-sticky");
        $(window).scroll(function(){
            $(this).scrollTop()>10?$('.header-mb').addClass("is-sticky"):$('.header-mb').removeClass("is-sticky")
        })
    }



    /*----Get Header Height ---*/
    function get_header_height() {
        var header_sticky = $("header").outerHeight()
        $('body').css("--header-height",header_sticky+'px')
    }

    $(window).on('load resize', function () {
        setTimeout(function(){
            get_header_height()
        }, 500);
    });


    new WOW().init();

    //-------------------------------------------------
    // Menu
    //-------------------------------------------------
    $.fn.dnmenu = function( options ) {

        let thiz = this
        let menu = $(this).attr('data-id')
        let menu_id = '#'+menu

        // Default options
        var settings = $.extend({
            name: 'Menu'
        }, options );

        // get ScrollBar Width
        function getScrollBarWidth () {
            var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
                widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
            $outer.remove();
            return 100 - widthWithScroll;
        };
        let ScrollBarWidth = getScrollBarWidth() + 'px';

        // Create wrap
        // Button click
        thiz.click(function(e){

            e.preventDefault()

            if($(this).hasClass('active')){
                $(this).removeClass('active')
                $('body').removeClass('modal-open')
                $(menu_id).removeClass('active')
                thiz.removeClass('active')
                $('.header-mb').removeClass('-menu-mb-active')

            } else {
                $(this).addClass('active')
                $('body').addClass('modal-open')
                $(menu_id).addClass('active')
                thiz.addClass('active')
                $('.header-mb').addClass('-menu-mb-active')

            }
        });

        // Custom close
        $('.js-menu__close').click(function(){
            $('body').removeClass('modal-open')
            $(thiz).removeClass('active')
            $(menu_id).removeClass('active')
        })

        // Menu
        var el= $(menu_id).find(".nav__mobile--ul");
        el.find(".menu-item-has-children>a").after('<button class="nav__mobile__btn"><i></i></button>'),

        el.find(".nav__mobile__btn").on("click",function(e){
            e.stopPropagation(),
            $(this).parent().find('.sub-menu').first().is(":visible")?$(this).parent().removeClass("sub-active"):
            $(this).parent().addClass("sub-active"),
            $(this).parent().find('.sub-menu').first().slideToggle()
        })

        $('.nav__mobile, .header, .header-mb').mousedown(function(e){ e.stopPropagation(); });
        $(document).mousedown(function(e){ $('.nav__mobile').removeClass('active'); $(thiz).removeClass('active'); $("body").removeClass('modal-open') });

        // Apply options
        return;
    };

    $('.menu-mb__btn').dnmenu()



    //Select Item
    function ddropdown(elm) {

        $(elm).click(function(e) {
            e.preventDefault();

            dnselect_parent = $(this).closest('.js-ddropdown')

            if( dnselect_parent.hasClass('show') ){
                $('.js-ddropdown').removeClass('show');
            }else{
                $('.js-ddropdown').removeClass('show');
                dnselect_parent.addClass('show')
            }
        })

        $('.js-ddropdown').mousedown(function(e){ e.stopPropagation(); });
        $(document).mousedown(function(e){ $('.js-ddropdown').removeClass('show'); });
    }
    ddropdown('.js-ddropdown-toggle')

    /*home-intro*/
    if($('body').hasClass('home')){

    }

    // Click id a
    var jump=function(e)
    {
        $(document).off("scroll");
        if (e){
           var url = $(this).attr("href");
           var id = url.substring(url.lastIndexOf('/') + 1);
           target = id
        }else{
           var target = location.hash;
        }

        if($(target).offset() != undefined){
            e.preventDefault();
            $('html, body').stop().animate({
                'scrollTop': $(target).offset().top
            });

            location.hash = target;
        }
    }
    $('body.home a[href*="#"]').bind("click", jump);

    $(document).on('click', 'body.home a[href*="#"]', function (e) {
        console.log(1)

        //Close menu mb
        $('body').removeClass('modal-open')
        $('#menu__mobile').removeClass('active')
        $('.menu-mb__btn').removeClass('active')
        $('.header-mb').removeClass('-menu-mb-active')
    });

    /*Page market*/

    $('.js-widget--toggle').on("click",function(e) {
        $('.market__sidebar').toggleClass('active')
        $('body').toggleClass('filter-open')

    })

    // Widget

    var e=$(".market__checkbox");
    e.find(".has-children>label").after('<div class="togglez"><i></i></div>'),
    e.find(".togglez").on("click",function(e){e.stopPropagation(),
    $(this).parent().find("ul.sub-menu").is(":visible")?$(this).parent().removeClass("active"):$(this).parent().addClass("active"),
    $(this).parent().find("ul.sub-menu").first().slideToggle()})

    // Tooltip page account
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    // ClipboardJS
    if($(document).find('.js-item-copy').length !=0){
        let clipboard = new ClipboardJS('.js-item-copy');
        clipboard.on('success', function (e) {
            let trigger_button = e.trigger;
            // update the tooltip title, get the tooltip instance, and show it
            trigger_button.setAttribute('data-bs-original-title', 'Copied!');
            let btn_tooltip = bootstrap.Tooltip.getInstance(trigger_button);
            btn_tooltip.show();
            // reset the tooltip title
            trigger_button.setAttribute('data-bs-original-title', 'Copy to clipboard');
        });
    }

});


