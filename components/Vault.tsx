import React, { useState, useMemo } from 'react';
import { VaultItem, AccessTier } from '../types';
import { Lock, Unlock, FileText, Search, Filter, X } from 'lucide-react';

interface VaultProps {
  items: VaultItem[];
  userTier: AccessTier;
}

const TIER_LEVELS = {
  [AccessTier.GHOST]: 0,
  [AccessTier.CLIENT]: 1,
  [AccessTier.PARTNER]: 2,
  [AccessTier.ARCHITECT]: 3,
};

export const Vault: React.FC<VaultProps> = ({ items, userTier }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<'ALL' | 'insight' | 'asset' | 'invite'>('ALL');

  const userLevel = TIER_LEVELS[userTier];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = activeType === 'ALL' || item.type === activeType;
      
      return matchesSearch && matchesType;
    });
  }, [items, searchQuery, activeType]);

  return (
    <div className="h-full bg-charcoal p-8 overflow-y-auto flex flex-col">
      {/* Header Section */}
      <div className="mb-8 border-b border-neutral-800 pb-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-3xl font-serif-luxury text-neutral-200 tracking-tight">The Vault</h2>
            <p className="text-xs font-mono-tech text-neutral-600 mt-2 uppercase tracking-widest">
              Secure Asset Storage
            </p>
          </div>
          <div className="text-right hidden md:block">
               <div className="text-[10px] text-neutral-700 font-mono-tech">CAPACITY</div>
               <div className="text-sm text-neutral-500 font-mono-tech">UNLIMITED</div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between font-mono-tech">
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-neutral-400 transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="SEARCH PROTOCOLS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-neutral-800 py-2 pl-6 pr-8 text-xs text-neutral-300 placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors uppercase tracking-wider"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-700 hover:text-neutral-400"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {(['ALL', 'insight', 'asset', 'invite'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`text-[10px] uppercase tracking-widest transition-colors whitespace-nowrap ${
                  activeType === type 
                    ? 'text-neutral-200 border-b border-neutral-500' 
                    : 'text-neutral-600 hover:text-neutral-400'
                }`}
              >
                {type === 'ALL' ? 'ALL_FILES' : type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const itemLevel = TIER_LEVELS[item.tierRequired];
            const isAccessible = userLevel >= itemLevel;
            
            return (
              <div
                key={item.id}
                className={`group relative p-6 border transition-all duration-700 ${
                  isAccessible
                    ? 'border-neutral-800 bg-neutral-900/20 hover:border-neutral-600 hover:bg-neutral-900/40 cursor-pointer'
                    : 'border-neutral-900 bg-obsidian opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-none border ${isAccessible ? 'border-neutral-700 text-neutral-400' : 'border-neutral-900 text-neutral-800'}`}>
                    {item.type === 'insight' && <FileText size={16} />}
                    {item.type === 'asset' && <Lock size={16} />}
                    {item.type === 'invite' && <Unlock size={16} />}
                  </div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-neutral-600">
                    Tier: {item.tierRequired}
                  </div>
                </div>

                <h3 className={`text-lg font-serif-luxury mb-2 ${isAccessible ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {isAccessible ? item.title : 'REDACTED ASSET'}
                </h3>
                
                <p className={`text-sm font-mono-tech mb-6 leading-relaxed ${isAccessible ? 'text-neutral-500' : 'text-neutral-800 blur-[2px]'}`}>
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                   {isAccessible ? (
                     <span className="text-[10px] uppercase tracking-widest text-gold-700 group-hover:text-gold-500 transition-colors">
                       [ Access Granted ]
                     </span>
                   ) : (
                     <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-700">
                       <Lock size={10} />
                       [ Restricted ]
                     </span>
                   )}
                   
                   {!isAccessible && item.tierRequired === AccessTier.CLIENT && (
                      <span className="text-[10px] text-neutral-800 font-mono-tech group-hover:text-neutral-600 transition-colors">
                         ELEVATE TO VIEW
                      </span>
                   )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-neutral-700 border border-dashed border-neutral-900">
             <Filter size={24} className="mb-4 opacity-50" />
             <p className="text-xs font-mono-tech uppercase tracking-widest">No matching protocols found</p>
          </div>
        )}
      </div>
    </div>
  );
};