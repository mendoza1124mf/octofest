Estructura
- index.html            las 8 pantallas (<section class="screen" data-screen="N">)
- css/styles.css        transiciones y animaciones
- js/config.js          fecha, textos, rutas de audio/imagen/media, personajes
- js/main.js            navegación, bloqueos, música por pantalla
- js/countdown.js, letter.js, puzzle.js, carousel.js, chicken.js, characters.js, audio.js, utils.js
- assets/               audio/musica.mp3, audio/pollo.mp3, img/puzzle.jpg, img/personaje1.png, img/personaje2.png, media/*

Correr (necesita servidor local por los módulos ES):
  python3 -m http.server 8000   ->  http://localhost:8000

Pruebas por URL:
  ?seg=10                    la cuenta termina en 10 s
  ?fecha=2026-10-03T00:00    otra fecha/hora
  ?test=1                    desbloquea todas las pantallas
