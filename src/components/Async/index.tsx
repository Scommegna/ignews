import { useState, useEffect } from "react";

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
    }, 1000);
  });

  return (
    <div>
      <div>hello</div>
      {isButtonVisible && <button>click</button>}
    </div>
  );
}
