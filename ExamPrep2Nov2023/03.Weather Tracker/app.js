const BASE_URL = "http://localhost:3030/jsonstore/tasks";

const endpoints = {
  update: (id) => `${BASE_URL}/${id}`,
  delete: (id) => `${BASE_URL}/${id}`,
};

const locationElement = document.getElementById("location");
const dateElement = document.getElementById("date");
const temperatureNumber = document.getElementById("temperature");

const confirmedVacations = document.getElementById("history");
const list = document.getElementById("list");

const addBtn = document.getElementById("add-weather");
const editBtn = document.getElementById("edit-weather");
const loadBtn = document.getElementById("load-history");
const clearBtn = document.querySelector(".clear-btn");

let selectedTaskId = null;

loadBtn.addEventListener("click", loadTask);
addBtn.addEventListener("click", addWeather);
function loadTask(event) {
  if (event) {
    event.preventDefault();
  }
  clearAllSections();

  fetch(BASE_URL).then((data) => data.json());
  then((tasksResponse) => {
    const task = Object.values(tasksResponse);
    for (const { location, temp, date, _id } of task) {
      const divContainer = createElement("div", list, null, "container");
      const h2Location = createElement("h2", divContainer, location);
      const h3Temp = createElement("h3", divContainer, temp, null, "celcius");
      const h3Date = createElement("h3", divContainer, date);
      const buttonContainer = createElement(
        "div",
        divContainer,
        null,
        "buttons-container"
      );
      const changeButton = createElement(
        "button",
        buttonContainer,
        "Change",
        "change-btn"
      );
      const deleteButton = createElement(
        "button",
        buttonContainer,
        "Delete",
        "delete-btn"
      );

      deleteButton.addEventListener('click',deleteTask);
      changeButton.addEventListener('click',changeTask);
buttonContainer.appendChild(changeButton);
buttonContainer.appendChild(deleteButton);

divContainer.appendChild(h2Location);
divContainer.appendChild(h3Date);
divContainer.appendChild(h3Temp);
divContainer.appendChild(buttonContainer);

list.appendChild(divContainer);
    }
  });
}
function addWeather(event) {
    event.preventDefault();
    if (locationElement.value !== '' && temperatureNumber.value !== '' && dateElement.value !== '') {
   
    const loadWeather = JSON.stringify({
        location:locationElement.value,
        date:dateElement.value,
        temp:temperatureNumber.value
    });
    const httpHEaders = {
        method: 'POST',
        body: loadWeather
    };
    fetch(BASE_URL,httpHEaders)
    .then(() => {
        loadTask();
       clearAllInputs();
    })
    .catch((err) => {
        console.error(err);
    })
}
}
function deleteTask(taskLoc) {
   
   
    const httpHEaders = {
        method:'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
 getIdByLocation(taskLoc)
 .then(id)
    .fetch(endpoints.delete(id),httpHEaders)
    .then(()=>{
        loadTask();
        addBtn.removeAttribute('disabled');
        changeButton.setAttribute('disabled',true);
        selectedTaskId=null;
       clearAllSections();
    } )

    .catch((err) => {
        console.error(err);
    })
}
async function changeTask(event) {
    event.preventDefault();
    selectedTaskId = await getIdByLocation(taskLocation);
    locationElement.value = taskLocation;
    dateElement.value = taskDate;
    temperatureNumber.value = taskTemperature;
 const changeLoad = JSON.stringify({
    location:locationElement.value,
    date:dateElement.value,
    temp:temperatureNumber.value,
    _id:selectedTaskId
 });
const httpHEaders = {
    method:'PATCH',
    body:changeLoad
}
fetch(endpoints.update,httpHEaders)
.then(() =>{
    loadTask();
    addBtn.removeAttribute('disabled');
    changeButton.setAttribute('disabled',true);
    selectedTaskId=null;
    clearAllInputs();
})
.catch((err)=>
{
    console.error(err);
})

clearAllSections();



}
function getIdByLocation(task) {
    return fetch(BASE_URL)
        .then(res => res.json())
        .then(res => Object.entries(res).find(e => e[1].location == task)[1]._id);
}

function createElement(
  type,
  parentNode,
  content,
  classes,
  id,
  attributes,
  useInnerHtml
) {
  const htmlElement = document.createElement(type);

  if (content && useInnerHtml) {
    htmlElement.innerHTML = content;
  } else {
    if (content && type !== "input") {
      htmlElement.textContent = content;
    }

    if (content && type === "input") {
      htmlElement.value = content;
    }
  }

  if (classes && classes.length > 0) {
    htmlElement.classList.add(...classes);
  }

  if (id) {
    htmlElement.id = id;
  }

  // { src: 'link', href: 'http' }
  if (attributes) {
    for (const key in attributes) {
      htmlElement.setAttribute(key, attributes[key]);
    }
  }

  if (parentNode) {
    parentNode.appendChild(htmlElement);
  }

  return htmlElement;
}
function clearAllSections() {
  list.innerHTML = "";
}

function clearAllInputs() {
  locationElement.value = "";
  temperatureNumber.value = "";
  dateElement.value = "";
}
