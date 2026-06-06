import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShopItems, setHasShopItems] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'merchandise'), snapshot => {
      const items = snapshot.docs.map(doc => doc.data());
      setHasShopItems(items.some(item => Number(item.stock) > 0));
    });
    return () => unsubscribe();
  }, []);

  const baseLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'News', path: '/news' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Events', path: '/events' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const links = hasShopItems 
    ? [...baseLinks.slice(0, 6), { name: 'Shop', path: '/shop' }, ...baseLinks.slice(6)]
    : baseLinks;

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md">
      {/* Top Bar - Dark Blue */}
      <div className="bg-primary text-white text-xs hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-10 items-center">
            <div className="flex items-center space-x-6">
              <a href="mailto:church@pceathingati.org" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                <Mail size={14} /> church@pceathingati.org
              </a>

              <span className="flex items-center gap-2">
                <MapPin size={14} /> Ngecha, Kenya
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com/PceaThingati?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                <Facebook size={14} />
              </a>
              <a href="https://www.youtube.com/@pceathingatichurch7316" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                <Youtube size={14} />
              </a>
              <a href="https://www.tiktok.com/@thingati_pulse?_r=1&_t=ZS-96uPh6EBu0j" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <Link to="/give" className="bg-accent hover:bg-accent-light px-4 py-3 uppercase font-bold tracking-wider transition-colors h-full flex items-center">
                Give
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - White */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/en/6/68/Presbyterian_Church_of_East_Africa_logo.jpg" alt="PCEA Logo" className="h-[3.25rem] w-auto bg-white rounded-full p-1" />
                <div className="flex flex-col justify-center">
                  <span className="font-serif font-bold text-xl text-primary leading-tight tracking-tight uppercase">PCEA THING'ATI</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    location.pathname === link.path
                      ? 'text-primary font-bold border-b-2 border-accent'
                      : 'text-gray-700 hover:text-primary font-semibold'
                  } transition-colors uppercase tracking-wider text-[13px] py-8`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button & Give button for mobile */}
            <div className="lg:hidden flex items-center space-x-4">
              <Link to="/give" className="btn-accent px-4 py-2 text-[11px] lg:hidden">
                Give
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary hover:text-primary-dark focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-sm font-semibold border-b border-gray-50 uppercase tracking-widest ${
                    location.pathname === link.path
                      ? 'text-primary border-l-4 border-l-accent pl-2'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
