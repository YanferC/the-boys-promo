// filepath: the-boys-promo/the-boys-promo/src/assets/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // Restricción de edad
    const ageModal = document.getElementById('age-modal');
    document.getElementById('age-yes').onclick = function() {
        document.getElementById('age-modal').style.display = 'none';
    };
    document.getElementById('age-no').onclick = function() {
        window.location.href = 'https://www.google.com';
    };

    // Spoiler banner
    const spoilerBanner = document.getElementById('spoiler-banner');
    const highlights = document.getElementById('highlights');
    spoilerBanner.classList.remove('d-none');
    document.getElementById('continue-spoiler').onclick = function() {
        spoilerBanner.classList.add('d-none');
        highlights.classList.remove('d-none');
    };

    // Cuenta regresiva sangrienta
    const countdown = document.getElementById('countdown');
    const releaseDate = new Date('2026-07-01'); // Fecha estimada para la cuenta regresiva
    function updateCountdown() {
        const now = new Date();
        const diff = releaseDate - now;
        if (diff <= 0) {
            countdown.textContent = "¡Ya salió la nueva temporada!";
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        countdown.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
    }
    setInterval(updateCountdown, 1000);

    // Animaciones de personajes
    document.querySelectorAll('.character-img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.classList.add('grotesque');
        });
        img.addEventListener('mouseleave', () => {
            img.classList.remove('grotesque');
        });
    });

    // Animación de menú
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('menu-hover');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('menu-hover');
        });
    });

    // Event listener for a button click to show more information about "The Boys"
    const showMoreButton = document.getElementById('show-more');
    const moreInfoSection = document.getElementById('more-info');

    showMoreButton.addEventListener('click', function() {
        moreInfoSection.classList.toggle('d-none');
        showMoreButton.textContent = moreInfoSection.classList.contains('d-none') ? 'Show More' : 'Show Less';
    });

    // Dynamic content update example
    const updateContentButton = document.getElementById('update-content');
    const contentArea = document.getElementById('content-area');

    updateContentButton.addEventListener('click', function() {
        contentArea.innerHTML = '<p>New content about "The Boys" has been loaded!</p>';
    });

    // Additional interactive features can be added here
});