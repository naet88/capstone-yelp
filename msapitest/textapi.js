//MS Text Analytics - FREE TRIAL
// https://westus.api.cognitive.microsoft.com/text/analytics/v2.0
 // POST https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment
 // POST https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases
 // POST https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/languages

// API Key 1: 0c3b04acec264c47a5fce6cf873b15ed
// API Key 2: 1f4a60c7d2454b74887d32e1fa7178c8
// GUIDES: 
// https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-text-analytics-quick-start 
// https://docs.microsoft.com/en-us/azure/machine-learning/machine-learning-apps-text-analytics

var query = 

{"Inputs":
[
    {"Id":"1","Text":"It was a wonderful hotel to stay at, with unique decor and friendly staff"},
    {"Id":"2","Text":"It was an amazing build conference, with very interesting talks"},
    {"Id":"3","Text":"The traffic was terrible, I spent three hours going to the airport"}
]}