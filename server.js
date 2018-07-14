const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const zomato = require('./rest-zomato');
var bodyParser = require('body-parser');
var querystring = require('querystring');

//setting heroku and default port
const port = process.env.PORT || 4000;

var app = express();

//using handlebars i.e., set handlebars
app.set('view engine','hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Route handlers
app.get('/', (req, res) => {
	res.render('home.hbs');
});

//POST method route
app.post('/', function (req, res) {
  console.log(req.body.city);
  res.render('search.hbs', {
  	test: req.body.city
  });
});

app.get('/search', (req,res) => {
	res.send('Search page');
});

app.post('/search', (req,res) => {

	var searchParams = {
		cuisine: req.body.cuisine,
		estab: req.body.estab,
		category: req.body.category,
		city: req.body.city
	}; 
	zomato.getRestaurant(searchParams);
	var rest_names = zomato.fetchListRestaurants();
	// var test = {
	// 	name: rest_names[0].name,
	// 	rating: rest_names[0].rating
	// };
	res.render('results.hbs', {
		rest_name0: rest_names[0],
		rest_names1: rest_names[1],
		rest_names2: rest_names[2],
		rest_names3: rest_names[3],
		rest_names4: rest_names[4],
		rest_names5: rest_names[5],
		rest_names6: rest_names[6],
		rest_names7: rest_names[7],
		rest_names8: rest_names[8],
		rest_names9: rest_names[9]
	});
});

app.get('/results', (req,res) => {
	

});

//binding app to machine
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
