export default function MCQSection({
  language,
  questions,
  answers,
  setAnswers,
}) {
  const handleAnswer = (
    qid,
    option
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: option,
    }));
  };

  return (
    <div className="card p-4 mb-4">
      <h3
        className="mb-4"
        style={{
          color: "#04122B",
        }}
      >
        {language.toUpperCase()} MCQs
      </h3>

      {questions.map(
        (q, index) => (
          <div
            key={q.id}
            className="mb-4 p-3 border rounded"
          >
            <h5>
              Q{index + 1}.{" "}
              {q.question}
            </h5>

            {q.options.map(
              (option) => (
                <div
                  key={option}
                  className="form-check mt-2"
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`${language}_${q.id}`}
                    checked={
                      answers[
                        `${language}_${q.id}`
                      ] === option
                    }
                    onChange={() =>
                      handleAnswer(
                        `${language}_${q.id}`,
                        option
                      )
                    }
                  />

                  <label className="form-check-label">
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
        )
      )}
    </div>
  );
}