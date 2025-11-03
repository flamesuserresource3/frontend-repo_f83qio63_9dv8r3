import React, { useState } from 'react';

const PropertyForm = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name: name.trim(), address: address.trim() });
    setName('');
    setAddress('');
  };

  return (
    <form onSubmit={submit} className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
      <h3 className="text-blue-900 font-semibold mb-3">Add a new property</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          className="col-span-1 md:col-span-1 w-full rounded-md border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder:text-blue-700/40"
          placeholder="Property name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="col-span-1 md:col-span-2 w-full rounded-md border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder:text-blue-700/40"
          placeholder="Address (optional)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit" className="md:col-span-3 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700">
          Add property
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
