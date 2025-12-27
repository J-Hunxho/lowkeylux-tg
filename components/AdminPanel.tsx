import React from 'react';
import { AccessTier } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AdminPanelProps {
  onKillSwitch: () => void;
}

const data = [
  { name: '00:00', users: 120, rev: 400 },
  { name: '04:00', users: 132, rev: 300 },
  { name: '08:00', users: 405, rev: 2400 },
  { name: '12:00', users: 890, rev: 6700 },
  { name: '16:00', users: 670, rev: 4100 },
  { name: '20:00', users: 950, rev: 8200 },
  { name: '23:59', users: 340, rev: 1200 },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ onKillSwitch }) => {
  return (
    <div className="fixed inset-0 bg-obsidian z-50 p-12 text-neutral-400 font-mono-tech animate-fade-in overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-red-900/30 pb-4">
          <div>
            <h1 className="text-2xl text-red-700 font-bold tracking-widest">GOD_MODE // ANALYTICS</h1>
            <p className="text-xs text-red-900/60 mt-1">EYES ONLY. DO NOT DISTRIBUTE.</p>
          </div>
          <button 
            onClick={onKillSwitch}
            className="border border-red-900 text-red-800 px-4 py-2 text-xs hover:bg-red-950 hover:text-red-500 transition-colors uppercase tracking-widest"
          >
            init_kill_switch()
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           <div className="bg-neutral-900/20 border border-neutral-800 p-6">
              <div className="text-xs text-neutral-600 uppercase tracking-widest mb-2">Active Sessions</div>
              <div className="text-4xl text-neutral-200 font-serif-luxury">1,248</div>
              <div className="text-xs text-green-900 mt-2 flex items-center gap-1">
                 <span className="w-1 h-1 bg-green-500 rounded-full"></span> Live
              </div>
           </div>
           <div className="bg-neutral-900/20 border border-neutral-800 p-6">
              <div className="text-xs text-neutral-600 uppercase tracking-widest mb-2">Daily Revenue</div>
              <div className="text-4xl text-neutral-200 font-serif-luxury">$42,850</div>
              <div className="text-xs text-neutral-700 mt-2">ETH / STRIPE / XMR</div>
           </div>
           <div className="bg-neutral-900/20 border border-neutral-800 p-6">
              <div className="text-xs text-neutral-600 uppercase tracking-widest mb-2">Conversion Rate</div>
              <div className="text-4xl text-neutral-200 font-serif-luxury">8.4%</div>
              <div className="text-xs text-neutral-700 mt-2">Ghost -> Client</div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-64 mb-12">
           <div className="bg-neutral-900/10 border border-neutral-800 p-4">
              <div className="text-xs text-neutral-600 mb-4">TRAFFIC VOLUME</div>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#404040" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                    itemStyle={{ color: '#888', fontSize: '12px', fontFamily: 'monospace' }}
                  />
                  <Bar dataKey="users" fill="#262626" />
                </BarChart>
              </ResponsiveContainer>
           </div>
           
           <div className="bg-neutral-900/10 border border-neutral-800 p-4">
              <div className="text-xs text-neutral-600 mb-4">REVENUE VELOCITY</div>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="#404040" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                    itemStyle={{ color: '#888', fontSize: '12px', fontFamily: 'monospace' }}
                  />
                  <Line type="monotone" dataKey="rev" stroke="#5D4037" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
           <div className="text-xs text-neutral-600 uppercase tracking-widest mb-4">Recent Anomalies</div>
           <div className="space-y-2 text-xs font-mono-tech">
              <div className="flex justify-between text-neutral-500 border-b border-neutral-900 pb-2">
                 <span>USR_9921</span>
                 <span>FAILED_AUTH_SEQUENCE_X5</span>
                 <span className="text-red-900">FLAGGED</span>
              </div>
              <div className="flex justify-between text-neutral-500 border-b border-neutral-900 pb-2">
                 <span>USR_1102</span>
                 <span>PAYMENT_REVERSAL_ATTEMPT</span>
                 <span className="text-red-900">BANNED</span>
              </div>
              <div className="flex justify-between text-neutral-500 border-b border-neutral-900 pb-2">
                 <span>USR_0045</span>
                 <span>ELEVATED_TO_ARCHITECT</span>
                 <span className="text-green-900">VERIFIED</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};