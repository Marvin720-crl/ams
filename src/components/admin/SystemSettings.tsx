"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Building2,
  Monitor,
} from "lucide-react";

import {
  getSettingsAction,
  updateSettingsAction,
  getRoomsAction,
  addRoomAction,
  updateRoomAction,
  deleteRoomAction,
  getLabsAction,
  addLabAction,
  updateLabAction,
  deleteLabAction,
} from "@/app/actions/dbActions";

import { Room, Lab } from "@/utils/storage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SystemSettings() {
  const [loading, setLoading] = useState(true);

  const [teacherCode, setTeacherCode] = useState("");

  const [rooms, setRooms] = useState<Room[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);

  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [roomDelete, setRoomDelete] = useState<Room | null>(null);

  const [editingLab, setEditingLab] = useState<Lab | null>(null);
  const [labDialogOpen, setLabDialogOpen] = useState(false);
  const [labDelete, setLabDelete] = useState<Lab | null>(null);

  const [roomName, setRoomName] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");

  const [labName, setLabName] = useState("");
  const [labCapacity, setLabCapacity] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      const settings = await getSettingsAction();
      setTeacherCode(settings.teacherSecret || "");

      const [roomsData, labsData] = await Promise.all([
        getRoomsAction(),
        getLabsAction(),
      ]);

      setRooms(roomsData);
      setLabs(labsData);
    } catch {
      toast.error("Failed to load settings");
    }

    setLoading(false);
  };

  /* -------------------------------
     SAVE TEACHER SECRET
  --------------------------------*/

  const saveSettings = async () => {
    try {
      await updateSettingsAction({ teacherSecret: teacherCode });
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  /* -------------------------------
     ROOM FUNCTIONS
  --------------------------------*/

  const openRoomDialog = (room: Room | null) => {
    setEditingRoom(room);
    setRoomName(room?.name || "");
    setRoomCapacity(room?.capacity?.toString() || "");
    setRoomDialogOpen(true);
  };

  const saveRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomName || !roomCapacity) {
      toast.error("Room name and capacity required");
      return;
    }

    try {
      if (editingRoom) {
        await updateRoomAction(editingRoom.id, {
          name: roomName,
          capacity: Number(roomCapacity),
        });
        toast.success("Room updated");
      } else {
        await addRoomAction({
          id: `ROOM-${Date.now()}`,
          name: roomName,
          capacity: Number(roomCapacity),
        });
        toast.success("Room created");
      }

      setRoomDialogOpen(false);
      loadData();
    } catch {
      toast.error("Failed to save room");
    }
  };

  const deleteRoom = async () => {
    if (!roomDelete) return;

    await deleteRoomAction(roomDelete.id);

    toast.success("Room deleted");

    setRoomDelete(null);
    loadData();
  };

  /* -------------------------------
     LAB FUNCTIONS
  --------------------------------*/

  const openLabDialog = (lab: Lab | null) => {
    setEditingLab(lab);
    setLabName(lab?.name || "");
    setLabCapacity(lab?.capacity?.toString() || "");
    setLabDialogOpen(true);
  };

  const saveLab = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!labName || !labCapacity) {
      toast.error("Lab name and capacity required");
      return;
    }

    try {
      if (editingLab) {
        await updateLabAction(editingLab.id, {
          name: labName,
          capacity: Number(labCapacity),
        });

        toast.success("Lab updated");
      } else {
        await addLabAction({
          id: `LAB-${Date.now()}`,
          name: labName,
          capacity: Number(labCapacity),
        });

        toast.success("Lab created with PCs");
      }

      setLabDialogOpen(false);
      loadData();
    } catch {
      toast.error("Failed to save lab");
    }
  };

  const deleteLab = async () => {
    if (!labDelete) return;

    await deleteLabAction(labDelete.id);

    toast.success("Lab deleted");

    setLabDelete(null);
    loadData();
  };

  /* -------------------------------
     LOADING
  --------------------------------*/

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">

      {/* HEADER */}

      <div>
        <h2 className="text-3xl font-bold">System Settings</h2>
        <p className="text-muted-foreground">
          Manage rooms, laboratories, and system configurations
        </p>
      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <StatCard title="Rooms" value={rooms.length} icon={Building2} />

        <StatCard title="Labs" value={labs.length} icon={Monitor} />

        <StatCard
          title="Total Capacity"
          value={
            rooms.reduce((a, b) => a + b.capacity, 0) +
            labs.reduce((a, b) => a + b.capacity, 0)
          }
          icon={Settings}
        />

        <StatCard
          title="Facilities"
          value={rooms.length + labs.length}
          icon={Building2}
        />

      </div>

      {/* TEACHER SECRET */}

      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">

        <div className="flex items-center gap-2 font-semibold">
          <Settings size={18} />
          Teacher Registration Code
        </div>

        <Input
          value={teacherCode}
          onChange={(e) => setTeacherCode(e.target.value)}
        />

        <Button onClick={saveSettings}>
          <Save size={16} className="mr-2" />
          Save Settings
        </Button>

      </div>

      {/* ROOMS */}

      <SectionCard title="Rooms" onAdd={() => openRoomDialog(null)}>

        {rooms.length === 0 && (
          <EmptyMessage text="No rooms created yet." />
        )}

        {rooms.map((room) => (
          <ItemRow
            key={room.id}
            name={room.name}
            subtitle={`Capacity: ${room.capacity} students`}
            onEdit={() => openRoomDialog(room)}
            onDelete={() => setRoomDelete(room)}
          />
        ))}

      </SectionCard>

      {/* LABS */}

      <SectionCard title="Laboratories" onAdd={() => openLabDialog(null)}>

        {labs.length === 0 && (
          <EmptyMessage text="No labs created yet." />
        )}

        {labs.map((lab) => (
          <ItemRow
            key={lab.id}
            name={lab.name}
            subtitle={`PC Capacity: ${lab.capacity}`}
            onEdit={() => openLabDialog(lab)}
            onDelete={() => setLabDelete(lab)}
          />
        ))}

      </SectionCard>

      {/* ROOM DELETE */}

      <ConfirmDialog
        open={!!roomDelete}
        title="Delete Room"
        description={`Delete ${roomDelete?.name}?`}
        onCancel={() => setRoomDelete(null)}
        onConfirm={deleteRoom}
      />

      {/* LAB DELETE */}

      <ConfirmDialog
        open={!!labDelete}
        title="Delete Laboratory"
        description={`Delete ${labDelete?.name} and all PCs?`}
        onCancel={() => setLabDelete(null)}
        onConfirm={deleteLab}
      />

      {/* ROOM FORM */}

      <FormDialog
        open={roomDialogOpen}
        title={editingRoom ? "Edit Room" : "Create Room"}
        name={roomName}
        capacity={roomCapacity}
        setName={setRoomName}
        setCapacity={setRoomCapacity}
        onSave={saveRoom}
        onClose={() => setRoomDialogOpen(false)}
      />

      {/* LAB FORM */}

      <FormDialog
        open={labDialogOpen}
        title={editingLab ? "Edit Lab" : "Create Lab"}
        name={labName}
        capacity={labCapacity}
        setName={setLabName}
        setCapacity={setLabCapacity}
        onSave={saveLab}
        onClose={() => setLabDialogOpen(false)}
      />

    </div>
  );
}

/* ---------------------------------------
   REUSABLE COMPONENTS
--------------------------------------- */

function StatCard({ title, value, icon: Icon }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm flex justify-between items-center">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Icon className="text-primary" />
    </div>
  );
}

function SectionCard({ title, children, onAdd }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Button onClick={onAdd}>
          <Plus size={16} className="mr-1" />
          Add
        </Button>
      </div>
      {children}
    </div>
  );
}

function ItemRow({ name, subtitle, onEdit, onDelete }: any) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border">

      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="flex gap-2">

        <Button size="sm" variant="outline" onClick={onEdit}>
          <Pencil size={14} />
        </Button>

        <Button size="sm" variant="destructive" onClick={onDelete}>
          <Trash2 size={14} />
        </Button>

      </div>

    </div>
  );
}

function EmptyMessage({ text }: any) {
  return (
    <div className="text-center text-gray-500 py-6">
      {text}
    </div>
  );
}

function ConfirmDialog({ open, title, description, onCancel, onConfirm }: any) {
  return (
    <AlertDialog open={open} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function FormDialog({
  open,
  title,
  name,
  capacity,
  setName,
  setCapacity,
  onSave,
  onClose,
}: any) {
  return (
    <Dialog open={open} onOpenChange={onClose}>

      <DialogContent>

        <form onSubmit={onSave}>

          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">

            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <Label>Capacity</Label>
              <Input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>

          </div>

          <DialogFooter>

            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>

            <Button type="submit">Save</Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  );
}