document.addEventListener('DOMContentLoaded', () => {
    const loadButton = document.getElementById('load');
    const addButton = document.getElementById('add');
    const editButton = document.getElementById('edit');
    const deleteButton = document.getElementById('delete');
    const nameInput = document.getElementById('name');
    const daysInput = document.getElementById('days');
    const dateInput = document.getElementById('date');
    const listContainer = document.getElementById('list');
npm
    let selectedVacationId = null;

    loadButton.addEventListener('click', loadVacations);
    addButton.addEventListener('click', addVacation);
    editButton.addEventListener('click', editVacation);
    deleteButton.addEventListener('click', deleteVacation);

    async function loadVacations() {
        try {
            const response = await fetch('http://localhost:3030/jsonstore/tasks/');
            const data = await response.json();

            listContainer.innerHTML = '';
            Object.entries(data).forEach(([id, vacation]) => {
                const vacationElement = createVacationElement(id, vacation.name, vacation.days, vacation.date);
                listContainer.appendChild(vacationElement);
            });
        } catch (error) {
            console.error('Error loading vacations:', error.message);
        }
    }

    async function addVacation() {
        const name = nameInput.value.trim();
        const days = daysInput.value.trim();
        const date = dateInput.value.trim();

        if (name !== '' && days !== '' && date !== '') {
            try {
                await fetch('http://localhost:3030/jsonstore/tasks/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, days, date }),
                });

                await loadVacations();
                clearInputFields();
            } catch (error) {
                console.error('Error adding vacation:', error.message);
            }
        }
    }

    function editVacation() {
        if (selectedVacationId) {
            const name = nameInput.value.trim();
            const days = daysInput.value.trim();
            const date = dateInput.value.trim();

            if (name !== '' && days !== '' && date !== '') {
                fetch(`http://localhost:3030/jsonstore/tasks/${selectedVacationId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, days, date }),
                })
                    .then(() => loadVacations())
                    .then(() => clearInputFields())
                    .catch(error => console.error('Error editing vacation:', error.message));
            }
        }
    }

    function deleteVacation() {
        if (selectedVacationId) {
            fetch(`http://localhost:3030/jsonstore/tasks/${selectedVacationId}`, {
                method: 'DELETE',
            })
                .then(() => loadVacations())
                .then(() => clearInputFields())
                .catch(error => console.error('Error deleting vacation:', error.message));
        }
    }

    function createVacationElement(id, name, days, date) {
        const vacationElement = document.createElement('div');
        vacationElement.classList.add('vacation');
        vacationElement.innerHTML = `
            <span>${name} (${days} days, ${date})</span>
            <button onclick="selectVacation('${id}')">Edit</button>
            <button onclick="deleteVacationById('${id}')">Done</button>
        `;
        return vacationElement;
    }

    window.selectVacation = function (id) {
        selectedVacationId = id;
        const vacationElement = document.querySelector(`.vacation[data-id="${id}"] span`);
        const [name, days, date] = vacationElement.textContent.split(' ');
        nameInput.value = name;
        daysInput.value = days;
        dateInput.value = date;
        addButton.disabled = true;
        editButton.disabled = false;
    };

    window.deleteVacationById = function (id) {
        selectedVacationId = id;
        deleteVacation();
    };

    function clearInputFields() {
        nameInput.value = '';
        daysInput.value = '';
        dateInput.value = '';
        addButton.disabled = false;
        editButton.disabled = true;
    }
});
