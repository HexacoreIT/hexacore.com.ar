document.addEventListener('DOMContentLoaded', () => {
    const arrow = document.getElementById('arrow');
    const bottomBar = document.querySelector('.bottom-bar');
    const menu = document.getElementById('menu');
    const logo = document.querySelector('.logo');

    // Estado inicial oculto
    menu.style.opacity = '0';
    menu.style.transform = 'translateY(-10px)';
    bottomBar.style.opacity = '0';
    bottomBar.style.transform = 'translateY(10px)';
    bottomBar.style.pointerEvents = 'none';

    const showUI = () => {
        menu.style.opacity = '1';
        menu.style.transform = 'translateY(0)';
        bottomBar.style.opacity = '1';
        bottomBar.style.transform = 'translateY(0)';
        bottomBar.style.pointerEvents = 'auto';
    };

    const hideUI = () => {
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-10px)';
        bottomBar.style.opacity = '0';
        bottomBar.style.transform = 'translateY(10px)';
        bottomBar.style.pointerEvents = 'none';
    };

    // Click o teclado en flecha
    if (arrow) {
        const scrollToContent = () => {
            window.scrollTo({ top: logo.offsetHeight, behavior: 'smooth' });
            showUI();
        };
        arrow.addEventListener('click', scrollToContent);
        arrow.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToContent();
            }
        });
    }

    // Mostrar/desaparecer UI según scroll
    window.addEventListener('scroll', () => {
        // Desaparecer solo si estamos completamente arriba del logo
        if (window.scrollY <= 10) { 
            hideUI();
        } else {
            showUI();
        }
    });
});
