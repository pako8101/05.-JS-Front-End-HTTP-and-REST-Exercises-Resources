function solve(params) {
  const BASE_URL = "http://localhost:3030/jsonstore/tasks";

  const createElement = (
    tag,
    content = "",
    classes = [],
    id = "",
    listener = ""
  ) => {
    const element = document.createElement(tag);

    if (content) {
      element.textContent = content;
    }
    if (classes.length) {
      element.classList.add(...classes);
    }
    if (id) {
      element.id = id;
    }
    if (listener) {
      element.addEventListener("click", listener);
    }
    return element;
  };

  const btnHandler = (e) => {
    const operations = {
      "Add Weather": addWeather,
      "Edit Weather": editWeather,
      "Load History": loadHistory,
      Change: changeWeather,
      Delete: deleteWeather,
    };
    operations[e.target.textContent](e);
  };

  const changeWeather = (e) => {
    e.preventDefault();
    const mainDiv = e.target.parentElement.parentElement;
    edtiId = mainDiv.id;

    const location = mainDiv.querySelector("h2").textContent;
    const [date, temperature] = mainDiv.querySelectorAll("h3");

    fields.location.value = location;
    fields.date.value = date.textContent;
    fields.temperature.value = temperature.textContent;

    editWeatherBtn.disabled = false;
    addWeatherBtn.disabled = true;

    mainDiv.remove();
  };

  const addWeather = (e) => {
    fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(createNewWeather()),
    }).then(() => {});
  };

  const editWeather = (e) => {
    fetch(`${BASE_URL}${edtiId}`, {
      method: "PUT",
      body: JSON.stringify(createNewWeather()),
    }).then(() => {
      editWeatherBtn.disabled = true;
      addWeatherBtn.disabled = false;
    });
  };

  const listContainer = document.getElementById("list");

  const createNewWeather = () => {
    const newWeather = {};

    for (const [key, value] of Object.entries(fields)) {
      newWeather[key] = value.value;
    }
  };
  const loadHistory = (e) => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        listContainer.innerHTML = "";

        Object.values(data).forEach((item) => {
          const containerDiv = createElement(
            "div",
            "",
            ["container"],
            (id = item._id)
          );

          containerDiv.appendChild(createElement("h2", item.location, [], ""));
          containerDiv.appendChild(createElement("h3", item.data, [], ""));
          containerDiv.appendChild(
            createElement("h3", item.temperature, [], "celsius")
          );

          const btnsContainer = createElement("div", "", ["buttons-container"]);

          btnsContainer.appendChild(
            createElement("button", "Change", ["change-btn"], "")
          );
          btnsContainer.appendChild(
            createElement("button", "Delete", ["delete-btn"], "")
          );
          containerDiv.appendChild(btnsContainer);

          listContainer.appendChild(containerDiv);
        });
      });
  };

  // const deleteWeather = (e) => {
  //   e.preventDefault();
  //   edtiId = e.target.parentElement.parentElement;
  //   fetch(`${BASE_URL}/${edtiId}`, {
  //     method: "DELETE",
  //   }).then(loadHistory);

  // };

  function deleteWeather(taskLoc) {
    const httpHEaders = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    getIdByLocation(taskLoc)
      .then(id)
      .fetch(endpoints.delete(id), httpHEaders)
      .then(() => {
        loadTask();
        btnsContainer.Delete.removeAttribute("disabled");
        btnsContainer.Change.setAttribute("disabled", true);
        edtiId = null;
        clearAllSections();
      })

      .catch((err) => {
        console.error(err);
      });
  }

  let edtiId = "";

  const fields = {
    location: document.getElementById("location"),
    temperature: document.getElementById("temperature"),
    date: document.getElementById("date"),
  };

  const loadBtn = document.getElementById("load-history");
  loadBtn.addEventListener("click", btnHandler);

  const addWeatherBtn = document.getElementById("add-weather");
  addWeatherBtn.addEventListener("click", btnHandler);

  const editWeatherBtn = document.getElementById("change-btn");
  editWeatherBtn.addEventListener("click", btnHandler);

  const deleteButton = document.getElementById("delete-btn");
  deleteButton.addEventListener("click", btnHandler);
}

solve();

// const endpoints = {
//   update: (id) => `${BASE_URL}/${id}`,
//   delete: (id) => `${BASE_URL}/${id}`,
// };

// const locationElement = document.getElementById("location");
// const dateElement = document.getElementById("date");
// const temperatureNumber = document.getElementById("temperature");

// const confirmedVacations = document.getElementById("history");
// const list = document.getElementById("list");

// const addBtn = document.getElementById("add-weather");
// const editBtn = document.getElementById("edit-weather");
// const loadBtn = document.getElementById("load-history");
// const clearBtn = document.querySelector(".clear-btn");

// let selectedTaskId = null;

// loadBtn.addEventListener("click", loadTask);
// addBtn.addEventListener("click", addWeather);
// function loadTask(event) {
//   if (event) {
//     event.preventDefault();
//   }
//   clearAllSections();

//   fetch(BASE_URL).then((data) => data.json());
//   then((tasksResponse) => {
//     const task = Object.values(tasksResponse);
//     for (const { location, temp, date, _id } of task) {
//       const divContainer = createElement("div", list, null, "container");
//       const h2Location = createElement("h2", divContainer, location);
//       const h3Temp = createElement("h3", divContainer, temp, null, "celcius");
//       const h3Date = createElement("h3", divContainer, date);
//       const buttonContainer = createElement(
//         "div",
//         divContainer,
//         null,
//         "buttons-container"
//       );
//       const changeButton = createElement(
//         "button",
//         buttonContainer,
//         "Change",
//         "change-btn"
//       );
//       const deleteButton = createElement(
//         "button",
//         buttonContainer,
//         "Delete",
//         "delete-btn"
//       );

//       deleteButton.addEventListener('click',deleteTask);
//       changeButton.addEventListener('click',changeTask);
// buttonContainer.appendChild(changeButton);
// buttonContainer.appendChild(deleteButton);

// divContainer.appendChild(h2Location);
// divContainer.appendChild(h3Date);
// divContainer.appendChild(h3Temp);
// divContainer.appendChild(buttonContainer);

// list.appendChild(divContainer);
//     }
//   });
// }
// function addWeather(event) {
//     event.preventDefault();
//     if (locationElement.value !== '' && temperatureNumber.value !== '' && dateElement.value !== '') {

//     const loadWeather = JSON.stringify({
//         location:locationElement.value,
//         date:dateElement.value,
//         temp:temperatureNumber.value
//     });
//     const httpHEaders = {
//         method: 'POST',
//         body: loadWeather
//     };
//     fetch(BASE_URL,httpHEaders)
//     .then(() => {
//         loadTask();
//        clearAllInputs();
//     })
//     .catch((err) => {
//         console.error(err);
//     })
// }
// }
// function deleteTask(taskLoc) {

//     const httpHEaders = {
//         method:'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//     };
//  getIdByLocation(taskLoc)
//  .then(id)
//     .fetch(endpoints.delete(id),httpHEaders)
//     .then(()=>{
//         loadTask();
//         addBtn.removeAttribute('disabled');
//         changeButton.setAttribute('disabled',true);
//         selectedTaskId=null;
//        clearAllSections();
//     } )

//     .catch((err) => {
//         console.error(err);
//     })
// }
// async function changeTask(event) {
//     event.preventDefault();
//     selectedTaskId = await getIdByLocation(taskLocation);
//     locationElement.value = taskLocation;
//     dateElement.value = taskDate;
//     temperatureNumber.value = taskTemperature;
//  const changeLoad = JSON.stringify({
//     location:locationElement.value,
//     date:dateElement.value,
//     temp:temperatureNumber.value,
//     _id:selectedTaskId
//  });
// const httpHEaders = {
//     method:'PATCH',
//     body:changeLoad
// }
// fetch(endpoints.update,httpHEaders)
// .then(() =>{
//     loadTask();
//     addBtn.removeAttribute('disabled');
//     changeButton.setAttribute('disabled',true);
//     selectedTaskId=null;
//     clearAllInputs();
// })
// .catch((err)=>
// {
//     console.error(err);
// })

// clearAllSections();

// }
// function getIdByLocation(task) {
//     return fetch(BASE_URL)
//         .then(res => res.json())
//         .then(res => Object.entries(res).find(e => e[1].location == task)[1]._id);
// }

// function createElement(
//   type,
//   parentNode,
//   content,
//   classes,
//   id,
//   attributes,
//   useInnerHtml
// ) {
//   const htmlElement = document.createElement(type);

//   if (content && useInnerHtml) {
//     htmlElement.innerHTML = content;
//   } else {
//     if (content && type !== "input") {
//       htmlElement.textContent = content;
//     }

//     if (content && type === "input") {
//       htmlElement.value = content;
//     }
//   }

//   if (classes && classes.length > 0) {
//     htmlElement.classList.add(...classes);
//   }

//   if (id) {
//     htmlElement.id = id;
//   }

//   // { src: 'link', href: 'http' }
//   if (attributes) {
//     for (const key in attributes) {
//       htmlElement.setAttribute(key, attributes[key]);
//     }
//   }

//   if (parentNode) {
//     parentNode.appendChild(htmlElement);
//   }

//   return htmlElement;
// }
// function clearAllSections() {
//   list.innerHTML = "";
// }

// function clearAllInputs() {
//   locationElement.value = "";
//   temperatureNumber.value = "";
//   dateElement.value = "";
// }
