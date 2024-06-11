/* Search button animation */

const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('mousedown', function() {
    this.classList.add('shrink');
});

searchButton.addEventListener('mouseup', function() {
    this.classList.remove('shrink');
});

searchButton.addEventListener('mouseleave', function() {
    this.classList.remove('shrink');
});

/* Theme switch button animation */

const switchTheme = document.getElementById('switchTheme');

switchTheme.addEventListener('mousedown', function() {
    this.classList.add('shrink');
});

switchTheme.addEventListener('mouseup', function() {
    this.classList.remove('shrink');
});

switchTheme.addEventListener('mouseleave', function() {
    this.classList.remove('shrink');
});
