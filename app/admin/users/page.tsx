'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Shield, ShieldCheck, Pencil, Eye, KeyRound, Check } from 'lucide-react';

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
  const [currentUser, setCurrentUser] = useState('');
  const [showPwForm, setShowPwForm] = useState(false);
  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  useEffect(() => {
    fetchAdmins();
    const roleCookie = document.cookie.split('; ').find(c => c.startsWith('admin-role='));
    if (roleCookie) setCurrentRole(roleCookie.split('=')[1]);
    const userCookie = document.cookie.split('; ').find(c => c.startsWith('admin-user='));
    if (userCookie) setCurrentUser(userCookie.split('=')[1]);
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

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError('');
    setPwSuccess(false);

    if (pwForm.new_password !== pwForm.confirm_password) {
      setPwError('New passwords do not match');
      return;
    }

    setPwSaving(true);

    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: currentUser,
        current_password: pwForm.current_password,
        new_password: pwForm.new_password,
      }),
    });

    if (res.ok) {
      setPwSuccess(true);
      setPwForm({ current_password: '', new_password: '', confirm_password: '' });
      setTimeout(() => { setPwSuccess(false); setShowPwForm(false); }, 2000);
    } else {
      const data = await res.json();
      setPwError(data.error || 'Failed to change password');
    }
    setPwSaving(false);
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

      {/* Change password */}
      <div className="bg-white rounded-xl border border-bark/10 p-5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
              <KeyRound className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-bark">Logged in as <span className="font-semibold">@{currentUser}</span></p>
              <p className="text-xs text-bark/40">Change your password</p>
            </div>
          </div>
          {!showPwForm && (
            <button
              onClick={() => setShowPwForm(true)}
              className="px-3 py-1.5 text-sm font-medium text-gold border border-gold/30 rounded-lg hover:bg-gold/5 transition-colors cursor-pointer"
            >
              Change Password
            </button>
          )}
        </div>

        {showPwForm && (
          <form onSubmit={handleChangePassword} className="mt-4 space-y-3">
            {pwError && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{pwError}</div>
            )}
            {pwSuccess && (
              <div className="bg-green-50 text-green-600 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4" /> Password changed successfully
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-bark/60 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={pwForm.current_password}
                  onChange={(e) => setPwForm({ ...pwForm, current_password: e.target.value })}
                  className="w-full px-3 py-2 border border-bark/20 rounded-lg text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-bark/60 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={pwForm.new_password}
                  onChange={(e) => setPwForm({ ...pwForm, new_password: e.target.value })}
                  className="w-full px-3 py-2 border border-bark/20 rounded-lg text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-bark/60 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={pwForm.confirm_password}
                  onChange={(e) => setPwForm({ ...pwForm, confirm_password: e.target.value })}
                  className="w-full px-3 py-2 border border-bark/20 rounded-lg text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={pwSaving}
                className="px-4 py-2 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {pwSaving ? 'Saving...' : 'Update Password'}
              </button>
              <button
                type="button"
                onClick={() => { setShowPwForm(false); setPwError(''); setPwForm({ current_password: '', new_password: '', confirm_password: '' }); }}
                className="px-4 py-2 bg-bark/10 text-bark rounded-lg text-sm font-medium hover:bg-bark/20 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
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
