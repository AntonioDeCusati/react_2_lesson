// all'avvio timer start
// alla fine timer stop

import { useEffect, useState } from "react";

const Timer = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("timeup!");
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>Clock</div>;
};

export const TimerContainer = () => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <div>
      <button onClick={() => setShow((s) => !s)}>toggle</button>
      {show && <Timer />}
    </div>
  );
};
