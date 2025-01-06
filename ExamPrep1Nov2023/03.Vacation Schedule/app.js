const baseUrl = 'http://localhost:3030/jsonstore/tasks/';

const loadVacation = document.getElementById('load-vacations');
const vacationList = document.getElementById('list');
const formElement = document.querySelector('.form form')
const nameInput = document.getElementById('name');

const numDaysInput = document.getElementById('num-days');
const fromDateInput = document.getElementById('from-date');
const formAddButton = document.getElementById('add-vacation');
const formEditButton = document.getElementById('edit-vacation');

loadVacation.addEventListener('click', loadVacations);

formAddButton.addEventListener('click', (e) => {
    e.preventDefault();

    const newVacation = {
        name: nameInput.value,
        days: numDaysInput.value,
        data: fromDateInput.value
    };

    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVacation)
    })
        .then(loadVacations)
        .then(clearForm);


});

formEditButton.addEventListener('click',(e)=>{
e.preventDefault();


})

function clearForm() {
    nameInput.value = '';
    numDaysInput.value = '';
    fromDateInput.value = '';

}

async function loadVacations() {
    return fetch(baseUrl)
        .then(res => res.json())
        .then(result => {
            renderVacations(Object.values(result));

        });
};


function renderVacations(vacations) {
    vacationList.innerHTML = '';
    vacations.map(renderVacation)
        .forEach(vacationElement => vacationList.appendChild(vacationElement));



}
function renderVacation(vacation) {

    const container = document.createElement('div');
    container.className = 'container';

    const h2Element = document.createElement('h2');
    h2Element.textContent = vacation.name;

    const h3DateElement = document.createElement('h3');
    h3DateElement.textContent = vacation.date;

    const h3DaysElement = document.createElement('h3');
    h3DaysElement.textContent = vacation.days;

    const changeButton = document.createElement('button');
    changeButton.className = 'change-btn';
    changeButton.textContent = 'Change';
    changeButton.addEventListener('click', () => {

        nameInput.value = vacation.name;
        numDaysInput.value = vacation.days;
        fromDateInput.value = vacation.data;

        container.remove();

        formEditButton.removeAttribute('disabled');
        formAddButton.setAttribute('disabled','disabled')

    })

    const doneButton = document.createElement('button');
    doneButton.className = 'done-btn';
    doneButton.textContent = 'Done';

    container.appendChild(h2Element);
    container.appendChild(h3DateElement);
    container.appendChild(h3DaysElement);
    container.appendChild(changeButton);
    container.appendChild(doneButton);

    return container;

}


// document.addEventListener('DOMContentLoaded', () => {
//     const loadButton = document.getElementById('load');
//     const addButton = document.getElementById('add');
//     const editButton = document.getElementById('edit');
//     const deleteButton = document.getElementById('delete');
//     const nameInput = document.getElementById('name');
//     const daysInput = document.getElementById('days');
//     const dateInput = document.getElementById('date');
//     const listContainer = document.getElementById('list');
// npm
//     let selectedVacationId = null;

//     loadButton.addEventListener('click', loadVacations);
//     addButton.addEventListener('click', addVacation);
//     editButton.addEventListener('click', editVacation);
//     deleteButton.addEventListener('click', deleteVacation);

//     async function loadVacations() {
//         try {
//             const response = await fetch('http://localhost:3030/jsonstore/tasks/');
//             const data = await response.json();

//             listContainer.innerHTML = '';
//             Object.entries(data).forEach(([id, vacation]) => {
//                 const vacationElement = createVacationElement(id, vacation.name, vacation.days, vacation.date);
//                 listContainer.appendChild(vacationElement);
//             });
//         } catch (error) {
//             console.error('Error loading vacations:', error.message);
//         }
//     }

//     async function addVacation() {
//         const name = nameInput.value.trim();
//         const days = daysInput.value.trim();
//         const date = dateInput.value.trim();

//         if (name !== '' && days !== '' && date !== '') {
//             try {
//                 await fetch('http://localhost:3030/jsonstore/tasks/', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ name, days, date }),
//                 });

//                 await loadVacations();
//                 clearInputFields();
//             } catch (error) {
//                 console.error('Error adding vacation:', error.message);
//             }
//         }
//     }

//     function editVacation() {
//         if (selectedVacationId) {
//             const name = nameInput.value.trim();
//             const days = daysInput.value.trim();
//             const date = dateInput.value.trim();

//             if (name !== '' && days !== '' && date !== '') {
//                 fetch(`http://localhost:3030/jsonstore/tasks/${selectedVacationId}`, {
//                     method: 'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ name, days, date }),
//                 })
//                     .then(() => loadVacations())
//                     .then(() => clearInputFields())
//                     .catch(error => console.error('Error editing vacation:', error.message));
//             }
//         }
//     }

//     function deleteVacation() {
//         if (selectedVacationId) {
//             fetch(`http://localhost:3030/jsonstore/tasks/${selectedVacationId}`, {
//                 method: 'DELETE',
//             })
//                 .then(() => loadVacations())
//                 .then(() => clearInputFields())
//                 .catch(error => console.error('Error deleting vacation:', error.message));
//         }
//     }

//     function createVacationElement(id, name, days, date) {
//         const vacationElement = document.createElement('div');
//         vacationElement.classList.add('vacation');
//         vacationElement.innerHTML = `
//             <span>${name} (${days} days, ${date})</span>
//             <button onclick="selectVacation('${id}')">Edit</button>
//             <button onclick="deleteVacationById('${id}')">Done</button>
//         `;
//         return vacationElement;
//     }

//     window.selectVacation = function (id) {
//         selectedVacationId = id;
//         const vacationElement = document.querySelector(`.vacation[data-id="${id}"] span`);
//         const [name, days, date] = vacationElement.textContent.split(' ');
//         nameInput.value = name;
//         daysInput.value = days;
//         dateInput.value = date;
//         addButton.disabled = true;
//         editButton.disabled = false;
//     };

//     window.deleteVacationById = function (id) {
//         selectedVacationId = id;
//         deleteVacation();
//     };

//     function clearInputFields() {
//         nameInput.value = '';
//         daysInput.value = '';
//         dateInput.value = '';
//         addButton.disabled = false;
//         editButton.disabled = true;
//     }
// });
