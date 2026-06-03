import { useEffect, useState } from "react";
import jsPDF from "jspdf";

import Registration from "./components/Registration";
import MCQSection from "./components/MCQSection";
import CodingSection from "./components/CodingSection";
import Timer from "./components/Timer";

import { pythonMCQs, pythonCoding } from "./data/pythonQuestions";

import { rMCQs, rCoding } from "./data/rQuestions";

import { sasMCQs, sasCoding } from "./data/sasQuestions";

import { getAssessmentQuestions } from "./utils/randomizer";
// components
export default function App() {
  const [candidate, setCandidate] = useState(null);

  const [answers, setAnswers] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const [violations, setViolations] = useState(0);

  const MAX_VIOLATIONS = 3;

  const [codes, setCodes] = useState({
    python: "",
    r: "",
    sas: "",
  });

  const [testResults, setTestResults] = useState({
    python: null,
    r: null,
    sas: null,
  });

  const [examData, setExamData] = useState(null);
  const enterFullscreen = async () => {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    await elem.requestFullscreen();
  }
};


  
  const startAssessment =async (candidateData) => {
    await enterFullscreen();
    const totalMinutes = candidateData.languages.length * 20;
    

    setCandidate({
      ...candidateData,
      examMinutes: totalMinutes,
    });


    const exam = {};

    if (candidateData.languages.includes("python")) {
      const test = getAssessmentQuestions(pythonMCQs, pythonCoding);

      exam.pythonMCQs = test.mcqs;

      exam.pythonCoding = test.coding;
    }

    if (candidateData.languages.includes("r")) {
      const test = getAssessmentQuestions(rMCQs, rCoding);

      exam.rMCQs = test.mcqs;

      exam.rCoding = test.coding;
    }

    if (candidateData.languages.includes("sas")) {
      const test = getAssessmentQuestions(sasMCQs, sasCoding);

      exam.sasMCQs = test.mcqs;

      exam.sasCoding = test.coding;
    }

    setExamData(exam);
  };
  const addLine = (pdf, text, y) => {
    const lines = pdf.splitTextToSize(String(text), 180);

    lines.forEach((line) => {
      if (y > 270) {
        pdf.addPage();
        y = 10;
      }

      pdf.text(line, 10, y);

      y += 6;
    });

    return y;
  };
  const submitAssessment = () => {
    const pdf = new jsPDF();

    let y = 10;
    let totalMCQScore = 0;

    const sections = [];

    if (candidate.languages.includes("python")) {
      sections.push({
        name: "PYTHON",
        questions: examData.pythonMCQs,
        coding: examData.pythonCoding,
        code: codes.python,
        result: testResults.python,
      });
    }

    if (candidate.languages.includes("r")) {
      sections.push({
        name: "R",
        questions: examData.rMCQs,
        coding: examData.rCoding,
        code: codes.r,
        result: testResults.r,
      });
    }

    if (candidate.languages.includes("sas")) {
      sections.push({
        name: "SAS",
        questions: examData.sasMCQs,
        coding: examData.sasCoding,
        code: codes.sas,
        result: testResults.sas,
      });
    }

    // Cover Page
    pdf.setFontSize(18);
    pdf.text("CLINOVO ASSESSMENT REPORT", 10, y);

    y += 15;
    pdf.setFontSize(12);

    y = addLine(pdf, `Name: ${candidate.name}`, y);
    y = addLine(pdf, `Email: ${candidate.email}`, y);
    y = addLine(pdf, `Languages: ${candidate.languages.join(", ")}`, y);
    y = addLine(pdf, `Phone: ${candidate.phone || "N/A"}`, y);
    y = addLine(pdf, `Violations: ${violations}`, y);

    y += 10;

    // Sections
    sections.forEach((section) => {
      pdf.addPage();
      y = 10;

      let sectionScore = 0;

      pdf.setFontSize(16);
      pdf.text(`${section.name} MCQ SECTION`, 10, y);

      y += 10;

      section.questions.forEach((q, index) => {
        const answerKey = `${section.name.toLowerCase()}_${q.id}`;

        const selected = answers[answerKey] || "Not Answered";

        const correct = q.answer;

        const marks = selected === correct ? 1 : 0;

        sectionScore += marks;
        totalMCQScore += marks;

        y = addLine(pdf, `Q${index + 1}. ${q.question}`, y);

        y = addLine(pdf, `Selected Answer: ${selected}`, y);

        y = addLine(pdf, `Correct Answer: ${correct}`, y);

        y = addLine(pdf, `Marks: ${marks}/1`, y);

        y += 4;
      });

      y += 5;

      y = addLine(
        pdf,
        `MCQ Score: ${sectionScore}/${section.questions.length}`,
        y,
      );

      y += 10;

      pdf.setFontSize(16);
      pdf.text(`${section.name} CODING`, 10, y);

      y += 10;

      y = addLine(pdf, `Question Title: ${section.coding?.title || "N/A"}`, y);

      y = addLine(
        pdf,
        `Description: ${section.coding?.description || "N/A"}`,
        y,
      );

      y += 5;

      y = addLine(pdf, "Candidate Code:", y);

      y = addLine(pdf, section.code || "No code submitted", y);

      y += 5;

      y = addLine(pdf, "Test Case Results:", y);

      y = addLine(pdf, section.result?.details || "No tests executed", y);

      y += 5;

      y = addLine(pdf, "Coding Marks: Pending Manual Evaluation (10 Marks)", y);
    });

    // Final Summary
    pdf.addPage();

    y = 10;

    pdf.setFontSize(16);
    pdf.text("FINAL SUMMARY", 10, y);

    y += 15;

    const totalPossibleMarks = sections.reduce(
      (sum, section) => sum + section.questions.length,
      0,
    );

    y = addLine(
      pdf,
      `Total MCQ Score: ${totalMCQScore}/${totalPossibleMarks}`,
      y,
    );

    y = addLine(pdf, "Coding Score: Pending Manual Evaluation", y);

    y = addLine(pdf, `Violations: ${violations}`, y);

    pdf.save(`${candidate.name}_Assessment.pdf`);

    setSubmitted(true);
  };
  //violations
  useEffect(() => {
 const handleVisibility = () => {
  if (
    document.hidden &&
    candidate &&
    !submitted
  ) {
    const count = violations + 1;

    setViolations(count);

    alert(
      `⚠️ Violation Detected!\n\nYou switched tabs or minimized the exam.\n\nViolations: ${count}/${MAX_VIOLATIONS}`
    );

    if (count >= MAX_VIOLATIONS) {
      alert(
        "❌ Maximum violations reached.\n\nAssessment will be submitted automatically."
      );

      submitAssessment();
    }
  }
};

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [violations, candidate, submitted]);
  //pdf submission
useEffect(() => {
const handleFullscreenChange = () => {
  if (
    candidate &&
    !submitted &&
    !document.fullscreenElement
  ) {
    const count = violations + 1;

    setViolations(count);

    alert(
      `⚠️ Fullscreen Exit Detected!\n\nPlease stay in fullscreen mode.\n\nViolations: ${count}/${MAX_VIOLATIONS}`
    );

    if (count >= MAX_VIOLATIONS) {
      alert(
        "❌ Maximum violations reached.\n\nAssessment will be submitted automatically."
      );

      submitAssessment();
    }
  }
};

  document.addEventListener(
    "fullscreenchange",
    handleFullscreenChange
  );

  return () =>
    document.removeEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );
}, [violations, candidate, submitted]);
useEffect(() => {
  if (candidate) {
    document.title =
      `Violations ${violations}/${MAX_VIOLATIONS}`;
  }
}, [violations]);
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "F12") {
      e.preventDefault();
    }

    if (
      e.ctrlKey &&
      e.shiftKey &&
      ["I", "J", "C"].includes(
        e.key.toUpperCase()
      )
    ) {
      e.preventDefault();
    }

    if (
      e.ctrlKey &&
      e.key.toUpperCase() === "U"
    ) {
      e.preventDefault();
    }
  };

  document.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () =>
    document.removeEventListener(
      "keydown",
      handleKeyDown
    );
}, []);
useEffect(() => {
  const disableRightClick = (e) => {
    e.preventDefault();
  };

  document.addEventListener(
    "contextmenu",
    disableRightClick
  );

  return () =>
    document.removeEventListener(
      "contextmenu",
      disableRightClick
    );
}, []);
useEffect(() => {
  const preventAction = (e) => {
    e.preventDefault();
  };

  document.addEventListener(
    "copy",
    preventAction
  );

  document.addEventListener(
    "paste",
    preventAction
  );

  document.addEventListener(
    "cut",
    preventAction
  );

  return () => {
    document.removeEventListener(
      "copy",
      preventAction
    );

    document.removeEventListener(
      "paste",
      preventAction
    );

    document.removeEventListener(
      "cut",
      preventAction
    );
  };
}, []);
  // Registration form
  if (!candidate) {
    return <Registration onStart={startAssessment} />;
  }

  if (submitted) {
    return (
      <div
  style={{
    minHeight: "100vh",
    background:
      "linear-gradient(90deg,#04122B,#162F5C)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  }}
>
  <div
    style={{
      background: "#fff",
      borderRadius: "24px",
      padding: "50px",
      width: "100%",
      maxWidth: "700px",
      textAlign: "center",
      boxShadow:
        "0 20px 50px rgba(0,0,0,0.25)",
    }}
  >
    <div
      style={{
        fontSize: "70px",
        marginBottom: "20px",
      }}
    >
      ✅
    </div>

    <h1
      style={{
        color: "#04122B",
        fontWeight: "700",
        marginBottom: "20px",
      }}
    >
      Assessment Submitted Successfully
    </h1>

    <hr />

    <div
      style={{
        marginTop: "25px",
        marginBottom: "25px",
        textAlign: "left",
      }}
    >
      <h4>
        Candidate Information
      </h4>

      <p>
        <strong>Name:</strong>{" "}
        {candidate.name}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {candidate.email}
      </p>

      
    </div>

    <div
      style={{
        background: "#F8FAFC",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
     
    

      <p
        style={{
          color: "#475569",
          marginTop: "10px",
        }}
      >
        Your responses have been
        submitted successfully.
      </p>

      <p
        style={{
          color: "#475569",
        }}
      >
        Our team will review your
        assessment and inform you
        shortly regarding the next
        steps.
      </p>

      <p
        style={{
          marginTop: "20px",
          fontWeight: "600",
          color: "#04122B",
        }}
      >
       Team Clinovo
      </p>
    </div>
  </div>
</div>
    );
  }
  //main return
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(90deg,#04122B,#162F5C)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Timer minutes={candidate.examMinutes} onFinish={submitAssessment} />

        <h4
  style={{
    color:
      violations > 0
        ? "#dc2626"
        : "#16a34a",
    fontWeight: "bold",
  }}
>
  🚨 Violations:
  {violations}/{MAX_VIOLATIONS}
</h4>

        <h4>
          Candidate:
          {candidate.name}
        </h4>
      </div>
      {examData && (
        <>
          {candidate.languages.includes("python") && (
            <MCQSection
              language="python"
              questions={examData.pythonMCQs}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}

          {candidate.languages.includes("r") && (
            <MCQSection
              language="r"
              questions={examData.rMCQs}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}

          {candidate.languages.includes("sas") && (
            <MCQSection
              language="sas"
              questions={examData.sasMCQs}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}

         {candidate.languages.includes("python") && (
  <CodingSection
    language="python"
    codingQuestion={examData.pythonCoding}
    code={codes.python}
    setCode={(value) =>
      setCodes((prev) => ({
        ...prev,
        python: value,
      }))
    }
    setTestResults={(result) =>
      setTestResults((prev) => ({
        ...prev,
        python: result,
      }))
    }
  />
)}

{candidate.languages.includes("r") && (
  <CodingSection
    language="r"
    codingQuestion={examData.rCoding}
    code={codes.r}
    setCode={(value) =>
      setCodes((prev) => ({
        ...prev,
        r: value,
      }))
    }
    setTestResults={(result) =>
      setTestResults((prev) => ({
        ...prev,
        r: result,
      }))
    }
  />
)}

{candidate.languages.includes("sas") && (
  <CodingSection
    language="sas"
    codingQuestion={examData.sasCoding}
    code={codes.sas}
    setCode={(value) =>
      setCodes((prev) => ({
        ...prev,
        sas: value,
      }))
    }
    setTestResults={(result) =>
      setTestResults((prev) => ({
        ...prev,
        sas: result,
      }))
    }
  />
)}

          
        </>
      )}
      <button className="btn btn-success btn-lg" onClick={submitAssessment}>
        Submit Assessment
      </button>
      <div
        style={{
          height: "40px",
        }}
      />
    </div>
  );
}
