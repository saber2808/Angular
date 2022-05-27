(function($) {
    "use strict";
	
	/* ..............................................
	Loader 
    ................................................. */
	
	$(window).on('load', function() { 
		$('.preloader').fadeOut(); 
		$('#preloader').delay(550).fadeOut('slow'); 
		$('body').delay(450).css({'overflow':'visible'});
	});
	
	/* ..............................................
    Fixed Menu
    ................................................. */
    
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
		} else {
			$('.top-header').removeClass('fixed-menu');
		}
	});
	
	/* ..............................................
    Gallery
    ................................................. */
	
	$('#slides').superslides({
		inherit_width_from: '.cover-slides',
		inherit_height_from: '.cover-slides',
		play: 5000,
		animation: 'fade',
	});
	
	$( ".cover-slides ul li" ).append( "<div class='overlay-background'></div>" );
	
	/* ..............................................
    Map Full
    ................................................. */
	
	$(document).ready(function(){ 
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 100) { 
				$('#back-to-top').fadeIn(); 
			} else { 
				$('#back-to-top').fadeOut(); 
			} 
		}); 
		$('#back-to-top').click(function(){ 
			$("html, body").animate({ scrollTop: 0 }, 600); 
			return false; 
		}); 
	});
	
	/* ..............................................
    Special Menu
    ................................................. */
	
	var Container = $('.container');
	Container.imagesLoaded(function () {
		var portfolio = $('.special-menu');
		portfolio.on('click', 'button', function () {
			$(this).addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		var $grid = $('.special-list').isotope({
			itemSelector: '.special-grid'
		});
	});
	
	/* ..............................................
    BaguetteBox
    ................................................. */
	
	baguetteBox.run('.tz-gallery', {
		animation: 'fadeIn',
		noScrollbars: true
	});
	
	
	
	/* ..............................................
    Datepicker
    ................................................. */
	
	$('.datepicker').pickadate();
	
	$('.time').pickatime();
	
	/*thẻ card*/
	document.querySelectorAll(".projcard-description").forEach(function(box) {
		$clamp(box, {clamp: 6});
	});
	
	
	
}(jQuery));
$(document).ready(function() {

   
	// inspired by http://jsfiddle.net/arunpjohny/564Lxosz/1/
	$('.table-responsive-stack').find("th").each(function (i) {
	   
	   $('.table-responsive-stack td:nth-child(' + (i + 1) + ')').prepend('<span class="table-responsive-stack-thead">'+ $(this).text() + ':</span> ');
	   $('.table-responsive-stack-thead').hide();
	});
 
	
	
	
	
 $( '.table-responsive-stack' ).each(function() {
   var thCount = $(this).find("th").length; 
	var rowGrow = 100 / thCount + '%';
	//console.log(rowGrow);
	$(this).find("th, td").css('flex-basis', rowGrow);   
 });
	
	
	
	
 function flexTable(){
	if ($(window).width() < 768) {
	   
	$(".table-responsive-stack").each(function (i) {
	   $(this).find(".table-responsive-stack-thead").show();
	   $(this).find('thead').hide();
	});
	   
	 
	// window is less than 768px   
	} else {
	   
	   
	$(".table-responsive-stack").each(function (i) {
	   $(this).find(".table-responsive-stack-thead").hide();
	   $(this).find('thead').show();
	});
	   
	   
 
	}
 // flextable   
 }      
  
 flexTable();
	
 window.onresize = function(event) {
	 flexTable();
 };
	
	
	
	
 
   
 // document ready  
 });
 
 
 