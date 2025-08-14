"use client";

import { useEffect } from 'react';

export default function Toast({ message, type='success', show, onClose }: { message: string; type?: 'success'|'error'; show: boolean; onClose: () => void }) {
  useEffect(() => { if (show) { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); } }, [show, onClose]);
  if (!show) return null;
  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow ${type==='success'?'bg-green-600':'bg-red-600'} text-white`}>{message}</div>
  );
}
