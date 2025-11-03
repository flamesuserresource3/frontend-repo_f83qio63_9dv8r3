import React, { useState } from 'react';
import { Plus, Archive, ArchiveRestore, Send, User } from 'lucide-react';

const TenantManager = ({ property, onAddTenant, onToggleArchive, onSendReminder }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  if (!property) {
    return (
      <div className="bg-white border border-blue-100 rounded-xl p-6 text-blue-800/80 text-center">
        Select or add a property to manage tenants.
      </div>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddTenant({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    setName('');
    setEmail('');
    setPhone('');
  };

  const activeTenants = property.tenants.filter(t => !t.archived);
  const archivedTenants = property.tenants.filter(t => t.archived);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-blue-100 rounded-xl p-4 flex items-center justify-between">
        <div>
          <h3 className="text-blue-900 font-semibold">{property.name}</h3>
          <p className="text-sm text-blue-700/70">{property.address || 'No address provided'}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowArchived((s) => !s)}
            className="text-sm px-3 py-1.5 rounded-md border border-blue-200 text-blue-800 hover:bg-blue-50"
          >
            {showArchived ? 'Hide' : 'Show'} archived
          </button>
        </div>
      </div>

      <form onSubmit={submit} className="bg-white border border-blue-100 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-blue-700" />
          <h4 className="text-blue-900 font-semibold">Add tenant</h4>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            className="w-full rounded-md border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder:text-blue-700/40"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full rounded-md border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder:text-blue-700/40"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-md border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder:text-blue-700/40"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add tenant
          </button>
        </div>
      </form>

      <div className="bg-white border border-blue-100 rounded-xl p-4">
        <h4 className="text-blue-900 font-semibold mb-3">Active tenants</h4>
        {activeTenants.length === 0 ? (
          <p className="text-sm text-blue-700/70">No active tenants yet.</p>
        ) : (
          <ul className="divide-y divide-blue-100">
            {activeTenants.map((t) => (
              <li key={t.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-blue-900">{t.name}</div>
                  <div className="text-xs text-blue-700/70">{t.email || 'No email'} • {t.phone || 'No phone'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSendReminder(t)}
                    className="text-sm px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 inline-flex items-center gap-1"
                  >
                    <Send className="w-4 h-4" /> Reminder
                  </button>
                  <button
                    onClick={() => onToggleArchive(t.id)}
                    className="text-sm px-3 py-1.5 rounded-md border border-blue-200 text-blue-800 hover:bg-blue-50 inline-flex items-center gap-1"
                  >
                    <Archive className="w-4 h-4" /> Archive
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showArchived && (
        <div className="bg-white border border-blue-100 rounded-xl p-4">
          <h4 className="text-blue-900 font-semibold mb-3">Archived tenants</h4>
          {archivedTenants.length === 0 ? (
            <p className="text-sm text-blue-700/70">No archived tenants.</p>
          ) : (
            <ul className="divide-y divide-blue-100">
              {archivedTenants.map((t) => (
                <li key={t.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-blue-900">{t.name}</div>
                    <div className="text-xs text-blue-700/70">{t.email || 'No email'} • {t.phone || 'No phone'}</div>
                  </div>
                  <button
                    onClick={() => onToggleArchive(t.id)}
                    className="text-sm px-3 py-1.5 rounded-md border border-blue-200 text-blue-800 hover:bg-blue-50 inline-flex items-center gap-1"
                  >
                    <ArchiveRestore className="w-4 h-4" /> Unarchive
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TenantManager;
