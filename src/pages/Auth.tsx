import { useState } from "react";
import { Eye, EyeOff, Lock, User, ArrowRight, ChevronLeft, Building2, Users, Mail, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { toast } from "sonner";

type AuthMode = "login" | "register" | "recruiter-login" | "otp" | "forgot";

const Auth = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);

  // Mock recruiter credentials (ในระบบจริงจะตรวจสอบจาก backend)
  const validRecruiterCredentials = [
    { username: "recruiter001", password: "pass001" },
    { username: "recruiter002", password: "pass002" },
  ];

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setRole("applicant");
    toast.success("เข้าสู่ระบบสำเร็จ");
    navigate("/");
  };

  const handleRecruiterLogin = () => {
    if (!username || !password) {
      toast.error("กรุณากรอก username และ password");
      return;
    }
    
    const isValid = validRecruiterCredentials.some(
      (cred) => cred.username === username && cred.password === password
    );

    if (isValid) {
      setRole("recruiter");
      toast.success("เข้าสู่ระบบสำเร็จ");
      navigate("/recruiter/dashboard");
    } else {
      toast.error("Username หรือ Password ไม่ถูกต้อง กรุณาติดต่อบริษัท");
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      toast.error("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setMode("otp");
    setCountdown(60);
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
    setRole("applicant");
    toast.success("สมัครสมาชิกสำเร็จ");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-4">
        {mode !== "login" && (
          <button 
            onClick={() => {
              if (mode === "otp") setMode("register");
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

        {/* Login Form - ผู้สมัครงานทั่วไป */}
        {mode === "login" && (
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-background text-muted-foreground">หรือ</span>
              </div>
            </div>

            {/* Recruiter Login Button */}
            <button
              onClick={() => setMode("recruiter-login")}
              className="w-full p-4 rounded-xl border-2 border-accent bg-accent/5 hover:bg-accent/10 transition-colors flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-foreground">เข้าสู่ระบบ Recruiter</p>
                <p className="text-sm text-muted-foreground">สำหรับผู้ที่ได้รับ username/password จากบริษัท</p>
              </div>
              <ChevronLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
            </button>
          </div>
        )}

        {/* Recruiter Login Form */}
        {mode === "recruiter-login" && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-3 bg-accent rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground">เข้าสู่ระบบ Recruiter</h2>
              <p className="text-muted-foreground text-sm mt-1">ใช้ Username และ Password ที่ได้รับจากบริษัท</p>
            </div>
            
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-12"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            <div className="bg-secondary/50 rounded-xl p-4 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">หมายเหตุ:</span> หากยังไม่มี Username/Password กรุณาติดต่อฝ่ายบุคคลของบริษัทเพื่อขอข้อมูลการเข้าสู่ระบบ
              </p>
            </div>

            <Button onClick={handleRecruiterLogin} className="w-full" size="lg">
              เข้าสู่ระบบ Recruiter
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Register Form - ผู้สมัครงานทั่วไป */}
        {mode === "register" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-2">สร้างบัญชีใหม่</h2>
            <p className="text-muted-foreground text-sm mb-6">สำหรับผู้ที่ต้องการค้นหางานและอัพโหลด Resume</p>
            
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
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                <span className="text-foreground font-medium">{email}</span>
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
              กรอกอีเมลของคุณ แล้วเราจะส่งรหัสสำหรับรีเซ็ตรหัสผ่าน
            </p>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
