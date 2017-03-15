// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI

//http://stackoverflow.com/questions/33214788/how-to-restrict-google-places-to-specific-city
//https://developers.google.com/maps/documentation/javascript/places-autocomplete

//Geocoding
//https://maps.googleapis.com/maps/api/geocode/json?address=Palo+Alto&key=AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI

//Places Details 
//https://developers.google.com/maps/documentation/javascript/places#place_details


//STEP 1: STATE

var APIkey = 'AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI';

var state = {
	lat: '',
	lng: '',
	city: '',
	placesID: '',
	restaurant: '',
	placesService: '',
};


function getGeoCode(city, callback) {
	var geoURL = 'https://maps.googleapis.com/maps/api/geocode/json'; 
	//better to remove last '?'
	
	var query = {
		address: city,
		key: APIkey,
	}
	$.getJSON(geoURL, query, callback);
}

//STEP 2: FUNCTIONS THAT MODIFY STATE (NO JQUERY)

function updateLngLat(object) {
	state.lat = object.results[0].geometry.location.lat;
	state.lng = object.results[0].geometry.location.lng;
	
}

function updateRestaurant(object) {
	state.restaurant = object;
}

function updateCity(object) {
	state.city = object;
}

function updatePlacesID(object) {
	//assuming we use the first item in the array...maybe not the best assumption? 
	state.placesID = object[0].place_id;
}

//STEP 3: RENDER IN THE DOM FUNCTIONS

function renderPage(state, element) {
	$(element).find('.js-search-results').hide();
	$(element).find('.js-home').show();
};

function renderSearchResultsPage(state, element) {
	$(element).find('.js-search-results').show();
	$(element).find('.js-restaurant').text(state.restaurant);
	$(element).find('.js-city').text(state.city);	
};


//PLACES RADAR SEARCH 

function initMap() {
    //$('#map')[0]; //selecting
    //$('<div id="maps\" />')[0]) creating a variable 

    var googleMap = new google.maps.Map($('<div id="google-maps" />')[0]);
    //new creates an object 
    //creates google map object b/c Places makes you do it. 

    state.placesService = new google.maps.places.PlacesService(googleMap);
}

function placesSearchAPI(callback) {
	var city = {lat: parseFloat(state.lat), lng: parseFloat(state.lng)};

    state.placesService.radarSearch({
      location: city,
      radius: 50000, 
      type: ['restaurant'],
      name: state.restaurant,
    }, callback);
};

function testDisplay(object) {
    	console.log(object);
}

//STEP 4: JQUERY EVENT LISTENERS


$('form#restaurant-search').on('submit', function(event) {
	event.preventDefault();
	var city = $('#city').val();
	var restaurant = $('#restaurant').val();

	updateRestaurant(restaurant);
	updateCity(city);

	renderSearchResultsPage(state, $('main'));

	
	getGeoCode(city, function(geocodeObject) {
		updateLngLat(geocodeObject);

		placesSearchAPI(function(placesSearchObject) {
			updatePlacesID(placesSearchObject);
			// console.log(state.placesID);

			var request = {
			  placeId: state.placesID,
			};

			state.placesService.getDetails(request, testDisplay);
		});
	});		
})

initMap();

renderPage(state, $('main'));


//this didn't work at first. Why.  
// function getLngLat(object) {
// 	var lat = object.results[0].geometry.location.lat;
// 	var lng = object.results[0].geometry.location.lng;
// 	
// 	return lat;
// }


