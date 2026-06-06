import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 text-white mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/en/6/68/Presbyterian_Church_of_East_Africa_logo.jpg" alt="PCEA Logo" className="h-12 w-auto bg-white rounded-md p-1" />
              <span className="font-serif font-bold text-lg tracking-wide">PCEA THING'ATI</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
              "Tigai kũririkana maũndũ ma tene. Atĩrĩrĩ, nĩngwĩka ũndũ mwerũ! Rĩu nĩũroneka; githĩ mũtingĩũmenya? Ningĩ nĩngũthondeka njĩra werũ-inĩ, gũthondeke tũrũĩ ũthikũ-inĩ."<br />
              <span className="font-bold text-accent-light">— Isaya 43:18-19</span>
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/PceaThingati?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.youtube.com/@pceathingatichurch7316" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://www.tiktok.com/@thingati_pulse?_r=1&_t=ZS-96uPh6EBu0j" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-accent-light transition-colors text-sm">About Us</Link></li>
              <li><Link to="/sermons" className="text-gray-300 hover:text-accent-light transition-colors text-sm">Sermons</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-accent-light transition-colors text-sm">Events Calendar</Link></li>
              <li><Link to="/ministries" className="text-gray-300 hover:text-accent-light transition-colors text-sm">Our Ministries</Link></li>
              <li><Link to="/give" className="text-gray-300 hover:text-accent-light transition-colors text-sm">Give / Tithe</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 tracking-wide">Service Times</h4>
            <ul className="space-y-3">
              <li className="text-gray-300 text-sm flex justify-between border-b border-gray-700 pb-2">
                <span>Sunday Service</span>
                <span className="font-bold text-white">10:30 AM</span>
              </li>
              <li className="text-gray-300 text-sm flex justify-between border-b border-gray-700 pb-2">
                <span>Sunday School</span>
                <span className="font-bold text-white">10:30 AM</span>
              </li>
            </ul>
            <a href="https://www.facebook.com/PceaThingati?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-accent-light hover:text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-circle"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              Watch Live
            </a>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent mt-0.5 shrink-0" size={18} />
                <span className="text-gray-300 text-sm leading-relaxed">PCEA Thing'ati<br/>Address 78-00218<br/>Ngecha, Kenya<br/>
                  <a href="https://maps.app.goo.gl/ittYuezz5YGJMsYd6" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white mt-1 inline-block">
                    Open in Maps
                  </a>
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={18} />
                <a href="mailto:church@pceathingati.org" className="text-gray-300 hover:text-white text-sm transition-colors">church@pceathingati.org</a>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} PCEA Thing'ati. All rights reserved.
            </p>
            <a href="https://cms.pceathingati.org/login" target="_blank" rel="noopener noreferrer" className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-500/30 hover:bg-gray-500/60 transition-colors" aria-label="System Login"></a>
          </div>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
