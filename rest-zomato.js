const request = require('request');
const fs = require('fs');
const axios = require('axios');

 var iniHeaders = {
    "Accept": "application/json",
    "user-key": "8b551e28f34465c69757d3062248f6c7"
 }

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

 var getCityLocation = (loc) =>{
 	var loc = fs.readFileSync('loc-details.json');
 	return JSON.parse(loc);
 };

 setCityLocation("new jersey");
 const loc = getCityLocation();

 var getEstablishments = () => {
 	var options = {
 		url : `https://developers.zomato.com/api/v2.1/establishments?lat=${loc.lat}&lon=${loc.lng}`,
 		headers : iniHeaders
 	};

 	function callback(error, response, body) {
 	  if (!error && response.statusCode == 200) {
 	   	fs.writeFileSync('rest-estab.json',body);
 	  }else{
 	  	console.log("Unable to find establishments");
 	  }
 	}

 	request(options, (callback));
 };

 var getCuisines = () => {
 	var options = {
 		url : `https://developers.zomato.com/api/v2.1/cuisines?lat=${loc.lat}&lon=${loc.lng}`,
 		headers : iniHeaders
 	};

 	function callback(error, response, body) {
 	  if (!error && response.statusCode == 200) {
 	   	fs.writeFileSync('rest-cuisines.json',body);
 	  }else{
 	  	console.log("Unable to find establishments");
 	  }
 	}

 	request(options, (callback));	
 };

 var getCategories = () => {
 	var options = {
 		url : `https://developers.zomato.com/api/v2.1/categories`,
 		headers : iniHeaders
 	};

 	function callback(error, response, body) {
 	  if (!error && response.statusCode == 200) {
 	   	fs.writeFileSync('rest-categories.json',body, {spaces: 2});
 	  }else{
 	  	console.log("Unable to find establishments");
 	  }
 	}

 	request(options, (callback));	
 };


 var getNearBy = () => {
 	var options = {
 		url : `https://developers.zomato.com/api/v2.1/geocode?lat=${loc.lat}&lon=${loc.lng}`,
 		headers : iniHeaders
 	};

 	function callback(error, response, body) {
 	  if (!error && response.statusCode == 200) {
 	   	fs.writeFileSync('rest-nearby.json',body, {spaces: 2});
 	  }else{
 	  	console.log("Unable to find nearby restaurants");
 	  }
 	}

 	request(options, (callback));	
 };

 var fetchListCategories = () => {
 	var cats = fs.readFileSync('rest-categories.json');
 	var info = JSON.parse(cats)
 	info.categories.forEach(function(key){
 		console.log(key.categories.name);
 	});
 };

 var fetchListCuisines = () => {
 	var cuisines = fs.readFileSync('rest-cuisines.json');
 	var info = JSON.parse(cuisines)
 	info.cuisines.forEach(function(key){
 		console.log(key.cuisine.cuisine_name);
 	});
 }

 var fetchEstablishments = () => {
 	var estabs = fs.readFileSync('rest-estab.json');
 	var info = JSON.parse(estabs)
 	info.establishments.forEach(function(key){
 		console.log(key.establishment.name);
 	});
 };

 getEstablishments();
 getCuisines();
 getCategories();
 fetchListCategories();
 fetchListCuisines();
 fetchEstablishments();
 getNearBy();