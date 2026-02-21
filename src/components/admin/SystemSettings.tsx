
"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Save, Plus, Pencil, Trash2, Building } from 'lucide-react';
import { getSettingsAction, updateSettingsAction, getRoomsAction, addRoomAction, updateRoomAction, deleteRoomAction, getLabsAction, addLabAction, updateLabAction, deleteLabAction } from "@/app/actions/dbActions";
import { Room, Lab } from '@/utils/storage';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function SystemSettings() {
  const [teacherCode, setTeacherCode] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);

  const [isRoomDialogOpen, setRoomDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
  const [roomFormData, setRoomFormData] = useState({ name: '', capacity: '' });

  const [isLabDialogOpen, setLabDialogOpen] = useState(false);
  const [editingLab, setEditingLab] = useState<Lab | null>(null);
  const [labToDelete, setLabToDelete] = useState<Lab | null>(null);
  const [labFormData, setLabFormData] = useState({ name: '', capacity: '' });


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const settings = await getSettingsAction();
      setTeacherCode(settings.teacherSecret || '');
      setRooms(await getRoomsAction());
      setLabs(await getLabsAction());
    } catch(e) {
      toast.error("Failed to load settings");
    }
  };

  const handleSaveSettings = async () => {
    await updateSettingsAction({ teacherSecret: teacherCode });
    toast.success('Settings saved successfully!');
  };

  // Room Handlers
  const handleOpenRoomDialog = (room: Room | null) => {
    setEditingRoom(room);
    setRoomFormData(room ? { name: room.name, capacity: room.capacity.toString() } : { name: '', capacity: '' });
    setRoomDialogOpen(true);
  };

  const handleSaveRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomFormData.name || !roomFormData.capacity) {
      toast.error("Room name and capacity are required.");
      return;
    }

    try {
      if (editingRoom) {
        await updateRoomAction(editingRoom.id, {
          name: roomFormData.name,
          capacity: parseInt(roomFormData.capacity, 10),
        });
        toast.success("Room updated successfully.");
      } else {
        await addRoomAction({
          id: `ROOM-${Date.now()}`,
          name: roomFormData.name,
          capacity: parseInt(roomFormData.capacity, 10),
        });
        toast.success("Room added successfully.");
      }
      setRoomDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Failed to save room.");
    }
  };

  const handleDeleteRoom = async () => {
    if (!roomToDelete) return;
    try {
      await deleteRoomAction(roomToDelete.id);
      toast.success("Room deleted successfully.");
      setRoomToDelete(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete room.");
    }
  };

  // Lab Handlers
  const handleOpenLabDialog = (lab: Lab | null) => {
    setEditingLab(lab);
    setLabFormData(lab ? { name: lab.name, capacity: lab.capacity.toString() } : { name: '', capacity: '' });
    setLabDialogOpen(true);
  };

  const handleSaveLab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labFormData.name || !labFormData.capacity) {
      toast.error("Lab name and capacity are required.");
      return;
    }

    try {
      if (editingLab) {
        await updateLabAction(editingLab.id, {
          name: labFormData.name,
          capacity: parseInt(labFormData.capacity, 10),
        });
        toast.success("Lab updated successfully. PC count adjusted.");
      } else {
        await addLabAction({
          id: `LAB-${Date.now()}`,
          name: labFormData.name,
          capacity: parseInt(labFormData.capacity, 10),
        });
        toast.success("Lab and its PCs have been added successfully.");
      }
      setLabDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Failed to save lab.");
    }
  };

  const handleDeleteLab = async () => {
    if (!labToDelete) return;
    try {
      await deleteLabAction(labToDelete.id);
      toast.success("Lab and all associated PCs deleted successfully.");
      setLabToDelete(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete lab.");
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl mb-2">System Settings</h2>
      <p className="text-gray-600 mb-8">Configure system preferences and manage rooms/labs</p>

      {/* Teacher Code Setting */}
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 mb-6">
        <div>
          <label className="block text-sm mb-2 text-gray-700">
            Teacher Secret Code
          </label>
          <input
            type="text"
            value={teacherCode}
            onChange={(e) => setTeacherCode(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <p className="text-sm text-gray-500 mt-2">
            Code required for teacher registration
          </p>
        </div>

        <div className="pt-6">
          <button
            onClick={handleSaveSettings}
            className="w-full px-6 py-3 bg-[#b40000] text-white rounded-lg hover:bg-[#8b0000] flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Settings
          </button>
        </div>
      </div>

      {/* Room Management */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl flex items-center gap-2">
            <Building className="text-[#b40000]" />
            Manage Rooms
          </h3>
          <Button onClick={() => handleOpenRoomDialog(null)}><Plus size={18} /> Add Room</Button>
        </div>

        <div className="space-y-3">
          {rooms.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No rooms added yet</p>
          ) : (
            rooms.map((room) => (
              <div key={room.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-medium">{room.name}</p>
                  <p className="text-sm text-gray-600">Capacity: {room.capacity} students</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => handleOpenRoomDialog(room)} variant="outline" size="sm"><Pencil className="mr-2 h-3 w-3" /> Edit</Button>
                    <Button onClick={() => setRoomToDelete(room)} variant="destructive" size="sm"><Trash2 className="mr-2 h-3 w-3" /> Delete</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lab Management */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl flex items-center gap-2">
            <Building className="text-[#b40000]" />
            Manage Labs
          </h3>
          <Button onClick={() => handleOpenLabDialog(null)}><Plus size={18} /> Add Lab</Button>
        </div>

        <div className="space-y-3">
          {labs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No labs added yet</p>
          ) : (
            labs.map((lab) => (
              <div key={lab.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-medium">{lab.name}</p>
                  <p className="text-sm text-gray-600">Capacity: {lab.capacity} PCs</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => handleOpenLabDialog(lab)} variant="outline" size="sm"><Pencil className="mr-2 h-3 w-3" /> Edit</Button>
                    <Button onClick={() => setLabToDelete(lab)} variant="destructive" size="sm"><Trash2 className="mr-2 h-3 w-3" /> Delete</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Room Dialogs */}
      <Dialog open={isRoomDialogOpen} onOpenChange={setRoomDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveRoom} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="roomName">Room Name</Label>
              <Input id="roomName" value={roomFormData.name} onChange={e => setRoomFormData({ ...roomFormData, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomCapacity">Capacity</Label>
              <Input id="roomCapacity" type="number" value={roomFormData.capacity} onChange={e => setRoomFormData({ ...roomFormData, capacity: e.target.value })} required />
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
              <Button type="submit">Save Room</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={!!roomToDelete} onOpenChange={() => setRoomToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the room <span className="font-bold">{roomToDelete?.name}</span>.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRoom} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Lab Dialogs */}
      <Dialog open={isLabDialogOpen} onOpenChange={setLabDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLab ? 'Edit Lab' : 'Add New Lab'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveLab} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="labName">Lab Name</Label>
              <Input id="labName" value={labFormData.name} onChange={e => setLabFormData({ ...labFormData, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="labCapacity">Capacity (PCs)</Label>
              <Input id="labCapacity" type="number" value={labFormData.capacity} onChange={e => setLabFormData({ ...labFormData, capacity: e.target.value })} required />
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
              <Button type="submit">Save Lab</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!labToDelete} onOpenChange={() => setLabToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the lab <span className="font-bold">{labToDelete?.name}</span> and all associated PCs.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLab} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
