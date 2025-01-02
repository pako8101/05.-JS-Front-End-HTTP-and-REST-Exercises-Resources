window.addEventListener("load", solve);


  function solve() {
    const studentNameInput = document.getElementById('student');
    const universityInput = document.getElementById('university');
    const scoreInput = document.getElementById('score');
    const addButton = document.getElementById('add');
    const previewList = document.getElementById('preview-list');
    const candidatesList = document.getElementById('candidates-list');
    const nextButton = document.getElementById('next-btn');

    addButton.addEventListener('click', function () {
        const studentName = studentNameInput.value.trim();
        const university = universityInput.value.trim();
        const score = scoreInput.value.trim();

        if (studentName !== '' && university !== '' && score !== '') {
            return;
        }
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${studentName}</strong> from <span>${university}</span> with ${score} scores.`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', function () {
                studentNameInput.value = studentName;
                universityInput.value = university;
                scoreInput.value = score;

                listItem.remove();
                nextButton.disabled = false;
            });

            const applyButton = document.createElement('button');
            applyButton.textContent = 'Apply';
            applyButton.addEventListener('click', function () {
                listItem.remove();
                candidatesList.appendChild(listItem);
                nextButton.disabled = false;
            });

            listItem.appendChild(editButton);
            listItem.appendChild(applyButton);
            previewList.appendChild(listItem);

            // Clear input fields
            studentNameInput.value = '';
            universityInput.value = '';
            scoreInput.value = '';
            nextButton.disabled = true;
        
    });
}
  
  
  