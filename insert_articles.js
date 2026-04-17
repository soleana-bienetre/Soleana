const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ssenglsjrkjmambtxckl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZW5nbHNqcmtqbWFtYnR4Y2tsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTczNzY5NCwiZXhwIjoyMDkxMzEzNjk0fQ.bUTsTejUsaNCH8YR5Dw-gyuHrgq2P_jfoykJUoGiYrg'
);

const articles = [
  {
    title: 'Kobido : le lifting naturel japonais qui transforme votre visage',
    slug: 'kobido-lifting-naturel-japonais-bienfaits',
    excerpt: 'Né au Japon au XVe siècle, le Kobido est bien plus qu\'un simple massage du visage. Véritable lifting naturel, il tonifie, lisse et illumine le teint sans aucune injection ni procédure invasive. Découvrez ses bienfaits et pourquoi ce soin ancestral séduit de plus en plus.',
    category: 'Kobido',
    tags: ['kobido', 'lifting naturel', 'massage facial', 'anti-âge', 'soin visage'],
    read_time: 6,
    published: true,
    published_at: new Date('2026-04-01').toISOString(),
    meta_title: 'Kobido : lifting naturel japonais – Soléana Bien-Être Venerque',
    meta_description: 'Découvrez le Kobido, massage facial japonais ancestral aux effets anti-âge naturels. Tonification, éclat, drainage : tous les bienfaits expliqués par Laetitia Sevrin à Venerque (31).',
    og_image_url: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=1200',
    og_image_alt: 'Massage Kobido lifting naturel japonais – Soléana Bien-Être',
    content: `<div class="summary-box">
  <h4>🌸 Points clés à retenir</h4>
  <ul>
    <li>Le Kobido est une technique japonaise de massage facial vieille de plus de 500 ans</li>
    <li>Ses effets sont comparables à ceux d'un lifting, sans aucune injection</li>
    <li>Résultats visibles dès la première séance : teint lumineux, traits reposés</li>
    <li>Séances recommandées : 1 par semaine les 4 premières semaines, puis 1 par mois</li>
  </ul>
</div>

<h2>Qu'est-ce que le Kobido ?</h2>

<p>Le <strong>Kobido</strong> (古美道, littéralement « ancienne voie de la beauté ») est une technique de massage du visage originaire du Japon. Né au XVe siècle, il était pratiqué par les esthéticiens attitrés de l'Impératrice japonaise pour conserver leur beauté et leur jeunesse.</p>

<p>Contrairement à un simple massage relaxant, le Kobido est une discipline codifiée qui associe <strong>plus de 47 manœuvres différentes</strong> : effleurages, pétrissages profonds, pressions sur les points d'acupression, vibrations, percussions légères et drainage lymphatique. C'est cette combinaison qui lui confère ses effets spectaculaires sur le visage.</p>

<h2>Les bienfaits du Kobido</h2>

<h3>Un effet lifting immédiat et durable</h3>

<p>Le Kobido agit sur les <strong>muscles du visage</strong>, qui, comme tous les muscles du corps, ont tendance à se relâcher avec le temps. En les travaillant en profondeur, le massage les retone et les repositionne, ce qui produit un effet liftant naturel et visible.</p>

<p>Les résultats sont perceptibles dès la première séance :</p>
<ul>
  <li>Ovale du visage redéfini</li>
  <li>Pommettes rehaussées</li>
  <li>Paupières moins tombantes</li>
  <li>Traits détendus et reposés</li>
</ul>

<h3>Un teint lumineux et unifié</h3>

<p>Le <strong>drainage lymphatique</strong> intégré au protocole Kobido stimule la microcirculation sanguine et favorise l'élimination des toxines. Le résultat ? Un teint immédiatement plus lumineux, plus uniforme, et des cernes atténués.</p>

<h3>Une relaxation profonde</h3>

<p>Le visage concentre une tension musculaire considérable liée au stress quotidien, aux expressions répétées et au temps passé devant les écrans. Le Kobido libère ces tensions profondes, procurant un sentiment de légèreté et de bien-être total.</p>

<div class="info-box">
  💡 <strong>Le saviez-vous ?</strong> Le Kobido est parfois surnommé le "lifting des stars" car de nombreuses personnalités japonaises — et aujourd'hui européennes — y ont recours régulièrement en alternative aux injections.
</div>

<h2>Comment se déroule une séance de Kobido chez Soléana ?</h2>

<p>Chez Soléana Bien-Être, une séance de Kobido dure entre <strong>60 et 90 minutes</strong>. Elle débute par un bilan de votre peau et de vos objectifs. Laetitia adapte ensuite chaque geste à votre morphologie, votre teint et vos besoins du moment.</p>

<p>Le soin utilise exclusivement des <strong>huiles et crèmes Estime & Sens</strong>, certifiées bio et fabriquées en France, pour nourrir la peau en profondeur tout au long du massage.</p>

<h3>À quelle fréquence pratiquer le Kobido ?</h3>

<p>Pour des résultats durables, le protocole recommandé est :</p>
<ul>
  <li><strong>Phase intensive :</strong> 1 séance par semaine pendant 4 semaines</li>
  <li><strong>Phase d'entretien :</strong> 1 séance par mois</li>
</ul>

<p>Dès la 3e ou 4e séance intensive, les effets se cumulent et le remodelage du visage devient de plus en plus marqué.</p>

<h2>Le Kobido est-il douloureux ?</h2>

<p>Non. Le Kobido est un soin <strong>agréable et non douloureux</strong>. Certaines manœuvres de pétrissage peuvent être légèrement intenses sur les zones de tension, mais elles ne provoquent aucune douleur. La plupart des clientes s'endorment pendant la séance, tellement l'état de relaxation est profond.</p>

<div class="conclusion">
  <h3>En conclusion</h3>
  <p>Le Kobido est une alternative naturelle, efficace et non invasive aux traitements anti-âge. Que vous cherchiez à tonifier votre visage, à retrouver de l'éclat ou simplement à vous offrir un moment de soin profond, ce massage ancestral vous surprendra par ses effets visibles et immédiats.</p>
  <p>À Venerque (31810), Laetitia Sevrin vous accueille dans un cadre chaleureux pour vous faire découvrir cette technique unique.</p>
</div>`
  },
  {
    title: 'Épilation laser : combien de séances sont vraiment nécessaires ?',
    slug: 'combien-seances-epilation-laser-necessaires',
    excerpt: 'L\'épilation laser est souvent présentée comme définitive, mais le nombre de séances varie selon votre profil. Phototype, zone traitée, densité du poil : voici tout ce que vous devez savoir avant de commencer votre traitement à Venerque.',
    category: 'Épilation laser',
    tags: ['épilation laser', 'laser', 'poil', 'séances', 'phototype', 'venerque'],
    read_time: 7,
    published: true,
    published_at: new Date('2026-03-15').toISOString(),
    meta_title: 'Combien de séances d\'épilation laser faut-il ? – Soléana Venerque',
    meta_description: 'Nombre de séances épilation laser selon la zone, le phototype et le type de poil. Réponses claires de Laetitia Sevrin, praticienne certifiée AESTAM Paris à Venerque (31810).',
    og_image_url: 'https://images.pexels.com/photos/3865557/pexels-photo-3865557.jpeg?auto=compress&cs=tinysrgb&w=1200',
    og_image_alt: 'Épilation laser professionnelle – Soléana Bien-Être Venerque',
    content: `<div class="summary-box">
  <h4>⚡ L'essentiel en un coup d'œil</h4>
  <ul>
    <li>En moyenne, <strong>6 à 10 séances</strong> sont nécessaires pour un résultat durable</li>
    <li>Le laser ne peut agir que sur les poils en phase de croissance active (anagène)</li>
    <li>Les intervalles entre séances varient de 4 à 12 semaines selon la zone</li>
    <li>Un diagnostic personnalisé est toujours réalisé avant de commencer</li>
  </ul>
</div>

<h2>Pourquoi le laser ne fonctionne pas en une seule séance ?</h2>

<p>Pour comprendre le nombre de séances nécessaires, il faut d'abord comprendre comment fonctionne l'épilation laser. Le laser cible la <strong>mélanine du bulbe pileux</strong> pour détruire le follicule. Or, cette action n'est efficace que sur les poils en phase <strong>anagène</strong>, c'est-à-dire en phase de croissance active.</p>

<p>À tout moment, seulement <strong>20 à 30 % des poils d'une zone</strong> se trouvent en phase anagène. C'est pourquoi plusieurs séances espacées sont indispensables : chaque séance traite une nouvelle cohorte de poils entrant en phase de croissance.</p>

<h2>Les facteurs qui influencent le nombre de séances</h2>

<h3>1. Votre phototype (type de peau)</h3>

<p>Le laser fonctionne sur le principe du contraste entre la mélanine du poil et celle de la peau. Plus le contraste est élevé (poil foncé, peau claire), plus le laser est efficace. Les phototypes <strong>I à IV</strong> (peaux claires à mates) obtiennent généralement les meilleurs résultats.</p>

<p>Pour les phototypes plus foncés (V et VI), les paramètres sont ajustés pour éviter toute irritation, ce qui peut nécessiter quelques séances supplémentaires.</p>

<h3>2. La zone traitée</h3>

<p>Chaque zone du corps a son propre cycle pilaire :</p>
<ul>
  <li><strong>Aisselles :</strong> 4 à 6 séances (cycle court)</li>
  <li><strong>Maillot :</strong> 6 à 8 séances</li>
  <li><strong>Jambes :</strong> 6 à 10 séances (poils plus longs à cycle plus long)</li>
  <li><strong>Visage :</strong> 8 à 12 séances (influence hormonale plus forte)</li>
</ul>

<h3>3. La densité et la couleur du poil</h3>

<p>Les <strong>poils noirs et épais</strong> absorbent davantage l'énergie laser et sont traités plus efficacement. Les poils fins, clairs ou roux répondent moins bien au laser conventionnel.</p>

<h3>4. Les variations hormonales</h3>

<p>Certaines zones, notamment le visage et le maillot, sont directement influencées par les hormones. Une grossesse, une prise de contraceptif ou un déséquilibre hormonal peut stimuler la repousse et nécessiter des séances d'entretien.</p>

<div class="info-box">
  💡 <strong>Bon à savoir :</strong> Chez Soléana, Laetitia utilise un <strong>laser certifié AESTAM Paris</strong>, adapté à tous les phototypes, avec des protocoles de sécurité rigoureux. Un diagnostic complet est réalisé lors de votre première consultation, gratuitement.
</div>

<h2>À quelle fréquence faire ses séances ?</h2>

<p>Les intervalles recommandés selon la zone :</p>
<ul>
  <li><strong>Aisselles / maillot :</strong> toutes les 4 à 6 semaines</li>
  <li><strong>Jambes / bras :</strong> toutes les 6 à 8 semaines</li>
  <li><strong>Visage :</strong> toutes les 4 à 6 semaines</li>
</ul>

<p>Il est essentiel de <strong>respecter ces intervalles</strong> pour que le laser soit appliqué au bon moment du cycle pilaire.</p>

<h2>Les précautions avant chaque séance</h2>

<ul>
  <li>Ne pas s'exposer au soleil dans les 4 semaines précédant la séance</li>
  <li>Ne pas s'épiler à la cire ni à la pince (mais on peut se raser)</li>
  <li>Raser la zone à traiter 24 à 48h avant la séance</li>
  <li>Ne pas appliquer de crème auto-bronzante</li>
</ul>

<h2>Combien de séances pour un résultat définitif ?</h2>

<p>Le terme « épilation définitive » est encadré par la loi : on parle officiellement de <strong>réduction permanente et significative du poil</strong>. En pratique, après un protocole complet de 6 à 10 séances, la grande majorité des clientes constatent :</p>
<ul>
  <li>Une réduction de 80 à 95 % des poils sur les zones traitées</li>
  <li>Des poils résiduels fins et clairs, quasi imperceptibles</li>
  <li>Parfois quelques séances d'entretien annuelles selon les variations hormonales</li>
</ul>

<div class="conclusion">
  <h3>En conclusion</h3>
  <p>Il n'existe pas de réponse universelle au nombre de séances nécessaires : tout dépend de <em>votre</em> profil. C'est pourquoi chez Soléana, chaque parcours laser débute par un <strong>diagnostic personnalisé gratuit</strong>. Laetitia vous explique précisément le programme adapté à votre peau, votre type de poil et vos zones à traiter.</p>
</div>`
  },
  {
    title: 'Drainage lymphatique : à qui s\'adresse-t-il vraiment ?',
    slug: 'drainage-lymphatique-benefices-indications',
    excerpt: 'Souvent méconnu, le drainage lymphatique manuel est bien plus qu\'un soin de confort. Jambes lourdes, œdèmes, récupération post-opératoire, soutien immunitaire : découvrez qui peut en bénéficier et pourquoi ce soin est si précieux.',
    category: 'Drainage',
    tags: ['drainage lymphatique', 'lymphe', 'jambes lourdes', 'oedeme', 'maderotherapie', 'bien-être'],
    read_time: 6,
    published: true,
    published_at: new Date('2026-02-20').toISOString(),
    meta_title: 'Drainage lymphatique : bienfaits et indications – Soléana Venerque',
    meta_description: 'Le drainage lymphatique manuel soulage les jambes lourdes, réduit les œdèmes et booste l\'immunité. Laetitia Sevrin, certifiée Vodder, vous explique tout depuis Venerque (31810).',
    og_image_url: 'https://images.pexels.com/photos/5938596/pexels-photo-5938596.jpeg?auto=compress&cs=tinysrgb&w=1200',
    og_image_alt: 'Drainage lymphatique manuel – Soléana Bien-Être Venerque',
    content: `<div class="summary-box">
  <h4>💧 Ce qu'il faut retenir</h4>
  <ul>
    <li>Le drainage lymphatique agit sur le <strong>système lymphatique</strong>, réseau de drainage naturel du corps</li>
    <li>Il réduit les gonflements, soulage les jambes lourdes et booste l'immunité</li>
    <li>Idéal après une opération, une grossesse, ou en cas d'insuffisance veineuse</li>
    <li>Laetitia est formée à la méthode <strong>Vodder</strong>, référence internationale</li>
  </ul>
</div>

<h2>Comprendre le système lymphatique</h2>

<p>Le système lymphatique est un réseau de vaisseaux qui parcourt tout le corps, parallèlement au système sanguin. Son rôle est essentiel : il transporte la <strong>lymphe</strong>, un liquide qui collecte les déchets cellulaires, les toxines et les cellules immunitaires pour les acheminer vers les ganglions et les éliminer.</p>

<p>Contrairement au sang, la lymphe ne circule pas grâce à une pompe centrale (le cœur). Elle dépend des <strong>contractions musculaires</strong> et de la <strong>pression interstitielle</strong> pour avancer. Quand cette circulation ralentit — stress, sédentarité, chaleur, chirurgie — les liquides s'accumulent dans les tissus et créent des gonflements : c'est l'œdème.</p>

<h2>Les bienfaits du drainage lymphatique manuel</h2>

<h3>Réduction des œdèmes et gonflements</h3>

<p>Le drainage lymphatique manuel utilise des <strong>manœuvres douces et précises</strong> pour stimuler la circulation de la lymphe et résorber les accumulations de liquide. Il est particulièrement efficace pour :</p>
<ul>
  <li>Les jambes et chevilles gonflées</li>
  <li>Les œdèmes post-opératoires (après une liposuccion, une chirurgie esthétique, etc.)</li>
  <li>Les gonflements liés à la grossesse</li>
  <li>Les bras gonflés après une ablation des ganglions (lymphœdème)</li>
</ul>

<h3>Jambes légères et circulation améliorée</h3>

<p>Si vous souffrez de <strong>jambes lourdes</strong>, de sensations de chaleur dans les membres inférieurs ou d'insuffisance veineuse, le drainage lymphatique est un allié précieux. En activant le retour veineux et lymphatique, il soulage immédiatement ces sensations désagréables.</p>

<h3>Soutien immunitaire</h3>

<p>En stimulant la circulation lymphatique, le drainage favorise l'<strong>activation du système immunitaire</strong>. La lymphe transportant les cellules immunitaires vers les ganglions, une meilleure circulation signifie une réponse immunitaire plus efficace. Idéal en période de fatigue ou de convalescence.</p>

<h3>Détoxification et action sur la cellulite</h3>

<p>Le drainage lymphatique est souvent associé à la <strong>maderothérapie</strong> chez Soléana pour une action remodelante et drainante sur la cellulite et les amas graisseux. Cette combinaison est particulièrement populaire pour les soins corps et silhouette.</p>

<div class="info-box">
  💡 <strong>La méthode Vodder</strong> est la technique de drainage lymphatique la plus reconnue au monde, développée par le Dr Emil Vodder dans les années 1930. Elle repose sur des manœuvres spécifiques adaptées à chaque zone du corps et aux différents types d'œdèmes.
</div>

<h2>Qui peut bénéficier du drainage lymphatique ?</h2>

<h3>Les profils les plus concernés</h3>

<ul>
  <li><strong>Femmes enceintes</strong> (dès le 2e trimestre, avec accord médical) : soulagement des jambes lourdes et gonflements</li>
  <li><strong>Post-opératoire</strong> : récupération plus rapide, réduction des ecchymoses et des gonflements</li>
  <li><strong>Insuffisance veineuse</strong> : en complément d'un traitement médical</li>
  <li><strong>Personnes sédentaires</strong> ou en surpoids : activation de la circulation</li>
  <li><strong>Sportifs</strong> : récupération musculaire et réduction des courbatures</li>
  <li><strong>Personnes stressées</strong> : action calmante sur le système nerveux</li>
</ul>

<h3>Les contre-indications à connaître</h3>

<p>Certaines situations contre-indiquent le drainage lymphatique :</p>
<ul>
  <li>Infections aiguës ou inflammation active</li>
  <li>Thrombose veineuse profonde (phlébite)</li>
  <li>Insuffisance cardiaque décompensée</li>
  <li>Certains cancers actifs (selon avis médical)</li>
</ul>

<p>C'est pourquoi Laetitia réalise toujours un <strong>bilan de santé préalable</strong> avant votre première séance.</p>

<h2>Comment se déroule une séance chez Soléana ?</h2>

<p>Une séance de drainage lymphatique dure entre <strong>60 et 90 minutes</strong>. Elle se pratique en position allongée, dans une atmosphère douce et apaisante. Les manœuvres sont lentes, rythmées et progressives — beaucoup de clientes s'endorment.</p>

<p>Laetitia peut combiner le drainage avec la <strong>maderothérapie</strong> (massage aux instruments en bois) pour une action plus intensive sur le modelage du corps et la réduction de la cellulite.</p>

<div class="conclusion">
  <h3>En conclusion</h3>
  <p>Le drainage lymphatique est un soin aux bénéfices bien réels, qu'on soit en bonne santé ou en convalescence. Soulagement immédiat des jambes lourdes, réduction des gonflements, meilleur teint, sentiment de légèreté généralisé : ses effets sont ressentis dès la première séance.</p>
  <p>Formée à la méthode Vodder, Laetitia adapte chaque séance à votre profil de santé et vos objectifs. N'hésitez pas à lui en parler lors de votre consultation.</p>
</div>`
  }
];

async function main() {
  for (const article of articles) {
    const { data, error } = await supabase
      .from('blog_articles')
      .upsert({ ...article, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, { onConflict: 'slug' })
      .select('slug');
    if (error) {
      console.error('Error for', article.slug, ':', error.message);
    } else {
      console.log('✅ Inserted:', article.slug);
    }
  }
}

main();
