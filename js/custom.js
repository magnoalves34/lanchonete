
(function($) {
	"use strict";
	var DjNight = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function() {
			if (!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}
			this.RTL();
			this.navigation();
			this.Responsive_menu();
			this.slider();
			this.Testimonial();
			this.portfoliofilter();
			this.gallery_popup();
			this.Mediaplayer();
			this.Mailfunction();
			this.animation();
		},
		RTL: function() {
			var rtl_attr = $("html").attr('dir');
			if (rtl_attr) {
				$('html').find('body').addClass("rtl");
			}
		},
		navigation: function(){
			$(".dn_navigation ul li a").on("click", function(){
				$(".dn_navigation ul li a").removeClass("active");
				$(this).addClass("active");
			});
		},
		Responsive_menu: function(){
			$(".nav_toggle").on("click", function(){
				$(this).toggleClass("toggle_open");
				$(".dn_navigation").toggleClass("menu_open");
			});
			$(".dn_navigation ul li ul.sub-menu").parents("li").addClass("dropdown_toggle");
			$(".dropdown_toggle").append("<span class='caret_down'></span>");
			$(".dn_navigation ul li").children(".caret_down").on("click",function(){
				$(this).toggleClass("caret_up");
				$(this).prev("ul").slideToggle();
			});
		},
		slider: function(){
			if($(".dn_slider").length > 0 ){
				var galleryTop = new Swiper('.dn_slider', {
					loop:false,
					pagination:'.swiper_pagination',
					paginationClickable:true,
					autoplay: 2000,
					effect:'fade',
					speed:2000,
				});
			}
		},
		Testimonial: function(){
			if($(".dn_crousel_cover").length > 0 ){
				$(".dn_crousel_cover").owlCarousel({
					autoplay: true,
					items: 1,
					loop:true,
					singleitem:true,
					touchDrag: true,
					responsiveClass: true,
					dots: true,
					nav: false,
					responsive: {
						0: {
							items: 1
						},
						480: {
							items: 1
						},
						600: {
							items: 1
						},
						1000: {
							items: 1
						}
					},
					smartSpeed: 1000,
					autoplayTimeout:2000,
					autoplaySpeed:2000,
					animateIn: 'zoom_middle',
					animateOut: 'zoomOut'
				});
			}
		}, 
		portfoliofilter: function(){
			if($("#portfolio_filter").length > 0 ){
				$('#portfolio_filter').mixItUp();
				filterSelector: ".filter"
				$(".filter").on("click", function(e) {
					e.preventDefault()
				});
			}
		},
		gallery_popup: function(){
			if($(".gallery_popup").length > 0 ){
				$('.gallery_popup').magnificPopup({
					type: 'inline',
					fixedContentPos: false,
					fixedBgPos: true,
					overflowY: 'auto',
					midClick: true,
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						preload: [0, 1]
					},
					removalDelay: 300,
					mainClass: 'my_zoom_in'
				});
			}
		},
		Mediaplayer: function() {
			if($("audio").length > 0 ){
				$('audio').mediaelementplayer({
					loop: true,
					playlist: true,
					favourite: true,
					audioHeight: 60,
					videoVolume: 'vertical',
					playlistposition: 'bottom',
					features: ['playlistfeature', 'prevtrack', 'playpause', 'nexttrack', 'tracks', 'current', 'progress', 'duration', 'volume', 'loop']
				});
			}
		},
		Mailfunction: function() {
			$('.submit_btn').on('click', function(){
				var un=$('#name').val();
				var em=$('#email').val();
				var wsub=$('#subject').val();
				var meesg=$('#massage').val();
				
				$.ajax({
					type: "POST",
					url: "ajaxmail.php",
					data: {
						'username':un,
						'useremail':em,
						'subject':wsub,
						'mesg':meesg,
						},
					success: function(msg) {
						var full_msg=msg.split("#");
						if(full_msg[0]=='1'){
							$('#name').val("");
							$('#email').val("");
							$('#subject').val("");
							$('#massage').val("");
							$('#contact_err').html( full_msg[1] );
						}
						else{
							$('#name').val(un);
							$('#email').val(em);
							$('#subject').val(wsub);
							$('#massage').val(meesg);
							$('#contact_err').html( full_msg[1] );
						}
					}
				});
			});
		},
		animation:function() {
			new WOW().init();
		},
	};
	DjNight.init();
	var scroll_hieght= $(".dn_slider").outerHeight();
	$(window).on('bind scroll', function(e) {
		if (($(window).scrollTop() > scroll_hieght && $(window).width() > 991)) {
			$('.dn_header_section').addClass('fixed_header_menu');
		} else {
			$('.dn_header_section').removeClass('fixed_header_menu');
		}	
	}); 
	$(window).on('load', function() {
		$(".preloader_wrapper").delay(600).fadeOut("slow");		
	});
})(jQuery);