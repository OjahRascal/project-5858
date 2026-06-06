import React, { useState, useEffect } from 'react';
import { Calendar, Users, Target, Activity, FileText, Clock, MapPin } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type NewsData = {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  time?: string;
  location?: string;
  isEvent?: boolean;
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'District Meetings':
      return <Users className="text-blue-600" size={24} />;
    case 'Church Activities':
      return <Activity className="text-red-600" size={24} />;
    case 'Missions':
      return <Target className="text-green-600" size={24} />;
    default:
      return <FileText className="text-purple-600" size={24} />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'District Meetings':
      return 'bg-blue-50 border-blue-100';
    case 'Church Activities':
      return 'bg-red-50 border-red-100';
    case 'Missions':
      return 'bg-green-50 border-green-100';
    default:
      return 'bg-purple-50 border-purple-100';
  }
};

export default function News() {
  const [news, setNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const today = new Date().toISOString().split('T')[0];
      let items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsData));
      items = items.filter(item => !item.isEvent || item.date >= today);
      setNews(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4 md:px-8 shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">News & Announcements</h1>
          <p className="text-lg md:text-xl text-primary-light max-w-2xl mx-auto">
            Stay updated with the latest happenings, district meetings, church activities, missions, and more at PCEA Thing'ati.
          </p>
        </div>
      </section>

      {/* News List */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 font-medium">Loading news...</p>
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div 
                key={item.id} 
                className={`flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 transform hover:-translate-y-1`}
              >
                <div className={`p-6 border-b ${getCategoryColor(item.category)}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center flex-wrap text-sm font-medium text-slate-600 gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    {item.time && (
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date('1970-01-01T' + item.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {item.location}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-slate-600 whitespace-pre-wrap leading-relaxed opacity-90 text-sm">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-2xl border border-gray-200 shadow-sm">
            <FileText className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No News Found</h3>
            <p className="text-slate-500">Check back later for updates on church life and activities.</p>
          </div>
        )}
      </section>
    </div>
  );
}
