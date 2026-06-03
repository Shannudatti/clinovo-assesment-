import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function CodingSection({
  language,
  codingQuestion,
  code,
  setCode,
  setTestResults,
}) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!code && codingQuestion) {
      setCode(codingQuestion.starterCode);
    }
  }, [codingQuestion]);

  const runPythonTests = async () => {
    try {
      setOutput("Running Python Test Cases...");

      const pyodide =
        await window.loadPyodide();

      await pyodide.runPythonAsync(code);

      let report = "";
      let passed = 0;

      for (
        let i = 0;
        i <
        codingQuestion.testCases.length;
        i++
      ) {
        const tc =
          codingQuestion.testCases[i];

        const actual =
          await pyodide.runPythonAsync(
            `solve(${JSON.stringify(
              tc.input
            )})`
          );

        const success =
          JSON.stringify(actual) ===
          JSON.stringify(
            tc.expected
          );

        if (success) passed++;

        report += `
====================
Test Case ${i + 1}

Input:
${JSON.stringify(tc.input)}

Expected:
${JSON.stringify(tc.expected)}

Actual:
${JSON.stringify(actual)}

Result:
${
  success
    ? "PASS ✅"
    : "FAIL ❌"
}

`;
      }

      report += `
====================
FINAL SCORE

${passed}/${
        codingQuestion.testCases
          .length
      } Passed
====================
`;

      setOutput(report);

      setTestResults({
        passed,
        total:
          codingQuestion.testCases
            .length,
        details: report,
      });
    } catch (err) {
      setOutput(
        `Python Error:\n${err}`
      );
    }
  };

  const runRTests = async () => {
    try {
      setOutput("Running R Test Cases...");

      const { WebR } =
        await import("webr");

      const webR = new WebR();

      await webR.init();

      await webR.evalR(code);

      let report = "";
      let passed = 0;

      for (
        let i = 0;
        i <
        codingQuestion.testCases.length;
        i++
      ) {
        const tc =
          codingQuestion.testCases[i];

        const result =
          await webR.evalR(
            `solve(${tc.input})`
          );

        const jsResult =
          await result.toJs();

        const actual =
          Array.isArray(
            jsResult
          )
            ? jsResult
            : [jsResult];

        const success =
          JSON.stringify(actual) ===
          JSON.stringify(
            tc.expected
          );

        if (success) passed++;

        report += `
====================
Test Case ${i + 1}

Input:
${tc.input}

Expected:
${JSON.stringify(tc.expected)}

Actual:
${JSON.stringify(actual)}

Result:
${
  success
    ? "PASS ✅"
    : "FAIL ❌"
}

`;
      }

      report += `
====================
FINAL SCORE

${passed}/${
        codingQuestion.testCases
          .length
      } Passed
====================
`;

      setOutput(report);

      setTestResults({
        passed,
        total:
          codingQuestion.testCases
            .length,
        details: report,
      });
    } catch (err) {
      setOutput(`R Error:\n${err}`);
    }
  };

  return (
    <div className="card p-4 mb-4 shadow">
      <h3>
        {language.toUpperCase()} Coding
      </h3>

      <h5>
        {codingQuestion.title}
      </h5>

      <p>
        {
          codingQuestion.description
        }
      </p>

      <Editor
        height="450px"
        theme="vs-dark"
        language={
          language === "python"
            ? "python"
            : language === "r"
            ? "r"
            : "sql"
        }
        value={code}
        onChange={(value) =>
          setCode(value || "")
        }
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 15,
          automaticLayout: true,
        }}
      />

      <div className="mt-3 d-flex gap-2">
        {language ===
          "python" && (
          <button
            className="btn btn-success"
            onClick={
              runPythonTests
            }
          >
            Run Test Cases
          </button>
        )}

        {language === "r" && (
          <button
            className="btn btn-primary"
            onClick={runRTests}
          >
            Run Test Cases
          </button>
        )}

        {language ===
          "sas" && (
          <button
            className="btn btn-secondary"
            onClick={() =>
              setOutput(
                "SAS execution is not available in browser.\nCode will be saved in PDF."
              )
            }
          >
            Save SAS Code
          </button>
        )}
      </div>

      <div className="mt-4">
        <h5>Output</h5>

        <pre
          style={{
            background: "#000",
            color: "#00ff00",
            padding: "15px",
            borderRadius: "8px",
            minHeight: "200px",
            whiteSpace:
              "pre-wrap",
            overflowX: "auto",
          }}
        >
          {output}
        </pre>
      </div>
    </div>
  );
}