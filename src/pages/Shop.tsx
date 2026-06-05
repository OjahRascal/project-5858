import React from 'react';
import { useLocalCollection } from '@/lib/localStore';
import { ShoppingBag } from 'lucide-react';

type ShopItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
};

export default function Shop() {
  const [allItems] = useLocalCollection<ShopItem>('local_merchandise');
  const items = allItems.filter(item => item.stock > 0);

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary-dark mb-4">Church Shop</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Support our ministries by purchasing church merchandise.
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
                <div className="aspect-square overflow-hidden relative bg-gray-100">
                  <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-slate-800">{item.name}</h3>
                    <span className="font-bold text-red-600 text-lg">KSh {item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">{item.description}</p>
                  <a 
                    href={`mailto:church@pceathingati.org?subject=Purchase%20Inquiry:%20${encodeURIComponent(item.name)}&body=Hello,%0D%0A%0D%0AI%20would%20like%20to%20purchase%20the%20following%20item%20from%20the%20church%20shop:%0D%0A%0D%0AItem:%20${encodeURIComponent(item.name)}%0D%0APrice:%20KSh%20${item.price}%0D%0A%0D%0APlease%20let%20me%20know%20how%20I%20can%20make%20the%20payment%20and%20collect%20the%20item.%0D%0A%0D%0AThank%20you.`}
                    className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                  >
                    <ShoppingBag size={18} />
                    Buy Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Check Back Later</h3>
            <p className="text-gray-500">We currently don't have any merchandise in stock.</p>
          </div>
        )}
      </div>
    </div>
  );
}
