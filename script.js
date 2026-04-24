// loader
window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("fade-out");
    }, 800);
});

// active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".Semua_menu ul li a:not(.theme-toggle)");
    let currentId = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (pageYOffset >= sectionTop) {
            currentId = section.getAttribute("id");
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentId) {
            link.classList.add("active");
        }
    });
});

// Dark / Light mode toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function updateThemeIcon(mode) {
    if (mode === 'light') {
        themeToggle.innerHTML = '🌙';
    } else {
        themeToggle.innerHTML = '☀️';
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateThemeIcon('light');
} else if (savedTheme === 'dark') {
    body.classList.remove('light-mode');
    updateThemeIcon('dark');
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
        body.classList.add('light-mode');
        updateThemeIcon('light');
        localStorage.setItem('theme', 'light');
    } else {
        updateThemeIcon('dark');
        localStorage.setItem('theme', 'dark');
    }
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    } else {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    }
});
