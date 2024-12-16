function attachEvents() {
    
   const  baseUrl = "http://localhost:3030/jsonstore/blog/";
   const loadPostButton = document.getElementById('btnLoadPosts');
   const viewButton = document.getElementById('btnViewPost');
   const postsSelect = document.getElementById('posts');
   const postTitle = document.getElementById('post-title');
   const postBody = document.getElementById('post-body');
   const postComments = document.getElementById('post-comments');

   let allPosts = {};

   loadPostButton.addEventListener('click',async ()=>{

    postsSelect.innerHTML = '';

    const resposne = await fetch(baseUrl + 'posts');
allPosts = await resposne.json();




for (const [postId,postObj] of Object.entries(allPosts)) {
   const option = document.createElement('option');

   option.value = postId;
   option.textContent = postObj.title;
   postsSelect.appendChild(option);

}


   });

viewButton.addEventListener('click', async () =>{

    postBody.innerHTML = '';
    postComments.innerHTML = '';

const postId = postsSelect.value;

postBody.textContent = allPosts[postId].body;
postTitle.textContent = allPosts[postId].title;

const response = await fetch(baseUrl + 'comments');
const commentsInfo = await response.json();

const filterComments = Object.values(commentsInfo).filter(e => e.postId == postId);
filterComments.forEach(comment => {

    const li = document.createElement('li');
li.id = comment.id;
li.textContent = comment.text;

postComments.appendChild(li);

   
    
})

});



}

attachEvents();


// function attachEvents() {
//     let posts;
//     document.querySelector("#btnLoadPosts").addEventListener("click", loadPosts);
  
//     document
//       .querySelector("#btnViewPost")
//       .addEventListener("click", loadSinglePost);
//   }
//   async function loadSinglePost() {
//     const result = await (
//       await fetch("http://localhost:3030/jsonstore/blog/comments")
//     ).json();
//     const selectedPost = posts[document.querySelector("#posts").value];
//     let comments = Object.values(result).filter(
//       (comment) => comment.postId === selectedPost.id
//     );
//     comments.forEach((comment) => {
//       const li = document.createElement("li");
//       li.id = comment.id;
//       li.textContent = comment.textContent;
//       document.querySelector("#post-comments").appendChild(li);
//     });
//   }
  
//   async function loadPosts() {
//     const result = await (
//       await fetch("http://localhost:3030/jsonstore/blog/posts")
//     ).json();
  
//     const postDropdown = document.querySelector("#posts");
//     Object.values(
//       result.forEach((post) => {
//         const option = document.createElement("option");
//         option.value = post.id;
//         option.textContent = post.title;
  
//         postDropdown.appendChild(option);
//       })
//     );
//   }
  
//   attachEvents();
  