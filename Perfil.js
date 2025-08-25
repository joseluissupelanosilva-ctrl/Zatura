
function PlayAudio() {
    document.getElementById("interestelar").play();
}

function toggleThemeMenu() {
    const menu = document.getElementById('themeOptions');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const btnMenu = document.querySelector('.btn-menu label');
    const containerMenu = document.querySelector('.container-menu');
    const contMenu = document.querySelector('.cont-menu');
    const closeMenu = document.getElementById('close-menu');

    if (btnMenu) {
        btnMenu.addEventListener('mouseenter', () => {
            if (containerMenu) {
                containerMenu.style.opacity = '1';
                containerMenu.style.visibility = 'visible';
            }
        });
    }

    if (contMenu) {
        contMenu.addEventListener('mouseleave', () => {
            if (containerMenu) {
                containerMenu.style.opacity = '0';
                containerMenu.style.visibility = 'hidden';
            }
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            if (containerMenu) {
                containerMenu.style.opacity = '0';
                containerMenu.style.visibility = 'hidden';
            }
        });
    }
});