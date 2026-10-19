// ============ TODO LO PERSONALIZABLE VIVE AQUÍ ============
const q = new URLSearchParams(location.search);

// Fecha objetivo. Para pruebas usa la URL:
//   ?fecha=2026-10-03T00:00   -> otra fecha y hora
//   ?seg=10                   -> la cuenta termina en 10 segundos
//   ?test=1                   -> desbloquea toda la navegación
function resolveTarget() {
  if (q.get('seg')) return new Date(Date.now() + Number(q.get('seg')) * 1000);
  if (q.get('fecha')) return new Date(q.get('fecha'));
  return new Date('2026-10-03T00:00:00'); // <-- fecha real (hora local del dispositivo)
}

export const CONFIG = {
  targetDate: resolveTarget(),
  testMode: q.get('TEST') === '1',
  eventName: 'TEST',

  music: 'assets/audio/musica.mp3',
  chickenAudio: 'assets/audio/pollo.m4a',
  puzzleImage: 'assets/img/puzzle.jpg',

  // Pantallas (1-8) donde suena la música y donde se muestra el reproductor
  musicScreens: [2, 3, 4, 5, 6, 7],
  playerScreens: [3, 4],

  titles: {
    1: 'Cuenta Regresiva', 2: 'Feliz cumpleaños', 3: 'Feliz cumpleaños', 4: 'Feliz cumpleaños',
    5: 'Feliz cumpleaños', 6: 'Feliz cumpleaños', 7: 'Feliz cumpleaños', 8: 'Feliz cumpleaños'
  },

  letter: {
    title: 'Para ti',
    body: [
      'Cartita.',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industries standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letrasets Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.',
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'
    ]
  },

  // Personajes con cuadro de instrucciones: clave = número de pantalla
  characters: {
   3: [
      { img: 'assets/img/personaje1.png', side: 'left',  text: 'Toca el sello de cera!'},
      { img: 'assets/img/personaje2.png', side: 'right', text: 'Hay una sorpresa para ti!'}
    ],
    5: 
    [
      { img: 'assets/img/personaje1.png', side: 'left',  text: 'Toca una pieza y luego otra para intercambiarlas'},
      { img: 'assets/img/personaje2.png', side: 'right', text: 'No necesitas guia, ya sabes cual es la imagen' }
    ],
    6: { img: 'assets/img/personaje2.png', side: 'right', text: 'Desliza para ver màs...' },
    7: { img: 'assets/img/personaje1.png', side: 'right', text: '¡Toca al pollo!' }
  },

  media: [
    { type: 'image', src: 'assets/media/foto1.jpg' },
    { type: 'image', src: 'assets/media/foto2.jpg' },
    { type: 'image', src: 'assets/media/foto3.jpg' },
    { type: 'image', src: 'assets/media/foto4.jpg' },
    { type: 'image', src: 'assets/media/foto5.jpg' },
    { type: 'image', src: 'assets/media/foto6.jpg' },
    { type: 'image', src: 'assets/media/foto7.jpg' },
    { type: 'image', src: 'assets/media/foto8.jpg' },
    { type: 'image', src: 'assets/media/foto9.jpg' },
    { type: 'image', src: 'assets/media/foto10.jpg' },
    { type: 'image', src: 'assets/media/foto11.jpg' },
    { type: 'image', src: 'assets/media/pastel.jpg' },
  ]
};
