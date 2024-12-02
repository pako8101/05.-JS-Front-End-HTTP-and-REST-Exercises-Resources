function getInfo() {
    const busStopId = document.querySelector("#stopId").value;
    const list = document.querySelector("ul");
  const stopName =  document.querySelector("#stopName");
    list.innerHTML = "";
  
    fetch(`http://localhost:3030/jsonstore/bus/businfo/:${busStopId}`)
      .then((res) => res.json)
      .then((busStop) => {
      stopName .textContent = busStop.name;
  
        Object.entries(busStop.buses).map(([busNumber, timeInMinutes]) => {
          const item = document.createElement("li");
          item.textContent = `Bus ${busNumber} arrives in ${timeInMinutes} minutes`;
  
          list.appendChild(item);
        });
      })
      .catch(() => {
          stopName.textContent = "Error";
      })
  }
  