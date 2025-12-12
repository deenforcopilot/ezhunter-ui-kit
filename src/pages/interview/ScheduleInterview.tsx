import { useState } from "react";
import { ChevronLeft, Calendar, Clock, Video, MapPin, User, Building2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns";
import { th } from "date-fns/locale";

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

const ScheduleInterview = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [interviewType, setInterviewType] = useState<"video" | "onsite">("video");
  const [isConfirming, setIsConfirming] = useState(false);

  const availableDates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i + 1));

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      navigate("/applicant/applications");
    }, 2000);
  };

  if (isConfirming) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 animate-scale-in">
          <Check className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">ยืนยันการนัดสำเร็จ!</h1>
        <p className="text-muted-foreground text-center mb-4">
          {selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: th })} เวลา {selectedTime} น.
        </p>
        <p className="text-sm text-muted-foreground text-center">
          กำลังนำคุณกลับไปยังหน้างานที่สมัคร...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">นัดสัมภาษณ์</h1>
            <p className="text-sm text-muted-foreground">เลือกวันเวลาที่สะดวก</p>
          </div>
        </div>
      </header>

      {/* Job Info */}
      <div className="px-4 py-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Senior Software Engineer</h3>
              <p className="text-sm text-muted-foreground">Tech Corp Thailand</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>สัมภาษณ์กับ: คุณสมชาย (HR Manager)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Type */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-foreground mb-3">รูปแบบการสัมภาษณ์</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setInterviewType("video")}
            className={`p-4 rounded-xl border-2 transition-all ${
              interviewType === "video"
                ? "border-primary bg-primary/5"
                : "border-border bg-card"
            }`}
          >
            <Video className={`w-6 h-6 mb-2 ${interviewType === "video" ? "text-primary" : "text-muted-foreground"}`} />
            <p className={`font-medium ${interviewType === "video" ? "text-primary" : "text-foreground"}`}>
              Video Call
            </p>
            <p className="text-xs text-muted-foreground mt-1">สัมภาษณ์ผ่านแอป</p>
          </button>
          <button
            onClick={() => setInterviewType("onsite")}
            className={`p-4 rounded-xl border-2 transition-all ${
              interviewType === "onsite"
                ? "border-primary bg-primary/5"
                : "border-border bg-card"
            }`}
          >
            <MapPin className={`w-6 h-6 mb-2 ${interviewType === "onsite" ? "text-primary" : "text-muted-foreground"}`} />
            <p className={`font-medium ${interviewType === "onsite" ? "text-primary" : "text-foreground"}`}>
              Onsite
            </p>
            <p className="text-xs text-muted-foreground mt-1">ไปสัมภาษณ์ที่บริษัท</p>
          </button>
        </div>
      </div>

      {/* Date Selection */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-3">เลือกวันที่</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {availableDates.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`flex-shrink-0 w-16 p-3 rounded-xl border-2 transition-all text-center ${
                selectedDate?.toDateString() === date.toDateString()
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              <p className="text-xs text-muted-foreground">
                {format(date, "EEE", { locale: th })}
              </p>
              <p className={`text-xl font-bold ${
                selectedDate?.toDateString() === date.toDateString() ? "text-primary" : "text-foreground"
              }`}>
                {format(date, "d")}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(date, "MMM", { locale: th })}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold text-foreground mb-3">เลือกเวลา</h2>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 rounded-xl border-2 transition-all ${
                  selectedTime === time
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {selectedDate && selectedTime && (
        <div className="px-4 py-4">
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
            <h3 className="font-semibold text-foreground mb-3">สรุปการนัดหมาย</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-foreground">
                  {format(selectedDate, "EEEE d MMMM yyyy", { locale: th })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-foreground">{selectedTime} น.</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {interviewType === "video" ? (
                  <Video className="w-4 h-4 text-primary" />
                ) : (
                  <MapPin className="w-4 h-4 text-primary" />
                )}
                <span className="text-foreground">
                  {interviewType === "video" ? "สัมภาษณ์ผ่าน Video Call" : "สัมภาษณ์ที่บริษัท"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <Button 
          onClick={handleConfirm} 
          className="w-full" 
          size="lg"
          disabled={!selectedDate || !selectedTime}
        >
          ยืนยันการนัดสัมภาษณ์
        </Button>
      </div>
    </div>
  );
};

export default ScheduleInterview;
