getWeather = (input, APIKey) => {

  let urlSearch = '';
  if (input.match(/^\d/)) {
    urlSearch+= `zip=${input}`;
  } else {
    urlSearch+= `q=${input}`;
  }
  urlSearch+= `&APPID=${APIKey}`

  try {
    let requestURL = `http://api.openweathermap.org/data/2.5/weather?${urlSearch}&units=imperial`;
    const http = require('http');
    const request = http.get(requestURL, (res) => {
      const { statusCode } = res;
      if (statusCode === 200) {
        let rawData= '';
        res.on('data', (chunk) => {
          rawData += chunk.toString();
        });
        res.on('end', () => {
          console.log('Reading Data...');
          try {
            const parsedData = JSON.parse(rawData);
            let name = parsedData.name;
            let description = parsedData.weather[0].description;
            let tempMax = parsedData.main.temp_max;
            let tempMin = parsedData.main.temp_min;
            let currentTemp = parsedData.main.temp;
            printWeather(name, description, tempMax, tempMin, currentTemp);
          } catch (e) {
            console.error(`Error in JSON parsing: ${e.message}`);
          }
        });
      } else {
        const { statusMessage } = res;
        console.error(`Server responded with error: ${statusCode}: ${statusMessage}`)
      }
    }).on('error', (e)=> {
      console.error(`http.get error: ${e.message}`);
    });
  } catch (e) {
    console.error(`Asynchronous error in https request: ${e.message}`);
  }
};

printWeather = (name, description, tempMax, tempMin, currentTemp) => {
  console.log(`There's ${description} and it's ${currentTemp}°F in ${name} right now, with a high of ${tempMax}°F and a low of ${tempMin}°F.`)
}

module.exports.getWeather = getWeather;
