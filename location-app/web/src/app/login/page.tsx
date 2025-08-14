"use client";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuth";
import Toast from "@/components/Toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuthStore();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      console.log("Login successful, token saved:", res.data.token);
      router.push("/map");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-[80vh] w-full grid place-items-center">
      <form onSubmit={submit} className="w-full max-w-sm p-6 bg-white border rounded space-y-3">
        <div className="text-xl font-bold">Login</div>
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-black text-white py-2 rounded">Login</button>
        <div className="text-sm">No account? <a className="underline" href="/register">Register</a></div>
      </form>
      <Toast show={!!error} type="error" message={error} onClose={()=>setError("")} />
    </div>
  );
}
