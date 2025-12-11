import { useState } from "react";
import { Eye, EyeOff, Phone, Lock, User, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

type AuthMode = "login" | "register" | "otp" | "forgot";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"seeker" | "recruiter" | "admin">("seeker");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);

  const handleLogin = () => {
    // Mock login - navigate to home
    navigate("/");
  };

  const handleRegister = () => {
    setMode("otp");
    // Start countdown
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
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-4">
        {mode !== "login" && (
          <button 
            onClick={() => setMode(mode === "otp" ? "register" : "login")}
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
          <p className="text-muted-foreground mt-1">Find your dream job easily</p>
        </div>

        {/* Login Form */}
        {mode === "login" && (
          <div className="space-y-4">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

            <button 
              onClick={() => setMode("forgot")}
              className="text-sm text-primary font-medium"
            >
              Forgot Password?
            </button>

            <Button onClick={handleLogin} className="w-full" size="lg">
              Login
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="text-center">
              <span className="text-muted-foreground">Don't have an account? </span>
              <button 
                onClick={() => setMode("register")}
                className="text-primary font-semibold"
              >
                Register
              </button>
            </div>
          </div>
        )}

        {/* Register Form */}
        {mode === "register" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-6">Create Account</h2>
            
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-12"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

            {/* Role Selector */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">I am a...</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "seeker", label: "Job Seeker" },
                  { id: "recruiter", label: "Recruiter" },
                  { id: "admin", label: "Admin" },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id as typeof role)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                      role === r.id
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
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}

        {/* OTP Verification */}
        {mode === "otp" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">Verify OTP</h2>
              <p className="text-muted-foreground">
                Enter the 6-digit code sent to<br />
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
                  className="w-12 h-14 text-center text-xl font-bold border-2 border-input rounded-xl focus:border-primary focus:outline-none transition-colors"
                />
              ))}
            </div>

            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-muted-foreground">
                  Resend code in <span className="text-primary font-semibold">{countdown}s</span>
                </p>
              ) : (
                <button className="text-primary font-semibold">Resend Code</button>
              )}
            </div>

            <Button 
              onClick={handleVerifyOtp} 
              className="w-full" 
              size="lg"
              disabled={otp.some(d => !d)}
            >
              Verify
            </Button>
          </div>
        )}

        {/* Forgot Password */}
        {mode === "forgot" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground mb-2">Reset Password</h2>
            <p className="text-muted-foreground mb-6">
              Enter your phone number and we'll send you a code to reset your password.
            </p>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-12"
              />
            </div>

            <Button onClick={() => setMode("otp")} className="w-full" size="lg">
              Send Reset Code
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
