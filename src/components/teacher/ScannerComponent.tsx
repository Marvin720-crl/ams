"use client";

import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Camera, X, Smartphone } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

interface ScannerComponentProps {
  onScan: (decodedText: string) => void;
  mode: "in" | "out";
}

export function ScannerComponent({ onScan, mode }: ScannerComponentProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const readerId = useRef(`qr-reader-${Math.random().toString(36).substring(2, 9)}`);

  // Handle scanner cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  // Initialize and start scanner once the container element is rendered
  useEffect(() => {
    let isMounted = true;

    if (isScanning) {
      const startScanner = async () => {
        // Wait for next tick to ensure DOM is updated and readerId element exists
        await new Promise(resolve => setTimeout(resolve, 200));
        
        if (!isMounted) return;

        try {
          const element = document.getElementById(readerId.current);
          if (!element) {
            throw new Error(`Element with id ${readerId.current} not found`);
          }

          const html5QrCode = new Html5Qrcode(readerId.current);
          scannerRef.current = html5QrCode;

          // Requesting permission implicitly via start
          await html5QrCode.start(
            { facingMode: "environment" }, // Prioritize rear camera for mobile
            { 
              fps: 15, 
              qrbox: { width: 280, height: 280 },
              aspectRatio: 1.0
            },
            (decodedText) => {
              onScan(decodedText);
              stopScan();
              toast.success("Identity Captured Successfully");
            },
            () => {} // frame error listener (ignore noise)
          );
          
          setHasCameraPermission(true);
          toast.info("Camera Active: Align QR Code in frame");
        } catch (err) {
          console.error("Scanner error:", err);
          setHasCameraPermission(false);
          setIsScanning(false);
          toast.error("Camera Access Denied or Hardware Busy");
        }
      };

      startScanner();
    }

    return () => {
      isMounted = false;
    };
  }, [isScanning]);

  const startScan = () => {
    setIsScanning(true);
  };

  const stopScan = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Stop error:", err);
      }
    }
    setIsScanning(false);
  };

  return (
    <div className="w-full space-y-4">
      {!isScanning ? (
        <div className="space-y-4">
          <Button 
            onClick={startScan} 
            variant="outline" 
            className="w-full h-40 border-dashed border-4 border-primary/20 flex flex-col gap-4 hover:bg-primary/5 hover:border-primary/40 rounded-[2.5rem] group transition-all"
          >
            <div className="p-5 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110">
              <Camera className="h-10 w-10" />
            </div>
            <div className="text-center">
              <span className="block font-black uppercase tracking-widest text-xs text-muted-foreground group-hover:text-primary">Activate Camera Scanner</span>
              <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tighter mt-1 flex items-center justify-center gap-1">
                <Smartphone className="h-3 w-3" /> Optimized for Mobile
              </span>
            </div>
          </Button>
          
          {hasCameraPermission === false && (
            <Alert variant="destructive" className="rounded-2xl border-destructive/20 bg-destructive/5 animate-in fade-in slide-in-from-top-2">
              <AlertTitle className="font-black uppercase tracking-widest text-xs">Permission Required</AlertTitle>
              <AlertDescription className="text-xs font-medium">
                Please tap "Allow" when the browser asks for camera access. If you already denied it, you may need to reset site permissions in your browser settings.
              </AlertDescription>
            </Alert>
          )}
        </div>
      ) : (
        <div className="relative animate-in fade-in zoom-in-95 duration-300">
          <div 
            id={readerId.current} 
            className="w-full rounded-[3rem] overflow-hidden border-8 border-primary/10 aspect-square bg-black shadow-3xl relative"
          >
            {/* Corner Markers for UI Feel */}
            <div className="absolute top-10 left-10 w-10 h-10 border-t-4 border-l-4 border-primary/50 rounded-tl-xl z-20 pointer-events-none" />
            <div className="absolute top-10 right-10 w-10 h-10 border-t-4 border-r-4 border-primary/50 rounded-tr-xl z-20 pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-10 h-10 border-b-4 border-l-4 border-primary/50 rounded-bl-xl z-20 pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-10 h-10 border-b-4 border-r-4 border-primary/50 rounded-br-xl z-20 pointer-events-none" />
          </div>
          
          <Button 
            onClick={stopScan} 
            size="icon"
            className="absolute -top-4 -right-4 bg-primary text-white rounded-full shadow-2xl border-4 border-white h-12 w-12 z-30"
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 px-6">
            <div className="bg-primary/90 backdrop-blur-xl text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.25em] shadow-2xl border border-white/20 text-center flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Scanning: Align Digital ID
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
