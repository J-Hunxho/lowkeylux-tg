export enum AccessTier {
  GHOST = 'GHOST',          // Free / Invisible
  CLIENT = 'CLIENT',        // Private / Basic Paid
  PARTNER = 'PARTNER',      // Inner Circle / High Value
  ARCHITECT = 'ARCHITECT'   // Black Tier / Admin
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: number;
  type?: 'text' | 'image' | 'access_grant' | 'payment_request' | 'vault_drop';
  metadata?: any;
  isGlitch?: boolean;
}

export interface VaultItem {
  id: string;
  title: string;
  type: 'insight' | 'asset' | 'invite';
  tierRequired: AccessTier;
  locked: boolean;
  unlockDate?: number; // For time-based unlocks
  description: string;
}

export interface SystemState {
  tier: AccessTier;
  messages: Message[];
  isTyping: boolean;
  vaultItems: VaultItem[];
  analyticsVisible: boolean;
}