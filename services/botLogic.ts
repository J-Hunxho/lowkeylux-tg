import React from 'react';
import { AccessTier, Message, VaultItem } from '../types';
import { TIER_CONFIG, SYSTEM_RESPONSES, INITIAL_VAULT_ITEMS } from '../constants';

export const processUserCommand = async (
  command: string, 
  currentTier: AccessTier,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setTier: React.Dispatch<React.SetStateAction<AccessTier>>,
  setVaultItems: React.Dispatch<React.SetStateAction<VaultItem[]>>,
  setShowAdmin: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const normalizedCmd = command.toLowerCase().trim();
  const config = TIER_CONFIG[currentTier];

  // System Silence / Throttling
  // Real implementation would track message frequency. 
  // Here we just use the tier delay.
  
  await new Promise(resolve => setTimeout(resolve, config.delay));

  const addMsg = (text: string, type: Message['type'] = 'text', glitch = false) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'system',
      timestamp: Date.now(),
      type,
      isGlitch: glitch
    }]);
  };

  // Commands
  if (normalizedCmd === 'help' || normalizedCmd === 'options') {
    if (currentTier === AccessTier.GHOST) {
       addMsg("Commands unavailable. Status unverified.");
    } else {
       addMsg(`AVAILABLE PROTOCOLS:\n- /status\n- /elevate\n- /vault\n- /disconnect`);
    }
    return;
  }

  if (normalizedCmd === 'status' || normalizedCmd === '/status') {
    addMsg(`IDENTITY: ${config.label}\nACCESS_LEVEL: ${currentTier}\nTHROUGHPUT: ${currentTier === AccessTier.GHOST ? 'LIMITED' : 'UNRESTRICTED'}`);
    return;
  }

  if (normalizedCmd === 'elevate' || normalizedCmd === '/elevate' || normalizedCmd === 'upgrade') {
     if (currentTier === AccessTier.ARCHITECT) {
       addMsg("Maximum clearance already achieved.");
     } else {
       addMsg("ELEVATION PROTOCOL INITIATED.\nVerification fee: 0.5 ETH / $1500 USD.", 'payment_request');
     }
     return;
  }

  if (normalizedCmd === 'admin' || normalizedCmd === 'godmode') {
      if (currentTier === AccessTier.ARCHITECT) {
          setShowAdmin(true);
          addMsg(SYSTEM_RESPONSES.ADMIN_REVEAL);
      } else {
          addMsg("UNAUTHORIZED ACCESS ATTEMPT LOGGED.", 'text', true);
      }
      return;
  }

  if (normalizedCmd === 'sudo upgrade') {
      // Backdoor for demo purposes
      setTier(AccessTier.CLIENT);
      addMsg("...Override accepted. Welcome, Client.");
      return;
  }
  
  if (normalizedCmd === 'sudo max') {
      // Backdoor for demo purposes
      setTier(AccessTier.ARCHITECT);
      addMsg("...ROOT ACCESS GRANTED. Welcome, Architect.");
      return;
  }

  // Default Conversations
  const responses = SYSTEM_RESPONSES[`DEFAULT_${currentTier}` as keyof typeof SYSTEM_RESPONSES] || SYSTEM_RESPONSES.DEFAULT_GHOST;
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  addMsg(randomResponse);
};