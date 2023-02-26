import { createContext, useState } from "react";
import { PropsWithChildren } from "react";
const ImageContext = createContext({});

const ImageProvider = ({ children }: PropsWithChildren) => {
  const [counter1, setCounter1] = useState<number>(0);

  const imageState = {
    counter1,
    setCounter1,
  };

  return (
    <ImageContext.Provider value={imageState}>{children}</ImageContext.Provider>
  );
};

export { ImageContext };
