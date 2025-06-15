// Burger menu toggle
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  burger.classList.toggle("toggle");
});

// Close nav when clicking a link (mobile)
document.querySelectorAll(".nav-links a").forEach((link) =>
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      burger.classList.remove("toggle");
    }
  })
);

// Back to top button functionality
const backToTop = document.querySelector(".back-to-top");
backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Update footer year dynamically
document.getElementById("year").textContent = new Date().getFullYear();

// Fade-in animation for elements with .fade-in on scroll
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    appearOnScroll.unobserve(entry.target);
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// Blog posts functionality

const blogForm = document.getElementById("blog-form");
const blogPostsContainer = document.getElementById("blog-posts");

// Load blog posts from localStorage
function loadBlogPosts() {
  const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  blogPostsContainer.innerHTML = "";

  if (posts.length === 0) {
    blogPostsContainer.innerHTML = `<p style="text-align:center; color:#777;">No blog posts yet. Start by adding one!</p>`;
    return;
  }

  posts.forEach(({ title, content }) => {
    const postDiv = document.createElement("div");
    postDiv.className = "blog-post fade-in";

    const postTitle = document.createElement("h3");
    postTitle.textContent = title;

    const postContent = document.createElement("p");
    postContent.textContent = content;

    postDiv.appendChild(postTitle);
    postDiv.appendChild(postContent);

    blogPostsContainer.appendChild(postDiv);
  });
}

// Save a new post
blogForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = blogForm.title;
  const contentInput = blogForm.content;

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("Please fill out both the title and content.");
    return;
  }

  // Get existing posts
  const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  posts.unshift({ title, content });
  localStorage.setItem("blogPosts", JSON.stringify(posts));

  // Reset form
  blogForm.reset();

  // Reload posts
  loadBlogPosts();
});

// Initial load
loadBlogPosts();
