const baseUrl = 'http://localhost:3030/jsonstore/collections/books';

function attachEvents() {
  const loadBooksButton = document.getElementById("loadBooks");
  const bookListElement = document.getElementById("book-list");

  const createBookButton = document.querySelector('#form button');
  const authorInput = document.getElementById("author");
  const titleInput = document.querySelector("#form input[name=title]");
  let selectedBookId = null;
            const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", (e) =>{
            fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
              method: "DELETE"
          })
              .then(response => response.json())
              .then(() => {
                  loadBooks();
                  clearForm();
              })
              .catch(error => console.error("Error deleting book:", error));
          });

loadBooksButton.addEventListener('click', (e) => {
  fetch('http://localhost:3030/jsonstore/collections/books')
  .then(res => res.json())
  .then(result => {
    bookListElement.innerHTML = "";

    const books = Object.values(result);

    books.map(book=> createBookItem(book)).forEach(bookElement => {
  bookListElement.appendChild(bookElement);
    });
  });
});

createBookButton.addEventListener('click',(e) => {
  e.preventDefault();
const title = titleInput.value;
const author = authorInput.value;

fetch(baseUrl, {
  method: 'POST',
  headers:{
'Content-Type': 'application/json'
  },
body: JSON.stringify({
  title:title,
  author,
})
})

.then(res => res.json())
.then(result => {
  const bookElement = createBookItem({title,author})
bookListElement.appendChild(bookElement);

titleInput.value = '';
authorInput.value = '';
  
})
.catch(err => {
  console.log(err);
  
})



}
)
}
  function deleteBook(id) {
      fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
          method: "DELETE"
      })
          .then(response => response.json())
          .then(() => {
              loadBooks();
              clearForm();
          })
          .catch(error => console.error("Error deleting book:", error));
  }

  function clearForm() {
      selectedBookId = null;
      authorInput.value = "";
      titleInput.value = "";
}


function createBookItem(book){
const bookTr = document.createElement('tr')

// bookTr.innerHTML = `<td>${book.title}</td>
//                 <td>${book.author}</td>
//                 <td>
//                     <button>Edit</button>
//                     <button>Delete</button>
//                 </td>`;

const titleTd = document.createElement('td');
titleTd.innerText = book.title;
const authroTd = document.createElement('td');
authroTd.textContent = book.author;


const editButton = document.createElement('button');
editButton.textContent = 'Edit';
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';

const butonsTd = document.createElement('td');

butonsTd.appendChild(editButton);
butonsTd.appendChild(deleteButton);

bookTr.appendChild(titleTd);
bookTr.appendChild(authroTd);
bookTr.appendChild(butonsTd);

                return bookTr;

}
//   function loadBooks() {
//       fetch("http://localhost:3030/jsonstore/collections/books")
//           .then(response => response.json())
//           .then(data => {
//               displayBooks(data);
//           })
//           .catch(error => console.error("Error loading books:", error));
//   }

//   function displayBooks(books) {
//       booksList.innerHTML = "";

//       books.forEach(book => {
//           const listItem = document.createElement("li");
//           listItem.textContent = `${book.author} - ${book.title}`;

//           const editButton = document.createElement("button");
//           editButton.textContent = "Edit";
//           editButton.addEventListener("click", () => editBook(book._id, book.author, book.title));

//           const deleteButton = document.createElement("button");
//           deleteButton.textContent = "Delete";
//           deleteButton.addEventListener("click", () => deleteBook(book._id));

//           listItem.appendChild(editButton);
//           listItem.appendChild(deleteButton);

//           booksList.appendChild(listItem);
//       });
//   }

//   function editBook(id, author, title) {
//       selectedBookId = id;
//       authorInput.value = author;
//       titleInput.value = title;
//   }

//   function createOrUpdateBook() {
//       const author = authorInput.value;
//       const title = titleInput.value;

//       if (!author || !title) {
//           console.log("Please fill in both author and title.");
//           return;
//       }

//       const url = selectedBookId
//           ? `http://localhost:3030/jsonstore/collections/books/${selectedBookId}`
//           : "http://localhost:3030/jsonstore/collections/books";

//       const method = selectedBookId ? "PUT" : "POST";

//       fetch(url, {
//           method,
//           headers: {
//               "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ author, title })
//       })
//           .then(response => response.json())
//           .then(() => {
//               loadBooks();
//               clearForm();
//           })
//           .catch(error => console.error("Error creating/updating book:", error));
//   }

//   function deleteBook(id) {
//       fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
//           method: "DELETE"
//       })
//           .then(response => response.json())
//           .then(() => {
//               loadBooks();
//               clearForm();
//           })
//           .catch(error => console.error("Error deleting book:", error));
//   }

//   function clearForm() {
//       selectedBookId = null;
//       authorInput.value = "";
//       titleInput.value = "";
// }

attachEvents();