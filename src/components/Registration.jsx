import { useState } from "react";

export default function Registration({ onStart }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [langs, setLangs] = useState([]);

  const toggleLang = (lang) => {
    if (langs.includes(lang)) {
      setLangs(langs.filter((x) => x !== lang));
    } else {
      if (langs.length >= 3) return;
      setLangs([...langs, lang]);
    }
  };

  const submit = () => {
    if (langs.length < 2) {
      alert("Select at least 2 languages");
      return;
    }

    onStart({
      ...form,
      languages: langs,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        overflow: "hidden",
       
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#fff",
          borderRadius: "24px",
          padding: "40px",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#0f172a",
            fontWeight: "700",
          }}
        >
          Assessment Portal
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Python • R • SAS Assessment
        </p>

        <input
          className="form-control mb-3"
          placeholder="Full Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Email Address"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          className="form-control mb-4"
          placeholder="Phone Number"
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <h5
          style={{
            marginBottom: "15px",
          }}
        >
          Select Languages
        </h5>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          {["python", "r", "sas"].map(
            (lang) => (
              <button
                key={lang}
                type="button"
                onClick={() =>
                  toggleLang(lang)
                }
                style={{
                  border: langs.includes(
                    lang
                  )
                    ? "2px solid #22c55e"
                    : "2px solid #e2e8f0",
                  background:
                    langs.includes(lang)
                      ? "#dcfce7"
                      : "#fff",
                  borderRadius: "12px",
                  padding:
                    "12px 20px",
                  cursor: "pointer",
                }}
              >
                {lang.toUpperCase()}
              </button>
            )
          )}
        </div>

        <button
          onClick={submit}
          style={{
            width: "100%",
            background:
              "linear-gradient(90deg,#00D0F7,#00C853)",
            border: "none",
            color: "#fff",
            padding: "14px",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
}