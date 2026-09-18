# 🚀 Aman Kumar - Developer Portfolio & LinkedIn Showcase

An ultra-modern, glassmorphism-styled personal developer portfolio built with semantic HTML5, CSS3 variables, interactive Canvas particles, and dynamic LinkedIn highlights.

---

## 🌟 Key Features

- **Dynamic Hero Section:** Glowing mesh canvas, interactive typing effect, and quick social links.
- **LinkedIn Showcase:** Dedicated section displaying LinkedIn posts, stats, and badges directly from `posts-data.js`.
- **Smart India Hackathon (SIH) & Projects:** Highlights your real projects with live links, GitHub repos, and tags.
- **Skills Matrix:** Categorized technical proficiency bars (React, Vite, JavaScript, Node.js, Git, Hackathons).
- **Dark / Light Mode:** Automatic theme switcher with local storage memory.
- **Contact & Direct Mail:** Interactive contact form, LinkedIn DM button, and one-click copy email button with toast feedback.
- **100% Responsive:** Optimized for Mobile, Tablet, and Desktop screens.

---

## 📂 Project Structure

```
portfolio/
├── index.html       # Main HTML markup & structure
├── style.css        # Premium Glassmorphism styling, animations & theme rules
├── script.js        # Dynamic animations, particles, typing effect, scroll spy
├── posts-data.js    # Data store for your LinkedIn posts & updates
└── README.md        # Project guide & instructions
```

---

## ⚡ How to Open in VS Code

1. Open your terminal in this folder:
   ```bash
   code .
   ```
2. Or in VS Code, go to **File** ➔ **Open Folder...** and select the `portfolio` folder.
3. Install the **Live Server** extension in VS Code and click **"Go Live"** at the bottom right to view live changes in your browser!

---

## 🔄 How to Add More LinkedIn Posts

Open `posts-data.js` and simply add a new object in the `linkedinPosts` array:

```javascript
{
    id: 4,
    author: "Aman Kumar",
    role: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AmanKumar",
    date: "Just Now",
    tag: "Tech Innovation",
    content: "Your LinkedIn post content here...",
    hashtags: ["#React", "#JavaScript", "#WebDev"],
    likes: 42,
    comments: 9,
    postUrl: "https://www.linkedin.com/in/aman-kumar-71944037b/",
    mediaType: "badge",
    badgeText: "🚀 My New Milestone"
}
```

---

## 📤 How to Push to GitHub

To push your latest changes to your GitHub repo (`https://github.com/amankr-55/MY-Portfolio.git`):

```bash
git add .
git commit -m "feat: Add modern portfolio with LinkedIn integration"
git push origin main
```