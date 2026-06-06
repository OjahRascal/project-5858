import { useState, useEffect } from 'react';
import { PlayCircle, FileText, Search, Youtube, Facebook } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';

export default function Sermons() {
  const [searchTerm, setSearchTerm] = useState('');
  const [speakerFilter, setSpeakerFilter] = useState('All');
  const [sermons, setSermons] = useState<any[]>([]);
  const [speakers, setSpeakers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
    },
    {
      id: 'default-2',
      title: 'Living a Life of Purpose',
      speaker: 'Rev. Njau',
      date: 'March 2026',
      series: 'Purpose',
      img: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 'default-3',
      title: 'Faith in the Modern World',
      speaker: 'Guest Speaker',
      date: 'April 2026',
      series: 'Faith',
      img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop',
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
    const q = query(collection(db, 'sermons'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: any[] = [];
      const speakerSet = new Set<string>();
      snapshot.forEach(doc => {
        const data = doc.data();
        results.push({ id: doc.id, ...data });
        if (data.speaker) speakerSet.add(data.speaker);
      });
      setSermons(results);
      setSpeakers(Array.from(speakerSet));
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const filteredSermons = displaySermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeaker = speakerFilter === 'All' || sermon.speaker === speakerFilter;
    return matchesSearch && matchesSpeaker;
  });

  // Calculate local speakers if fallback is used
  const displaySpeakers = speakers.length > 0 ? speakers : [...new Set(DEFAULT_SERMONS.map(s => s.speaker))];

  return (
    <div className="bg-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Podcasts */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-gray-200 pb-8">
          <div>
            <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-2">Message Archive</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark">Latest Sermons</h1>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Connect & Watch</span>
            <div className="flex gap-3">
              <a href="https://www.youtube.com/@pceathingatichurch7316" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 transition-colors text-sm font-bold text-gray-700 hover:text-red-600">
                <Youtube size={18} /> YouTube
              </a>
              <a href="https://www.facebook.com/PceaThingati?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 transition-colors text-sm font-bold text-gray-700 hover:text-blue-600">
                <Facebook size={18} /> Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by title, series, or keyword..." 
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg focus:outline-none focus:ring-2 focus:ring-accent/50 border border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select 
              className="w-full px-4 py-3 rounded-lg bg-bg focus:outline-none focus:ring-2 focus:ring-accent/50 border border-transparent appearance-none"
              value={speakerFilter}
              onChange={(e) => setSpeakerFilter(e.target.value)}
            >
              <option value="All">All Speakers</option>
              {displaySpeakers.map(speaker => (
                 <option key={speaker} value={speaker}>{speaker}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20">
             <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mb-4"></div>
             <div className="text-gray-500 font-serif">Loading sermons...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((sermon) => (
              <div key={sermon.id} className="card-soft group border border-gray-50 flex flex-col h-full">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={sermon.img} 
                    alt={sermon.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2072&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                    {sermon.series}
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle className="text-white w-16 h-16 shadow-2xl rounded-full" />
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex gap-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span>{sermon.date}</span>
                    <span>•</span>
                    <span className="text-accent">{sermon.speaker}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary-dark mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {sermon.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex gap-4">
                    <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent transition-colors">
                      <PlayCircle size={18} /> Video
                    </a>
                    {sermon.notesUrl && (
                      <a href={sermon.notesUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent transition-colors">
                        <FileText size={18} /> Notes
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredSermons.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif text-gray-500 mb-2">No sermons found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <a href="https://www.youtube.com/@pceathingatichurch7316" target="_blank" rel="noopener noreferrer" className="btn-outline inline-block">Load More Sermons on YouTube</a>
        </div>

      </div>
    </div>
  );
}

