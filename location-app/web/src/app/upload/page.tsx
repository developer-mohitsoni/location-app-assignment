"use client";

import Protected from "@/components/Protected";
import { useState } from "react";
import { api } from "@/lib/api";
import Toast from "@/components/Toast";
import { useLocations } from "@/store/useLocations";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const { addMany } = useLocations();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setOk(false); setErr("");
    if (!file) { setErr("Please select a ZIP file"); return; }
    const fd = new FormData();
    fd.append("file", file);
    try {
      // Replace this with your actual method of retrieving the token, e.g. from localStorage or context
      const token = localStorage.getItem("token") || "";
      const res = await api.post("/locations/upload", fd, { headers: { 
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`
      } 
    });
      setOk(true);
      addMany(res.data.locations);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Upload failed");
    }
  }

  return (
    <Protected>
      <form onSubmit={submit} className="max-w-lg p-6 bg-white border rounded space-y-3">
        <div className="text-xl font-semibold">Upload Locations (.zip)</div>
        <input type="file" accept=".zip" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
        <button className="px-4 py-2 rounded bg-black text-white">Upload</button>
        <div className="text-sm text-gray-600">
          The ZIP must contain exactly one <code>.txt</code> file in the format:<br/>
          <code>Name, Latitude, Longitude</code>
        </div>
      </form>
      <Toast message="Upload successful" show={ok} onClose={()=>setOk(false)} />
      <Toast message={err} type="error" show={!!err} onClose={()=>setErr("")} />
    </Protected>
  );
}
