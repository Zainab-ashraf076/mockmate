"use client";
import { useState, useRef, useEffect } from "react";

const ROLES = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "React Developer", "UI/UX Designer", "Product Manager",
  "Data Analyst", "DevOps Engineer", "Software Engineer"
];
const COMPANIES = [
  "Google", "Amazon", "Microsoft", "Flipkart", "Zomato",
  "Swiggy", "Razorpay", "Paytm", "Infosys", "TCS", "Startup"
];
const LEVELS = ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"];
const AVATARS = { interviewer: "👩‍💼", user: "🧑‍💻" };

// ── Setup Screen ─────────────────────────────────────────────────────
function SetupScreen({ onStart }) {
  const [role, setRole] = useState("Frontend Developer");
  const [company, setCompany] = useState("Google");
  const [level, setLevel] = useState("Fresher");
  const [name, setName] = useState("");

  const Select = ({ label, value, options, onChange }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#a0856a" }}>{label}</label>
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl text-sm font-medium appearance-none cursor-pointer outline-none transition-all"
          style={{ background: "#fff8f3", border: "2px solid #f0d5c0", color: "#3d2b1f", fontFamily: "'DM Sans',sans-serif" }}
          onFocus={e => e.target.style.borderColor = "#e8956d"}
          onBlur={e => e.target.style.borderColor = "#f0d5c0"}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs" style={{ color: "#c4845a" }}>▾</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #fdf6ef 0%, #fce8d8 50%, #fdf0e8 100%)" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');*{box-sizing:border-box}`}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #f4a97a, transparent)" }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #e8956d, transparent)" }} />
      </div>
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-4 shadow-lg text-4xl"
            style={{ background: "linear-gradient(135deg, #f4a97a, #e8714a)" }}>🎯</div>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Fraunces',serif", color: "#2d1810" }}>MockMate</h1>
          <p className="text-sm" style={{ color: "#a0856a", fontFamily: "'DM Sans',sans-serif" }}>Your friendly AI interview coach</p>
        </div>
        <div className="rounded-3xl p-6 shadow-xl" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(240,213,192,0.6)" }}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#a0856a" }}>Your Name</label>
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="e.g. Zainab"
                className="px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
                style={{ background: "#fff8f3", border: "2px solid #f0d5c0", color: "#3d2b1f", fontFamily: "'DM Sans',sans-serif" }}
                onFocus={e => e.target.style.borderColor = "#e8956d"}
                onBlur={e => e.target.style.borderColor = "#f0d5c0"} />
            </div>
            <Select label="Applying For" value={role} options={ROLES} onChange={setRole} />
            <Select label="Company" value={company} options={COMPANIES} onChange={setCompany} />
            <Select label="Experience Level" value={level} options={LEVELS} onChange={setLevel} />
            <div className="rounded-2xl p-3 mt-1" style={{ background: "#fff8f3", border: "1px solid #f0d5c0" }}>
              <div className="text-xs font-semibold mb-2" style={{ color: "#a0856a" }}>COVERS</div>
              <div className="flex flex-wrap gap-1.5">
                {["💻 Technical", "🧩 DSA", "⚙️ System Design", "🌐 Frontend", "💬 HR", "🌟 Behavioural"].map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: "#fde8d8", color: "#c4603a" }}>{t}</span>
                ))}
              </div>
            </div>
            <button onClick={() => onStart({ name: name || "Candidate", role, company, level })}
              className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-[1.02] active:scale-[0.98] mt-1"
              style={{ background: "linear-gradient(135deg, #f4935a, #e85d2d)", boxShadow: "0 8px 24px rgba(232,93,45,0.35)", fontFamily: "'Fraunces',serif", letterSpacing: "0.02em" }}>
              Start Interview →
            </button>
          </div>
        </div>
        <p className="text-center text-xs mt-4" style={{ color: "#c4a090", fontFamily: "'DM Sans',sans-serif" }}>
          Powered by Claude AI · ~8-10 questions
        </p>
      </div>
    </div>
  );
}

// ── Message Bubble ────────────────────────────────────────────────────
function Bubble({ msg, isNew }) {
  const isAI = msg.role === "ai";
  return (
    <div className={`flex gap-3 ${isAI ? "" : "flex-row-reverse"}`}
      style={{ animation: isNew ? "fadeSlideIn 0.4s ease forwards" : "none" }}>
      <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
        style={{ background: isAI ? "linear-gradient(135deg,#f4935a,#e85d2d)" : "linear-gradient(135deg,#7dd3c8,#4ab8af)" }}>
        {isAI ? AVATARS.interviewer : AVATARS.user}
      </div>
      <div className="max-w-[78%] flex flex-col gap-1" style={{ alignItems: isAI ? "flex-start" : "flex-end" }}>
        <div className="text-xs font-semibold" style={{ color: isAI ? "#c4603a" : "#4a9590", fontFamily: "'DM Sans',sans-serif" }}>
          {isAI ? "Priya (Interviewer)" : "You"}
        </div>
        <div className="px-4 py-3 rounded-3xl text-sm leading-relaxed shadow-sm"
          style={{
            background: isAI ? "#ffffff" : "linear-gradient(135deg,#7dd3c8,#4ab8af)",
            color: isAI ? "#3d2b1f" : "#fff",
            borderTopLeftRadius: isAI ? "6px" : "24px",
            borderTopRightRadius: isAI ? "24px" : "6px",
            border: isAI ? "1px solid #f0d5c0" : "none",
            fontFamily: "'DM Sans',sans-serif",
            boxShadow: isAI ? "0 2px 12px rgba(200,130,90,0.1)" : "0 2px 12px rgba(74,184,175,0.3)"
          }}>
          {msg.content}
        </div>
        {msg.time && <div className="text-[10px] px-1" style={{ color: "#c4a090" }}>{msg.time}</div>}
      </div>
    </div>
  );
}

// ── Feedback Card ─────────────────────────────────────────────────────
function FeedbackCard({ feedback, onRestart }) {
  const score = feedback.score || 7;
  const pct = (score / 10) * 100;
  const color = score >= 8 ? "#4ab8af" : score >= 6 ? "#f4935a" : "#e85d2d";
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #fdf6ef 0%, #fce8d8 50%, #fdf0e8 100%)" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap')`}</style>
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{score >= 8 ? "🏆" : score >= 6 ? "💪" : "📚"}</div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Fraunces',serif", color: "#2d1810" }}>Interview Complete!</h2>
          <p className="text-sm mt-1" style={{ color: "#a0856a" }}>Here's your detailed feedback</p>
        </div>
        <div className="rounded-3xl p-6 shadow-xl mb-4" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(240,213,192,0.6)" }}>
          <div className="flex items-center justify-between mb-5 p-4 rounded-2xl" style={{ background: "#fff8f3" }}>
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#a0856a" }}>Overall Score</div>
              <div className="text-4xl font-bold" style={{ fontFamily: "'Fraunces',serif", color }}>
                {score}<span className="text-lg text-gray-400">/10</span>
              </div>
            </div>
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f0d5c0" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3"
                  strokeDasharray={`${pct} 100`} strokeLinecap="round" style={{ transition: "stroke-dasharray 1s ease" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color }}>{score}/10</div>
            </div>
          </div>
          {feedback.strengths?.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2"><span>✅</span><div className="text-sm font-semibold" style={{ color: "#2d7d78" }}>Strengths</div></div>
              <div className="flex flex-col gap-1.5 pl-6">
                {feedback.strengths.map((s, i) => (
                  <div key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: "#3d5050", fontFamily: "'DM Sans',sans-serif" }}>
                    <span style={{ color: "#4ab8af" }}>•</span> {s}
                  </div>
                ))}
              </div>
            </div>
          )}
          {feedback.improvements?.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2"><span>📈</span><div className="text-sm font-semibold" style={{ color: "#b55a2a" }}>Areas to Improve</div></div>
              <div className="flex flex-col gap-1.5 pl-6">
                {feedback.improvements.map((s, i) => (
                  <div key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: "#5d3a28", fontFamily: "'DM Sans',sans-serif" }}>
                    <span style={{ color: "#f4935a" }}>•</span> {s}
                  </div>
                ))}
              </div>
            </div>
          )}
          {feedback.tip && (
            <div className="rounded-2xl p-3 mt-2" style={{ background: "linear-gradient(135deg,#fff8f3,#fde8d8)", border: "1px solid #f0d5c0" }}>
              <div className="text-xs font-semibold mb-1" style={{ color: "#a0856a" }}>💡 PRO TIP</div>
              <div className="text-sm leading-relaxed" style={{ color: "#5d3a28", fontFamily: "'DM Sans',sans-serif" }}>{feedback.tip}</div>
            </div>
          )}
        </div>
        <button onClick={onRestart}
          className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg,#f4935a,#e85d2d)", color: "white", fontFamily: "'Fraunces',serif", boxShadow: "0 6px 20px rgba(232,93,45,0.3)" }}>
          Practice Again 🔄
        </button>
      </div>
    </div>
  );
}

// ── Interview Screen ──────────────────────────────────────────────────
function InterviewScreen({ config, onFinish }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [qCount, setQCount] = useState(0);
  const [done, setDone] = useState(false);
  const [newMsgIdx, setNewMsgIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]);
  const MAX_Q = 8;

  const time = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const addMsg = (role, content) => {
    historyRef.current = [...historyRef.current, { role: role === "ai" ? "assistant" : "user", content }];
    setMessages(prev => { setNewMsgIdx(prev.length); return [...prev, { role, content, time: time() }]; });
  };

  const systemPrompt = `You are Priya, a warm, encouraging, and professional interviewer at ${config.company} interviewing ${config.name} for a ${config.role} position (${config.level} level).

Your personality: Friendly but thorough. You make candidates feel comfortable while still asking challenging questions. You occasionally give small encouraging remarks like "Great!" or "Interesting approach!".

Interview style:
- Mix technical questions (React, JS, CSS, DSA basics, system design), HR questions, and behavioural questions
- Ask ONE question at a time
- After the candidate answers, give a brief 1-2 sentence acknowledgement of their answer
- Then ask the next question
- Keep track — you will ask exactly ${MAX_Q} questions total
- After the ${MAX_Q}th answer, say a warm closing like "That wraps up our interview! You did great. I'll share feedback shortly." and end with INTERVIEW_COMPLETE

Format each response naturally as a human interviewer would speak.
Do NOT number questions. Do NOT say "Question 1" etc.
Start by warmly greeting ${config.name} and asking your first question immediately.`;

  useEffect(() => { startInterview(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const callAI = async (userMsg) => {
    const msgs = userMsg
      ? [...historyRef.current, { role: "user", content: userMsg }]
      : historyRef.current.length > 0 ? historyRef.current : [{ role: "user", content: "Begin the interview." }];

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: msgs, system: systemPrompt, max_tokens: 600 }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.text;
  };

  const startInterview = async () => {
    setLoading(true);
    try {
      const reply = await callAI(null);
      historyRef.current = [{ role: "assistant", content: reply }];
      setMessages([{ role: "ai", content: reply, time: time() }]);
      setNewMsgIdx(0);
      setQCount(1);
    } catch {
      const fallback = `Hi ${config.name}! I'm Priya. Welcome to your ${config.role} interview at ${config.company}. Let's get started! Tell me about yourself and your experience.`;
      historyRef.current = [{ role: "assistant", content: fallback }];
      setMessages([{ role: "ai", content: fallback, time: time() }]);
      setQCount(1);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const sendAnswer = async () => {
    if (!input.trim() || loading) return;
    const ans = input.trim();
    setInput("");
    addMsg("user", ans);
    setLoading(true);
    try {
      const reply = await callAI(ans);
      addMsg("ai", reply);
      if (reply.includes("INTERVIEW_COMPLETE") || qCount >= MAX_Q) {
        setDone(true);
        setTimeout(() => getFeedback(), 1500);
      } else {
        setQCount(q => q + 1);
      }
    } catch {
      addMsg("ai", "Sorry, I had a connection issue! Could you repeat that?");
    }
    setLoading(false);
  };

  const getFeedback = async () => {
    const transcriptText = historyRef.current
      .filter(m => m.role === "user")
      .map((m, i) => `Answer ${i + 1}: ${m.content}`)
      .join("\n\n");

    const feedbackPrompt = `Based on this interview for ${config.role} at ${config.company} (${config.level} level), evaluate the candidate's performance.

Candidate answers:
${transcriptText}

Return a JSON object (no markdown, no explanation, just JSON):
{
  "score": <number 1-10>,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["area 1", "area 2", "area 3"],
  "tip": "one actionable pro tip for next interview"
}`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: feedbackPrompt }], max_tokens: 600 }),
      });
      const data = await res.json();
      const clean = data.text.replace(/```json|```/g, "").trim();
      onFinish(JSON.parse(clean));
    } catch {
      onFinish({
        score: 7,
        strengths: ["Good communication", "Attempted all questions", "Showed enthusiasm"],
        improvements: ["Be more specific with examples", "Practice DSA problems", "Use STAR method for behavioural answers"],
        tip: "Always back up your answers with real examples from your projects or experience."
      });
    }
  };

  const progress = Math.round((qCount / MAX_Q) * 100);

  return (
    <div className="h-screen flex flex-col" style={{ background: "linear-gradient(160deg, #fdf6ef 0%, #fce8d8 100%)", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        textarea::-webkit-scrollbar { width: 4px; }
        textarea::-webkit-scrollbar-thumb { background: #f0d5c0; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", borderColor: "#f0d5c0" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm"
            style={{ background: "linear-gradient(135deg,#f4935a,#e85d2d)" }}>🎯</div>
          <div>
            <div className="font-bold text-sm" style={{ fontFamily: "'Fraunces',serif", color: "#2d1810" }}>MockMate</div>
            <div className="text-xs" style={{ color: "#a0856a" }}>{config.role} · {config.company}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "#fff8f3", color: "#c4603a", border: "1px solid #f0d5c0" }}>
            Q {Math.min(qCount, MAX_Q)}/{MAX_Q}
          </div>
          <div className="w-24 h-2 rounded-full overflow-hidden hidden sm:block" style={{ background: "#f0d5c0" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg,#f4935a,#e85d2d)" }} />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#f0d5c0 transparent" }}>
        {messages.map((msg, i) => <Bubble key={i} msg={msg} isNew={i === newMsgIdx} />)}
        {loading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#f4935a,#e85d2d)" }}>👩‍💼</div>
            <div className="px-4 py-3 rounded-3xl rounded-tl-md flex items-center gap-1.5"
              style={{ background: "#ffffff", border: "1px solid #f0d5c0" }}>
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full"
                  style={{ background: "#f4935a", animation: `bounce 0.8s ${i * 0.15}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        {done && !loading && (
          <div className="text-center py-4">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: "#fff8f3", color: "#c4603a", border: "1px solid #f0d5c0" }}>
              ⏳ Generating your feedback…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!done && (
        <div className="px-4 py-3 border-t flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderColor: "#f0d5c0" }}>
          <div className="flex gap-3 items-end max-w-3xl mx-auto">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendAnswer(); } }}
              placeholder="Type your answer… (Enter to send)"
              rows={2}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-2xl text-sm resize-none outline-none transition-all leading-relaxed"
              style={{ background: "#fff8f3", border: "2px solid #f0d5c0", color: "#3d2b1f", fontFamily: "'DM Sans',sans-serif", maxHeight: "120px" }}
              onFocus={e => e.target.style.borderColor = "#e8956d"}
              onBlur={e => e.target.style.borderColor = "#f0d5c0"}
            />
            <button onClick={sendAnswer} disabled={loading || !input.trim()}
              className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white flex-shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#f4935a,#e85d2d)", boxShadow: "0 4px 14px rgba(232,93,45,0.35)" }}>
              ↑
            </button>
          </div>
          <div className="text-center mt-2 text-[11px]" style={{ color: "#c4a090" }}>
            Shift+Enter for new line · Enter to send
          </div>
        </div>
      )}
    </div>
  );
}

// ── App Root ──────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("setup");
  const [config, setConfig] = useState(null);
  const [feedback, setFeedback] = useState(null);

  if (screen === "setup") return <SetupScreen onStart={cfg => { setConfig(cfg); setScreen("interview"); }} />;
  if (screen === "interview") return <InterviewScreen config={config} onFinish={fb => { setFeedback(fb); setScreen("feedback"); }} />;
  if (screen === "feedback") return <FeedbackCard feedback={feedback} onRestart={() => { setConfig(null); setFeedback(null); setScreen("setup"); }} />;
}
