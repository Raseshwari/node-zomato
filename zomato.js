const zomato = require('zomato.js');
const fs = require('fs');
const axios = require('axios');
// const request = require('request');

const zom = new zomato('8b551e28f34465c69757d3062248f6c7');

var createCategoriesJSON = () => {
		zom.categories().then(function(data){
		fs.writeFileSync('restaurant-categories.json', JSON.stringify(data));
	}).catch(function(err){
		console.error(err);
	});
};

var setCityLocation = (city) => {

	var enAdd = encodeURIComponent(city);
	var geocodeUrl = `https://maps.google.com/maps/api/geocode/json?address=${enAdd}&key=AIzaSyBmbzm3gv3qx5Y-hgBgwsKhYl8CQkcVauY`;
	axios.get(geocodeUrl).then((response) => {
	
	if(response.data.status === 'ZERO_RESULTS'){
			throw new Error("Unable to find that address");
	}

	var loc = {
	lat: response.data.results[0].geometry.location.lat,
	lng: response.data.results[0].geometry.location.lng
	}
	fs.writeFileSync('loc-details.json', JSON.stringify(loc));
	});
};

var getCityLocation = () =>{
	var loc = fs.readFileSync('loc-details.json');
	return JSON.parse(loc);
};

var getCuisines = (lat, lng) => {
	zom.cuisines({
		lat:lat,
		lon:lng
	}).then((response) => {
		fs.writeFileSync('cuisine-data.json', JSON.stringify(response));
	}).catch((err) => {
		console.log("Unable to  fetch cuisines");
	})
}

var request = require('request');
 
var options = {
  url: 'https://developers.zomato.com/api/v2.1/establishments?lat=19.0759837&lon=72.8776559',
  headers: {
    "Accept": "application/json",
    "user-key": "8b551e28f34465c69757d3062248f6c7"
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.stringify(body)
   	console.log(body);
  }
}
 
var info = request(options, callback);


setCityLocation("mumbai");
var loc = getCityLocation();
//getCuisines(loc.lat, loc.lng);
//getEstablishments(loc.lat, loc.lng);


module.exports = {
	createCategoriesJSON,
	getCityLocation	
}

