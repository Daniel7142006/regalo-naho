// Aquí van tus 365 mensajes personalizados para Naho
const mensajes = [
  "Hoy es el primer día de un viaje increíble. Cada amanecer contigo es un regalo que atesoro. Tu sonrisa ilumina incluso los días más grises.",
  "Me encanta cómo sonríes cuando crees que nadie te está mirando. Esa alegría genuina es una de las mil razones por las que te amo.",
  "Recordar nuestro primer encuentro siempre me hace sonreír. Desde ese día, mi vida tiene más color y significado.",
  "Tu risa es mi canción favorita. Podría escucharla una y mil veces sin cansarme jamás.",
  "Cada día contigo es una página nueva en nuestra historia de amor, y no puedo esperar a ver qué escribiremos juntos.",
  "Tu apoyo incondicional me da fuerzas para enfrentar cualquier desafío. Gracias por creer siempre en mí.",
  "Amo cómo haces que lo ordinario se vuelva extraordinario simplemente con tu presencia.",
  "Tu bondad y compasión hacia los demás es algo que admiro profundamente. Eres una persona especial.",
  "Cada momento a tu lado es un tesoro que guardo en mi corazón para siempre.",
  "Tu forma de ver el mundo me inspira a ser mejor persona cada día.",
  "Hoy celebramos otro día juntos, y mi corazón se llena de gratitud por tenerte en mi vida."
];

// Generar mensajes de ejemplo para completar los 365 días
// IMPORTANTE: Reemplaza estos con tus propios mensajes personalizados
while (mensajes.length < 365) {
  const frases = [
    "Tu presencia hace que cada día sea especial y único.",
    "Admiro tu fuerza y determinación en todo lo que haces.",
    "Contigo he aprendido el verdadero significado del amor.",
    "Tu apoyo es el pilar que sostiene mis sueños.",
    "Cada día contigo es una aventura que atesoro.",
    "Tu amor es el regalo más hermoso que la vida me ha dado.",
    "Me haces sentir amado(a) y valorado(a) cada momento.",
    "Tu forma de cuidar de mí no tiene precio.",
    "Eres mi confidente, mi mejor amigo(a), mi todo.",
    "Contigo he descubierto un amor que ni en sueños imaginé."
  ];
  mensajes.push(frases[Math.floor(Math.random() * frases.length)]);
}