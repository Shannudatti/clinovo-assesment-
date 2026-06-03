import { useEffect, useState } from "react";

export default function Timer({ minutes, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

const displayMinutes = Math.floor(
  timeLeft / 60
);

const seconds =
  timeLeft % 60;

  return (
    <div
      style={{
        color: "#DC2626",
        fontSize: "32px",
        fontWeight: "bold",
      }}
    >
      {String(displayMinutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
