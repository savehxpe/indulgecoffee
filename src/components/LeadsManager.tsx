import React from 'react';
import { LeadSubmission } from '../types';
import { Trash, Calendar, Phone, Mail, FileText, CheckCircle, Navigation, Shield, X } from 'lucide-react';

interface LeadsManagerProps {
  submissions: LeadSubmission[];
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  onAddMock: () => void;
}

export const LeadsManager: React.FC<LeadsManagerProps> = ({
  submissions,
  isOpen,
  onClose,
  onClear,
  onAddMock
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-rise">
      <div className="w-full max-w-2xl bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Indulge Local Leads Control</h3>
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-mono">Simulating Maseru Operations</p>
            </div>
          </div>
          <button 
            id="leads-manager-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.03] border border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            All WhatsApp queries, private bookings, and directions enquiries are stored in the client-side state using <code className="px-1.5 py-0.5 rounded bg-white/5 text-accent font-mono text-[11px]">localStorage</code>. In production, this proxies directly to the Maseru WhatsApp API or your CMS backend.
          </p>

          <div className="flex gap-2">
            <button
              onClick={onAddMock}
              className="text-xs font-semibold uppercase tracking-wider bg-accent/20 border border-accent/40 text-accent hover:bg-accent/35 px-4 py-2.5 rounded-full transition-all cursor-pointer"
            >
              Simulate Tourist Lead
            </button>
            {submissions.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs font-semibold uppercase tracking-wider bg-red-950/30 border border-red-900/60 text-red-400 hover:bg-red-900/40 px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash className="w-3.5 h-3.5" />
                <span>Format Database</span>
              </button>
            )}
          </div>

          <div className="space-y-3 pt-2">
            {submissions.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-muted-foreground text-sm font-medium">Database Empty</p>
                <p className="text-[11px] text-muted-foreground/60 max-w-sm mx-auto mt-2 leading-relaxed">
                  Submit forms above, click "Get Coordinates", or tap "Simulate Tourist Lead" to preview operational telemetry.
                </p>
              </div>
            ) : (
              submissions.map((lead) => {
                const isNewsletter = lead.type === 'newsletter';
                const isEvent = lead.type === 'event';
                const isOrder = lead.type === 'order';
                
                return (
                  <div 
                    key={lead.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-4"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{lead.name}</span>
                          <span className={`text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full font-semibold ${
                            isNewsletter ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 
                            isEvent ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                            isOrder ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {lead.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3.5 text-muted-foreground text-xs mt-1.5">
                          <p className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-muted-foreground/60" />
                            <span>{lead.contact}</span>
                          </p>
                          <p className="text-muted-foreground/40">•</p>
                          <p className="text-muted-foreground/60 font-mono text-[10px]">{lead.createdAt}</p>
                        </div>
                      </div>
                    </div>

                    {lead.message && (
                      <div className="p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] text-[11px] text-muted-foreground leading-relaxed font-mono flex items-start gap-2">
                        <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <span>{lead.message}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 text-center text-muted-foreground text-[10px] uppercase tracking-wider bg-white/[0.02]">
          Operational Scaffold Mode • Secure local state active
        </div>
      </div>
    </div>
  );
};
