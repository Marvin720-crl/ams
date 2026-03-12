"use client";

import React, { useState, useEffect } from "react";
import {
  getUsersAction,
  addUserAction,
  deleteUserAction,
} from "@/app/actions/dbActions";

import { User } from "@/utils/storage";

import {
  Search,
  Trash2,
  PlusCircle,
  Download,
  Loader2,
} from "lucide-react";

import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function ManageUsers() {

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    id: "",
    email: "",
    password: "",
    role: "student",
  });

  const [isSaving, setIsSaving] = useState(false);

  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsersAction();
      setUsers(data);
    } catch (err: any) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     ADD USER
  ----------------------------- */

  const handleAddNewUser = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!newUser.name || !newUser.id || !newUser.password || !newUser.role) {
      toast.error("Please fill out required fields");
      return;
    }

    setIsSaving(true);

    try {

      await addUserAction({
        ...newUser,
        profilePic: "",
      } as User);

      toast.success("User created");

      setNewUser({
        name: "",
        id: "",
        email: "",
        password: "",
        role: "student",
      });

      setAddUserModalOpen(false);

      loadUsers();

    } catch (err: any) {
      toast.error("Error creating user");
    }

    setIsSaving(false);
  };

  /* -----------------------------
     DELETE USER
  ----------------------------- */

  const handleDeleteUser = async () => {

    if (!userToDelete) return;

    try {

      await deleteUserAction(userToDelete.id);

      toast.success(`Deleted ${userToDelete.name}`);

      setUserToDelete(null);

      loadUsers();

    } catch {
      toast.error("Delete failed");
    }
  };

  /* -----------------------------
     FILTERING
  ----------------------------- */

  const filteredUsers = users.filter((u) => {

    const searchMatch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase());

    const roleMatch =
      roleFilter === "All" || u.role === roleFilter;

    return searchMatch && roleMatch;
  });

  /* -----------------------------
     PAGINATION
  ----------------------------- */

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* -----------------------------
     EXPORT CSV
  ----------------------------- */

  const exportCSV = () => {

    if (!filteredUsers.length) return;

    const rows = filteredUsers.map((u) => ({
      ID: u.id,
      Name: u.name,
      Email: u.email,
      Role: u.role,
    }));

    const csv =
      Object.keys(rows[0]).join(",") +
      "\n" +
      rows.map((r) => Object.values(r).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "users.csv";

    a.click();
  };

  /* -----------------------------
     STATS
  ----------------------------- */

  const totalUsers = users.length;
  const students = users.filter((u) => u.role === "student").length;
  const teachers = users.filter((u) => u.role === "teacher").length;
  const admins = users.filter((u) => u.role === "admin").length;

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold">Manage Users</h2>
          <p className="text-gray-500">
            View and manage system users
          </p>
        </div>

        <div className="flex gap-3">

          <Button onClick={exportCSV} variant="outline">
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>

          <Dialog
            open={isAddUserModalOpen}
            onOpenChange={setAddUserModalOpen}
          >

            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>

            <DialogContent>

              <form onSubmit={handleAddNewUser}>

                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">

                  <Input
                    placeholder="USN / EMP ID"
                    value={newUser.id}
                    onChange={(e) =>
                      setNewUser({ ...newUser, id: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Full Name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />

                  <Input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        password: e.target.value,
                      })
                    }
                  />

                  <Select
                    value={newUser.role}
                    onValueChange={(v: any) =>
                      setNewUser({ ...newUser, role: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="student">
                        Student
                      </SelectItem>
                      <SelectItem value="teacher">
                        Teacher
                      </SelectItem>
                      <SelectItem value="admin">
                        Admin
                      </SelectItem>
                      <SelectItem value="library_admin">
                        Library Admin
                      </SelectItem>
                    </SelectContent>

                  </Select>

                </div>

                <DialogFooter>

                  <DialogClose asChild>
                    <Button variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button type="submit">
                    {isSaving ? "Saving..." : "Create"}
                  </Button>

                </DialogFooter>

              </form>

            </DialogContent>

          </Dialog>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-gray-50 p-4 rounded-lg">
          Total Users
          <div className="text-2xl font-bold">
            {totalUsers}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          Students
          <div className="text-2xl font-bold">
            {students}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          Teachers
          <div className="text-2xl font-bold">
            {teachers}
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          Admins
          <div className="text-2xl font-bold">
            {admins}
          </div>
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="relative flex-1">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />

        </div>

        <Select
          value={roleFilter}
          onValueChange={(v) => setRoleFilter(v)}
        >

          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter role" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="All">
              All Roles
            </SelectItem>

            <SelectItem value="student">
              Student
            </SelectItem>

            <SelectItem value="teacher">
              Teacher
            </SelectItem>

            <SelectItem value="admin">
              Admin
            </SelectItem>

            <SelectItem value="library_admin">
              Library Admin
            </SelectItem>

          </SelectContent>

        </Select>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan={4} className="text-center p-8">
                  <Loader2 className="animate-spin mx-auto" />
                </td>
              </tr>
            )}

            {!loading &&
              paginatedUsers.map((user) => (

                <tr key={user.id} className="border-t">

                  <td className="px-6 py-4">{user.id}</td>

                  <td className="px-6 py-4">{user.name}</td>

                  <td className="px-6 py-4 capitalize">
                    {user.role.replace("_", " ")}
                  </td>

                  <td className="px-6 py-4">

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setUserToDelete(user)}
                    >
                      <Trash2 className="text-red-500" />
                    </Button>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="flex justify-between">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      )}

      {/* DELETE CONFIRM */}

      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >

        <AlertDialogContent>

          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete User
            </AlertDialogTitle>

            <AlertDialogDescription>
              This will permanently delete{" "}
              <b>{userToDelete?.name}</b>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600"
            >
              Delete
            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

    </div>
  );
}