import React from 'react';
import { Building2, Users } from 'lucide-react';

const PropertyList = ({ properties, activeId, onSelect, onAddProperty }) => {
  return (
    <aside className="w-full md:w-72 bg-white rounded-xl border border-blue-100 shadow-sm">
      <div className="p-4 border-b border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-700 font-semibold">
          <Building2 className="w-5 h-5" />
          <span>Properties</span>
        </div>
        <button
          onClick={onAddProperty}
          className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <ul className="max-h-[420px] overflow-auto">
        {properties.length === 0 && (
          <li className="p-4 text-sm text-blue-700/70">No properties yet. Add your first one.</li>
        )}
        {properties.map((p) => {
          const active = p.id === activeId;
          const tenantCount = p.tenants.filter(t => !t.archived).length;
          return (
            <li key={p.id}>
              <button
                onClick={() => onSelect(p.id)}
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-blue-50/60 transition-colors ${active ? 'bg-blue-50' : ''}`}
              >
                <div>
                  <div className="font-medium text-blue-900">{p.name}</div>
                  <div className="text-xs text-blue-700/70 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {tenantCount} active tenant{tenantCount === 1 ? '' : 's'}
                  </div>
                </div>
                <div className="text-xs text-blue-700/60">{p.address}</div>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default PropertyList;
