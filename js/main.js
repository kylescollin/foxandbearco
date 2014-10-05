$(document).ready(function(){
	$('.bxslider').bxSlider();
});

var feed = new Instafeed({
	get: 'user',
	userId: 1400806613,
    accessToken: '1669967.03e73c5.0b87abb7ae0648f3ac2001003fca8048',
	link: 'true',
	limit: '8',
	resolution: 'standard_resolution',
	clientId: '03e73c51787c491c95514ecc3f7d4cdb'
});
feed.run();

function initialize() {
	var mapCanvas = document.getElementById('map_canvas');
	var mapOptions = {
		center: new google.maps.LatLng(40.7178382,-73.9577329),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var center;
	function calculateCenter() {
		center = map.getCenter();
	}
	google.maps.event.addDomListener(map, 'idle', function() {
		calculateCenter();
	});
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(center);
	});
}
google.maps.event.addDomListener(window, 'load', initialize);