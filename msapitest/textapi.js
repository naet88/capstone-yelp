//MS Text Analytics - FREE TRIAL
// https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-text-analytics-quick-start

 // POST https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment
 // POST https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases
 // POST https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/languages


// API Key 1: 0c3b04acec264c47a5fce6cf873b15ed
// API Key 2: 1f4a60c7d2454b74887d32e1fa7178c8
// GUIDES: 
// https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-text-analytics-quick-start 
// https://docs.microsoft.com/en-us/azure/machine-learning/machine-learning-apps-text-analytics


//FIGURE IT OUT : headers for post method 

 
////
var APIkey = '0c3b04acec264c47a5fce6cf873b15ed';


// {language: "en", id: "0", text: "LYFE is a staple when I come to Palo Alto. I just sat the counter and then sit down with your number."}


function keyPhrasesAPI(callback) {
	var keyPhrases_URL = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases"; 
	
	var query = {
		"headers": {
			"Ocp-Apim-Subscription-Key": APIkey,
 			"Content-Type": "application/json",
 			// "Accept": 'application/json",
		},
		"documents": {
			"language": "en", 
			"id": "0", 
			"text": "LYFE is a staple when I come to Palo Alto. I just sat the counter and then sit down with your number."}
		}

	$.post(keyPhrases_URL, query, function(object) {
		console.log(object);
	});
}

keyPhrasesAPI();
