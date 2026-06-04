import emailjs from "@emailjs/browser";

export const sendAssessmentEmail = async ({
  candidate,
  violations,
  score,
  pdfUrl,
}) => {
  try {
    await emailjs.send(
      "service_80q5coc",
      "template_mv9zhxk",
      {
        candidate_name: candidate.name,
        candidate_email: candidate.email,
        languages:
          candidate.languages.join(", "),

        violations: violations,

        score: score,

        pdf_url: pdfUrl,
      },
      "bIrZ3tDJcOL3XAE_N"
    );

    console.log("Email Sent Successfully");
  } catch (err) {
    console.error(
      "Email Error:",
      err
    );
  }
};