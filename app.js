//found this but not terribly helpful: https://arian.io/how-to-use-yelps-api-with-node/

// IMPORTANT THINGS: 
// Consumer Key	N2QTA_xW62VfjrBfdk5Ajg
// Consumer Secret	GaGj6X2-bvwA8Zt90yW4wo34e-s
// Token	BdK0pRcoM19VshswGYXeTcD14hIQsBbS
// Token Secret	LGhUDDD0IJbFKbL-g8YReWUalOM

//THIS IS HELP API V2.0

// var BASE_URL = 'https://api.yelp.com/v2/search?';

// function getDataFromApi() {
//   var query = {
//     oauth_consumer_key: 'N2QTA_xW62VfjrBfdk5Ajg',
//     oauth_token: 'BdK0pRcoM19VshswGYXeTcD14hIQsBbS',
//     oauth_signature_method: 'HMAC-SHA1',
//     oauth_signature: 'LGhUDDD0IJbFKbL-g8YReWUalOM',
//	   location: 'San Francisco',
//     // oauth_timestamp: //what?
//     // oauth_nonce: //what?
//   }
   
//   $.getJSON(BASE_URL, query, function(object) {
//   	console.log(object);
//   });
// }

// getDataFromApi();




//
//THIS IS YELP API FUSION
//
// App ID
// -6An82XdZBjE1Zw-4BayHA
// App Secret
// 11p9S4aMXHdMNPJPEeHTErdZUKkI2iSdBa952CKK4h3NHxqf7tvVe2tyLQWqEok3


var BASE_URL = 'https://api.yelp.com/oauth2/token';

function getDataFromApi() {
  var query = {
  	grant_type: 'client_credentials',
  	client_id: '-6An82XdZBjE1Zw-4BayHA', 
  	client_secret: '11p9S4aMXHdMNPJPEeHTErdZUKkI2iSdBa952CKK4h3NHxqf7tvVe2tyLQWqEok3',
  }
   
  $.getJSON(BASE_URL, query, function(object) {
  	console.log(object);
  });
}

getDataFromApi();