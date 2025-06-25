# SA.01-WK3-CODE-CHALLENGE

# 📝 Blog Post Manager

**Blog Post Manager** is a powerful tool designed to help developers, creators, and editors efficiently organize, write, edit, publish, and manage blog content. Inspired by Argentina’s football passion, it's colorful, animated, and practical.

It solves common content management problems like:

❌ Scattered content: Ideas, drafts, and published posts live in different places.  
❌ Inconsistent formatting: No unified structure means posts may look inconsistent.  
❌ Poor version control: Collaborating on posts becomes messy.  
❌ Lack of scheduling: No easy way to plan posts ahead of time.  
❌ Inefficient workflows: Switching between tools slows down productivity.  

## ✅ What Blog Post Manager Does

✅ Centralizes content in one place (drafts, published, archives)  
✅ Supports metadata: tags, categories, authors, and timestamps  
✅ Built-in editing with markdown support  
✅ Handles publishing immediately or via scheduling  
✅ Improves collaboration: multiple users can comment and edit  
✅ Provides previewing: view drafts before going live  

---

##  Setup & Usage

### Installation

Clone or download the repository:

```bash
git clone https://github.com/fidel-otieno2/SA.01-WK3-CODE-CHALLENGE.git
cd blog-post-manager
Start the JSON server 

Make sure json-server is installed: 

bash
Copy
Edit 
npm install -g json-server
Then run it:


bash
Copy 
Edit json-server --watch db.json --port 3000 
Open the app in your browser 
bash 
Copy 
Edit 
open index.html # Mac 
start index.html # Windows 
🧩 Functionality Overview 
displayPosts() fetches all posts from http://localhost:3000/posts and renders their titles in #post-list. 


Clicking a post title triggers handlePostClick() to show its full content in #post-detail. 


Submitting the form #new-post-form adds a new post to the list using addNewPostListener(). 

⚠️ Posts added through the form are not saved permanently.


📁 **Project Structure**

blog-post-manager/
│
├── index.html                #Core layout and structure
├── README.md                 This file
│
├── css/
│   └── style.css             #Styling and animation rules
│
├── src/
│   └── index.js             # Main logic: fetch, render, CRUD
│
└── db.json                  # JSON mock database for local testing



🤝 Contributing 
We welcome contributions! 

Fork this repo 

Clone your fork locally 

bash 
Copy Edit 
git clone https://github.com/your-username/blog-post-manager.git 
cd blog-post-manager 
Follow the setup instructions 

Create a branch and start coding 

bash 

Copy 
Edit 
git checkout -b feature/your-feature 
Push your changes and open a Pull Request! 


 ##  Author 
 
 
 📞 +254 778864882
 
 📧 fidelmartins05@gmail.com
 
 🔗 GitHub: @fidel-otieno2
 
 
 
 📄 License This project is licensed under the MIT License. You're free to use, modify, and distribute it with attribution. 
 
 
 
 Copyright(c)2025 
 @martinsFidel