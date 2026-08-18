'use client';

import React, { useState } from 'react';
import { Users, Trash2, ShieldCheck, UserCheck, Search } from 'lucide-react';
import { User, Role } from '@/lib/types';
import { useApp } from '@/context/AppContext';

export default function AdminUsersPage() {
  const { addToast } = useApp();

  const [users, setUsers] = useState<User[]>([
    {
      id: 'usr-1',
      name: 'Aura Sovereign Master Parfumeur',
      email: 'admin@aurasovereign.com',
      role: 'ADMIN',
      phone: '+91 98765 43210',
      createdAt: new Date(Date.now() - 86400000 * 30),
    },
    {
      id: 'usr-2',
      name: 'Lord Henry Sterling',
      email: 'client@aurasovereign.com',
      role: 'USER',
      phone: '+91 91234 56780',
      createdAt: new Date(Date.now() - 86400000 * 15),
    },
    {
      id: 'usr-3',
      name: 'Lady Eleanor Vance',
      email: 'eleanor@vance.fr',
      role: 'USER',
      phone: '+33 6 12 34 56 78',
      createdAt: new Date(Date.now() - 86400000 * 10),
    },
    {
      id: 'usr-4',
      name: 'Julian V. de Montfort',
      email: 'julian@montfort.co.uk',
      role: 'USER',
      phone: '+44 20 7946 0912',
      createdAt: new Date(Date.now() - 86400000 * 5),
    },
  ]);

  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRole = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newRole: Role = u.role === 'ADMIN' ? 'USER' : 'ADMIN';
          addToast(`Updated role for ${u.name} to ${newRole}.`, 'success');
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to revoke and delete this client profile?')) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      addToast('Client profile deleted.', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold block">
            Client Registry
          </span>
          <h1 className="text-3xl font-serif font-light text-ivory-light">
            Privileged Clients & Staff ({users.length})
          </h1>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search client directory..."
            className="w-full bg-obsidian border border-white/10 rounded-full px-4 py-2 text-xs text-ivory placeholder-smoke focus:outline-none focus:border-gold font-sans pr-8"
          />
          <Search size={13} className="absolute right-3 top-3 text-smoke" />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl bg-charcoal/70 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-obsidian border-b border-white/10 text-smoke uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Client Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Privilege Role</th>
                <th className="p-4">Enrolled On</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-serif text-sm font-medium text-ivory">
                    {u.name}
                  </td>
                  <td className="p-4 text-smoke">{u.email}</td>
                  <td className="p-4 text-smoke">{u.phone || 'N/A'}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role === 'ADMIN'
                          ? 'bg-gold/20 text-gold border border-gold/40'
                          : 'bg-white/5 text-smoke'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-smoke">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => toggleRole(u.id)}
                      className="px-2.5 py-1 rounded border border-white/10 hover:border-gold text-smoke hover:text-gold text-[10px] transition-colors"
                      title="Toggle Role"
                    >
                      Switch to {u.role === 'ADMIN' ? 'USER' : 'ADMIN'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-1.5 text-smoke hover:text-red-400 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
