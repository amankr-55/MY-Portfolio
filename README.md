# 🚀 Aman Kumar - Developer Portfolio & 3D Showcase

[![Live Demo](https://img.shields.io/badge/Live%20Website-Visit%20Portfolio-0ea5e9?style=for-the-badge&logo=googlechrome&logoColor=white)](https://amankr-55.github.io/MY-Portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-amankr--55-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amankr-55/MY-Portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Aman%20Kumar-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aman-kumar-71944037b/)
[![CGTrader](https://img.shields.io/badge/CGTrader-aiveridox-orange?style=for-the-badge&logo=blender&logoColor=white)](https://www.cgtrader.com/designers/aiveridox)

### 🌐 Live URL: **[https://amankr-55.github.io/MY-Portfolio/](https://amankr-55.github.io/MY-Portfolio/)**

An ultra-modern, 3D WebGL (Three.js) & glassmorphism-styled personal developer portfolio for Aman Kumar (3D Technical Artist on CGTrader `@aiveridox`, AI & ML Engineer @ NIAT, Full-Stack Web Developer & Intern @ Axlore Solution).

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