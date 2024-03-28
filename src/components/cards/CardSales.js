import { Skeleton, Card } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const CardSales = ({ totalSales, label }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const easeInOutCubic = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };

  useEffect(() => {
    const duration = 2000;
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        const newNumber = easeInOutCubic(elapsed, 0, totalSales, duration);
        setCurrentNumber(Math.round(newNumber));
      } else {
        setCurrentNumber(totalSales);
        clearInterval(intervalId);
      }
    }, 10);
    return () => clearInterval(intervalId);
  }, [startTime, totalSales]);

  return (
    <Card className="w-full transition space-y-4 px-5 py-4">
      <p className="text-gray-300">{label}</p>
      {totalSales == null && (
        <Skeleton className="mt-2 w-3/5 rounded-lg">
          <div className="h-9 mt-4 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      )}
      {totalSales >= 0 && (
        <div className="flex items-center gap-2">
          <p className="text-4xl mt-4 font-semibold">{currentNumber}</p>
          <p className="text-gray-300 mt-4">bsf</p>
        </div>
      )}
    </Card>
  );
};
