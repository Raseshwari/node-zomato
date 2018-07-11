const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const zomato = require('./rest-zomato.js');
const promptly = require('promptly');

var cityOptions = {
	describe: 'City Name',
	demand: true,
	alias: 'citi'
};

var cuisines = {
	describe: 'Type of Cuisines',
	demand: true,
	alias: 'cus'
};

var estabs = {
	describe: 'Type of Restaurants',
	demand: true
}

var prompt = require('prompt');

  prompt.start();

  console.log("Select the desired option");
  console.log("1. List of Cuisines")




  prompt.get(['options', 'email'], function (err, result) {
    console.log('Command-line input received:');
    console.log('  username: ' + result.username);
    console.log('  email: ' + result.email);
  });

// const argv = yargs
// 	.command('search','Search nearby city',{
// 		city:cityOptions
// 	}).help().argv;

// var command = argv._[0];

// if(command === 'search'){
// 	zomato.
// }
