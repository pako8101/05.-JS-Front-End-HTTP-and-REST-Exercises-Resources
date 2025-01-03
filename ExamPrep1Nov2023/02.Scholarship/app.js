window.addEventListener("load", solve);

function solve(){

    const previewList = document.getElementById('preview-list');
    const candidatesList = document.getElementById('candidates-list');
const studentInput = document.getElementById('student');
const universityInput = document.getElementById('university');
const scoreInput = document.getElementById('score');
const nextButton = document.getElementById('next-btn');

nextButton.addEventListener('click',(e) =>{
    e.preventDefault();
    if (!studentInput.value|| !universityInput.value  || !scoreInput.value) {
                 return;
               }
    
    const liElem = document.createElement('li');
    liElem.className = 'application';

    const articleElem = document.createElement('article');

    const articleHeader = document.createElement('h4');
articleHeader.textContent =  studentInput.value;

    const universityParagraph = document.createElement('p');
    universityParagraph.textContent = `University: ${ universityInput.value}`;

    const scoreParagraph = document.createElement('p');
    scoreParagraph.textContent = `Score: ${scoreInput.value}`;

    articleElem.appendChild(articleHeader);
    articleElem.appendChild(universityParagraph);
    articleElem.appendChild(scoreParagraph);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply';

    liElem.appendChild(articleElem);
    liElem.appendChild(editButton);
    liElem.appendChild(applyButton);


previewList.appendChild(liElem);

clearForm();
nextButton.setAttribute('disabled',true);

editButton.addEventListener('click',(e)=>{

   const studentName = previewList.querySelector('h4').textContent;

  const paragrElemets= previewList.querySelectorAll('article p');
  const [uniP,scoreP]= Array.from(paragrElemets)

   

    studentInput.value = studentName;
    universityInput.value = uniP.textContent.split(': ').at(1);
    scoreInput.value = scoreP.textContent.split(': ').at(1);

    previewList.innerHTML='';
nextButton.removeAttribute('disabled');
});

applyButton.addEventListener('click',()=>{

    editButton.remove();
    applyButton.remove(); 
candidatesList.appendChild(liElem);

previewList.innerHTML = '';

nextButton.removeAttribute('disabled');


})

});
function clearForm() {
    studentInput.value = '';
universityInput.value = '';
scoreInput.value = '';
    
}


}

//   function solve() {
//     const studentNameInput = document.getElementById('student');
//     const universityInput = document.getElementById('university');
//     const scoreInput = document.getElementById('score');
//     const addButton = document.getElementById('add');
//     const previewList = document.getElementById('preview-list');
//     const candidatesList = document.getElementById('candidates-list');
//     const nextButton = document.getElementById('next-btn');

//     addButton.addEventListener('click', function () {
//         const studentName = studentNameInput.value.trim();
//         const university = universityInput.value.trim();
//         const score = scoreInput.value.trim();

//         if (studentName !== '' && university !== '' && score !== '') {
//             return;
//         }
//             const listItem = document.createElement('li');
//             listItem.innerHTML = `<strong>${studentName}</strong> from <span>${university}</span> with ${score} scores.`;

//             const editButton = document.createElement('button');
//             editButton.textContent = 'Edit';
//             editButton.addEventListener('click', function () {
//                 studentNameInput.value = studentName;
//                 universityInput.value = university;
//                 scoreInput.value = score;

//                 listItem.remove();
//                 nextButton.disabled = false;
//             });

//             const applyButton = document.createElement('button');
//             applyButton.textContent = 'Apply';
//             applyButton.addEventListener('click', function () {
//                 listItem.remove();
//                 candidatesList.appendChild(listItem);
//                 nextButton.disabled = false;
//             });

//             listItem.appendChild(editButton);
//             listItem.appendChild(applyButton);
//             previewList.appendChild(listItem);

//             // Clear input fields
//             studentNameInput.value = '';
//             universityInput.value = '';
//             scoreInput.value = '';
//             nextButton.disabled = true;
        
//     });
// }
  
  
  