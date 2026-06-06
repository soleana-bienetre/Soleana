import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home'; // eager — page LCP critique, toujours la première chargée
import CookieBanner from './components/ui/CookieBanner';
import SeasonalPopups from './components/ui/SeasonalPopups';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { SiteImagesProvider } from './contexts/SiteImagesContext';
import { usePlanityTracker } from './hooks/usePlanityTracker';

// Pages publiques — lazy chargées à la demande
const About = lazy(() => import('./pages/About'));
const EpilationLaser = lazy(() => import('./pages/EpilationLaser'));
const SoinsVisage = lazy(() => import('./pages/SoinsVisage'));
const Kobido = lazy(() => import('./pages/Kobido'));
const Massages = lazy(() => import('./pages/Massages'));
const Drainage = lazy(() => import('./pages/Drainage'));
const SocioEsthetique = lazy(() => import('./pages/SocioEsthetique'));
const Tarifs = lazy(() => import('./pages/Tarifs'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'));
const PolitiqueCookies = lazy(() => import('./pages/PolitiqueCookies'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Pages admin — chunk complètement séparé du bundle public
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminContacts = lazy(() => import('./pages/admin/AdminContacts'));
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const AdminBlogForm = lazy(() => import('./pages/admin/AdminBlogForm'));
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews'));
const AdminReviewForm = lazy(() => import('./pages/admin/AdminReviewForm'));
const AdminTarifs = lazy(() => import('./pages/admin/AdminTarifs'));
const AdminPhotos = lazy(() => import('./pages/admin/AdminPhotos'));
const AdminStats = lazy(() => import('./pages/admin/AdminStats'));

// Fallback minimaliste : réserve la hauteur écran pour éviter tout CLS
const PageFallback = () => <div style={{ minHeight: '100vh' }} aria-hidden />;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AdminRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
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
    </Suspense>
  );
}

function AppLayout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  usePlanityTracker();

  if (isAdmin) return <AdminRoutes />;

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <CookieBanner />
      <SeasonalPopups />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
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
