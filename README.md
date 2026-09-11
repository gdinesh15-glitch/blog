# BlogSpace – Simple Responsive Blog Application

[![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange?style=flat-square&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Responsive-blue?style=flat-square&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_ES6+-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-green?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 📌 Project Overview

**BlogSpace** is a clean, modern, and responsive blog application built using pure **HTML5**, **CSS3**, and **Vanilla JavaScript** without external frameworks, libraries, or backend databases.

The platform allows users to create an account, log in, browse articles, view blog details in-page, publish new articles, and manage their posts through a personal dashboard. All user accounts, sessions, and blog data are persistently stored client-side using the browser's **Web Storage API (LocalStorage)**.

---

## 📄 Required Pages (5 Pages Total)

The project consists strictly of the 5 required pages:

1. **Home Page (`index.html`)**:
   - Clean navigation bar with responsive mobile menu.
   - Hero section with the headline *"Share Your Ideas With The World"*.
   - **Explore Blogs** button that smoothly scrolls to the featured articles.
   - **Featured Articles** section showcasing recent tutorials and student projects.
   - **Categories** section with interactive filtering (*Web Development, JavaScript, Programming, Technology, Student Life*).
   - Call-to-action banner with **Create Your First Blog** button.
   - Standard footer with technology highlights and page navigation.

2. **Login Page (`login.html`)**:
   - Clean login form with **Email** and **Password** inputs.
   - Validates credentials against registered users in LocalStorage.
   - One-click testing autofill button for evaluator convenience.
   - Direct link to the registration page.
   - On successful login, creates a session and redirects to `dashboard.html`.

3. **Register Page (`register.html`)**:
   - Account creation form with **Full Name**, **Email Address**, **Password**, and **Confirm Password**.
   - Client-side validation: format checking, password minimum length (6+ characters), password matching, and duplicate email prevention.
   - Direct link to the login page.
   - On successful registration, saves user into LocalStorage and redirects to `login.html`.

4. **Dashboard Page (`dashboard.html`)**:
   - Welcome greeting displaying the logged-in user's name.
   - Platform statistics: **Total Blogs** and **My Blogs** counts.
   - **My Blogs** management: lists user's published articles with **View** (in-page modal reader) and **Delete** actions.
   - **Recent Blogs** feed showcasing platform articles.
   - **Write New Blog** action button.
   - **Logout** button to securely clear the current session.

5. **Create Blog Page (`create-blog.html`)**:
   - Protected route requiring user authentication.
   - Form fields: **Blog Title**, **Category** selector, **Author Name**, **Cover Image URL** (with live preview and preset chips), and **Blog Content**.
   - Input validation for required fields and minimum content length.
   - On submission, saves the new article to LocalStorage and redirects to `dashboard.html`.

---

## 🧭 Navigation Architecture

The navigation bar dynamically updates based on authentication state, with **zero duplicate links**:

### Before Login:
```
Home | Create Blog | Login | Register
```

### After Login:
```
Home | Create Blog | Dashboard | Logout
```

- **Strict Single Occurrence**: Login and Register appear only once on desktop and in the mobile drawer.
- **Mobile Responsive**: On mobile devices (`<= 768px`), the hamburger toggle reveals the exact same menu items without duplication.
- **Active State**: The active page link is highlighted with an accent indicator.

---

## 📂 Project Structure

```
BlogSpace/
│
├── index.html              # Home page with hero, featured articles & categories
├── login.html              # User login page
├── register.html           # User registration page
├── dashboard.html          # User dashboard with stats & post management
├── create-blog.html        # Create and publish new blog posts
│
├── css/
│   └── style.css           # Responsive styling, CSS variables & mobile media queries
│
├── js/
│   └── script.js           # Vanilla JS engine (Auth, CRUD, LocalStorage, Modal)
│
└── README.md               # Project documentation
```

---

## 💾 LocalStorage Data Schema

All persistent application data is stored in the browser's `localStorage` under specific keys:

| Storage Key | Description |
|---|---|
| `blogspace_users` | Array of registered user objects (`id`, `name`, `email`, `password`, `createdAt`) |
| `blogspace_current_user` | Active session object (user info without password) |
| `blogspace_blogs` | Array of blog post objects (`id`, `title`, `category`, `author`, `authorEmail`, `imageUrl`, `description`, `content`, `createdAt`) |

---

## 🏃 How to Run the Project

No dependencies, package managers, or server setup are required.

### Option 1: Direct File Open
1. Open the project folder.
2. Double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Live Server (VS Code Extension)
1. Open the folder in Visual Studio Code.
2. Right-click `index.html` and choose **Open with Live Server**.

### Option 3: Local Python HTTP Server
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

---

## 🔑 Demo Account Credentials

A pre-seeded demo student account is provided for quick evaluation:

- **Email**: `demo@blogspace.com`
- **Password**: `password123`

*(You can also click **"Click to autofill demo credentials"** on `login.html`, or register any new account on `register.html`)*.

---

## 📱 Responsive Design Breakpoints

- **Desktop** (`> 768px`): Full multi-column grid, horizontal navigation bar, inline statistics cards.
- **Tablet & Mobile** (`<= 768px`): Collapsible slide-down drawer menu, single-column blog feed, full-width form controls and buttons.
- **Small Mobile** (`<= 480px`): Optimized typography and stacked hero action buttons.

