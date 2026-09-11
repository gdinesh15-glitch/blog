/**
 * BlogSpace - Simple Responsive Blog Application
 * Core JavaScript Engine
 */

// ==========================================================================
// 1. CONSTANTS & STORAGE KEYS
// ==========================================================================
const STORAGE_KEYS = {
    USERS: 'blogspace_users',
    CURRENT_USER: 'blogspace_current_user',
    BLOGS: 'blogspace_blogs'
};

// Natural student-oriented sample articles
const DEFAULT_BLOGS = [{
        id: 'blog-1',
        title: 'My Journey Learning Web Development',
        category: 'Web Development',
        author: 'Rahul Sharma',
        authorEmail: 'rahul.s@college.edu',
        createdAt: '2026-09-08T10:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
        description: 'How I started learning HTML, CSS, and JavaScript as a college student, the challenges I faced with responsive layouts, and small projects I built.',
        content: `When I first began my BTech course, building a website seemed intimidating. In my second year, I decided to learn web development step by step.

### Starting with HTML and CSS
I started with simple HTML5 tags to structure pages. At first, making layouts responsive was tricky. CSS Flexbox and Grid felt confusing until I practiced building simple navigation bars, card layouts, and responsive footers.

### The JavaScript Breakthrough
Once I understood DOM manipulation and event listeners, web pages finally felt interactive. Writing code that reacts to user clicks and validates form inputs gave me a lot of confidence.

> "Consistency matters more than spending 8 hours once a week. Practicing for one hour every day helped me understand core concepts much faster."

If you are just getting started, don't worry about learning every framework. Focus on solid HTML, CSS, and JavaScript fundamentals first!`
    },
    {
        id: 'blog-2',
        title: 'Getting Started With JavaScript',
        category: 'JavaScript',
        author: 'Priya Patel',
        authorEmail: 'priya.p@college.edu',
        createdAt: '2026-09-06T14:30:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1000&q=80',
        description: 'A beginner-friendly guide covering fundamental JavaScript concepts like variables, functions, DOM manipulation, and LocalStorage for students.',
        content: `JavaScript is the language of the web. Here are the core concepts that every beginner should master:

### 1. Variables and Data Types
Always prefer using \`const\` by default, and \`let\` when you know the value needs to change. Avoid using \`var\` in modern code:
\`\`\`javascript
const siteName = "BlogSpace";
let blogCount = 5;
\`\`\`

### 2. Working with the DOM
The Document Object Model (DOM) allows JavaScript to read and update HTML elements. Common methods include \`document.getElementById()\` and \`document.querySelector()\`.

### 3. LocalStorage for Client-Side Storage
LocalStorage lets you store data in the browser that stays saved even when you refresh the page:
\`\`\`javascript
// Saving data
localStorage.setItem('user', JSON.stringify({ name: 'Priya' }));

// Reading data
const savedUser = JSON.parse(localStorage.getItem('user'));
\`\`\`

Mastering these basics makes building projects like blogs, to-do apps, and calculators straightforward.`
    },
    {
        id: 'blog-3',
        title: 'How I Built My First Web Project',
        category: 'Programming',
        author: 'Amit Kumar',
        authorEmail: 'amit.k@college.edu',
        createdAt: '2026-09-04T09:15:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
        description: 'Step-by-step breakdown of how I designed and implemented my first frontend web application without any frameworks or external libraries.',
        content: `During my internship preparation, I realized that having real projects on my resume was essential. Here is how I built my first web project:

### Planning the Structure
Before writing any code, I sketched out the pages on paper:
- Home page with featured posts and categories
- Create blog page with form validation
- Dashboard to manage published posts
- Clean login and register forms

### Keeping Code Organized
I separated concerns into distinct files:
- \`index.html\`, \`create-blog.html\`, \`dashboard.html\`, etc.
- A single shared \`css/style.css\` for consistent styling
- A shared \`js/script.js\` for all interactive logic

### Testing and Debugging
I opened Developer Tools (F12) frequently to check console logs and inspect elements. Testing on mobile screen sizes in Chrome DevTools helped catch layout bugs early.

Building a project from scratch taught me much more than just following passive video tutorials.`
    },
    {
        id: 'blog-4',
        title: 'Tips for College Students Learning Programming',
        category: 'Student Life',
        author: 'Sneha Rao',
        authorEmail: 'sneha.r@college.edu',
        createdAt: '2026-08-30T16:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
        description: 'Practical tips on balancing college coursework, practicing coding, working on small projects, and preparing for technical internships.',
        content: `Balancing semester exams, lab assignments, and self-learning can be overwhelming for engineering students. Here are a few strategies that helped me stay on track:

### 1. Build Small Projects
Instead of trying to build a massive application right away, build small, functional projects: a calculator, a weather widget, a blog application, or a notes app. Each project teaches practical problem-solving.

### 2. Learn Git and GitHub
Create a GitHub account early. Commit your code regularly and write clear README files. Having a clean GitHub profile helps during internship interviews.

### 3. Ask Doubts and Help Peers
Discuss coding problems with your batchmates and seniors. Explaining a concept to someone else is the best way to test your own understanding.`
    }
];

// Sample demo user for reviewer testing
const DEFAULT_DEMO_USER = {
    id: 'user-demo',
    name: 'Demo Student',
    email: 'demo@blogspace.com',
    password: 'password123',
    createdAt: '2026-08-01T00:00:00.000Z'
};

// ==========================================================================
// 2. STORAGE INITIALIZATION
// ==========================================================================
function initStorage() {
    try {
        const storedBlogs = localStorage.getItem(STORAGE_KEYS.BLOGS);
        // Re-seed if empty or if old format with fictional non-student titles
        if (!storedBlogs || JSON.parse(storedBlogs).length === 0 || storedBlogs.includes('Alex Rivera')) {
            localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(DEFAULT_BLOGS));
        }
    } catch (e) {
        try {
            localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(DEFAULT_BLOGS));
        } catch (_) {}
    }

    try {
        const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
        let users = storedUsers ? JSON.parse(storedUsers) : [];
        if (!Array.isArray(users)) users = [];

        const demoIdx = users.findIndex(u => u.email && u.email.toLowerCase() === DEFAULT_DEMO_USER.email.toLowerCase());
        if (demoIdx === -1) {
            users.unshift(DEFAULT_DEMO_USER);
        } else {
            // Guarantee password matches password123 for demo
            users[demoIdx].password = DEFAULT_DEMO_USER.password;
            users[demoIdx].name = users[demoIdx].name || DEFAULT_DEMO_USER.name;
        }
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
        try {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([DEFAULT_DEMO_USER]));
        } catch (_) {}
    }
}

initStorage();

// ==========================================================================
// 3. AUTHENTICATION & SESSION MANAGEMENT
// ==========================================================================
const AuthManager = {
    getCurrentUser() {
        try {
            const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
            return userJson ? JSON.parse(userJson) : null;
        } catch (e) {
            return null;
        }
    },

    setCurrentUser(user) {
        if (user) {
            const safeUser = {...user };
            delete safeUser.password;
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
        } else {
            localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        }
    },

    getAllUsers() {
        try {
            const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
            return usersJson ? JSON.parse(usersJson) : [];
        } catch (e) {
            return [];
        }
    },

    register(name, email, password) {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        if (!trimmedName || !trimmedEmail || !password) {
            return { success: false, message: 'All fields are required.' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters.' };
        }

        const users = this.getAllUsers();
        const existing = users.find(u => u.email.toLowerCase() === trimmedEmail);
        if (existing) {
            return { success: false, message: 'An account with this email already exists. Please log in.' };
        }

        const newUser = {
            id: 'user-' + Date.now(),
            name: trimmedName,
            email: trimmedEmail,
            password: password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

        return { success: true, message: 'Registration successful! You can now log in.', user: newUser };
    },

    login(email, password) {
        const trimmedEmail = email.trim().toLowerCase();
        const users = this.getAllUsers();

        const matchedUser = users.find(u => u.email.toLowerCase() === trimmedEmail && u.password === password);
        if (!matchedUser) {
            return { success: false, message: 'Invalid email or password. Please try again.' };
        }

        this.setCurrentUser(matchedUser);
        return { success: true, message: 'Welcome back, ' + matchedUser.name + '!', user: matchedUser };
    },

    logout() {
        this.setCurrentUser(null);
        showToast('Logged Out', 'You have been logged out.', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 600);
    },

    requireAuth() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            showToast('Login Required', 'Please log in to access this page.', 'danger');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 700);
            return false;
        }
        return true;
    }
};

// ==========================================================================
// 4. BLOG CRUD OPERATIONS
// ==========================================================================
const BlogManager = {
    getAllBlogs() {
        try {
            const blogsJson = localStorage.getItem(STORAGE_KEYS.BLOGS);
            const blogs = blogsJson ? JSON.parse(blogsJson) : [];
            return blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } catch (e) {
            return [];
        }
    },

    getBlogById(id) {
        if (!id) return null;
        const blogs = this.getAllBlogs();
        return blogs.find(b => String(b.id) === String(id)) || null;
    },

    getBlogsByAuthor(email) {
        if (!email) return [];
        const blogs = this.getAllBlogs();
        return blogs.filter(b => b.authorEmail && b.authorEmail.toLowerCase() === email.toLowerCase());
    },

    createBlog({ title, category, imageUrl, content, author, authorEmail }) {
        if (!title || !category || !content || !author) {
            return { success: false, message: 'Please fill in all required fields.' };
        }

        const blogs = this.getAllBlogs();
        const fallbackImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80';

        const cleanContent = content.replace(/[#*`_]/g, '').trim();
        const description = cleanContent.length > 150 ? cleanContent.substring(0, 150) + '...' : cleanContent;

        const newBlog = {
            id: 'blog-' + Date.now(),
            title: title.trim(),
            category: category.trim(),
            author: author.trim(),
            authorEmail: authorEmail || (AuthManager.getCurrentUser()?.email || 'demo@blogspace.com'),
            createdAt: new Date().toISOString(),
            imageUrl: (imageUrl && imageUrl.trim().startsWith('http')) ? imageUrl.trim() : fallbackImage,
            description: description,
            content: content.trim()
        };

        blogs.unshift(newBlog);
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));

        return { success: true, message: 'Blog published successfully!', blog: newBlog };
    },

    deleteBlog(id) {
        const blogs = this.getAllBlogs();
        const index = blogs.findIndex(b => String(b.id) === String(id));

        if (index === -1) {
            return { success: false, message: 'Blog not found.' };
        }

        const blog = blogs[index];
        const currentUser = AuthManager.getCurrentUser();

        // Allow deleting own blog or if demo student
        const isOwner = currentUser && (
            (blog.authorEmail && currentUser.email && blog.authorEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
            currentUser.email === 'demo@blogspace.com'
        );

        if (!isOwner) {
            return { success: false, message: 'You can only delete your own blogs.' };
        }

        blogs.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
        return { success: true, message: 'Blog post deleted successfully.' };
    },

    calculateReadingTime(text) {
        const words = (text || '').trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(words / 180));
        return `${minutes} min read`;
    },

    formatDate(isoString) {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
};

// ==========================================================================
// 5. TOAST NOTIFICATIONS & MODAL DIALOGS
// ==========================================================================
function showToast(title, message, type = 'info', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = {
        success: '✓',
        danger: '✕',
        info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
    <div class="toast-icon">${icons[type] || 'ℹ'}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <div class="toast-close">&times;</div>
  `;

    container.appendChild(toast);

    const removeToast = () => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 200);
    };

    toast.querySelector('.toast-close').addEventListener('click', removeToast);
    setTimeout(removeToast, duration);
}

function showConfirmModal(title, desc, confirmText, onConfirm) {
    let overlay = document.getElementById('confirm-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'confirm-modal-overlay';
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
      <div class="modal-dialog">
        <h3 class="modal-title" id="modal-title-text"></h3>
        <p class="modal-desc" id="modal-desc-text"></p>
        <div class="modal-actions">
          <button type="button" class="btn btn-outline btn-sm" id="modal-cancel-btn">Cancel</button>
          <button type="button" class="btn btn-danger btn-sm" id="modal-confirm-btn"></button>
        </div>
      </div>
    `;
        document.body.appendChild(overlay);
    }

    document.getElementById('modal-title-text').textContent = title;
    document.getElementById('modal-desc-text').textContent = desc;
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    confirmBtn.textContent = confirmText || 'Confirm';

    overlay.classList.add('open');

    const close = () => {
        overlay.classList.remove('open');
        cancelBtn.onclick = null;
        confirmBtn.onclick = null;
    };

    cancelBtn.onclick = close;
    confirmBtn.onclick = () => {
        close();
        if (typeof onConfirm === 'function') onConfirm();
    };
}

// ==========================================================================
// 6. CLEAN NAVBAR (ZERO DUPLICATION GUARANTEED)
// ==========================================================================
function updateNavbar() {
    const currentUser = AuthManager.getCurrentUser();
    const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
    if (!navMenu) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isHome = currentPath === 'index.html' || currentPath === '';
    const isCreate = currentPath === 'create-blog.html';
    const isDashboard = currentPath === 'dashboard.html';
    const isLogin = currentPath === 'login.html';
    const isRegister = currentPath === 'register.html';

    // Navigation before login: Home | Create Blog | Login | Register
    // Navigation after login:  Home | Create Blog | Dashboard | Logout
    // Login and Register appear strictly ONCE.
    if (currentUser) {
        navMenu.innerHTML = `
      <a href="index.html" class="nav-link ${isHome ? 'active' : ''}">Home</a>
      <a href="create-blog.html" class="nav-link ${isCreate ? 'active' : ''}">Create Blog</a>
      <a href="dashboard.html" class="nav-link ${isDashboard ? 'active' : ''}">Dashboard</a>
      <button type="button" class="btn btn-outline btn-sm" id="logout-btn">Logout</button>
    `;
    } else {
        navMenu.innerHTML = `
      <a href="index.html" class="nav-link ${isHome ? 'active' : ''}">Home</a>
      <a href="create-blog.html" class="nav-link ${isCreate ? 'active' : ''}">Create Blog</a>
      <a href="login.html" class="nav-link ${isLogin ? 'active' : ''}">Login</a>
      <a href="register.html" class="btn btn-primary btn-sm ${isRegister ? 'active' : ''}">Register</a>
    `;
    }

    // Remove any legacy nav-actions element to prevent duplicate buttons
    const oldNavActions = document.querySelector('.nav-actions');
    if (oldNavActions) {
        oldNavActions.innerHTML = '';
    }

    // Attach logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            AuthManager.logout();
        });
    }

    // Hamburger Toggle Button
    const toggleBtn = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
    if (toggleBtn) {
        toggleBtn.onclick = () => {
            toggleBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        };

        // Auto-close menu when a link inside is clicked
        navMenu.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('click', () => {
                toggleBtn.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }
}

// ==========================================================================
// 7. CARD RENDERING HELPER
// ==========================================================================
function renderBlogCard(blog) {
    const readTime = BlogManager.calculateReadingTime(blog.content);
    const formattedDate = BlogManager.formatDate(blog.createdAt);
    const authorInitial = (blog.author || 'A').charAt(0).toUpperCase();

    return `
    <article class="blog-card" data-category="${escapeHtml(blog.category)}">
      <div class="blog-card-media" style="cursor: pointer;" onclick="openBlogModal('${escapeHtml(blog.id)}')">
        <img src="${escapeHtml(blog.imageUrl)}" alt="${escapeHtml(blog.title)}" class="blog-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80'">
        <span class="blog-card-category">${escapeHtml(blog.category)}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-card-meta">
          <span>📅 ${formattedDate}</span>
          <span>•</span>
          <span>⏱ ${readTime}</span>
        </div>
        <h3 class="blog-card-title">
          <a href="javascript:void(0)" onclick="openBlogModal('${escapeHtml(blog.id)}')">${escapeHtml(blog.title)}</a>
        </h3>
        <p class="blog-card-desc">${escapeHtml(blog.description)}</p>
        <div class="blog-card-footer">
          <div class="blog-author-info">
            <div class="blog-author-avatar">${authorInitial}</div>
            <span class="blog-author-name">${escapeHtml(blog.author)}</span>
          </div>
          <button type="button" class="read-more-btn" onclick="openBlogModal('${escapeHtml(blog.id)}')">
            Read More &rarr;
          </button>
        </div>
      </div>
    </article>
  `;
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function formatArticleContent(rawText) {
    if (!rawText) return '';
    const lines = rawText.split('\n');
    let html = '';
    let inCode = false;
    let codeBuffer = '';

    for (let line of lines) {
        const trimmed = line.trim();

        if (trimmed.startsWith('```')) {
            if (inCode) {
                html += `<pre><code>${escapeHtml(codeBuffer)}</code></pre>`;
                codeBuffer = '';
                inCode = false;
            } else {
                inCode = true;
            }
            continue;
        }

        if (inCode) {
            codeBuffer += line + '\n';
            continue;
        }

        if (trimmed.startsWith('### ')) {
            html += `<h3>${escapeHtml(trimmed.substring(4))}</h3>`;
        } else if (trimmed.startsWith('## ')) {
            html += `<h2>${escapeHtml(trimmed.substring(3))}</h2>`;
        } else if (trimmed.startsWith('> ')) {
            html += `<blockquote>${escapeHtml(trimmed.substring(2))}</blockquote>`;
        } else if (trimmed.length > 0) {
            html += `<p>${escapeHtml(trimmed)}</p>`;
        }
    }

    if (inCode) {
        html += `<pre><code>${escapeHtml(codeBuffer)}</code></pre>`;
    }

    return html;
}

// ==========================================================================
// 8. ARTICLE MODAL (IN-PAGE READER)
// ==========================================================================
function openBlogModal(blogId) {
    const blog = BlogManager.getBlogById(blogId);
    if (!blog) {
        showToast('Error', 'Blog not found.', 'danger');
        return;
    }

    let overlay = document.getElementById('article-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'article-modal-overlay';
        overlay.className = 'article-modal-overlay';
        document.body.appendChild(overlay);
    }

    const readTime = BlogManager.calculateReadingTime(blog.content);
    const formattedDate = BlogManager.formatDate(blog.createdAt);
    const authorInitial = (blog.author || 'A').charAt(0).toUpperCase();
    const formattedContent = formatArticleContent(blog.content);

    overlay.innerHTML = `
    <div class="article-modal-dialog" role="dialog" aria-modal="true">
      <div class="article-modal-header">
        <span class="section-badge" style="margin-bottom: 0;">${escapeHtml(blog.category)}</span>
        <button type="button" class="article-modal-close" aria-label="Close modal" onclick="closeBlogModal()">&times;</button>
      </div>
      <div class="article-modal-body">
        <img src="${escapeHtml(blog.imageUrl)}" alt="${escapeHtml(blog.title)}" class="article-modal-cover" onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80'">
        <h2 class="article-modal-title">${escapeHtml(blog.title)}</h2>
        <div class="article-modal-meta">
          <div class="blog-author-info">
            <div class="blog-author-avatar">${authorInitial}</div>
            <span class="blog-author-name">${escapeHtml(blog.author)}</span>
          </div>
          <span>•</span>
          <span>📅 ${formattedDate}</span>
          <span>•</span>
          <span>⏱ ${readTime}</span>
        </div>
        <div class="article-modal-text">
          ${formattedContent}
        </div>
      </div>
      <div class="article-modal-footer">
        <button type="button" class="btn btn-outline btn-sm" onclick="closeBlogModal()">Close</button>
      </div>
    </div>
  `;

    overlay.classList.add('open');

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closeBlogModal();
        }
    };

    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeBlogModal();
            document.removeEventListener('keydown', handleKeydown);
        }
    };
    document.addEventListener('keydown', handleKeydown);
}

function closeBlogModal() {
    const overlay = document.getElementById('article-modal-overlay');
    if (overlay) {
        overlay.classList.remove('open');
    }
}

window.openBlogModal = openBlogModal;
window.closeBlogModal = closeBlogModal;

// ==========================================================================
// 9. PAGE CONTROLLERS
// ==========================================================================

// --- Home Page ---
let currentHomeCategory = 'All';

function initHomePage() {
    const featuredContainer = document.getElementById('featured-blogs-grid');
    const categoriesContainer = document.getElementById('home-categories-list');

    function renderFeaturedBlogs(category = 'All') {
        if (!featuredContainer) return;
        const allBlogs = BlogManager.getAllBlogs();
        const filtered = (category === 'All') ?
            allBlogs :
            allBlogs.filter(b => b.category.toLowerCase() === category.toLowerCase());

        if (filtered.length === 0) {
            featuredContainer.innerHTML = '<p class="text-muted text-center" style="grid-column: 1 / -1; padding: 2rem;">No blogs found in this category.</p>';
        } else {
            featuredContainer.innerHTML = filtered.map(blog => renderBlogCard(blog)).join('');
        }
    }

    // Render categories
    if (categoriesContainer) {
        const blogs = BlogManager.getAllBlogs();
        const counts = {};
        blogs.forEach(b => {
            counts[b.category] = (counts[b.category] || 0) + 1;
        });

        const categoryList = ['All', 'Web Development', 'JavaScript', 'Programming', 'Technology', 'Student Life'];
        categoriesContainer.innerHTML = categoryList.map(cat => {
            const count = cat === 'All' ? blogs.length : (counts[cat] || 0);
            return `
        <button type="button" class="category-chip ${cat === currentHomeCategory ? 'active' : ''}" data-category="${escapeHtml(cat)}">
          <span>${escapeHtml(cat)}</span>
          <span class="count">${count}</span>
        </button>
      `;
        }).join('');

        categoriesContainer.querySelectorAll('.category-chip').forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.getAttribute('data-category');
                currentHomeCategory = cat;
                categoriesContainer.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                renderFeaturedBlogs(cat);

                // Smooth scroll to featured articles
                const target = document.getElementById('featured-articles');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    renderFeaturedBlogs(currentHomeCategory);
}

// --- Create Blog Page ---
function initCreateBlogPage() {
    if (!AuthManager.requireAuth()) return;

    const currentUser = AuthManager.getCurrentUser();
    const form = document.getElementById('create-blog-form');
    const authorInput = document.getElementById('blog-author');
    const imageInput = document.getElementById('blog-image-url');
    const imagePreview = document.getElementById('image-preview');
    const placeholder = document.getElementById('image-placeholder');
    const presetChips = document.querySelectorAll('.preset-chip');

    if (authorInput && currentUser) {
        authorInput.value = currentUser.name;
    }

    const updateImagePreview = (url) => {
        if (url && url.trim().startsWith('http')) {
            imagePreview.src = url.trim();
            imagePreview.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
        } else {
            imagePreview.style.display = 'none';
            if (placeholder) placeholder.style.display = 'block';
        }
    };

    if (imageInput) {
        imageInput.addEventListener('input', () => updateImagePreview(imageInput.value));
    }

    presetChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const url = chip.getAttribute('data-img');
            if (imageInput && url) {
                imageInput.value = url;
                updateImagePreview(url);
            }
        });
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('blog-title').value.trim();
            const author = authorInput ? authorInput.value.trim() : (currentUser?.name || 'Student');
            const category = document.getElementById('blog-category').value;
            const imageUrl = imageInput ? imageInput.value.trim() : '';
            const content = document.getElementById('blog-content').value.trim();

            clearFormErrors();

            let hasError = false;
            if (!title) {
                showFieldError('blog-title', 'Blog title is required.');
                hasError = true;
            }
            if (!author) {
                showFieldError('blog-author', 'Author name is required.');
                hasError = true;
            }
            if (!category) {
                showFieldError('blog-category', 'Please select a category.');
                hasError = true;
            }
            if (!content || content.length < 20) {
                showFieldError('blog-content', 'Content must be at least 20 characters.');
                hasError = true;
            }

            if (hasError) return;

            const result = BlogManager.createBlog({
                title,
                author,
                authorEmail: currentUser.email,
                category,
                imageUrl,
                content
            });

            if (result.success) {
                showToast('Success!', 'Blog published successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 800);
            } else {
                showToast('Error', result.message, 'danger');
            }
        });
    }
}

// --- Dashboard Page ---
function initDashboardPage() {
    if (!AuthManager.requireAuth()) return;

    const currentUser = AuthManager.getCurrentUser();
    const welcomeName = document.getElementById('user-welcome-name');
    const statTotalBlogs = document.getElementById('stat-total-blogs');
    const statMyBlogs = document.getElementById('stat-my-blogs');
    const userPostsList = document.getElementById('user-posts-list');
    const recentBlogsList = document.getElementById('recent-platform-blogs');

    if (welcomeName) {
        welcomeName.textContent = currentUser.name;
    }

    const allBlogs = BlogManager.getAllBlogs();
    const myBlogs = BlogManager.getBlogsByAuthor(currentUser.email);

    if (statTotalBlogs) statTotalBlogs.textContent = allBlogs.length;
    if (statMyBlogs) statMyBlogs.textContent = myBlogs.length;

    // Render user's blogs
    if (userPostsList) {
        if (myBlogs.length === 0) {
            userPostsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <h3 class="empty-state-title">You haven't written any blogs yet</h3>
          <p class="empty-state-desc">Share your learning experience or tutorial with others.</p>
          <a href="create-blog.html" class="btn btn-primary btn-sm">Create Your First Blog</a>
        </div>
      `;
        } else {
            userPostsList.innerHTML = myBlogs.map(blog => `
        <div class="user-post-item" id="post-row-${escapeHtml(blog.id)}">
          <img src="${escapeHtml(blog.imageUrl)}" alt="${escapeHtml(blog.title)}" class="user-post-thumb" onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80'">
          <div class="user-post-details">
            <div class="user-post-meta">
              <span>🏷️ ${escapeHtml(blog.category)}</span>
              <span>•</span>
              <span>📅 ${BlogManager.formatDate(blog.createdAt)}</span>
            </div>
            <h4 class="user-post-title">
              <a href="javascript:void(0)" onclick="openBlogModal('${escapeHtml(blog.id)}')">${escapeHtml(blog.title)}</a>
            </h4>
          </div>
          <div class="user-post-actions">
            <button type="button" class="btn btn-outline btn-sm" onclick="openBlogModal('${escapeHtml(blog.id)}')">View</button>
            <button type="button" class="btn btn-danger btn-sm" onclick="handleDeleteBlog('${escapeHtml(blog.id)}')">Delete</button>
          </div>
        </div>
      `).join('');
        }
    }

    // Render recent platform blogs
    if (recentBlogsList) {
        const recent = allBlogs.slice(0, 3);
        recentBlogsList.innerHTML = recent.map(blog => renderBlogCard(blog)).join('');
    }
}

// Global delete handler
window.handleDeleteBlog = function(id) {
    showConfirmModal(
        'Delete Blog Post',
        'Are you sure you want to delete this blog post? This action cannot be undone.',
        'Delete',
        () => {
            const result = BlogManager.deleteBlog(id);
            if (result.success) {
                showToast('Deleted', result.message, 'success');
                setTimeout(() => {
                    initDashboardPage();
                }, 300);
            } else {
                showToast('Error', result.message, 'danger');
            }
        }
    );
};

// --- Login Page ---
function initLoginPage() {
    if (AuthManager.getCurrentUser()) {
        window.location.href = 'dashboard.html';
        return;
    }

    const form = document.getElementById('login-form');
    const demoFillBtn = document.getElementById('demo-fill-btn');

    if (demoFillBtn) {
        demoFillBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-email').value = 'demo@blogspace.com';
            document.getElementById('login-password').value = 'password123';
            showToast('Autofilled', 'Demo student credentials entered.', 'info');
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            clearFormErrors();

            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            let hasError = false;
            if (!email) {
                showFieldError('login-email', 'Please enter your email.');
                hasError = true;
            } else if (!validateEmail(email)) {
                showFieldError('login-email', 'Please enter a valid email format.');
                hasError = true;
            }

            if (!password) {
                showFieldError('login-password', 'Please enter your password.');
                hasError = true;
            }

            if (hasError) return;

            const result = AuthManager.login(email, password);
            if (result.success) {
                showToast('Success', result.message, 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 600);
            } else {
                showToast('Login Failed', result.message, 'danger');
                showFieldError('login-password', result.message);
            }
        });
    }
}

// --- Register Page ---
function initRegisterPage() {
    if (AuthManager.getCurrentUser()) {
        window.location.href = 'dashboard.html';
        return;
    }

    const form = document.getElementById('register-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            clearFormErrors();

            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            let hasError = false;
            if (!name) {
                showFieldError('register-name', 'Full name is required.');
                hasError = true;
            }

            if (!email) {
                showFieldError('register-email', 'Email address is required.');
                hasError = true;
            } else if (!validateEmail(email)) {
                showFieldError('register-email', 'Please enter a valid email.');
                hasError = true;
            }

            if (!password) {
                showFieldError('register-password', 'Password is required.');
                hasError = true;
            } else if (password.length < 6) {
                showFieldError('register-password', 'Password must be at least 6 characters.');
                hasError = true;
            }

            if (!confirmPassword) {
                showFieldError('register-confirm-password', 'Please confirm your password.');
                hasError = true;
            } else if (password !== confirmPassword) {
                showFieldError('register-confirm-password', 'Passwords do not match.');
                hasError = true;
            }

            if (hasError) return;

            const result = AuthManager.register(name, email, password);
            if (result.success) {
                showToast('Success', result.message, 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            } else {
                showToast('Error', result.message, 'danger');
                showFieldError('register-email', result.message);
            }
        });
    }
}

// ==========================================================================
// 9. FORM VALIDATION HELPERS
// ==========================================================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showFieldError(inputId, message) {
    const inputEl = document.getElementById(inputId);
    if (!inputEl) return;
    inputEl.classList.add('is-invalid');

    const parent = inputEl.closest('.form-group');
    if (parent) {
        let err = parent.querySelector('.form-error');
        if (!err) {
            err = document.createElement('span');
            err.className = 'form-error';
            parent.appendChild(err);
        }
        err.textContent = message;
    }
}

function clearFormErrors() {
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

// ==========================================================================
// 10. DOM READY BOOTSTRAP
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();

    const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    if (document.getElementById('login-form') || path === 'login.html') {
        initLoginPage();
    } else if (document.getElementById('register-form') || path === 'register.html') {
        initRegisterPage();
    } else if (document.getElementById('create-blog-form') || path === 'create-blog.html') {
        initCreateBlogPage();
    } else if (document.getElementById('user-welcome-name') || path === 'dashboard.html') {
        initDashboardPage();
    } else if (document.getElementById('featured-articles-list') || path === 'index.html' || path === '') {
        initHomePage();
    }
});