$(document).ready(function(){

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
            if(thiz.hasClass('active')){
                // $('.dnmenu-backdrop').remove()
                $('body').removeClass('modal-open')
                $(menu_id).removeClass('active')
                $(thiz).removeClass('active')
                $('.header.-fix').removeClass('-menu-mb-active')

            } else {

                $('body').addClass('modal-open')
                $(menu_id).addClass('active')
                $(thiz).addClass('active')
                $('.header.-fix').addClass('-menu-mb-active')

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

        $('.nav__mobile, .header').mousedown(function(e){ e.stopPropagation(); });
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



});


