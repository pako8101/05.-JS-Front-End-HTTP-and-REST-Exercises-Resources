async function fetchBooks() {
    try {
          const response = await fetch('http://localhost:3030/jsonstore/collections/books');
    const data = await response.json();

    return data;
    } catch (error) {
        console.log(error);
        
    }

  
    
}
fetchBooks()
.then(result =>{
    console.log(result);
    
})