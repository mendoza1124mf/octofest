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
  eventName: 'OCTODENFEST',

  music: 'assets/audio/musica.mp3?v=2',
  chickenAudio: 'assets/audio/pollo.m4a',
  puzzleImage: 'assets/img/puzzle.jpg',

  // Pantallas (1-8) donde suena la música y donde se muestra el reproductor
  musicScreens: [2, 3, 4, 5, 6, 8],
  playerScreens: [2,3, 4, 5, 6, 8],

  titles: {
    1: 'Cuenta Regresiva', 2: 'Feliz cumpleaños', 3: 'Feliz cumpleaños', 4: 'Feliz cumpleaños',
    5: 'Feliz cumpleaños', 6: 'Feliz cumpleaños', 7: 'Feliz cumpleaños', 8: 'Feliz cumpleaños'
  },

  letter: {
    title: '¡Feliz Cumpleaños!',
    body: [
      'Hoy en tu día especial, más que felicitarte quiero agradecerle a la vida y a Dios el hecho de que estés aquí y habernos permitido coincidir. Aunque tardamos 3 años en hablar, la verdad es que esperaría de nuevo si supiera que volveré a encontrarte. Tu amistad es una bendición, eres luz para mi vida y seguro que para la de muchas personas más. Aunque estemos lejos, en esta amistad no se sienten los kilometros ni las fronteras de distancia.',
      'Agradezco tu vida y que estés aquí cumpliendo un año más, veo en ti a una persona fuerte y valiente pero también sensible y amable con el mundo, admiro tu capacidad de siempre levantarte como el cangrejopollodragon que eres, pero también valoras y celebras tus logros, me alegra mucho ver como estás aprendiendo a ser más paciente contigo, amar tu intensidad y a priorizarte sobre todo. Eres una persona increíble y me siento muy afortunada de poder llamarte amiga.',
      'Gracias por tu sentido del humor tan funable, por conservar a las ardillas que complementan tu personalidad, pero también gracias por esa ardilla seria y empática que sabe escuchar y aconsejarme cuando le necesito. Desde lo más profundo de mi corazón deseo mucha alegría, bendiciones y amor, pero sobre todo mucha paz para ti. Por favor no olvides confiar en ti y en el potencial que tienes, porque ni modo que no puedas lograr todo lo que te propongas, dudar es válido pero no permitas que eso te detenga.',
      'Deseo que cumplas muchísimos años más, debo decir que tu amistad es sumamente valiosa para mí, gracias por existir y por ser tu misma, eres el volcán que este mundo tan lleno de gente tibia necesita. También quiero agradecer por las risas, las bromas, la funa, los discord y los audios larguisimos, gracias por apagar mi brillo y permitir que apague el tuyo en los juegos, agradezco las pláticas profundas y también las más random, le pido a la vida que podamos seguir compartiendo muchos momentos más. También manifiesto a tu Kaphrao :D',
      'Por último, quiero que sepas que siempre estaré a un mensaje de distancia para lo que necesites.',
      'Te quiero mucho y espero que tengas un cumpleaños increíble, lleno de sorpresas y momentos felices.'
    ]
  },

  // Personajes con cuadro de instrucciones: clave = número de pantalla
  characters: {
   3: [
      { img: 'assets/img/personaje1.png', side: 'left',  text: 'Toca el sello de cera! 🤭​'},
      { img: 'assets/img/personaje2.png', side: 'right', text: 'Hay una sorpresa para ti! 🤭​'}
    ],
    5: 
    [
      { img: 'assets/img/personaje1.png', side: 'left',  text: 'Toca una pieza y luego otra para intercambiarlas'},
      { img: 'assets/img/personaje2.png', side: 'right', text: 'A que no adivinas quien es 🤔​' }
    ],
    6: [
      { img: 'assets/img/personaje1.png', side: 'left',  text: 'Desbloqueaste la estampita! 🥳​'},
      { img: 'assets/img/personaje2.png', side: 'right', text: 'Desliza para ver más...' },
    ],
    7: [
      { img: 'assets/img/personaje1.png', side: 'left',  text: 'Toca al pollo, porfavor​'},
      { img: 'assets/img/personaje2.png', side: 'right', text: 'Sí, tienes que escuchar al pollo!' },
    ],
  },

  media: [
    { type: 'image', src: 'assets/media/foto1.jpg' },
    { type: 'image', src: 'assets/media/foto12.jpg'},
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
