async function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/phonebook";
    document.getElementById("btnLoad").addEventListener("click", getAllPhones);
    document.getElementById("btnCreate").addEventListener("click", createContact);
  
    async function createContact() {
      const person = document.querySelector("#person").value;
      const phone = document.querySelector("#phone").value;
      fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify({
          person,
          phone,
        }),
      })
        .then((resp) => resp.json())
        .then(() => {
          getAllPhones();
          document.querySelector("#person").value = "";
          document.querySelector("#phone").value = "";
        });
    }
  
    async function getAllPhones() {
      const phonesInfo = await (await fetch(baseUrl)).json();
      
      const phoneBook = document.getElementById("phonebook");
      

      Object.values(phonesInfo).forEach((contact) => {
        const li = document.createElement("li");
  
        const delButton = document.createElement("button");
        delButton.textContent = "Delete";
  
        li.textContent = `${contact.person}: ${contact.phone}`;
        li.appendChild(delButton);
 
        phoneBook.appendChild(li);
        
        delButton.addEventListener("click", deleteContact);
  
        function deleteContact() {
 const id = contact._id;
          fetch(`http://localhost:3030/jsonstore/phonebook${id}`, {
            method: 'DELETE',
          });
         li.remove();
        }
      });
    }
  }
  
  attachEvents();
  