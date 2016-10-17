var sections = $('.nav-activate-scrolling');
var nav = $('nav');
var footer = $('footer');
var scrollTime = .75;
var scrollDistance = 200;
var isSend = false;
var carousel_brandLogo = new Flickity( '.flickity-carousel#logo-brand', {
	cellSelector: '.carousel-cell',
	wrapAround: true,
	autoPlay: true,
	imagesLoaded: true,
	setGallerySize: true,
	pageDots: false,
	pauseAutoPlayOnHover: false
});

$(document).ready(function(){
	$('.button-collapse').sideNav({closeOnClick: true});
	$(".dropdown-button").dropdown({hover: false});
	$('.scrollspy').scrollSpy({scrollOffset: 64});

	$('.statCard-wrapper').parent().css({
		'display': '-webkit-flex',
	    'display': '-ms-flexbox',
	    'display': 'flex',
		'flex-wrap': 'wrap'
	});


	$('#contactActivate').click(function(){
		var contactFormPos = $('#contact-form').offset().top - nav.outerHeight();
		$(this).slideToggle('1000');
		$(window).scrollTop(contactFormPos);
		$('#contactActivate').parent().next().slideToggle('1000');
	});

	$('#contact-action button[name=delete]').click(function(){
		if (isSend) {
			$('#contact-data').slideToggle('1000');
			$('#contact-progress').slideToggle('1000');
			$('#contact-action button[name=submit]').removeAttr('disabled');
			isSend = false;
		} else {
			$('#contactActivate').parent().next().slideToggle('1000');
			$('#contactActivate').slideToggle('1000');
		}
	});

	$('#contact-action button[name=submit]').click(function(){
		isSend = true;
		$(this).attr('disabled','disabled');
		$('#contact-data').slideToggle('1000');
		$('#contact-progress').slideToggle('1000');
	});
});

$(window).on("mousewheel DOMMouseScroll", function(event){
	event.preventDefault();

	var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
	var scrollTop = $(this).scrollTop();
	var finalScroll = scrollTop - parseInt(delta*scrollDistance);

	TweenMax.to($(this), scrollTime, {
		scrollTo : { y: finalScroll, autoKill:true },
		ease: Power1.easeOut,
		overwrite: 5
	});
});

$(window).on('resize load', function () {
	var windowWidth = $(this).width();
	var windowHeight = $(this).height();
	$('#landing').css('height', windowHeight-nav.outerHeight());


	$('.statCard-wrapper').parent().css({
		'flex-direction' : function () {
			if (windowWidth <= 600) {
				return 'column';
			} else {
				return 'row';
			}
		},

	});
});

$(window).on('scroll load resize', function () {
    var scrollPosTop = $(this).scrollTop() + $(this).height() * 0.75;
	var scrollPosBottom = $(this).scrollTop() + $(this).height();
	var footerPosTop = footer.offset().top;
	var footerPosBottom = footerPosTop + footer.outerHeight();
	var isFooterPos = scrollPosTop >= footerPosTop && scrollPosTop <= footerPosBottom;

    sections.each(function() {
        var sectionsPosTop = $(this).offset().top - nav.outerHeight();
        var sectionsPosBottom = sectionsPosTop + $(this).outerHeight();
		var isSectionsPos = scrollPosTop >= sectionsPosTop && scrollPosTop <= sectionsPosBottom;

		if (!isFooterPos) {
			if (isSectionsPos) {
				nav.find('ul.nav-list li').removeClass('active');
				nav.find('ul.side-nav li').removeClass('active');
				nav.find('ul.nav-list li a[href="#'+$(this).attr('id')+'"]').parent().addClass('active');
				nav.find('ul.side-nav li a[href="#'+$(this).attr('id')+'"]').parent().addClass('active');
			}
		} else {
			nav.find('ul.nav-list li').removeClass('active');
		}
    });

	if ($(this).scrollTop() > $(this).height()) {
		$('#goTop').fadeIn();
	} else {
		$('#goTop').fadeOut();
	}
});

function initMap() {
	var styles;
	var coordinator = {lat: 13.7243922, lng: 100.5592442};

	$.getJSON(".assets/json/gmaps-style-androidexo.json", function(data) {
        styles = data;
    });

	var map = new google.maps.Map(document.getElementById('location-map'), {
		center: coordinator,
		zoom: 17,
		styles: [
			{
				"featureType": "landscape.natural.terrain",
				"elementType": "geometry",
				"stylers": [ { "color": "#b2ff03" } ]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [ { "color": "#b2ff59" } ]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [ { "color": "#ffcdd2" } ]
			},
			{
				"featureType": "road",
				"elementType": "geometry.stroke",
				"stylers": [ { "color": "#ffebee" }, { "weight": 1 } ]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [ { "color": "#ff80ab" } ]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [ { "color": "#ef9a9a" } ]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "geometry",
				"stylers": [ { "color": "#e57373" } ]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [ { "color": "#40c3ff" } ]
			}
		]
	});
	var marker = new google.maps.Marker({
		position: coordinator,
		map: map,
		title: 'ศูนย์ประชุมแห่งชาติสิริกิติ์ กรุงเทพมหานคร'
	});
}
