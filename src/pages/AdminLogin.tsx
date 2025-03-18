import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("adminAuth", "true"); // Save auth state
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/admin/dashboard"); // Redirect to Admin Dashboard
    } catch (error) {
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">تسجيل دخول المسؤول</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full">تسجيل الدخول</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
