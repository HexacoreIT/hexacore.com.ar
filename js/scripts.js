document.addEventListener('DOMContentLoaded', () => {
    const arrow = document.getElementById('arrow');
    const bottomBar = document.querySelector('.bottom-bar');
    const menu = document.getElementById('menu');
    const logo = document.querySelector('.logo');

    // Estado inicial oculto
    menu.classList.remove('visible');
    bottomBar.classList.remove('visible');

    // Click o teclado en la flecha
    if (arrow) {
        const showUI = () => {
            window.scrollTo({ top: logo.offsetHeight, behavior: 'smooth' });
            menu.classList.add('visible');
            bottomBar.classList.add('visible');
        };
        arrow.addEventListener('click', showUI);
        arrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showUI();
            }
        });
    }
});
