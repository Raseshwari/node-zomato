const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const zomato = require('./rest-zomato');
var bodyParser = require('body-parser');

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
	res.render('results.hbs');
})

//binding app to machine
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
