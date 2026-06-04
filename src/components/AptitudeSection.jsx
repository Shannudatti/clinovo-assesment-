export default function AptitudeSection({
  title,
  sectionKey,
  questions,
  answers,
  setAnswers,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "12px",
      }}
    >
      <h2>{title}</h2>

      {questions.map((q, index) => (
        <div
          key={q.id}
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>
              Q{index + 1}. {q.question}
            </strong>
          </p>

          {q.options.map((option) => (
            <label
              key={option}
              style={{
                display: "block",
                marginBottom: "8px",
              }}
            >
              <input
                type="radio"
                name={`${sectionKey}_${q.id}`}
                value={option}
                checked={
                  answers[
                    `${sectionKey}_${q.id}`
                  ] === option
                }
                onChange={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [`${sectionKey}_${q.id}`]:
                      option,
                  }))
                }
              />

              {" "}{option}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}