document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const audio = document.getElementById('interestelar');

    function openMenu() {
        navLinks.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            openMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', (event) => {
            closeMenu();
        });
    }

    const menuItems = document.querySelectorAll('.nav-links a');
    menuItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    const audioToggleBtn = document.getElementById('audioToggle');
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                audioToggleBtn.querySelector('i').classList.remove('fa-volume-mute');
                audioToggleBtn.querySelector('i').classList.add('fa-volume-up');
            } else {
                audio.pause();
                audioToggleBtn.querySelector('i').classList.remove('fa-volume-up');
                audioToggleBtn.querySelector('i').classList.add('fa-volume-mute');
            }
        });
    }

    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            if (body.classList.contains('light-theme')) {
                themeToggleBtn.querySelector('i').classList.remove('fa-moon');
                themeToggleBtn.querySelector('i').classList.add('fa-sun');
            } else {
                themeToggleBtn.querySelector('i').classList.remove('fa-sun');
                themeToggleBtn.querySelector('i').classList.add('fa-moon');
            }
        });
    }
});