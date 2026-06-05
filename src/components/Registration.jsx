import { useState } from "react";

const LANGS = ["python", "r", "sas"];

const LANG_ICONS = {
  python: "🐍",
  r: "📊",
  sas: "💻",
};

export default function Registration({ onStart }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [langs, setLangs] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const [shaking, setShaking] = useState(false);

  const shake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 420);
  };

  const updateForm = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const toggleLang = (lang) =>
    setLangs((prev) =>
      prev.includes(lang) ? prev.filter((x) => x !== lang) : [...prev, lang],
    );

  const handleNext = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      shake();
      return;
    }
    if (form.phone.length !== 10) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }
    setStep(2);
  };

  const handleStart = () => {
    if (langs.length < 2) {
      alert("Please select at least 2 technologies.");
      return;
    }
    if (!agreed) {
      alert("Please accept the Terms & Conditions.");
      return;
    }
    const examMinutes = langs.length === 2 ? 40 : 60;
    onStart({ ...form, languages: langs, examMinutes });
  };

  const durationText =
    langs.length === 2
      ? "60 minutes · 2 technologies selected"
      : langs.length === 3
        ? "80 minutes · 3 technologies selected"
        : "Select 2+ technologies to see duration";

  const durationReady = langs.length >= 2;

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.card,
          transform: shaking ? "translateX(5px)" : "translateX(0)",
          transition: "transform 0.07s",
        }}
      >
        {/* Logo bar */}
        <div style={styles.logoBar}>
          <div style={styles.logoIcon}>
            <span style={{ color: "#fff", fontSize: 18 }}>⚕</span>
          </div>
          <div>
            <div style={styles.logoText}>Clinovo</div>
            <div style={styles.logoSub}>Assessment Portal</div>
          </div>
        </div>

        {/* Step indicator */}
        <div style={styles.stepBar}>
          <div style={{ ...styles.stepDot, background: "#04122B" }} />
          <div
            style={{
              ...styles.stepDot,
              background: step === 2 ? "#04122B" : "#E2E8F0",
            }}
          />
          <span style={styles.stepLabel}>
            {step === 1
              ? "Step 1 of 2 — Your details"
              : "Step 2 of 2 — Assessment setup"}
          </span>
        </div>

        {/* ── Step 1 ── */}
        {step === 1 && (
          <>
            <h2 style={styles.heading}>Welcome</h2>
            

            <Field label="Full name">
              <input
                style={styles.input}
                placeholder="e.g. John Doe"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
              />
            </Field>

            <Field label="Email address">
              <input
                style={styles.input}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
              />
            </Field>

            <Field label="Mobile number">
              <div style={styles.phoneRow}>
                <div style={styles.prefix}>+91</div>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  placeholder="10-digit number"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    updateForm("phone", e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
            </Field>

            <div style={{ height: 16 }} />
            <PrimaryBtn onClick={handleNext}>Continue →</PrimaryBtn>
          </>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <>
            <button style={styles.backBtn} onClick={() => setStep(1)}>
              ← Back
            </button>

            <h2 style={styles.heading}>Choose technologies</h2>
            <p style={styles.subtext}>Select at least 2 to begin</p>

            <div style={styles.langGrid}>
              {LANGS.map((lang) => {
                const sel = langs.includes(lang);
                return (
                  <button
                    key={lang}
                    onClick={() => toggleLang(lang)}
                    style={{
                      ...styles.langBtn,
                      border: sel ? "2px solid #04122B" : "0.5px solid #CBD5E1",
                      background: sel ? "#EBF4FF" : "#fff",
                      color: sel ? "#04122B" : "#64748B",
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{LANG_ICONS[lang]}</span>
                    {lang.toUpperCase()}
                    {sel && <span style={styles.checkBadge}>✓</span>}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                ...styles.durationBadge,
                background: durationReady ? "#EAF3DE" : "#F8FAFC",
                border: `0.5px solid ${durationReady ? "#97C459" : "#E2E8F0"}`,
                color: durationReady ? "#3B6D11" : "#94A3B8",
              }}
            >
              🕐 {durationText}
            </div>

            <div style={styles.infoBox}>
              {[
                ["🔄", "Refreshing or closing the page will terminate the assessment and all unsaved and saved answers will be lost"],
                ["⛶", "Fullscreen mode is required throughout"],
                ["⚠", "Max 3 violations — auto-submit on 4th"],
                ["⇄", "Tab switching and browser refresh are prohibited"],
                ["⏱", "2 technologies = 60 min  ·  3 technologies = 80 min"],
                ["📝", "Candidates must complete all Aptitude Assessment sections before proceeding to submission"]
              ].map(([icon, text]) => (
                <div key={text} style={styles.infoRow}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{icon}</span>
                  <span style={styles.infoText}>{text}</span>
                </div>
              ))}
            </div>

            <div style={styles.termsRow} onClick={() => setAgreed((a) => !a)}>
              <div
                style={{
                  ...styles.checkbox,
                  background: agreed ? "#04122B" : "#fff",
                  borderColor: agreed ? "#04122B" : "#CBD5E1",
                }}
              >
                {agreed && (
                  <span style={{ color: "#fff", fontSize: 11 }}>✓</span>
                )}
              </div>
              <span style={styles.termsText}>
                I have read all instructions and agree to the Terms & Conditions
              </span>
            </div>

            <PrimaryBtn onClick={handleStart}>Start assessment </PrimaryBtn>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

function PrimaryBtn({ onClick, children }) {
  return (
    <button onClick={onClick} style={styles.primaryBtn}>
      {children}
    </button>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#04122B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 500,
    padding: "36px 32px",
    boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
  },
  logoBar: { display: "flex", alignItems: "center", gap: 10, marginBottom: 22 },
  logoIcon: {
    width: 36,
    height: 36,
    background: "#04122B",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontSize: 15, fontWeight: 600, color: "#04122B" },
  logoSub: { fontSize: 11, color: "#94A3B8" },
  stepBar: { display: "flex", alignItems: "center", gap: 6, marginBottom: 22 },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    transition: "background 0.2s",
  },
  stepLabel: { fontSize: 12, color: "#94A3B8", marginLeft: 4 },
  heading: { fontSize: 22, fontWeight: 700, color: "#04122B", marginBottom: 6 },
  pillRow: { display: "flex", gap: 6, marginBottom: 22, flexWrap: "wrap" },
  pill: {
    background: "#F1F5F9",
    border: "0.5px solid #E2E8F0",
    borderRadius: 100,
    padding: "2px 10px",
    fontSize: 12,
    color: "#64748B",
  },
  label: { display: "block", fontSize: 12, color: "#64748B", marginBottom: 5 },
  input: {
    width: "100%",
    height: 40,
    border: "0.5px solid #CBD5E1",
    borderRadius: 8,
    padding: "0 12px",
    fontSize: 14,
    color: "#0F172A",
    outline: "none",
    background: "#fff",
  },
  phoneRow: { display: "flex", gap: 8 },
  prefix: {
    height: 40,
    padding: "0 12px",
    border: "0.5px solid #CBD5E1",
    borderRadius: 8,
    background: "#F8FAFC",
    color: "#64748B",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  primaryBtn: {
    width: "100%",
    height: 44,
    background: "#04122B",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 13,
    color: "#64748B",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    marginBottom: 14,
  },
  subtext: { fontSize: 13, color: "#94A3B8", marginBottom: 16 },
  langGrid: { display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" },
  langBtn: {
    flex: "1 1 120px",
    height: 54,
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    position: "relative",
    transition: "all 0.15s",
  },
  checkBadge: {
    position: "absolute",
    top: 5,
    right: 8,
    fontSize: 11,
    color: "#04122B",
  },
  durationBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 100,
    padding: "5px 14px",
    fontSize: 13,
    marginBottom: 16,
    transition: "all 0.2s",
  },
  infoBox: {
    background: "#F8FAFC",
    border: "0.5px solid #E2E8F0",
    borderRadius: 10,
    padding: "12px 14px",
    marginBottom: 18,
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    padding: "4px 0",
  },
  infoText: { fontSize: 13, color: "#64748B" },
  termsRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 18,
    cursor: "pointer",
  },
  checkbox: {
    width: 18,
    height: 18,
    border: "1.5px solid",
    borderRadius: 4,
    flexShrink: 0,
    marginTop: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
  },
  termsText: { fontSize: 13, color: "#64748B", lineHeight: 1.5 },
};
