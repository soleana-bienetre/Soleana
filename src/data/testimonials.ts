export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sophie M.',
    location: 'Venerque',
    rating: 5,
    text: 'Un accueil exceptionnel, un cadre apaisant et des soins de grande qualité. Laetitia est à l\'écoute, professionnelle et met immédiatement à l\'aise. Je recommande vivement Soléana Bien-Être à toutes celles qui cherchent un vrai moment de soin personnalisé.',
    service: 'Soin visage',
    date: '2024',
    initials: 'SM',
  },
  {
    id: 2,
    name: 'Marie-Claire D.',
    location: 'Auterive',
    rating: 5,
    text: 'J\'ai découvert le Kobido chez Soléana et c\'est tout simplement magique. Laetitia a des mains d\'or, la séance est à la fois relaxante et visible sur le teint. Le cadre est vraiment cocooning, on s\'y sent tellement bien.',
    service: 'Kobido',
    date: '2024',
    initials: 'MD',
  },
  {
    id: 3,
    name: 'Isabelle T.',
    location: 'Labarthe-sur-Lèze',
    rating: 5,
    text: 'Plusieurs séances d\'épilation laser et le résultat est vraiment bluffant. Laetitia prend le temps d\'expliquer le traitement, de rassurer et d\'adapter selon la progression. Je suis ravie !',
    service: 'Épilation laser',
    date: '2024',
    initials: 'IT',
  },
  {
    id: 4,
    name: '[Prénom N.]',
    location: '[Ville]',
    rating: 5,
    text: '[Votre avis apparaîtra ici. Nous accueillons vos retours avec gratitude.]',
    service: '[Soin]',
    date: '2024',
    initials: '?',
  },
];
