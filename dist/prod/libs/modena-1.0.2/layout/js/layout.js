/** 
 * PrimeNG Modena Layout
 */
var Modena = {
    
    init: function() {
        this.menuWrapper = $('#layout-menu-cover');
        this.menu = this.menuWrapper.find('ul.modena-menu');
        this.menulinks = this.menu.find('a.menulink');
        this.topMenu = $('#top-menu');
        this.topMenuButton = $('#show-top-menu');
        this.mobileMenuButton = $('#mobile-menu-button');
        this.expandedMenuitems = this.expandedMenuitems||[];
        this.mobile = this.isMobile();
		this.topbarMenuClick = false;
        
        //remove transform on Firefox Mobile 
        if(this.mobile && $.browser.mozilla) {
            this.mobileMenuButton.addClass('no-transform');
            this.menu.addClass('no-transform');
        }
        
        this.bindEvents();
        
        this.initRipple();
    },
    
    bindEvents: function() {
        var $this = this;
        
        if(this.mobile) {
            this.menuWrapper.css('overflow-y', 'auto');
        }
        else {
            this.menuWrapper.perfectScrollbar({suppressScrollX: true});
        }
	
        this.menulinks.off('click').on('click',function(e) {
            var menuitemLink = $(this),
            menuitem = menuitemLink.parent();

            if(menuitem.hasClass('active-menu-parent')) {
                menuitem.removeClass('active-menu-parent');
                menuitemLink.removeClass('active-menu active-menu-restore').next('ul').removeClass('active-menu active-menu-restore');
            }
            else {
                var activeSibling = menuitem.siblings('.active-menu-parent');
                if(activeSibling.length) {
                    activeSibling.removeClass('active-menu-parent');

                    activeSibling.find('ul.active-menu,a.active-menu').removeClass('active-menu active-menu-restore');
                    activeSibling.find('li.active-menu-parent').each(function() {
                        var menuitem = $(this);
                        menuitem.removeClass('active-menu-parent');
                    });
                }

                menuitem.addClass('active-menu-parent');
                menuitemLink.addClass('active-menu').next('ul').addClass('active-menu');
            }
            
            if(!$this.mobile) {
                $this.menuWrapper.perfectScrollbar("update");
            }

            if(menuitemLink.next().is('ul')) {
                e.preventDefault();
            }
            else {
                $this.menuWrapper.removeClass('showmenu');
                $this.mobileMenuButton.removeClass('MenuClose');
                
                $this.menuWrapper.children('.ps-scrollbar-y-rail').css('visibility','hidden');
            }
            
        });
        
        this.mobileMenuButton.off('click').on('click', function() {
            if(parseInt($this.menuWrapper.css('marginLeft')) < 0) {
                $(this).addClass('MenuClose');
                $this.menuWrapper.addClass('showmenu');
                $this.topMenu.removeClass('showmenu');
                $this.topMenuButton.removeClass('showmenu');
                $this.menuWrapper.children('.ps-scrollbar-y-rail').css('visibility','visible');
            }
            else {
                $(this).removeClass('MenuClose');
                $this.menuWrapper.removeClass('showmenu');
            }
        });

        this.topMenuButton.off('click').on('click',function(){
            if($this.topMenu.is(':hidden')) {
                $(this).addClass('MenuClose');
                $this.topMenu.addClass('showmenu');
                $this.mobileMenuButton.removeClass('MenuClose');
                $this.menuWrapper.removeClass('showmenu');
            }
            else {
                $(this).removeClass('MenuClose');
                $this.topMenu.removeClass('showmenu');
            }
        });
        
        //topbar
        this.topMenu.find('a').off('click.topmenu mouseenter.topmenu').on('click.topmenu', function(e) {
            var link = $(this),
            submenu = link.next('ul');
            
            if(submenu.length) {
                if(submenu.hasClass('active-menu')) {
                    submenu.removeClass('active-menu');
                    link.removeClass('active-menu');
                    $this.topMenuActive = false;
                }
                else {
                    $this.topMenu.find('> li > ul.active-menu').removeClass('active-menu').prev('a').removeClass('active-menu');
                    link.addClass('active-menu').next('ul').addClass('active-menu');
                    $this.topMenuActive = true;
                }
            }
            else {
                if($(e.target).is(':not(:input)')) {
                    $this.topMenu.find('.active-menu').removeClass('active-menu');
                    $this.topMenuActive = false;
                }
            }
        })
        .on('mouseenter.topmenu', function() {
            var link = $(this);
    
            if(link.parent().parent().is($this.topMenu)&&$this.topMenuActive&&document.documentElement.clientWidth > 960) {
                var submenu = link.next('ul');
                
                $this.topMenu.find('.active-menu').removeClass('active-menu');
                link.addClass('active-menu');
                
                if(submenu.length) {
                    submenu.addClass('active-menu');
                }
            }
        });

		this.topMenu.off('click').on('click', function() {
           $this.topbarMenuClick = true; 
        });

        this.clickNS = 'click.' + this.id;
        $(document.body).off(this.clickNS).on(this.clickNS, function (e) {
            if(!$this.topbarMenuClick) {
                $this.topMenu.find('.active-menu').removeClass('active-menu');
                $this.topMenuActive = false;
            }
            
            $this.topbarMenuClick = false;
        });
    },
    
    isMobile: function() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent));
    },
	
    initRipple: function() {       
        var ink, d, x, y;
        $(document.body).off('mousedown.ripple','.ripplelink,.ui-button > span').on('mousedown.ripple','.ripplelink,.ui-button > span', null, function(e){
            if($(this).find(".ink").length === 0){
                $(this).prepend("<span class='ink'></span>");
            }
                 
            ink = $(this).find(".ink");
            ink.removeClass("animate");
             
            if(!ink.height() && !ink.width()){
                d = Math.max($(this).outerWidth(), $(this).outerHeight());
                ink.css({height: d, width: d});
            }
             
            x = e.pageX - $(this).offset().left - ink.width()/2;
            y = e.pageY - $(this).offset().top - ink.height()/2;
             
            ink.css({top: y+'px', left: x+'px'}).addClass("animate");
        });
    }
};