
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Monitor } from 'lucide-react';
import { getPcsAction } from '@/app/actions/dbActions';
import { Pc } from '@/utils/storage';
import { toast } from 'sonner';

interface SelectPCDialogProps {
  labId: string;
  studentName: string;
  subjectName: string;
  onClose: () => void;
  onSubmit: (pcId: string) => void;
}

export default function SelectPCDialog({ labId, studentName, subjectName, onClose, onSubmit }: SelectPCDialogProps) {
  const [availablePcs, setAvailablePcs] = useState<Pc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPcId, setSelectedPcId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPcs = async () => {
      setLoading(true);
      try {
        const allPcs = await getPcsAction();
        // Assuming 'available' status is what we need. 
        // A more robust system might check against active attendance sessions.
        const labPcs = allPcs.filter(pc => pc.labId === labId && pc.status === 'available');
        setAvailablePcs(labPcs);
      } catch (error) {
        toast.error("Failed to load available PCs.");
        onClose();
      } finally {
        setLoading(false);
      }
    };
    fetchPcs();
  }, [labId, onClose]);

  const handleSubmit = () => {
    if (!selectedPcId) {
      toast.warning("Please select a PC for the student.");
      return;
    }
    onSubmit(selectedPcId);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign PC for Lab Session</DialogTitle>
          <DialogDescription>
            A lab is reserved for <strong>{subjectName}</strong>. Please select the PC that <strong>{studentName}</strong> will be using.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : availablePcs.length === 0 ? (
            <p className="text-center text-muted-foreground">No available PCs found in this lab.</p>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-60 overflow-y-auto pr-2">
              {availablePcs.map(pc => (
                <Button
                  key={pc.id}
                  variant={selectedPcId === pc.id ? 'default' : 'outline'}
                  className="flex flex-col h-20"
                  onClick={() => setSelectedPcId(pc.id)}
                >
                  <Monitor className="h-6 w-6 mb-1" />
                  <span className="font-bold">PC {pc.pcNumber}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!selectedPcId || loading}>
            Confirm Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
