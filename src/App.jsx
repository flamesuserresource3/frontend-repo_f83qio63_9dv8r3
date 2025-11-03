import React, { useMemo, useState } from 'react';
import Hero from './components/Hero';
import PropertyList from './components/PropertyList';
import PropertyForm from './components/PropertyForm';
import TenantManager from './components/TenantManager';
import ReminderPanel from './components/ReminderPanel';

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function App() {
  const [properties, setProperties] = useState(() => []);
  const [activePropertyId, setActivePropertyId] = useState(null);

  const activeProperty = useMemo(
    () => properties.find(p => p.id === activePropertyId) || null,
    [properties, activePropertyId]
  );

  const handleCreateProperty = ({ name, address }) => {
    const newProp = { id: uid(), name, address, tenants: [] };
    setProperties((prev) => [newProp, ...prev]);
    setActivePropertyId(newProp.id);
  };

  const handleAddPropertyShortcut = () => {
    const name = prompt('Property name');
    if (!name) return;
    const address = prompt('Address (optional)') || '';
    handleCreateProperty({ name, address });
  };

  const handleSelectProperty = (id) => setActivePropertyId(id);

  const handleAddTenant = ({ name, email, phone }) => {
    if (!activeProperty) return;
    const newTenant = { id: uid(), name, email, phone, archived: false };
    setProperties((prev) => prev.map(p => {
      if (p.id !== activeProperty.id) return p;
      return { ...p, tenants: [newTenant, ...p.tenants] };
    }));
  };

  const handleToggleArchive = (tenantId) => {
    if (!activeProperty) return;
    setProperties((prev) => prev.map(p => {
      if (p.id !== activeProperty.id) return p;
      return {
        ...p,
        tenants: p.tenants.map(t => t.id === tenantId ? { ...t, archived: !t.archived } : t)
      };
    }));
  };

  const simulateSend = (recipientLabel, message) => {
    // Simulate sending reminders (could be replaced by real API)
    console.log('Sending reminder to', recipientLabel, message);
    alert(`Reminder sent to ${recipientLabel}.`);
  };

  const handleSendReminder = (tenant) => {
    const msg = `Hi ${tenant.name}, this is a friendly reminder from your property manager.`;
    simulateSend(tenant.name, msg);
  };

  const handleSendBulk = (message) => {
    if (!activeProperty) return;
    const recipients = activeProperty.tenants.filter(t => !t.archived).map(t => t.name).join(', ');
    simulateSend(`${activeProperty.name} tenants (${recipients || 'none'})`, message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-blue-900">
      <Hero />

      <section id="features" className="py-12">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h3 className="font-semibold text-blue-900 text-lg">Organize properties</h3>
              <p className="mt-2 text-sm text-blue-800/80">Create properties and keep tenant lists neatly grouped for each address.</p>
            </div>
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h3 className="font-semibold text-blue-900 text-lg">Manage tenants</h3>
              <p className="mt-2 text-sm text-blue-800/80">Add new tenants, archive former tenants, and keep contact details handy.</p>
            </div>
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h3 className="font-semibold text-blue-900 text-lg">Send reminders</h3>
              <p className="mt-2 text-sm text-blue-800/80">Craft quick announcements and send reminders to everyone in a click.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="manager" className="pb-16">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-900">Your management hub</h2>
            <p className="text-blue-800/80">Add properties, manage tenants, and send reminders in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6">
            <PropertyList
              properties={properties}
              activeId={activePropertyId}
              onSelect={handleSelectProperty}
              onAddProperty={handleAddPropertyShortcut}
            />

            <div className="space-y-6">
              <PropertyForm onCreate={handleCreateProperty} />
              <TenantManager
                property={activeProperty}
                onAddTenant={handleAddTenant}
                onToggleArchive={handleToggleArchive}
                onSendReminder={handleSendReminder}
              />
              <ReminderPanel property={activeProperty} onSendBulk={handleSendBulk} />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-blue-700 text-white">
        <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
          <p className="text-sm">Built for independent property managers</p>
          <a href="#manager" className="text-sm underline underline-offset-4">Open dashboard</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
