const themeButton = document.getElementById('switchTheme');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

function applySavedTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        root.classList.add('dark-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

themeButton.addEventListener('click', () => {
    root.classList.toggle('dark-theme');

    if (root.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySavedTheme);
} else {
    applySavedTheme();
}
