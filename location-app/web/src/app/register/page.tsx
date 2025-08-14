"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Toast from "@/components/Toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/auth/register", { email, password });
      setMsg("Registered! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1000);
    } catch (e: any) {
      setMsg(e?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-[80vh] w-full grid place-items-center">
      <form onSubmit={submit} className="w-full max-w-sm p-6 bg-white border rounded space-y-3">
        <div className="text-xl font-bold">Register</div>
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-black text-white py-2 rounded">Create account</button>
        <div className="text-sm">Have an account? <a className="underline" href="/login">Login</a></div>
      </form>
      <Toast show={!!msg} type={msg.includes("Registered!")?"success":"error"} message={msg} onClose={()=>setMsg("")} />
    </div>
  );
}
