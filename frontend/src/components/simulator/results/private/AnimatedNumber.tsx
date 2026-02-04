import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  unit?: string;
}
function AnimatedNumber({
  value,
  duration = 600,
  className = "",
  unit,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let animationId: NodeJS.Timeout | null = null;
    const startValue = displayValue;
    const startTime = Date.now();
    const difference = value - startValue;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      const easeOutQuad = 1 - Math.pow(1 - progress, 2);
      setDisplayValue(Math.floor(startValue + difference * easeOutQuad));

      if (progress < 1) {
        animationId = setTimeout(animate, 16); // ~60fps
      }
    };

    animationId = setTimeout(animate, 0);

    return () => {
      if (animationId) clearTimeout(animationId);
    };
  }, [value, duration, displayValue]);

  return (
    <div className={`transition-transform duration-300 ${className}`}>
      {displayValue}
      {unit ? ` ${unit}` : ""}
    </div>
  );
}

export { AnimatedNumber };
