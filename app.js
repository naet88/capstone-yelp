// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI


//http://stackoverflow.com/questions/33214788/how-to-restrict-google-places-to-specific-city
//https://developers.google.com/maps/documentation/javascript/places-autocomplete

//Geocoding
//https://maps.googleapis.com/maps/api/geocode/json?address=Palo+Alto&key=AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI

//STEP 1: STATE

var APIkey = 'AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI';

var state = {
	lat: '',
	lng: '',
	placesID: '',
	restaurant: '',
	placesService: '',
};


function getGeoCode(city, callback) {
	var geoURL = 'https://maps.googleapis.com/maps/api/geocode/json?';
	
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

// function updatePlacesID(object) {
// 	//assuming we use the first item in the array...maybe not the best assumption? 
// 	state.placesID = object[0].place_id;
// }

//STEP 3: RENDER IN THE DOM FUNCTIONS

function renderPage(state, element) {
	$(element).find('.js-search-results').hide();
	$(element).find('.js-home').show();
};

function renderSearchResultsPage(state, element, city, restaurant) {
	$(element).find('.js-search-results').show();
	$(element).find('.js-restaurant').text(restaurant);
	$(element).find('.js-city').text(city);	
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

	console.log('city coordinates: '+city);

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



//PLACES DETAILS
//NOT SURE WHAT TO DO W/ THIS. 
//https://developers.google.com/maps/documentation/javascript/places#place_details


// service = new google.maps.places.PlacesService(map);
// service.getDetails(state.placesID, callback);

// //what to do w/ this...
// function callback(place, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     createMarker(place);
//   }
// }



//STEP 4: JQUERY EVENT LISTENERS

renderPage(state, $('main'));

$('form#restaurant-search').on('submit', function(event) {
	event.preventDefault();
	var city = $('#city').val();
	var restaurant = $('#restaurant').val();

	renderSearchResultsPage(state, $('main'), city, restaurant);

	//this might be a dumb Q, but does updateLngLat know that it will intercept the (object)?
	getGeoCode(city, updateLngLat);	
	updateRestaurant(restaurant);

	initMap();

	console.log('current state'+state);

	//when I click on the button TWICE, I get an object. First time is an empty object. 
	placesSearchAPI(testDisplay);	

})




//this didn't work at first. Why.  
// function getLngLat(object) {
// 	var lat = object.results[0].geometry.location.lat;
// 	var lng = object.results[0].geometry.location.lng;
// 	
// 	return lat;
// }


