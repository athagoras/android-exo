var sections = $('.nav-activate-scrolling');
var nav = $('nav');
var footer = $('footer');
var scrollTime = .75;
var scrollDistance = 200;
var isSend = false;

var carousel_brandLogo = new Flickity( '.flickity-carousel#logo-brand', {
    cellSelector: '.carousel-cell',
    wrapAround: true,
    imagesLoaded: true,
    setGallerySize: true,
    pageDots: false,
    pauseAutoPlayOnHover: false,
    autoPlay: 10000
});

var carousel_feedback = new Flickity( '.flickity-carousel#quoteFeedback', {
    cellSelector: '.carousel-cell',
    wrapAround: true,
    imagesLoaded: true,
    setGallerySize: true,
    freeScroll: true,
    cellAlign: 'center'
});

$(function(){
    $('.card-panel.statCard').matchHeight({
        property: 'height'
    });

    $('.card-panel.statCard .statCount').matchHeight({
        property: 'height'
    });

    $('#highlight .card').matchHeight({
        property: 'height'
    });

    $('.black-ribbon').click(function(){
        $(this).toggleClass('hasGrayscale');

        if ($(this).hasClass('hasGrayscale')) {
            $('body').css({
                'filter': 'grayscale(50%)',
                '-webkit-filter': 'grayscale(50%)',
                '-moz-filter': 'grayscale(50%)'
            });
            Materialize.toast('เปลี่ยนเป็นเฉดเทาแล้ว คลิกอีกครั้งเพื่อเปลี่ยน', 3000);
        } else {
            $('body').css({
                'filter': 'unset',
                '-webkit-filter': 'unset',
                '-moz-filter': 'unset'
            });
            Materialize.toast('เปลี่ยนเป็นเฉดสีแล้ว คลิกอีกครั้งเพื่อเปลี่ยน', 3000);
        }
    }

});

$(window).on('resize load', function () {
    var windowWidth = $(this).width();
    var windowHeight = $(this).height();
    $('#introduction').css('height', windowHeight-nav.outerHeight());
});

$(document).ready(function(){
    $('.button-collapse').sideNav({closeOnClick: true});
    $(".dropdown-button").dropdown({hover: false});
    $('.scrollspy').scrollSpy({scrollOffset: 64});
    $('.parallax').parallax();
    $('.tooltipped').tooltip({delay: 50});

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
    var coordinator = {lat: 13.7243922, lng: 100.5592442};
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
