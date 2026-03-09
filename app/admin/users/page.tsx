'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Shield, ShieldCheck, Pencil, Eye } from 'lucide-react';

interface Admin {
  id: string;
  username: string;
  display_name: string;
  role: string;
  created_at: string;
}

const ROLES = [
  { value: 'super_admin', label: 'Super Admin', description: 'Full access — manage users, packs, and all settings', icon: ShieldCheck, color: 'text-red-500' },
  { value: 'admin', label: 'Admin', description: 'Create, edit, publish, and delete packs', icon: Shield, color: 'text-amber-500' },
  { value: 'editor', label: 'Editor', description: 'Create and edit packs, cannot delete or publish', icon: Pencil, color: 'text-blue-500' },
  { value: 'viewer', label: 'Viewer', description: 'View-only access to dashboard and packs', icon: Eye, color: 'text-gray-500' },
];

function getRoleInfo(role: string) {
  return ROLES.find((r) => r.value === role) || ROLES[3];
}

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ username: '', password: '', display_name: '', role: 'editor' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [currentRole, setCurrentRole] = useState('');

  useEffect(() => {
    fetchAdmins();
    // Read current user's role from cookie
    const roleCookie = document.cookie.split('; ').find(c => c.startsWith('admin-role='));
    if (roleCookie) setCurrentRole(roleCookie.split('=')[1]);
  }, []);

  async function fetchAdmins() {
    const res = await fetch('/api/admin/users');
    if (res.ok) {
      setAdmins(await res.json());
    }
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setShowForm(false);
      setForm({ username: '', password: '', display_name: '', role: 'editor' });
      fetchAdmins();
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to create user');
    }
    setSaving(false);
  }

  async function handleDelete(admin: Admin) {
    if (!confirm(`Delete user "${admin.display_name || admin.username}"? This cannot be undone.`)) return;

    const res = await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: admin.id }),
    });

    if (res.ok) {
      fetchAdmins();
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to delete user');
    }
  }

  const canManageUsers = currentRole === 'super_admin';

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-bark">Users</h1>
          <p className="text-bark/60 text-sm mt-1">Manage admin accounts and permissions</p>
        </div>
        {canManageUsers && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        )}
      </div>

      {/* Role legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {ROLES.map((role) => (
          <div key={role.value} className="bg-white rounded-lg p-3 border border-bark/10">
            <div className="flex items-center gap-2 mb-1">
              <role.icon className={`w-4 h-4 ${role.color}`} />
              <span className="text-sm font-medium text-bark">{role.label}</span>
            </div>
            <p className="text-xs text-bark/50">{role.description}</p>
          </div>
        ))}
      </div>

      {/* New user form */}
      {showForm && canManageUsers && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-bark/10 p-5 mb-6 space-y-4">
          <h2 className="text-lg font-display font-bold text-bark">New Admin User</h2>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-bark/70 mb-1">Username</label>
              <input
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full px-3 py-2 border border-bark/20 rounded-lg text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none"
                placeholder="e.g. john"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-bark/70 mb-1">Display Name</label>
              <input
                type="text"
                value={form.display_name}
                onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                className="w-full px-3 py-2 border border-bark/20 rounded-lg text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none"
                placeholder="e.g. John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-bark/70 mb-1">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2 border border-bark/20 rounded-lg text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none"
                placeholder="Minimum 8 characters"
                minLength={8}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-bark/70 mb-1">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2 border border-bark/20 rounded-lg text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none bg-white"
              >
                {ROLES.map((role) => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Creating...' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setError(''); }}
              className="px-4 py-2 bg-bark/10 text-bark rounded-lg text-sm font-medium hover:bg-bark/20 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Users list */}
      {loading ? (
        <div className="text-bark/40 text-center py-12">Loading users...</div>
      ) : (
        <div className="bg-white rounded-xl border border-bark/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bark/10 bg-bark/[0.02]">
                <th className="text-left text-xs font-medium text-bark/50 uppercase tracking-wider px-5 py-3">User</th>
                <th className="text-left text-xs font-medium text-bark/50 uppercase tracking-wider px-5 py-3">Role</th>
                <th className="text-left text-xs font-medium text-bark/50 uppercase tracking-wider px-5 py-3">Created</th>
                {canManageUsers && (
                  <th className="text-right text-xs font-medium text-bark/50 uppercase tracking-wider px-5 py-3">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => {
                const roleInfo = getRoleInfo(admin.role);
                return (
                  <tr key={admin.id} className="border-b border-bark/5 last:border-0 hover:bg-bark/[0.01]">
                    <td className="px-5 py-3">
                      <div className="font-medium text-sm text-bark">{admin.display_name || admin.username}</div>
                      <div className="text-xs text-bark/40">@{admin.username}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 text-sm">
                        <roleInfo.icon className={`w-3.5 h-3.5 ${roleInfo.color}`} />
                        <span className="text-bark/70">{roleInfo.label}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-bark/50">
                      {new Date(admin.created_at).toLocaleDateString()}
                    </td>
                    {canManageUsers && (
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleDelete(admin)}
                          className="p-1.5 text-bark/30 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-bark/40 py-8 text-sm">No admin users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!canManageUsers && (
        <p className="text-bark/40 text-sm mt-4 text-center">
          Only Super Admins can add or remove users.
        </p>
      )}
    </div>
  );
}
