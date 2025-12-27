import { AccessTier, VaultItem } from './types';

export const INITIAL_SYSTEM_MESSAGE = `
CONNECTION ESTABLISHED.
PROTOCOL: SECURE_V3
IDENTITY: UNVERIFIED

Welcome. 
You are currently in the Waiting Room.
Silence is a virtue. Do not ask for access. It must be granted.
`;

export const TIER_CONFIG = {
  [AccessTier.GHOST]: {
    color: 'text-neutral-600',
    delay: 3000, // Slow responses
    label: 'UNVERIFIED',
    borderColor: 'border-neutral-800'
  },
  [AccessTier.CLIENT]: {
    color: 'text-neutral-400',
    delay: 1500,
    label: 'CLIENT',
    borderColor: 'border-neutral-600'
  },
  [AccessTier.PARTNER]: {
    color: 'text-stone-300',
    delay: 500,
    label: 'PARTNER',
    borderColor: 'border-stone-500'
  },
  [AccessTier.ARCHITECT]: {
    color: 'text-white',
    delay: 0,
    label: 'ARCHITECT',
    borderColor: 'border-white'
  }
};

export const INITIAL_VAULT_ITEMS: VaultItem[] = [
  {
    id: '1',
    title: 'Market Symmetry Analysis',
    type: 'insight',
    tierRequired: AccessTier.GHOST,
    locked: false,
    description: 'Public facing market sentiment analysis. Redacted.'
  },
  {
    id: '2',
    title: 'Q3 Asset Allocation [PREMIUM]',
    type: 'asset',
    tierRequired: AccessTier.CLIENT,
    locked: true,
    description: 'Full portfolio distribution strategy. Verified clients only.'
  },
  {
    id: '3',
    title: 'The Black Ledger',
    type: 'insight',
    tierRequired: AccessTier.PARTNER,
    locked: true,
    description: 'Off-book opportunities. Invitation only.'
  },
  {
    id: '4',
    title: 'PROTOCOL: OMEGA',
    type: 'invite',
    tierRequired: AccessTier.ARCHITECT,
    locked: true,
    description: 'System override codes.'
  }
];

export const SYSTEM_RESPONSES = {
  DEFAULT_GHOST: [
    "...",
    "Request logged.",
    "Unknown command.",
    "Patience."
  ],
  DEFAULT_CLIENT: [
    "Acknowledged.",
    "Processing request.",
    "Stand by.",
    "Access limited."
  ],
  UPSELL: "Clearance insufficient. Elevate status to proceed.",
  PAYMENT_LINK: "Gateway opened. Confirm transaction to elevate.",
  ADMIN_REVEAL: "Welcome back, Architect."
};