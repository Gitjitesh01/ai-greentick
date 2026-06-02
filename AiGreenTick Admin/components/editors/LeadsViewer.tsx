import React, { useState } from 'react';
import { Trash2, Mail, Phone, Building, Search, Filter } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  type: string;
  message: string;
  date: string;
}

interface LeadsViewerProps {
  leads: Lead[];
  onDeleteLead: (id: string) => void;
}

const LeadsViewer: React.FC<LeadsViewerProps> = ({ leads, onDeleteLead }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(leads.map(l => l.type || 'General Inquiry')))];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lead.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = typeFilter === 'All' || lead.type === typeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-bold text-base text-white">Leads Capture Inbox</h3>
          <p className="text-xs text-slate-400 mt-1">Manage details submitted from your website's contact form.</p>
        </div>

        {/* Total Badge */}
        <span className="px-3 py-1 bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold rounded-lg">
          Total captured: {leads.length} leads
        </span>
      </div>

      {/* SEARCH & FILTER CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search name, email, phone, company, message..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-brand-500 cursor-pointer"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* LEADS TABLE */}
      {filteredLeads.length === 0 ? (
        <div className="text-center py-16 text-slate-500 text-xs">
          No lead entries match your criteria.
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[10px] font-bold bg-slate-900/50">
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Company Details</th>
                <th className="py-3.5 px-4">Enquiry Type</th>
                <th className="py-3.5 px-4">Message</th>
                <th className="py-3.5 px-4">Date Submitted</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 bg-slate-950/20">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-4 min-w-[200px]">
                    <div className="font-bold text-white text-sm">{lead.name}</div>
                    <div className="text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                      <Mail className="w-3.5 h-3.5 text-brand-500" /> {lead.email}
                    </div>
                    <div className="text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                      <Phone className="w-3.5 h-3.5 text-brand-500" /> {lead.phone}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-300">
                    {lead.company ? (
                      <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-slate-500" /> {lead.company}</span>
                    ) : (
                      <span className="text-slate-500 italic font-light">Not Provided</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded font-semibold text-[10px]">
                      {lead.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 max-w-sm">
                    <p className="text-slate-400 leading-relaxed font-light break-words whitespace-pre-wrap">{lead.message}</p>
                  </td>
                  <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                    {new Date(lead.date).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button 
                      onClick={() => onDeleteLead(lead.id)}
                      className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadsViewer;
