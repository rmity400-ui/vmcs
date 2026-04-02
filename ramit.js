import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Users, Clock, BarChart3, Bell, Search, PlayCircle, 
  CheckCircle2, XCircle, LayoutDashboard, Smartphone, ChevronRight, 
  ChevronLeft, User as UserIcon, GraduationCap, LogOut, Settings, 
  HelpCircle, Cpu, Database, AlertTriangle, Send, MessageSquare, MessageCircle,
  Plus, Edit2, Trash2, X, Facebook, FileText as FileTextIcon, 
  UploadCloud, Lock as LockIcon, AlertOctagon, Youtube, 
  Music2, TrendingUp, Info, Download, Award, Calendar, 
  ClipboardList, ShieldCheck, Bot, Sparkles, RefreshCw, 
  Type as TypeIcon, PenLine, Monitor as MonitorIcon, Code as CodeIcon, 
  Layers, Zap, Lightbulb, Radio as RadioIcon, ToggleRight, History as HistoryIcon 
} from 'lucide-react';

// អនុគមន៍សម្រាប់ហៅ Gemini API
const callGemini = async (prompt, systemInstruction = "អ្នកគឺជាគ្រូបង្រៀន AI ដ៏ឆ្លាតវៃម្នាក់ប្រចាំវិទ្យាល័យស្ដៅសន្តិភាព។ សូមឆ្លើយតបជាភាសាខ្មែរប្រកបដោយភាពរួសរាយរាក់ទាក់។", retries = 5) => {
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const delays = [1000, 2000, 4000, 8000, 16000];

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            if (i === retries - 1) {
                return "សុំទោស មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ប្រព័ន្ធ AI។ សូមព្យាយាមម្ដងទៀតនៅពេលក្រោយ។ 😔";
            }
            await new Promise(resolve => setTimeout(resolve, delays[i]));
        }
    }
};

// --- Styles ---
const fontStyles = `
@import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&family=Siemreap&display=swap');

@keyframes schoolRainbow {
  0% { color: #ef4444; } 14% { color: #f59e0b; } 28% { color: #22c55e; }
  42% { color: #06b6d4; } 56% { color: #3b82f6; } 70% { color: #6366f1; }
  84% { color: #a855f7; } 100% { color: #ef4444; }
}

@keyframes floatAnimation {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes glowPulse {
  0% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
  100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
}

.font-muol { font-family: 'Khmer OS Muol Light', 'Moul', serif; line-height: 1.6; }
.font-siemreap { font-family: 'Siemreap', sans-serif; line-height: 1.8; }
.animate-school-rainbow { animation: schoolRainbow 10s infinite linear; }
.animate-float { animation: floatAnimation 4s ease-in-out infinite; }
.login-input-glow:focus-within { animation: glowPulse 2s infinite; }

body { font-family: 'Siemreap', sans-serif; background-color: #f8fafc; }

.pie-today {
  width: 140px; height: 140px; border-radius: 50%;
  background: conic-gradient(#22c55e 0% 93.6%, #f59e0b 93.6% 97.5%, #ef4444 97.5% 100%);
  display: flex; align-items: center; justify-content: center; position: relative;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
}
.pie-inner {
  width: 90px; height: 90px; background: white; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}

/* BLOB BUTTON CSS ANIMATION */
.buttons-container {
  margin-top: 20px;
  text-align: center;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.blob-btn {
  z-index: 1;
  position: relative;
  padding: 16px 32px;
  text-align: center;
  text-transform: uppercase;
  color: #3b82f6; 
  font-size: 15px;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  border: none;
  transition: color 0.5s;
  cursor: pointer;
  border-radius: 30px;
  font-family: 'Khmer OS Muol Light', 'Moul', serif;
  display: flex;
  align-items: center;
  gap: 8px;
}
.blob-btn:before {
  content: ""; z-index: 1; position: absolute; left: 0; top: 0; width: 100%; height: 100%; 
  border: 2px solid #3b82f6; border-radius: 30px;
}
.blob-btn:after {
  content: ""; z-index: -2; position: absolute; left: 3px; top: 3px; width: 100%; height: 100%; 
  transition: all 0.3s 0.2s; border-radius: 30px;
}
.blob-btn:hover, .blob-btn.active { color: #FFFFFF; }
.blob-btn:hover:after, .blob-btn.active:after { transition: all 0.3s; left: 0; top: 0; border-radius: 30px; }
.blob-btn__inner {
  z-index: -1; overflow: hidden; position: absolute; left: 0; top: 0; width: 100%; height: 100%; 
  border-radius: 30px; background: #ffffff;
}
.blob-btn__blobs {
  position: relative; display: block; height: 100%; filter: url('#goo');
}
.blob-btn__blob {
  position: absolute; top: 2px; width: 25%; height: 100%; background: #3b82f6; 
  border-radius: 100%; transform: translate3d(0,150%,0) scale(1.7); transition: transform 0.45s;
}
@supports(filter: url('#goo')) {
  .blob-btn__blob { transform: translate3d(0,150%,0) scale(1.4); }
}
.blob-btn__blob:nth-child(1) { left: 0%; transition-delay: 0s; }
.blob-btn__blob:nth-child(2) { left: 30%; transition-delay: 0.08s; }
.blob-btn__blob:nth-child(3) { left: 60%; transition-delay: 0.16s; }
.blob-btn__blob:nth-child(4) { left: 90%; transition-delay: 0.24s; }
.blob-btn:hover .blob-btn__blob, .blob-btn.active .blob-btn__blob { transform: translateZ(0) scale(1.7); }
@supports(filter: url('#goo')) {
  .blob-btn:hover .blob-btn__blob, .blob-btn.active .blob-btn__blob { transform: translateZ(0) scale(1.4); }
}

/* BUBBLE BACK BUTTON CSS (Light Version) */
.bubble-back-btn {
  position: relative;
  padding: 10px 22px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  color: #475569;
  cursor: pointer;
  background-color: #ffffff;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Khmer OS Muol Light', 'Moul', serif;
  font-size: 13px;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.bubble-back-btn:active {
  transform: scale(0.96);
}

.bubble-back-btn:before,
.bubble-back-btn:after {
  position: absolute; content: ""; width: 150%; left: 50%; height: 100%;
  transform: translateX(-50%); z-index: -1000; background-repeat: no-repeat;
}

.bubble-back-btn:hover {
  color: #3b82f6; border-color: #bfdbfe; background-color: #f8fafc; box-shadow: 0 4px 15px rgba(59,130,246,0.1);
}

.bubble-back-btn:hover:before {
  top: -70%;
  background-image: radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, transparent 20%, #93c5fd 20%, transparent 30%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #93c5fd 15%, transparent 20%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
  background-position: 50% 120%;
  animation: lighttopBubbles 0.6s ease;
}

@keyframes lighttopBubbles {
  0% { background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%; }
  50% { background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%; }
  100% { background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%; background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%; }
}

.bubble-back-btn:hover::after {
  bottom: -70%;
  background-image: radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #93c5fd 15%, transparent 20%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%),
    radial-gradient(circle, #93c5fd 20%, transparent 20%);
  background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
  background-position: 50% 0%;
  animation: lightbottomBubbles 0.6s ease;
}

@keyframes lightbottomBubbles {
  0% { background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%; }
  50% { background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%; }
  100% { background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%; background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%; }
}

/* MODERN SIMPLE TAB BUTTONS */
.modern-tab-btn {
  position: relative;
  padding: 12px 28px;
  border-radius: 14px;
  font-family: 'Khmer OS Muol Light', 'Moul', serif;
  font-size: 14px;
  color: #64748b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.modern-tab-btn:hover {
  color: #3b82f6;
  background: #ffffff;
  border-color: #bfdbfe;
  box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}
.modern-tab-btn.active {
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border-color: transparent;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}
.modern-tab-btn:active {
  transform: translateY(0);
}
`;

// --- Global Data & Components ---
const SocialLinks = () => (
  <div className="flex flex-col items-center gap-1.5 font-siemreap">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">(ទំនាក់ទំនង៖)</span>
    <div className="flex items-center gap-2">
      <a href="https://web.facebook.com/Youth.VMC.SdaoSantepheap" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Facebook size={16} /></a>
      <a href="https://www.youtube.com/@SdaoSantepheap/videos" target="_blank" rel="noopener noreferrer" className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm"><Youtube size={16} /></a>
      <a href="https://t.me/SdoaSantepheapHighSchool" target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-50 text-sky-500 rounded-full hover:bg-sky-500 hover:text-white transition-all shadow-sm"><Send size={16} /></a>
      <a href="https://www.tiktok.com/@sdoasantepheaphighschool" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 text-slate-900 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Music2 size={16} /></a>
    </div>
  </div>
);

const LogoGenZ = ({ size = "h-10" }) => (
  <div className={`inline-flex items-center justify-center ${size} w-auto overflow-hidden rounded-lg bg-black/5 p-1`}>
     <div className="text-[10px] font-bold text-blue-600 px-1 font-siemreap">GZ</div>
  </div>
);

const SharedFooter = () => (
  <footer className="py-12 bg-white/80 backdrop-blur-md border-t border-gray-200/50 text-center space-y-4 shadow-inner mt-10 rounded-[3rem] font-siemreap overflow-hidden px-4">
    <div className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] leading-relaxed">រៀបចំ និងបង្កើតដោយ យុវជន VMC <span className="font-muol text-[11px] align-middle animate-school-rainbow">វិទ្យាល័យ ស្ដៅសន្តិភាព</span> ឆ្នាំ២០២៦</div>
    <div className="text-xl animate-footer-color uppercase tracking-tighter font-bold flex items-center justify-center gap-3">
      <LogoGenZ size="h-10" />
      <a href="https://web.facebook.com/Youth.VMC.SdaoSantepheap" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform" style={{animation: "schoolRainbow 10s infinite linear"}}>
        GEN Z DIGITAL INNOVATION
      </a>
    </div>
    <div className="text-gray-400 text-[10px] font-medium italic tracking-wide max-w-2xl mx-auto leading-relaxed font-siemreap">Innovating Today, Building Smart Tomorrow. ច្នៃប្រឌិតថ្ងៃនេះ កសាងភាពឆ្លាតវៃនៅថ្ងៃស្អែក។</div>
  </footer>
);

const logs = [
  { id: 1, name: 'សុខ វិសាល', time: '07:15:22 ព្រឹក', status: 'វត្តមាន', uid: '93 A2 4B 12' },
  { id: 2, name: 'ចាន់ ស្រីមុំ', time: '07:18:05 ព្រឹក', status: 'វត្តមាន', uid: '22 C4 88 F1' },
  { id: 3, name: 'ហេង តុលា', time: '07:45:10 ព្រឹក', status: 'យឺត', uid: '55 BB 12 D4' },
  { id: 4, name: 'លី ម៉េង', time: '07:12:00 ព្រឹក', status: 'វត្តមាន', uid: 'AA 11 22 33' },
];

const weeklyData = [
  { day: 'ចន្ទ', percent: 98, m: 830, f: 935, color: 'bg-indigo-500' },
  { day: 'អង្គារ', percent: 97, m: 820, f: 925, color: 'bg-emerald-500' },
  { day: 'ពុធ', percent: 95, m: 805, f: 910, color: 'bg-amber-500' },
  { day: 'ព្រហស្បតិ៍', percent: 99, m: 845, f: 940, color: 'bg-rose-500' },
  { day: 'សុក្រ', percent: 93, m: 780, f: 895, color: 'bg-sky-500' },
  { day: 'សៅរ៍', percent: 86, m: 720, f: 825, color: 'bg-violet-500' },
  { day: 'អាទិត្យ', percent: 66, m: 550, f: 630, color: 'bg-slate-400' },
];

const generalSubjects = [
  { id: 1, name: 'គណិតវិទ្យា', icon: '📐', bgTag: 'bg-blue-100', textTag: 'text-blue-600' },
  { id: 2, name: 'រូបវិទ្យា', icon: '⚡', bgTag: 'bg-orange-100', textTag: 'text-orange-600' },
  { id: 3, name: 'គីមីវិទ្យា', icon: '🧪', bgTag: 'bg-green-100', textTag: 'text-green-600' },
  { id: 4, name: 'ជីវវិទ្យា', icon: '🧬', bgTag: 'bg-emerald-100', textTag: 'text-emerald-600' },
  { id: 5, name: 'គេហវិទ្យា', icon: '🏠', bgTag: 'bg-rose-100', textTag: 'text-rose-600' },
  { id: 6, name: 'ផែនដីវិទ្យា', icon: '🌍', bgTag: 'bg-amber-100', textTag: 'text-amber-600' },
  { id: 7, name: 'ភូមិវិទ្យា', icon: '🗺️', bgTag: 'bg-teal-100', textTag: 'text-teal-600' },
  { id: 8, name: 'ប្រវត្តិវិទ្យា', icon: '🏛️', bgTag: 'bg-stone-100', textTag: 'text-stone-600' },
  { id: 9, name: 'ភាសាខ្មែរ', icon: '📝', bgTag: 'bg-purple-100', textTag: 'text-purple-600' },
  { id: 10, name: 'ភាសាអង់គ្លេស', icon: '🔤', bgTag: 'bg-red-100', textTag: 'text-red-600' },
  { id: 11, name: 'បំណិនជីវិត', icon: '🤝', bgTag: 'bg-cyan-100', textTag: 'text-cyan-600' },
  { id: 12, name: 'អប់រំកាយ និងសុខភាព', icon: '🏃', bgTag: 'bg-lime-100', textTag: 'text-lime-600' },
  { id: 13, name: 'សីលធម៌ និងពលរដ្ឋ', icon: '⚖️', bgTag: 'bg-indigo-100', textTag: 'text-indigo-600' },
];

const arduinoIntroList = [
  { id: 'history', title: 'ប្រវត្តិរបស់ Arduino', Icon: HistoryIcon },
  { id: 'what_is_ide', title: 'តើ Arduino IDE ជាអ្វី?', Icon: MonitorIcon },
  { id: 'programming', title: 'តើ Arduino អាចធ្វើអ្វីបានខ្លះក្នុងផ្នែក Programming?', Icon: CodeIcon },
  { id: 'types', title: 'ប្រភេទរបស់ Arduino តួនាទី និង Board ផ្សេងៗ', Icon: Layers },
];

const arduinoComponentsList = [
  { en: 'Arduino Board', kh: 'បន្ទះសៀគ្វី Arduino (Board)', Icon: Database },
  { en: 'USB Cable', kh: 'ខ្សែ USB', Icon: Zap },
  { en: 'Breadboard', kh: 'បន្ទះដោតសៀគ្វី (Breadboard)', Icon: Layers },
  { en: 'Jumper Wires', kh: 'ខ្សែចម្លងអគ្គិសនី', Icon: CodeIcon },
  { en: 'LED', kh: 'អំពូល LED (Light Emitting Diode)', Icon: Lightbulb },
  { en: 'Resistor', kh: 'រេស៊ីស្តង់ (Resistor)', Icon: MonitorIcon },
  { en: 'Push Button', kh: 'ប៊ូតុងចុច (Push Button)', Icon: ToggleRight },
  { en: 'Sensor', kh: 'សេនស័រ (Sensor)', Icon: RadioIcon },
  { en: 'Potentiometer', kh: 'ប៉ូតង់ស្យូម៉ែត្រ (Potentiometer)', Icon: Settings },
  { en: 'Servo Motor', kh: 'ម៉ូទ័រស៊ែវ៉ូ (Servo Motor)', Icon: RefreshCw },
  { en: 'LCD Display', kh: 'អេក្រង់បង្ហាញ (LCD Display)', Icon: MonitorIcon },
];

const arduinoPart3List = [
  { title: 'ការដំឡើង និងភ្ជាប់ Arduino', Icon: Download },
  { title: 'អំពី Arduino IDE', Icon: MonitorIcon },
  { title: 'ការភ្ជាប់ Arduino ទៅកុំព្យូទ័រ', Icon: Zap },
  { title: 'កម្មវិធីសម្រាប់សរសេរកូដ និង Upload ទៅ Board', Icon: UploadCloud },
];

const arduinoPart4List = [
  { title: 'កូដដំបូងបង្អស់ (Hello World)', Icon: CodeIcon },
  { title: 'ទស្សនទូទៅអំពីកូដ Arduino', Icon: BookOpen },
  { title: 'ពន្យល់អំពី setup() និង loop()', Icon: RefreshCw },
  { title: 'ពន្យល់អំពីការធ្វើឱ្យអំពូលភ្លឺលោត (Blink LED)', Icon: Lightbulb },
  { title: 'លទ្ធផលនៃការតេស្ត Blink LED', Icon: PlayCircle },
  { title: 'ការ Upload កូដទៅកាន់ Board', Icon: UploadCloud },
  { title: 'ការបង្ហាញសារជោគជ័យ (Message Success)', Icon: CheckCircle2 },
  { title: 'បញ្ហាទូទៅ និងដំណោះស្រាយ', Icon: AlertTriangle },
];

const arduinoPart5List = [
  { title: 'ការបង្កើតគម្រោងសាមញ្ញៗ (Simple Projects)', Icon: Layers },
];

// --- GENERATE MOCK STUDENTS FUNCTION ---
const generateMockStudents = (count) => {
  const firstNames = ['សុខ', 'ចាន់', 'ហេង', 'លី', 'ដារ៉ា', 'មករា', 'ស្រីនាថ', 'កក្កដា', 'សោភា', 'វិបុល', 'រតនា', 'ពិសិដ្ឋ', 'កញ្ញា', 'ចរិយា', 'សុវណ្ណ'];
  const lastNames = ['វិសាល', 'ស្រីមុំ', 'តុលា', 'ម៉េង', 'វិចិត្រ', 'សុខា', 'ហ៊ាង', 'ម៉ៅ', 'លី', 'ហេង', 'សម្បត្តិ', 'សិរី', 'រិទ្ធី', 'បញ្ញា', 'ឧត្តម'];
  const grades = ['១០A', '១០B', '១០C', '១១A', '១១B', '១១C', '១២A', '១២B', '១២C'];
  const genders = ['ប្រុស', 'ស្រី'];

  const mock = [];
  for (let i = 1; i <= count; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const grade = grades[Math.floor(Math.random() * grades.length)];
    const uid = Array.from({length: 4}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()).join(' ');
    
    mock.push({
      id: i,
      name: `${fName} ${lName}`,
      gender: gender,
      grade: grade,
      uid: uid,
      absent: Math.floor(Math.random() * 8), 
      notified: false
    });
  }
  
  mock.unshift({ id: 0, name: 'សុខ វិសាល', gender: 'ប្រុស', grade: '១២A', uid: '93 A2 4B 12', absent: 5, notified: false });
  return mock;
};

const initialStudents = generateMockStudents(1500);

export default function App() {
  // --- States ---
  const [currentAppMode, setCurrentAppMode] = useState('selection'); 
  const [activeRole, setActiveRole] = useState(null); 
  const [userRole, setUserRole] = useState('student'); 
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  
  const [studentUsername, setStudentUsername] = useState('');
  const [studentUID, setStudentUID] = useState('');

  const [adminView, setAdminView] = useState('dashboard');
  const [studentTab, setStudentTab] = useState('home');
  const [isSending, setIsSending] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [msgPlatform, setMsgPlatform] = useState('telegram');
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showForcedAlert, setShowForcedAlert] = useState(false);
  const [highRiskStudents, setHighRiskStudents] = useState([]);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loggedInStudent, setLoggedInStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const [selectedGrade, setSelectedGrade] = useState('');
  const [gradeCategory, setGradeCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLessonType, setSelectedLessonType] = useState('');
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
  const [historyViewMode, setHistoryViewMode] = useState('text');

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
      { role: 'ai', text: 'សួស្ដី! ខ្ញុំគឺជាគ្រូជំនួយ AI ប្រចាំវិទ្យាល័យស្ដៅសន្តិភាព។ តើអ្នកមានសំណួរអ្វីទាក់ទងនឹងមេរៀនដែរឬទេ? ✨' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [generatedExercise, setGeneratedExercise] = useState('');
  const [isExerciseLoading, setIsExerciseLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Large Data State ---
  const [students, setStudents] = useState(initialStudents);

  const attendanceStats = [
    { name: 'សិស្សសរុប', count: students.length, m: Math.floor(students.length * 0.48), f: Math.ceil(students.length * 0.52), color: 'text-blue-600', bg: 'bg-blue-100', Icon: Users },
    { name: 'មកដល់ថ្ងៃនេះ', count: Math.floor(students.length * 0.93), m: Math.floor(students.length * 0.44), f: Math.floor(students.length * 0.49), color: 'text-green-600', bg: 'bg-green-100', Icon: CheckCircle2 },
    { name: 'អវត្តមាន', count: Math.floor(students.length * 0.03), m: Math.floor(students.length * 0.015), f: Math.floor(students.length * 0.015), color: 'text-red-600', bg: 'bg-red-100', Icon: XCircle },
    { name: 'យឺតយ៉ាវ', count: Math.floor(students.length * 0.04), m: Math.floor(students.length * 0.02), f: Math.floor(students.length * 0.02), color: 'text-yellow-600', bg: 'bg-yellow-100', Icon: Clock },
  ];

  // --- Effects ---
  useEffect(() => {
    if (userRole === 'admin' && adminView === 'dashboard') {
      const riskyList = students.filter(s => s.absent >= 5 && !s.notified);
      if (riskyList.length > 0) {
        setHighRiskStudents(riskyList.slice(0, 10)); 
        setShowForcedAlert(true);
      }
    }
  }, [adminView, userRole, students]);

  useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  // SAFE FILTERING
  const filteredStudents = students.filter(s => 
    (s?.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
    (s?.uid || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    (s?.grade || '').toLowerCase().includes((searchQuery || '').toLowerCase())
  );
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  // --- Handlers ---
  const handleSendChatMessage = async () => {
      if (!chatInput.trim() || isChatLoading) return;
      const newMessages = [...chatMessages, { role: 'user', text: chatInput }];
      setChatMessages(newMessages);
      setChatInput('');
      setIsChatLoading(true);
      const aiResponse = await callGemini(chatInput);
      setChatMessages([...newMessages, { role: 'ai', text: aiResponse }]);
      setIsChatLoading(false);
  };

  const handleGenerateExercise = async () => {
      setIsExerciseLoading(true);
      setGeneratedExercise('');
      const prompt = `សូមបង្កើតលំហាត់សាកល្បងថ្មីៗចំនួន ៣ សំណួរ សម្រាប់មុខវិជ្ជា ${selectedSubject} ថ្នាក់ទី ${(selectedGrade || '').replace('ថ្នាក់ទី ', '')}។ សូមបង្ហាញទាំងសំណួរ និងចម្លើយ (ចម្លើយដាក់នៅផ្នែកខាងក្រោម) ព្រមទាំងមានការពន្យល់ខ្លីៗ។`;
      const result = await callGemini(prompt, "អ្នកគឺជាអ្នកជំនាញចេញវិញ្ញាសា និងលំហាត់ដ៏ចំណានប្រចាំវិទ្យាល័យ។ សូមរៀបចំទម្រង់អត្ថបទឱ្យងាយអាន។");
      setGeneratedExercise(result);
      setIsExerciseLoading(false);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
        }, 600);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') { 
      setActiveRole('admin');
      setUserRole('admin'); 
      setCurrentAppMode('app');
      setAdminLoginError('');
    } else {
      setAdminLoginError('លេខសម្ងាត់មិនត្រឹមត្រូវទេ!');
    }
  };

  const selectStudentRole = () => {
    setActiveRole('student');
    setUserRole('student'); 
    setCurrentAppMode('student_login');
  };

  const handleLogoutRole = () => {
    setActiveRole(null);
    setCurrentAppMode('selection');
    setIsStudentLoggedIn(false);
    setLoggedInStudent(null);
    setAdminPassword('');
    setStudentUsername('');
    setStudentUID('');
    setLoginError('');
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    const student = students.find(s => s.name === studentUsername && s.uid === studentUID);
    if (student) {
      setIsStudentLoggedIn(true);
      setLoggedInStudent(student);
      setLoginError('');
      setStudentTab('home'); 
      setCurrentAppMode('app');
    } else {
      setLoginError('ឈ្មោះ ឬលេខសម្គាល់មិនត្រឹមត្រូវទេ!');
    }
  };

  const handleSendTelegram = () => {
    setIsSending(true);
    setTimeout(() => { 
      setIsSending(false); 
      setShowMsgModal(false); 
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 1500);
  };
  
  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setStudents(prev => prev.map(s => 
          s.id === loggedInStudent?.id ? { ...s, profilePic: base64String } : s
        ));
        setLoggedInStudent(prev => ({ ...prev, profilePic: base64String }));
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBulkForcedSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setShowForcedAlert(false);
      const notifiedIds = highRiskStudents.map(s => s.id);
      setStudents(prev => prev.map(s => notifiedIds.includes(s.id) ? {...s, notified: true} : s));
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 2000);
  };

  // ==========================================
  // SELECTION MODE VIEW
  // ==========================================
  if (currentAppMode === 'selection') {
    return (
      <div className="min-h-screen flex items-center justify-center font-siemreap relative overflow-hidden" style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('ramit0000.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <style>{fontStyles}</style>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[3rem] shadow-2xl text-center max-w-2xl w-[90%] relative z-10 animate-in zoom-in duration-500">
          <div className="mb-10">
             <h1 className="text-3xl md:text-4xl font-muol text-white mb-4 drop-shadow-lg">វិទ្យាល័យស្ដៅសន្តិភាព</h1>
             <p className="text-blue-200 text-sm tracking-widest uppercase font-bold">ប្រព័ន្ធគ្រប់គ្រង និងសិក្សាឌីជីថល</p>
          </div>
          <h3 className="text-white text-lg mb-8 font-bold border-b border-white/20 pb-4">សូមជ្រើសរើសតួនាទីរបស់អ្នក</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => setCurrentAppMode('admin_login')} className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-400/30 p-8 rounded-[2rem] hover:bg-blue-600/40 hover:border-blue-400 transition-all duration-300 group relative overflow-hidden flex flex-col items-center gap-4">
              <div className="absolute inset-0 bg-blue-400/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10">
                <ShieldCheck size={40} className="text-white" />
              </div>
              <h4 className="text-xl font-bold font-siemreap text-white relative z-10">ផ្នែកគ្រប់គ្រង (Admin)</h4>
              <p className="text-xs text-blue-200 relative z-10">សម្រាប់គណៈគ្រប់គ្រងសាលា និងគ្រូ</p>
            </button>
            <button onClick={selectStudentRole} className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 p-8 rounded-[2rem] hover:bg-purple-600/40 hover:border-purple-400 transition-all duration-300 group relative overflow-hidden flex flex-col items-center gap-4">
              <div className="absolute inset-0 bg-purple-400/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10">
                <GraduationCap size={40} className="text-white" />
              </div>
              <h4 className="text-xl font-bold font-siemreap text-white relative z-10">ផ្នែកសិស្ស (Student)</h4>
              <p className="text-xs text-purple-200 relative z-10">សម្រាប់សិស្សានុសិស្សចូលរៀន</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // STUDENT LOGIN VIEW
  // ==========================================
  if (currentAppMode === 'student_login') {
    return (
      <div className="min-h-screen flex items-center justify-center font-siemreap relative overflow-hidden" style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('ramit0000.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <style>{fontStyles}</style>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px] animate-pulse"></div>
        
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[3rem] shadow-2xl max-w-md w-[90%] relative z-10 animate-in fade-in duration-300">
          <button onClick={() => setCurrentAppMode('selection')} className="absolute top-6 left-6 text-purple-200 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div className="text-center mb-8 pt-4">
            <div className="w-20 h-20 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-float border border-white/30">
              <GraduationCap size={40} className="text-white" />
            </div>
            <h2 className="font-muol text-white text-xl uppercase tracking-wide">ចូលរៀនឌីជីថល</h2>
            <p className="text-purple-200 text-xs mt-2">(សាកល្បង: User: <strong>សុខ វិសាល</strong>, Pass: <strong>93 A2 4B 12</strong>)</p>
          </div>
          
          <form onSubmit={handleStudentLogin} className="space-y-6">
            <div className="login-input-glow rounded-2xl transition-all">
              <label className="block text-purple-100 font-bold mb-2 text-[11px] uppercase tracking-[0.2em] ml-1">ឈ្មោះគណនី</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-3.5 text-purple-300" size={18} />
                <input 
                  type="text" value={studentUsername} onChange={(e) => setStudentUsername(e.target.value)} required 
                  className="w-full bg-white/10 border border-white/20 text-white rounded-2xl px-12 py-3.5 focus:ring-2 focus:ring-purple-400 focus:bg-white/20 outline-none text-sm transition-all placeholder-purple-200/50" 
                  placeholder="បញ្ចូលឈ្មោះសិស្ស..."
                />
              </div>
            </div>
            <div className="login-input-glow rounded-2xl transition-all">
              <label className="block text-purple-100 font-bold mb-2 text-[11px] uppercase tracking-[0.2em] ml-1">លេខសម្គាល់ (UID)</label>
              <div className="relative">
                <LockIcon className="absolute left-4 top-3.5 text-purple-300" size={18} />
                <input 
                  type="password" value={studentUID} onChange={(e) => setStudentUID(e.target.value)} required 
                  className="w-full bg-white/10 border border-white/20 text-white rounded-2xl px-12 py-3.5 focus:ring-2 focus:ring-purple-400 focus:bg-white/20 outline-none text-sm transition-all placeholder-purple-200/50" 
                  placeholder="បញ្ចូលលេខសម្គាល់..."
                />
              </div>
            </div>
            {loginError && (
              <div className="flex items-center gap-2 text-red-200 text-xs italic bg-red-500/20 p-3 rounded-xl border border-red-500/30 animate-in slide-in-from-top-2">
                <AlertTriangle size={14} /><p>{loginError}</p>
              </div>
            )}
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-purple-500/40 hover:opacity-90 active:scale-95 transition-all duration-200 text-sm uppercase tracking-wider mt-2 border border-purple-400/50">
              ចូលប្រព័ន្ធ (Login)
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // ADMIN LOGIN VIEW
  // ==========================================
  if (currentAppMode === 'admin_login') {
    return (
      <div className="min-h-screen flex items-center justify-center font-siemreap relative overflow-hidden" style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('ramit0000.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <style>{fontStyles}</style>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px]"></div>
        
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[3rem] shadow-2xl max-w-md w-[90%] relative z-10 animate-in fade-in duration-300">
          <button onClick={() => setCurrentAppMode('selection')} className="absolute top-6 left-6 text-blue-200 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div className="text-center mb-8 pt-4">
            <div className="w-20 h-20 bg-blue-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-float border border-white/30">
              <ShieldCheck size={40} className="text-white" />
            </div>
            <h2 className="font-muol text-white text-xl uppercase tracking-wide">ចូលប្រព័ន្ធគ្រប់គ្រង</h2>
            <p className="text-blue-200 text-xs mt-2">Admin Login</p>
          </div>
          
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="login-input-glow rounded-2xl transition-all">
              <label className="block text-blue-100 font-bold mb-2 text-[11px] uppercase tracking-[0.2em] ml-1">លេខសម្ងាត់ Admin</label>
              <div className="relative">
                <LockIcon className="absolute left-4 top-3.5 text-blue-300" size={18} />
                <input 
                  type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required 
                  className="w-full bg-white/10 border border-white/20 text-white rounded-2xl px-12 py-3.5 focus:ring-2 focus:ring-blue-400 focus:bg-white/20 outline-none text-sm transition-all placeholder-blue-200/50" 
                  placeholder="បញ្ចូលលេខសម្ងាត់..."
                />
              </div>
            </div>
            {adminLoginError && (
              <div className="flex items-center gap-2 text-red-200 text-xs italic bg-red-500/20 p-3 rounded-xl border border-red-500/30 animate-in slide-in-from-top-2">
                <AlertTriangle size={14} /><p>{adminLoginError}</p>
              </div>
            )}
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-500/40 hover:bg-blue-500 active:scale-95 transition-all duration-200 text-sm uppercase tracking-wider mt-2 border border-blue-400/50">
              ចូលប្រព័ន្ធ (Login)
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN APP COMPONENT RENDER
  // ==========================================

  const renderAdminDashboardView = () => {
    return (
      <div className="p-6 md:p-8 rounded-3xl min-h-[750px] shadow-sm flex flex-col gap-6 font-siemreap relative" style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.95)), url('ramit0000.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        {showForcedAlert && highRiskStudents.length > 0 && (
          <div className="fixed inset-0 z-[300] bg-red-950/80 backdrop-blur-md flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 border-4 border-red-500 animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
              <div className="text-center">
                 <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4"><AlertOctagon size={36} className="animate-bounce" /></div>
                 <h3 className="font-muol text-red-600 text-xl mb-4 uppercase">ការព្រមានកម្រិតខ្ពស់</h3>
                 <button onClick={handleBulkForcedSend} disabled={isSending} className="w-full py-5 rounded-[2rem] bg-red-600 text-white font-muol text-sm shadow-xl flex items-center justify-center gap-3 hover:bg-red-700 transition active:scale-95 mb-8">
                   {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Send size={20}/>}
                   ផ្ញើសារជូនដំណឹងទៅអាណាព្យាបាលទាំង {highRiskStudents.length} នាក់ តែម្ដង
                 </button>
                 <div className="bg-gray-50 rounded-2xl border border-gray-200 mb-4 overflow-hidden font-siemreap">
                    <div className="max-h-[180px] overflow-y-auto p-4 space-y-3">
                       {highRiskStudents.map((s, idx) => (
                         <div key={s.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 font-siemreap">
                               <div className="w-8 h-8 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-xs font-bold font-siemreap">{idx + 1}</div>
                               <div className="text-left font-siemreap"><p className="text-sm font-bold text-slate-800 leading-none">{s.name}</p><p className="text-[10px] text-gray-400 mt-1 uppercase">ថ្នាក់ {s.grade} • អវត្តមាន {s.absent} ដង</p></div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Admin Header - Clean UI */}
        <div className="flex justify-between items-center gap-4 font-siemreap bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm border border-gray-100 mb-2">
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-1 font-siemreap"><Database size={14} /> Cloud System Management</div>
              <h2 className="text-xl md:text-2xl font-muol animate-school-rainbow uppercase tracking-tighter leading-relaxed font-siemreap">វិទ្យាល័យ ស្ដៅសន្តិភាព</h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2 mb-2"></div>
            </div>
            <div className="hidden lg:flex gap-3 ml-8 border-l border-gray-200 pl-8">
              <button onClick={() => setAdminView('dashboard')} className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${adminView === 'dashboard' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105' : 'bg-transparent text-gray-500 hover:bg-slate-100 hover:scale-105'}`}><LayoutDashboard size={18}/> ទំព័រដើម</button>
              <button onClick={() => setAdminView('students')} className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${adminView === 'students' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105' : 'bg-transparent text-gray-500 hover:bg-slate-100 hover:scale-105'}`}><Users size={18}/> បញ្ជីសិស្ស</button>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0 font-siemreap">
            <SocialLinks />
          </div>
        </div>

        {/* Mobile View Nav */}
        <div className="flex lg:hidden gap-3 mb-2">
            <button onClick={() => setAdminView('dashboard')} className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${adminView === 'dashboard' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-200 shadow-sm'}`}><LayoutDashboard size={16}/> ទំព័រដើម</button>
            <button onClick={() => setAdminView('students')} className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${adminView === 'students' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-200 shadow-sm'}`}><Users size={16}/> បញ្ជីសិស្ស</button>
        </div>

        {adminView === 'dashboard' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-siemreap">
              {attendanceStats.map((stat, i) => {
                const StatIcon = stat.Icon;
                return (
                  <div key={i} className="bg-white/90 backdrop-blur p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
                    <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-sm`}><StatIcon size={24}/></div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase font-muol tracking-widest leading-none mb-1 font-siemreap">{stat.name}</p>
                      <h3 className="text-2xl font-black text-slate-800 leading-tight font-siemreap">{stat.count.toLocaleString()}</h3>
                      <p className="text-[9px] text-slate-400 mt-1 font-bold font-siemreap">ប្រុស: {stat.m} | ស្រី: {stat.f}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 font-siemreap">
              <div className="xl:col-span-3 bg-white/90 backdrop-blur rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col min-h-[400px]">
                <h4 className="font-muol text-lg text-slate-800 mb-8 font-siemreap">ស្ថិតិវត្តមានប្រចាំសប្តាហ៍ (%)</h4>
                <div className="h-64 flex items-end justify-between gap-4 px-4 relative mt-auto font-siemreap">
                  {weeklyData.map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer relative font-siemreap">
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-12 transition-all duration-300 bg-slate-800 text-white px-3 py-2 rounded-xl z-20 text-[9px] shadow-xl text-center font-siemreap font-siemreap">
                        <p className="font-bold border-b border-slate-600 mb-1 pb-1 font-siemreap">{data.percent}%</p>
                        <p className="font-siemreap">ប្រុស: {data.m} | ស្រី: {data.f}</p>
                      </div>
                      <div className={`${data.color} w-full rounded-t-2xl transition-all duration-1000 ease-out shadow-lg hover:brightness-110 flex flex-col items-center justify-start pt-2 font-siemreap`} style={{ height: `${data.percent}%` }}>
                         <span className="text-[10px] font-black text-white/90 font-siemreap">{data.percent}%</span>
                      </div>
                      <p className="mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-tighter font-siemreap">{data.day}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="xl:col-span-2 bg-white/90 backdrop-blur rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center font-siemreap">
                <h4 className="font-muol text-lg text-slate-800 w-full mb-6 font-siemreap">ស្ថានភាពសិស្សថ្ងៃនេះ</h4>
                <div className="pie-today my-6 font-siemreap">
                  <div className="pie-inner">
                    <p className="text-2xl font-black text-slate-800 font-siemreap">៩៣.៦%</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest font-siemreap">វត្តមាន</p>
                  </div>
                </div>
                <div className="w-full space-y-3 mt-4 font-siemreap">
                  {[
                    { label: 'វត្តមាន (Present)', m: 790, f: 895, p: '៩៣.៦%', color: 'bg-green-500' },
                    { label: 'យឺតយ៉ាវ (Late)', m: 35, f: 35, p: '៣.៩%', color: 'bg-yellow-500' },
                    { label: 'អវត្តមាន (Absent)', m: 25, f: 20, p: '២.៥%', color: 'bg-red-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50/80 rounded-2xl border border-gray-100 font-siemreap">
                      <div className="flex items-center gap-3">
                         <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm`}></div>
                         <div className="flex flex-col">
                           <span className="text-[11px] font-bold text-slate-700 font-siemreap">{item.label}</span>
                           <span className="text-[9px] text-gray-500 font-siemreap">ប្រុស: {item.m} | ស្រី: {item.f}</span>
                         </div>
                      </div>
                      <div className="text-right font-siemreap">
                         <span className="text-[11px] font-black text-slate-700 block font-siemreap font-siemreap">{item.m + item.f} នាក់</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-siemreap mt-2">
              <div className="lg:col-span-2 bg-white/90 backdrop-blur rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden min-h-[350px]">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white/50">
                  <h4 className="font-muol text-lg text-slate-800 flex items-center gap-2 font-siemreap">វត្តមានក្នុងពេលពិត (IoT Access)</h4>
                  <div className="text-[10px] bg-green-50 px-3 py-1 rounded-full font-bold text-green-600 uppercase tracking-widest animate-pulse font-siemreap">Online</div>
                </div>
                <div className="overflow-x-auto p-4 font-siemreap">
                  <table className="w-full text-sm font-siemreap font-siemreap">
                    <thead className="bg-gray-50/80 text-[10px] text-gray-500 uppercase font-bold tracking-[0.1em] font-siemreap font-siemreap">
                      <tr><th className="px-6 py-4 text-left font-siemreap">សិស្ស / UID</th><th className="px-6 py-4 text-left font-siemreap font-siemreap font-siemreap">ម៉ោង</th><th className="px-6 py-4 text-left font-siemreap">ស្ថានភាព</th><th className="px-6 py-4 text-right font-siemreap font-siemreap">សកម្មភាព</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {logs.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-50/50 transition group">
                          <td className="px-6 py-5"><div><p className="font-bold text-slate-800 text-sm leading-none mb-1 font-siemreap">{item.name}</p><p className="text-[10px] font-mono text-gray-500">{item.uid}</p></div></td>
                          <td className="px-6 py-5 text-slate-600 text-xs font-medium font-siemreap">{item.time}</td>
                          <td className="px-6 py-5 font-siemreap"><span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${item.status === 'វត្តមាន' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span></td>
                          <td className="px-6 py-5 text-right font-siemreap"><button onClick={() => { setEditingStudent({ name: item.name }); setShowMsgModal(true); }} className="p-2 bg-blue-50 text-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition"><Send size={14}/></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="lg:col-span-1 bg-slate-900/90 backdrop-blur text-white rounded-[2.5rem] p-8 shadow-xl border border-slate-700">
                 <h4 className="font-muol text-blue-400 text-sm uppercase mb-6 flex items-center gap-2 font-siemreap"><MessageSquare size={18} /> ប្រព័ន្ធទំនាក់ទំនង</h4>
                 <div className="flex gap-2 mb-6">
                   <button onClick={() => { setMsgPlatform('telegram'); setShowMsgModal(true); }} className="flex-1 bg-sky-500/20 border border-sky-500/50 text-sky-400 py-3 rounded-2xl text-[10px] font-bold hover:bg-sky-500/40 transition flex items-center justify-center gap-2 uppercase font-siemreap">
                     <Send size={14} /> Telegram
                   </button>
                   <button onClick={() => { setMsgPlatform('messenger'); setShowMsgModal(true); }} className="flex-1 bg-blue-500/20 border border-blue-500/50 text-blue-400 py-3 rounded-2xl text-[10px] font-bold hover:bg-blue-500/40 transition flex items-center justify-center gap-2 uppercase font-siemreap">
                     <MessageCircle size={14} /> Messenger
                   </button>
                 </div>
                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 border-l-4 border-l-green-500 font-siemreap">
                    <p className="text-[10px] text-green-400 font-bold uppercase font-muol tracking-widest leading-none mb-2 font-siemreap">ផ្ញើបានជោគជ័យ</p>
                    <p className="text-xs text-slate-300 italic font-siemreap">"សារត្រូវបានបញ្ជូនទៅអាណាព្យាបាល..."</p>
                 </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in fade-in duration-500 min-h-[650px] font-siemreap">
            {/* Header of Student List */}
            <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-center gap-6 bg-slate-50/80">
              <div className="text-center xl:text-left">
                <h4 className="font-muol text-2xl text-slate-800 uppercase tracking-tighter mb-2">បញ្ជីសិស្សានុសិស្ស</h4>
                <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full">
                   <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                   <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">ទិន្នន័យសរុប {filteredStudents.length} នាក់ក្នុងប្រព័ន្ធ</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
                <div className="relative w-full sm:w-[400px] font-siemreap group">
                  {isSearching ? (
                     <RefreshCw className="absolute left-5 top-4 text-blue-500 animate-spin" size={20}/>
                  ) : (
                     <Search className="absolute left-5 top-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20}/>
                  )}
                  <input 
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="ស្វែងរកសិស្ស (ចុច Enter)..." 
                    className="w-full bg-white border-2 border-gray-200 rounded-2xl px-14 py-3.5 text-[15px] shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
                  />
                  <div className="absolute right-4 top-3.5 text-xs text-gray-400 font-bold border border-gray-200 rounded-lg px-2 py-1 bg-gray-50">↵ Enter</div>
                </div>
                <button onClick={() => {setEditingStudent(null); setShowStudentModal(true);}} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-2xl text-[15px] font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 flex-shrink-0 w-full sm:w-auto">
                   <div className="bg-white rounded-full p-1.5 text-blue-600 shadow-sm"><Plus size={18} strokeWidth={3} /></div> 
                   បន្ថែមសិស្ស
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1 font-siemreap p-2 md:p-6">
              <table className="w-full text-sm font-siemreap border-collapse">
                <thead className="bg-gray-100 text-[11px] text-gray-500 uppercase font-bold tracking-[0.1em] rounded-2xl">
                  <tr><th className="px-8 py-5 text-left rounded-tl-2xl">ឈ្មោះសិស្ស</th><th className="px-8 py-5 text-left">ភេទ</th><th className="px-8 py-5 text-left">អវត្តមាន</th><th className="px-8 py-5 text-left">លេខសម្គាល់</th><th className="px-8 py-5 text-center rounded-tr-2xl">សកម្មភាព</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentStudents.length > 0 ? currentStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-8 py-5 font-bold text-slate-800 text-[15px]">{student.name}</td>
                      <td className="px-8 py-5 text-gray-600">{student.gender}</td>
                      <td className="px-8 py-5"><span className={`px-4 py-1.5 rounded-xl text-xs font-black shadow-sm border ${student.absent >= 5 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>{student.absent} ដង</span></td>
                      <td className="px-8 py-5 font-mono text-gray-500 text-sm">{student.uid}</td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => { setEditingStudent(student); setShowMsgModal(true); }} className="p-3 bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white rounded-xl transition-all shadow-sm border border-sky-100 hover:-translate-y-0.5"><Send size={18}/></button>
                          <button onClick={() => { setEditingStudent(student); setShowStudentModal(true); }} className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm border border-blue-100 hover:-translate-y-0.5"><Edit2 size={18}/></button>
                          <button onClick={() => handleDeleteStudent(student.id)} className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm border border-red-100 hover:-translate-y-0.5"><Trash2 size={18}/></button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                       <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-bold">
                          <Search size={40} className="mx-auto mb-4 opacity-30" />
                          រកមិនឃើញទិន្នន័យសិស្សឈ្មោះ "{searchQuery}" នោះទេ!
                       </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="p-8 bg-gray-50/80 border-t border-gray-100 flex justify-center items-center gap-4">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-3 rounded-2xl border border-gray-200 transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'bg-white hover:bg-blue-50 text-blue-600 shadow-sm hover:-translate-y-0.5'}`}><ChevronLeft size={20} /></button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-12 h-12 rounded-2xl font-bold text-sm transition-all ${currentPage === i + 1 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:-translate-y-0.5' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 hover:-translate-y-0.5'}`}>{i + 1}</button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className={`p-3 rounded-2xl border border-gray-200 transition-all ${currentPage === totalPages || totalPages === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-white hover:bg-blue-50 text-blue-600 shadow-sm hover:-translate-y-0.5'}`}><ChevronRight size={20} /></button>
            </div>
          </div>
        )}

        <SharedFooter />

        {/* Modals Admin */}
        {showMsgModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 font-siemreap">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
              <button onClick={() => setShowMsgModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
              <h3 className="text-lg font-muol text-blue-600 mb-4 flex items-center gap-2"><Send size={20} /> ផ្ញើសារទៅ {editingStudent?.name || 'អាណាព្យាបាល'}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">ជ្រើសរើសប្រព័ន្ធផ្ញើសារ (App)</label>
                  <div className="flex gap-3 mb-4">
                     <button onClick={() => setMsgPlatform('telegram')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${msgPlatform==='telegram' ? 'bg-sky-100 text-sky-600 border-2 border-sky-400 shadow-sm' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}><Send size={18}/> Telegram</button>
                     <button onClick={() => setMsgPlatform('messenger')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${msgPlatform==='messenger' ? 'bg-blue-100 text-blue-600 border-2 border-blue-500 shadow-sm' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}><MessageCircle size={18}/> Messenger</button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">សារជាអក្សរ</label>
                  <textarea className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]" placeholder="សរសេរសារទីនេះ..."></textarea>
                </div>
                <button onClick={handleSendTelegram} disabled={isSending} className={`w-full text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${msgPlatform === 'telegram' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90'}`}>
                  {isSending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (msgPlatform === 'telegram' ? <Send size={16} /> : <MessageCircle size={16} />)} 
                  ផ្ញើទៅកាន់ {msgPlatform === 'telegram' ? 'Telegram' : 'Messenger'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showStudentModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 font-siemreap">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
              <button onClick={() => setShowStudentModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
              <h3 className="text-lg font-muol text-blue-600 mb-4 flex items-center gap-2">{editingStudent ? <Edit2 size={20} /> : <Plus size={20} />} {editingStudent ? 'កែប្រែព័ត៌មានសិស្ស' : 'បន្ថែមសិស្សថ្មី'}</h3>
              <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const newStudent = {
                      id: editingStudent ? editingStudent.id : Date.now(),
                      name: formData.get('name'),
                      gender: formData.get('gender'),
                      grade: formData.get('grade'),
                      uid: formData.get('uid'),
                      absent: editingStudent ? editingStudent.absent : 0,
                      notified: editingStudent ? editingStudent.notified : false
                  };
                  
                  if (editingStudent) {
                      setStudents(prev => prev.map(s => s.id === editingStudent.id ? newStudent : s));
                  } else {
                      setStudents(prev => [newStudent, ...prev]);
                      setCurrentPage(1); 
                      setSearchQuery(''); 
                  }
                  setShowStudentModal(false);
                  setShowSuccessToast(true);
                  setTimeout(() => setShowSuccessToast(false), 3000);
              }} className="space-y-4">
                <div><label className="block text-xs font-bold text-gray-500 mb-1">ឈ្មោះសិស្ស</label><input name="name" required defaultValue={editingStudent?.name} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ឈ្មោះសិស្ស"/></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-gray-500 mb-1">ភេទ</label><select name="gender" defaultValue={editingStudent?.gender || 'ប្រុស'} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"><option value="ប្រុស">ប្រុស</option><option value="ស្រី">ស្រី</option></select></div>
                  <div><label className="block text-xs font-bold text-gray-500 mb-1">ថ្នាក់</label><input name="grade" required defaultValue={editingStudent?.grade} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ថ្នាក់"/></div>
                </div>
                <div><label className="block text-xs font-bold text-gray-500 mb-1">លេខសម្គាល់ (UID)</label><input name="uid" required defaultValue={editingStudent?.uid} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="UID"/></div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">រក្សាទុក</button>
              </form>
            </div>
          </div>
        )}

        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 font-siemreap">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative text-center">
              <button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><UploadCloud size={32} /></div>
              <h3 className="text-lg font-muol text-slate-800 mb-2">បញ្ចូលទិន្នន័យតាមរយៈ Excel</h3>
              <p className="text-sm text-gray-500 mb-6">សូមជ្រើសរើសឯកសារ Excel (.xlsx, .csv) ដើម្បីបញ្ចូលទិន្នន័យសិស្ស</p>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 mb-4 hover:border-blue-400 hover:bg-blue-50/50 transition cursor-pointer"><p className="text-sm font-bold text-blue-600">ចុចទីនេះដើម្បីជ្រើសរើសឯកសារ</p></div>
              <button onClick={() => setShowUploadModal(false)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">យល់ព្រម</button>
            </div>
          </div>
        )}

        {showSuccessToast && (
          <div className="fixed bottom-6 right-6 z-[400] bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom font-siemreap">
            <CheckCircle2 size={24} /><span className="font-bold">ប្រតិបត្តិការជោគជ័យ!</span>
          </div>
        )}
      </div>
    );
  };

  const renderStudentAppView = () => {
    
    // Helper function សម្រាប់ប៊ូតុង "ត្រឡប់ក្រោយ" (Bubble Back Button)
    const BubbleBackButton = ({ onClick }) => (
      <button onClick={onClick} className="bubble-back-btn">
        <ChevronLeft size={16} /> ត្រឡប់ក្រោយ
      </button>
    );

    return (
      <div className="flex flex-col rounded-[3rem] overflow-hidden border border-gray-200 shadow-2xl relative bg-white" style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.95)), url('ramit0000.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="flex h-[800px] relative z-10">
          
          <div className="w-64 text-white flex flex-col p-6 relative overflow-hidden" style={{ backgroundImage: `linear-gradient(to bottom, rgba(30, 58, 138, 0.85), rgba(15, 23, 42, 0.95)), url('ramit0000.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl -mr-10 -mt-10 opacity-50 pointer-events-none"></div>
            <div className="mb-12 px-2 text-center relative z-10 pt-4"><h1 className="font-muol text-xs sm:text-sm leading-tight uppercase animate-school-rainbow">វិទ្យាល័យ<br/>ស្ដៅសន្តិភាព</h1></div>
            <nav className="flex-1 space-y-3 relative z-10">
              {['home', 'lesson', 'curriculum', 'quiz'].map(id => (
                <button key={id} onClick={() => setStudentTab(id)} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ease-in-out active:scale-95 text-sm font-medium ${studentTab === id || (id === 'lesson' && studentTab.startsWith('lesson')) ? 'bg-blue-600 shadow-lg shadow-blue-900/50 border border-blue-500/50' : 'hover:bg-blue-800/50 text-blue-100 hover:translate-x-2'}`}>
                  {id === 'home' ? <LayoutDashboard size={20}/> : id === 'lesson' ? <BookOpen size={20}/> : id === 'curriculum' ? <Calendar size={20}/> : <BarChart3 size={20}/>}
                  <span className="font-bold tracking-wide">{id === 'home' ? 'ទំព័រដើម' : id === 'lesson' ? 'ស្វ័យសិក្សា' : id === 'curriculum' ? 'កម្មវិធីសិក្សា' : 'លទ្ធផលសិក្សា'}</span>
                </button>
              ))}
            </nav>
            <button onClick={handleLogoutRole} className="mt-auto flex items-center gap-3 px-5 py-4 text-red-300 hover:text-red-100 hover:bg-red-500/20 rounded-2xl transition-all duration-200 active:scale-95 text-sm font-bold relative z-10 border border-transparent hover:border-red-500/30">
              <LogOut size={20} /> ចាកចេញពីគណនី
            </button>
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <header className="bg-white/80 backdrop-blur-md px-8 py-5 border-b border-gray-200/50 flex justify-between items-center shadow-sm relative z-20">
              <div className="flex flex-col">
                  <h2 className="text-lg sm:text-xl font-muol animate-school-rainbow uppercase tracking-tight leading-relaxed">វិទ្យាល័យ ស្ដៅសន្តិភាព</h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1"></div>
              </div>
              <div className="flex items-center gap-6">
                <SocialLinks />
                <button onClick={() => setShowProfileModal(true)} className="flex items-center gap-4 border-l pl-6 hover:opacity-80 transition-all duration-200 active:scale-95 text-left cursor-pointer group">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition">{loggedInStudent?.name}</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{loggedInStudent?.grade}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner border border-blue-50 overflow-hidden">
                    {loggedInStudent?.profilePic ? <img src={loggedInStudent.profilePic} alt="Profile" className="w-full h-full object-cover" /> : <UserIcon size={24} />}
                  </div>
                </button>
              </div>
            </header>
            
            <div className="p-12 flex-1 overflow-y-auto bg-slate-50">
              
              {studentTab === 'home' && (
                <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-10">
                  <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-slate-800 flex flex-col gap-10">
                    {/* Electronic Background Effects */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBIMHptMzkuNSAwVjBoLjV2NDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>
                    <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{animationDelay: '1s'}}></div>
                    
                    {/* Hero Section */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-800/40 p-8 md:p-12 rounded-[2.5rem] border border-slate-700/50 backdrop-blur-md">
                      <div className="flex-1 space-y-5 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20 shadow-sm"><Info size={14} /> ជំនាន់សាកល្បង (Beta Version)</div>
                        <h3 className="text-3xl md:text-5xl font-muol leading-snug drop-shadow-lg text-white">
                          សូមស្វាគមន៍មកកាន់ប្រព័ន្ធ <br className="hidden md:block"/> សិក្សាឌីជីថលទំនើប
                        </h3>
                        <p className="text-slate-400 text-[15px] md:text-[16px] leading-loose max-w-2xl mx-auto md:mx-0 font-siemreap text-justify md:text-left">
                          ផ្តួចផ្តើម និងអភិវឌ្ឍន៍ដោយក្រុមយុវជន <span className="font-black text-cyan-400">VMC វិទ្យាល័យស្ដៅសន្តិភាព</span> ដើម្បីនាំយកបទពិសោធន៍នៃការសិក្សាបែបថ្មី ស្របតាមបរិបទបដិវត្តន៍ឧស្សាហកម្ម ៤.០ ។
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-4 w-full md:w-auto">
                        <button onClick={() => setStudentTab('lesson')} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 border border-cyan-400/50"><BookOpen size={18} /> ចាប់ផ្តើមស្វ័យសិក្សា</button>
                        <button onClick={() => setStudentTab('quiz')} className="bg-slate-800/80 backdrop-blur-md text-white border border-slate-600 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider hover:bg-slate-700 hover:-translate-y-1 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"><BarChart3 size={18} /> មើលលទ្ធផលរបស់អ្នក</button>
                      </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                      <div className="bg-slate-800/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-700 shadow-lg hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                        <div className="w-16 h-16 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
                          <Database size={32} />
                        </div>
                        <h4 className="font-muol text-xl text-white mb-4 relative z-10">គោលបំណងនៃការបង្កើត</h4>
                        <p className="text-slate-400 text-[15px] leading-loose text-justify flex-grow relative z-10">
                          ប្រព័ន្ធនេះត្រូវបានបង្កើតឡើងដើម្បីផ្លាស់ប្តូរទម្លាប់នៃការរៀនបែបប្រពៃណី មកជាការរៀនតាមបែបឌីជីថល (E-Learning)។ វាជួយសិស្សានុសិស្សឱ្យមានប្រភពឯកសាររួមមួយ ដែលអាចចូលរៀន ស្រាវជ្រាវ និងធ្វើតេស្តសមត្ថភាពបានយ៉ាងងាយស្រួល គ្រប់ពេលវេលា និងគ្រប់ទីកន្លែង។
                        </p>
                      </div>
                      
                      <div className="bg-slate-800/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-700 shadow-lg hover:border-emerald-500/50 hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
                        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 relative z-10">
                          <TrendingUp size={32} />
                        </div>
                        <h4 className="font-muol text-xl text-white mb-4 relative z-10">អត្ថប្រយោជន៍ទទួលបាន</h4>
                        <ul className="text-slate-400 text-[15px] leading-loose space-y-3 flex-grow relative z-10">
                          <li className="flex items-start gap-3"><CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-1"/> <span>ទទួលបានមេរៀនសង្ខេប និងវីដេអូបង្រៀនកម្រិតស្តង់ដារ។</span></li>
                          <li className="flex items-start gap-3"><CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-1"/> <span>អាចស្ទង់ស្ទង់សមត្ថភាពខ្លួនឯងតាមរយៈការប្រឡងបញ្ចប់វគ្គ។</span></li>
                          <li className="flex items-start gap-3"><CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-1"/> <span>ទទួលបានសញ្ញាបត្របញ្ជាក់ការសិក្សា (Digital Certificate) ។</span></li>
                        </ul>
                      </div>
                      
                      <div className="bg-slate-800/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-700 shadow-lg hover:border-purple-500/50 hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-colors duration-500"></div>
                        <div className="w-16 h-16 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
                          <Cpu size={32} />
                        </div>
                        <h4 className="font-muol text-xl text-white mb-4 relative z-10">ទិសដៅអភិវឌ្ឍន៍បន្ត</h4>
                        <p className="text-slate-400 text-[15px] leading-loose text-justify flex-grow relative z-10">
                          ទៅថ្ងៃអនាគត យើងគ្រោងនឹងអភិវឌ្ឍកម្មវិធីនេះឱ្យកាន់តែឆ្លាតវៃ ដោយបញ្ចូលនូវបច្ចេកវិទ្យាបញ្ញាសិប្បនិម្មិត (AI) ដើម្បីធ្វើជាជំនួយការផ្ទាល់ខ្លួនសម្រាប់សិស្សម្នាក់ៗ រួមទាំងការបង្កើតជា Mobile App ផ្លូវការ និងបន្ថែមមុខវិជ្ជាជំនាញបច្ចេកវិទ្យាកម្រិតខ្ពស់ជាច្រើនទៀត។
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {studentTab === 'curriculum' && (
                <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500 w-full pb-10">
                  <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.15)] border border-slate-800 flex flex-col gap-10">
                    {/* Electronic Background Effects */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBIMHptMzkuNSAwVjBoLjV2NDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>
                    <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{animationDelay: '1s'}}></div>
                    
                    <div className="relative z-10 text-center space-y-3 mb-6">
                      <div className="inline-flex items-center justify-center p-3 bg-orange-500/10 rounded-full mb-2 border border-orange-500/30">
                        <Calendar className="text-orange-400" size={32} />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-muol text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 drop-shadow-md">កម្មវិធីសិក្សា និងសកម្មភាព</h3>
                      <p className="text-slate-400 text-sm md:text-base font-bold font-siemreap max-w-2xl mx-auto border-b border-slate-700 pb-4">
                        ពិនិត្យមើលកាលវិភាគ មុខវិជ្ជាគោល និងកម្មវិធីអភិវឌ្ឍន៍សមត្ថភាពបន្ថែមដែលសាលាបានរៀបចំ
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                      <div className="bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700 shadow-lg flex items-start gap-6 hover:border-blue-500/50 hover:bg-slate-800 hover:-translate-y-2 transition-all cursor-default group">
                        <div className="w-16 h-16 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-inner shrink-0 group-hover:scale-110 transition-transform"><Calendar size={32} /></div>
                        <div>
                          <h4 className="font-muol text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">កាលវិភាគសិក្សាគោល</h4>
                          <p className="text-sm text-slate-400 leading-relaxed mb-6">កាលវិភាគបង្រៀនតាមថ្នាក់នីមួយៗ និងម៉ោងសិក្សាពីថ្ងៃចន្ទ ដល់ថ្ងៃសៅរ៍ ទៅតាមកម្រិតនីមួយៗ។</p>
                          <button className="px-6 py-2.5 bg-blue-500/20 text-blue-300 font-bold text-xs rounded-xl uppercase tracking-wider border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-colors">មើលកាលវិភាគ</button>
                        </div>
                      </div>
                      
                      <div className="bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700 shadow-lg flex items-start gap-6 hover:border-emerald-500/50 hover:bg-slate-800 hover:-translate-y-2 transition-all cursor-default group">
                        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center shadow-inner shrink-0 group-hover:scale-110 transition-transform"><ClipboardList size={32} /></div>
                        <div>
                          <h4 className="font-muol text-xl text-white mb-2 group-hover:text-emerald-400 transition-colors">មុខវិជ្ជាកាតព្វកិច្ច</h4>
                          <p className="text-sm text-slate-400 leading-relaxed mb-6">បញ្ជីមុខវិជ្ជាគោល មុខវិជ្ជាជម្រើស និងការបែងចែកម៉ោងសិក្សាស្របតាមកម្មវិធីក្រសួង។</p>
                          <button className="px-6 py-2.5 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-xl uppercase tracking-wider border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-colors">ស្វែងយល់បន្ថែម</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/40 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-slate-700 mt-4 relative z-10">
                      <h3 className="font-muol text-2xl text-white mb-8 border-l-4 border-purple-500 pl-4 flex items-center gap-3">
                        <Sparkles className="text-purple-400" /> កម្មវិធីអភិវឌ្ឍន៍សមត្ថភាពក្រៅម៉ោង
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-800/60 p-8 rounded-[2.5rem] border border-slate-700 shadow-lg flex flex-col items-center text-center gap-4 hover:border-orange-500/50 hover:bg-slate-800 hover:-translate-y-2 transition-all cursor-pointer group">
                          <div className="w-20 h-20 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full flex items-center justify-center shadow-inner mb-2 group-hover:scale-110 transition-transform"><MessageSquare size={36} /></div>
                          <div className="flex-1"><h4 className="font-muol text-[16px] text-white mb-3 leading-relaxed group-hover:text-orange-400 transition-colors">កម្មវិធីជជែកដេញដោល<br/>យុវជន</h4><p className="text-sm text-slate-400 leading-relaxed">បណ្តុះបណ្តាលសិល្បៈនៃការនិយាយជាសាធារណៈ ភាពក្លាហាន និងការគិតបែបស៊ីជម្រៅ។</p></div>
                          <button className="mt-4 w-full py-3 bg-orange-500/20 text-orange-300 font-bold text-xs rounded-xl border border-orange-500/30 hover:bg-orange-500 hover:text-white transition-colors uppercase tracking-wide">ចុះឈ្មោះចូលរួម</button>
                        </div>
                        
                        <div className="bg-slate-800/60 p-8 rounded-[2.5rem] border border-slate-700 shadow-lg flex flex-col items-center text-center gap-4 hover:border-cyan-500/50 hover:bg-slate-800 hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden">
                          <div className="absolute top-0 right-0 bg-cyan-500 text-slate-900 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl shadow-md z-10 uppercase tracking-widest">Hot</div>
                          <div className="w-20 h-20 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full flex items-center justify-center shadow-inner mb-2 group-hover:scale-110 transition-transform"><Users size={36} /></div>
                          <div className="flex-1"><h4 className="font-muol text-[16px] text-white mb-3 leading-relaxed group-hover:text-cyan-400 transition-colors">យុវជនស្ម័គ្រចិត្តដើម្បី<br/>សហគមន៍ (VMC)</h4><p className="text-sm text-slate-400 leading-relaxed">ចូលរួមសកម្មភាពសង្គម ការងារបរិស្ថាន និងការអភិវឌ្ឍសហគមន៍ ដើម្បីក្លាយជាយុវជនគំរូ។</p></div>
                          <button className="mt-4 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xs rounded-xl hover:opacity-90 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-colors uppercase tracking-wide">ស្វែងយល់ពី VMC</button>
                        </div>
                        
                        <div className="bg-slate-800/60 p-8 rounded-[2.5rem] border border-slate-700 shadow-lg flex flex-col items-center text-center gap-4 hover:border-purple-500/50 hover:bg-slate-800 hover:-translate-y-2 transition-all cursor-pointer group">
                          <div className="w-20 h-20 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full flex items-center justify-center shadow-inner mb-2 group-hover:scale-110 transition-transform"><Cpu size={36} /></div>
                          <div className="flex-1"><h4 className="font-muol text-[16px] text-white mb-3 leading-relaxed group-hover:text-purple-400 transition-colors">ការប្រកួតប្រជែង<br/>Robot STEAM</h4><p className="text-sm text-slate-400 leading-relaxed">ជំរុញការច្នៃប្រឌិតផ្នែកវិទ្យាសាស្ត្រ បច្ចេកវិទ្យា វិស្វកម្ម សិល្បៈ និងគណិតវិទ្យា។</p></div>
                          <button className="mt-4 w-full py-3 bg-purple-500/20 text-purple-300 font-bold text-xs rounded-xl border border-purple-500/30 hover:bg-purple-500 hover:text-white transition-colors uppercase tracking-wide">ចូលរួមប្រកួត</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {studentTab === 'lesson' && (
                <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500 w-full pb-10">
                  <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-slate-800 flex flex-col gap-10">
                    {/* Electronic Background Effects */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBIMHptMzkuNSAwVjBoLjV2NDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>
                    <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{animationDelay: '1s'}}></div>
                    
                    <div className="relative z-10 text-center space-y-3 mb-6">
                      <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-full mb-2 border border-purple-500/30">
                        <BookOpen className="text-purple-400" size={32} />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-muol text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-md">បណ្ណាល័យស្វ័យសិក្សាឌីជីថល</h3>
                      <p className="text-slate-400 text-sm md:text-base font-bold font-siemreap max-w-2xl mx-auto border-b border-slate-700 pb-4">
                        ចូលរួមអភិវឌ្ឍសមត្ថភាពរបស់អ្នកតាមរយៈឯកសារ និងវគ្គសិក្សាស្តង់ដារ ដែលបានរៀបចំឡើងយ៉ាងពិសេសសម្រាប់សិស្សានុសិស្ស។
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                      <div onClick={() => setStudentTab('lesson_middle')} className="bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700 shadow-lg hover:border-blue-500/50 hover:bg-slate-800 hover:-translate-y-2 active:scale-95 transition-all duration-500 cursor-pointer group flex flex-col items-center text-center gap-6">
                        <div className="w-24 h-24 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-[2rem] flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative">
                            <BookOpen size={40} />
                            <Sparkles size={16} className="absolute top-3 right-3 text-blue-200 animate-pulse"/>
                        </div>
                        <div><h4 className="font-muol text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">កម្រិតអនុវិទ្យាល័យ</h4><p className="text-sm text-slate-500 font-bold tracking-wider">ថ្នាក់ទី ៧ ដល់ ទី ៩</p></div>
                        <button className="mt-auto px-8 py-3 bg-blue-500/20 text-blue-300 font-bold text-xs rounded-xl uppercase tracking-wider border border-blue-500/30 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 w-full shadow-sm">ចូលមើលមេរៀន</button>
                      </div>

                      <div onClick={() => setStudentTab('lesson_high')} className="bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700 shadow-lg hover:border-emerald-500/50 hover:bg-slate-800 hover:-translate-y-2 active:scale-95 transition-all duration-500 cursor-pointer group flex flex-col items-center text-center gap-6">
                        <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-[2rem] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 relative">
                            <GraduationCap size={44} />
                            <BookOpen size={24} className="absolute bottom-3 right-3 text-emerald-200 opacity-60"/>
                        </div>
                        <div><h4 className="font-muol text-xl text-white mb-2 group-hover:text-emerald-400 transition-colors">កម្រិតវិទ្យាល័យ</h4><p className="text-sm text-slate-500 font-bold tracking-wider">ថ្នាក់ទី ១០ ដល់ ទី ១2</p></div>
                        <button className="mt-auto px-8 py-3 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-xl uppercase tracking-wider border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 w-full shadow-sm">ចូលមើលមេរៀន</button>
                      </div>

                      <div onClick={() => setStudentTab('lesson_soft_skills_intro')} className="bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700 shadow-lg hover:border-purple-500/50 hover:bg-slate-800 hover:-translate-y-2 active:scale-95 transition-all duration-500 cursor-pointer group flex flex-col items-center text-center gap-6">
                        <div className="w-24 h-24 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-[2rem] flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative">
                            <Cpu size={40} />
                            <Zap size={20} className="absolute top-3 right-3 text-yellow-300 animate-bounce"/>
                        </div>
                        <div><h4 className="font-muol text-xl text-white mb-2 group-hover:text-purple-400 transition-colors">ជំនាញទន់ (Soft Skills)</h4><p className="text-sm text-slate-500 font-bold tracking-wider">បច្ចេកវិទ្យា និងការអនុវត្ត</p></div>
                        <button className="mt-auto px-8 py-3 bg-purple-500/20 text-purple-300 font-bold text-xs rounded-xl uppercase tracking-wider border border-purple-500/30 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 w-full shadow-sm">ចូលមើលមេរៀន</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(studentTab === 'lesson_middle' || studentTab === 'lesson_high') && (
                <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500">
                  <div className="flex items-center mb-4">
                    <BubbleBackButton onClick={() => setStudentTab('lesson')} />
                  </div>
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-muol text-slate-800">សូមជ្រើសរើសទៅតាមកម្រិតថ្នាក់របស់អ្នក</h3>
                    <p className="text-slate-600 text-sm font-bold">{studentTab === 'lesson_middle' ? 'កម្រិតអនុវិទ្យាល័យ (ថ្នាក់ទី ៧ ដល់ ទី ៩)' : 'កម្រិតវិទ្យាល័យ (ថ្នាក់ទី ១០ ដល់ ទី ១២)'}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                    {(studentTab === 'lesson_middle' ? ['ថ្នាក់ទី ៧', 'ថ្នាក់ទី ៨', 'ថ្នាក់ទី ៩'] : ['ថ្នាក់ទី ១០', 'ថ្នាក់ទី ១១', 'ថ្នាក់ទី ១២']).map((grade, idx) => (
                      <div key={idx} onClick={() => { setSelectedGrade(grade); setGradeCategory(studentTab); setStudentTab('lesson_content'); }} className="bg-white/90 backdrop-blur rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center gap-4 relative overflow-hidden">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 ${studentTab === 'lesson_middle' ? 'bg-blue-500 shadow-blue-500/30' : 'bg-green-500 shadow-green-500/30'}`}><BookOpen size={28} /></div>
                          <h4 className="font-muol text-slate-800 text-lg">{grade}</h4>
                          <button className={`mt-auto px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-colors ${studentTab === 'lesson_middle' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white'}`}>ចូលរៀន</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {studentTab === 'lesson_content' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 w-full pb-10">
                    <div className="flex items-center mb-4">
                      <BubbleBackButton onClick={() => setStudentTab(gradeCategory || 'lesson')} />
                    </div>
                    <div className="text-center space-y-3">
                      <h3 className="text-2xl font-muol text-slate-800">មុខវិជ្ជាសម្រាប់ {selectedGrade}</h3>
                      <p className="text-slate-600 text-sm font-bold">សូមជ្រើសរើសមុខវិជ្ជាដែលអ្នកចង់សិក្សា</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-4">
                      {generalSubjects.map((sub) => (
                          <div key={sub.id} onClick={() => { setSelectedSubject(sub.name); setStudentTab('lesson_parts_selection'); }} className="bg-white/90 backdrop-blur rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center gap-4">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${sub.bgTag} ${sub.textTag} group-hover:scale-110 transition-transform`}>{sub.icon}</div>
                            <h4 className="font-muol text-[13px] sm:text-[14px] text-slate-800 leading-relaxed">{sub.name}</h4>
                          </div>
                      ))}
                    </div>
                </div>
              )}

              {studentTab === 'lesson_parts_selection' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 w-full pb-10">
                    <div className="flex items-center mb-4">
                      <BubbleBackButton onClick={() => setStudentTab('lesson_content')} />
                    </div>
                    <div className="text-center space-y-3">
                      <h3 className="text-3xl font-muol text-slate-800">{selectedSubject}</h3>
                      <p className="text-slate-600 text-sm font-bold">សូមជ្រើសរើសផ្នែកដែលអ្នកចង់សិក្សា</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4 justify-center max-w-4xl mx-auto">
                        <div onClick={() => { setSelectedLessonType('មេរៀន'); setStudentTab('lesson_detail'); }} className="bg-white/90 backdrop-blur rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center gap-4">
                            <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-blue-500 bg-blue-50 shadow-sm group-hover:scale-110 transition-transform"><BookOpen size={36} /></div>
                            <h4 className="font-muol text-xl text-slate-800 mt-2">{selectedSubject === 'ភាសាអង់គ្លេស' ? 'Lesson' : 'មេរៀន'}</h4>
                            <p className="text-xs text-gray-500">ខ្លឹមសារមេរៀនលម្អិត</p>
                        </div>
                        {['គណិតវិទ្យា', 'រូបវិទ្យា', 'គីមីវិទ្យា', 'ភាសាខ្មែរ'].includes(selectedSubject) && (
                            <>
                                <div onClick={() => { setSelectedLessonType('កំណែរ'); setStudentTab('lesson_detail'); }} className="bg-white/90 backdrop-blur rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center gap-4">
                                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-green-500 bg-green-50 shadow-sm group-hover:scale-110 transition-transform"><CheckCircle2 size={36} /></div>
                                    <h4 className="font-muol text-xl text-slate-800 mt-2">កំណែរ</h4>
                                    <p className="text-xs text-gray-500">ចម្លើយ និងការពន្យល់</p>
                                </div>
                                <div onClick={() => { setSelectedLessonType('លំហាត់'); setStudentTab('lesson_detail'); }} className="bg-white/90 backdrop-blur rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center gap-4">
                                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-orange-500 bg-orange-50 shadow-sm group-hover:scale-110 transition-transform"><FileTextIcon size={36} /></div>
                                    <h4 className="font-muol text-xl text-slate-800 mt-2">លំហាត់ (AI) ✨</h4>
                                    <p className="text-xs text-gray-500">លំហាត់អនុវត្តន៍បញ្ញា</p>
                                </div>
                            </>
                        )}
                        {selectedSubject === 'ភាសាអង់គ្លេស' && (
                            <>
                                <div onClick={() => { setSelectedLessonType('Grammar'); setStudentTab('lesson_detail'); }} className="bg-white/90 backdrop-blur rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center gap-4">
                                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-purple-500 bg-purple-50 shadow-sm group-hover:scale-110 transition-transform"><TypeIcon size={36} /></div>
                                    <h4 className="font-muol text-xl text-slate-800 mt-2">Grammar</h4>
                                    <p className="text-xs text-gray-500">វេយ្យាករណ៍ភាសាអង់គ្លេស</p>
                                </div>
                                <div onClick={() => { setSelectedLessonType('Writing'); setStudentTab('lesson_detail'); }} className="bg-white/90 backdrop-blur rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center gap-4">
                                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-rose-500 bg-rose-50 shadow-sm group-hover:scale-110 transition-transform"><PenLine size={36} /></div>
                                    <h4 className="font-muol text-xl text-slate-800 mt-2">Writing</h4>
                                    <p className="text-xs text-gray-500">ការសរសេរតែងសេចក្តី</p>
                                </div>
                            </>
                        )}
                        {!['គណិតវិទ្យា', 'រូបវិទ្យា', 'គីមីវិទ្យា', 'ភាសាខ្មែរ', 'ភាសាអង់គ្លេស'].includes(selectedSubject) && (
                            <>
                                <div onClick={() => { setSelectedLessonType('សំណួរ'); setStudentTab('lesson_detail'); }} className="bg-white/90 backdrop-blur rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center gap-4">
                                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-teal-500 bg-teal-50 shadow-sm group-hover:scale-110 transition-transform"><HelpCircle size={36} /></div>
                                    <h4 className="font-muol text-xl text-slate-800 mt-2">សំណួរ</h4>
                                    <p className="text-xs text-gray-500">សំណួរ និងចម្លើយខ្លីៗ</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
              )}

              {studentTab === 'lesson_soft_skills_intro' && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 w-full pb-10">
                  <div className="flex items-center mb-6">
                      <BubbleBackButton onClick={() => setStudentTab('lesson')} />
                  </div>
                  <div className="bg-slate-900 rounded-[3rem] p-12 border border-slate-800 shadow-[0_0_40px_rgba(168,85,247,0.15)] text-center flex flex-col items-center gap-6 mt-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
                      
                      <div className="w-24 h-24 bg-purple-500/10 text-purple-400 rounded-[2rem] shadow-lg border border-purple-500/30 flex items-center justify-center mb-2 relative z-10 backdrop-blur-md">
                        <Users size={48} />
                      </div>
                      <h3 className="text-3xl font-muol text-white relative z-10 drop-shadow-md">ជំនាញទន់ (Soft Skills)</h3>
                      <p className="text-lg text-slate-300 font-siemreap leading-relaxed max-w-2xl font-bold relative z-10">ការរៀនជំនាញទន់នឹងជួយឲ្យសិស្សានុសិស្សចេះប្រាស្រ័យទាក់ទង ដឹកនាំ ព្រមទាំងមានមូលដ្ឋានគ្រឹះល្អៗសម្រាប់ការអភិវឌ្ឍខ្លួនបន្ថែមក្នុងយុគសម័យឌីជីថល។</p>
                      
                      <button onClick={() => { setSelectedGrade('ជំនាញទន់ (Soft Skills)'); setStudentTab('lesson_soft_skills_subjects'); }} className="mt-8 group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-muol text-[15px] rounded-2xl shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-in-out flex items-center gap-3 z-10 overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                        <span className="relative z-10">អាចចាប់ផ្តើម</span> <ChevronRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                  </div>
                </div>
              )}

              {studentTab === 'lesson_soft_skills_subjects' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 w-full pb-10">
                    <div className="flex items-center mb-6">
                      <BubbleBackButton onClick={() => setStudentTab('lesson_soft_skills_intro')} />
                    </div>
                    <div className="text-center space-y-3">
                      <h3 className="text-3xl font-muol text-slate-800 drop-shadow-sm">មុខវិជ្ជាជំនាញទន់ (Soft Skills)</h3>
                      <p className="text-slate-500 text-sm font-bold uppercase tracking-widest border-b border-gray-200 inline-block pb-2">សូមជ្រើសរើសមុខវិជ្ជាដែលអ្នកចង់សិក្សា</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 max-w-4xl mx-auto">
                        {[
                            { name: 'មូលដ្ឋានគ្រឹះ Arduino IDE', desc: 'សិក្សាពីការសរសេរកូដបញ្ជា Hardware និងបង្កើតគម្រោង IoT ដំបូងរបស់អ្នក។', Icon: Cpu, border: 'border-cyan-500/30', glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]', gradient: 'from-slate-800 to-slate-900', text: 'text-cyan-400' },
                        ].map((sub, idx) => {
                            const SubIcon = sub.Icon;
                            return (
                              <div key={idx} onClick={() => { setSelectedSubject(sub.name); if(sub.name === 'មូលដ្ឋានគ្រឹះ Arduino IDE') { setSelectedSubTopic(null); setSelectedLessonType(''); setStudentTab('arduino_course'); } else { setSelectedLessonType('មេរៀន'); setStudentTab('lesson_detail'); } }} 
                                   className={`relative overflow-hidden rounded-[2rem] p-8 border ${sub.border} shadow-lg ${sub.glow} active:scale-95 transition-all duration-500 cursor-pointer group flex flex-col items-start gap-4 bg-gradient-to-br ${sub.gradient}`}>
                                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                    <SubIcon size={36} className="text-cyan-400 group-hover:animate-pulse" />
                                </div>
                                <div className="relative z-10">
                                  <h4 className={`font-muol text-lg ${sub.text} mb-2`}>{sub.name}</h4>
                                  <p className="text-sm text-slate-400 font-siemreap leading-relaxed">{sub.desc}</p>
                                </div>
                                <div className="mt-auto pt-4 relative z-10 w-full flex justify-end">
                                  <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 ${sub.text} group-hover:bg-white/10 transition-colors duration-300`}>
                                     <ChevronRight size={16}/>
                                  </div>
                                </div>
                              </div>
                            );
                        })}
                    </div>
                </div>
              )}

              {studentTab === 'arduino_course' && (
                <div className="max-w-6xl mx-auto space-y-6 animate-in slide-in-from-right-8 duration-500 w-full pb-10">
                    <div className="flex items-center mb-6">
                      <BubbleBackButton onClick={() => {
                        if (selectedSubTopic) {
                          setSelectedSubTopic(null);
                        } else {
                          setStudentTab('lesson_soft_skills_subjects');
                        }
                      }} />
                    </div>
                    
                    {!selectedSubTopic ? (
                      <>
                        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl border border-slate-800">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-600/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                                <div className="w-24 h-24 bg-blue-500/10 rounded-3xl flex items-center justify-center border border-blue-400/30 text-blue-400 backdrop-blur-md shadow-lg shrink-0"><Cpu size={48} /></div>
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4 border border-blue-500/30 shadow-sm">ជំនាញបច្ចេកវិទ្យាឌីជីថល (Digital Skill)</div>
                                    <h2 className="text-3xl md:text-4xl font-muol text-white mb-3 leading-tight drop-shadow-md">«មូលដ្ឋានគ្រឹះ Arduino IDE»</h2>
                                    <div className="flex flex-col gap-1 mt-2 items-center md:items-start">
                                      <p className="text-slate-300 font-siemreap text-sm flex items-center gap-2"><PenLine size={14} className="text-blue-400"/> រៀបចំ និងកែសម្រួលដោយ <span className="text-blue-400 font-bold">វុធ រ៉ាមីត</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-center mb-8 relative">
                            {/* Hidden SVG for Blob Button Filter */}
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
                              <defs>
                                <filter id="goo">
                                  <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                                  <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                </filter>
                              </defs>
                            </svg>
                            
                            <div className="buttons-container w-full mt-6">
                                <button onClick={() => setSelectedLessonType('intro')} className={`blob-btn ${selectedLessonType === 'intro' ? 'active' : ''}`}>
                                   <Info size={18}/> ការណែនាំដំបូង
                                   <span className="blob-btn__inner"><span className="blob-btn__blobs"><span className="blob-btn__blob"></span><span className="blob-btn__blob"></span><span className="blob-btn__blob"></span><span className="blob-btn__blob"></span></span></span>
                                </button>
                                <button onClick={() => setSelectedSubTopic('learning_grid')} className="blob-btn">
                                   <PlayCircle size={18}/> ចាប់ផ្តើមរៀន
                                   <span className="blob-btn__inner"><span className="blob-btn__blobs"><span className="blob-btn__blob"></span><span className="blob-btn__blob"></span><span className="blob-btn__blob"></span><span className="blob-btn__blob"></span></span></span>
                                </button>
                            </div>
                        </div>

                        {selectedLessonType === 'intro' && (
                            <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
                                <div className="prose prose-lg max-w-none font-siemreap text-slate-700 leading-loose">
                                    <p className="text-lg first-letter:text-5xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-1 first-letter:float-left">
                                        «មូលដ្ឋាននេះសម្រាប់អ្នកចាប់ផ្តើមរៀនដំបូង ដោយត្រូវបានរៀបចំឡើងក្នុងគោលបំណងផ្តល់ចំណេះដឹងសម្រាប់ឱ្យសិស្សានុសិស្សដែលជាយុវជនជំនាន់ថ្មី ក្នុងការសិក្សារៀនសូត្រដោយចាប់យកនូវជំនាញ <strong className="text-blue-600">Digital</strong> មួយដ៏សមស្របតាមសមត្ថភាព និងតាមវ័យរបស់ខ្លួន ដូចជាការរៀនផ្នែកបច្ចេកវិទ្យា និងព័ត៌មានវិទ្យា ដែលជាជំនាញមួយដែលសង្គមយើងកំពុងត្រូវការចាំបាច់នាពេលបច្ចុប្បន្ន។»
                                    </p>
                                    <div className="my-8 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                                    <p className="text-lg text-slate-600 bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm italic relative">
                                        <span className="absolute top-4 left-4 text-4xl text-blue-200">&quot;</span>
                                        ចំពោះការសិក្សាមូលដ្ឋានគ្រឹះដំបូងនេះ គឺមិនចាំបាច់ទាល់តែរៀនចប់បាននិទ្ទេសល្អនោះទេ ទោះជាយើងជាសិស្សដែលស្ថិតនៅកម្រិតណាក៏ដោយ ក៏យើងអាចស្វ័យសិក្សាបានតាមរយៈការស្រាវជ្រាវ (Research) ការមើលវីដេអូបង្រៀន និងការកត់ត្រាជាដើម ដែលទាំងនេះនឹងអាចជួយយើងបាន។ ដូច្នេះ តាមរយៈការរៀនមូលដ្ឋានគ្រឹះនេះ ខ្ញុំសង្ឃឹមថាសិស្សានុសិស្សដែលបានរៀន នឹងអាចយល់ដឹង ជាពិសេសគឺការស្វែងយល់ពីបច្ចេកវិទ្យាថ្មីៗ ដែលពិភពលោកតែងតែធ្វើបច្ចុប្បន្នភាព (Update) ជារៀងរាល់ថ្ងៃ។
                                        <span className="absolute bottom-[-10px] right-4 text-4xl text-blue-200">&quot;</span>
                                    </p>
                                </div>
                                
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
                                        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-[0_0_20px_rgba(6,182,212,0.15)] relative overflow-hidden group w-full md:w-auto hover:border-cyan-500/50 transition-colors duration-500">
                                            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            
                                            <div className="flex items-center gap-3 mb-2 relative z-10">
                                                <BookOpen size={20} className="text-cyan-400" />
                                                <h4 className="text-slate-300 font-bold font-siemreap text-sm uppercase tracking-wider">ប្រភពដកស្រង់ដើម (ICT Center)</h4>
                                            </div>
                                            
                                            <p className="font-muol text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider text-xl relative z-10" style={{textShadow: "0 0 15px rgba(6,182,212,0.3)"}}>
                                                លោកគ្រូ នន់ សុវណ្ណរាជ
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0 mt-auto w-full md:w-auto flex justify-center md:justify-end">
                                            <button onClick={() => setSelectedSubTopic('learning_grid')} className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-muol text-[15px] rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-in-out flex items-center gap-3 z-10 overflow-hidden w-full md:w-auto justify-center">
                                                <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                                                <span className="relative z-10">បន្តទៅចាប់ផ្តើមរៀន</span> <ChevronRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                      </>
                    ) : selectedSubTopic === 'learning_grid' ? (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-blue-50 px-6 py-2 rounded-bl-3xl font-muol text-blue-600 text-sm">ផ្នែកទី ១</div>
                              <h3 className="text-2xl font-muol text-slate-800 mb-8 flex items-center gap-3"><BookOpen className="text-blue-500" /> ការស្វែងយល់ទូទៅអំពី Arduino</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-siemreap text-lg">
                                  {arduinoIntroList.map((item, idx) => {
                                      const ItemIcon = item.Icon;
                                      return (
                                        <div key={idx} onClick={() => { if(item.id === 'history') { setSelectedSubTopic('history'); setHistoryViewMode('text'); } }} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:text-blue-500 transition-colors">
                                              <ItemIcon size={20} className="text-slate-400 group-hover:text-blue-500"/>
                                            </div>
                                            <span className="text-slate-700 font-bold group-hover:text-blue-700">{item.title}</span>
                                        </div>
                                      );
                                  })}
                              </div>
                          </div>

                          <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-orange-50 px-6 py-2 rounded-bl-3xl font-muol text-orange-600 text-sm">ផ្នែកទី ២</div>
                              <h3 className="text-2xl font-muol text-slate-800 mb-8 flex items-center gap-3"><Cpu className="text-orange-500" /> ឧបករណ៍ដែលត្រូវស្គាល់សម្រាប់ការរៀន (Arduino)</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-siemreap">
                                  {arduinoComponentsList.map((comp, idx) => {
                                      const CompIcon = comp.Icon;
                                      return (
                                        <div key={idx} className="flex flex-col items-center text-center gap-3 bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all cursor-pointer group">
                                            <div className="w-14 h-14 bg-white text-slate-400 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:text-orange-500 transition-all">
                                              <CompIcon size={28} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-[15px]">{comp.kh}</h4>
                                                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-mono">{comp.en}</p>
                                            </div>
                                        </div>
                                      );
                                  })}
                              </div>
                          </div>

                          {/* ផ្នែកទី ៣ */}
                          <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-green-50 px-6 py-2 rounded-bl-3xl font-muol text-green-600 text-sm">ផ្នែកទី ៣</div>
                              <h3 className="text-2xl font-muol text-slate-800 mb-8 flex items-center gap-3"><Download className="text-green-500" /> កម្មវិធីសរសេរកូដ និងការភ្ជាប់ Arduino</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-siemreap text-lg">
                                  {arduinoPart3List.map((item, idx) => {
                                      const ItemIcon = item.Icon;
                                      return (
                                        <div key={idx} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-green-200 hover:bg-green-50/50 transition-colors cursor-pointer group">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:text-green-500 transition-colors">
                                              <ItemIcon size={20} className="text-slate-400 group-hover:text-green-500"/>
                                            </div>
                                            <span className="text-slate-700 font-bold group-hover:text-green-700">{item.title}</span>
                                        </div>
                                      );
                                  })}
                              </div>
                          </div>

                          {/* ផ្នែកទី ៤ */}
                          <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-purple-50 px-6 py-2 rounded-bl-3xl font-muol text-purple-600 text-sm">ផ្នែកទី ៤</div>
                              <h3 className="text-2xl font-muol text-slate-800 mb-8 flex items-center gap-3"><CodeIcon className="text-purple-500" /> ការសរសេរកូដ និងការអនុវត្ត</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-siemreap text-lg">
                                  {arduinoPart4List.map((item, idx) => {
                                      const ItemIcon = item.Icon;
                                      return (
                                        <div key={idx} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/50 transition-colors cursor-pointer group">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:text-purple-500 transition-colors">
                                              <ItemIcon size={20} className="text-slate-400 group-hover:text-purple-500"/>
                                            </div>
                                            <span className="text-slate-700 font-bold group-hover:text-purple-700">{item.title}</span>
                                        </div>
                                      );
                                  })}
                              </div>
                          </div>

                          {/* ផ្នែកទី ៥ */}
                          <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-pink-50 px-6 py-2 rounded-bl-3xl font-muol text-pink-600 text-sm">ផ្នែកទី ៥</div>
                              <h3 className="text-2xl font-muol text-slate-800 mb-8 flex items-center gap-3"><Layers className="text-pink-500" /> ការបង្កើតគម្រោង</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-siemreap text-lg">
                                  {arduinoPart5List.map((item, idx) => {
                                      const ItemIcon = item.Icon;
                                      return (
                                        <div key={idx} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-pink-200 hover:bg-pink-50/50 transition-colors cursor-pointer group">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:text-pink-500 transition-colors">
                                              <ItemIcon size={20} className="text-slate-400 group-hover:text-pink-500"/>
                                            </div>
                                            <span className="text-slate-700 font-bold group-hover:text-pink-700">{item.title}</span>
                                        </div>
                                      );
                                  })}
                              </div>
                          </div>

                      </div>
                    ) : selectedSubTopic === 'history' ? (
                      <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
                          <div className="flex justify-center mb-8 relative">
                              <div className="flex flex-wrap gap-4 w-full md:w-auto justify-center mt-2">
                                  <button onClick={() => setHistoryViewMode('video')} className={`modern-tab-btn ${historyViewMode === 'video' ? 'active' : ''}`}>
                                     <PlayCircle size={18}/> មើលជា Video
                                  </button>
                                  <button onClick={() => setHistoryViewMode('text')} className={`modern-tab-btn ${historyViewMode === 'text' ? 'active' : ''}`}>
                                     <FileTextIcon size={18}/> អានជា Text
                                  </button>
                              </div>
                          </div>

                          {historyViewMode === 'text' && (
                            <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-inner prose max-w-none font-siemreap text-slate-700 leading-loose animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
                              <div className="mb-8 border-b-2 border-slate-300 pb-4">
                                <h4 className="text-slate-500 font-bold mb-1 text-sm uppercase tracking-widest">ជំពូកទី១ ៖ ណែនាំអំពីកម្មវិធី</h4>
                                <h3 className="text-xl text-blue-600 font-bold mb-4">មេរៀនទី១ ៖ មូលដ្ឋានអំពី Arduino សម្រាប់អ្នកចាប់ផ្តើម</h3>
                                <h2 className="font-muol text-2xl text-slate-800">១.១ ប្រវត្តិរបស់ Arduino</h2>
                              </div>

                              <p className="bg-white p-6 rounded-2xl border-l-4 border-blue-500 mb-6 text-[17px] text-slate-700 shadow-sm">
                                <strong className="text-blue-700 font-bold">Arduino</strong> ត្រូវបានបង្កើតឡើងនៅឆ្នាំ <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md font-bold border border-yellow-200 shadow-sm">2005</span> នៅទីក្រុង <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold border border-indigo-200 shadow-sm">Ivrea ប្រទេសអ៊ីតាលី</span> ដោយក្រុមអ្នកវិទ្យាសាស្ត្រចំនួន ៥រូប ដែលមាន៖
                              </p>

                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mb-10 mt-6">
                                {[
                                  { name: 'Massimo Banzi', img: 'Massimo_banzi.jpg' },
                                  { name: 'David Cuartielles', img: 'david-cuartiellles.jpg' },
                                  { name: 'Tom Igoe', img: 'tom-igoe.jpg.preset.square.jpeg' },
                                  { name: 'Gianluca Martino', img: 'fffffff.jpg' },
                                  { name: 'David Mellis', img: 'tom.jpg' } 
                                ].map((c, i) => (
                                  <div key={i} className="flex flex-col items-center p-5 bg-white rounded-[1.5rem] border border-slate-200 shadow-md hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-300 bg-slate-100 flex items-center justify-center">
                                      <img 
                                        src={c.img} 
                                        alt={c.name} 
                                        className="w-full h-full object-cover" 
                                      />
                                    </div>
                                    <span className="font-bold text-slate-800 text-center text-[12px] sm:text-sm leading-tight group-hover:text-blue-600 transition-colors">{c.name}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="space-y-6 text-[17px] text-justify text-slate-700">
                                 <p>
                                    <strong className="text-blue-700">Arduino</strong> ជាកម្មវិធីប្រភេទកូដចំហ (<span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold shadow-sm border border-emerald-200">Open-source software</span>) ដែលប្រើសម្រាប់សរសេរ, ផ្ទៀងផ្ទាត់ និងផ្ទេរកូដ (upload) ទៅកាន់បន្ទះឧបករណ៍ Arduino (Arduino board) ដើម្បីបង្កើតប្រព័ន្ធអគ្គិសនីបញ្ជាប្រភេទ <span className="text-rose-600 font-bold">IoT (Internet of Things)</span>, ប្រព័ន្ធគ្រប់គ្រងឧបករណ៍ស្វ័យប្រវត្តិ, ឬគម្រោងអគ្គិសនីបញ្ជាជាច្រើនផ្សេងទៀត។
                                 </p>
                                 <p>
                                    <strong className="text-blue-700">Arduino</strong> ជាបន្ទះឧបករណ៍អគ្គិសនីបញ្ជាប្រភេទមីក្រូគ្រប់គ្រង (<span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold shadow-sm border border-slate-300">Microcontroller board</span>) ដែលត្រូវបានប្រើសម្រាប់បង្កើតគម្រោងអគ្គិសនីបញ្ជា និងបញ្ជាការងាររបស់ឧបករណ៍ផ្សេងៗ។
                                 </p>
                                 
                                 <div className="bg-white p-6 rounded-2xl border border-slate-200 my-8 shadow-sm">
                                    <h4 className="font-bold text-lg text-slate-900 mb-4 border-b border-slate-200 pb-2">Arduino មានលក្ខណៈងាយស្រួលប្រើប្រាស់ដោយសារ៖</h4>
                                    <ul className="space-y-4 list-disc pl-6 text-slate-700">
                                      <li>
                                        <strong className="text-blue-600">Hardware (ផ្នែករឹង)៖</strong> Arduino board មានមីក្រូគ្រប់គ្រង (Microcontroller), Port សម្រាប់ភ្ជាប់ចូលចេញ (I/O pins) សម្រាប់ភ្ជាប់សេនស័រ ឬបញ្ជាឧបករណ៍ផ្សេងៗដូចជា LED, Servo motors, LCD display និងឧបករណ៍ផ្សេងៗទៀត។
                                      </li>
                                      <li>
                                        <strong className="text-blue-600">Software (ផ្នែកទន់)៖</strong> Arduino មានកម្មវិធី IDE (Integrated Development Environment) ដែលអ្នកប្រើប្រាស់អាចសរសេរកូដ (code) និង Upload ទៅលើបន្ទះ Arduino បានយ៉ាងងាយស្រួល។
                                      </li>
                                      <li>
                                        <strong className="text-blue-600">Programming Language (ភាសាសរសេរកម្មវិធី)៖</strong> Arduino ប្រើប្រាស់ភាសាសរសេរកម្មវិធីដែលមានមូលដ្ឋានលើ <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-bold shadow-sm border border-purple-200">C/C++</span> ដែលងាយយល់ និងសមស្របសម្រាប់អ្នកចាប់ផ្តើម។
                                      </li>
                                    </ul>
                                 </div>

                                 <p>
                                    <strong className="text-blue-700">Arduino</strong> ត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយក្នុងវិស័យអគ្គិសនីបញ្ជា កម្មវិធីបញ្ជាការងារស្វ័យប្រវត្តិ ការសិក្សាស្រាវជ្រាវ និងការបង្រៀន។ Arduino ក៏ស័ក្តិសមបំផុតសម្រាប់ការសិក្សា និងគម្រោង DIY (Do-it-yourself) ពីការប្រើប្រាស់សាមញ្ញរហូតដល់គម្រោងស្មុគស្មាញដូចជារ៉ូបូត, Smart home, ឡានរ៉ូបូត និងការបញ្ជាពីចម្ងាយជាដើម។
                                 </p>

                                 <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent my-10"></div>

                                 <p className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-400 mb-6 shadow-sm text-slate-800">
                                    គោលបំណងដើម នៃការបង្កើត <strong className="text-orange-600">Arduino</strong> គឺដើម្បីផ្តល់នូវឧបករណ៍តម្លៃថោកដែលងាយស្រួលប្រើប្រាស់ និងមានតម្លៃថោកសម្រាប់សិស្ស និងអ្នកចាប់ផ្តើម។ ពិសេសសម្រាប់តំបន់អន្តរកម្មចំណុចប្រទាក់នៅ Ivrea ដែលត្រូវការឧបករណ៍សម្រាប់ធ្វើ <span className="font-bold text-slate-900">Robotics និង interaction design</span> ប៉ុន្តែនាពេលនោះ microcontroller កម្រិតឧស្សាហកម្មមានតម្លៃថ្លៃពេក។
                                 </p>

                                 <p>
                                    "<strong className="text-blue-700">Arduino</strong>" ត្រូវបានដាក់ឈ្មោះតាមឈ្មោះ "Bar di Re Arduino" (ស្តេចឈ្មោះ Arduino នៅ Ivrea) ដែលជាកន្លែងជួបជុំរបស់ក្រុមអ្នកបង្កើត។ ឈ្មោះនេះក៏មានប្រភពមកពីឈ្មោះអ៊ីតាលី "Arduin of Ivrea" ដែលគ្រប់គ្រងតំបន់នោះកាលពីអតីតកាល។
                                 </p>

                                 <p>
                                    បន្ទះដំបូង គឺបន្ទះ Arduino ដំបូងមានឈ្មោះថា <strong className="text-slate-900">Arduino Serial</strong>។ បន្ទះនេះមានតម្លៃថោកជាងបន្ទះកម្រិតឧស្សាហកម្ម (<span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold shadow-sm border border-emerald-200">តម្លៃប្រហែល ២០ ដុល្លារ</span>) ហើយងាយស្រួលប្រើប្រាស់។ ក្រោយមកបន្ទះ <strong className="text-blue-600">Arduino Uno</strong> ក៏ត្រូវបានបង្កើតឡើង និងក្លាយជាបន្ទះមានការពេញនិយមយ៉ាងខ្លាំងរហូតដល់សព្វថ្ងៃ។
                                 </p>

                                 <ul className="space-y-3 mt-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5"/>
                                      <span><strong className="text-blue-700">Arduino</strong> ជាប្រព័ន្ធ Open Source មានន័យថាទាំង source code និង hardware គឺបើកទូលាយ។</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5"/>
                                      <span>ជាប្រព័ន្ធដ៏មានប្រជាប្រិយភាពបំផុតនៅលើពិភពលោកលើវិស័យ robotics និង IoT សម្រាប់មនុស្សគ្រប់ភេទគ្រប់វ័យ។</span>
                                    </li>
                                 </ul>
                              </div>
                            </div>
                          )}

                          {historyViewMode === 'video' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
                                <div className="w-full max-w-3xl aspect-video bg-slate-900 rounded-[2rem] shadow-xl border border-slate-800 overflow-hidden relative flex items-center justify-center group cursor-pointer">
                                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1608564697071-0f951e0dbb88?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
                                   <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-500"></div>
                                   <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                     <PlayCircle size={40} className="text-white ml-2" />
                                   </div>
                                   <div className="absolute bottom-6 left-6 right-6 z-10">
                                      <p className="text-white font-muol text-lg drop-shadow-md">ប្រវត្តិរបស់ Arduino</p>
                                      <p className="text-blue-200 text-sm font-siemreap">វីដេអូពន្យល់លម្អិត</p>
                                   </div>
                                </div>
                                <p className="text-slate-500 font-siemreap mt-6 text-center max-w-lg">វីដេអូនេះកំពុងស្ថិតក្នុងការរៀបចំ... អ្នកអាចអានអត្ថបទលម្អិតនៅក្នុងផ្ទាំង <strong>"អានជា Text"</strong> ជាមុនសិន។</p>
                            </div>
                          )}
                      </div>
                    ) : (
                      <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-300">
                          <HelpCircle size={60} className="mx-auto text-slate-300 mb-6" />
                          <h3 className="text-2xl font-muol text-slate-800 mb-2">កំពុងរៀបចំមាតិកា</h3>
                          <p className="text-slate-500 font-siemreap text-lg">មេរៀនលម្អិតសម្រាប់ផ្នែកនេះនឹងមានក្នុងពេលឆាប់ៗនេះ។ សូមរង់ចាំការ Update បន្តបន្ទាប់!</p>
                      </div>
                    )}
                </div>
              )}

              {studentTab === 'lesson_detail' && (
                <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 w-full pb-10">
                    <div className="flex items-center mb-6">
                      <BubbleBackButton onClick={() => setStudentTab('lesson_parts_selection')} />
                    </div>

                    {selectedLessonType === 'លំហាត់' ? (
                        <div className="bg-white/90 backdrop-blur p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 w-full flex flex-col min-h-[60vh] relative overflow-hidden text-center">
                            <div className="inline-flex items-center justify-center p-4 bg-indigo-50 rounded-full mb-4 text-indigo-600 mx-auto"><Sparkles size={40} /></div>
                            <h2 className="text-3xl font-muol text-slate-800 mb-4">តេស្ដសមត្ថភាព {selectedSubject}</h2>
                            <p className="text-slate-500 text-lg max-w-xl mx-auto mb-8">ប្រើប្រាស់បច្ចេកវិទ្យា AI ដ៏ឆ្លាតវៃដើម្បីបង្កើតសំណួរលំហាត់សាកល្បងថ្មីៗ ស្របតាមកម្មវិធីសិក្សា {selectedGrade}។</p>

                            {!generatedExercise && !isExerciseLoading ? (
                                <button onClick={handleGenerateExercise} className="mx-auto mt-4 group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all flex items-center gap-3"><Sparkles className="group-hover:animate-pulse" size={24} /> បង្កើតលំហាត់ដោយ AI ✨</button>
                            ) : isExerciseLoading ? (
                                <div className="mt-8 flex flex-col items-center gap-4"><RefreshCw className="animate-spin text-indigo-500" size={48} /><p className="text-indigo-600 font-bold text-lg animate-pulse">កំពុងវិភាគ និងបង្កើតលំហាត់... ✨</p></div>
                            ) : (
                                <div className="w-full bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-inner mt-4 text-left">
                                    <div className="prose prose-indigo max-w-none font-siemreap leading-relaxed text-slate-700">
                                        {(generatedExercise || '').split('\n').map((line, i) => {
                                            if (line.trim() === '') return <br key={i} />;
                                            if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="block mt-4 mb-2 text-indigo-800 text-xl">{line.split('**').join('')}</strong>;
                                            return <p key={i} className="mb-2">{line.split('**').join('')}</p>;
                                        })}
                                    </div>
                                    <div className="mt-10 flex justify-center border-t border-slate-200 pt-8">
                                        <button onClick={handleGenerateExercise} className="px-6 py-3 bg-white border-2 border-indigo-200 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-colors flex items-center gap-2"><RefreshCw size={20} /> បង្កើតលំហាត់ថ្មីម្ដងទៀត ✨</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (selectedGrade === 'ថ្នាក់ទី ៩' && selectedSubject === 'គណិតវិទ្យា' && selectedLessonType === 'មេរៀន') ? (
                        <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 w-full text-left flex flex-col">
                           <div className="border-b-[5px] border-slate-800 pb-4 mb-8 flex items-end justify-between">
                             <div className="flex items-end gap-4">
                                <h1 className="text-7xl font-black text-slate-800 leading-none">1</h1>
                                <div className="pb-1"><p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">មេរៀនទី</p><h2 className="text-3xl md:text-4xl font-muol text-slate-800">ចំនួនអសនិទាន</h2></div>
                             </div>
                           </div>
                           <div className="flex flex-col gap-8 items-center bg-slate-50 p-4 md:p-8 rounded-[2rem] border border-gray-200 shadow-inner">
                               <img src="Screenshot_2026_03_14_15_32_12_33_bade9f33a047fe6fd23763d9636918f82.jpg" alt="ទំព័រទី១ ចំនួនអសនិទាន" className="w-full max-w-3xl rounded-xl shadow-md border border-gray-300" />
                               <img src="Screenshot_2026_03_14_15_32_20_28_bade9f33a047fe6fd23763d9636918f82.jpg" alt="ទំព័រទី២ ចំនួនអសនិទាន" className="w-full max-w-3xl rounded-xl shadow-md border border-gray-300" />
                               <img src="Screenshot_2026_03_14_15_32_26_52_bade9f33a047fe6fd23763d9636918f82.jpg" alt="ទំព័រទី៣ ចំនួនអសនិទាន" className="w-full max-w-3xl rounded-xl shadow-md border border-gray-300" />
                           </div>
                           <div className="mt-12 flex justify-center">
                             <button onClick={() => setStudentTab('quiz')} className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3"><CheckCircle2 size={22} /> បញ្ចប់មេរៀននេះ</button>
                           </div>
                        </div>
                    ) : (
                        <div className="bg-white/90 backdrop-blur p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 w-full text-center flex flex-col items-center gap-6">
                          <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center animate-pulse"><PlayCircle size={48} /></div>
                          <div>
                              <h3 className="text-2xl font-muol text-slate-800 mb-2">{`${selectedGrade} - ${selectedSubject} - ${selectedLessonType}`}</h3>
                              <p className="text-gray-600 font-siemreap">
                                {selectedLessonType === 'មេរៀន' || selectedLessonType === 'Lesson' ? 'វគ្គសិក្សាលម្អិត និងវីដេអូបង្រៀននឹងបង្ហាញនៅទីនេះ...' : selectedLessonType === 'កំណែរ' ? 'កំណែរលំហាត់ និងការពន្យល់នឹងបង្ហាញនៅទីនេះ...' : selectedLessonType === 'សំណួរ' ? 'សំណួរនិងចម្លើយសម្រាប់មេរៀននេះនឹងបង្ហាញនៅទីនេះ...' : selectedLessonType === 'Grammar' ? 'មេរៀនវេយ្យាករណ៍ភាសាអង់គ្លេសនឹងបង្ហាញនៅទីនេះ...' : selectedLessonType === 'Writing' ? 'មេរៀនសរសេរតែងសេចក្តីភាសាអង់គ្លេសនឹងបង្ហាញនៅទីនេះ...' : 'កំពុងរៀបចំមាតិកា...'}
                              </p>
                          </div>
                          <div className="w-full max-w-3xl h-64 bg-slate-100/80 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center"><span className="text-slate-500 text-sm">Video / Document Placeholder</span></div>
                          <button onClick={() => setStudentTab('quiz')} className="mt-4 px-8 py-3 bg-green-500 text-white font-bold rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all flex items-center gap-2"><CheckCircle2 size={18} /> បញ្ចប់វគ្គសិក្សា និងប្រឡង</button>
                        </div>
                    )}
                </div>
              )}

              {studentTab === 'quiz' && (
                <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500 w-full pb-10">
                  {/* Electronic Dashboard Container */}
                  <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-slate-800">
                    
                    {/* Electronic Background Effects */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBIMHptMzkuNSAwVjBoLjV2NDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>
                    <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{animationDelay: '1s'}}></div>

                    <div className="relative z-10 text-center space-y-3 mb-12">
                      <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 rounded-full mb-2 border border-cyan-500/30">
                        <BarChart3 className="text-cyan-400" size={32} />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-muol text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-md">លទ្ធផលសិក្សា និងសញ្ញាបត្រ</h3>
                      <p className="text-slate-400 text-sm md:text-base font-bold font-siemreap max-w-2xl mx-auto">
                        តាមដានវឌ្ឍនភាព ប្រឡងបញ្ចប់វគ្គ និងទាញយកសញ្ញាបត្រ (សិស្ស៖ <span className="font-black text-cyan-400 border-b border-cyan-400/50 pb-0.5">{loggedInStudent?.name}</span>)
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-10">
                      <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-[2rem] border border-slate-700 shadow-lg flex items-center gap-5 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center shadow-inner border border-blue-500/30 group-hover:scale-110 transition-transform"><BookOpen size={24}/></div>
                        <div><p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">វគ្គសិក្សាបានរៀន</p><p className="text-2xl font-black text-white">៣ <span className="text-sm font-normal text-slate-500">វគ្គ</span></p></div>
                      </div>
                      <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-[2rem] border border-slate-700 shadow-lg flex items-center gap-5 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-500/30 group-hover:scale-110 transition-transform"><CheckCircle2 size={24}/></div>
                        <div><p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">ពិន្ទុមធ្យម</p><p className="text-2xl font-black text-white">៨៥ <span className="text-sm font-normal text-slate-500">%</span></p></div>
                      </div>
                      <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-[2rem] border border-slate-700 shadow-lg flex items-center gap-5 hover:border-orange-500/50 hover:bg-slate-800 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center shadow-inner border border-orange-500/30 group-hover:scale-110 transition-transform"><Clock size={24}/></div>
                        <div><p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">ម៉ោងសិក្សា</p><p className="text-2xl font-black text-white">៣៤ <span className="text-sm font-normal text-slate-500">ម៉ោង</span></p></div>
                      </div>
                      <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-[2rem] border border-slate-700 shadow-lg flex items-center gap-5 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center shadow-inner border border-purple-500/30 group-hover:scale-110 transition-transform"><Award size={24}/></div>
                        <div><p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">សញ្ញាបត្រ</p><p className="text-2xl font-black text-white">១ <span className="text-sm font-normal text-slate-500">សន្លឹក</span></p></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                      <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700 shadow-lg flex flex-col hover:border-cyan-500/30 transition-colors">
                        <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                          <h4 className="font-muol text-lg text-white flex items-center gap-3"><TrendingUp size={22} className="text-cyan-400"/> វឌ្ឍនភាពវគ្គសិក្សាបច្ចុប្បន្ន</h4>
                        </div>
                        <div className="space-y-7 flex-1">
                          {[
                            { name: 'អក្ខរកម្មប្រព័ន្ធផ្សព្វផ្សាយ (MIL)', percent: 80, color: 'bg-gradient-to-r from-orange-400 to-orange-500', glow: 'shadow-[0_0_10px_rgba(249,115,22,0.5)]' },
                            { name: 'បញ្ញាសិប្បនិម្មិត (AI)', percent: 45, color: 'bg-gradient-to-r from-indigo-400 to-purple-500', glow: 'shadow-[0_0_10px_rgba(168,85,247,0.5)]' },
                            { name: 'សុវត្ថិភាពលើបណ្តាញអ៊ិនធឺណិត', percent: 100, color: 'bg-gradient-to-r from-emerald-400 to-green-500', glow: 'shadow-[0_0_10px_rgba(16,185,129,0.5)]' },
                          ].map((course, idx) => (
                            <div key={idx} className="group cursor-pointer">
                              <div className="flex justify-between items-end mb-3">
                                <span className="text-[13px] font-bold text-slate-300 group-hover:text-cyan-300 transition-colors">{course.name}</span>
                                <span className="text-[11px] font-black text-cyan-200 bg-cyan-900/50 border border-cyan-500/30 px-2 py-1 rounded-lg">{course.percent}%</span>
                              </div>
                              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden shadow-inner border border-slate-700">
                                <div className={`h-full ${course.color} ${course.glow} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${course.percent}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700 shadow-lg hover:border-purple-500/30 transition-colors">
                        <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                          <h4 className="font-muol text-lg text-white flex items-center gap-3"><Award size={22} className="text-purple-400"/> ការប្រឡង និងសញ្ញាបត្រ</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border border-emerald-500/30 bg-emerald-900/20 hover:bg-emerald-900/40 hover:border-emerald-500/60 transition-all cursor-pointer group gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <div className="w-12 h-12 rounded-[1rem] bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                                <Award size={20} />
                              </div>
                              <div>
                                <p className="text-[13px] font-bold text-white mb-1">សុវត្ថិភាពលើបណ្តាញអ៊ិនធឺណិត</p>
                                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">ប្រឡងជាប់ (ពិន្ទុ ៩៥%)</p>
                              </div>
                            </div>
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 px-5 py-2.5 rounded-xl text-[11px] font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:bg-emerald-500 hover:text-white transition-colors active:scale-95">
                              <Download size={14} /> ទាញយក
                            </button>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border border-cyan-500/30 bg-cyan-900/20 hover:bg-cyan-900/40 hover:border-cyan-500/60 transition-all cursor-pointer group gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <div className="w-12 h-12 rounded-[1rem] bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform">
                                <FileTextIcon size={20} />
                              </div>
                              <div>
                                <p className="text-[13px] font-bold text-white mb-1">អក្ខរកម្មប្រព័ន្ធផ្សព្វផ្សាយ (MIL)</p>
                                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">សិក្សាបញ្ចប់ ១០០%</p>
                              </div>
                            </div>
                            <button className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2.5 rounded-xl text-[11px] font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:opacity-90 transition-colors active:scale-95">
                              ប្រឡងបញ្ជាក់
                            </button>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border border-slate-700 bg-slate-800/40 opacity-70 gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <div className="w-12 h-12 rounded-[1rem] bg-slate-700 text-slate-400 flex items-center justify-center shadow-inner border border-slate-600">
                                <LockIcon size={20} />
                              </div>
                              <div>
                                <p className="text-[13px] font-bold text-slate-300 mb-1">បញ្ញាសិប្បនិម្មិត (AI)</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">មិនទាន់អាចប្រឡងបាន</p>
                              </div>
                            </div>
                            <span className="w-full sm:w-auto text-center text-[11px] font-black text-slate-500 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                              ៤៥%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Modal */}
            {showProfileModal && (
              <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 font-siemreap">
                <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-300 border border-gray-100">
                  <button onClick={() => setShowProfileModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition"><X size={20} /></button>
                  <div className="text-center">
                    <h3 className="text-xl font-muol text-slate-800 mb-6">ព័ត៌មានផ្ទាល់ខ្លួន</h3>
                    <div className="relative w-32 h-32 mx-auto mb-5 group">
                      <div className="w-full h-full bg-blue-50 rounded-[2rem] border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-blue-400">
                        {loggedInStudent?.profilePic ? <img src={loggedInStudent.profilePic} alt="Profile" className="w-full h-full object-cover" /> : <UserIcon size={48} />}
                      </div>
                      <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-2xl cursor-pointer hover:bg-blue-700 transition shadow-xl hover:scale-105 border-4 border-white">
                        <Edit2 size={16} />
                        <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
                      </label>
                    </div>
                    <h4 className="text-2xl font-black text-slate-800 mb-1">{loggedInStudent?.name}</h4>
                    <p className="text-xs text-gray-500 font-bold mb-6">សិស្សថ្នាក់ទី <span className="text-blue-600">{loggedInStudent?.grade}</span></p>
                    <div className="bg-gray-50 rounded-3xl p-5 space-y-4 text-left border border-gray-100">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200/60"><span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">លេខសម្គាល់ (UID)</span><span className="text-sm font-mono font-bold text-slate-800">{loggedInStudent?.uid}</span></div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200/60"><span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">ភេទ</span><span className="text-sm font-bold text-slate-800">{loggedInStudent?.gender}</span></div>
                      <div className="flex justify-between items-center"><span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">អវត្តមានសរុប</span><span className={`text-xs font-black px-4 py-1.5 rounded-xl ${loggedInStudent?.absent >= 5 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{loggedInStudent?.absent} ដង</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Chatbot Widget */}
            <div className="fixed bottom-6 right-6 z-[100] font-siemreap flex flex-col items-end">
                {isChatOpen && (
                    <div className="bg-white rounded-[2rem] shadow-2xl border border-blue-100 w-[350px] sm:w-[400px] h-[500px] mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"><Sparkles size={20} className="text-blue-50" /></div>
                                <div><h3 className="font-bold text-lg leading-tight">គ្រូជំនួយ AI ✨</h3><p className="text-xs text-blue-100 opacity-90">រងចាំឆ្លើយសំណួររបស់អ្នក</p></div>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm shadow-sm' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm shadow-sm leading-relaxed'}`}>
                                        {(msg.text || '').split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)}
                                    </div>
                                </div>
                            ))}
                            {isChatLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm flex gap-2 items-center shadow-sm">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full pr-2 pl-4 py-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()} placeholder="សួរសំណួរមេរៀនទីនេះ..." className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-700 placeholder-slate-400" disabled={isChatLoading} />
                                <button onClick={handleSendChatMessage} disabled={!chatInput.trim() || isChatLoading} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${chatInput.trim() && !isChatLoading ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105' : 'bg-slate-200 text-slate-400'}`}>
                                    <Send size={18} className={chatInput.trim() && !isChatLoading ? 'ml-1' : ''} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <button onClick={() => setIsChatOpen(!isChatOpen)} className={`flex items-center gap-3 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${isChatOpen ? 'bg-slate-800 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/50'}`}>
                    {isChatOpen ? <X size={28} /> : <><Bot size={28} /><span className="font-bold hidden md:inline-block pr-2">សួរ AI ✨</span></>}
                </button>
            </div>
            
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-slate-900 flex flex-col font-siemreap overflow-x-hidden relative" style={{ backgroundImage: `linear-gradient(to bottom, rgba(248, 250, 252, 0.85), rgba(241, 245, 249, 0.95)), url('ramit0000.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <style>{fontStyles}</style>

      {/* Admin Top Navbar */}
      {currentAppMode === 'app' && activeRole === 'admin' && (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 flex justify-between items-center gap-6 sticky top-0 z-[110] border-b border-slate-800 shadow-2xl px-8">
          <div className="flex gap-6">
              <button onClick={() => setUserRole('student')} className={`flex items-center gap-3 px-8 py-3 rounded-2xl transition font-bold text-xs ${userRole === 'student' ? 'bg-blue-600 shadow-xl shadow-blue-900' : 'bg-slate-800/80 hover:bg-slate-700'}`}><Smartphone size={16} /> <span className="font-muol text-[10px] uppercase tracking-widest">ផ្នែកសិស្ស (Preview)</span></button>
              <button onClick={() => setUserRole('admin')} className={`flex items-center gap-3 px-8 py-3 rounded-2xl transition font-bold text-xs ${userRole === 'admin' ? 'bg-blue-600 shadow-xl shadow-blue-900' : 'bg-slate-800/80 hover:bg-slate-700'}`}><LayoutDashboard size={16} /> <span className="font-muol text-[10px] uppercase tracking-widest">ផ្នែកគ្រប់គ្រង (Admin)</span></button>
          </div>
          <button onClick={handleLogoutRole} className="flex items-center gap-2 px-6 py-2 bg-red-600/90 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-colors"><LogOut size={16} /> ចាកចេញ (Admin)</button>
        </div>
      )}

      {currentAppMode === 'app' && (
          <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 animate-in fade-in duration-700 relative z-10">
            {userRole === 'student' || activeRole === 'student' ? renderStudentAppView() : renderAdminDashboardView()}
          </main>
      )}
    </div>
  );
}