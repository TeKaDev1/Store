import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Check for the correct credentials
    if (username === "DKHIL" && password === "Mo090909") {
      localStorage.setItem("adminAuth", "true"); // Save login state
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/admin"); // Redirect to admin panel
    } else {
      toast.error("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">تسجيل دخول المسؤول</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            type="text" 
            placeholder="اسم المستخدم" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <Input 
            type="password" 
            placeholder="كلمة المرور" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <Button type="submit" className="w-full">تسجيل الدخول</Button>
        </form>
      </div>
    </div>
  );
};

export default
