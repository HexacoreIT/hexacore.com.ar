document.addEventListener('DOMContentLoaded', () => {
    const arrow = document.getElementById('arrow');
    const bottomBar = document.querySelector('.bottom-bar');
    const menu = document.getElementById('menu');
    const logo = document.querySelector('.logo img');
    const hamburger = document.getElementById('hamburger');
    const menuLinks = document.querySelector('#menu .menu-links');

    // Estado inicial oculto
    menu.style.opacity = '0';
    menu.style.transform = 'translateY(-10px)';
    bottomBar.style.opacity = '0';
    bottomBar.style.transform = 'translateY(10px)';
    bottomBar.style.pointerEvents = 'none';
    arrow.style.opacity = '0';
    menuLinks.dataset.visible = 'false'; // menú hamburguesa cerrado

    // Mostrar flecha cuando termine la animación del logo
    logo.addEventListener('animationend', () => {
        arrow.style.opacity = '1';
    });

    // Función para mostrar la UI (menu y bottom bar)
    const showUI = () => {
        menu.style.opacity = '1';
        menu.style.transform = 'translateY(0)';
        bottomBar.style.opacity = '1';
        bottomBar.style.transform = 'translateY(0)';
        bottomBar.style.pointerEvents = 'auto';

        // Mostrar menú hamburguesa si está abierto en mobile
        if(window.innerWidth <= 900 && menuLinks.dataset.visible === 'true'){
            menuLinks.style.display = 'flex';
        }
    };

    // Función para ocultar la UI
    const hideUI = () => {
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-10px)';
        bottomBar.style.opacity = '0';
        bottomBar.style.transform = 'translateY(10px)';
        bottomBar.style.pointerEvents = 'none';
        menuLinks.style.display = 'none';
        menuLinks.dataset.visible = 'false';
    };

    // Scroll a contenido al hacer click en flecha
    const scrollToContent = () => {
        window.scrollTo({ top: logo.parentElement.offsetHeight, behavior: 'smooth' });
        showUI();
    };

    if (arrow) {
        arrow.addEventListener('click', scrollToContent);
        arrow.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' || e.key === ' ') { 
                e.preventDefault(); 
                scrollToContent(); 
            }
        });
    }

    // Mostrar u ocultar UI según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY <= 10) { hideUI(); }
        else { showUI(); }
    });

    // ==================== Menu hamburguesa ====================
    if(hamburger){
        hamburger.addEventListener('click', () => {
            if(menuLinks.style.display === 'flex') {
                menuLinks.style.display = 'none';
                menuLinks.dataset.visible = 'false';
            } else {
                menuLinks.style.display = 'flex';
                menuLinks.dataset.visible = 'true';
            }
        });
    }

    // Ocultar menú si se cambia tamaño de pantalla
    window.addEventListener('resize', () => {
        if(window.innerWidth > 900){
            menuLinks.style.display = 'flex';
            menuLinks.dataset.visible = 'false';
        } else {
            menuLinks.style.display = 'none';
            menuLinks.dataset.visible = 'false';
        }
    });
});
