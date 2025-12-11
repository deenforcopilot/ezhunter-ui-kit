import { useState } from "react";
import { Eye, EyeOff, Phone, Lock, User, ArrowRight, ChevronLeft, Building2, Users, Briefcase, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useRole, UserRole } from "@/contexts/RoleContext";

type AuthMode = "login" | "register" | "otp" | "forgot" | "role-select";

const roleOptions = [
  { 
    id: "applicant" as UserRole, 
    label: "ผู้สมัครงาน", 
    icon: User,
    description: "ค้นหาและสมัครงานที่ใช่" 
  },
  { 
    id: "recruiter" as UserRole, 
    label: "ฟรีแลนซ์รีครูทเตอร์", 
    icon: Users,
    description: "รับงานสรรหาบุคลากร" 
  },
  { 
    id: "client" as UserRole, 
    label: "บริษัท/ลูกค้า", 
    icon: Building2,
    description: "ลงประกาศหาพนักงาน" 
  },
  { 
    id: "admin" as UserRole, 
    label: "ผู้ดูแลระบบ", 
    icon: Shield,
    description: "จัดการระบบทั้งหมด" 
  },
];

const Auth = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("applicant");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);

  const handleLogin = () => {
    setMode("role-select");
  };

  const handleRoleSelect = () => {
    setRole(selectedRole);
    navigate("/");
  };

  const handleRegister = () => {
    setMode("otp");
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    setRole(selectedRole);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-4">
        {mode !== "login" && (
          <button 
            onClick={() => {
              if (mode === "role-select") setMode("login");
              else if (mode === "otp") setMode("register");
              else setMode("login");
            }}
            className="p-2 hover:bg-secondary rounded-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 points-banner rounded-2xl flex items-center justify-center">
            <span className="text-3xl font-bold text-primary-foreground">Ez</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">EzHunter</h1>
          <p className="text-muted-foreground mt-1">ค้นหางานในฝันของคุณได้ง่ายๆ</p>
        </div>

        {/* Login Form */}
        {mode === "login" && (
          <div className="space-y-4">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="เบอร์โทรศัพท์"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-12"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>

            <button 
              onClick={() => setMode("forgot")}
              className="text-sm text-primary font-medium"
            >
              ลืมรหัสผ่าน?
            </button>

            <Button onClick={handleLogin} className="w-full" size="lg">
              เข้าสู่ระบบ
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="text-center">
              <span className="text-muted-foreground">ยังไม่มีบัญชี? </span>
              <button 
                onClick={() => setMode("register")}
                className="text-primary font-semibold"
              >
                สมัครสมาชิก
              </button>
            </div>
          </div>
        )}

        {/* Role Selection */}
        {mode === "role-select" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-2">เลือกประเภทผู้ใช้</h2>
            <p className="text-muted-foreground mb-6">กรุณาเลือกบทบาทของคุณในระบบ</p>
            
            <div className="space-y-3">
              {roleOptions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    selectedRole === r.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedRole === r.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    <r.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{r.label}</p>
                    <p className="text-sm text-muted-foreground">{r.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <Button onClick={handleRoleSelect} className="w-full mt-6" size="lg">
              เริ่มต้นใช้งาน
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Register Form */}
        {mode === "register" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-6">สร้างบัญชีใหม่</h2>
            
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ชื่อ-นามสกุล"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-12"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="เบอร์โทรศัพท์"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-12"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>

            {/* Role Selector */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">ฉันเป็น...</p>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.slice(0, 4).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    className={`py-3 px-3 rounded-xl text-sm font-medium transition-colors ${
                      selectedRole === r.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleRegister} className="w-full" size="lg">
              ดำเนินการต่อ
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              การสมัครสมาชิก หมายความว่าคุณยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว
            </p>
          </div>
        )}

        {/* OTP Verification */}
        {mode === "otp" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">ยืนยัน OTP</h2>
              <p className="text-muted-foreground">
                กรอกรหัส 6 หลักที่ส่งไปยัง<br />
                <span className="text-foreground font-medium">{phone}</span>
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-bold border-2 border-input rounded-xl focus:border-primary focus:outline-none transition-colors bg-background"
                />
              ))}
            </div>

            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-muted-foreground">
                  ส่งรหัสใหม่ใน <span className="text-primary font-semibold">{countdown} วินาที</span>
                </p>
              ) : (
                <button className="text-primary font-semibold">ส่งรหัสอีกครั้ง</button>
              )}
            </div>

            <Button 
              onClick={handleVerifyOtp} 
              className="w-full" 
              size="lg"
              disabled={otp.some(d => !d)}
            >
              ยืนยัน
            </Button>
          </div>
        )}

        {/* Forgot Password */}
        {mode === "forgot" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-2">รีเซ็ตรหัสผ่าน</h2>
            <p className="text-muted-foreground mb-6">
              กรอกเบอร์โทรศัพท์ของคุณ แล้วเราจะส่งรหัสสำหรับรีเซ็ตรหัสผ่าน
            </p>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="เบอร์โทรศัพท์"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-12"
              />
            </div>

            <Button onClick={() => setMode("otp")} className="w-full" size="lg">
              ส่งรหัสรีเซ็ต
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
