import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/admin/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">لوحة تحكم المسؤول</h1>
      <Button onClick={handleLogout} className="bg-red-500 text-white">تسجيل الخروج</Button>
      <p className="mt-4">إحصائيات الطلبات والزيارات ستظهر هنا لاحقًا.</p>
    </div>
  );
};

export default AdminDashboard;
