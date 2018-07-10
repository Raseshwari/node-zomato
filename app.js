const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const zomato = require('./zomato.js');

var cityOptions = {
	describe: 'City Name',
	demand: true,
	alias: 'c'
}

const argv = yargs
	.command('search','Search by city',{
		city:cityOptions
	}).help().argv;

var command = argv._[0];

if(command === 'search'){
	var cityResult = zomato.searchCollections(argv.city);
	//console.log(cityResult);
}
