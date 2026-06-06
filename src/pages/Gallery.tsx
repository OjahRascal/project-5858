import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';



export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSections(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-sm font-bold text-accent tracking-widest uppercase mb-2">
            Moments
          </h1>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-dark">
            Our Gallery
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 mx-auto">
            A glimpse into the life, worship, and events of the PCEA Thing'ati community.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
          </div>
        ) : sections.length > 0 ? (
          <div className="mb-20">
            {sections.map(section => (
              <div key={section.id} className="mb-20">
                <h3 className="text-3xl font-serif font-bold text-primary-dark mb-8 text-center border-b pb-4">
                  {section.title}
                </h3>
                {section.images.length > 0 ? (
                  <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {section.images.map((imgUrl, i) => (
                      <div 
                        key={i} 
                        className="relative group overflow-hidden rounded-xl bg-gray-200 shadow-sm flex flex-col cursor-pointer break-inside-avoid block w-full mb-6"
                        onClick={() => setSelectedPhoto(imgUrl)}
                      >
                        <img 
                          src={imgUrl} 
                          alt={`${section.title} ${i + 1}`} 
                          className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                          <p className="text-white font-bold text-base tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm drop-shadow-md">
                            {section.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No photos in this album yet.
                  </div>
                )}
                {section.description && (
                  <div className="mt-12 text-center max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-lg text-gray-700 leading-relaxed font-serif italic">
                      {section.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            No gallery albums available.
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[101]"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <img 
            src={selectedPhoto} 
            alt="Enlarged view" 
            className="max-w-full max-h-full object-contain rounded-md select-none shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
}

