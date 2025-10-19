// filepath: c:\Users\YANFER\Downloads\the-boys-promo\src\assets\js\main.js

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

    // Manejar clicks en las temporadas del dropdown para saltar al carrusel
    document.querySelectorAll('.season-link').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const slide = parseInt(this.getAttribute('data-slide-to'), 10) || 0;
            // Usamos jQuery/Bootstrap carousel (main.js ahora se carga después de jQuery)
            if (window.jQuery && jQuery('#trailerCarousel').length) {
                jQuery('#trailerCarousel').carousel(slide);
            }
            // Scroll suave a la sección de trailers
            const trailerSection = document.getElementById('trailer');
            if (trailerSection) {
                trailerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Smooth scroll para el link de momentos destacados si usas ancla normal
    document.querySelectorAll('a[href="#highlights"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.getElementById('highlights');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Inicializar placeholders de highlights (miniaturas y click -> reemplazo por iframe)
    function secondsToTimeLabel(sec) {
        const s = Number(sec);
        const hh = Math.floor(s / 3600);
        const mm = Math.floor((s % 3600) / 60);
        const ss = Math.floor(s % 60);
        if (hh > 0) return `${hh}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
        return `${mm}:${String(ss).padStart(2,'0')}`;
    }

    function initHighlightPlaceholders() {
        document.querySelectorAll('.highlight-placeholder').forEach(placeholder => {
            const videoId = placeholder.dataset.videoId;
            const start = parseInt(placeholder.dataset.start || '0', 10);
            const end = parseInt(placeholder.dataset.end || '0', 10);

            // Usar miniatura de YouTube (no se descarga, se usa la URL pública)
            const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            placeholder.style.backgroundImage = `url("${thumbUrl}")`;

            // badge de tiempo
            const timeBadge = document.createElement('span');
            timeBadge.className = 'time-badge';
            timeBadge.textContent = end ? `${secondsToTimeLabel(start)} - ${secondsToTimeLabel(end)}` : secondsToTimeLabel(start);
            placeholder.appendChild(timeBadge);

            // play button
            const btn = document.createElement('div');
            btn.className = 'yt-play-btn';
            placeholder.appendChild(btn);

            // click -> reemplazar por iframe con enablejsapi y autoplay
            placeholder.addEventListener('click', function () {
                // construir src con enablejsapi
                let src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&autoplay=1&playsinline=1`;
                if (!isNaN(start) && start > 0) src += `&start=${start}`;
                if (!isNaN(end) && end > 0) src += `&end=${end}`;
                const iframe = document.createElement('iframe');
                iframe.className = 'embed-responsive-item replaced-yt';
                iframe.setAttribute('src', src);
                // permitir reproducción y autoplay explícito
                iframe.setAttribute('allow', 'autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen');
                iframe.setAttribute('playsinline', ''); // importante en móviles
                iframe.setAttribute('allowfullscreen', '');
                // usar el aria-label como title para accesibilidad
                iframe.setAttribute('title', placeholder.getAttribute('aria-label') || 'YouTube video');

                // forzar estilos para que llene y quede encima
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = '0';
                iframe.style.zIndex = '9999';
                
                placeholder.classList.add('replaced-container');
                placeholder.innerHTML = ''; // limpiar miniatura
                placeholder.style.display = 'block';
                placeholder.style.position = 'relative';
                placeholder.appendChild(iframe);
            }, { once: true });
        });
    }

    // Pausar videos del carousel de highlights al cambiar slide
    if (window.jQuery && jQuery('#highlight-carousel').length) {
        jQuery('#highlight-carousel').on('slide.bs.carousel', function () {
            // buscar iframe dentro del carousel y enviar mensaje de pausa (YouTube API postMessage)
            const $active = jQuery(this).find('.carousel-item.active');
            const $iframes = $active.find('iframe');
            $iframes.each(function () {
                try {
                    this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                } catch (e) {
                    // ignore
                }
            });
        });
    }

    // Inicializar al cargar
    initHighlightPlaceholders();
});