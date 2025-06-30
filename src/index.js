const API_URL = 'http://localhost:3000/posts'; // Ensure your server is running locally or update this for production
const unsplashKey = 'your_actual_unsplash_key_here'; // Replace with your Unsplash API key

document.addEventListener("DOMContentLoaded", main);

const postListDiv = document.getElementById("post-list");
const postDetailDiv = document.getElementById("post-detail");

function main() {
  displayPosts();
  addNewPostListener();
  addImageFetcher();
}

function displayPosts() {
  fetch(API_URL)
    .then(res => res.json())
    .then(posts => {
      postListDiv.innerHTML = "";
      if (posts.length === 0) {
        postListDiv.innerHTML = "<p>No posts available.</p>";
      } else {
        posts.forEach(post => {
          const postItem = document.createElement("div");
          postItem.innerHTML = `
            ${post.image ? `<img src="${post.image}" alt="" style="width:300px;height:300px;object-fit:cover;margin-right:8px;">` : ""}
            <span>${post.title}</span>
          `;
          postItem.style.display = "flex";
          postItem.style.alignItems = "center";
          postItem.style.cursor = "pointer";
          postItem.addEventListener("click", () => handlePostClick(post.id));
          postListDiv.appendChild(postItem);
        });
        handlePostClick(posts[0].id); // Automatically show the first post's details
      }
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
      postListDiv.innerHTML = "<p>Error fetching posts. Please try again later.</p>";
    });
}

function handlePostClick(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      postDetailDiv.innerHTML = `
        <h2>${post.title}</h2>
        ${post.image ? `<img src="${post.image}" alt="Image for ${post.title}" style="max-width:400px;">` : ""}
        <p>${post.content}</p>
        <p><em>By ${post.author}</em></p>
        <button id="edit-btn">Edit</button>
        <button id="delete-btn">Delete</button>
      `;
      document.getElementById("edit-btn").addEventListener("click", () => openEditForm(post));
      document.getElementById("delete-btn").addEventListener("click", () => deletePost(post.id));
    })
    .catch(error => {
      console.error("Error fetching post details:", error);
      postDetailDiv.innerHTML = "<p>Error fetching post details. Please try again later.</p>";
    });
}

function addNewPostListener() {
  document.getElementById("new-post-form").addEventListener("submit", e => {
    e.preventDefault();
    const newPost = {
      title: document.getElementById("new-title").value,
      content: document.getElementById("new-content").value,
      author: document.getElementById("new-author").value,
      image: document.getElementById("new-image").value
    };
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
      .then(() => {
        displayPosts();
        e.target.reset(); // Reset the form
      })
      .catch(error => {
        console.error("Error adding new post:", error);
        alert("Error adding new post. Please try again.");
      });
  });
}

function openEditForm(post) {
  const form = document.getElementById("edit-post-form");
  form.classList.remove("hidden");
  document.getElementById("edit-title").value = post.title;
  document.getElementById("edit-content").value = post.content;
  document.getElementById("edit-image").value = post.image || "";

  // Reset any previous submit listener to avoid duplicate bindings
  form.onsubmit = function (e) {
    e.preventDefault();
    const updatedPost = {
      title: document.getElementById("edit-title").value,
      content: document.getElementById("edit-content").value,
      image: document.getElementById("edit-image").value
    };
    fetch(`${API_URL}/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost)
    })
      .then(() => {
        form.classList.add("hidden");
        displayPosts();
        handlePostClick(post.id);
      })
      .catch(error => {
        console.error("Error updating post:", error);
        alert("Error updating post. Please try again.");
      });
  };

  document.getElementById("cancel-edit").onclick = () => {
    form.classList.add("hidden");
  };
}

function deletePost(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => {
      displayPosts();
      postDetailDiv.innerHTML = "<p>Select a post to see details</p>";
    })
    .catch(error => {
      console.error("Error deleting post:", error);
      alert("Error deleting post. Please try again.");
    });
}

function addImageFetcher() {
  document.getElementById("fetch-image-btn").addEventListener("click", () => {
    const query = document.getElementById("image-query").value;
    fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashKey}`)
      .then(res => res.json())
      .then(data => {
        if (data && data[0] && data[0].urls && data[0].urls.small) {
          document.getElementById("new-image").value = data[0].urls.small;
        } else {
          alert("No image found for this query.");
        }
      })
      .catch(err => {
        alert("Error fetching image.");
        console.error("Error fetching image:", err);
      });
  });
}
