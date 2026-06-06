import { useState, useEffect } from 'react';

export function useLocalCollection<T>(key: string): [T[], (items: T[]) => void] {
  const [items, setItems] = useState<T[]>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const setStoredItems = (newItems: T[]) => {
    setItems(newItems);
    localStorage.setItem(key, JSON.stringify(newItems));
    window.dispatchEvent(new Event('local-storage-update'));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          setItems(JSON.parse(stored));
        }
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-update', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-update', handleStorageChange);
    };
  }, [key]);

  return [items, setStoredItems];
}
