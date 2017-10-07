/*
Copyright (c) 2016 teqbees
------------------------------------------------------------------
[Master Javascript]
Project: DjNight
-------------------------------------------------------------------*/
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
			/*-------------- DjNight Functions Calling ---------------*/
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
		/*-------------- DjNight Functions definition ---------------*/
		RTL: function() {
			// On Right-to-left(RTL) add class 
			var rtl_attr = $("html").attr('dir');
			if (rtl_attr) {
				$('html').find('body').addClass("rtl");
			}
		},
		navigation: function(){
			//menu active on click
			$(".dn_navigation ul li a").on("click", function(){
				$(".dn_navigation ul li a").removeClass("active");
				$(this).addClass("active");
			});
		},
		//Responsive menu in mobile and tab
		Responsive_menu: function(){
			$(".nav_toggle").on("click", function(){
				$(this).toggleClass("toggle_open");
				$(".dn_navigation").toggleClass("menu_open");
			});
			//dropdown menu
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
		//Testimonial crousel slider
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
		//this script for portfolio filter 
		portfoliofilter: function(){
			if($("#portfolio_filter").length > 0 ){
				$('#portfolio_filter').mixItUp();
				filterSelector: ".filter"
				$(".filter").on("click", function(e) {
					e.preventDefault()
				});
			}
		},
		//this script for Gallery Popup
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
		//audio player
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
		//contact form mail
		Mailfunction: function() {
			//contact mail function	
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
		//scrolling animation
		animation:function() {
			new WOW().init();
		},
	};
	DjNight.init();
	// Scroll Event
	var scroll_hieght= $(".dn_slider").outerHeight();
	$(window).on('bind scroll', function(e) {
		if (($(window).scrollTop() > scroll_hieght && $(window).width() > 991)) {
			$('.dn_header_section').addClass('fixed_header_menu');
		} else {
			$('.dn_header_section').removeClass('fixed_header_menu');
		}	
	}); 
	//load event
	$(window).on('load', function() {
		$(".preloader_wrapper").delay(600).fadeOut("slow");		
	});
})(jQuery);