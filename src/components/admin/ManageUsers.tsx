
"use client";
import React, { useState, useEffect } from 'react';
import { getUsersAction, addUserAction, deleteUserAction } from "@/app/actions/dbActions";
import { User } from '@/utils/storage';
import { Search, Trash2, PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '../ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add User Modal State
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', id: '', email: '', password: '', role: 'student' as User['role'] });
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirmation State
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsersAction();
      setUsers(data);
      setError(null);
    } catch (err: any) {
      setError("Failed to load users. Please try again later.");
      toast.error("Failed to load users.", { description: err.message || "Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.id || !newUser.password || !newUser.role) {
      toast.error("Missing Fields", { description: "Please fill out all fields." });
      return;
    }
    setIsSaving(true);
    try {
      await addUserAction({ ...newUser, profilePic: '' });
      toast.success("User created successfully.");
      // Reset form and close modal
      setNewUser({ name: '', id: '', email: '', password: '', role: 'student' });
      setAddUserModalOpen(false);
      loadUsers(); // Refresh the list
    } catch (err: any) {
      toast.error("Error creating user", { description: err.message || "An unknown error occurred." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteUserAction(userToDelete.id);
      toast.success(`User ${userToDelete.name} has been deleted.`);
      setUserToDelete(null); // Close the dialog
      loadUsers(); // Refresh the list
    } catch (err: any) {
        toast.error("Error deleting user", { description: err.message || "An unknown error occurred." });
        setUserToDelete(null);
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
            <h2 className="text-3xl mb-2">Manage Users</h2>
            <p className="text-gray-600">View and manage all system users</p>
        </div>
        <Dialog open={isAddUserModalOpen} onOpenChange={setAddUserModalOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4"/>Add User</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleAddNewUser}>
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="id" className="text-right">USN / EMP ID</Label>
                            <Input id="id" value={newUser.id} onChange={(e) => setNewUser({...newUser, id: e.target.value})} className="col-span-3" placeholder="e.g. 2000123456" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="col-span-3" placeholder="e.g. John Doe" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="col-span-3" placeholder="e.g. john@school.edu" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">Password</Label>
                            <Input id="password" type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">Role</Label>
                            <Select value={newUser.role} onValueChange={(v: User['role']) => setNewUser({...newUser, role: v})}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="teacher">Teacher</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
				    <SelectItem value="library_admin">Library Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save User'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or USN..."
            className="w-full pl-10 pr-4 py-3 border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">USN/EMP</th>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Role</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                        user.role === 'teacher' ? 'bg-blue-100 text-blue-800' : 
			  user.role === 'library_admin' ? 'bg-purple-100 text-purple-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                        <Button variant="ghost" size="icon" onClick={() => setUserToDelete(user)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the user <span className="font-bold">{userToDelete?.name}</span>.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
