import React from 'react';

class CmdContextObj {
  output: string = "";
  setOutput: (output: string) => void = () => {};
}

const CmdContext = React.createContext<CmdContextObj>(new CmdContextObj());

const CmdProvider = ({ children }: any) => {
  const [output, setOutputInner] = React.useState<string>("");
  const setOutput = (line: string) => {
    console.log(line);
    setOutputInner(line);
  }
  return <CmdContext.Provider value={{ output, setOutput }}>{children}</CmdContext.Provider>;
};

export { CmdContext, CmdProvider, CmdContextObj };
