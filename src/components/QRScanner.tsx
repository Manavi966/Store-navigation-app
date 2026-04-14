"use client";

import { useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { X } from "lucide-react";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose?: () => void;
}

export default function QRScanner({ onScanSuccess, onClose }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const regionId = "qr-reader";

  useEffect(() => {
    // Delay slightly to ensure element is in DOM
    const timer = setTimeout(() => {
      scannerRef.current = new Html5QrcodeScanner(
        regionId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          rememberLastUsedCamera: true,
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          if (scannerRef.current) {
            scannerRef.current.clear().catch(console.error);
          }
          onScanSuccess(decodedText);
        },
        (error) => {
          // ignore scan errors
        }
      );
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="w-full glass-card p-6 rounded-3xl relative overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/50 backdrop-blur flex items-center justify-center hover:bg-background/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <h3 className="text-xl font-semibold mb-4 text-center">Scan QR Code</h3>
        <div id={regionId} className="w-full rounded-xl overflow-hidden [&_video]:rounded-xl [&_video]:object-cover" />
      </div>
    </div>
  );
}
