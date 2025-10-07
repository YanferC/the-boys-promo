// filepath: the-boys-promo/the-boys-promo/src/assets/js/main.js

// JavaScript para la página promocional de The boys"
document.addEventListener('DOMContentLoaded', function () {
    // Restricción de edad
    const ageModal = document.getElementById('age-modal'); // Mostrar el modal al cargar la página obteniendo el id del modal
    document.getElementById('age-yes').onclick = function () { // Si el usuario confirma que es mayor de edad, se cierra el modal
        document.getElementById('age-modal').style.display = 'none'; // Ocultar el modal
    };
    document.getElementById('age-no').onclick = function () { // Si el usuario confirma que no es mayor de edad, se redirige a otra página
        window.location.href = 'https://www.google.com'; // Redirigir a Google u otra página segura
    };

    // Spoiler banner
    const spoilerBanner = document.getElementById('spoiler-banner'); // Mostrar el banner de spoiler
    const highlights = document.getElementById('highlights'); // Contenido con spoilers que saldrá oculto 
    //  inicialmente aquí obtenemos el id del contenido
    spoilerBanner.classList.remove('d-none');
    document.getElementById('continue-spoiler').onclick = function () { // Si el usuario decide continuar, se oculta el banner y se muestra el contenido
        spoilerBanner.classList.add('d-none'); // Ocultar el banner
        highlights.classList.remove('d-none'); // Mostrar el contenido con spoilers
    };

    // Cuenta regresiva sangrienta
    const countdown = document.getElementById('countdown'); // Contenedor de la cuenta regresiva obteniendo el id del contenedor
    const releaseDate = new Date('2026-07-01'); // Fecha estimada para la cuenta regresiva
    function updateCountdown() { // Actualizar la cuenta regresiva cada segundo
        const now = new Date(); // Fecha y hora actual
        const diff = releaseDate - now; // Diferencia en milisegundos entre la fecha de lanzamiento y la actual
        if (diff <= 0) { // Si la fecha ya pasó, mostrar mensaje final
            countdown.textContent = "¡Ya salió la nueva temporada!";
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // Calcular días, horas, minutos y segundos restantes
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24); // Usar módulo para horas, minutos y segundos
        const mins = Math.floor((diff / (1000 * 60)) % 60); // para mantenerlos en su rango
        const secs = Math.floor((diff / 1000) % 60);
        countdown.textContent = `${days}d ${hours}h ${mins}m ${secs}s`; // Actualizar el texto de la cuenta regresiva
    }
    setInterval(updateCountdown, 1000); // Llamar a la función cada segundo para actualizar la cuenta regresiva



    // Animación de menú
    document.querySelectorAll('.dropdown-item').forEach(item => { // Agregar eventos de hover a los elementos del menú desplegable
        item.addEventListener('mouseenter', () => { // Al pasar el mouse, agregar clase para animación
            item.classList.add('menu-hover');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('menu-hover');
        });
    });

    //Controlar la apertura y cierre del modal de sugerencias
    const modal = document.getElementById("sugerencia-modal");
    const openBtn = document.querySelector(".open-modal-btn");
    const closeBtn = document.querySelector(".close-btn");

    openBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

});