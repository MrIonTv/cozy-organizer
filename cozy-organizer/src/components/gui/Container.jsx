import { useEffect, useState } from "react";

export default function Container({ fading = false, children }) {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (!fading) return;
    let timer;

    const resetTimer = () => {
      setInactive(false);
      clearTimeout(timer);

      timer = setTimeout(() => {
        setInactive(true);
      }, 10000);
    };

    // Escuchar interacción del usuario
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [fading]);

  return (
    <div className={inactive ? "fade-out" : "fade-in"}>
      {children}
    </div>
  );
}
