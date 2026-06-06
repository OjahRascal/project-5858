import { useState, useEffect } from 'react';

export const INITIAL_PHOTOS = [
  {
    id: 'f1',
    title: 'PCEA Thing\'ati Festival Moments',
    description: '"Festival moments bring our congregation together. It is a time for sharing, uplifting one another, and experiencing the true joy of unity in faith."',
    createdAt: new Date().toISOString(),
    images: [
      'https://i.postimg.cc/FmY2NDJr/IMG-20260505-WA0064.jpg',
      'https://i.postimg.cc/37kPYnDJ/IMG-20260505-WA0069.jpg',
      'https://i.postimg.cc/PH3BgBNv/IMG-20260505-WA0072.jpg',
      'https://i.postimg.cc/dvhzw4TQ/IMG-20260514-WA0175.jpg',
      'https://i.postimg.cc/CYRWSmf1/IMG-20260514-WA0176.jpg',
      'https://i.postimg.cc/R9Wj4Xnq/IMG-20260514-WA0177.jpg'
    ]
  },
  {
    id: 'y1',
    title: 'Youth Joyful Moments',
    description: '"Joyful moments from our Youth Fellowship, celebrating faith, friendship, and the vibrant spirit of our young believers."',
    createdAt: new Date(Date.now() - 1000).toISOString(),
    images: [
      'https://i.postimg.cc/gzLFSDVn/IMG-20260505-WA0015.jpg',
      'https://i.postimg.cc/Zbvt7c89/IMG-20260505-WA0025.jpg',
      'https://i.postimg.cc/6W4Jj0rG/IMG-20260505-WA0036.jpg',
      'https://i.postimg.cc/9mw58pdT/IMG-20260505-WA0041.jpg',
      'https://i.postimg.cc/xfNDxRvq/IMG-20260505-WA0016.jpg',
      'https://i.postimg.cc/HY8DZ2wc/IMG-20260505-WA0026.jpg',
      'https://i.postimg.cc/54Qd73BC/IMG-20260505-WA0040.jpg'
    ]
  },
  {
    id: 's1',
    title: 'Seminars',
    description: '"Equipping the saints for the work of ministry. Our seminars provide moments of deep learning, spiritual growth, and empowerment."',
    createdAt: new Date(Date.now() - 2000).toISOString(),
    images: [
      'https://i.postimg.cc/pxVKF6Bp/IMG-20260505-WA0060.jpg',
      'https://i.postimg.cc/syf5hNJ1/IMG-20260505-WA0061.jpg',
      'https://i.postimg.cc/9VXy7nBD/IMG-20260505-WA0062.jpg',
      'https://i.postimg.cc/CYMbqQ4B/IMG-20260505-WA0081.jpg'
    ]
  },
  {
    id: 'w1',
    title: 'Winning & Awards',
    description: '"Celebrating excellence and dedication within our church community. Acknowledging those who go above and beyond in their service and faith."',
    createdAt: new Date(Date.now() - 3000).toISOString(),
    images: [
      'https://i.postimg.cc/Hps7yJwL/IMG-20260505-WA0055.jpg',
      'https://i.postimg.cc/81KfB14g/IMG-20260505-WA0065.jpg',
      'https://i.postimg.cc/81Pr6FRD/IMG-20260505-WA0051.jpg',
      'https://i.postimg.cc/w6fRc62B/IMG-20260505-WA0066.jpg',
      'https://i.postimg.cc/hSyQbSsh/IMG-20260514-WA0174.jpg',
      'https://i.postimg.cc/fw2SjwCN/IMG-20260505-WA0053.jpg'
    ]
  },
  {
    id: 'an1',
    title: 'Anniversary Celebration',
    description: '"Celebrating years of God\'s faithfulness and continuous blessings. Our anniversary moments capture the joy of the journey thus far."',
    createdAt: new Date(Date.now() - 4000).toISOString(),
    images: [
      'https://i.postimg.cc/CYMbqQ4B/IMG-20260505-WA0081.jpg',
      'https://i.postimg.cc/Pd4n7JBk/IMG-20260505-WA0079.jpg',
      'https://i.postimg.cc/bqTf5rKq/IMG-20260505-WA0078.jpg',
      'https://i.postimg.cc/qpLHFq90/IMG-20260505-WA0077.jpg',
      'https://i.postimg.cc/BJgfzbd3/IMG-20260505-WA0080.jpg'
    ]
  },
  {
    id: 'bb1',
    title: 'Boys & Girls Brigade',
    description: '"Instilling discipline, faith, and leadership in the next generation. Our Boys & Girls Brigade stands strong on a sure foundation."',
    createdAt: new Date(Date.now() - 5000).toISOString(),
    images: [
      'https://i.postimg.cc/hSLz6LKX/IMG-20260514-WA0173.jpg',
      'https://i.postimg.cc/zJCb6CqV/Whats-App-Image-2026-05-19-at-16-44-07.jpg',
      'https://i.postimg.cc/dq2kp2JD/Whats-App-Image-2026-05-19-at-16-44-09.jpg',
      'https://i.postimg.cc/p2fh4fP9/Whats-App-Image-2026-05-19-at-16-44-10.jpg'
    ]
  },
  {
    id: 'wg1',
    title: 'Woman\'s Guild',
    description: '"United in love and service. The Woman\'s Guild serving the church and community with dedication, faith, and grace."',
    createdAt: new Date(Date.now() - 6000).toISOString(),
    images: [
      'https://i.postimg.cc/KG1ftpPh/IMG-20260505-WA0075.jpg',
      'https://i.postimg.cc/WNd80YGP/IMG-20260505-WA0074.jpg'
    ]
  }
];

export function useLocalCollection<T>(key: string) {
  const [data, setData] = useState<T[]>(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (key === 'local_photos' && (!parsed || parsed.length === 0)) {
           return INITIAL_PHOTOS as any as T[];
        }
        return parsed;
      } catch (e) {
        return key === 'local_photos' ? INITIAL_PHOTOS as any as T[] : [];
      }
    }
    return key === 'local_photos' ? INITIAL_PHOTOS as any as T[] : [];
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            if (key === 'local_photos' && (!parsed || parsed.length === 0)) {
               setData(INITIAL_PHOTOS as any as T[]);
            } else {
               setData(parsed);
            }
          } catch (err) {}
        } else {
          if (key === 'local_photos') {
            setData(INITIAL_PHOTOS as any as T[]);
          } else {
            setData([]);
          }
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  const setAndSave = (newData: T[]) => {
    setData(newData);
    localStorage.setItem(key, JSON.stringify(newData));
    window.dispatchEvent(new Event('local-storage-update'));
  };

  useEffect(() => {
    const handleCustomEvent = () => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (key === 'local_photos' && (!parsed || parsed.length === 0)) {
            setData(INITIAL_PHOTOS as any as T[]);
          } else {
            setData(parsed);
          }
        } catch(err) {}
      } else {
        if (key === 'local_photos') {
          setData(INITIAL_PHOTOS as any as T[]);
        }
      }
    };
    window.addEventListener('local-storage-update', handleCustomEvent);
    return () => window.removeEventListener('local-storage-update', handleCustomEvent);
  }, [key]);

  return [data, setAndSave] as const;
}

export function saveToLocal<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new Event('local-storage-update'));
}

export function getFromLocal<T>(key: string): T[] {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch(err) {}
  }
  return [];
}
