async function attachEvents() {
  const baseUrl = "http://localhost:3030/jsonstore/collections/students";



  const tableBody = document.querySelector('tbody');
  const submitBtn = document.getElementById('submit');

  submitBtn.addEventListener('click', onLoad);


  const getResp = await (await fetch(baseUrl)).json();
  //const students = await getResp.json();

  Object.values(getResp).forEach((student) => {

    studentMake(student);
    // const row = document.createElement('tr');
    // row.innerHTML = `
    //           <tr>
    //               <td>${student.firstName}</td>
    //               <td>${student.lastName}</td>
    //               <td>${student.facultyNumber}</td>
    //               <td>${student.grade}</td>
    //           </tr>

    // `;

    // tableBody.appendChild(row);


  })


  async function onLoad() {

    const [firstName, lastName, facultyNumber, grade] = document.querySelectorAll('#form input');

    let isValidPost = firstName.value !== '' && lastName.value!== '' 
    && facultyNumber.value!== '' && grade.value !== '';

    if (isValidPost) {

      const newStudentInfo = {
        firstName: firstName.value,
        lastName: lastName.value,
        facultyNumber: facultyNumber.value,
        grade: grade.value
      }
      // debugger;
      await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(newStudentInfo)
      })
      studentMake(newStudentInfo);
      firstName.value = '';
      lastName.value = '';
      facultyNumber.value = '';
      grade.value = '';
  
    }


  }

  function studentMake(student) {
    const row = document.createElement('tr');
    row.innerHTML = `
            <tr>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.facultyNumber}</td>
                <td>${student.grade}</td>
            </tr>

  `;

    tableBody.appendChild(row);

  
  }
}

attachEvents();