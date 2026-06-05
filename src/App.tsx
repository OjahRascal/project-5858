import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Page Imports
import Home from '@/pages/Home';
import About from '@/pages/About';
import News from '@/pages/News';
import Sermons from '@/pages/Sermons';
import Events from '@/pages/Events';
import Give from '@/pages/Give';
import Contact from '@/pages/Contact';
import Ministries from '@/pages/Ministries';
import WatchLive from '@/pages/WatchLive';
import Gallery from '@/pages/Gallery';
import Shop from '@/pages/Shop';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import AdminDashboard from '@/pages/AdminDashboard';
import { Settings } from 'lucide-react'; // Placeholder for AdminLayout if needed

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 lg:pt-[120px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/give" element={<Give />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/watch" element={<WatchLive />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/58" element={<AdminDashboard />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
