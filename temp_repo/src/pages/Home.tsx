import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, PlayCircle, Heart, Baby, Users, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, onSnapshot, doc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BIBLE_VERSES } from '../data/verses';

export default function Home() {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [notices, setNotices] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [sermons, setSermons] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [homeIntro, setHomeIntro] = useState("Welcome to PCEA Thing'ati! Join us this Sunday for our uplifting service.");

  useEffect(() => {
    // Sync notices from firebase
    const qNotices = query(collection(db, 'notices'), orderBy('createdAt', 'desc'), limit(3));
    const unsubscribeNotices = onSnapshot(qNotices, snapshot => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qNews = query(collection(db, 'news'), orderBy('date', 'desc'), limit(3));
    const unsubscribeNews = onSnapshot(qNews, snapshot => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeNotices();
      unsubscribeNews();
    };
  }, []);

  // Fallback sermons if the database is empty
  const DEFAULT_SERMONS = [
    {
      id: 'default-1',
      title: 'Church Anniversary Celebration',
      speaker: 'Rev. Njau',
      date: 'April 2025',
      series: 'Anniversary',
      img: 'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1974&auto=format&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];

  const [youtubeSermons, setYoutubeSermons] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCgtnFxPhc2Z92ZFTTqjrFLQ')
      .then(res => res.json())
      .then(data => {
        if (data && data.items) {
          const uniqueTitles = new Set();
          const ytSermons = data.items
            .filter((item: any) => {
              const baseTitle = item.title.trim().toLowerCase();
              if (uniqueTitles.has(baseTitle)) return false;
              uniqueTitles.add(baseTitle);
              return true;
            })
            .map((item: any) => ({
              id: item.guid,
              title: item.title,
              speaker: 'PCEA Thing\'ati',
              date: new Date(item.pubDate.replace(' ', 'T')).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              series: 'Sunday Service',
              img: item.thumbnail,
              videoUrl: item.link
            }));
          setYoutubeSermons(ytSermons);
        }
      })
      .catch(console.error);
  }, []);

  const displaySermons = sermons.length > 0 ? sermons : (youtubeSermons.length > 0 ? youtubeSermons : DEFAULT_SERMONS);

  useEffect(() => {
    const timer = setInterval(() => {
      // Verse is static for the week, calculating based on week chunks since 1970 Monday.
      const EPOCH_MONDAY = new Date('1970-01-05T00:00:00Z').getTime();
      const millisPerWeek = 7 * 24 * 60 * 60 * 1000;
      const weekNumber = Math.floor((Date.now() - EPOCH_MONDAY) / millisPerWeek);
      setCurrentVerseIndex(weekNumber % BIBLE_VERSES.length);
    }, 60000); // Re-check every minute

    // Set initial verse
    const EPOCH_MONDAY = new Date('1970-01-05T00:00:00Z').getTime();
    const millisPerWeek = 7 * 24 * 60 * 60 * 1000;
    const weekNumber = Math.floor((Date.now() - EPOCH_MONDAY) / millisPerWeek);
    setCurrentVerseIndex(weekNumber % BIBLE_VERSES.length);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch latest 1 sermon
    const qSermons = query(collection(db, 'sermons'), orderBy('createdAt', 'desc'), limit(1));
    const unsubscribeSermons = onSnapshot(qSermons, snapshot => {
      setSermons(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch upcoming 5 events from today onwards
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    
    const qEvents = query(
      collection(db, 'events'), 
      where('date', '>=', todayStr),
      orderBy('date', 'asc'), 
      limit(5)
    );
    const unsubscribeEvents = onSnapshot(qEvents, snapshot => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeSermons();
      unsubscribeEvents();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary-dark">
          <img
            src="https://i.postimg.cc/SNCP7qbZ/Whats-App-Image-2026-05-30-at-00-55-45.jpg"
            alt="Congregation worshipping"
            className="w-full h-full object-cover object-top lg:object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/70 to-transparent pointer-events-none"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <span className="text-accent-light px-3 py-1 bg-white/10 uppercase tracking-[0.2em] font-semibold text-xs border-l-4 border-accent-light mb-6 inline-block">
            Welcome to
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6 max-w-3xl">
            PCEA Thing'ati Church
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-light italic border-l-2 border-gray-500 pl-4">
            Where Faith Takes Root And Love Bears Fruit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.facebook.com/PceaThingati?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent text-base"
            >
              <PlayCircle className="mr-2" size={20} /> Watch Live
            </a>
            <Link
              to="/contact"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-dark text-base"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Bar - Structured block */}
      <div className="bg-primary border-y-4 border-accent relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 py-6">
            <div className="flex items-center gap-4 py-4 md:py-0 md:pr-8">
              <div className="shrink-0">
                <Clock className="text-accent" size={32} />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-1">Sunday Services</h3>
                <p className="text-gray-300 text-sm">10:30 AM Main Service & Sunday School</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 py-4 md:py-0 md:px-8">
              <div className="shrink-0">
                <MapPin className="text-accent" size={32} />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-1">Location</h3>
                <p className="text-gray-300 text-sm mb-1">78-00218, Ngecha</p>
                <a href="https://maps.app.goo.gl/ittYuezz5YGJMsYd6" target="_blank" rel="noopener noreferrer" className="text-accent-light text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
                  Get Directions &rarr;
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 py-4 md:py-0 lg:px-8 hidden lg:flex">
              <div className="shrink-0">
                <Calendar className="text-accent" size={32} />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-1">Upcoming</h3>
                <p className="text-gray-300 text-sm mb-1">Join our next fellowship</p>
                <Link to="/events" className="text-accent-light text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
                  View Calendar &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme of the Year Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-4">
            Theme of the Year
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-primary-dark mb-6 leading-tight whitespace-pre-wrap">
            "I am doing a new thing"
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
            "\"Forget the former things; do not dwell on the past. See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.\" — Isaiah 43:18-19"
          </p>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-1">
                Calendar
              </h2>
              <h3 className="text-3xl font-serif font-bold text-primary-dark">
                Upcoming Events
              </h3>
            </div>
            <Link
              to="/events"
              className="hidden sm:block text-sm font-bold text-primary hover:text-accent uppercase tracking-wider"
            >
              Full Calendar &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {events.length > 0 ? (
              events.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex bg-white rounded-2xl p-4 border border-gray-100 hover:border-accent/30 transition-colors group shadow-sm"
                >
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] shadow-sm border border-gray-100">
                    <span className="text-xs font-bold text-accent uppercase mb-1">
                      {event.date ? new Date(event.date).toLocaleDateString("en-US", { month: "short" }) : "TBA"}
                    </span>
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white text-xl font-bold font-serif leading-none shadow-sm">
                      {event.date ? new Date(event.date).getDate() : "—"}
                    </span>
                  </div>
                  <div className="ml-6 flex flex-col justify-center">
                    <h4 className="text-lg font-bold font-serif text-primary-dark group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {event.time}
                      </span>
                      <span className="hidden sm:flex items-center gap-1 leading-tight">
                        <MapPin className="flex-shrink-0" size={14} /> <span className="line-clamp-1">{event.location}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 flex justify-center p-8 bg-white rounded-2xl border border-gray-100">No upcoming events.</div>
            )}
          </div>
          <Link
            to="/events"
            className="btn-outline w-full mt-6 sm:hidden text-center justify-center bg-white"
          >
            View Full Calendar
          </Link>
        </div>
      </section>

      {/* Verse of the Week */}
      <section className="py-24 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary transform translate-x-3 translate-y-3"></div>
            <div className="bg-white p-10 border border-gray-200 relative shadow-sm">
              <Heart className="text-accent/10 w-24 h-24 absolute top-4 right-4" />
              <h4 className="text-sm font-bold text-accent tracking-widest uppercase mb-6 border-b-2 border-primary inline-block pb-1">
                Verse of the Week
              </h4>
              <div className="min-h-[12rem] flex flex-col justify-center relative z-10 transition-all duration-300">
                <p className="text-2xl font-serif italic text-primary-dark mb-4 transition-opacity duration-500 leading-relaxed max-w-[90%]">
                  "{BIBLE_VERSES[currentVerseIndex].text}"
                </p>
                <p className="font-bold text-accent tracking-wider uppercase text-sm mt-auto md:mt-4">
                  — {BIBLE_VERSES[currentVerseIndex].ref}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notices & Announcements */}
      {notices.length > 0 && (
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-2 text-center">
              Church Updates
            </h2>
            <h3 className="text-3xl font-serif font-bold text-primary-dark mb-10 text-center">
              Notices & Announcements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="card-soft border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg text-primary-dark line-clamp-2 leading-tight">{notice.title}</h4>
                    <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded whitespace-nowrap ml-2">{notice.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed whitespace-pre-wrap">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {news.length > 0 && (
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-2 text-center">
              Community
            </h2>
            <h3 className="text-3xl font-serif font-bold text-primary-dark mb-10 text-center">
              Latest News
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.slice(0, 3).filter((item: any) => !item.isEvent || item.date >= new Date().toISOString().split('T')[0]).map((item: any) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                  <div className="p-6 border-b bg-primary-50">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm">
                        {item.category || 'News'}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 leading-tight mb-2">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {item.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed whitespace-pre-wrap">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/news" className="btn-outline">
                Read All News
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Sermon */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-1">
                  Latest Message
                </h2>
                <h3 className="text-3xl font-serif font-bold text-primary-dark">
                  Gospel Truths
                </h3>
              </div>
              <Link
                to="/sermons"
                className="hidden sm:block text-sm font-bold text-primary hover:text-accent uppercase tracking-wider"
              >
                View All &rarr;
              </Link>
            </div>

            <div className="card-soft group cursor-pointer border border-gray-50 flex flex-col justify-between h-full min-h-[460px]">
              {displaySermons.length > 0 ? (
                <>
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={displaySermons[0].img || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2072&auto=format&fit=crop"}
                      alt="Sermon thumbnail"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // prevent infinite loop
                        target.src = "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2072&auto=format&fit=crop";
                      }}
                    />
                    <a href={displaySermons[0].videoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                        <PlayCircle className="text-white w-12 h-12" />
                      </div>
                    </a>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      <span>{displaySermons[0].date}</span>
                      <span>•</span>
                      <span>{displaySermons[0].series}</span>
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-primary-dark mb-3">
                      {displaySermons[0].title}
                    </h4>
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      Speaker: {displaySermons[0].speaker}
                    </p>
                    <div className="mt-auto">
                      <a href={displaySermons[0].videoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto inline-block text-center">
                        View Sermon
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full p-8 text-gray-500">
                  No sermons available.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Newsletter */}
      <section className="bg-primary py-20 relative overflow-hidden hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="church-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 40V0H40V40H0ZM20 20L0 0M40 0L20 20M20 20V40"
                  stroke="currentColor"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#church-pattern)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Stay Connected
          </h3>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto font-light text-gray-300">
            Subscribe to our weekly newsletter for updates, sermon recaps, and
            upcoming events at PCEA Thing'ati.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-4 rounded-full flex-grow focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 text-white placeholder-gray-400 border border-white/20"
              required
            />
            <button type="submit" className="btn-accent py-4 px-8 shadow-lg">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Ministries Marquee */}
      <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-sm font-bold text-accent tracking-widest uppercase">
            Our Ministries
          </h2>
        </div>
        <div className="relative w-full overflow-hidden flex">
          <style>{`
            @keyframes marquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .animate-marquee {
              animation: marquee 35s linear infinite;
              display: flex;
              width: max-content;
              will-change: transform;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="animate-marquee gap-6 pl-6">
            {[
              { name: "Church School", imgUrl: "https://i.postimg.cc/NsYxyGd8/Whats-App-Image-2026-05-04-at-17-21-32.jpg", desc: "A fun, safe environment where kids learn about Jesus at their level." },
              { name: "Youth Fellowship", imgUrl: "https://i.postimg.cc/nn42nQkh/Whats-App-Image-2026-05-04-at-17-28-49.jpg", desc: "Empowering teens to navigate life's challenges grounded in faith." },
              { name: "Woman's Guild", imgUrl: "https://i.postimg.cc/Z41sbmhz/p-c-e-a-womans-guild-logo-png-seeklogo-532028.png", desc: "A fellowship of women dedicated to serving the church, community, and growing in Christ." },
              { name: "PCMF", imgUrl: "https://i.postimg.cc/wHXSb7K9/the-presbyterian-church-men-fellowship-logo-png-seeklogo-522978.png", desc: "Empowering men to lead in faith and serve the community." },
              { name: "Church School", imgUrl: "https://i.postimg.cc/NsYxyGd8/Whats-App-Image-2026-05-04-at-17-21-32.jpg", desc: "A fun, safe environment where kids learn about Jesus at their level." },
              { name: "Youth Fellowship", imgUrl: "https://i.postimg.cc/nn42nQkh/Whats-App-Image-2026-05-04-at-17-28-49.jpg", desc: "Empowering teens to navigate life's challenges grounded in faith." },
              { name: "Woman's Guild", imgUrl: "https://i.postimg.cc/Z41sbmhz/p-c-e-a-womans-guild-logo-png-seeklogo-532028.png", desc: "A fellowship of women dedicated to serving the church, community, and growing in Christ." },
              { name: "PCMF", imgUrl: "https://i.postimg.cc/wHXSb7K9/the-presbyterian-church-men-fellowship-logo-png-seeklogo-522978.png", desc: "Empowering men to lead in faith and serve the community." },
              { name: "Church School", imgUrl: "https://i.postimg.cc/NsYxyGd8/Whats-App-Image-2026-05-04-at-17-21-32.jpg", desc: "A fun, safe environment where kids learn about Jesus at their level." },
              { name: "Youth Fellowship", imgUrl: "https://i.postimg.cc/nn42nQkh/Whats-App-Image-2026-05-04-at-17-28-49.jpg", desc: "Empowering teens to navigate life's challenges grounded in faith." },
              { name: "Woman's Guild", imgUrl: "https://i.postimg.cc/Z41sbmhz/p-c-e-a-womans-guild-logo-png-seeklogo-532028.png", desc: "A fellowship of women dedicated to serving the church, community, and growing in Christ." },
              { name: "PCMF", imgUrl: "https://i.postimg.cc/wHXSb7K9/the-presbyterian-church-men-fellowship-logo-png-seeklogo-522978.png", desc: "Empowering men to lead in faith and serve the community." },
            ].map((ministry, i) => {
              return (
                <div 
                  key={i} 
                  className="flex-shrink-0 flex items-center gap-4 px-5 py-4 bg-bg rounded-xl border border-gray-100 shadow-sm w-[280px] sm:w-[320px] text-left transform-gpu"
                >
                  <div className="bg-primary/5 p-2 rounded-xl flex-shrink-0 flex items-center justify-center w-12 h-12">
                    <img src={ministry.imgUrl} alt={ministry.name} className="w-8 h-8 object-cover rounded" />
                  </div>
                  <div>
                    <h3 className="text-primary-dark font-bold text-base mb-1">{ministry.name}</h3>
                    <p className="text-xs text-gray-500 whitespace-normal line-clamp-2 leading-relaxed">{ministry.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-dark mb-10 tracking-widest">
            Connect With Us
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 w-full max-w-4xl mx-auto">
            {/* TikTok Page */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden text-left flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/6/68/Presbyterian_Church_of_East_Africa_logo.jpg" 
                  alt="PCEA Logo" 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900 leading-tight">PCEA Thing'ati</h4>
                  <p className="text-xs text-gray-500">Official TikTok</p>
                </div>
                <div className="ml-auto text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path></svg>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap flex-grow">
                  Join us on TikTok for uplifting messages, youth fellowship highlights, and joyful moments. Follow along to stay inspired!
                </p>
                <div className="mt-auto">
                  <a 
                    href="https://www.tiktok.com/@thingati_pulse?_r=1&_t=ZS-96uPh6EBu0j" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-gray-700 transition-colors"
                  >
                    Watch on TikTok &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Facebook Page */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden text-left flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/6/68/Presbyterian_Church_of_East_Africa_logo.jpg" 
                  alt="PCEA Logo" 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900 leading-tight">PCEA Thing'ati</h4>
                  <p className="text-xs text-gray-500">Recent Update</p>
                </div>
                <div className="ml-auto text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap flex-grow">
                  {homeIntro}
                </p>
                <div className="mt-auto">
                  <a 
                    href="https://www.facebook.com/PceaThingati?mibextid=ZbWKwL" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View on Facebook &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
