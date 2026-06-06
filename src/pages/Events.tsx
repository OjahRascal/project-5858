import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, isSameMonth, isToday, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, List, X } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Events() {
  const [currentDate, setCurrentDate] = useState(new Date('2026-04-16')); // Anchored to current context date
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getDayEvents = (day: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), day));
  };

  return (
    <div className="bg-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-8">
          <div>
            <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-2">Happening Soon</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark">Events Calendar</h1>
          </div>
          
          <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1 mt-6 md:mt-0">
            <button 
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${viewMode === 'calendar' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}
              onClick={() => setViewMode('calendar')}
            >
              <CalendarIcon size={16} /> Calendar
            </button>
            <button 
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} /> List Setup
            </button>
          </div>
        </div>

        {viewMode === 'list' && (
           <div className="space-y-6 max-w-4xl mx-auto">
             {events.map((event) => (
               <div key={event.id} className="card-soft flex flex-col sm:flex-row border border-gray-100 hover:border-accent/30 transition-colors">
                  <div className="bg-primary/5 p-6 flex flex-col justify-center items-center sm:w-48 border-b sm:border-b-0 sm:border-r border-gray-100">
                    <span className="text-sm font-bold text-accent uppercase tracking-widest mb-2">{format(parseISO(event.date), 'MMM')}</span>
                    <span className="w-14 h-14 flex items-center justify-center rounded-full bg-red-600 text-white text-3xl font-serif font-bold shadow-md mb-2">{format(parseISO(event.date), 'dd')}</span>
                    <span className="text-sm text-gray-500 uppercase">{format(parseISO(event.date), 'EEEE')}</span>
                  </div>
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                    <h3 className="text-2xl font-serif font-bold text-primary-dark mb-3">{event.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-2"><Clock size={16} className="text-accent" /> {event.time}</span>
                      <span className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> {event.location}</span>
                    </div>
                    <div>
                      <button 
                        className="btn-outline py-2 px-6 text-sm"
                        onClick={() => setSelectedEvent(event)}
                      >
                        Event Details
                      </button>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        )}

        {viewMode === 'calendar' && (
          <div className="card-soft border border-gray-100">
            {/* Calendar Header */}
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft /></button>
              <h2 className="text-2xl font-serif font-bold">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight /></button>
            </div>
            
            {/* Days of Week */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="py-3 text-center text-sm font-bold text-gray-500 uppercase tracking-widest">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 bg-white">
              {days.map((day, idx) => {
                const dayEvents = getDayEvents(day);
                return (
                  <div 
                    key={day.toString()} 
                    className={`min-h-[120px] p-2 border-b border-r border-gray-100 ${!isSameMonth(day, monthStart) ? 'bg-gray-50 opacity-50' : ''} ${isToday(day) ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${dayEvents.length > 0 ? 'bg-red-600 text-white' : isToday(day) ? 'bg-primary text-white' : 'text-gray-700'}`}>
                        {format(day, dateFormat)}
                      </span>
                      {dayEvents.length > 0 && <span className="bg-red-100 sm:hidden text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{dayEvents.length}</span>}
                    </div>
                    <div className="space-y-1 hidden sm:block">
                      {dayEvents.map(event => (
                        <div 
                          key={event.id} 
                          className="text-xs p-1.5 bg-primary/5 border border-primary/10 rounded text-primary-dark truncate cursor-pointer hover:bg-primary/10 transition-colors"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <span className="font-bold mr-1">{event.time.split(' ')[0]}</span>
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
          <div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-32 md:h-40 bg-primary/10 flex items-end p-6 md:p-8 border-b border-primary/20">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-primary-dark"
              >
                <X size={20} />
              </button>
              <div>
                <span className="bg-accent text-white text-xs font-bold uppercase tracking-widest py-1 px-2 rounded mb-2 inline-block">
                  {format(parseISO(selectedEvent.date), 'MMMM d, yyyy')}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary-dark leading-tight">
                  {selectedEvent.title}
                </h3>
              </div>
            </div>
            
            <div className="p-6 md:p-8 bg-white">
              <div className="flex flex-col gap-4 text-gray-600 mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Time</p>
                    <p className="font-medium text-gray-800">{selectedEvent.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-accent">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</p>
                    <p className="font-medium text-gray-800">{selectedEvent.location}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">About The Event</p>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {selectedEvent.description || "Join us for this wonderful event. More details will be provided at the venue. All are welcome to attend."}
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="btn-outline py-2 px-6"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

