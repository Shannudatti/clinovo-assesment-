// // Imports
// import { useEffect, useState } from "react";
// import jsPDF from "jspdf";

// import Registration from "./components/Registration";
// import MCQSection from "./components/MCQSection";
// import CodingSection from "./components/CodingSection";
// import AptitudeSection from "./components/AptitudeSection";
// import Timer from "./components/Timer";

// import { pythonMCQs, pythonCoding } from "./data/pythonQuestions";
// import { rMCQs, rCoding } from "./data/rQuestions";
// import { sasMCQs, sasCoding } from "./data/sasQuestions";
// import {
//   aptitudeMCQs,
//   verbalAbilityMCQs,
//   verbalReasoningMCQs,
//   dataInterpretationMCQs,
//   logicBuildingMCQs,
// } from "./data/aptitudeQuestions";
// import { getAssessmentQuestions } from "./utils/randomizer";

// // ─────────────────────────────────────────────
// // Constants
// // ─────────────────────────────────────────────
// const MAX_VIOLATIONS = 3;

// // Aptitude subsections — mandatory for every candidate
// const APTITUDE_SECTIONS = [
//   { title: "Aptitude", sectionKey: "aptitude", questions: aptitudeMCQs },
//   {
//     title: "Verbal Ability",
//     sectionKey: "verbalAbility",
//     questions: verbalAbilityMCQs,
//   },
//   {
//     title: "Verbal Reasoning",
//     sectionKey: "verbalReasoning",
//     questions: verbalReasoningMCQs,
//   },
//   {
//     title: "Data Interpretation",
//     sectionKey: "dataInterpretation",
//     questions: dataInterpretationMCQs,
//   },
//   {
//     title: "Logic Building",
//     sectionKey: "logicBuilding",
//     questions: logicBuildingMCQs,
//   },
// ];

// // ─────────────────────────────────────────────
// // Styles
// // ─────────────────────────────────────────────
// const styles = {
//   // ── Main exam page ──
//   page: {
//     minHeight: "100vh",
//     background: "linear-gradient(90deg, #04122B, #162F5C)",
//     padding: "20px",
//     paddingBottom: "100px",
//   },

//   // ── Header bar ──
//   headerBar: {
//     background: "#fff",
//     borderRadius: "16px",
//     padding: "16px 24px",
//     marginBottom: "20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: "12px",
//   },
//   headerLogo: { display: "flex", alignItems: "center", gap: "10px" },
//   headerLogoIcon: {
//     width: 34,
//     height: 34,
//     background: "#04122B",
//     borderRadius: "8px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#fff",
//     fontSize: "16px",
//   },
//   headerLogoText: {
//     fontSize: "15px",
//     fontWeight: 600,
//     color: "#04122B",
//     margin: 0,
//   },
//   headerLogoSub: { fontSize: "11px", color: "#94A3B8", margin: 0 },
//   headerMeta: {
//     display: "flex",
//     alignItems: "center",
//     gap: "24px",
//     flexWrap: "wrap",
//   },
//   headerMetaItem: { display: "flex", flexDirection: "column", gap: "1px" },
//   headerMetaLabel: { fontSize: "11px", color: "#94A3B8", fontWeight: 500 },
//   headerMetaValue: (isRed) => ({
//     fontSize: "14px",
//     fontWeight: 600,
//     color: isRed ? "#dc2626" : "#04122B",
//     margin: 0,
//   }),

//   // ── Section divider label ──
//   sectionDivider: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     margin: "24px 0 12px",
//   },
//   sectionDividerLine: {
//     flex: 1,
//     height: "1px",
//     background: "rgba(255,255,255,0.12)",
//   },
//   sectionDividerLabel: {
//     fontSize: "11px",
//     fontWeight: 600,
//     letterSpacing: "0.08em",
//     color: "rgba(255,255,255,0.35)",
//     textTransform: "uppercase",
//     whiteSpace: "nowrap",
//   },

//   // ── Fixed submit bar ──
//   submitBarWrap: {
//     position: "fixed",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     zIndex: 100,
//     padding: "12px 24px",
//     background: "#04122B",
//     borderTop: "1px solid #162F5C",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: "16px",
//     flexWrap: "wrap",
//   },
//   submitBarInfo: { display: "flex", gap: "28px", flexWrap: "wrap" },
//   submitBarMetaItem: { display: "flex", flexDirection: "column", gap: "1px" },
//   submitBarMetaLabel: { fontSize: "11px", color: "#64748B", fontWeight: 500 },
//   submitBarMetaValue: (isRed) => ({
//     fontSize: "14px",
//     fontWeight: 500,
//     color: isRed ? "#f87171" : "#fff",
//     margin: 0,
//   }),
//   submitBtn: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "8px",
//     background: "#16a34a",
//     color: "#fff",
//     border: "none",
//     borderRadius: "10px",
//     padding: "12px 28px",
//     fontSize: "15px",
//     fontWeight: 600,
//     cursor: "pointer",
//     whiteSpace: "nowrap",
//   },

//   // ── Thank-you page ──
//   tyPage: {
//     minHeight: "100vh",
//     background: "#04122B",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "40px 20px",
//   },
//   tyInner: {
//     width: "100%",
//     maxWidth: "520px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   tyIconRing: {
//     width: 72,
//     height: 72,
//     borderRadius: "50%",
//     background: "#0F2B10",
//     border: "1.5px solid #22c55e",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: "20px",
//   },
//   tyHeading: {
//     fontSize: "24px",
//     fontWeight: 700,
//     color: "#fff",
//     margin: 0,
//     marginBottom: "6px",
//   },
//   tySub: {
//     fontSize: "14px",
//     color: "#94A3B8",
//     marginBottom: "28px",
//     lineHeight: 1.6,
//   },
//   tyStatusBox: {
//     display: "flex",
//     alignItems: "flex-start",
//     gap: "10px",
//     background: "#0A2010",
//     border: "0.5px solid #166534",
//     borderRadius: "10px",
//     padding: "14px 16px",
//     marginBottom: "16px",
//     width: "100%",
//     textAlign: "left",
//   },
//   tyStatusText: {
//     fontSize: "13px",
//     color: "#86efac",
//     lineHeight: 1.6,
//     margin: 0,
//   },
//   tySummaryCard: {
//     background: "#0C1E3D",
//     border: "0.5px solid #1E3A5F",
//     borderRadius: "12px",
//     width: "100%",
//     marginBottom: "20px",
//     overflow: "hidden",
//     textAlign: "left",
//   },
//   tySummaryHeader: {
//     padding: "10px 16px",
//     borderBottom: "0.5px solid #1E3A5F",
//     fontSize: "11px",
//     fontWeight: 500,
//     letterSpacing: "0.07em",
//     color: "#64748B",
//     textTransform: "uppercase",
//   },
//   tySummaryBody: {
//     padding: "4px 16px",
//   },
//   tySummaryRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "10px 0",
//     borderBottom: "0.5px solid #1A3050",
//   },
//   tySummaryRowLast: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "10px 0",
//   },
//   tySummaryLabel: {
//     fontSize: "13px",
//     color: "#64748B",
//     display: "flex",
//     alignItems: "center",
//     gap: "7px",
//   },
//   tySummaryValue: (isRed) => ({
//     fontSize: "13px",
//     color: isRed ? "#f87171" : "#CBD5E1",
//     fontWeight: 500,
//   }),
//   tyLangPills: {
//     display: "flex",
//     gap: "6px",
//     flexWrap: "wrap",
//     justifyContent: "flex-end",
//   },
//   tyLangPill: {
//     background: "#162F5C",
//     border: "0.5px solid #1E3A5F",
//     borderRadius: "100px",
//     padding: "3px 10px",
//     fontSize: "12px",
//     color: "#93C5FD",
//   },
//   tyFooter: {
//     fontSize: "13px",
//     color: "#475569",
//     marginTop: "4px",
//   },
//   spacer: { height: "20px" },
// };

// // ─────────────────────────────────────────────
// // PDF Helper
// // ─────────────────────────────────────────────
// const addLine = (pdf, text, y) => {
//   const lines = pdf.splitTextToSize(String(text), 180);
//   lines.forEach((line) => {
//     if (y > 270) {
//       pdf.addPage();
//       y = 10;
//     }
//     pdf.text(line, 10, y);
//     y += 6;
//   });
//   return y;
// };

// // ─────────────────────────────────────────────
// // Sub-components
// // ─────────────────────────────────────────────

// function SectionDivider({ label }) {
//   return (
//     <div style={styles.sectionDivider}>
//       <div style={styles.sectionDividerLine} />
//       <span style={styles.sectionDividerLabel}>{label}</span>
//       <div style={styles.sectionDividerLine} />
//     </div>
//   );
// }

// function HeaderBar({ candidate, violations, timerEl }) {
//   return (
//     <div style={styles.headerBar}>
//       <div style={styles.headerLogo}>
//         <div style={styles.headerLogoIcon}>⚕</div>
//         <div>
//           <p style={styles.headerLogoText}>Clinovo</p>
//           <p style={styles.headerLogoSub}>Assessment Portal</p>
//         </div>
//       </div>
//       <div style={styles.headerMeta}>
//         {timerEl}
//         <div style={styles.headerMetaItem}>
//           <span style={styles.headerMetaLabel}>Candidate</span>
//           <p style={styles.headerMetaValue(false)}>{candidate.name}</p>
//         </div>
//         <div style={styles.headerMetaItem}>
//           <span style={styles.headerMetaLabel}>Violations</span>
//           <p style={styles.headerMetaValue(violations > 0)}>
//             {violations} / {MAX_VIOLATIONS}
//           </p>
//         </div>
//         <div style={styles.headerMetaItem}>
//           <span style={styles.headerMetaLabel}>Languages</span>
//           <p style={styles.headerMetaValue(false)}>
//             {candidate.languages.map((l) => l.toUpperCase()).join(", ")}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SubmitBar({ candidate, violations, onSubmit ,isSubmitting,}) {
//   return (
//     <div style={styles.submitBarWrap}>
//       <div style={styles.submitBarInfo}>
//         <div style={styles.submitBarMetaItem}>
//           <span style={styles.submitBarMetaLabel}>Candidate</span>
//           <p style={styles.submitBarMetaValue(false)}>{candidate.name}</p>
//         </div>
//         <div style={styles.submitBarMetaItem}>
//           <span style={styles.submitBarMetaLabel}>Violations</span>
//           <p style={styles.submitBarMetaValue(violations > 0)}>
//             {violations} / {MAX_VIOLATIONS}
//           </p>
//         </div>
//         <div style={styles.submitBarMetaItem}>
//           <span style={styles.submitBarMetaLabel}>Languages</span>
//           <p style={styles.submitBarMetaValue(false)}>
//             {candidate.languages.map((l) => l.toUpperCase()).join(", ")}
//           </p>
//         </div>
//       </div>
//       <button
//   style={{
//     ...styles.submitBtn,
//     opacity: isSubmitting ? 0.7 : 1,
//     cursor: isSubmitting ? "not-allowed" : "pointer",
//   }}
//   onClick={onSubmit}
//   disabled={isSubmitting}
// >
//   {isSubmitting ? (
//     <>
//       ⏳ Submitting...
//     </>
//   ) : (
//     <>
//       Submit Assessment
//     </>
//   )}
// </button>
//     </div>
//   );
// }

// function ThankYouPage({ candidate, violations }) {
//   return (
//     <div style={styles.tyPage}>
//       <div style={styles.tyInner}>
//         <div style={styles.tyIconRing}>
//           <span style={{ fontSize: 30, color: "#22c55e" }}>✓</span>
//         </div>

//         <h1 style={styles.tyHeading}>Assessment submitted</h1>

//         <div style={styles.tySummaryCard}>
//           <div style={styles.tySummaryHeader}>Submission summary</div>
//           <div style={styles.tySummaryBody}>
//             <div style={styles.tySummaryRow}>
//               <span style={styles.tySummaryLabel}>👤 Name</span>
//               <span style={styles.tySummaryValue(false)}>{candidate.name}</span>
//             </div>
//             <div style={styles.tySummaryRow}>
//               <span style={styles.tySummaryLabel}>✉ Email</span>
//               <span style={styles.tySummaryValue(false)}>
//                 {candidate.email}
//               </span>
//             </div>
//             <div style={styles.tySummaryRow}>
//               <span style={styles.tySummaryLabel}>📱 Phone</span>
//               <span style={styles.tySummaryValue(false)}>
//                 +91 {candidate.phone}
//               </span>
//             </div>
//             <div style={styles.tySummaryRow}>
//               <span style={styles.tySummaryLabel}>💻 Technologies</span>
//               <div style={styles.tyLangPills}>
//                 {candidate.languages.map((lang) => (
//                   <span key={lang} style={styles.tyLangPill}>
//                     {lang.toUpperCase()}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div style={styles.tySummaryRowLast}>
//               <span style={styles.tySummaryLabel}>⚠ Violations</span>
//               <span style={styles.tySummaryValue(violations > 0)}>
//                 {violations} / {MAX_VIOLATIONS}
//               </span>
//             </div>
//           </div>
//         </div>

//         <p style={styles.tyFooter}>
//           Thank you for completing the assessment —{" "}
//           <strong style={{ color: "#94A3B8" }}>Team Clinovo</strong>
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // App Component
// // ─────────────────────────────────────────────
// export default function App() {
//   // ── State ──────────────────────────────────
//   const [candidate, setCandidate] = useState(null);
//   const [examData, setExamData] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [codes, setCodes] = useState({ python: "", r: "", sas: "" });
//   const [testResults, setTestResults] = useState({
//     python: null,
//     r: null,
//     sas: null,
//   });
//   const [violations, setViolations] = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // ── Helpers ────────────────────────────────
//   const enterFullscreen = async () => {
//     const elem = document.documentElement;
//     if (elem.requestFullscreen) await elem.requestFullscreen();
//   };

//   const updateCode = (lang, value) =>
//     setCodes((prev) => ({ ...prev, [lang]: value }));

//   const updateTestResult = (lang, result) =>
//     setTestResults((prev) => ({ ...prev, [lang]: result }));

//   // ── Actions ────────────────────────────────
//   const startAssessment = async (candidateData) => {
//     await enterFullscreen();

//     const totalMinutes = 20 + candidateData.languages.length * 20;
//     setCandidate({ ...candidateData, examMinutes: totalMinutes });

//     const exam = {};
//     if (candidateData.languages.includes("python")) {
//       const test = getAssessmentQuestions(pythonMCQs, pythonCoding);
//       exam.pythonMCQs = test.mcqs;
//       exam.pythonCoding = test.coding;
//     }
//     if (candidateData.languages.includes("r")) {
//       const test = getAssessmentQuestions(rMCQs, rCoding);
//       exam.rMCQs = test.mcqs;
//       exam.rCoding = test.coding;
//     }
//     if (candidateData.languages.includes("sas")) {
//       const test = getAssessmentQuestions(sasMCQs, sasCoding);
//       exam.sasMCQs = test.mcqs;
//       exam.sasCoding = test.coding;
//     }
//     setExamData(exam);
//   };

//   const submitAssessment = async () => {
//      if (isSubmitting) return;

//   setIsSubmitting(true);
//   try {
//     const pdf = new jsPDF();
//     let y = 10;
//     let totalMCQScore = 0;

//     // Cover page
//     pdf.setFontSize(18);
//     pdf.text("CLINOVO ASSESSMENT REPORT", 10, y);
//     y += 15;
//     pdf.setFontSize(12);
//     y = addLine(pdf, `Name: ${candidate.name}`, y);
//     y = addLine(pdf, `Email: ${candidate.email}`, y);
//     y = addLine(pdf, `Languages: ${candidate.languages.join(", ")}`, y);
//     y = addLine(pdf, `Phone: ${candidate.phone || "N/A"}`, y);
//     y = addLine(pdf, `Violations: ${violations}`, y);
//     y += 10;

//     // ── Aptitude sections (mandatory) ──
//     APTITUDE_SECTIONS.forEach((section) => {
//       pdf.addPage();
//       y = 10;
//       let sectionScore = 0;

//       pdf.setFontSize(16);
//       pdf.text(`${section.title.toUpperCase()} SECTION`, 10, y);
//       y += 10;

//       section.questions.forEach((q, index) => {
//         const answerKey = `${section.sectionKey}_${q.id}`;
//         const selected = answers[answerKey] || "Not Answered";
//         const correct = q.answer;
//         const marks = selected === correct ? 1 : 0;
//         sectionScore += marks;
//         totalMCQScore += marks;
//         y = addLine(pdf, `Q${index + 1}. ${q.question}`, y);
//         y = addLine(pdf, `Selected Answer: ${selected}`, y);
//         y = addLine(pdf, `Correct Answer: ${correct}`, y);
//         y = addLine(pdf, `Marks: ${marks}/1`, y);
//         y += 4;
//       });

//       y += 5;
//       y = addLine(pdf, `Score: ${sectionScore}/${section.questions.length}`, y);
//     });

//     // ── Language MCQ + Coding sections ──
//     const langSections = [];
//     if (candidate.languages.includes("python"))
//       langSections.push({
//         name: "PYTHON",
//         questions: examData.pythonMCQs,
//         coding: examData.pythonCoding,
//         code: codes.python,
//         result: testResults.python,
//       });
//     if (candidate.languages.includes("r"))
//       langSections.push({
//         name: "R",
//         questions: examData.rMCQs,
//         coding: examData.rCoding,
//         code: codes.r,
//         result: testResults.r,
//       });
//     if (candidate.languages.includes("sas"))
//       langSections.push({
//         name: "SAS",
//         questions: examData.sasMCQs,
//         coding: examData.sasCoding,
//         code: codes.sas,
//         result: testResults.sas,
//       });

//     langSections.forEach((section) => {
//       pdf.addPage();
//       y = 10;
//       let sectionScore = 0;

//       pdf.setFontSize(16);
//       pdf.text(`${section.name} MCQ SECTION`, 10, y);
//       y += 10;

//       section.questions.forEach((q, index) => {
//         const answerKey = `${section.name.toLowerCase()}_${q.id}`;
//         const selected = answers[answerKey] || "Not Answered";
//         const correct = q.answer;
//         const marks = selected === correct ? 1 : 0;
//         sectionScore += marks;
//         totalMCQScore += marks;
//         y = addLine(pdf, `Q${index + 1}. ${q.question}`, y);
//         y = addLine(pdf, `Selected Answer: ${selected}`, y);
//         y = addLine(pdf, `Correct Answer: ${correct}`, y);
//         y = addLine(pdf, `Marks: ${marks}/1`, y);
//         y += 4;
//       });

//       y += 5;
//       y = addLine(
//         pdf,
//         `MCQ Score: ${sectionScore}/${section.questions.length}`,
//         y,
//       );
//       y += 10;

//       pdf.setFontSize(16);
//       pdf.text(`${section.name} CODING`, 10, y);
//       y += 10;
//       y = addLine(pdf, `Question Title: ${section.coding?.title || "N/A"}`, y);
//       y = addLine(
//         pdf,
//         `Description: ${section.coding?.description || "N/A"}`,
//         y,
//       );
//       y += 5;
//       y = addLine(pdf, "Candidate Code:", y);
//       y = addLine(pdf, section.code || "No code submitted", y);
//       y += 5;
//       y = addLine(pdf, "Test Case Results:", y);
//       y = addLine(pdf, section.result?.details || "No tests executed", y);
//       y += 5;
//       y = addLine(pdf, "Coding Marks: Pending Manual Evaluation (10 Marks)", y);
//     });

//     // ── Final summary ──
//     pdf.addPage();
//     y = 10;
//     pdf.setFontSize(16);
//     pdf.text("FINAL SUMMARY", 10, y);
//     y += 15;
//     const totalPossibleMarks =
//       APTITUDE_SECTIONS.reduce((sum, s) => sum + s.questions.length, 0) +
//       langSections.reduce((sum, s) => sum + s.questions.length, 0);
//     y = addLine(
//       pdf,
//       `Total MCQ Score: ${totalMCQScore}/${totalPossibleMarks}`,
//       y,
//     );
//     y = addLine(pdf, "Coding Score: Pending Manual Evaluation", y);
//     y = addLine(pdf, `Violations: ${violations}`, y);

//     // ── Send report ──
//     const pdfBlob = pdf.output("blob");
//     const formData = new FormData();
//     formData.append("file", pdfBlob, `${candidate.name}_Assessment.pdf`);
//     formData.append("candidate_name", candidate.name);
//     formData.append("candidate_email", candidate.email);
//     formData.append("candidate_phone", candidate.phone);

//     try {
//       const response = await fetch(
//         "https://clinovo-internal-assessment.vercel.app/send-report",
//         {
//           method: "POST",
//           body: formData,
//         },
//       );
//       const data = await response.json();
//       console.log("Email API Response:", data);
//     } catch (error) {
//       console.error("Failed to send assessment report:", error);
//     }

//     setSubmitted(true);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setIsSubmitting(false);
//   }
//   };

//   // ── Effects ────────────────────────────────

//   // Tab visibility violation
//   useEffect(() => {
//     const handleVisibility = () => {
//       if (document.hidden && candidate && !submitted) {
//         const count = violations + 1;
//         setViolations(count);
//         alert(
//           `⚠️ Violation Detected!\n\nYou switched tabs or minimized the exam.\n\nViolations: ${count}/${MAX_VIOLATIONS}`,
//         );
//         if (count >= MAX_VIOLATIONS) {
//           alert(
//             "❌ Maximum violations reached.\n\nAssessment will be submitted automatically.",
//           );
//           submitAssessment();
//         }
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibility);
//     return () =>
//       document.removeEventListener("visibilitychange", handleVisibility);
//   }, [violations, candidate, submitted]);

//   // Fullscreen exit violation
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       if (candidate && !submitted && !document.fullscreenElement) {
//         const count = violations + 1;
//         setViolations(count);
//         alert(
//           `⚠️ Fullscreen Exit Detected!\n\nPlease stay in fullscreen mode.\n\nViolations: ${count}/${MAX_VIOLATIONS}`,
//         );
//         if (count >= MAX_VIOLATIONS) {
//           alert(
//             "❌ Maximum violations reached.\n\nAssessment will be submitted automatically.",
//           );
//           submitAssessment();
//         }
//       }
//     };
//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () =>
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//   }, [violations, candidate, submitted]);

//   // Document title violation counter
//   useEffect(() => {
//     if (candidate)
//       document.title = `Violations ${violations}/${MAX_VIOLATIONS}`;
//   }, [violations, candidate]);

//   // Block DevTools shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "F12") e.preventDefault();
//       if (
//         e.ctrlKey &&
//         e.shiftKey &&
//         ["I", "J", "C"].includes(e.key.toUpperCase())
//       )
//         e.preventDefault();
//       if (e.ctrlKey && e.key.toUpperCase() === "U") e.preventDefault();
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   // Disable right-click
//   useEffect(() => {
//     const prevent = (e) => e.preventDefault();
//     document.addEventListener("contextmenu", prevent);
//     return () => document.removeEventListener("contextmenu", prevent);
//   }, []);

//   // Block copy / paste / cut
//   useEffect(() => {
//     const prevent = (e) => e.preventDefault();
//     document.addEventListener("copy", prevent);
//     document.addEventListener("paste", prevent);
//     document.addEventListener("cut", prevent);
//     return () => {
//       document.removeEventListener("copy", prevent);
//       document.removeEventListener("paste", prevent);
//       document.removeEventListener("cut", prevent);
//     };
//   }, []);

//   // ── Render: Registration ───────────────────
//   if (!candidate) return <Registration onStart={startAssessment} />;

//   // ── Render: Thank-you ──────────────────────
//   if (submitted)
//     return <ThankYouPage candidate={candidate} violations={violations} />;

//   // ── Render: Main exam ──────────────────────
//   return (
//     <div style={styles.page}>
//       <HeaderBar
//         candidate={candidate}
//         violations={violations}
//         timerEl={
//           <Timer minutes={candidate.examMinutes} onFinish={submitAssessment} />
//         }
//       />

//       {/* ── Aptitude (mandatory for all) ── */}
//       <SectionDivider label="Aptitude Test " />
//       {APTITUDE_SECTIONS.map((section) => (
//         <AptitudeSection
//           key={section.sectionKey}
//           title={section.title}
//           sectionKey={section.sectionKey}
//           questions={section.questions}
//           answers={answers}
//           setAnswers={setAnswers}
//         />
//       ))}

//       {/* ── Language MCQ sections ── */}
//       {examData && (
//         <>
//           <SectionDivider label="Technical MCQ" />
//           {candidate.languages.includes("python") && (
//             <MCQSection
//               language="python"
//               questions={examData.pythonMCQs}
//               answers={answers}
//               setAnswers={setAnswers}
//             />
//           )}
//           {candidate.languages.includes("r") && (
//             <MCQSection
//               language="r"
//               questions={examData.rMCQs}
//               answers={answers}
//               setAnswers={setAnswers}
//             />
//           )}
//           {candidate.languages.includes("sas") && (
//             <MCQSection
//               language="sas"
//               questions={examData.sasMCQs}
//               answers={answers}
//               setAnswers={setAnswers}
//             />
//           )}

//           {/* ── Coding sections ── */}
//           <SectionDivider label="Coding Challenge" />
//           {candidate.languages.includes("python") && (
//             <CodingSection
//               language="python"
//               codingQuestion={examData.pythonCoding}
//               code={codes.python}
//               setCode={(val) => updateCode("python", val)}
//               setTestResults={(res) => updateTestResult("python", res)}
//             />
//           )}
//           {candidate.languages.includes("r") && (
//             <CodingSection
//               language="r"
//               codingQuestion={examData.rCoding}
//               code={codes.r}
//               setCode={(val) => updateCode("r", val)}
//               setTestResults={(res) => updateTestResult("r", res)}
//             />
//           )}
//           {candidate.languages.includes("sas") && (
//             <CodingSection
//               language="sas"
//               codingQuestion={examData.sasCoding}
//               code={codes.sas}
//               setCode={(val) => updateCode("sas", val)}
//               setTestResults={(res) => updateTestResult("sas", res)}
//             />
//           )}
//         </>
//       )}

//       <SubmitBar
//         candidate={candidate}
//         violations={violations}
//         onSubmit={submitAssessment}
//          isSubmitting={isSubmitting}
//       />
//     </div>
//   );
// }
