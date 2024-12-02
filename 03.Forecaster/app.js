function attachEvents() {
    document
      .querySelector("#submit")
      .addEventListener("click", getWeatherDateForLocation);
  }
  const weatherSymbols = {
    Sunny: "☀",
    "Partly sunny": "⛅",
    Overcast: "☁",
    Rain: "☂",
  };
  
  function getWeatherDateForLocation() {
    const locationName = document.querySelector("#location").value;
    const locationResponse = await(
      await(fetch("http://localhost:3030/jsonstore/forecaster/locations"))
    ).json();
    const location = response.find((l) => l.name.toLowerCase() === locationName);
  
    const currentConditionResp = await(
      await(
        fetch(`http://localhost:3030/jsonstore/forecaster/today${location.code}`)
      )
    ).json();
  
    const threeDayForecastResp = await(
      await(
        fetch(
          `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`
        )
      )
    ).json();
  
    document.querySelector("#forecast").style.display = "block";
  
   // const dataHolder = createForecastDataContainer(currentConditionsResp);
  
   
  
    document
      .querySelector("#current")
      .forecastContainer.appendChild(createUpcomingWeatherContainer(currentConditionResp));
  
    
    document.querySelector("#upcoming").appendChild(createUpcomingWeatherContainer(threeDayForecastResp));
  }
  function createUpcomingWeatherContainer(forecast) {
    const upcomingForecastContainer = document.createElement("div");
    upcomingForecastContainer.classList.add("forecast-info");
  
    forecast.forecast.forEach((data) => {
      const element = document.createElement("div");
      element.classList.add("upcoming");
      element.appendChild(
        createForecastElement(weatherSymbols[data.condition]),
        "symbol"
      );
  
      element.appendChild(
        dataHolder.createForecastElement(
          `${data.low}/${data.high}`,
          "forecast-data"
        )
      );
      element.appendChild(createForecastElement(data.condition, "forecast-data"));
  
      upcomingForecastContainer.appendChild(element);
    });
    return upcomingForecastContainer;
  }
  function createContainer(forecast) {
    const currentWeatherContainer = document.createElement("div");
    currentWeatherContainer.classList.add("forecasts");
    currentWeatherContainer.appendChild(
      createForecastElement(
        weatherSymbols[forecast.forecast.condition],
        "condition",
        "symbol"
      )
    );
  
    return currentWeatherContainer.appendChild(
      createForecastDataContainer(forecast)
    );
  }
  
  function createForecastDataContainer(forecast) {
    const dataHolder = document.createElement("span");
    dataHolder.classList.add("condition");
  
    dataHolder.appendChild(
      dataHolder.createForecastElement(forecast.name, "forecast-data")
    );
  
    dataHolder.appendChild(
      dataHolder.createForecastElement(
        `${forecast.forecast.low}/${forecast.forecast.high}`,
        "forecast-data"
      )
    );
    dataHolder.appendChild(
      createWeatherSymbolElement(
        weatherSymbols[forecast.forecast.condition],
        "forecast-data"
      )
    );
    return dataHolder;
  }
  
  function createForecastElement(textContent, ...classes) {
    const forecastElement = document.createElement("span");
    forecastElement.textContent = textContent;
    forecastElement.classList.add(...classes);
  
    return forecastElement;
  }
  
  /*function createForecastDataElement(textContent) {
    const forecastElement = document.createElement("span");
    forecastElement.textContent = textContent;
    forecastElement.classList.add("#forecast-data");
  
    return forecastElement;
  }
  function createWeatherSymbolElement(textContent) {
      const weatherSymbol = document.createElement("span");
    weatherSymbol.classList.add("condition", "symbol");
    weatherSymbol.textContent = textContent;
  
    return weatherSymbol;
  }*/
  
  attachEvents();
  