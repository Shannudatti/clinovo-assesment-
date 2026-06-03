export const shuffle = (array) => {
  const arr = [...array];
 
  for (
    let i = arr.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );
 
    [arr[i], arr[j]] = [
      arr[j],
      arr[i],
    ];
  }
 
  return arr;
};
 
export const getAssessmentQuestions = (
  mcqs,
  codingQuestions
) => {
  const easyQuestions = mcqs.filter(
    (q) => q.difficulty === "easy"
  );
 
  const mediumQuestions = mcqs.filter(
    (q) => q.difficulty === "medium"
  );
 
  const selectedMCQs = [
    ...shuffle(easyQuestions).slice(0, 5),
    ...shuffle(mediumQuestions).slice(0, 5),
  ];
 
  return {
    mcqs: shuffle(selectedMCQs), // optional
    coding: shuffle(codingQuestions)[0],
  };
};