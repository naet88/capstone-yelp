// API KEY: AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI


// https://maps.googleapis.com/maps/api/place/nearbysearch/json
//   ?location=-33.8670522,151.1957362
//   &radius=500
//   &types=food
//   &name=harbour
//   &key=AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI


// var APIkey = 'AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI';

// var BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

var BASE_URL = 'freegeoip.net/json/github.com';

function userIP () {
	$.getJSON(BASE_URL, function(object) {
		console.log(object);
	};
}


var map;
var infowindow;

  function initMap() {
    var sanFrancisco = {lat: 37.7749, lng: -122.4194};
    // var pyrmont = {lat: -33.867, lng: 151.195};

    map = new google.maps.Map(document.getElementById('map'), {
      center: sanFrancisco,
      // center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: sanFrancisco,
      // rankBy: DISTANCE,
      radius: 10000, //issue w/ max radius
      type: ['restaurant'],
      name: 'monsieur benjamin',
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

userIP();
