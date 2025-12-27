import React, { useState } from 'react';
import { Terminal } from './components/Terminal';
import { Vault } from './components/Vault';
import { AdminPanel } from './components/AdminPanel';
import { AccessTier, Message, VaultItem } from './types';
import { INITIAL_SYSTEM_MESSAGE, INITIAL_VAULT_ITEMS } from './constants';
import { processUserCommand } from './services/botLogic';
import { ShieldAlert, Terminal as TerminalIcon, Database } from 'lucide-react';

const App: React.FC = () => {
  const [tier, setTier] = useState<AccessTier>(AccessTier.GHOST);
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', text: INITIAL_SYSTEM_MESSAGE, sender: 'system', timestamp: Date.now(), type: 'text' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'terminal' | 'vault'>('terminal');
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(INITIAL_VAULT_ITEMS);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleSendMessage = async (text: string) => {
    // Optimistic UI update
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: Date.now()
    }]);

    setIsTyping(true);

    // Delegate to logic service
    await processUserCommand(text, tier, setMessages, setTier, setVaultItems, setShowAdmin);
    
    setIsTyping(false);
  };

  const handleKillSwitch = () => {
      setMessages([]);
      setTier(AccessTier.GHOST);
      setShowAdmin(false);
      setVaultItems(INITIAL_VAULT_ITEMS);
      // Force reload to simulate system reboot
      window.location.reload();
  };

  return (
    <div className="flex h-screen w-screen bg-black text-neutral-400 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-16 md:w-20 border-r border-neutral-900 bg-obsidian flex flex-col items-center py-8 z-30 transition-colors duration-500">
        <div className="mb-12 text-neutral-200">
           <ShieldAlert size={24} className="opacity-80" />
        </div>

        <div className="flex-1 flex flex-col gap-8 w-full items-center">
           <button
             onClick={() => setActiveTab('terminal')}
             className={`p-3 rounded-xl transition-all duration-300 ${activeTab === 'terminal' ? 'bg-neutral-800 text-neutral-200' : 'text-neutral-600 hover:text-neutral-400'}`}
             title="Terminal Interface"
           >
             <TerminalIcon size={20} />
           </button>
           <button
             onClick={() => setActiveTab('vault')}
             className={`p-3 rounded-xl transition-all duration-300 ${activeTab === 'vault' ? 'bg-neutral-800 text-neutral-200' : 'text-neutral-600 hover:text-neutral-400'}`}
             title="Secure Vault"
           >
             <Database size={20} />
           </button>
        </div>

        <div className="mt-auto flex flex-col items-center gap-4">
           {showAdmin && (
             <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" title="GOD MODE ACTIVE" />
           )}
           <div className={`w-1 h-8 rounded-full transition-all duration-1000 ${tier === AccessTier.GHOST ? 'bg-neutral-800' : 'bg-gold-700 shadow-[0_0_10px_rgba(180,150,100,0.3)]'}`} title={`Current Clearance: ${tier}`} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative h-full bg-obsidian">
        {activeTab === 'terminal' ? (
          <Terminal
            messages={messages}
            isTyping={isTyping}
            onSendMessage={handleSendMessage}
            tier={tier}
          />
        ) : (
          <Vault
            items={vaultItems}
            userTier={tier}
          />
        )}
      </div>

      {/* Admin Overlay */}
      {showAdmin && <AdminPanel onKillSwitch={handleKillSwitch} />}
    </div>
  );
};

export default App;