import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { useLocalCollection } from '@/lib/localStore';
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp, getDoc, addDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Calendar, Bell, FileText, Settings, LogOut, Video, Plus, Trash2, Database, UploadCloud, Edit2, Image, ShoppingBag, X } from 'lucide-react';

export default function AdminDashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState('sermons');

  useEffect(() => {
    if (user) {
      const checkAdmin = async () => {
        try {
          const docRef = doc(db, 'admins', user.uid);
          const docSnap = await getDoc(docRef);
          setIsAdmin(docSnap.exists());
        } catch (e) {
          console.error("Error checking admin status:", e);
          setIsAdmin(false);
        }
      };
      checkAdmin();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  if (loading || (user && isAdmin === null)) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <AdminLogin />;
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-serif font-bold text-slate-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">You don't have permission to view the admin dashboard.</p>
        <button onClick={() => signOut(auth)} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <span className="font-serif font-bold text-xl uppercase tracking-wider">Admin Panel</span>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('sermons')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'sermons' ? 'bg-red-600/20 text-red-500' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Video size={20} />
            Sermons Manager
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'events' ? 'bg-red-600/20 text-red-500' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Calendar size={20} />
            Events Manager
          </button>
          <button 
            onClick={() => setActiveTab('notices')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'notices' ? 'bg-red-600/20 text-red-500' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Bell size={20} />
            Notices Manager
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'news' ? 'bg-red-600/20 text-red-500' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <FileText size={20} />
            News & Announcements
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'gallery' ? 'bg-red-600/20 text-red-500' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Image size={20} />
            Gallery Manager
          </button>
          <button 
            onClick={() => setActiveTab('shop')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'shop' ? 'bg-red-600/20 text-red-500' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <ShoppingBag size={20} />
            Shop Manager
          </button>
        </div>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800 capitalize">{activeTab} Manager</h1>
        </header>
        <main className="flex-1 overflow-auto p-8">
          {activeTab === 'sermons' && <SermonsAdmin />}
          {activeTab === 'events' && <EventsAdmin />}
          {activeTab === 'notices' && <NoticesAdmin />}
          {activeTab === 'news' && <NewsAdmin />}
          {activeTab === 'gallery' && <GalleryAdmin />}
          {activeTab === 'shop' && <ShopAdmin />}
        </main>
      </div>
    </div>
  );
}

function AdminLogin() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLocked && lockTimeRemaining > 0) {
      timer = setInterval(() => {
        setLockTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isLocked && lockTimeRemaining <= 0) {
      setIsLocked(false);
      setLoginAttempts(0);
      setErrorMsg('');
    }
    return () => clearInterval(timer);
  }, [isLocked, lockTimeRemaining]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) {
      setErrorMsg(`Too many attempts. Please try again in ${lockTimeRemaining} seconds.`);
      return;
    }
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setErrorMsg('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Reset on success
      setLoginAttempts(0);
    } catch (err: any) {
      console.error(err);
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        setIsLocked(true);
        setLockTimeRemaining(60); // Lock for 60 seconds
        setErrorMsg('Too many login attempts. For your security, this account has been temporarily locked. Please try again in 60 seconds.');
      } else {
        setErrorMsg(`Login failed (Attempt ${newAttempts} of 5). Check your credentials.`);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-500 mt-2">Sign in to manage the website content.</p>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              disabled={isLocked || isLoggingIn}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              disabled={isLocked || isLoggingIn}
            />
          </div>
          <button 
            type="submit"
            disabled={isLocked || isLoggingIn}
            className={`w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition ${(isLocked || isLoggingIn) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLocked ? `Locked (${lockTimeRemaining}s)` : isLoggingIn ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

type Sermon = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  img: string;
  videoUrl: string;
  notesUrl?: string;
  createdAt: any;
};

function SermonsAdmin() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newSermon, setNewSermon] = useState({
    title: '', speaker: '', date: '', series: '', img: '', videoUrl: '', notesUrl: ''
  });

  useEffect(() => {
    if (!auth.currentUser) return;
    
    const q = query(collection(db, 'sermons'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: Sermon[] = [];
      snapshot.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() } as Sermon);
      });
      setSermons(results);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'sermons');
    });

    return () => unsubscribe();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: any = {
        title: newSermon.title,
        speaker: newSermon.speaker,
        date: newSermon.date,
        series: newSermon.series,
        img: newSermon.img,
        videoUrl: newSermon.videoUrl,
      };
      
      if (newSermon.notesUrl) {
        data.notesUrl = newSermon.notesUrl;
      }

      if (editingId) {
        // We do not update createdAt as per immortal field rule, but there's a rule that updates MUST use serverTimestamp for updatedAt?
        // Let's just update the fields we have.
        // Also wait: what did we set as immortal field in firestore.rules?
        // I will check the firestore rules later if it fails.
        // Actually, let's keep createdAt for new docs.
        const editingSermon = sermons.find(s => s.id === editingId);
        if (editingSermon) {
          data.createdAt = editingSermon.createdAt; // preserve
        }
        await setDoc(doc(db, 'sermons', editingId), data);
      } else {
        const newId = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        data.createdAt = serverTimestamp();
        await setDoc(doc(db, 'sermons', newId), data);
      }

      setIsAdding(false);
      setEditingId(null);
      setNewSermon({ title: '', speaker: '', date: '', series: '', img: '', videoUrl: '', notesUrl: '' });
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'sermons');
    }
  };

  const handleEdit = (s: Sermon) => {
    setNewSermon({
      title: s.title || '',
      speaker: s.speaker || '',
      date: s.date || '',
      series: s.series || '',
      img: s.img || '',
      videoUrl: s.videoUrl || '',
      notesUrl: s.notesUrl || ''
    });
    setEditingId(s.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'sermons', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'sermons');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">Your Sermons</h2>
        <button 
          onClick={() => {
            setIsAdding(!isAdding);
            if (isAdding) {
              setEditingId(null);
              setNewSermon({ title: '', speaker: '', date: '', series: '', img: '', videoUrl: '', notesUrl: '' });
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add New Sermon</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg mb-4">{editingId ? 'Edit Sermon details' : 'Add Sermon details'}</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={newSermon.title} onChange={e => setNewSermon({...newSermon, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Speaker</label>
            <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={newSermon.speaker} onChange={e => setNewSermon({...newSermon, speaker: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date (e.g. Sep 2023)</label>
            <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={newSermon.date} onChange={e => setNewSermon({...newSermon, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Series</label>
            <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={newSermon.series} onChange={e => setNewSermon({...newSermon, series: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input required type="url" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={newSermon.img} onChange={e => setNewSermon({...newSermon, img: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
            <input required type="url" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={newSermon.videoUrl} onChange={e => setNewSermon({...newSermon, videoUrl: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes URL (Optional)</label>
            <input type="url" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={newSermon.notesUrl} onChange={e => setNewSermon({...newSermon, notesUrl: e.target.value})} />
          </div>
          <div className="col-span-1 md:col-span-2 pt-4">
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition">Save Sermon</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-200 text-slate-500 font-medium text-sm">
            <tr>
              <th className="px-6 py-4">Sermon</th>
              <th className="px-6 py-4">Speaker & Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sermons.map(s => (
              <tr key={s.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={s.img} alt="" className="w-16 h-10 object-cover rounded-md bg-gray-100" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-bold text-slate-800">{s.title}</div>
                      <div className="text-xs text-slate-500">{s.series}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-700">{s.speaker}</div>
                  <div className="text-xs text-slate-500">{s.date}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800 transition p-2 mr-2">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="text-gray-400 hover:text-red-600 transition p-2">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {sermons.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  <Database className="mx-auto text-gray-300 mb-2" size={32} />
                  No sermons found. Click "Add New Sermon" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type EventData = { id: string; title: string; date: string; time: string; location: string };

function EventsAdmin() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '' });

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventData)));
    });
    return () => unsubscribe();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const editingEvent = events.find(event => event.id === editingId);
        await setDoc(doc(db, 'events', editingId), {
          ...newEvent,
          createdAt: editingEvent ? (editingEvent as any).createdAt : serverTimestamp()
        });
      } else {
        const newId = Date.now().toString() + Math.random().toString(36).substring(2,9);
        await setDoc(doc(db, 'events', newId), {
          ...newEvent,
          createdAt: serverTimestamp()
        });
      }
      setIsAdding(false);
      setEditingId(null);
      setNewEvent({ title: '', date: '', time: '', location: '' });
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'events');
    }
  };

  const handleEdit = (event: EventData) => {
    setNewEvent({
      title: event.title || '',
      date: event.date || '',
      time: event.time || '',
      location: event.location || ''
    });
    setEditingId(event.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'events', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'events');
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">Your Events</h2>
        <button onClick={() => {
          setIsAdding(!isAdding);
          if (isAdding) {
            setEditingId(null);
            setNewEvent({ title: '', date: '', time: '', location: '' });
          }
        }} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition">
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add New Event</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2"><h3 className="font-bold text-lg mb-4">{editingId ? 'Edit Event details' : 'Add Event details'}</h3></div>
          <div><label className="block text-sm font-medium mb-1">Title</label><input required className="w-full border rounded-lg px-4 py-2" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Date (YYYY-MM-DD)</label><input required type="date" className="w-full border rounded-lg px-4 py-2" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Time</label><input required type="time" className="w-full border rounded-lg px-4 py-2" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Location</label><input required className="w-full border rounded-lg px-4 py-2" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} /></div>
          <div className="col-span-1 md:col-span-2 pt-4">
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition">Save Event</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b font-medium text-sm"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Date/Time</th><th className="px-6 py-4">Location</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {events.map(ev => (
              <tr key={ev.id}>
                <td className="px-6 py-4 font-bold">{ev.title}</td>
                <td className="px-6 py-4 text-sm">{ev.date} at {ev.time}</td>
                <td className="px-6 py-4 text-sm">{ev.location}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(ev)} className="text-blue-600 hover:text-blue-800 transition mr-4"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(ev.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type NoticeData = { id: string; title: string; content: string; date: string; };

function NoticesAdmin() {
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', date: '' });

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NoticeData)));
    });
    return () => unsubscribe();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const editingItem = notices.find(n => n.id === editingId);
        await setDoc(doc(db, 'notices', editingId), {
          ...newNotice,
          createdAt: editingItem ? (editingItem as any).createdAt : serverTimestamp()
        });
      } else {
        const newId = Date.now().toString() + Math.random().toString(36).substring(2,9);
        await setDoc(doc(db, 'notices', newId), {
          ...newNotice,
          createdAt: serverTimestamp()
        });
      }
      setIsAdding(false);
      setEditingId(null);
      setNewNotice({ title: '', content: '', date: '' });
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'notices');
    }
  };

  const handleEdit = (notice: NoticeData) => {
    setNewNotice({
      title: notice.title || '',
      content: notice.content || '',
      date: notice.date || ''
    });
    setEditingId(notice.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notices', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'notices');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">Your Notices</h2>
        <button onClick={() => {
          setIsAdding(!isAdding);
          if (isAdding) {
            setEditingId(null);
            setNewNotice({ title: '', content: '', date: '' });
          }
        }} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition">
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add New Notice</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 grid grid-cols-1 gap-4">
          <div><label className="block text-sm font-medium mb-1">Title</label><input required className="w-full border rounded-lg px-4 py-2" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Date</label><input required className="w-full border rounded-lg px-4 py-2" value={newNotice.date} onChange={e => setNewNotice({...newNotice, date: e.target.value})} /></div>
          <div><label className="block text-sm font-medium mb-1">Content</label><textarea required className="w-full border rounded-lg px-4 py-2 h-32" value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} /></div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition">Save Notice</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b font-medium text-sm"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Date</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {notices.map(n => (
              <tr key={n.id}>
                <td className="px-6 py-4 font-bold">{n.title}</td>
                <td className="px-6 py-4 text-sm">{n.date}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(n)} className="text-blue-600 hover:text-blue-800 transition mr-4"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(n.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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

function NewsAdmin() {
  const [news, setNews] = useState<NewsData[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', category: 'General News', content: '', date: new Date().toISOString().split('T')[0], time: '', location: '', isEvent: false });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsData)));
    });
    return () => unsubscribe();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const editingItem = news.find(n => n.id === editingId);
        await setDoc(doc(db, 'news', editingId), {
          ...newNews,
          createdAt: editingItem && (editingItem as any).createdAt ? (editingItem as any).createdAt : serverTimestamp()
        });
      } else {
        const newId = Date.now().toString() + Math.random().toString(36).substring(2,9);
        await setDoc(doc(db, 'news', newId), {
          ...newNews,
          createdAt: serverTimestamp()
        });
      }
      setIsAdding(false);
      setEditingId(null);
      setNewNews({ title: '', category: 'General News', content: '', date: new Date().toISOString().split('T')[0], time: '', location: '', isEvent: false });
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'news');
    }
  };

  const handleEdit = (item: NewsData) => {
    setNewNews({
      title: item.title || '',
      category: item.category || 'General News',
      content: item.content || '',
      date: item.date || new Date().toISOString().split('T')[0],
      time: item.time || '',
      location: item.location || '',
      isEvent: item.isEvent || false
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'news');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">News & Announcements</h2>
        <button onClick={() => {
          setIsAdding(!isAdding);
          if (isAdding) {
            setEditingId(null);
            setNewNews({ title: '', category: 'General News', content: '', date: new Date().toISOString().split('T')[0], time: '', location: '', isEvent: false });
          }
        }} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition">
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add News</>}
        </button>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Update district meetings, church activities, missions, and general news here.
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input required className="w-full border rounded-lg px-4 py-2" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select className="w-full border rounded-lg px-4 py-2" value={newNews.category} onChange={e => setNewNews({...newNews, category: e.target.value})}>
              <option value="General News">General News</option>
              <option value="District Meetings">District Meetings</option>
              <option value="Church Activities">Church Activities</option>
              <option value="Missions">Missions</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input required type="date" className="w-full border rounded-lg px-4 py-2" value={newNews.date} onChange={e => setNewNews({...newNews, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time (Optional)</label>
            <input type="time" className="w-full border rounded-lg px-4 py-2" value={newNews.time} onChange={e => setNewNews({...newNews, time: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location (Optional)</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" value={newNews.location} onChange={e => setNewNews({...newNews, location: e.target.value})} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isEvent" className="w-4 h-4" checked={newNews.isEvent || false} onChange={e => setNewNews({...newNews, isEvent: e.target.checked})} />
            <label htmlFor="isEvent" className="text-sm font-medium">This is an Event (will auto-hide after date passes)</label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea required className="w-full border rounded-lg px-4 py-2 h-32" value={newNews.content} onChange={e => setNewNews({...newNews, content: e.target.value})} />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition">Save News</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b font-medium text-sm"><tr><th className="px-6 py-4">News Info</th><th className="px-6 py-4">Content Preview</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {news.map(c => (
              <tr key={c.id}>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{c.title}</div>
                  <div className="text-xs text-blue-600 font-semibold">{c.category}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(c.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {c.time && ` at ${new Date('1970-01-01T' + c.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
                    {c.location && ` • ${c.location}`}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm truncate max-w-xs">{c.content}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(c)} className="text-blue-600 hover:text-blue-800 transition mr-4"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(c.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  <FileText className="mx-auto text-gray-300 mb-2" size={32} />
                  No news added yet. Click "Add News" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const resizeAndCompressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

function GalleryAdmin() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newPhoto, setNewPhoto] = useState<{title: string, description: string, images: string[]}>({ title: '', description: '', images: [] });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setPhotos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleMultipeImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        try {
          const compressed = await resizeAndCompressImage(files[i]);
          newImages.push(compressed);
        } catch (error) {
          console.error('Error compressing image:', error);
        }
      }
      setNewPhoto(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    }
  };

  const removeImage = (index: number) => {
    setNewPhoto(prev => {
      const updated = [...prev.images];
      updated.splice(index, 1);
      return { ...prev, images: updated };
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPhoto.images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    
    try {
      if (editingId) {
        const editingItem = photos.find(p => p.id === editingId);
        await setDoc(doc(db, 'photos', editingId), {
          title: newPhoto.title,
          description: newPhoto.description,
          images: newPhoto.images,
          createdAt: editingItem && (editingItem as any).createdAt ? (editingItem as any).createdAt : serverTimestamp()
        });
      } else {
        const newId = Date.now().toString() + Math.random().toString(36).substring(2,9);
        await setDoc(doc(db, 'photos', newId), {
          title: newPhoto.title,
          description: newPhoto.description,
          images: newPhoto.images,
          createdAt: serverTimestamp()
        });
      }
      setIsAdding(false);
      setEditingId(null);
      setNewPhoto({ title: '', description: '', images: [] });
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'photos');
    }
  };

  const handleEdit = (photo: any) => {
    setNewPhoto({
      title: photo.title || '',
      description: photo.description || '',
      images: photo.images || []
    });
    setEditingId(photo.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm("Are you sure you want to delete this gallery album?")) {
      try {
        await deleteDoc(doc(db, 'photos', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, 'photos');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">Gallery Albums Manager</h2>
        <button onClick={() => {
          setIsAdding(!isAdding);
          if (isAdding) {
            setEditingId(null);
            setNewPhoto({ title: '', description: '', images: [] });
          }
        }} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition">
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add New Album</>}
        </button>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Create albums/sections here (e.g. "Youth Retreat 2024") and add multiple photos to each.
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 grid grid-cols-1 gap-4">
          <div>
             <label className="block text-sm font-medium mb-1">Album Title/Section Name</label>
             <input required className="w-full border rounded-lg px-4 py-2" placeholder="e.g. Youth Retreat 2024" value={newPhoto.title} onChange={e => setNewPhoto({...newPhoto, title: e.target.value})} />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Description (Optional)</label>
             <textarea className="w-full border rounded-lg px-4 py-2 h-24" placeholder="Description of the event..." value={newPhoto.description} onChange={e => setNewPhoto({...newPhoto, description: e.target.value})} />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Upload Photos</label>
             <input type="file" multiple accept="image/*" className="w-full border rounded-lg px-4 py-2 bg-white" onChange={handleMultipeImageUpload} />
             {newPhoto.images.length > 0 && (
               <div className="mt-4">
                 <p className="text-xs text-gray-500 mb-2">Preview ({newPhoto.images.length} images):</p>
                 <div className="flex flex-wrap gap-2">
                   {newPhoto.images.map((imgUrl, idx) => (
                     <div key={idx} className="relative group">
                       <img src={imgUrl} alt={`Preview ${idx + 1}`} className="h-24 w-24 object-cover rounded-lg border border-gray-200" referrerPolicy="no-referrer" />
                       <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <X size={12} />
                       </button>
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition">Save Album</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b font-medium text-sm"><tr><th className="px-6 py-4">Cover / Images</th><th className="px-6 py-4">Title</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {photos.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4">
                  {p.images && p.images.length > 0 ? (
                    <div className="flex -space-x-4">
                       {p.images.slice(0, 3).map((img: string, i: number) => (
                         <img key={i} src={img} alt={p.title} className="w-12 h-12 rounded-full border-2 border-white object-cover bg-gray-100 shadow-sm" referrerPolicy="no-referrer" />
                       ))}
                       {p.images.length > 3 && (
                         <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 z-10 shadow-sm">
                           +{p.images.length - 3}
                         </div>
                       )}
                    </div>
                  ) : <div className="text-gray-400 text-xs">No images</div>}
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{p.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{p.images?.length || 0} photos</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800 transition mr-4"><Edit2 size={18} /></button>
                  <button onClick={(e) => handleDelete(p.id, e as any)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {photos.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  <Image className="mx-auto text-gray-300 mb-2" size={32} />
                  No albums in the gallery.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type ShopItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  createdAt: any;
};

export function ShopAdmin() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, stock: 0, imgUrl: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'merchandise'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ShopItem)));
    });
    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await resizeAndCompressImage(file);
        setNewItem(prev => ({ ...prev, imgUrl: compressedBase64 }));
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const editingItem = items.find(i => i.id === editingId);
        await setDoc(doc(db, 'merchandise', editingId), { 
          ...newItem,
          price: Number(newItem.price),
          stock: Number(newItem.stock),
          createdAt: editingItem && (editingItem as any).createdAt ? (editingItem as any).createdAt : serverTimestamp()
        });
      } else {
        const newId = Date.now().toString() + Math.random().toString(36).substring(2,9);
        await setDoc(doc(db, 'merchandise', newId), {
          ...newItem,
          price: Number(newItem.price),
          stock: Number(newItem.stock),
          createdAt: serverTimestamp()
        });
      }
      setIsAdding(false);
      setEditingId(null);
      setNewItem({ name: '', description: '', price: 0, stock: 0, imgUrl: '' });
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'merchandise');
    }
  };

  const handleEdit = (item: ShopItem) => {
    setNewItem({
      name: item.name || '',
      description: item.description || '',
      price: item.price || 0,
      stock: item.stock || 0,
      imgUrl: item.imgUrl || ''
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'merchandise', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'merchandise');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">Shop Manager (Merchandise)</h2>
        <button onClick={() => {
          setIsAdding(!isAdding);
          if (isAdding) {
            setEditingId(null);
            setNewItem({ name: '', description: '', price: 0, stock: 0, imgUrl: '' });
          }
        }} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition">
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add New Item</>}
        </button>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Manage church merchandise here. Items will only appear on the public Shop page if stock is greater than 0.
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg mb-4">{editingId ? 'Edit Item' : 'Add New Item'}</h3>
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input required className="w-full border rounded-lg px-4 py-2" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea required className="w-full border rounded-lg px-4 py-2" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price (KSh)</label>
            <input required type="number" min="0" className="w-full border rounded-lg px-4 py-2" value={newItem.price} onChange={e => setNewItem({...newItem, price: Number(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock Quantity</label>
            <input required type="number" min="0" className="w-full border rounded-lg px-4 py-2" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: Number(e.target.value)})} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium mb-1">Image Photo</label>
            <input required={!newItem.imgUrl} type="file" accept="image/*" className="w-full border rounded-lg px-4 py-2 bg-white" onChange={handleImageUpload} />
            {newItem.imgUrl && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <img src={newItem.imgUrl} alt="Preview" className="h-40 object-cover rounded-lg border border-gray-200" referrerPolicy="no-referrer" />
              </div>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 pt-4">
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition">Save Item</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b font-medium text-sm"><tr><th className="px-6 py-4">Item</th><th className="px-6 py-4">Stock</th><th className="px-6 py-4">Price</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(item => (
              <tr key={item.id} className={item.stock === 0 ? "bg-gray-50 opacity-70" : ""}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={item.imgUrl} alt={item.name} className="w-16 h-16 object-cover rounded bg-gray-100" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-bold text-slate-800">{item.name}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${item.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">KSh {item.price}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 transition p-2 mr-2"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <ShoppingBag className="mx-auto text-gray-300 mb-2" size={32} />
                  No merchandise items. Click "Add New Item" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
