import { useEffect } from 'react';
import {
  MapPin,
  Zap,
  Leaf,
  Wind,
  Droplets,
  HelpCircle,
  Globe,
  Phone,
} from 'lucide-react';
import FAQAccordion from '../components/ui/FAQAccordion';
import CTABanner from '../components/ui/CTABanner';

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

interface FAQSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  items: { question: string; answer: string }[];
}

const faqSections: FAQSection[] = [
  {
    id: 'pratique',
    title: 'Pratique',
    icon: <HelpCircle size={18} />,
    color: 'nude',
    items: [
      {
        question: 'Où se situe Soléana Bien-Être ?',
        answer:
          "Soléana Bien-Être est situé au 1 Rue de la Fraternité, 31810 Venerque, à quelques minutes d\'Auterive, de Labarthe-sur-Lèze et accessible depuis Toulouse Sud. Un parking gratuit est disponible sur place.",
      },
      {
        question: 'Comment prendre rendez-vous ?',
        answer:
          "Vous pouvez prendre rendez-vous directement par téléphone au 07 62 16 98 14, ou en ligne via notre partenaire Planity disponible sur notre site. Pour toute question spécifique ou demande de devis, n\'hésitez pas à nous appeler.",
      },
      {
        question: 'Peut-on réserver en ligne ?',
        answer:
          'Oui, la réservation en ligne est disponible via Planity. Vous pouvez consulter les créneaux disponibles et choisir votre prestation en toute autonomie, 24h/24. Un rappel vous sera envoyé avant votre rendez-vous.',
      },
      {
        question: 'Y a-t-il un parking ?',
        answer:
          "Oui, un parking gratuit est disponible directement sur place, au 1 Rue de la Fraternité à Venerque. Vous n\'aurez aucun souci pour stationner lors de vos rendez-vous.",
      },
      {
        question: "Quels sont les horaires d\'ouverture ?",
        answer:
          'Lundi : fermé\nMardi : 09h00 – 18h00\nMercredi : 09h00 – 11h00\nJeudi : 09h00 – 20h00\nVendredi : 09h00 – 18h00\nSamedi : 09h00 – 13h30\nDimanche : fermé\n\nSur rendez-vous uniquement.',
      },
      {
        question: 'Peut-on annuler ou déplacer un rendez-vous ?',
        answer:
          "[Placeholder à définir – politique d\'annulation et de report de rendez-vous à préciser. Ex : délai minimum d\'annulation, conditions de remboursement ou de report, etc.]",
      },
      {
        question: 'Quels moyens de paiement acceptez-vous ?',
        answer:
          '[Placeholder à définir – modes de paiement acceptés : espèces, carte bancaire, virement, etc. Préciser également les conditions de paiement en plusieurs fois pour les forfaits laser.]',
      },
      {
        question: 'Proposez-vous des cartes cadeaux ?',
        answer:
          '[Placeholder à définir – disponibilité et modalités des cartes cadeaux. Préciser les montants disponibles, la durée de validité et comment les commander.]',
      },
    ],
  },
  {
    id: 'laser',
    title: 'Épilation laser',
    icon: <Zap size={18} />,
    color: 'sage',
    items: [
      {
        question: "L\'épilation laser est-elle adaptée à tout le monde ?",
        answer:
          "L\'épilation laser convient à la grande majorité des profils, mais certaines contre-indications existent : grossesse, peau très bronzée ou récemment exposée au soleil, certains traitements médicamenteux (photosensibilisants), maladies de peau actives sur la zone à traiter, etc. Un bilan préalable est systématiquement réalisé lors de votre première séance pour évaluer votre profil et adapter le protocole.",
      },
      {
        question: 'Combien de séances faut-il prévoir pour une épilation laser ?',
        answer:
          'En moyenne, il faut compter entre 6 et 10 séances pour obtenir une réduction significative et durable des poils. Le nombre exact varie selon la zone traitée, la couleur et la densité des poils, le phototype de peau et les cycles hormonaux. Les séances sont espacées de 4 à 8 semaines selon les zones.',
      },
      {
        question: 'Peut-on payer en plusieurs fois ?',
        answer:
          "Oui, le paiement en 3 ou 4 fois sans frais est disponible pour les forfaits laser. Cette facilité de paiement vous permet d\'étaler le coût de votre traitement sur plusieurs mois. N\'hésitez pas à nous contacter pour plus d\'informations sur les modalités.",
      },
      {
        question: "Comment se préparer avant une séance d\'épilation laser ?",
        answer:
          "Avant votre séance laser, il est recommandé de : raser la zone à traiter 24 à 48 heures avant (ne pas épiler à la cire ni épiler à la pince les semaines précédentes), éviter toute exposition solaire sur la zone pendant au moins 4 semaines, ne pas appliquer d\'autobronzant, signaler tout traitement médicamenteux en cours. Arrivez avec la peau propre, sans crème ni parfum sur la zone traitée.",
      },
    ],
  },
  {
    id: 'soins-kobido',
    title: 'Soins visage & Kobido',
    icon: <Leaf size={18} />,
    color: 'sand',
    items: [
      {
        question: 'Quel soin visage choisir selon mon type de peau ?',
        answer:
          "Le choix dépend de vos besoins spécifiques : le Soin Éclat Express est idéal pour un coup d\'éclat rapide avant un événement ; le Soin Bio-Expert est particulièrement adapté aux peaux sensibles ou réactives grâce à ses formules naturelles ; le Soin Human est une approche holistique personnalisée, parfaite si vous cherchez un soin global alliant technicité et bien-être. Un bilan de peau est réalisé en début de séance pour adapter chaque protocole à vos besoins du moment.",
      },
      {
        question: 'Le Kobido est-il fait pour moi ?',
        answer:
          "Le Kobido est une technique de massage facial japonaise qui convient à la plupart des personnes souhaitant tonifier leur visage, atténuer les signes de fatigue ou de l\'âge, et obtenir un teint plus lumineux de manière naturelle. Il est particulièrement apprécié comme alternative non invasive aux soins esthétiques médicaux. Quelques contre-indications existent : infections cutanées actives, rosacée sévère, certaines pathologies vasculaires. N\'hésitez pas à nous contacter si vous avez un doute.",
      },
      {
        question: 'Quelle différence entre le Kobido express et le Kobido complet ?',
        answer:
          "Le Kobido express (30 min) est une version raccourcie qui cible principalement la stimulation du visage pour un effet revitalisant et tonifiant rapide, idéal en pause déjeuner ou pour un entretien régulier. Le Kobido complet (60 min) suit un protocole intégral incluant l\'ensemble du visage, du cou, du décolleté et du crâne, offrant un véritable lifting naturel, une profonde relaxation musculaire et un effet visible plus marqué.",
      },
    ],
  },
  {
    id: 'massages',
    title: 'Massages',
    icon: <Wind size={18} />,
    color: 'nude',
    items: [
      {
        question: "À qui s\'adressent les massages proposés ?",
        answer:
          "Les massages (Abhyanga, Balinais) s\'adressent à toute personne souhaitant se détendre, soulager les tensions musculaires ou simplement prendre soin de son corps. Ils conviennent aussi bien aux personnes stressées, sportives ou en recherche de bien-être qu\'à celles souffrant de douleurs de dos légères. Certaines contre-indications médicales peuvent s\'appliquer : informez-nous de vos antécédents lors de la prise de rendez-vous.",
      },
      {
        question: 'Le massage prénatal est-il sans risque pendant la grossesse ?',
        answer:
          "Le massage prénatal est spécialement adapté aux futures mamans et réalisé avec des techniques douces et sécurisées. Il est proposé à partir du 4e mois de grossesse, en position adaptée. Il aide à soulager les douleurs lombaires, les jambes lourdes et la fatigue. Cependant, il est impératif d\'informer votre praticienne de votre situation et d\'obtenir l\'accord de votre médecin ou sage-femme au préalable en cas de grossesse à risque.",
      },
    ],
  },
  {
    id: 'drainage',
    title: 'Drainage & Corps',
    icon: <Droplets size={18} />,
    color: 'sage',
    items: [
      {
        question: 'Quelle différence entre le drainage lymphatique et la maderothérapie ?',
        answer:
          "Le drainage lymphatique manuel est une technique de massage doux qui stimule la circulation du liquide lymphatique, favorisant l\'élimination des toxines et des excès de liquide (idéal pour les jambes lourdes, les œdèmes, la récupération post-opératoire). La maderothérapie est une technique de modelage corporel utilisant des instruments en bois pour drainer, tonifier et remodeler les contours. Ces deux approches sont complémentaires et souvent associées pour potentialiser les résultats.",
      },
      {
        question: "À qui s\'adresse le drainage lymphatique ?",
        answer:
          "Le drainage lymphatique est particulièrement recommandé aux personnes souffrant de jambes lourdes, d\'œdèmes, de rétention d\'eau, en préparation ou récupération post-opératoire (notamment après liposuccion ou chirurgie), ainsi qu\'aux femmes enceintes (avec accord médical) et en post-partum. Il peut également être pratiqué en bien-être général pour améliorer la légèreté du corps et favoriser la détox.",
      },
      {
        question: "C\'est quoi la maderothérapie ?",
        answer:
          "La maderothérapie est une technique de massage et de modelage corporel d\'origine colombienne qui utilise des instruments en bois de différentes formes et tailles. Ces outils permettent d\'exercer des pressions, des roulements et des percussions ciblées sur les zones à traiter. Elle vise à affiner la silhouette, réduire l\'aspect de la cellulite, tonifier la peau et stimuler la circulation lymphatique. C\'est une méthode naturelle, non invasive, appréciée pour son efficacité sur le remodelage corporel.",
      },
    ],
  },
  {
    id: 'secteur',
    title: 'Secteur géographique',
    icon: <Globe size={18} />,
    color: 'sand',
    items: [
      {
        question: 'Quels secteurs autour de Venerque desservez-vous ?',
        answer:
          "Soléana Bien-Être est situé à Venerque et accueille des clientes et clients venant de toute la région : Venerque, Vernet, Auterive, Labarthe-sur-Lèze, Eaunes, Pins-Justaret, Miremont et l\'ensemble du Toulouse Sud. Notre situation géographique est facilement accessible depuis la RD820 et les communes environnantes du Porte-de-Pamiers. Contactez-nous pour toute question sur l\'accès.",
      },
    ],
  },
];

// ─── Schema.org Data ──────────────────────────────────────────────────────────

const faqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSections.flatMap((section) =>
    section.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))
  ),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  section,
}: {
  section: FAQSection;
}) {
  const colorMap: Record<string, string> = {
    nude: 'bg-nude-50 text-nude-700 border-nude-200',
    sage: 'bg-sage-50 text-sage-700 border-sage-200',
    sand: 'bg-sand-50 text-sand-700 border-sand-200',
  };
  const dotMap: Record<string, string> = {
    nude: 'bg-nude-400',
    sage: 'bg-sage-400',
    sand: 'bg-sand-400',
  };
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border ${colorMap[section.color] ?? colorMap.nude}`}
      >
        {section.icon}
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${dotMap[section.color] ?? dotMap.nude}`} />
        <h2 className="font-serif text-2xl font-light text-stone-800">{section.title}</h2>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FAQ() {
  // Inject JSON-LD schema
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchemaData);
    script.id = 'faq-schema';
    if (!document.getElementById('faq-schema')) {
      document.head.appendChild(script);
    }
    return () => {
      const el = document.getElementById('faq-schema');
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-sand-50 to-cream section-padding">
        <div className="container-narrow">
          <div className="mt-8 text-center">
            <span className="tag">Foire aux questions</span>
            <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-2">
              Vos questions, nos réponses
            </h1>
            <p className="mt-6 text-base md:text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
              Retrouvez les réponses aux questions les plus fréquentes sur nos soins, nos
              prestations et le fonctionnement de l'institut. Une question sans réponse ?
              Contactez-nous directement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <a href="tel:0762169814" className="btn-phone">
                <Phone size={16} />
                07 62 16 98 14
              </a>
              <a
                href="#categories"
                className="btn-secondary"
              >
                Parcourir la FAQ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Jump Links ── */}
      <div id="categories" className="bg-white border-b border-sand-100 py-6">
        <div className="container-wide">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {faqSections.map((section) => (
              <a
                key={section.id}
                href={`#faq-${section.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sand-50 hover:bg-sand-100 text-stone-600 hover:text-stone-800 text-xs font-medium font-sans rounded-full transition-colors duration-200 border border-sand-100"
              >
                {section.icon}
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ Sections ── */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="space-y-16">
            {faqSections.map((section) => (
              <div key={section.id} id={`faq-${section.id}`} className="scroll-mt-24">
                <SectionHeader section={section} />
                <FAQAccordion items={section.items} />
              </div>
            ))}
          </div>

          {/* Still have a question? */}
          <div className="mt-20 bg-white border border-sand-200 rounded-3xl p-8 md:p-12 text-center">
            <div className="w-14 h-14 bg-nude-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <HelpCircle size={24} className="text-nude-600" />
            </div>
            <h2 className="font-serif text-2xl font-light text-stone-800 mb-3">
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed max-w-md mx-auto mb-7">
              Notre équipe est disponible pour répondre à toutes vos questions. N'hésitez pas à
              nous contacter par téléphone ou via notre formulaire de contact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="tel:0762169814" className="btn-primary">
                <Phone size={16} />
                07 62 16 98 14
              </a>
              <a href="/contact" className="btn-secondary">
                <MapPin size={16} />
                Formulaire de contact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <CTABanner
        title="Prête à prendre soin de vous ?"
        subtitle="Réservez votre séance en ligne ou contactez-nous pour un premier échange."
      />
    </>
  );
}
