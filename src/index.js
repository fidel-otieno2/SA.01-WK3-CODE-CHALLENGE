const unsplashKey = 'your_unsplash_api_key_here';

document.addEventListener("DOMContentLoaded", main);

const postListDiv = document.getElementById("post-list");
const postDetailDiv = document.getElementById("post-detail");

function main() {
  displayPosts();
  addNewPostListener();
  addImageFetcher();
}

function getPosts() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  return posts;
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function displayPosts() {
  const posts = getPosts();
  postListDiv.innerHTML = "";
  if (posts.length === 0) {
    postListDiv.innerHTML = "<p>No posts available.</p>";
  } else {
    posts.forEach(post => {
      const div = document.createElement("div");
      div.innerHTML = `
        ${post.image ? `<img src="${post.image}" alt="" style="width:300px;height:300px;object-fit:cover;margin-right:8px;">` : ""}
        <span>${post.title}</span>
      `;
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.cursor = "pointer";
      div.addEventListener("click", () => handlePostClick(post.id));
      postListDiv.appendChild(div);
    });
    handlePostClick(posts[0].id);
  }
}

function handlePostClick(id) {
  const posts = getPosts();
  const post = posts.find(p => p.id === id);
  postDetailDiv.innerHTML = `
    <h2>${post.title}</h2>
    ${post.image ? `<img src="${post.image}" alt="Image for ${post.title}" style="max-width:400px;">` : ""}
    <p>${post.content}</p>
    <p><em>By ${post.author}</em></p>
    <button id="edit-btn">Edit</button>
    <button id="delete-btn">Delete</button>
  `;
  document.getElementById("edit-btn").onclick = () => openEditForm(post);
  document.getElementById("delete-btn").onclick = () => deletePost(post.id);
}

function addNewPostListener() {
  document.getElementById("new-post-form").addEventListener("submit", e => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title: document.getElementById("new-title").value,
      content: document.getElementById("new-content").value,
      author: document.getElementById("new-author").value,
      image: document.getElementById("new-image").value
    };
    const posts = getPosts();
    posts.push(newPost);
    savePosts(posts);
    displayPosts();
    e.target.reset();
  });
}

function openEditForm(post) {
  const form = document.getElementById("edit-post-form");
  form.classList.remove("hidden");
  document.getElementById("edit-title").value = post.title;
  document.getElementById("edit-content").value = post.content;
  document.getElementById("edit-image").value = post.image || "";

  form.onsubmit = e => {
    e.preventDefault();
    const updated = {
      id: post.id,
      title: document.getElementById("edit-title").value,
      content: document.getElementById("edit-content").value,
      image: document.getElementById("edit-image").value
    };
    const posts = getPosts().map(p => p.id === post.id ? updated : p);
    savePosts(posts);
    form.classList.add("hidden");
    displayPosts();
    handlePostClick(post.id);
  };

  document.getElementById("cancel-edit").onclick = () => {
    form.classList.add("hidden");
  };
}

function deletePost(id) {
  const posts = getPosts().filter(p => p.id !== id);
  savePosts(posts);
  displayPosts();
  postDetailDiv.innerHTML = "<p>Select a post to see details</p>";
}

function addImageFetcher() {
  document
    .getElementById("fetch-image-btn")
    .addEventListener("click", () => {
      const query = document.getElementById("image-query").value.trim();
      const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashKey}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          // Unsplash returns an object, not an array
          if (data.urls && data.urls.small) {
            document.getElementById("new-image").value = data.urls.small;
          } else {
            alert("No image found for this query.");
          }
        }) // closes .then(data => { … })
        .catch(err => { // added catch for errors
          console.error("Error fetching image:", err);
          alert("Error fetching image. Check console.");
        });
    }); // closes addEventListener
}


 
