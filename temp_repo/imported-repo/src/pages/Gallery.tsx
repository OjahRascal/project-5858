import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLocalCollection } from '@/lib/localStore';

type PhotoData = { id: string; title: string; description?: string; images: string[]; };

const FESTIVAL_MOMENTS = [
  { id: 'f1', imgUrl: 'https://i.postimg.cc/FmY2NDJr/IMG-20260505-WA0064.jpg', title: 'A Moment of Fellowship' },
  { id: 'f2', imgUrl: 'https://i.postimg.cc/37kPYnDJ/IMG-20260505-WA0069.jpg', title: 'Joyful Celebrations' },
  { id: 'f3', imgUrl: 'https://i.postimg.cc/PH3BgBNv/IMG-20260505-WA0072.jpg', title: 'United in Spirit' },
  { id: 'f4', imgUrl: 'https://i.postimg.cc/dvhzw4TQ/IMG-20260514-WA0175.jpg', title: 'Festival Preparations' },
  { id: 'f5', imgUrl: 'https://i.postimg.cc/CYRWSmf1/IMG-20260514-WA0176.jpg', title: 'Community Bonding' },
  { id: 'f6', imgUrl: 'https://i.postimg.cc/R9Wj4Xnq/IMG-20260514-WA0177.jpg', title: 'A Beautiful Gathering' }
];

const YOUTH_MOMENTS = [
  { id: 'y1', imgUrl: 'https://i.postimg.cc/gzLFSDVn/IMG-20260505-WA0015.jpg', title: 'Youth Joyful Moments' },
  { id: 'y2', imgUrl: 'https://i.postimg.cc/Zbvt7c89/IMG-20260505-WA0025.jpg', title: 'Youth Joyful Moments' },
  { id: 'y3', imgUrl: 'https://i.postimg.cc/6W4Jj0rG/IMG-20260505-WA0036.jpg', title: 'Youth Joyful Moments' },
  { id: 'y4', imgUrl: 'https://i.postimg.cc/9mw58pdT/IMG-20260505-WA0041.jpg', title: 'Youth Joyful Moments' },
  { id: 'y5', imgUrl: 'https://i.postimg.cc/xfNDxRvq/IMG-20260505-WA0016.jpg', title: 'Youth Joyful Moments' },
  { id: 'y6', imgUrl: 'https://i.postimg.cc/HY8DZ2wc/IMG-20260505-WA0026.jpg', title: 'Youth Joyful Moments' },
  { id: 'y7', imgUrl: 'https://i.postimg.cc/54Qd73BC/IMG-20260505-WA0040.jpg', title: 'Youth Joyful Moments' }
];

const SEMINARS_MOMENTS = [
  { id: 's1', imgUrl: 'https://i.postimg.cc/pxVKF6Bp/IMG-20260505-WA0060.jpg', title: 'Seminars' },
  { id: 's2', imgUrl: 'https://i.postimg.cc/syf5hNJ1/IMG-20260505-WA0061.jpg', title: 'Seminars' },
  { id: 's3', imgUrl: 'https://i.postimg.cc/9VXy7nBD/IMG-20260505-WA0062.jpg', title: 'Seminars' },
  { id: 's4', imgUrl: 'https://i.postimg.cc/CYMbqQ4B/IMG-20260505-WA0081.jpg', title: 'Seminars' }
];

const WINNING_AWARDS_MOMENTS = [
  { id: 'w1', imgUrl: 'https://i.postimg.cc/Hps7yJwL/IMG-20260505-WA0055.jpg', title: 'Winning & Awards' },
  { id: 'w2', imgUrl: 'https://i.postimg.cc/81KfB14g/IMG-20260505-WA0065.jpg', title: 'Winning & Awards' },
  { id: 'w3', imgUrl: 'https://i.postimg.cc/81Pr6FRD/IMG-20260505-WA0051.jpg', title: 'Winning & Awards' },
  { id: 'w4', imgUrl: 'https://i.postimg.cc/w6fRc62B/IMG-20260505-WA0066.jpg', title: 'Winning & Awards' },
  { id: 'w5', imgUrl: 'https://i.postimg.cc/hSyQbSsh/IMG-20260514-WA0174.jpg', title: 'Winning & Awards' },
  { id: 'w6', imgUrl: 'https://i.postimg.cc/fw2SjwCN/IMG-20260505-WA0053.jpg', title: 'Winning & Awards' }
];

const WOMANS_GUILD_MOMENTS = [
  { id: 'wg1', imgUrl: 'https://i.postimg.cc/KG1ftpPh/IMG-20260505-WA0075.jpg', title: "Woman's Guild" },
  { id: 'wg2', imgUrl: 'https://i.postimg.cc/WNd80YGP/IMG-20260505-WA0074.jpg', title: "Woman's Guild" }
];

const ANNIVERSARY_MOMENTS = [
  { id: 'an1', imgUrl: 'https://i.postimg.cc/CYMbqQ4B/IMG-20260505-WA0081.jpg', title: 'Anniversary Celebration' },
  { id: 'an2', imgUrl: 'https://i.postimg.cc/Pd4n7JBk/IMG-20260505-WA0079.jpg', title: 'Anniversary Celebration' },
  { id: 'an3', imgUrl: 'https://i.postimg.cc/bqTf5rKq/IMG-20260505-WA0078.jpg', title: 'Anniversary Celebration' },
  { id: 'an4', imgUrl: 'https://i.postimg.cc/qpLHFq90/IMG-20260505-WA0077.jpg', title: 'Anniversary Celebration' },
  { id: 'an5', imgUrl: 'https://i.postimg.cc/BJgfzbd3/IMG-20260505-WA0080.jpg', title: 'Anniversary Celebration' }
];

const BRIGADE_MOMENTS = [
  { id: 'bb1', imgUrl: 'https://i.postimg.cc/hSLz6LKX/IMG-20260514-WA0173.jpg', title: 'Boys & Girls Brigade' },
  { id: 'bb2', imgUrl: 'https://i.postimg.cc/zJCb6CqV/Whats-App-Image-2026-05-19-at-16-44-07.jpg', title: 'Boys & Girls Brigade' },
  { id: 'bb3', imgUrl: 'https://i.postimg.cc/dq2kp2JD/Whats-App-Image-2026-05-19-at-16-44-09.jpg', title: 'Boys & Girls Brigade' },
  { id: 'bb4', imgUrl: 'https://i.postimg.cc/p2fh4fP9/Whats-App-Image-2026-05-19-at-16-44-10.jpg', title: 'Boys & Girls Brigade' }
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [sections] = useLocalCollection<PhotoData>('local_photos');
  const loading = false;

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

        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-primary-dark mb-8 text-center border-b pb-4">
            PCEA Thing'ati Festival Moments
          </h3>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {FESTIVAL_MOMENTS.map((moment) => (
              <div 
                key={moment.id} 
                className="relative group overflow-hidden rounded-xl bg-gray-200 shadow-sm flex flex-col cursor-pointer break-inside-avoid block w-full mb-6"
                onClick={() => setSelectedPhoto(moment.imgUrl)}
              >
                <img 
                  src={moment.imgUrl} 
                  alt={moment.title} 
                  className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="text-white font-bold text-base tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm drop-shadow-md">
                    {moment.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed font-serif italic">
              "Festival moments bring our congregation together. It is a time for sharing, uplifting one another, and experiencing the true joy of unity in faith."
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-primary-dark mb-8 text-center border-b pb-4">
            Youth Joyful Moments
          </h3>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {YOUTH_MOMENTS.map((moment) => (
              <div 
                key={moment.id} 
                className="relative group overflow-hidden rounded-xl bg-gray-200 shadow-sm flex flex-col cursor-pointer break-inside-avoid block w-full mb-6"
                onClick={() => setSelectedPhoto(moment.imgUrl)}
              >
                <img 
                  src={moment.imgUrl} 
                  alt={moment.title} 
                  className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="text-white font-bold text-base tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm drop-shadow-md">
                    {moment.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed font-serif italic">
              "Joyful moments from our Youth Fellowship, celebrating faith, friendship, and the vibrant spirit of our young believers."
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-primary-dark mb-8 text-center border-b pb-4">
            Seminars
          </h3>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {SEMINARS_MOMENTS.map((moment) => (
              <div 
                key={moment.id} 
                className="relative group overflow-hidden rounded-xl bg-gray-200 shadow-sm flex flex-col cursor-pointer break-inside-avoid block w-full mb-6"
                onClick={() => setSelectedPhoto(moment.imgUrl)}
              >
                <img 
                  src={moment.imgUrl} 
                  alt={moment.title} 
                  className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="text-white font-bold text-base tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm drop-shadow-md">
                    {moment.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed font-serif italic">
              "Equipping the saints for the work of ministry. Our seminars provide moments of deep learning, spiritual growth, and empowerment."
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-primary-dark mb-8 text-center border-b pb-4">
            Winning & Awards
          </h3>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {WINNING_AWARDS_MOMENTS.map((moment) => (
              <div 
                key={moment.id} 
                className="relative group overflow-hidden rounded-xl bg-gray-200 shadow-sm flex flex-col cursor-pointer break-inside-avoid block w-full mb-6"
                onClick={() => setSelectedPhoto(moment.imgUrl)}
              >
                <img 
                  src={moment.imgUrl} 
                  alt={moment.title} 
                  className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="text-white font-bold text-base tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm drop-shadow-md">
                    {moment.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed font-serif italic">
              "Celebrating excellence and dedication within our church community. Acknowledging those who go above and beyond in their service and faith."
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-primary-dark mb-8 text-center border-b pb-4">
            Anniversary Celebration
          </h3>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {ANNIVERSARY_MOMENTS.map((moment) => (
              <div 
                key={moment.id} 
                className="relative group overflow-hidden rounded-xl bg-gray-200 shadow-sm flex flex-col cursor-pointer break-inside-avoid block w-full mb-6"
                onClick={() => setSelectedPhoto(moment.imgUrl)}
              >
                <img 
                  src={moment.imgUrl} 
                  alt={moment.title} 
                  className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="text-white font-bold text-base tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm drop-shadow-md">
                    {moment.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed font-serif italic">
              "Celebrating years of God's faithfulness and continuous blessings. Our anniversary moments capture the joy of the journey thus far."
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-primary-dark mb-8 text-center border-b pb-4">
            Boys & Girls Brigade
          </h3>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {BRIGADE_MOMENTS.map((moment) => (
              <div 
                key={moment.id} 
                className="relative group overflow-hidden rounded-xl bg-gray-200 shadow-sm flex flex-col cursor-pointer break-inside-avoid block w-full mb-6"
                onClick={() => setSelectedPhoto(moment.imgUrl)}
              >
                <img 
                  src={moment.imgUrl} 
                  alt={moment.title} 
                  className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="text-white font-bold text-base tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm drop-shadow-md">
                    {moment.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed font-serif italic">
              "Instilling discipline, faith, and leadership in the next generation. Our Boys & Girls Brigade stands strong on a sure foundation."
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-primary-dark mb-8 text-center border-b pb-4">
            Woman's Guild
          </h3>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {WOMANS_GUILD_MOMENTS.map((moment) => (
              <div 
                key={moment.id} 
                className="relative group overflow-hidden rounded-xl bg-gray-200 shadow-sm flex flex-col cursor-pointer break-inside-avoid block w-full mb-6"
                onClick={() => setSelectedPhoto(moment.imgUrl)}
              >
                <img 
                  src={moment.imgUrl} 
                  alt={moment.title} 
                  className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="text-white font-bold text-base tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm drop-shadow-md">
                    {moment.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed font-serif italic">
              "United in love and service. The Woman's Guild serving the church and community with dedication, faith, and grace."
            </p>
          </div>
        </div>
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

