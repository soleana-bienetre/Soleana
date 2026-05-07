import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import EpilationLaser from './pages/EpilationLaser';
import SoinsVisage from './pages/SoinsVisage';
import Kobido from './pages/Kobido';
import Massages from './pages/Massages';
import Drainage from './pages/Drainage';
import SocioEsthetique from './pages/SocioEsthetique';
import Tarifs from './pages/Tarifs';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import MentionsLegales from './pages/MentionsLegales';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import PolitiqueCookies from './pages/PolitiqueCookies';
import CookieBanner from './components/ui/CookieBanner';
import SeasonalPopups from './components/ui/SeasonalPopups';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContacts from './pages/admin/AdminContacts';
import AdminBlog from './pages/admin/AdminBlog';
import AdminBlogForm from './pages/admin/AdminBlogForm';
import AdminReviews from './pages/admin/AdminReviews';
import AdminReviewForm from './pages/admin/AdminReviewForm';
import AdminTarifs from './pages/admin/AdminTarifs';
import AdminPhotos from './pages/admin/AdminPhotos';
import AdminStats from './pages/admin/AdminStats';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { SiteImagesProvider } from './contexts/SiteImagesContext';
import { usePlanityTracker } from './hooks/usePlanityTracker';

function SchemaOrg() {
  useEffect(() => {
    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'BeautySalon', 'HealthAndBeautyBusiness'],
        name: 'Soléana Bien-Être',
        description: "Institut de bien-être et d'esthétique à Venerque (31810). Épilation laser, soins du visage, Kobido, massages bien-être, drainage lymphatique et maderothérapie.",
        url: 'https://www.soleana-bienetre.com',
        telephone: '+33762169814',
        priceRange: '€€',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1 Rue de la Fraternité',
          addressLocality: 'Venerque',
          postalCode: '31810',
          addressRegion: 'Occitanie',
          addressCountry: 'FR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '43.3539',
          longitude: '1.4511',
        },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '09:00', closes: '18:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '09:00', closes: '11:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '09:00', closes: '20:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '18:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:30' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '10',
          bestRating: '5',
        },
        hasMap: 'https://maps.google.com/?q=1+Rue+de+la+Fraternite+31810+Venerque',
        areaServed: ['Venerque', 'Vernet', 'Auterive', 'Labarthe-sur-Lèze', 'Eaunes', 'Pins-Justaret', 'Miremont', 'Toulouse Sud'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Laetitia Sevrin',
        jobTitle: 'Praticienne bien-être et esthéticienne',
        worksFor: { '@type': 'LocalBusiness', name: 'Soléana Bien-Être' },
        description: "Praticienne expérimentée, ancienne infirmière et aide-soignante, titulaire du BP et CAP esthétique, certifiée en drainage lymphatique Vodder, massage TEMANA et épilation laser AESTAM Paris.",
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Venerque',
          postalCode: '31810',
          addressCountry: 'FR',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Soléana Bien-Être',
        url: 'https://www.soleana-bienetre.com',
        description: "Institut de bien-être et d'esthétique à Venerque – Épilation laser, soins visage, Kobido, massages, drainage lymphatique.",
      },
    ];

    const existing = document.getElementById('schema-org-global');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'schema-org-global';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('schema-org-global');
      if (el) el.remove();
    };
  }, []);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />
      <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
      <Route path="/admin/blog/:id" element={<ProtectedRoute><AdminBlogForm /></ProtectedRoute>} />
      <Route path="/admin/avis" element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />
      <Route path="/admin/avis/:id" element={<ProtectedRoute><AdminReviewForm /></ProtectedRoute>} />
      <Route path="/admin/tarifs" element={<ProtectedRoute><AdminTarifs /></ProtectedRoute>} />
      <Route path="/admin/photos" element={<ProtectedRoute><AdminPhotos /></ProtectedRoute>} />
      <Route path="/admin/statistiques" element={<ProtectedRoute><AdminStats /></ProtectedRoute>} />
    </Routes>
  );
}

function AppLayout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  usePlanityTracker();

  if (isAdmin) return <AdminRoutes />;

  return (
    <div className="flex flex-col min-h-screen">
      <SchemaOrg />
      <ScrollToTop />
      <Header />
      <CookieBanner />
      <SeasonalPopups />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/epilation-laser" element={<EpilationLaser />} />
          <Route path="/soins-visage" element={<SoinsVisage />} />
          <Route path="/kobido" element={<Kobido />} />
          <Route path="/massages" element={<Massages />} />
          <Route path="/drainage-lymphatique" element={<Drainage />} />
          <Route path="/socio-esthetique" element={<SocioEsthetique />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/politique-cookies" element={<PolitiqueCookies />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteImagesProvider>
        <AppLayout />
      </SiteImagesProvider>
    </BrowserRouter>
  );
}
