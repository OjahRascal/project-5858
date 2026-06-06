import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export default function Give() {
  const [selectedPrimary, setSelectedPrimary] = useState<'tithe' | 'offering' | 'group' | null>(null);

  const renderGivingDetails = () => {
    if (!selectedPrimary) return null;

    if (selectedPrimary === 'group') {
      return (
        <div className="bg-white/10 rounded-xl p-6 border border-white/20 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h4 className="text-xl font-bold mb-4 text-white">Giving Details for Groups</h4>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-sm text-gray-300 uppercase tracking-widest">Organization Name</span>
              <span className="text-lg font-bold text-white text-right">PCEA Thing'ati Groups</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-sm text-gray-300 uppercase tracking-widest">Paybill No.</span>
              <span className="text-2xl font-mono font-bold text-accent px-3 py-1 bg-black/20 rounded">222111</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300 uppercase tracking-widest">Account No.</span>
              <span className="text-2xl font-mono font-bold text-white px-3 py-1 bg-black/20 rounded">404540</span>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 space-y-4 text-sm text-gray-300">
            <h5 className="font-bold text-accent uppercase tracking-widest">How to give via M-PESA</h5>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Go to M-PESA menu and select Lipa na M-PESA</li>
              <li>Select <strong>Paybill</strong></li>
              <li>Enter Business No. <strong>222111</strong></li>
              <li>Enter Account No. <strong>404540</strong></li>
              <li>Enter Amount and your M-PESA PIN</li>
            </ol>
          </div>

          <button 
            onClick={() => { setSelectedPrimary(null); }}
            className="mt-6 text-sm text-accent hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={16} /> Choose a different category
          </button>
        </div>
      );
    }

    // Default for Tithe / Offering
    return (
      <div className="bg-white/10 rounded-xl p-6 border border-white/20 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h4 className="text-xl font-bold mb-4 text-white">Giving Details for {selectedPrimary === 'tithe' ? 'Tithe' : 'Offering'}</h4>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-sm text-gray-300 uppercase tracking-widest">Organization Name</span>
            <span className="text-lg font-bold text-white text-right">PCEA Thing'ati</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-sm text-gray-300 uppercase tracking-widest">Paybill No.</span>
            <span className="text-2xl font-mono font-bold text-accent px-3 py-1 bg-black/20 rounded">896590</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300 uppercase tracking-widest">Account No.</span>
            <span className="text-lg font-bold text-white text-right">Your District e.g. Upendo</span>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 space-y-4 text-sm text-gray-300">
          <h5 className="font-bold text-accent uppercase tracking-widest">How to give via M-PESA</h5>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Go to M-PESA menu and select Lipa na M-PESA</li>
            <li>Select <strong>Paybill</strong></li>
            <li>Enter Business No. <strong>896590</strong></li>
            <li>Enter your District as the Account No. (e.g., <strong>Upendo</strong>)</li>
            <li>Enter Amount and your M-PESA PIN</li>
          </ol>
        </div>

        <button 
          onClick={() => { setSelectedPrimary(null); }}
          className="mt-6 text-sm text-accent hover:text-white flex items-center gap-1 transition-colors"
        >
          <ArrowLeft size={16} /> Choose a different category
        </button>
      </div>
    );
  };


  return (
    <div className="bg-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-2">Giving & Tithes</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-6">Worship Through Giving</h1>
          <p className="text-lg text-gray-600">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          
          {/* Interactive Giving Section */}
          <div className="space-y-8">
            <div className="card-soft p-8 bg-primary text-white relative overflow-hidden h-full shadow-xl">
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-3xl font-serif font-bold mb-2">Make a Contribution</h3>
                <p className="text-gray-300 mb-8">Select a giving category to view the relevant giving details.</p>
                
                <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
                  
                  {!selectedPrimary && (
                      <div className="space-y-3">
                        <button 
                          onClick={() => setSelectedPrimary('tithe')}
                          className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-6 rounded-xl text-left transition-colors flex items-center justify-between"
                        >
                          Tithe
                          <ChevronRight size={20} className="text-white/50" />
                        </button>
                        <button 
                          onClick={() => setSelectedPrimary('offering')}
                          className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-6 rounded-xl text-left transition-colors flex items-center justify-between"
                        >
                          Offering
                          <ChevronRight size={20} className="text-white/50" />
                        </button>
                        <button 
                          onClick={() => setSelectedPrimary('group')}
                          className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-6 rounded-xl text-left transition-colors flex items-center justify-between"
                        >
                          Groups
                          <ChevronRight size={20} className="text-white/50" />
                        </button>
                      </div>
                    )}

                    {/* Giving Details Reveal */}
                    {renderGivingDetails()}

                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

