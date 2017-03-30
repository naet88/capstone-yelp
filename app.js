//STEP 1: STATE

var keyPhrases_URL = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases"; 

var sentiments_URL = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";

var geoURL = 'https://maps.googleapis.com/maps/api/geocode/json'; 

var APIkey_googplaces = 'AIzaSyAV-sTO3UuPBe9d_IxZXva_1XT9lNRSjPI';
var APIkey_microsoft = '0c3b04acec264c47a5fce6cf873b15ed';

var reviewsKeyPhrasesObject = {};

// var keyPhrasesOutput = [];

// var wordCounterOutput = [];

var state = {
	lat: '',
	lng: '',
	city: '',
	placesID: '',
	restaurant: '',
	placesService: '',
	reviews: [],
	keyPhrasesOutput: [],
	wordCounterOutput: [],
};

function getGeoCode(city, callback) {
	
	var query = {
		address: city,
		key: APIkey_googplaces,
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
	//note: assuming we use the first item in the array
	state.placesID = object[0].place_id;
}

//STEP 3: RENDER IN THE DOM FUNCTIONS

function renderPage(state, element) {
	$(element).find('.js-search-results').hide();
	$(element).find('.js-home').show();
}

function renderSearchResultsPage(state, element) {
	$(element).find('.js-search-results').show();
	$(element).find('.js-restaurant').text(state.restaurant);
	$(element).find('.js-city').text(state.city);	
	$('#wordcloud').empty();
}

function createWordCloud(state, element) {
	$('#wordcloud').jQCloud(state.wordCounterOutput);	
}


//PLACES RADAR SEARCH 

function initMap() {
    var googleMap = new google.maps.Map($('<div id="google-maps" />')[0]);

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

function getReviews(object) {
	object.reviews.forEach(function(element) {
		state.reviews.push(element.text);
	});
}


//MICROSOFT TEXT ANALYTICS API 

//I don't need (callback) do I?
function getKeyPhrases(callback) {

	var formattedPayload = {
		documents: [],
	}; 

	state.reviews.forEach(function(review, index) {
		var entry = {
			language: 'en', 
			id: index.toString(), 
			text: review,
			};

		formattedPayload.documents.push(entry);
		
	})

	$.ajax({
		type: "POST",
		url: keyPhrases_URL,
		data: JSON.stringify(formattedPayload),
		success: callback,
		dataType: "json",
		headers: {
			"Ocp-Apim-Subscription-Key": APIkey_microsoft,
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
	});
}
	
function createWordsArray(object) {

	//LAST BUG 
	//emptying
	state.keyPhrasesOutput = [];
	state.wordCounterOutput = [];

	// state.keyPhrasesOutput.length = 0;

	// state.wordCounterOutput.length = 0;

	console.log('emptied', state.keyPhrasesOutput);

	object.documents.forEach(function(documentElement) {
		documentElement.keyPhrases.forEach(function(keyPhraseElement) {
			state.keyPhrasesOutput.push(keyPhraseElement.toLowerCase());
		}) 
		state.keyPhrasesOutput.sort();
	});
  
  
  // console.log(keyPhrasesOutput);

  state.keyPhrasesOutput.forEach(function (word) {
    var wordFound = state.wordCounterOutput.find(function (item) {

      return item.text === word;
    });

    //if (wordFound !== 'undefined')
    if (wordFound) {
      //is wordFound a truthy value

      wordFound.weight = wordFound.weight + 1;

    } else {

      state.wordCounterOutput.push({text: word, weight: 1})
    }

  });

  console.log('wordcounteroutput', state.wordCounterOutput);
	
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

			var request = {
			  placeId: state.placesID,
			};

			state.placesService.getDetails(request, function(placesDetailsObject) {
				getReviews(placesDetailsObject);
				
				getKeyPhrases(function(keyPhrasesObject) {
					createWordsArray(keyPhrasesObject);
					createWordCloud();
				})
				// getKeyPhrases(createWordsArray); 

				// //need to execute this last line AFTER output is created. 
				// createWordCloud();

			});
		});
	});	
})

initMap();

renderPage(state, $('main'));

//http://callbackhell.com/



