import React, { MouseEventHandler, useEffect, useRef, useState } from "react";

function onButtonClick(
  setCount: Function,
  count: number,
  test: React.MutableRefObject<number>
) {
  setCount(count + 1);
  test.current += 1;
}

function testFunc(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {}

function Test() {
  const [count, setCount] = useState(0);
  const test = useRef<number>(0);

  useEffect(() => {
    setCount(count + 1);
    return () => {};
  }, []);

  return (
    <div>
      <button onClick={() => onButtonClick(setCount, count, test)}></button>
      <h1>{count}</h1>
      <h1>{test.current}</h1>
    </div>
  );
}

export default Test;
