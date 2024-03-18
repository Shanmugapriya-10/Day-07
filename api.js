var request = new XMLHttpRequest();

request.open("GET", "https://restcountries.com/v3.1/all");

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);

    //Q-1 Filter countries from Asia continent
    const asiaCountries = data.filter(country => country.region === 'Asia');
    console.log("Countries from Asia:", asiaCountries.map(country => country.name));

    //Q-2 Filter countries with a population of less than 2 lakhs
    const populationLessThan2Lakhs = data.filter(country => country.population < 200000);
    console.log("Countries with population less than 2 lakhs:", populationLessThan2Lakhs.map(country => country.name));

    //Q-3 Print name, capital, and flag using forEach function
    data.forEach(country => {
      console.log(`Name: ${country.name}, Capital: ${country.capital}, Flag: ${country.flags.svg}`);
    });

    //Q-4 Calculate total population of countries using reduce function
    const totalPopulation = data.reduce((acc, country) => acc + country.population, 0);
    console.log("Total population of countries:", totalPopulation);

    //Q-5 Find the country that uses US dollars as currency
    const countryWithUSD = data.find(country => country.currencies && country.currencies.USD);
    if (countryWithUSD) {
      console.log("Country that uses US dollars:", countryWithUSD.name);
    } else {
      console.log("No country uses US dollars as currency.");
    }
  } else {
    // We reached our target server, but it returned an error
    console.error("Failed to fetch data. Status:", request.status);
  }
};

request.onerror = function () {
  // There was a connection error of some sort
  console.error("Connection error while fetching data.");
};

request.send();
