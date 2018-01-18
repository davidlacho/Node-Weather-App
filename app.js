const config = require('./config');
const weather = require('./weather');
const APIKey = config.getAPIKey();

const readline = require('readline');
const rl = readline.createInterface( {
  input: process.stdin,
  output: process.stdout
});

rl.question('What city or zip code? ', (input) => {
  weather.getWeather(input, APIKey);
  rl.close();
});
