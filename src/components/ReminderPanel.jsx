import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const ReminderPanel = ({ property, onSendBulk }) => {
  const [message, setMessage] = useState('Hi there! This is a friendly reminder that rent is due on the 1st. Please reach out if you have any questions.');

  if (!property) return null;

  const activeTenants = property.tenants.filter(t => !t.archived);
  const canSend = activeTenants.length > 0 && message.trim().length > 0;

  const handleSend = () => {
    onSendBulk(message.trim());
  };

  return (
    <div className="bg-white border border-blue-100 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-5 h-5 text-blue-700" />
        <h4 className="text-blue-900 font-semibold">Send reminder</h4>
      </div>
      <p className="text-sm text-blue-700/70 mb-2">Send to all active tenants of {property.name} ({activeTenants.length}).</p>
      <textarea
        className="w-full min-h-[96px] rounded-md border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder:text-blue-700/40"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-blue-700/60">This simulates sending via email/SMS for now.</div>
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`px-4 py-2 rounded-md text-white ${canSend ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
        >
          Send to all
        </button>
      </div>
    </div>
  );
};

export default ReminderPanel;
